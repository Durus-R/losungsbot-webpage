<template>
  <q-layout view="lHh Lpr lFf">
    <q-page-container>
      <q-page class="fullscreen background flex flex-center">
        <div class="center-content">
          <div class="error-code">404</div>
          <div class="error-message">Diese Seite existiert nicht.</div>
          <div class="redirect-message">Wir leiten dich gleich zurück.</div>
        </div>
      </q-page>
    </q-page-container>
  </q-layout>
</template>

<script setup lang="ts">
import { onMounted } from 'vue';
import { useRouter } from 'vue-router';

const router = useRouter();

onMounted(() => {
  setTimeout(() => {
      router.push('/');
  }, 5000); // Redirect after 5 seconds
});
</script>

<style scoped>
.center-content {
  text-align: center;
}

.error-code {
  font-size: 30vh;
}

.error-message, .redirect-message {
  font-size: 2em;
  margin-bottom: 0.5em;
}
</style>
