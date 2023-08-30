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
    <input :name="name" :id="name" :type="type" :value="modelValue" @input="$emit('update:modelValue', $event.target.value)" class="form-control" :class="{'is-invalid': errorMessage}"/>
    <p class="invalid-feedback">{{ errorMessage }}</p>
  </div>
</template>

<style scoped>
.form-control {
  display: block;
  width: 20%;
  padding: 0.375rem 0.75rem;
  font-size: 1rem;
  font-weight: 400;
  line-height: 1.5;
  color: #495057;
  background-clip: padding-box;
  border: 1px solid #ced4da;
  border-radius: 0.25rem;
  background-color: rgb(24, 26, 27);
  border-color: rgb(60, 65, 68);
}
.is-invalid{
  border-color: rgb(148, 26, 37);
}
.invalid-feedback{
  color: red;  
}
</style>