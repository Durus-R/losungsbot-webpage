<template>
  <div>
    <p>{{ title }}</p>
    <ul>
      <li v-for="todo in todos" :key="todo" @click="increment">
        {{ todo }} - {{ todo }}
      </li>
    </ul>
    <p>Count: {{ todoCount }} / {{ meta }}</p>
    <p>Active: {{ active ? 'yes' : 'no' }}</p>
    <p>Clicks on todos: {{ clickCount }}</p>
  </div>
</template>

<script setup lang="ts">
import { computed, ref } from 'vue';
//import { Todo, Meta } from './models';

interface Props {
  title: string;
  todos?: [];
  meta: number;
  active: boolean;
}
const props = withDefaults(defineProps<Props>(), {
  todos: () => [],
});

const clickCount = ref(0);
function increment() {
  clickCount.value += 1;
  return clickCount.value;
}

const todoCount = computed(() => props.todos.length);
</script>
