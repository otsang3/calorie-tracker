<template lang="html">
  <div>
    <person-form></person-form>
    <br>
    <br>
    <food-form></food-form>
    <br>
    <br>
    <entries-form></entries-form>
  </div>
</template>

<script>
import foodForm from '@/components/foodForm.vue'
import personForm from '@/components/personForm.vue'
import entriesForm from '@/components/entriesForm.vue';
export default {
  name: 'app',
  components: {
    'entries-form': entriesForm,
    'food-form': foodForm,
    'person-form': personForm
  }
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
