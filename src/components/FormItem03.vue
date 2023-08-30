<script setup>
// 此寫法為 在父元件使用 使用 useForm() 带入 schema。并用 props 传入 name栏位名称。
// 子元件 内部使用 useField() 接到从父曾传来的 name，作为参数。产生各栏位需要用到的值

// 优点: 官方推荐。多栏位时，不用写很多次 useField()
// 缺点: 子元件耦合。如果没用到 vee-validate时，就会坏掉
import { ref, reactive } from "vue";
import InputItem from "./InputItem.vue";
import { useForm } from "vee-validate";

// 集中宣告规则
const schma = {
  name: "required",
  email: "required|email",
  password: "required|min:8",
};

// 將 schma 帶入 useForm
const { handleSubmit,values } = useForm({
  validationSchema: schma,
});

const onSubmit = handleSubmit((values) => {
  console.log(values);
  alert("验证通过时执行");
});

</script>

<template>
  <div>
    <h2>composition API</h2>
    <h2>use useField()</h2>
    <form @submit="onSubmit"> 
      <InputItem  name="name" ></InputItem>
      <InputItem
        name="email"
        type="email"
      ></InputItem>
      <InputItem
        name="password"
        type="password"
      ></InputItem>
      <button>送出</button>
    </form>
    <h2>父層 useForm values: {{ values }}</h2>
  </div>
</template>
