<template>
  <div class="form-item-info">
    <i class="bi bi-info-circle-fill" />
    <div class="content">
      <slot />
    </div>
  </div>
</template>
<style scoped lang="scss">
.form-item-info {
  border: 1px solid rgba(0, 0, 0, 0.125);
  border-radius: 8px;
  padding: 0.25em;
  margin-top: 0.5em;

  display: flex;
  flex-direction: row;
  align-items: center;

  i {
    margin-right: 0.5em;
  }

  .content {
    display: flex;
    flex-direction: column;
  }
}
</style>