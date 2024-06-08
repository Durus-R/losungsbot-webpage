<template>
  <q-page
    v-touch-swipe.mouse.up="()=>store.setAT(true)"
    v-touch-swipe.mouse.down="()=>store.setAT(false)"
    @click="handleClick"
    @mousemove="handleMousemove"
  >
    <div class="sr-only">
    BARRIEREFREIER TEXT | ACCESSIBLE TEXT:
      Losungsvers: <div v-html="at_text" /> ({{at_source}}). Lehrvers: <div v-html="nt_text" /> ({{nt_source}}).
    </div>
    <div class="column items-center justify-center">
    <MainText
      ref="centralElement"
      :at_text="at_text"
      :at_source="at_source"
      :nt_text="nt_text"
      :nt_source="nt_source"
    ></MainText>
    <transition
      appear
      appear-active-class="animated slow pulse"
      enter-active-class="animated slow fadeIn"
      leave-active-class="animated {{text_animation_fadeout_speed}} fadeOut"
    >
      <p v-if="!force_no_click_hint && (secondsSinceMove < 5) && !($q.platform.is.mobile)">(Klicken, um zwischem Losungsvers und Lehrvers zu wechseln)</p>
    </transition>
  </div>
  </q-page>
  <ContextButton :toggleButtons="toggleMobileButtons" :at_source="at_source" :nt_source="nt_source"></ContextButton>
</template>

<script setup lang="ts">
import { onMounted, Ref, ref } from 'vue';
import MainText from '../components/MainText.vue';
import ContextButton from '../components/ActionButtons.vue';
import { get_today, entry } from 'src/lib/data';
import { useDateStore } from 'src/stores/today_date';
import Papa from 'papaparse';
import { watch } from 'vue';
import { useQuasar } from 'quasar';
import { inject } from '@vercel/analytics'
import sanitizeHtml from 'sanitize-html'
import { sleep } from 'src/lib/sleeping';

const centralElement = ref(null) as Ref<HTMLElement | null>

onMounted(inject)

const force_no_click_hint = ref(false)

const text_animation_fadeout_speed = ref('slow')

const at_text = ref('');
const at_source = ref('');
const nt_text = ref('');
const nt_source = ref('');
const $q = useQuasar()

const toggleMobileButtons = ref(true)

const click_lock = ref(false)

async function handleClick() {
  if ($q.platform.is.mobile) {
    toggleMobileButtons.value = !toggleMobileButtons.value
  } else {
    if (click_lock.value) {
      return
    }
    click_lock.value = true
    force_no_click_hint.value = true
    text_animation_fadeout_speed.value = 'fast'
    setTimeout(()=> {
      force_no_click_hint.value = false
    }, 800)
    await sleep(200)
    store.switchAT()
    setTimeout(()=>{click_lock.value = false}, 200)
    text_animation_fadeout_speed.value = 'slow'
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

const strong_regex = /\/(.*?)\//g;

function parse() {
  Papa.parse(`/Losungen_${(new Date()).getFullYear()}.csv`, {
    encoding: 'utf-8',
    download: true,
    complete: (result) => {
      const jsonData = result.data as entry[];
      const now = store.date;
      at_text.value =
        sanitizeHtml(get_today(jsonData, now)?.at_text.replaceAll(
          strong_regex,
          '<strong>$1</strong>'
        ) ?? '');
      at_source.value = get_today(jsonData, now)?.at_source ?? '';
      nt_text.value =
        sanitizeHtml(get_today(jsonData, now)?.nt_text.replaceAll(
          strong_regex,
          '<strong>$1</strong>'
        ) ?? '');
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
