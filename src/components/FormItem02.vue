<script setup>
import * as yup from "yup";
import { useForm, useField } from "vee-validate";

// yup rules
const schema = yup.object({
  email: yup.string().email().required(),
  password: yup.string().required().min(8),
});

// vee rules
const veeSchema = {
  email: "required|email",
  password: "required|min:8",
};

const { values, errors, defineInputBinds, handleSubmit } = useForm({
  validationSchema: veeSchema,
});

// values 物件，会跟着 input输入的值变动 {email: xxx}
// defineInputBinds("栏位字段名称") 方法返回一个物件。 {value: xxx}
const email = defineInputBinds("email");
const password = defineInputBinds("password");

// handleSubmit 在所有验证通过时，才会提交表单的方法。返回一個物件 {email: xxx}
const onSubmit = handleSubmit((values)=> {
    console.log(values);
    alert('验证通过时执行');
})
</script>

<template>
  <div>
    <h2>composition API</h2>
    <h2>ues useForm and defineInputBinds: 栏位一多，代码就多了</h2>
    <form @submit="onSubmit">
      email<input type="text" v-bind="email" /> {{ email }} 
      password<input
        type="text"
        v-bind="password"
      />
      {{ password }}
      <p>values ->{{ values }}</p>
      <p>errors -> {{ errors }}</p>

      <button>送出</button>
    </form>
  </div>
</template>