<template lang="html">
  <div class="flex-container">
    <filter-list-item v-for="(meal, index) in meals" :key="index" :meal="meal"></filter-list-item>
  </div>
</template>

<script>
import ListItem from '@/components/FilteredListItems.vue';

export default {
  name: 'display-list',
  props: ['meals'],
  components: {
    'filter-list-item': ListItem
  }
}
</script>

<style lang="css" scoped>
    .flex-container {
      display: flex;
      flex-wrap: wrap;
      justify-content: center;
    }
</style>
