<script setup>
import { reactive, ref } from 'vue'

const user = reactive({
  name: 'Victor',
  age: 25,
  languages: ['JavaScript', 'TypeScript']
})

const newLanguage = ref('')

function haveBirthday() {
  user.age++
}

function addLanguage() {
  const name = newLanguage.value.trim()
  if (name) {
    user.languages.push(name)
    newLanguage.value = ''
  }
}
</script>

<template>
  <div class="card mb-4">
    <div class="card-body">
      <h2 class="card-title text-secondary">2. reactive() + v-model + v-for + v-if</h2>

            <p class="bg-light p-2 rounded small">
                <code>v-model</code> creates two-way binding between input and state.
                <code>v-for</code> renders lists.
                <code>v-if</code>/<code>v-else</code> conditionally displays elements.
            </p>

      <div class="mb-3">
                <label class="form-label fw-bold">Name:</label>
        <input v-model="user.name" class="form-control" />
      </div>

            <p>Hello, <strong class="text-success">{{ user.name }}</strong>! Age: <strong class="text-success">{{ user.age }}</strong></p>

            <button class="btn btn-success mb-3" @click="haveBirthday">+1 Age</button>

      <hr />
            <h5 class="text-secondary">Languages</h5>

      <ul class="list-group mb-3" v-if="user.languages.length > 0">
        <li class="list-group-item" v-for="lang in user.languages" :key="lang">
          {{ lang }}
        </li>
      </ul>
            <p class="text-muted fst-italic" v-else>No languages added.</p>

      <div class="input-group">
        <input
          v-model="newLanguage"
          class="form-control"
                    placeholder="New language..."
          @keyup.enter="addLanguage"
        />
                <button class="btn btn-success" @click="addLanguage">Add</button>
      </div>
    </div>
  </div>
</template>