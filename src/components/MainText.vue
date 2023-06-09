<template>
  <div class="q-mx-auto" @click="handleClick">
    <h3 v-if="store.at">
      {{ props.at_source }}
    </h3>
    <h1 v-if="store.at" v-html="props.at_text"></h1>
    <h3 v-if="!store.at">
      {{ props.nt_source }}
    </h3>
    <h1 v-if="!store.at" v-html="props.nt_text"></h1>
  </div>
</template>

<script lang="ts" setup>
import { useDateStore } from 'src/stores/today_date';
const store = useDateStore();

const isIPhone =
  /iPhone/i.test(navigator.userAgent) || /iPad/i.test(navigator.userAgent);
const isAndroid = /Android/i.test(navigator.userAgent);

const is_mobile_device = isIPhone || isAndroid;

function handleClick() {
  if (!is_mobile_device) {
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
