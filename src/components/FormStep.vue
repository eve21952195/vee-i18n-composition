
<script setup>
import { computed, inject } from "vue";

// This is a ref injected from FormWizard
// clones the step index to get the step's index and advances it by 1 for the next step
// meaning each step gets a index id starting from 1
// 每一个步奏有自己的索引值
const currentIdx = inject("STEP_COUNTER").value++;

// Grabs the live ref to the current form active step
// 当前步奏索引值
const formStepIdx = inject("CURRENT_STEP_INDEX");

// If this step should be shown 是否显示
const shouldShow = computed(() => {
  return currentIdx === formStepIdx.value;
});
</script>
  
  <template>
  <div v-if="shouldShow">
    <slot />
  </div>
</template>