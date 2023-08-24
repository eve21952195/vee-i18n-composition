<script setup>
import { ref, inject, defineProps, defineEmits } from "vue";

const t = inject("t")

const props = defineProps({
  name: String,
  type: String,
  errorMessage: String,
  modelValue: String
});

const emit =  defineEmits(['update:modelValue'])

</script>

<template>
  <!-- -v-model 不能绑 props。v-model="fieldValue" 会跳错误  -->
  <div>
    <label :for="name">{{ t(`page1.${name}`) }}</label>
    <input :name="name" :id="name" :type="type" :value="modelValue" @input="$emit('update:modelValue', $event.target.value)" />
    <p class="invalid-feedback">{{ errorMessage }}</p>
  </div>
</template>

<style scoped>
.invalid-feedback{
  color: red;  
}
</style>