<script setup>
import { ref, computed } from 'vue'

const counter = ref(0)

function increment() {
  counter.value++
}

function decrement() {
  counter.value--
}

const double = computed(() => counter.value * 2)

const evenOrOdd = computed(() => {
    return counter.value % 2 === 0 ? 'even' : 'odd'
})
</script>

<template>
  <div class="card mb-4">
    <div class="card-body">
      <h2 class="card-title text-secondary">1. ref() + computed()</h2>

            <p class="bg-light p-2 rounded small">
                The <code>ref()</code> state and <code>computed()</code> values live in the component itself.
                Functions modify state directly, without needing props or emits.
            </p>

            <p>Counter: <strong class="text-success">{{ counter }}</strong></p>
            <p>Double: <strong class="text-success">{{ double }}</strong></p>
            <p>The counter is <strong class="text-success">{{ evenOrOdd }}</strong></p>

      <div class="d-flex gap-2">
        <button class="btn btn-success" :disabled="counter <= 0" @click="decrement">-1</button>
        <button class="btn btn-success" @click="increment">+1</button>
      </div>
    </div>
  </div>
</template>

<style scoped>
.card {
  border-left: 4px solid #198754;
}
</style>