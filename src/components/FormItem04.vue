<script setup>
import { reactive, computed, inject, defineProps, defineEmits } from "vue";
import { useForm, useField } from "vee-validate";
import InputItem04 from "./InputItem04.vue";
import { reach } from "yup";

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

const tt = reactive({a:1})

// 测试用
// const { value } = useField('email')

// 取得每个栏位的值、错误消息。
// 要传给子层
const { value: name, errorMessage: nameError } = useField("name", undefined, {
  label: computed(() => t("page1.name")),
});
const { value: email, errorMessage: emailError } = useField(
  "email",
  undefined,
  { label: computed(() => t("page1.email")) }
);
const { value: password, errorMessage: passwordError } = useField(
  "password",
  undefined,
  { label: computed(() => t("page1.password")) }
);

const bindProps = (namePar,typePar) => {
  console.log('tt', tt, tt.a)
  console.log('values', values)
  console.log('errors', errors)
  console.log(errors.value)
  return {
    name: namePar,
    type: typePar,
    errorMessage: errors['value'].name,
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
      <!-- v-model 绑定 useForm 的 vlaues 无效。 因为 vules 是纯字串 不是 Ref物件-->
      <!-- <input name="email" type="email" v-model="values.email"> -->
      <InputItem04   v-bind="bindProps('name', 'text')" v-model="name"
      ></InputItem04>
      <InputItem04
        name="email"
        type="email"
        :errorMessage="emailError"
        v-model="email"
      ></InputItem04>
      <InputItem04
        name="password"
        type="password"
        :errorMessage="passwordError"
        v-model="password"
      ></InputItem04>
      <button>送出</button>
    </form>
    <h2>values{{ values }}</h2>
    <h2>{{ errors }}</h2>
  </div>
</template>

<style scoped>
</style>