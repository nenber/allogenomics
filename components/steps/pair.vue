<template>
  <div class="component-container">
    <div
      class="card"
      style="min-width: 558px"
    >
      <div class="card-header">
        <h2>Pair</h2>
      </div>
      <div class="card-body">
        <!-- Button for demo data -->
        <el-form-item
          label="Use demo data"
          style="margin-left: 20px"
        >
          <el-switch v-model="useDemoData" />
        </el-form-item>
        <div v-if="useDemoData">
          <el-form-item style="margin-left: 20px">
            <el-button
              type="primary"
              click="downloadFiles"
            >
              <el-icon style="margin-right: 5px">
                <Download />
              </el-icon>
              Demo
            </el-button>
          </el-form-item>
        </div>
        <div
          v-else
          class="upload-container"
        >
          <el-upload
            ref="uploadRecipient"
            class="upload-demo"
            drag
            :limit="1"
            :auto-upload="false"
            :on-change="handleChangeRecipient"
            :accept="acceptedFileTypes"
            :on-success="handleSuccess"
            :on-error="handleError"
            :before-upload="beforeUpload"
            :on-remove="handleRemoveRecipient"
          >
            <el-icon class="el-icon--upload">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                height="24px"
                viewBox="0 -960 960 960"
                width="24px"
                fill="#666666"
              >
                <path d="M200-40v-40q0-139 58-225.5T418-480q-102-88-160-174.5T200-880v-40h80v40q0 11 .5 20.5T282-840h396q1-10 1.5-19.5t.5-20.5v-40h80v40q0 139-58 225.5T542-480q102 88 160 174.5T760-80v40h-80v-40q0-11-.5-20.5T678-120H282q-1 10-1.5 19.5T280-80v40h-80v-40q0-11-.5-20.5T282-240H558q-1 10-1.5 19.5T558-120h-278Zm138-640h284q13-19 22.5-38t17.5-42H298q8 22 17.5 41.5T338-680Zm142 148q20-17 39-34t36-34H405q17 17 36 34t39 34Zm-75 172h150q-17-17-36-34t-39-34q-20 17-39 34t-36 34ZM298-200h364q-8-22-17.5-41.5T622-280H338q-13 19-22.5 38T298-200Z" />
              </svg>
            </el-icon>
            <div class="el-upload__text">
              Drop here the recipient VCF <br />
              or <br /><em>click to upload</em>
            </div>
            <template #tip>
              <div class="el-upload__tip">.vcf</div>
            </template>
          </el-upload>

          <el-upload
            ref="uploadDonor"
            class="upload-demo"
            drag
            :limit="1"
            :auto-upload="false"
            :on-change="handleChangeDonor"
            :accept="acceptedFileTypes"
            :on-success="handleSuccess"
            :on-error="handleError"
            :before-upload="beforeUpload"
            :on-remove="handleRemoveDonor"
          >
            <el-icon class="el-icon--upload">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                height="24px"
                viewBox="0 -960 960 960"
                width="24px"
                fill="#666666"
              >
                <path d="M640-440 474-602q-31-30-52.5-66.5T400-748q0-55 38.5-93.5T532-880q32 0 60 13.5t48 36.5q20-23 48-36.5t60-13.5q55 0 93.5 38.5T880-748q0 43-21 79.5T807-602L640-440Zm0-112 109-107q19-19 35-40.5t16-48.5q0-22-15-37t-37-15q-14 0-26.5 5.5T700-778l-60 72-60-72q-9-11-21.5-16.5T532-800q-22 0-37 15t-15 37q0 27 16 48.5t35 40.5l109 107ZM280-220l278 76 238-74q-5-9-14.5-15.5T760-240H558q-27 0-43-2t-33-8l-93-31 22-78 81 27q17 5 40 8t68 4q0-11-6.5-21T578-354l-234-86h-64v220ZM40-80v-440h304q7 0 14 1.5t13 3.5l235 87q33 12 53.5 42t20.5 66h80q50 0 85 33t35 87v40L560-60l-280-78v58H40Zm80-80h80v-280h-80v280Zm520-546Z" />
              </svg>
            </el-icon>
            <div class="el-upload__text">
              Drop here the donor VCF
              <br />
              or
              <br /><em>click to upload</em>
            </div>
            <template #tip>
              <div class="el-upload__tip">.vcf</div>
            </template>
          </el-upload>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, defineProps, defineEmits, watch } from "vue";
import { ElMessage, ElNotification } from "element-plus";
import type { UploadInstance } from "element-plus";
import { Download } from "@element-plus/icons-vue";

const props = defineProps({
  modelValue: {
    type: Object,
    required: true,
  },
});
const emit = defineEmits(["update:modelValue"]);
const uploadRecipient = ref<UploadInstance>();
const uploadDonor = ref<UploadInstance>();
const useDemoData = ref(props.modelValue.sample);
const downloadFile = (url, filename) => {
  const link = document.createElement("a");
  link.href = url;
  link.download = filename;
  link.click();
};

const downloadFiles = () => {
  console.log("download");

  // Remplace les URLs ci-dessous par les URL des fichiers que tu souhaites télécharger
  downloadFile(
    "https://github.com/huguesrichard/Allopipe/raw/refs/heads/main/tutorial/recipient_annotated_VEP.vcf",
    "recipient_annotated_VEP.vcf"
  );
  downloadFile(
    "https://github.com/huguesrichard/Allopipe/raw/refs/heads/main/tutorial/donor_annotated_VEP.vcf",
    "donor_annotated_VEP.vcf"
  );
};
watch(useDemoData, (newValue) => {
  console.log("sample", newValue);

  updateForm("sample", newValue);
  if (newValue == true) {
    loadDemoData();
  }
});

function loadDemoData() {
  updateForm("sample", true);
  updateForm("pairRecipientFile", null);
  updateForm("pairDonorFile", null);
}

function handleChangeRecipient(file) {
  console.log("Recipient file selected:", file);
  if (!checkError(file)) {
    uploadRecipient.value!.clearFiles();
    updateForm("pairRecipientFile", null);
    return;
  }
  updateForm("pairRecipientFile", file.raw);
}

function handleRemoveRecipient() {
  updateForm("pairRecipientFile", null);
  if (uploadRecipient.value) {
    uploadRecipient.value.clearFiles();
  }
}

function handleChangeDonor(file) {
  console.log("Donor file selected:", file);
  if (!checkError(file)) {
    uploadDonor.value!.clearFiles();
    updateForm("pairDonorFile", null);
    return;
  }
  updateForm("pairDonorFile", file.raw);
}

function handleRemoveDonor() {
  updateForm("pairDonorFile", null);
  if (uploadDonor.value) {
    uploadDonor.value.clearFiles();
  }
}

function checkError(file) {
  const isAccepted = acceptedFileTypes
    .split(",")
    .some((type) => file.name.toLowerCase().endsWith(type.toLowerCase()));

  if (!isAccepted) {
    ElNotification({
      title: "Error",
      dangerouslyUseHTMLString: true,
      message: `File type not allowed. <br>Accepted types are: ${acceptedFileTypes}`,
      type: "error",
      position: "bottom-right",
    });
    return false;
  }
  return true;
}

function updateForm(key: string, value: any) {
  props.modelValue[key] = value;
  const updatedForm = { ...props.modelValue, [key]: value };
  emit("update:modelValue", updatedForm);
}

const acceptedFileTypes = ".vcf";

function handleSuccess() {
  ElMessage.success("File uploaded successfully");
}

function handleError(error) {
  console.error("Error uploading file:", error);
  ElMessage.error("Failed to upload file");
}

function beforeUpload(file) {
  const isAccepted = acceptedFileTypes
    .split(",")
    .some((type) => file.name.toLowerCase().endsWith(type.toLowerCase()));

  if (!isAccepted) {
    ElMessage.error(
      `File type not allowed. Accepted types are: ${acceptedFileTypes}`
    );
    return false;
  }

  return true;
}
</script>

<style scoped>
.component-container {
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: auto !important;
  height: auto !important;
}

.card {
  min-width: 50%; /* Increased width */
  padding: 20px;
  border-radius: 10px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  background-color: white;
}

.card-header {
  text-align: center;
  margin-bottom: 20px;
}

.card-body {
  display: flex; /* Use flex to arrange uploads in a column */
  flex-direction: column; /* Stack items vertically */
}

.upload-container {
  display: flex; /* Flexbox for uploads */
  justify-content: space-between; /* Equal spacing between uploads */
  width: 100%; /* Full width for the container */
}

.el-upload__text {
  font-size: 14px;
  color: #606266;
}

.el-upload__tip {
  font-size: 12px;
  color: #909399;
  margin-top: 5px;
}

.upload-demo {
  flex: 1; /* Each upload takes equal space */
  border: 2px dashed #d9d9d9;
  border-radius: 6px;
  text-align: center;
  background-color: #f5f7fa;
  margin: 0 10px; /* Margin between uploads */
}
</style>
