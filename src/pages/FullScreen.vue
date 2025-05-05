<template>
  <q-page padding @click="()=>store.switchAT()">
    <MainText
      :at_text="web_data.at_text"
      :at_source="web_data.at_source"
      :nt_text="web_data.nt_text"
      :nt_source="web_data.nt_source"
    ></MainText>
  </q-page>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import MainText from '../components/MainText.vue';
import { webData } from 'src/lib/data';
import { useDateStore } from 'src/stores/today_date';
import { watch } from 'vue';
import { parse, parseResult } from 'src/lib/csv';




const web_data = ref<webData>({
  at_text: '',
  at_source: '',
  nt_text: '',
  nt_source: ''
});

const secondsSinceMove = ref(0);
setInterval(() => {
  secondsSinceMove.value += 1;
}, 1000);

const store = useDateStore();



watch(
  () => {
    return store.date;
  },
  ()=>{parse(window.location.origin, (result)=> {
    web_data.value = parseResult(result, store.date)
  })},
  {
    immediate: true
  }
);
</script>
