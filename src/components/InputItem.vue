<script setup>
import { inject, defineProps } from "vue";
import { useField } from "vee-validate";

const props = defineProps({
  name: String,
  type: String,
  modelValue: Object, // 預設的 props 名稱
});

const t = inject("t");

// 取得 value -> 該欄位的值
// 取得 errorMessage -> 該欄位的錯誤消息
// ??? 此處 label 問題是 只會吃到一開始設定的語系。後續 locale 改變，也不會跟著變　    label: t(`page1.${props.name}`),

// useField()方法终有支持 vmodel 同步的属性。
// syncVModel 实现了 v-model 的支持。在值 value 变化时，将会带着新值，触发emit onUpdate:modelValue 事件，往父层传。 syncVModel 相当于在 子园贱内做了一个 computed get/set
const { meta, value, errorMessage } = useField(
  props.name,
  {},
  {
    syncVModel: true, // 啟用 v-model 同步,
    label: t(`page1.${props.name}`)
  }
);
</script>

<template>
  <div>
    <label :for="name">{{ t(`page1.${name}`) }}</label>
    <input :name="name" :id="name" v-model="value" :type="type  || 'text'" label="" />
    {{ errorMessage }}
  </div>
  <!-- <p>meta: {{ meta }}</p> -->
</template>