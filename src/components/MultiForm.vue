<script setup>
import { integer } from "@vee-validate/rules";
import { Form, Field, ErrorMessage } from "vee-validate";
import { ref, reactive, computed, inject } from "vue";

const t = inject("t")


const currentStep = ref(0);

// schema
const schemas = [
  {
    name: "required",
    email: "required|email",
  },
  {
    password: "required|min:8",
    confirmPassword: "required|confirmed:@password",
  },
  {
    address: "required",
    postalCode: "required|numeric"
  },{
    terms: "required|is:true" //????
  }
];

// currentSchema 目前要用的表
const currentSchema = computed(() => {
  return schemas[currentStep.value];
});

// nextStep
const nextStep = (values) => {
  if (currentStep.value === 3) {
    console.log("Done: ", JSON.stringify(values, null, 2));
    return;
  }

  currentStep.value++;
};

// prevStep
const prevStep = ()=> {
    if(currentStep.value <=0) return
    currentStep.value--;
}

// onSubmit
const onSubmit = (value)=>{
    console.log('value --->', value);
    console.log('驗種通過');
}

</script>

<template>
  <div>
    <Form
      @submit="nextStep"
      :validation-schema="currentSchema"
      keep-values
      v-slot="{ handleSubmit, values, resetForm }"
    >
      <template v-if="currentStep === 0">
        <label for="name">{{ t('page1.name') }}</label>
        <Field name="name" id="name" :label="t('page1.name')"/>
        <ErrorMessage name="name" />

        <label for="email">{{ t('page1.email') }}</label>
        <Field name="email" id="email" type="email" :label="t('page1.email')" />
        <ErrorMessage name="email" />
      </template>

      <template v-if="currentStep === 1">
        <label for="password">{{ t('page1.password') }}</label>
        <Field name="password" type="password" id="password" :label="t('page1.password')" />
        <ErrorMessage name="password" />

        <label for="confirmation">{{ t('page1.confirmPassword') }}</label>
        <Field name="confirmPassword" type="password" id="confirmation" :label="t('page1.confirmPassword')" />
        <ErrorMessage name="confirmPassword" />
      </template>

      <template v-if="currentStep === 2">
        <label for="address">{{ t('page1.address') }}</label>
        <Field as="textarea" name="address" id="address" :label="t('page1.address')"/>
        <ErrorMessage name="address" />

        <label for="postalCode">{{ t('page1.postalCode') }}</label>
        <Field name="postalCode" id="postalCode" :label="t('page1.postalCode')"/>
        <ErrorMessage name="postalCode" />
      </template>

      <template v-if="currentStep === 3">
        <label for="terms">{{t('page1.Agree to terms and conditions')}}</label>
        <!-- 為何要  :value="true"-->
        <!-- 因為當 input 為 checkbox時， 默認的 value 是 "on"。 checked 屬性，才會跟著是否被摳選，值為 true / false-->
        <!-- Form Field v-slot 接的值都是 value。 不想要顯示的值是 "on"， 所以從新綁定 value 屬性 -->
        <Field name="terms" type="checkbox" id="terms" :value="'true'" :label="t('page1.Agree to terms and conditions')"/>
        <ErrorMessage name="terms" />
      </template>

      <button v-if="currentStep !== 0" type="button" @click="prevStep">Previous</button>
      <button v-if="currentStep !== 3" type="submit">Next</button>
      <button v-if="currentStep === 3" type="submit">Finish</button>

      <button type="button" @click="resetForm">reset</button>

      <pre>{{ values }}</pre>
    </Form>
  </div>
</template>

<style scoped>
#app {
  font-family: Arial, Helvetica, sans-serif;
  max-width: 500px;
  padding-bottom: 100px;
}

input {
  display: block;
}

span {
  display: block;
  margin-bottom: 20px;
}

label {
  display: block;
  margin-top: 20px;
}

button {
  display: block;
  margin-top: 10px;
}

button[type="submit"] {
  margin-top: 10px;
}

form {
  padding: 20px;
  border: 1px solid black;
}

p {
  font-size: 14px;
}
</style>