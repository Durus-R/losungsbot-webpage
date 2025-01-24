<template>
  <q-page padding @click="()=>store.switchAT()">
    <MainText
      ref="centralElement"
      :at_text="at_text"
      :at_source="at_source"
      :nt_text="nt_text"
      :nt_source="nt_source"
    ></MainText>
  </q-page>
</template>

<script setup lang="ts">
import { onMounted, Ref, ref } from 'vue';
import MainText from '../components/MainText.vue';
import { get_today, entry } from 'src/lib/data';
import { useDateStore } from 'src/stores/today_date';
import Papa from 'papaparse';
import { watch } from 'vue';
import { inject } from '@vercel/analytics';
import sanitizeHtml from 'sanitize-html';
import { injectSpeedInsights } from '@vercel/speed-insights';

const centralElement = ref(null) as Ref<HTMLElement | null>;

onMounted(() => {
  inject();
  injectSpeedInsights();
  console.log(at_text.value);
});

const at_text = ref('');
const at_source = ref('');
const nt_text = ref('');
const nt_source = ref('');

ref(false);
const secondsSinceMove = ref(0);
setInterval(() => {
  secondsSinceMove.value += 1;
}, 1000);

const store = useDateStore();

const strong_regex = /\/(.*?)\//g;

function parse() {
  Papa.parse(`${window.location.origin}/Losungen_${(new Date()).getFullYear()}.csv`, {
    encoding: 'utf-8',
    download: true,
    complete: (result) => {
      const jsonData = result.data as entry[];
      console.log(jsonData);
      const now = store.date;
      console.log(now);
      const today_data = get_today(jsonData, now);
      console.log('today_data');
      console.log(today_data);
      console.log('today_Data end');
      at_text.value =
        sanitizeHtml(today_data?.at_text.replaceAll(
          strong_regex,
          '<strong>$1</strong>'
        ) ?? '');
      at_source.value = today_data?.at_source ?? '';
      nt_text.value =
        sanitizeHtml(today_data?.nt_text.replaceAll(
          strong_regex,
          '<strong>$1</strong>'
        ) ?? '');
      nt_source.value = today_data?.nt_source ?? '';
      console.log(at_text.value);
    },
    header: true,
    delimiter: ';'
  });
}

watch(
  () => {
    return store.date;
  },
  parse,
  {
    immediate: true
  }
);
</script>
