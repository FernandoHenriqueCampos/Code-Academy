<script setup>
import { ref } from 'vue'
import CommunicationChild from './CommunicationChild.vue'

const counter = ref(0)

function increment() {
  counter.value++
}

function decrement() {
  counter.value--
}
</script>

<template>
    <div class="card mb-4">
        <div class="card-body">
            <h2 class="card-title text-secondary">3. defineProps() + defineEmits()</h2>

            <p class="bg-light p-2 rounded small">
                The parent holds the state and passes it via <code>props</code>.
                The child notifies the parent via <code>emit</code>.
            </p>

            <p>State in parent: <strong class="text-success">{{ counter }}</strong></p>

            <CommunicationChild
                :counter="counter"
                @increment="increment"
                @decrement="decrement"
            />
        </div>
    </div>
</template>