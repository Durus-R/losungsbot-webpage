<template>
  <q-layout view="lHh Lpr lFf" class="dark-background">
    <q-header elevated class="header" v-if="!($q.platform.is.mobile && $q.fullscreen.isActive)">
      <q-toolbar>
        <q-toolbar-title v-if="$q.platform.is.desktop">
          Purim Web - Losung für den {{ today }}
        </q-toolbar-title>
        <q-toolbar-title v-else class="text-center">
          {{ today }}
        </q-toolbar-title>
        <QBtn
          round
          flat
          v-if="!$q.platform.is.mobile"
          icon="code"
          href="https://github.com/Durus-R/losungsbot-webpage"
        >
        </QBtn>
      </q-toolbar>
    </q-header>

    <q-page-container>
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script setup lang="ts">
import { computed } from 'vue';
import { QBtn, useQuasar } from 'quasar';
import { useDateStore } from 'src/stores/today_date';
import { formatDate } from 'src/lib/data';

const store = useDateStore();
const $q = useQuasar();

const today = computed(() => {
  return formatDate(store.date);
});
</script>
