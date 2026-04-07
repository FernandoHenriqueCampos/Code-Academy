<script setup>
import { computed } from 'vue';

const props = defineProps(['stats']);

const COUNT_COMPACT_THRESHOLD = 10000;
const PRICE_COMPACT_THRESHOLD = 100000;

const formatCount = (value) => {
  const safeValue = Number(value) || 0;
  const compact = safeValue >= COUNT_COMPACT_THRESHOLD;

  return {
    text: new Intl.NumberFormat('pt-BR', {
      notation: compact ? 'compact' : 'standard',
      maximumFractionDigits: compact ? 1 : 0
    }).format(safeValue),
    compact
  };
};

const formatPrice = (price) => {
  const safePrice = Number(price) || 0;
  const compact = safePrice >= PRICE_COMPACT_THRESHOLD;

  return {
    text: new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL',
      notation: compact ? 'compact' : 'standard',
      maximumFractionDigits: compact ? 1 : 2,
      minimumFractionDigits: compact ? 0 : 2
    }).format(safePrice),
    compact
  };
};

const totalDisplay = computed(() => formatCount(props.stats?.total));
const availableDisplay = computed(() => formatCount(props.stats?.available));
const stockDisplay = computed(() => formatCount(props.stats?.totalStock));
const avgPriceDisplay = computed(() => formatPrice(props.stats?.avgPrice));
</script>

<template>
  <div class="stats-bar glass fade-in">
    <div class="stat-item total">
      <span class="label">Total de Itens</span>
      <span class="value" :class="{ compact: totalDisplay.compact }">{{ totalDisplay.text }}</span>
    </div>
    <div class="stat-item available">
      <span class="label">Disponíveis</span>
      <span class="value" :class="{ compact: availableDisplay.compact }">{{ availableDisplay.text }}</span>
    </div>
    <div class="stat-item stock">
      <span class="label">Em Estoque</span>
      <span class="value" :class="{ compact: stockDisplay.compact }">{{ stockDisplay.text }}</span>
    </div>
    <div class="stat-item avg-price">
      <span class="label">Preço Médio</span>
      <span class="value accent" :class="{ compact: avgPriceDisplay.compact }">{{ avgPriceDisplay.text }}</span>
    </div>
  </div>
</template>

<style scoped>
.stats-bar {
  display: grid;
  grid-template-columns: repeat(4, minmax(0, 1fr));
  gap: 1rem;
  padding: 1.5rem;
  border-radius: 24px;
  background: var(--card-bg);
  backdrop-filter: blur(12px);
  border: 1px solid var(--card-border);
  margin-bottom: 2rem;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);
  text-align: center;
}

.stat-item {
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: 0.2rem;
  padding: 0.5rem;
  min-height: 72px;
  border-right: 1px solid var(--card-border);
  overflow: hidden;
}

.stat-item:last-child {
  border-right: none;
}

.label {
  font-size: 0.75rem;
  color: var(--text-secondary);
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.1em;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.value {
  display: block;
  width: 100%;
  font-size: 1.5rem;
  font-weight: 700;
  color: var(--text-primary);
  line-height: 1.1;
  font-variant-numeric: tabular-nums;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.value.compact {
  font-size: 1.2rem;
}

.value.accent {
  background: var(--primary-gradient);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
}

@media (max-width: 600px) {
  .stats-bar {
    grid-template-columns: 1fr;
    gap: 1.5rem;
  }
  
  .stat-item {
    border-right: none;
    border-bottom: 1px solid var(--card-border);
    padding-bottom: 1rem;
  }
  
  .stat-item:last-child {
    border-bottom: none;
    padding-bottom: 0;
  }
}
</style>
