<template>
  <q-page
    class="row items-center justify-center"
    v-touch-swipe.mouse.up="switchAT"
    v-touch-swipe.mouse.down="switchNT"
  >
    <MainText
      :at_text="at_text"
      :at_source="at_source"
      :nt_text="nt_text"
      :nt_source="nt_source"
    ></MainText>
    <ContextButton
      :at_source="at_source"
      :nt_source="nt_source"
    ></ContextButton>
  </q-page>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import MainText from '../components/MainText.vue';
import ContextButton from '../components/ActionButtons.vue';
import { get_today, entry } from 'src/lib/data';
import { useDateStore } from 'src/stores/today_date';
import Papa from 'papaparse';
import { watch } from 'vue';

const at_text = ref('');
const at_source = ref('');
const nt_text = ref('');
const nt_source = ref('');

const store = useDateStore();

function switchAT() {
  store.setAT(true);
}

function switchNT() {
  store.setAT(false);
}

const strong_regex = /\/(.*?)\//g;

function parse() {
  Papa.parse('/Losungen.csv', {
    encoding: 'CP1252',
    download: true,
    complete: (result) => {
      const jsonData = result.data as entry[];
      const now = store.date;
      at_text.value =
        get_today(jsonData, now)?.at_text.replaceAll(
          strong_regex,
          '<strong>$1</strong>'
        ) ?? '';
      at_source.value = get_today(jsonData, now)?.at_source ?? '';
      nt_text.value =
        get_today(jsonData, now)?.nt_text.replaceAll(
          strong_regex,
          '<strong>$1</strong>'
        ) ?? '';
      nt_source.value = get_today(jsonData, now)?.nt_source ?? '';
    },
    header: true,
    delimiter: '\t',
  });
}

watch(
  () => {
    return store.date;
  },
  parse,
  {
    immediate: true,
  }
);
</script>
