<!-- pages/score-result.vue -->
<template>
  <div class="score-result">
    <el-card class="score-card">
      <template #header>
        <h2>Résultat du Score</h2>
      </template>
      <el-row :gutter="20">
        <el-col :span="24">
          <h3>Score</h3>
          <el-statistic :value="score" :precision="2">
            <template #title>
              <div class="statistic-title">Nombre représentant le score</div>
            </template>
          </el-statistic>
        </el-col>
      </el-row>
      <el-divider />
      <el-row :gutter="20">
        <el-col :span="24">
          <h3>Mode Solid Organ Transplantation</h3>
          <el-image
            style="width: 100%; max-width: 600px"
            :src="'/img/graph.png'"
            alt="Graphe pour
          Solid Organ Transplantation"
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
          <h3>Mode HSCT</h3>
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
console.log("tessst");

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

.statistic-title {
  font-size: 16px;
  color: #909399;
}

h2,
h3 {
  margin-bottom: 20px;
}
</style>
