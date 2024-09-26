<!-- pages/score-result.vue -->
<template>
  <div class="score-result">
    <el-card class="score-card">
      <template #header>
        <h2>Allogenomic mismatch score (AMS)</h2>
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
      <el-row :gutter="20">
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
      <el-divider />
      <el-row :gutter="20">
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
import type { ImageProps } from "element-plus";

const route = useRoute();
const param = route.params.score;

// Exemple de score basé sur le paramètre, vous pouvez ajuster cela selon vos besoins
const score = ref(param);
console.log("param", param);

// Exemple de score (à remplacer par la vraie logique de calcul)
const graph = ref("/img/graph.png");
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

.score-label {
  font-size: 2rem;
  color: #909399;
  margin-top: 10px;
}

.text-center {
  text-align: center;
}
</style>