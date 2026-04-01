<script setup>
import CounterSection from './components/CounterSection.vue'
import UserSection from './components/UserSection.vue'
import CommunicationSection from './components/CommunicationSection.vue'
import LifecycleSection from './components/LifecycleSection.vue'
</script>

<template>
  <div class="container py-4">
        <h1 class="text-center text-success mb-4">Reactivity in Vue 3</h1>
    <CounterSection />
    <UserSection />
    <CommunicationSection />
    <LifecycleSection />
  </div>
</template>