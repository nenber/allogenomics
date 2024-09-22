<template>
  <div class="publications-container">
    <el-row :gutter="20">
      <el-col :span="8" v-for="publication in publications" :key="publication.id">
        <el-card :body-style="{ padding: '20px' }">
          <h3>{{ publication.title }}</h3>
          <p>{{ publication.content }}</p>
          <div class="footer">
            <el-button type="primary">Lire plus</el-button>
          </div>
        </el-card>
      </el-col>
    </el-row>
  </div>
</template>

<script setup>
import { ref } from 'vue';

const publications = ref([
  { id: 1, title: 'Publication 1', content: 'Contenu de la première publication.' },
  { id: 2, title: 'Publication 2', content: 'Contenu de la deuxième publication.' },
  { id: 3, title: 'Publication 3', content: 'Contenu de la troisième publication.' },
]);
</script>

<style scoped>
.publications-container {
  padding: 20px;
}

.footer {
  margin-top: 20px;
  text-align: right;
}
</style>