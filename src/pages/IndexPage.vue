<template>
  <q-page class="row items-center justify-center dark-background">
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
import Papa from 'papaparse';

const at_text = ref('');
const at_source = ref('');
const nt_text = ref('');
const nt_source = ref('');
const sunday = ref('');

Papa.parse('/Losungen.csv', {
  encoding: 'CP1252',
  download: true,
  complete: (result) => {
    const jsonData = result.data as entry[];
    at_text.value = get_today(jsonData)?.at_text ?? '';
    at_source.value = get_today(jsonData)?.at_source ?? '';
    nt_text.value = get_today(jsonData)?.nt_text ?? '';
    nt_source.value = get_today(jsonData)?.nt_source ?? '';
    sunday.value = get_today(jsonData)?.sunday ?? '';
  },
  header: true,
  delimiter: '\t',
});
</script>
