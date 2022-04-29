<template>
<div class="container">
    <div class="waterfall-flow" :style="{ height: `${containerHeight}px` }">
      <div
          class="waterfall-flow-item"
          v-for="(i, d) of waterfallFlowList"
          :key="i.id"
          :style="{
        left: `${i.left}px`,
        top: `${i.top}px`,
        width: `${columnWidth}px`,
        // eslint-disable-next-line prettier/prettier
        height: `${i.columnHeight}px`,
      }"
      >
        <slot :row="i" :index="d"></slot>
      </div>
    </div>
</div>
</template>

<script>
export default {
  name: "vuePubuliu"
}
</script>

<style scoped>
.container {
  height: 100%;
  width: 100%;
}
</style>
