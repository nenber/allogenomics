<template>
  <div class="component-container">
    <div
      class="card"
      style="min-width: 702px"
    >
      <div class="card-header">
        <h2>Cohort</h2>
      </div>
      <div class="card-body">
        <!-- Switch for demo data -->
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
              @click="loadDemoData"
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
          <!-- First upload component -->
          <el-upload
            ref="uploadMerged"
            class="upload-demo"
            drag
            :limit="1"
            :auto-upload="false"
            :on-change="handleChangeMerged"
            :accept="acceptedFileTypes1"
            :on-success="handleSuccess"
            :on-error="handleError"
            :before-upload="beforeUpload"
            :on-remove="handleRemoveMerged"
            :class="{ 'is-dragover': isDragOverMerged }"
            @dragover="handleDragOverMerged"
            @dragleave="handleDragLeaveMerged"
          >
            <el-icon class="el-icon--upload">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                height="24px"
                viewBox="0 -960 960 960"
                width="24px"
                fill="#666666"
              >
                <path d="M200-40v-40q0-139 58-225.5T418-480q-102-88-160-174.5T200-880v-40h80v40q0 11 .5 20.5T282-840h396q1-10 1.5-19.5t.5-20.5v-40h80v40q0 139-58 225.5T542-480q102 88 160 174.5T760-80v40h-80v-40q0-11-.5-20.5T678-120H282q-1 10-1.5 19.5T280-80v40h-80Zm138-640h284q13-19 22.5-38t17.5-42H298q8 22 17.5 41.5T338-680Zm142 148q20-17 39-34t36-34H405q17 17 36 34t39 34Zm-75 172h150q-17-17-36-34t-39-34q-20 17-39 34t-36 34ZM298-200h364q-8-22-17.5-41.5T622-280H338q-13 19-22.5 38T298-200Z" />
              </svg>
            </el-icon>
            <div class="el-upload__text">
              Drop here the merged VCF or bgzip-compressed VCF<br />
              or<br /><em>click to upload</em>
            </div>
            <template #tip>
              <div class="el-upload__tip">.vcf or .vcf.gz</div>
            </template>
          </el-upload>

          <!-- Second upload component -->
          <el-upload
            ref="uploadDonorRecipientList"
            class="upload-demo"
            drag
            :limit="1"
            :auto-upload="false"
            :on-change="handleChangeDonorRecipientList"
            :on-remove="handleRemoveDonorRecipientList"
            :accept="acceptedFileTypes2"
            :on-success="handleSuccess"
            :on-error="handleError"
            :before-upload="beforeUpload"
            :class="{ 'is-dragover': isDragOverRecipient }"
            @dragover="handleDragOverRecipient"
            @dragleave="handleDragLeaveRecipient"
          >
            <el-icon class="el-icon--upload">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                height="24px"
                viewBox="0 -960 960 960"
                width="24px"
                fill="#666666"
              >
                <path d="M230-360h120v-60H250v-120h100v-60H230q-17 0-28.5 11.5T190-560v160q0 17 11.5 28.5T230-360Zm156 0h120q17 0 28.5-11.5T546-400v-60q0-17-11.5-31.5T506-506h-60v-34h100v-60H426q-17 0-28.5 11.5T386-560v60q0 17 11.5 30.5T426-456h60v36H386v60Zm264 0h60l70-240h-60l-40 138-40-138h-60l70 240ZM160-160q-33 0-56.5-23.5T80-240v-480q0-33 23.5-56.5T160-800h640q33 0 56.5 23.5T880-720v480q0 33-23.5 56.5T800-160H160Zm0-80h640v-480H160v480Zm0 0v-480 480Z" />
              </svg>
            </el-icon>
            <div class="el-upload__text">
              Drop here donor/recipient list <br />
              or<br /><em>click to upload</em> <br /><br />
            </div>
            <template #tip>
              <div class="el-upload__tip">.csv</div>
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

const uploadMerged = ref<UploadInstance>();
const uploadDonorRecipientList = ref<UploadInstance>();
const useDemoData = ref(props.modelValue.sample);

// State to manage dragover status
const isDragOverMerged = ref(false);
const isDragOverRecipient = ref(false);

watch(useDemoData, (newValue) => {
  updateForm("sample", newValue);
  if (newValue == true) {
    loadDemoData();
  }
});

function loadDemoData() {
  updateForm("sample", true);
  updateForm("cohortMergedFile", null);
  updateForm("cohortDonorRecipientListFile", null);
}

const handleChangeMerged = (file) => {
  console.log("Merged file selected:", file);
  if (!checkError(file, acceptedFileTypes1)) {
    uploadMerged.value!.clearFiles();
    updateForm("cohortMergedFile", null);
    return;
  }
  updateForm("cohortMergedFile", file.raw);
};

const handleRemoveMerged = () => {
  updateForm("cohortMergedFile", null);
  uploadMerged.value?.clearFiles();
};

const handleChangeDonorRecipientList = (file) => {
  console.log("DonorRecipientList file selected:", file);
  if (!checkError(file, acceptedFileTypes2)) {
    uploadDonorRecipientList.value!.clearFiles();
    updateForm("cohortDonorRecipientListFile", null);
    return;
  }
  updateForm("cohortDonorRecipientListFile", file.raw);
};

const handleRemoveDonorRecipientList = () => {
  updateForm("cohortDonorRecipientListFile", null);
  uploadDonorRecipientList.value?.clearFiles();
};

const checkError = (file, filestypes) => {
  const isAccepted = filestypes
    .split(",")
    .some((type) => file.name.toLowerCase().endsWith(type.toLowerCase()));

  if (!isAccepted) {
    ElNotification({
      title: "Error",
      message: `File type not allowed. Accepted types are: ${filestypes}`,
      type: "error",
      position: "bottom-right",
    });
    return false;
  }
  return true;
};

const updateForm = (key, value) => {
  props.modelValue[key] = value;

  const updatedForm = { ...props.modelValue, [key]: value };
  emit("update:modelValue", updatedForm);
};

const acceptedFileTypes1 = ".vcf,.vcf.gz";
const acceptedFileTypes2 = ".csv";

const handleSuccess = (response) => {
  console.log("File uploaded successfully", response);
  ElMessage.success("File uploaded successfully");
};

const handleError = (error) => {
  console.error("Error uploading file:", error);
  ElMessage.error("Failed to upload file");
};

const beforeUpload = (file) => {
  const acceptedFileTypes = acceptedFileTypes1 + "," + acceptedFileTypes2;
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
};

// Drag and drop event handlers
const handleDragOverMerged = (event) => {
  event.preventDefault();
  isDragOverMerged.value = true;
};

const handleDragLeaveMerged = () => {
  isDragOverMerged.value = false;
};

const handleDragOverRecipient = (event) => {
  event.preventDefault();
  isDragOverRecipient.value = true;
};

const handleDragLeaveRecipient = () => {
  isDragOverRecipient.value = false;
};
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
