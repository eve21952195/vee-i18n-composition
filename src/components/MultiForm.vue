<script setup>
import { Form, Field, ErrorMessage } from "vee-validate";
import { ref, reactive, computed } from "vue";


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

// currentSchema
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
        <label for="name">Name</label>
        <Field name="name" id="name" />
        <ErrorMessage name="name" />

        <label for="email">Email</label>
        <Field name="email" id="email" type="email" />
        <ErrorMessage name="email" />
      </template>

      <template v-if="currentStep === 1">
        <label for="password">Password</label>
        <Field name="password" type="password" id="password" />
        <ErrorMessage name="password" />

        <label for="confirmation">Confirm Password</label>
        <Field name="confirmPassword" type="password" id="confirmation" />
        <ErrorMessage name="confirmPassword" />
      </template>

      <template v-if="currentStep === 2">
        <label for="address">Address</label>
        <Field as="textarea" name="address" id="address" />
        <ErrorMessage name="address" />

        <label for="postalCode">Postal Code</label>
        <Field name="postalCode" id="postalCode" />
        <ErrorMessage name="postalCode" />
      </template>

      <template v-if="currentStep === 3">
        <label for="terms">Agree to terms and conditions</label>
        <!-- 為何要  :value="true"-->
        <!-- 因為當 input 為 checkbox時， 默認的 value 是 "on"。 checked 屬性，才會跟著是否被摳選，值為 true / false-->
        <!-- Form v-slot 接的值都是 value。 不想要顯示的值是 "on"， 所以從新綁定 value 屬性 -->
        <Field name="terms" type="checkbox" id="terms" :value="'true'" />
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