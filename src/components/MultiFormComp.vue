<script setup>
import { reactive } from "vue";
import FormWizard from "./FormWizard.vue";
import FormStep from "./FormStep.vue";
import { Field } from "vee-validate";

const validationSchema = [
    {
        fullName: "required",
        email:"required|email"
    },
    {
        password: "required|min:8",
        confirmPassword: "required|confirmed:@password",
    },
    {
        favoriteDrink: "required|one_of:coffee, tea, soda"
    }
]


/**
 * Only Called when the last step is submitted
 */
function onSubmit(formData) {
  console.log(JSON.stringify(formData, null, 2));
}

const initialValues = reactive({ email: "123" });
</script>

<template>
  <div>
    <FormWizard :validation-schema="validationSchema" @submit="onSubmit">
      <FormStep v-slot="stepForm">
        <Field
          name="fullName"
          type="text"
          placeholder="Type your Full name"
          class="form-control"
        />
        <ErrorMessage name="fullName" class="invalid-feedback" />

        <Field name="email" type="email" placeholder="Type your email" />
        <ErrorMessage name="email" />
      </FormStep>

      <FormStep>
        <Field
          name="password"
          type="password"
          placeholder="Type a strong one"
        />
        <ErrorMessage name="password" />

        <Field
          name="confirmPassword"
          type="password"
          placeholder="Confirm your password"
        />
        <ErrorMessage name="confirmPassword" />
      </FormStep>

      <FormStep>
        <Field name="favoriteDrink" as="select">
          <option disabled>Select a drink</option>
          <option value="coffee">Coffee</option>
          <option value="tea">Tea</option>
          <option value="soda">Soda</option>
        </Field>
        <ErrorMessage name="favoriteDrink" />
      </FormStep>
    </FormWizard>
  </div>
</template>


<style scoped>
input,
select {
  margin: 10px 0;
  display: block;
}

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
.invalid-feedback {
  color: red;
}

.is-invalid {
  border-color: rgb(148, 26, 37);
}
</style>