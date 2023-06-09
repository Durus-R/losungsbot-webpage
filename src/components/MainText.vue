<template>
  <div @click="handleClick">
    <div v-if="store.at" class="center-screen">
      <h3>
        {{ props.at_source }}
      </h3>
      <h1 v-html="props.at_text"></h1>
    </div>
    <div v-if="!store.at" class="center-screen">
      <h3>
        {{ props.nt_source }}
      </h3>
      <h1 v-html="props.nt_text"></h1>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { useQuasar } from 'quasar';
import { useDateStore } from 'src/stores/today_date';
const store = useDateStore();

const $q = useQuasar();

function handleClick() {
  if (!$q.platform.is.mobile) {
    store.switchAT();
  }
}

const props = defineProps({
  at_text: String,
  at_source: String,
  nt_text: String,
  nt_source: String,
});
</script>
