<script setup>
// 此寫法為 統一在父元件使用 useForm、useField 拿資料。再單純傳 props，給子元件接。
// 是為了讓子元件保持單純，內部沒用到 vee-validate，子元件複用較彈性，不會有偶合的情況。

// 缺點: 由於useForm 的 vlaues 只能唯獨。 所以 value 必須從 useField 拿
// 所以有多個欄位的話，就要重複寫多個 useField
import { computed, inject } from "vue";
import { useForm, useField } from "vee-validate";
import InputItem04 from "./InputItem04.vue";

const t = inject("t");

// 集中宣告规则
const schma = {
  name: "required",
  email: "required|email",
  password: "required|min:8",
};

// 将 schma 作为参数 传入 useForm()
const { handleSubmit, values, errors } = useForm({
  validationSchema: schma,
});

// 取得每个栏位的值、错误消息。
// 要传给子层
const { value: name } = useField("name", undefined, {
  label: computed(() => t("page1.name")),
});
const { value: email } = useField("email", undefined, {
  label: computed(() => t("page1.email")),
});
const { value: password } = useField("password", undefined, {
  label: computed(() => t("page1.password")),
});

const bindProps = (fieldName, fieldType) => {
  console.log("errors", errors);
  console.log(errors.value);
  return {
    name: fieldName,
    type: fieldType,
    // error 是 ref物件，所以取值要記得 .value
    errorMessage: errors.value[fieldName],
  };
};

const onSubmit = handleSubmit((values) => {
  console.log(values);
  alert("验证通过时执行");
});
</script>

<template>
  <div>
    <h2>composition API</h2>
    <h2>use useField()、props 传子层</h2>
    <form @submit="onSubmit">
      <!-- v-model 绑定 useForm 的 vlaues 无效。據官方文件，useForm 的 vlaues 只能唯獨。不可以被操作修改，也就無法當作 v-model  -->
      <!-- 利用 v-bind 將 props 一次綁定 -->
      <InputItem04
        v-bind="bindProps('name', 'text')"
        v-model="name"
      ></InputItem04>
      <InputItem04
        v-bind="bindProps('email', 'email')"
        v-model="email"
      ></InputItem04>
      <InputItem04
        v-bind="bindProps('password', 'password')"
        v-model="password"
      ></InputItem04>
      <button>送出</button>
    </form>
    <h2>useForm-values:　{{ values }}</h2>
    <h2>errors:　{{ errors }}</h2>
  </div>
</template>

<style scoped>
</style>