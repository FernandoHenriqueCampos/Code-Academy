<script setup>
import { ref } from 'vue';

const emit = defineEmits(['add-item']);

const name = ref('');
const price = ref(0);
const category = ref('Lanche');
const available = ref(true);

const submitForm = () => {
  if (!name.value || price.value <= 0) return;

  const newItem = {
    id: Date.now(),
    name: name.value,
    price: parseFloat(price.value),
    category: category.value,
    available: parseInt(available.value)
  };

  emit('add-item', newItem);

  // Reset form
  name.value = '';
  price.value = 0;
  category.value = 'Lanche';
  available.value = 1;
};
</script>

<template>
  <form @submit.prevent="submitForm" class="item-form glass fade-in">
    <h3>Novo Item</h3>
    <div class="form-grid">
      <div class="input-group">
        <label for="name">Nome do Item</label>
        <input v-model="name" type="text" id="name" placeholder="Ex: X-Salada" required />
      </div>
      <div class="input-group">
        <label for="price">Preço (R$)</label>
        <input v-model.number="price" type="number" id="price" step="0.1" min="0" max="1000" required />
      </div>
      <div class="input-group">
        <label for="category">Categoria</label>
        <select v-model="category" id="category">
          <option value="Lanche">Lanche</option>
          <option value="Bebida">Bebida</option>
          <option value="Sobremesa">Sobremesa</option>
        </select>
      </div>
      <div class="input-group">
        <label for="available">Quantidade em estoque</label>
        <input 
          v-model.number="available" 
          type="number" 
          id="available" 
          min="0" 
          max="1000" 
          placeholder="1"
          required 
        />
      </div>
    </div>
    <button type="submit" class="btn-primary">Adicionar ao Cardápio</button>
  </form>
</template>

<style scoped>
.item-form {
  min-height: var(--item-form-target-height, auto);
  padding: 2rem;
  border-radius: 20px;
  background: var(--card-bg);
  backdrop-filter: blur(12px);
  border: 1px solid var(--card-border);
  margin-bottom: 1rem;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.2);
  display: grid;
  grid-template-rows: auto 1fr auto;
  row-gap: 3rem;
}

h3 {
  margin-bottom: 0;
  font-size: 1.5rem;
  background: var(--primary-gradient);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
}

.form-grid {
  display: grid;
  grid-template-columns: 1fr;
  gap: 1rem;
  margin-bottom: 0;
  align-content: space-between;
}

.input-group {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}

label {
  font-size: 0.9rem;
  font-weight: 500;
  color: var(--text-secondary);
}

input[type="text"], input[type="number"], select {
  width: 100%;
  min-height: 46px;
  padding: 0.8rem 1rem;
  border-radius: 12px;
  background: rgba(15, 23, 42, 0.6);
  border: 1px solid var(--card-border);
  color: var(--text-primary);
  font-size: 1rem;
  line-height: 1.2;
  box-sizing: border-box;
  transition: all 0.3s ease;
}

input:focus, select:focus {
  outline: none;
  border-color: #f59e0b;
  box-shadow: 0 0 0 2px rgba(245, 158, 11, 0.2);
}

.checkbox {
  flex-direction: row;
  align-items: center;
  gap: 1rem;
}

.label-text {
  font-size: 1rem;
  color: var(--text-primary);
}

.switch {
  position: relative;
  display: inline-block;
  width: 50px;
  height: 26px;
}

.switch input {
  opacity: 0;
  width: 0;
  height: 0;
}

.slider {
  position: absolute;
  cursor: pointer;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: #334155;
  transition: .4s;
}

.slider:before {
  position: absolute;
  content: "";
  height: 18px;
  width: 18px;
  left: 4px;
  bottom: 4px;
  background-color: white;
  transition: .4s;
}

input:checked + .slider {
  background: var(--primary-gradient);
}

input:checked + .slider:before {
  transform: translateX(24px);
}

.slider.round {
  border-radius: 34px;
}

.slider.round:before {
  border-radius: 50%;
}

.btn-primary {
  width: 100%;
  margin-top: 0;
  padding: 1rem;
  border-radius: 12px;
  border: none;
  background: var(--primary-gradient);
  color: white;
  font-size: 1rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
  box-shadow: 0 4px 15px rgba(245, 158, 11, 0.3);
}

.btn-primary:hover {
  transform: translateY(-2px);
  box-shadow: 0 8px 25px rgba(245, 158, 11, 0.4);
}

.btn-primary:active {
  transform: translateY(0);
}

@media (max-width: 1024px) {
  .item-form {
    min-height: auto;
  }
}
</style>
