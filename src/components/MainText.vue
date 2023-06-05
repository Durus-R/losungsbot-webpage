<template>
  <h1>{{ props.text }}</h1>
</template>

<script lang="ts" setup>
const props = defineProps({
  text: String
})

</script>
