<script setup>
    defineProps({
        counter: Number
    })

    const emit = defineEmits(['increment', 'decrement'])
</script>

<template>
    <div>
        <p>Value received from parent: <strong class="text-success">{{ counter }}</strong></p>
        <div class="d-flex gap-2">
            <button class="btn btn-success" :disabled="counter <= 0" @click="emit('decrement')">-1</button>
            <button class="btn btn-success" @click="emit('increment')">+1</button>
        </div>
    </div>
</template>