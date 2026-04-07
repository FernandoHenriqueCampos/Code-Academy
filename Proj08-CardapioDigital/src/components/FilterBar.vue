<script setup>
const props = defineProps(['activeCategory']);
const emit = defineEmits(['update-category']);

const categories = ['Todas', 'Lanche', 'Bebida', 'Sobremesa'];

const categoryColor = (cat) => {
  switch (cat) {
    case 'Lanche': return 'var(--primary-gradient)';
    case 'Bebida': return 'var(--secondary-gradient)';
    case 'Sobremesa': return 'var(--accent-gradient)';
    default: return 'var(--card-bg)';
  }
};
</script>

<template>
  <div class="filter-bar glass fade-in">
    <div class="filter-header">
      <span class="label">Filtrar por</span>
    </div>
    <div class="filter-options">
      <button 
        v-for="cat in categories" 
        :key="cat"
        @click="emit('update-category', cat)"
        :class="{ 'active': activeCategory === cat }"
        class="filter-btn"
      >
        {{ cat }}
      </button>
    </div>
  </div>
</template>

<style scoped>
.filter-bar {
  display: flex;
  align-items: center;
  justify-content: flex-start;
  gap: 1.1rem;
  padding: 1rem 1.5rem;
  border-radius: 60px;
  background: var(--card-bg);
  backdrop-filter: blur(12px);
  border: 1px solid var(--card-border);
  margin-bottom: 2rem;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);
}

.filter-header {
  display: flex;
  align-items: center;
}

.filter-header .label {
  font-size: 0.85rem;
  color: var(--text-secondary);
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.1em;
}

.filter-options {
  display: flex;
  gap: 0.75rem;
  flex-wrap: wrap;
  align-items: center;
}

.filter-btn {
  padding: 0.6rem 1.5rem;
  border-radius: 50px;
  border: 1px solid transparent;
  background: rgba(255, 255, 255, 0.05);
  color: var(--text-primary);
  font-family: inherit;
  font-size: 0.95rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275);
}

.filter-btn:hover {
  background: rgba(255, 255, 255, 0.1);
  transform: translateY(-2px);
}

.filter-btn.active {
  background: var(--primary-gradient);
  border-color: rgba(255, 255, 255, 0.1);
  box-shadow: 0 5px 15px rgba(245, 158, 11, 0.3);
  color: white;
}

@media (max-width: 768px) {
  .filter-bar {
    flex-direction: column;
    gap: 1rem;
    border-radius: 20px;
    padding: 1.5rem;
  }
  
  .filter-options {
    flex-wrap: wrap;
    justify-content: center;
  }
}
</style>
