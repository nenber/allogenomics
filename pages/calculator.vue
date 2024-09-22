
<template>
  <div class="page-container">
    <!-- Stepper at the top center -->
    <el-row
      justify="center"
      class="stepper-container"
    >
      <el-steps
        :active="active"
        finish-status="success"
        style="min-width: 60%;"
      >
        <el-step
          title="Data"
          description="Pair or cohort"
        />
        <el-step
          title="Upload"
          description="Upload required files"
        />
        <el-step
          title="Transplantation"
          description="HSCT or SOT"
        />
        <el-step
          title="Parameters"
          description="Submit and get results"
        />
      </el-steps>
    </el-row>

    <!-- Content centered vertically and horizontally -->
    <div class="content-wrapper">
      <component
        :is="stepComponents"
        @card-clicked="handleCardClick"
        @card-transplantation-clicked="handleCardTransplantationClick"
        @submit-clicked="handleSubmitClick"
        @handle-files-upload="handleFilesUpload"
        v-model="form"
      />
    </div>

    <!-- Buttons centered at the bottom -->
    <el-row class="stepper-container-bottom">
      <div class="button-group">
        <el-button
          v-if="active > 0"
          @click="returnStep"
        >Return</el-button>
        <el-button
          v-if="active === 1 "
          type="primary"
          @click="next"
        >Next step</el-button>
      </div>
    </el-row>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, watch } from "vue";

import chooseContent from "@/components/steps/choose.vue";
import pairContent from "@/components/steps/pair.vue";
import cohortContent from "@/components/steps/cohort.vue";
import chooseTransplantationContent from "@/components/steps/chooseTransplantation.vue";
import score from "@/components/steps/score.vue";

const active = ref(0);
const selectedCard = ref<boolean | null>(null);
const selectedTransplantationCard = ref<boolean | null>(null);

const currentStepComponent = computed(() => stepComponents[active.value]);

const form = ref({
  is_pair: true,
  transplantation_type: true,
  min_dp: null,
  max_dp: null,
  min_ad: null,
  homozigosity_thr: null,
  gnomad_af: null,
  min_gq: null,
  base_length: null,
  run_name: "",

  ns: false,
  // ws: false,
  full: true,
  pairRecipientFile: null,
  pairDonorFile: null,
  cohortMergedFile: null,
  cohortDonorRecipientListFile: null,
  pair: "",
});
watch(form, (newForm) => {
  console.log("new form", newForm);
});

const handleSubmitClick = (f) => {
  console.log("submit", form);
  // Optionally, you can automatically move to the next step here if needed
  // next();
};
// Step components
const stepComponents = computed(() => {
  console.log("form", form.value);

  if (active.value === 0) {
    return chooseContent;
  } else if (active.value === 1) {
    // Load different components based on card selection
    return selectedCard.value ? pairContent : cohortContent;
  } else if (active.value === 2) {
    return chooseTransplantationContent;
  } else if (active.value === 3) {
    return score;
  }
  return chooseContent;
});

// Move to the next step
const next = () => {
  if (active.value < 3) {
    active.value++;
  } else {
    active.value = 0; // Reset to the first step
  }
};
const returnStep = () => {
  if (active.value > 0) {
    active.value--;
  } else {
    active.value = 0; // Reset to the first step
  }
};

// Handle the card click event from the choose component
const handleCardClick = (cardType: boolean) => {
  selectedCard.value = cardType; // Store which card was clicked
  form.value.is_pair = cardType;
  if (cardType) {
    form.value.cohortDonorRecipientListFile = null;
    form.value.cohortMergedFile = null;
  } else {
    form.value.pairRecipientFile = null;
    form.value.pairDonorFile = null;
  }
  console.log(`Card clicked: ${cardType}`);
  next();
  // Optionally, you can automatically move to the next step here if needed
  // next();
};
const handleCardTransplantationClick = (cardType: boolean) => {
  selectedTransplantationCard.value = cardType; // Store which card was clicked
  form.value.transplantation_type = cardType;
  console.log(`Card transplantation clicked: ${cardType}`);
  next();
  // Optionally, you can automatically move to the next step here if needed
  // next();
};

const handleFilesUpload = (files: File[]) => {
  console.log("Uploaded files:", files);
  // Optionally, you can automatically move to the next step here if needed
  // next();
};
</script>

<style scoped>
.page-container {
  display: flex;
  flex-direction: column;
  min-height: auto !important;
  height: auto !important;
  padding: 20px;
}

.stepper-container {
  min-width: 50%;
  margin-bottom: 20px;
}

.content-wrapper {
  margin-top: 20px;
  flex-grow: 1;
  display: flex;
  justify-content: center;
  align-items: center;
}

.center-content {
  display: flex;
  justify-content: center;
  align-items: center;
}

.custom-card {
  cursor: pointer;
  text-align: center;
  transition: transform 0.3s ease;
}

.custom-card:hover {
  transform: translateY(-10px);
}

.card-content {
  display: flex;
  flex-direction: column;
  align-items: center;
}

h2 {
  margin-top: 10px;
  font-size: 24px;
}

/* Adjusted the button group to align buttons side by side at the center */
.stepper-container-bottom {
  display: flex;
  justify-content: center;
  margin-top: 20px;
}

.button-group {
  display: flex;
  gap: 20px; /* Adds spacing between the buttons */
  justify-content: center;
}

.el-button {
  font-size: 16px;
  padding: 10px 20px;
}
</style>
