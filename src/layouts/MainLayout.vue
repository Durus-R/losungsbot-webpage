<template>
  <q-layout view="lHh Lpr lFf" class="dark-background">
    <q-header elevated class = "header">
      <q-toolbar>
        <q-toolbar-title> Purim Online - Tageslosung </q-toolbar-title>
        <QBtn
          round
          flat
          icon="code"
          class="github-icon-button"
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
import { QBtn } from 'quasar';

</script>
