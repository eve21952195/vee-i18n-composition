<script setup>
import { watch, inject } from "vue"
// import { useI18n } from "vue-i18n";


// const { t, locale } = useI18n();

// 監聽 vue-i18n 的 locale 
// watch(locale, (newVal)=> {
//   console.log("vue-i18n改變了");
//   setLocale(newVal)
// })

const t = inject("t")

</script>

<template>
  <div class="item">
    <h1>vee-validate 元件、規則 composition、@vee-validate/i18n</h1>
    <!-- <h2>locale-{{ locale }}</h2> -->
    <Form>
      <label for="name">{{ t("page1.name") }}</label>
      <Field
        name="name"
        :label="t('page1.name')"
        as="input"
        type="text"
        rules="required"
      />
      <ErrorMessage name="name"></ErrorMessage>   
    </Form>

  </div>
</template>

<style scoped>
</style>
