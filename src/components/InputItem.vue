<script setup>
import { inject, defineProps, watch, computed } from "vue";
import { useField } from "vee-validate";

const props = defineProps({
  name: String,
  type: String,
//   modelValue: Object, // 預設的 props 名稱
});

const t = inject("t");

// 取得 value -> 該欄位的值
// 取得 errorMessage -> 該欄位的錯誤消息
// 此處 label: t(`page1.${props.name}`) -> 只會吃到一開始設定的語系。後續 locale 改變，也不會跟著變
// 要用 computed 包 t(`page1.${props.name}`)。这样才会跟着变动
// 因为 locale 改变时， return 的 t(`page1.${props.name}`) 字串也会改变。也就是说 return 的值有变动，所以使 computed 重新渲染

// useField() 第一个参数(必填): input 'name'属性的值 。第二个参数: 验证规则。第三个参数: 设置初始值、label ...
const { meta, value, errorMessage } = useField(
  props.name,
  undefined,
  {
    // syncVModel: true, // 啟用 v-model 同步,
    label: computed(()=> t(`page1.${props.name}`)),
  }
);


</script>

<template>
  <div>
    <label :for="name">{{ t(`page1.${name}`) }}</label>
    <input
      :name="name"
      :id="name"
      v-model="value"
      :type="type || 'text'"
      class="form-control"
      :class="{'is-invalid': errorMessage}"
    />
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
}</style>