<template>
  <div class="page-container">
    <!-- Stepper at the top center -->
    <el-row justify="center" class="stepper-container">
      <el-steps :active="active" finish-status="success" style="min-width: 60%">
        <el-step title="Data" description="Pair or cohort" />
        <el-step title="Upload" description="Upload required files" />
        <el-step title="Transplantation" description="HSCT or SOT" />
        <el-step title="Parameters" description="Submit and get results" />
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
        :is-loading="isLoading"
      />
    </div>

    <!-- Buttons centered at the bottom -->
    <el-row class="stepper-container-bottom">
      <div class="button-group">
        <el-button v-if="active > 0" @click="returnStep">Return</el-button>
        <el-button v-if="active === 1" type="primary" @click="next"
          >Next step</el-button
        >
      </div>
    </el-row>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, watch } from "vue";
import { ElMessage, ElNotification } from "element-plus";

import chooseContent from "@/components/steps/choose.vue";
import pairContent from "@/components/steps/pair.vue";
import cohortContent from "@/components/steps/cohort.vue";
import chooseTransplantationContent from "@/components/steps/chooseTransplantation.vue";
import score from "@/components/steps/score.vue";

const active = ref(0);
const selectedCard = ref<boolean | null>(null);
const selectedTransplantationCard = ref<boolean | null>(null);
const isLoading = ref<boolean>(false);

const currentStepComponent = computed(() => stepComponents[active.value]);

const form = ref({
  is_pair: true,
  transplantation_type: true,
  min_dp: 20,
  max_dp: 400,
  min_ad: 5,
  homozigosity_thr: 0.8,
  gnomad_af: 0.01,
  min_gq: 20,
  base_length: 3,
  run_name: "",

  ns: false,
  full: true,
  pairRecipientFile: null,
  pairDonorFile: null,
  cohortMergedFile: null,
  cohortDonorRecipientListFile: null,
  pair: "",
  sample: false,
});
watch(form, (newForm) => {
  //console.log("new form", newForm);
});

const handleSubmitClick = async (f) => {
  if (form.value.sample == false) {
    if (
      (form.value.pairDonorFile === null &&
        !form.value.pairRecipientFile === null) ||
      (form.value.cohortMergedFile === null &&
        !form.value.cohortDonorRecipientListFile === null)
    ) {
      ElNotification({
        title: "Error",
        dangerouslyUseHTMLString: true,
        message: `All files are required to run the pipeline`,
        type: "error",
        position: "bottom-right",
      });
      return;
    }
  }

  const formData = new FormData();

  formData.append("run_name", form.value.run_name);
  formData.append("is_pair", form.value.is_pair.toString());
  formData.append(
    "transplantation_type",
    form.value.transplantation_type.toString()
  );
  formData.append("min_dp", form.value.min_dp.toString());
  formData.append("max_dp", form.value.max_dp.toString());
  formData.append("min_ad", form.value.min_ad.toString());
  formData.append("homozigosity_thr", form.value.homozigosity_thr.toString());
  formData.append("gnomad_af", form.value.gnomad_af.toString());
  formData.append("min_gq", form.value.min_gq.toString());
  formData.append("base_length", form.value.base_length.toString());

  formData.append("ns", form.value.ns.toString());
  formData.append("full", form.value.full.toString());
  formData.append("pairRecipientFile", form.value.pairRecipientFile);
  formData.append("pairDonorFile", form.value.pairDonorFile);
  formData.append("cohortMergedFile", form.value.cohortMergedFile);
  formData.append("sample", form.value.sample);
  formData.append(
    "cohortDonorRecipientListFile",
    form.value.cohortDonorRecipientListFile
  );
  formData.append("pair", form.value.pair);

  //console.log(formData);
  console.log("sending form", formData.values());

  try {
    isLoading.value = true;
    const response = await fetch("/api/pipeline", {
      method: "POST",
      body: formData,
    });
    const result = await response.json();
    await navigateTo("/result_score");

    console.log(result);
  } catch (error) {
    console.error("Error :", error);
  } finally {
    isLoading.value = false;
  }
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
