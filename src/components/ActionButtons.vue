<template>
  <div v-if="!($q.platform.is.mobile && $q.fullscreen.isActive)">
    <QBtn round size="lg" v-if="$q.platform.is.mobile" icon="fullscreen" class="fullscreen-btn" @click="$q.fullscreen.request()"></QBtn>
    <QBtn
      @click="handleCalendarclick"
      size="lg"
      round
      icon="event"
      class="calendar-btn"
      ><QPopupProxy cover transition-show="scale" transition-hide="scale"
        ><q-date
          :navigation-max-year-month="max_date"
          :navigation-min-year-month="min_date"
          v-model="proxyDate"
          today-btn
          dark
          color="orange"
          :locale="ger_Locale"
        >
          <div class="row items-center justify-end q-gutter-sm">
            <q-btn label="Cancel" color="primary" flat v-close-popup />
            <q-btn
              label="OK"
              color="primary"
              flat
              @click="handleCalendarclick"
              v-close-popup
            />
          </div> </q-date></QPopupProxy
    ></QBtn>
    <QBtn :href="hyperlink" size="lg" round icon="book" class="bibleserver-btn">
    </QBtn
    ><QIcon
      name="expand_less"
      size="lg"
      class="icon-up"
      v-if="$q.platform.is.mobile && store.at"
    ></QIcon>
    <QIcon
      name="expand_less"
      size="lg"
      class="icon-up animated-icon-up"
      color="grey"
      v-if="$q.platform.is.mobile && store.at"
    ></QIcon>
    <QIcon
      name="expand_more"
      size="lg"
      class="icon-down"
      v-if="$q.platform.is.mobile && !store.at"
    ></QIcon>
    <QIcon
      name="expand_more"
      size="lg"
      class="icon-down animated-icon-down"
      color="grey"
      v-if="$q.platform.is.mobile && !store.at"
    ></QIcon>
  </div>
</template>

<script lang="ts" setup>
import { useDateStore } from 'src/stores/today_date';
import { computed, watch, ref } from 'vue';
import { QBtn, QPopupProxy, QIcon, useQuasar } from 'quasar';

const store = useDateStore();
const $q = useQuasar();

const props = defineProps({
  at_source: String,
  nt_source: String,
});

const max_date = `${new Date().getFullYear()}/12`;
const min_date = `${new Date().getFullYear()}/01`;
const proxyDate = ref(store.date);

function handleCalendarclick() {
  store.setDate(new Date(proxyDate.value));
}

const hyperlink = computed(() => {
  if (store.at) {
    return (
      'https://www.bibleserver.com/LUT/' + props.at_source?.replaceAll(' ', '')
    );
  } else {
    return (
      'https://www.bibleserver.com/LUT/' + props.nt_source?.replaceAll(' ', '')
    );
  }
});
watch(hyperlink, () => {
  store.$patch({
    url: hyperlink.value,
  });
});

const ger_Locale = {
  /* starting with Sunday */
  days: 'Sonntag_Montag_Dienstag_Mittwoch_Donnerstag_Freitag_Samstag'.split(
    '_'
  ),
  daysShort: 'So_Mo_Di_Mi_Do_Fr_Sa'.split('_'),
  months:
    'Januar_Februar_März_April_Mai_Juni_Juli_August_September_Oktober_Dezember'.split(
      '_'
    ),
  monthsShort: 'Jan_Feb_Mär_Apr_Mai_Jun_Jul_Aug_Sep_Okt_Dez'.split('_'),
  firstDayOfWeek: 1, // 0-6, 0 - Sunday, 1 Monday, ...
  format24h: true,
  pluralDay: 'Tage',
};
</script>
