<script setup>
import { provide } from "vue"
import FormItem from './components/FormItem.vue'
import FormItem02 from "./components/FormItem02.vue"
import FormItem03 from "./components/FormItem03.vue"
import HeaderItem from './components/HeaderItem.vue'
import MultiForm from "./components/MultiForm.vue"

// 引入 composable
import { useSetLocale } from "./composables/useSetLocale"

const { t } = useSetLocale()

provide("t", t)

</script>

<template>
  <div id="app">
    <!-- <HeaderItem></HeaderItem> -->
    <!-- <FormItem></FormItem>
    <hr>
    <FormItem02></FormItem02>
    <hr> -->
    <!-- <FormItem03></FormItem03> -->
    <MultiForm></MultiForm>
    <hr>
  
  </div>
  
</template>

<style scoped>
header {
  line-height: 1.5;
}

.logo {
  display: block;
  margin: 0 auto 2rem;
}

@media (min-width: 1024px) {
  header {
    display: flex;
    place-items: center;
    padding-right: calc(var(--section-gap) / 2);
  }

  .logo {
    margin: 0 2rem 0 0;
  }

  header .wrapper {
    display: flex;
    place-items: flex-start;
    flex-wrap: wrap;
  }
}
</style>
