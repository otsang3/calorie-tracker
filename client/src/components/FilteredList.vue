<template lang="html">
  <div>
    <filter-list-item v-if="meals" v-for="(meal, index) in meals" :key="index" :meal="meal"></filter-list-item>
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
</style>
