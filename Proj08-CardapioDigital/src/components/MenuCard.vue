<script setup>
import { computed } from 'vue';

const props = defineProps(['item']);
const emit = defineEmits(['remove-item']);

const HIGH_PRICE_THRESHOLD = 100000;

const formatPrice = (price, compact = false) => {
  return new Intl.NumberFormat('pt-BR', {
    style: 'currency',
    currency: 'BRL',
    notation: compact ? 'compact' : 'standard',
    maximumFractionDigits: compact ? 1 : 2,
    minimumFractionDigits: compact ? 0 : 2
  }).format(price);
};

const isHighPrice = computed(() => Number(props.item.price) >= HIGH_PRICE_THRESHOLD);
const formattedPrice = computed(() => formatPrice(props.item.price, isHighPrice.value));
const stockQuantity = computed(() => {
  const rawStock = props.item.available;

  if (typeof rawStock === 'boolean') {
    return rawStock ? 1 : 0;
  }

  const parsedStock = Number(rawStock);
  return Number.isFinite(parsedStock) && parsedStock > 0 ? Math.floor(parsedStock) : 0;
});

const isAvailable = computed(() => stockQuantity.value > 0);
const availabilityText = computed(() => (isAvailable.value ? 'Disponível' : 'Esgotado'));

const categoryIcon = computed(() => {
  switch (props.item.category) {
    case 'Lanche': return '🍔';
    case 'Bebida': return '🥤';
    case 'Sobremesa': return '🍰';
    default: return '🍽️';
  }
});

const categoryColor = computed(() => {
  switch (props.item.category) {
    case 'Lanche': return 'var(--primary-gradient)';
    case 'Bebida': return 'var(--secondary-gradient)';
    case 'Sobremesa': return 'var(--accent-gradient)';
    default: return 'var(--primary-gradient)';
  }
});
</script>

<template>
  <div class="menu-card glass fade-in" :class="{ 'unavailable': !isAvailable }">
    <div class="card-header">
      <div class="icon-wrapper" :style="{ background: categoryColor }">
        {{ categoryIcon }}
      </div>
      <div class="header-info">
        <h3>{{ item.name }}</h3>
        <span class="category-badge" :style="{ background: categoryColor }">{{ item.category }}</span>
      </div>
    </div>
    
    <div class="card-body">
      <div class="price-info">
        <span class="label">Preço</span>
        <span class="price" :class="{ compact: isHighPrice }">{{ formattedPrice }}</span>
      </div>

      <div class="status-stock">
        <div class="status-indicator">
          <span :class="isAvailable ? 'dot available' : 'dot unavailable'"></span>
          <span>{{ availabilityText }}</span>
        </div>
        <span class="stock-count">Estoque: {{ stockQuantity }}</span>
      </div>
    </div>

    <div class="card-footer">
      <button @click="emit('remove-item', item.id)" class="btn-remove">
        <svg viewBox="0 0 24 24" width="18" height="18" stroke="currentColor" stroke-width="2" fill="none" stroke-linecap="round" stroke-linejoin="round"><polyline points="3 6 5 6 21 6"></polyline><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path><line x1="10" y1="11" x2="10" y2="17"></line><line x1="14" y1="11" x2="14" y2="17"></line></svg>
        Remover Item
      </button>
    </div>
  </div>
</template>

<style scoped>
.menu-card {
  padding: 1.5rem;
  border-radius: 20px;
  background: var(--card-bg);
  backdrop-filter: blur(8px);
  border: 1px solid var(--card-border);
  transition: all 0.3s ease;
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  position: relative;
  overflow: hidden;
  min-height: 220px;
}

.menu-card:hover {
  transform: translateY(-8px);
  box-shadow: 0 15px 40px rgba(0, 0, 0, 0.3);
  border-color: rgba(255, 255, 255, 0.2);
}

.menu-card.unavailable {
  opacity: 0.6;
  filter: grayscale(0.5);
}

.menu-card.unavailable h3 {
  text-decoration: line-through;
}

.card-header {
  display: grid;
  grid-template-columns: 64px 1fr;
  align-items: start;
  gap: 1rem;
  min-height: 64px;
}

.icon-wrapper {
  width: 64px;
  height: 64px;
  border-radius: 14px;
  font-size: 1.5rem;
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.2);
  display: grid;
  place-items: center;
}

.header-info {
  height: 64px;
  display: grid;
  grid-template-rows: 1fr auto;
  row-gap: 0.15rem;
}

.header-info h3 {
  font-size: 1.2rem;
  font-weight: 700;
  color: var(--text-primary);
  margin: 0;
  line-height: 1.22;
  min-height: 0;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
}

.category-badge {
  display: inline-flex;
  align-items: center;
  height: 20px;
  width: fit-content;
  padding: 0.1rem 0.55rem;
  border-radius: 30px;
  font-size: 0.75rem;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.05em;
}

.card-body {
  display: grid;
  grid-template-columns: 1fr auto;
  align-items: end;
  min-height: 44px;
}

.price-info {
  display: flex;
  flex-direction: column;
  min-width: 0;
}

.price-info .label {
  font-size: 0.8rem;
  color: var(--text-secondary);
}

.price-info .price {
  font-size: 1.4rem;
  font-weight: 700;
  color: #10b981;
  line-height: 1.2;
  font-variant-numeric: tabular-nums;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.price-info .price.compact {
  font-size: 1.2rem;
}

.status-stock {
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  gap: 0.1rem;
  align-self: end;
}

.status-indicator {
  display: flex;
  align-items: center;
  justify-content: flex-end;
  gap: 0.5rem;
  font-size: 0.85rem;
  min-width: 110px;
  white-space: nowrap;
}

.stock-count {
  font-size: 0.72rem;
  color: var(--text-secondary);
  line-height: 1;
  font-variant-numeric: tabular-nums;
}

.dot {
  width: 8px;
  height: 8px;
  border-radius: 50%;
}

.dot.available {
  background-color: var(--success);
  box-shadow: 0 0 10px rgba(16, 185, 129, 0.5);
}

.dot.unavailable {
  background-color: var(--danger);
  box-shadow: 0 0 10px rgba(239, 68, 68, 0.5);
}

.card-footer {
  margin-top: auto;
}

.btn-remove {
  width: 100%;
  padding: 0.65rem;
  border-radius: 12px;
  border: 1px solid rgba(239, 68, 68, 0.3);
  background: rgba(239, 68, 68, 0.1);
  color: #ef4444;
  font-family: inherit;
  font-size: 0.9rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
}

.btn-remove:hover {
  background: rgba(239, 68, 68, 0.2);
  border-color: rgba(239, 68, 68, 0.6);
  transform: scale(1.02);
}
</style>
