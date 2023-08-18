<script setup>
import { ref } from "vue";
import { useSetLocale } from "../composables/useSetLocale";
const { setAllLocale, availableLocales } = useSetLocale();

// availableLocales - 在 messages 中可用的语言包列表

const changeLanguage = ($event) => {
  console.log("change val--->", $event.target.value);
  setAllLocale($event.target.value);
};

</script>

<template>
  <h2>{{ availableLocales }}</h2>
  <select @change="changeLanguage" >
    <option v-for="locale in availableLocales" :key="locale" :value="locale" :selected="(locale === 'zh_TW')">
      {{ locale }}
    </option>
  </select>
</template> 