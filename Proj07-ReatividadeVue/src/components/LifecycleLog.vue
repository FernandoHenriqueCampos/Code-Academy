<script setup>
    import { ref, onBeforeMount, onMounted, onBeforeUpdate, onUpdated, onUnmounted } from 'vue'

    const emit = defineEmits(['log'])

    const clicks = ref(0)

    onBeforeMount(() => emit('log', 'onBeforeMount'))
    onMounted(() => emit('log', 'onMounted'))
    onBeforeUpdate(() => emit('log', 'onBeforeUpdate'))
    onUpdated(() => emit('log', 'onUpdated'))
    onUnmounted(() => emit('log', 'onUnmounted'))
</script>

<template>
    <div class="border rounded p-3">
        <p class="mb-1">Clicks: <strong class="text-success">{{ clicks }}</strong></p>
        <button class="btn btn-success btn-sm" @click="clicks++">Click here</button>
        <p class="text-muted small mt-2 mb-0">Click to trigger onBeforeUpdate / onUpdated</p>
    </div>
</template>

<style scoped>
    .border {
        border-color: #198754 !important;
    }
</style>