<template>
  <div @click="handleClick">
    <transition-group
      enter-active-class="animated delay-1s fadeIn"
      leave-active-class="animated fast fadeOut"
    >
    <div v-if="store.at" key="at" class="center-screen">
      <h1>
        {{ props.at_source }}
      </h1>
      <h3 v-html="props.at_text"></h3>
    </div>
    <div v-if="!store.at" key="nt" class="center-screen">
      <h1>
        {{ props.nt_source }}
      </h1>
      <h3 v-html="props.nt_text"></h3>
    </div>
    </transition-group>
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
