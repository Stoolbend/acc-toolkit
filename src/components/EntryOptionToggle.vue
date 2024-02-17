<script lang="ts" setup>
const value = defineModel<boolean | number>()

function toggle() {
  if (typeof value.value === 'number') value.value = value.value === 0 ? 1 : 0
  else value.value = !value.value
}
</script>

<template>
  <b-button class="option-toggle" :variant="value ? 'info' : 'outline-info'" size="sm" @click="toggle">
    <slot />
  </b-button>
</template>

<style lang="scss" scoped>
</style>
