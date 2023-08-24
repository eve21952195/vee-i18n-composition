<script setup>
import { ref, reactive } from "vue";
import InputItem from "./InputItem.vue";
import { useForm } from "vee-validate";

const schma = {
  name: "required",
  email: "required|email",
  password: "required|min:8",
};

const { handleSubmit,values } = useForm({
  validationSchema: schma,
});

const onSubmit = handleSubmit((values) => {
  console.log(values);
  alert("验证通过时执行");
});

const getvalue = reactive({});
</script>

<template>
  <div>
    <h2>composition API</h2>
    <h2>use useField()</h2>
    <form @submit="onSubmit"> 
      <InputItem id="name" name="name" ></InputItem>
      <InputItem
        id="email"
        name="email"
        type="email"
      ></InputItem>
      <InputItem
        id="password"
        name="password"
        type="password"
      ></InputItem>
      <button>送出</button>
    </form>
    <!-- <h2>父層 syncVModel getvalue: {{ getvalue }}</h2> -->
    <h2>父層 useForm values: {{ values }}</h2>
  </div>
</template>
