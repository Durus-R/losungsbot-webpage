<template>
  <q-page
    v-touch-swipe.mouse.down="()=>store.setAT(true)"
    v-touch-swipe.mouse.up="()=>store.setAT(false)"
    @click="handleClick"
    @mousemove="handleMousemove"
  >
    <div class="sr-only">
      BARRIEREFREIER TEXT | ACCESSIBLE TEXT:
      Losungsvers:
      <div v-html="web_data.at_text" />
      ({{ web_data.at_source }}). Lehrvers:
      <div v-html="nt_text" />
      ({{ web_data.nt_source }}).
    </div>
    <div class="column items-center justify-center">
      <MainText
        :at_text="web_data.at_text"
        :at_source="web_data.at_source"
        :nt_text="web_data.nt_text"
        :nt_source="web_data.nt_source"
      ></MainText>
      <transition
        appear
        appear-active-class="animated slow pulse"
        enter-active-class="animated slow fadeIn"
        leave-active-class="animated {{text_animation_fadeout_speed}} fadeOut"
      >
        <p v-if="!force_no_click_hint && (secondsSinceMove < 5) && !($q.platform.is.mobile)">(Klicken, um zwischem
          Losungsvers und Lehrvers zu wechseln)</p>
      </transition>
    </div>
  </q-page>
  <ContextButton :toggleButtons="toggleMobileButtons" :at_source="web_data.at_source" :nt_source="web_data.nt_source"></ContextButton>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import MainText from '../components/MainText.vue';
import ContextButton from '../components/ActionButtons.vue';
import { webData } from 'src/lib/data';
import { useDateStore } from 'src/stores/today_date';
import { watch } from 'vue';
import { useQuasar } from 'quasar';
import { sleep } from 'src/lib/sleeping';
import { parse, parseResult } from 'src/lib/csv';


const force_no_click_hint = ref(false);

const text_animation_fadeout_speed = ref('slow');

const web_data = ref<webData>({
  at_text: '',
  at_source: '',
  nt_text: '',
  nt_source: ''
});

const $q = useQuasar();

const toggleMobileButtons = ref(true);

const click_lock = ref(false);

async function handleClick() {
  if ($q.platform.is.mobile) {
    toggleMobileButtons.value = !toggleMobileButtons.value;
  } else {
    if (click_lock.value) {
      return;
    }
    click_lock.value = true;
    force_no_click_hint.value = true;
    text_animation_fadeout_speed.value = 'fast';
    setTimeout(() => {
      force_no_click_hint.value = false;
    }, 800);
    await sleep(200);
    store.switchAT();
    setTimeout(() => {
      click_lock.value = false;
    }, 200);
    text_animation_fadeout_speed.value = 'slow';
  }
}

const secondsSinceMove = ref(0);

function handleMousemove() {
  secondsSinceMove.value = 0;
}

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
