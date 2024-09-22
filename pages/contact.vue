<template>
  <div class="contact-form">
    <h1 class="contact-title">Contact</h1>

    <el-form
      ref="formRef"
      :model="form"
      :rules="rules"
      label-width="120px"
    >
      <el-form-item
        label="Nom"
        prop="name"
      >
        <el-input
          v-model="form.name"
          placeholder="Entrez votre nom"
        ></el-input>
      </el-form-item>
      <el-form-item
        label="Email"
        prop="email"
      >
        <el-input
          v-model="form.email"
          placeholder="Entrez votre email"
        ></el-input>
      </el-form-item>
      <el-form-item
        label="Institution"
        prop="institution"
      >
        <el-input
          v-model="form.email"
          placeholder="Institution"
        ></el-input>
      </el-form-item>
      <el-form-item
        label="Message"
        prop="message"
      >
        <el-input
          type="textarea"
          v-model="form.message"
          placeholder="Entrez votre message"
        ></el-input>
      </el-form-item>
      <el-form-item>
        <el-button
          type="primary"
          @click="submitForm"
        >Envoyer</el-button>
        <el-button @click="resetForm">Réinitialiser</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script setup>
import { ref } from "vue";
import { ElMessage } from "element-plus";

const formRef = ref(null);
const form = ref({
  name: "",
  email: "",
  message: "",
});

const rules = {
  name: [
    { required: true, message: "Veuillez entrer votre nom", trigger: "blur" },
  ],
  email: [
    { required: true, message: "Veuillez entrer votre email", trigger: "blur" },
    {
      type: "email",
      message: "Veuillez entrer un email valide",
      trigger: "blur",
    },
  ],
  message: [
    { required: true, message: "Veuillez entrer un message", trigger: "blur" },
  ],
};

const submitForm = () => {
  formRef.value.validate((valid) => {
    if (valid) {
      ElMessage({
        message: "Formulaire envoyé avec succès !",
        type: "success",
      });
    } else {
      ElMessage({
        message: "Veuillez remplir correctement le formulaire.",
        type: "error",
      });
      return false;
    }
  });
};

const resetForm = () => {
  formRef.value.resetFields();
};
</script>

<style scoped>
.contact-form {
  max-width: 600px;
  margin: 50px auto;
}
.contact-title {
  text-align: center;
  font-size: 32px;
  font-weight: bold;
  margin-bottom: 20px;
}
</style>
