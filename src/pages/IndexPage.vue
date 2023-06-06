<template>
  <q-page class="row items-center justify-center">
    <MainText
      :at_text="at_text"
      :at_source="at_source"
      :nt_text="nt_text"
      :nt_source="nt_source"
      :sunday="sunday"
    ></MainText>
  </q-page>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import MainText from '../components/MainText.vue';
import { get_today, entry } from 'src/lib/data';
import { useDateStore } from 'src/stores/today_date';
import Papa from 'papaparse';

const at_text = ref('');
const at_source = ref('');
const nt_text = ref('');
const nt_source = ref('');
const sunday = ref('');

const store = useDateStore();

Papa.parse('/Losungen.csv', {
  encoding: 'CP1252',
  download: true,
  complete: (result) => {
    const jsonData = result.data as entry[];
    const now = store.date;
    at_text.value = get_today(jsonData, now)?.at_text ?? '';
    at_source.value = get_today(jsonData, now)?.at_source ?? '';
    nt_text.value = get_today(jsonData, now)?.nt_text ?? '';
    nt_source.value = get_today(jsonData, now)?.nt_source ?? '';
    sunday.value = get_today(jsonData, now)?.sunday ?? '';
  },
  header: true,
  delimiter: '\t',
});
</script>
