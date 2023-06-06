<template>
  <div class="q-mx-auto" @click="visibility = !visibility">
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
    <a :href="hyperlink" v-if="$q.screen.width >= 1000 && is_desktop_device"
      ><p class="context-link">
        Hier klicken um den Kontext nachzuschlagen!
      </p></a
    >
    <QBtn
      :href="hyperlink"
      size="xl"
      round
      icon="book"
      class="bibleserver-btn"

      v-else
    ><QTooltip>Hier klicken, um die Bibelstelle nachzuschlagen!</QTooltip>
  </QBtn>
  </div>
</template>

<script lang="ts" setup>
import { useQuasar } from 'quasar';
import { computed, ref } from 'vue';
import { QBtn, QTooltip } from 'quasar';
const $q = useQuasar();

const isIPhone = /iPhone/i.test(navigator.userAgent);
const isAndroid = /Android/i.test(navigator.userAgent);

const is_mobile_device = isIPhone || isAndroid;
const is_desktop_device = !is_mobile_device;

const visibility = ref(true);
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
</script>
