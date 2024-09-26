<template>
  <div class="form-container">
    <el-card class="form-card" shadow="hover">
      <el-form
        :model="form"
        ref="formRef"
        label-position="left"
        label-width="300px"
        :rules="rules"
        @submit.prevent="submitForm"
      >
        <el-form-item label="Minimal depth per position" prop="min_dp">
          <el-input-number
            v-model="form.min_dp"
            :min="0"
            :max="form.max_dp"
            name="min_dp"
            placeholder="MIN_DP"
          />
        </el-form-item>

        <el-form-item label="Maximal depth per position" prop="max_dp">
          <el-input-number
            v-model="form.max_dp"
            :min="0"
            name="max_dp"
            placeholder="MAX_DP"
          />
        </el-form-item>

        <el-form-item label="Minimal allelic depth" prop="min_ad">
          <el-input-number
            v-model="form.min_ad"
            :min="0"
            :max="form.min_dp"
            name="min_ad"
            placeholder="MIN_AD"
          />
        </el-form-item>

        <el-form-item label="Homozygosity threshold" prop="homozigosity_thr">
          <template #label>
            <span>
              Homozygosity threshold
              <el-tooltip
                content="The threshold for determining homozygosity. A value closer to 1 indicates a higher confidence in homozygosity."
                placement="top"
              >
                <el-icon class="info-icon"><info-filled /></el-icon>
              </el-tooltip>
            </span>
          </template>
          <el-input-number
            v-model="form.homozigosity_thr"
            :min="0"
            :max="1"
            :step="0.01"
            name="homozigosity_thr"
            placeholder="HOMOZYGOSITY_THR"
          />
        </el-form-item>

        <el-form-item
          label="GnomADe allele frequency threshold"
          prop="gnomad_af"
        >
          <template #label>
            <span>
              GnomADe allele frequency threshold
              <el-tooltip
                content="GnomADe (Genome Aggregation Database) allele frequency threshold. Used to filter variants based on their prevalence in the general population."
                placement="top"
              >
                <el-icon class="info-icon"><info-filled /></el-icon>
              </el-tooltip>
            </span>
          </template>
          <el-input-number
            v-model="form.gnomad_af"
            :min="0"
            :max="1"
            :step="0.00001"
            name="gnomad_af"
            placeholder="GNOMAD_AF"
          />
        </el-form-item>

        <el-form-item label="Genotype quality threshold" prop="min_gq">
          <el-input-number
            v-model="form.min_gq"
            :min="0"
            name="min_gq"
            placeholder="MIN_GQ"
          />
        </el-form-item>

        <el-form-item label="Maximal indels length" prop="base_length">
          <template #label>
            <span>
              Maximal indels length
              <el-tooltip
                content="The maximum length of insertions or deletions (indels) to be considered in the analysis."
                placement="top"
              >
                <el-icon class="info-icon"><info-filled /></el-icon>
              </el-tooltip>
            </span>
          </template>
          <el-input-number
            v-model="form.base_length"
            :min="0"
            name="base_length"
            placeholder="BASE_LENGTH"
          />
        </el-form-item>

        <el-form-item label="Run name" prop="run_name">
          <el-input
            v-model="form.run_name"
            name="run_name"
            placeholder="RUN_NAME"
          />
        </el-form-item>

        <el-form-item label="Pair name" prop="pair" v-if="form.is_pair">
          <el-input v-model="form.pair" name="pair" placeholder="PAIR" />
        </el-form-item>

        <el-form-item label="Toggle score normalization" v-if="!form.is_pair">
          <template #label>
            <span>
              Toggle score normalization
              <el-tooltip
                content="Enable or disable score normalization. Normalization adjusts scores to a common scale, facilitating comparisons between different datasets or analysis methods."
                placement="top"
              >
                <el-icon class="info-icon"><info-filled /></el-icon>
              </el-tooltip>
            </span>
          </template>
          <el-switch v-model="form.ns" name="ns"></el-switch>
        </el-form-item>

        <!-- <el-form-item label="Worst consequence annotations">
          <el-switch
            v-model="form.ws"
            name="ws"
          ></el-switch>
        </el-form-item> -->

        <!-- <el-form-item label="Save more tables">
          <el-switch
            v-model="form.full"
            name="full"
            
          ></el-switch>
        </el-form-item> -->

        <el-form-item class="submit-container">
          <el-button type="primary" native-type="submit" :loading="isLoading"
            >Submit</el-button
          >
        </el-form-item>
      </el-form>
    </el-card>
  </div>
</template>

<script setup>
import { ref } from "vue";
import { InfoFilled } from "@element-plus/icons-vue";

const emit = defineEmits(["submit-clicked"]);
const formRef = ref(null);
const props = defineProps({
  modelValue: {
    type: Object,
    required: true,
  },
  isLoading: Boolean,
});
const form = props.modelValue;

const rules = {
  min_dp: [
    { required: true, message: "Minimal depth is required", trigger: "blur" },
    {
      type: "number",
      min: 0,
      max: form.max_dp,
      message: "Value must be greater than or equal to 0",
      trigger: "blur",
    },
  ],
  max_dp: [
    { required: true, message: "Maximal depth is required", trigger: "blur" },
    {
      type: "number",
      min: 0,
      message: "Value must be greater than or equal to 0",
      trigger: "blur",
    },
  ],
  min_ad: [
    {
      required: true,
      message: "Minimal read count is required",
      trigger: "blur",
    },
    {
      type: "number",
      min: 0,

      max: form.min_dp,
      message: "Value must be greater than or equal to 0",
      trigger: "blur",
    },
  ],
  homozigosity_thr: [
    {
      required: true,
      message: "Homozygosity threshold is required",
      trigger: "blur",
    },
    {
      type: "number",
      min: 0,
      max: 1,
      message: "Value must be between 0 and 1",
      trigger: "blur",
    },
  ],
  gnomad_af: [
    {
      required: true,
      message: "SNPs AF threshold is required",
      trigger: "blur",
    },
    {
      type: "number",
      min: 0,
      max: 1,
      message: "Value must be between 0 and 1",
      trigger: "blur",
    },
  ],
  min_gq: [
    {
      required: true,
      message: "Genotype quality is required",
      trigger: "blur",
    },
    {
      type: "number",
      min: 0,
      message: "Value must be greater than or equal to 0",
      trigger: "blur",
    },
  ],
  base_length: [
    { required: true, message: "Base length is required", trigger: "blur" },
    {
      type: "number",
      min: 0,
      message: "Value must be greater than or equal to 0",
      trigger: "blur",
    },
  ],
  run_name: [
    {
      required: true,
      trigger: "blur",
      pattern: /^[a-zA-Z0-9-_]+$/,
      message: "Only alphanumeric characters, '-' and '_' are allowed",
    },
  ],
  pair: [
    {
      required: true,
      pattern: /^[a-zA-Z0-9-_]+$/,
      message: "Only alphanumeric characters, '-' and '_' are allowed",
      trigger: "blur",
    },
  ],
};

const submitForm = () => {
  formRef.value.validate((valid) => {
    if (valid) {
      console.log("Form data:", formRef.value);
      emit("submit-clicked", formRef.value);
    } else {
      console.log("Form validation failed");
      return false;
    }
  });
};
</script>

<style scoped>
.form-container {
  margin-top: 20px;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: #f5f5f5;
}

.form-card {
  padding: 20px;
  width: 600px;
}

.el-form-item {
  margin-bottom: 20px;
}

.submit-container {
  display: flex;
  justify-content: center;
  flex-flow: column;
  margin-top: 60px;
}
.info-icon {
  margin-left: 5px;
  font-size: 16px;
  color: #909399;
  cursor: pointer;
}

.info-icon:hover {
  color: #409eff;
}
.el-form-item__content > div {
  width: 100%;
}
</style>
