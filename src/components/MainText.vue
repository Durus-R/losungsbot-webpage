<template>
  <div class="q-mx-auto" @click="visibility = !visibility">
    <h4 v-if="props.sunday !== undefined">{{ props.sunday }}</h4>
    <h3 v-if="visibility">
      {{ props.at_source }}
    </h3>
    <h1 v-if="visibility">
      {{ props.at_text }}
    </h1>
    <h3 v-if="!visibility">
      {{ props.nt_source }}
    </h3>
    <h1 v-if="!visibility">
      {{ props.nt_text }}
    </h1>
  </div>
</template>

<script lang="ts" setup>
import { ref } from 'vue';

const visibility = ref(true);
const props = defineProps({
  at_text: String,
  at_source: String,
  nt_text: String,
  nt_source: String,
  sunday: String,
});
</script>
