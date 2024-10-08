<!-- pages/score-result.vue -->
<template>
  <div class="score-result">
    <el-card class="score-card">
      <template #header>
        <h2>Allogenomic mismatch score (AMS)</h2>
        <el-row
          :gutter="20"
          justify="center"
        >
          <el-col
            :span="24"
            class="text-center"
          >
            <el-button
              type="primary"
              @click="downloadFiles"
            >
              Télécharger les fichiers
            </el-button>
          </el-col>
        </el-row>
      </template>
      <el-row
        :gutter="20"
        justify="center"
        align="middle"
        class="score-display"
      >
        <el-col
          :span="24"
          class="text-center"
        >
          <div class="score-container">
            <div class="score-value">{{ score }}</div>
            <!-- <div class="score-label">Score</div> -->
          </div>
        </el-col>
      </el-row>
      <el-divider />
      <el-row
        :gutter="20"
        v-if="sot == 'true'"
      >
        <el-col :span="24">
          <h3>Solid Organ Transplantation</h3>
          <el-image
            style="width: 100%; max-width: 600px"
            :src="'/img/graph.png'"
            alt="Graphe pour Solid Organ Transplantation"
          />
          <el-alert
            title="Disclaimer: for illustration purposes only, the expected AMS value may depend on the sequencing technology and the specify of your individuals."
            type="info"
            :closable="false"
            show-icon
          />
        </el-col>
      </el-row>
      <el-divider v-if="sot == 'true'" />
      <el-row
        :gutter="20"
        v-if="sot == 'false'"
      >
        <el-col :span="24">
          <h3>HSCT</h3>
          <el-alert
            title="Coming soon: expected AMS distribution for related pairs. We are open for collaborations on this topic."
            type="warning"
            :closable="false"
            show-icon
          />
        </el-col>
      </el-row>

    </el-card>
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";
const appConfig = useAppConfig();
import { useRoute } from "vue-router";
import type { ImageProps } from "element-plus";

// Get the score from the route parameters
// const route = useRoute();
// const param = route.params.score;
const route = useRoute();
const { score, sot, name } = route.query;
// Example of score based on the parameter (adjust as needed)
// const score = ref(param);
console.log("param", score, sot);

// Example of score (replace with the real logic)
const graph = ref("/img/graph.png");

// Function to download the score file
const downloadFiles = () => {
  // Création d'un lien temporaire pour forcer le téléchargement
  const url = `/api/download_score/${name}`;
  const link = document.createElement("a");
  link.href = url;
  link.setAttribute("download", "results.zip"); // Nom du fichier ZIP à télécharger
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link); // Nettoyage
};
</script>

<style scoped>
.score-result {
  max-width: 800px;
  margin: 0 auto;
  padding: 20px;
}

.score-card {
  margin-bottom: 20px;
}

h2,
h3 {
  margin-bottom: 20px;
}

.score-display {
  display: flex;
  align-items: center;
  justify-content: center;
}

.score-container {
  text-align: center;
}

.score-value {
  font-size: 4rem;
  font-weight: bold;
  color: #409eff;
  line-height: 1;
}

.text-center {
  text-align: center;
}

.el-button {
  margin-top: 20px;
}
</style>
