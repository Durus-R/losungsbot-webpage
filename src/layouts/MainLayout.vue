<template>
  <q-layout view="lHh Lpr lFf" class="dark-background">
    <q-header elevated class="header">
      <q-toolbar>
        <q-toolbar-title> Purim Web - Losung für den {{ today }} </q-toolbar-title>
        <QBtn
          round
          flat
          v-if="!is_mobile_device"
          icon="code"
          href="https://github.com/Durus-R"
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
import { QBtn } from 'quasar';
import { useDateStore } from 'src/stores/today_date';
import { formatDate } from 'src/lib/data'

const store = useDateStore()

const isIPhone = /iPhone/i.test(navigator.userAgent);
const isAndroid = /Android/i.test(navigator.userAgent);

const today = computed(()=> {
  return formatDate(store.date)
})

const is_mobile_device = isIPhone || isAndroid;
</script>
