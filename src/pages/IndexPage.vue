<template>
  <q-page
    v-touch-swipe.mouse.up="switchNT"
    v-touch-swipe.mouse.down="switchAT"
    @click="handleClick"
    @mousemove="handleMousemove"
  ><div class="column items-center justify-center">
    <MainText
      ref="centralElement"
      :at_text="at_text"
      :at_source="at_source"
      :nt_text="nt_text"
      :nt_source="nt_source"
    ></MainText>
      <p v-if="/*(secondsSinceMove < 5) &&*/ !($q.platform.is.mobile)">(Klicken, um zwischem Losungsvers und Lehrvers zu wechseln)</p>
  </div>
  </q-page>
  <ContextButton :toggleButtons="toggleMobileButtons" :at_source="at_source" :nt_source="nt_source"></ContextButton>
</template>

<script setup lang="ts">
import { nextTick, onMounted, Ref, ref } from 'vue';
import MainText from '../components/MainText.vue';
import ContextButton from '../components/ActionButtons.vue';
import { get_today, entry } from 'src/lib/data';
import { useDateStore } from 'src/stores/today_date';
import Papa from 'papaparse';
import { watch } from 'vue';
import { useQuasar } from 'quasar';
import { inject } from '@vercel/analytics'

const centralElement = ref(null) as Ref<HTMLElement | null>

onMounted(() => {
  inject();
});


const at_text = ref('');
const at_source = ref('');
const nt_text = ref('');
const nt_source = ref('');
const $q = useQuasar()



const toggleMobileButtons = ref(true)

function handleClick() {
  if ($q.platform.is.mobile) {
    toggleMobileButtons.value = !toggleMobileButtons.value
    $q.fullscreen.isActive && $q.fullscreen.exit()
  }
}

const secondsSinceMove = ref(0)

function handleMousemove() {
  secondsSinceMove.value = 0
}

setInterval(() => {
  secondsSinceMove.value += 1
}, 1000)

const store = useDateStore();

function switchAT() {
  store.setAT(true);
}

function switchNT() {
  store.setAT(false);
}


watch(() => store.at, () => {
  console.log('AT changed')
})

const strong_regex = /\/(.*?)\//g;

function parse() {
  Papa.parse(`/Losungen_${(new Date()).getFullYear()}.csv`, {
    encoding: 'utf-8',
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
