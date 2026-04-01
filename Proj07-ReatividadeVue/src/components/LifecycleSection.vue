<script setup>
    import { ref, reactive } from 'vue'
    import LifecycleLog from './LifecycleLog.vue'

    const show = ref(false)
    const logs = reactive([])

    function registerLog(hook) {
    logs.push({ hook, time: new Date().toLocaleTimeString() })
    }
</script>

<template>
    <div class="card mb-4">
        <div class="card-body">
            <h2 class="card-title text-secondary">4. Lifecycle</h2>

            <p class="bg-light p-2 rounded small">
                Use the button to mount/unmount the child component and observe the hooks being triggered.
                Click the inner button to trigger <code>onBeforeUpdate</code> / <code>onUpdated</code>.
            </p>

            <div class="d-flex gap-2 mb-3">
                <button class="btn btn-success" @click="show = !show">
                            {{ show ? 'Unmount' : 'Mount' }} component
                </button>
                <button class="btn btn-outline-secondary btn-sm" @click="logs.length = 0">
                            Clear logs
                </button>
            </div>

            <LifecycleLog v-if="show" @log="registerLog" />

            <div v-if="logs.length" class="mt-3">
                <h6 class="text-secondary">Logs:</h6>
                <ul class="list-group list-group-flush">
                <li class="list-group-item py-1 small" v-for="(log, i) in logs" :key="i">
                    <span class="text-muted">{{ log.time }}</span> — <strong>{{ log.hook }}</strong>
                </li>
                </ul>
            </div>
        </div>
    </div>
</template>