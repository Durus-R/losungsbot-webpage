<template>
  <div class="q-mx-auto" v-touch-swipe.mouse.up.down="handleSwipe">
    <h4 v-if="is_sunday">{{ props.sunday }}</h4>
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
    <p></p>
    <QBtn
      :href="hyperlink"
      :size="btn_size"
      round
      icon="book"
      class="bibleserver-btn"
      >
    </QBtn>
  </div>
</template>

<script lang="ts" setup>
import { computed, ref, watch } from 'vue';
import { QBtn } from 'quasar';
import { useDateStore } from 'src/stores/today_date';
const store = useDateStore();

const isIPhone = /iPhone/i.test(navigator.userAgent);
const isAndroid = /Android/i.test(navigator.userAgent);

const is_mobile_device = isIPhone || isAndroid;

const btn_size = is_mobile_device ? 'xl': 'lg'

const visibility = ref(true);
function handleSwipe () {
  visibility.value = !visibility.value
}

const props = defineProps({
  at_text: String,
  at_source: String,
  nt_text: String,
  nt_source: String,
  sunday: String,
});
const is_sunday = props.sunday !== '';
const hyperlink = computed(() => {
  if (visibility.value) {
    return (
      'https://www.bibleserver.com/LUT/' + props.at_source?.replaceAll(' ', '')
    );
  } else {
    return (
      'https://www.bibleserver.com/LUT/' + props.nt_source?.replaceAll(' ', '')
    );
  }
});
watch(hyperlink, () => {
  store.$patch({
    url: hyperlink.value,
  });
});
</script>
