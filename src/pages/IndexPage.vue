<template>
  <q-page class="row items-center justify-evenly">
    <MainText :text="at_source"></MainText>
  </q-page>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import MainText from '../components/MainText.vue';
import { get_today, entry } from 'src/lib/data';
import Papa from 'papaparse';

const at_source = ref('');

Papa.parse('/Losungen.csv', {
  encoding: 'CP1252',
  download: true,
  complete: (result) => {
    const jsonData = result.data as entry[];
    at_source.value = get_today(jsonData)?.at_source ?? '';
  },
  header: true,
  delimiter: '\t',
});
</script>
