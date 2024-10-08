<template>
  <div class="publications-page">
    <h1 class="page-title">Publications</h1>

    <el-card
      v-for="publication in publications"
      :key="publication.id"
      shadow="hover"
      class="publication-card"
    >
      <h2 class="publication-title">{{ publication.title }}</h2>
      <p class="publication-authors">
        <strong>Authors:</strong> {{ publication.authors.join(", ") }}
      </p>
      <p class="publication-date">
        <strong>Published on:</strong> {{ publication.date }}
      </p>
      <a
        :href="publication.link"
        target="_blank"
        rel="noopener noreferrer"
        class="publication-link"
      >
        Read More
      </a>
    </el-card>
  </div>
</template>

<script setup lang="ts">
const appConfig = useAppConfig();

const publications = ref();
const error = ref();
try {
  const { data, error: fetchError } = await useAsyncData("carouselItems", () =>
    queryContent("/publications").find()
  );

  if (fetchError.value) {
    throw new Error(fetchError.value.message);
  }

  publications.value = data.value![0].body;
} catch (e) {
  error.value = e;
  console.error("Error loading carousel items:", e);
}
</script>

<style scoped>
.publications-page {
  max-width: 800px;
  margin: 0 auto;
  padding: 2rem;
}

.page-title {
  text-align: center;
  font-size: 2.5rem;
  margin-bottom: 2rem;
}

.publication-card {
  margin-bottom: 1.5rem;
  padding: 1rem;
  border-radius: 8px;
  background-color: #fff;
}

.publication-title {
  font-size: 1.5rem;
  font-weight: bold;
  margin-bottom: 0.5rem;
}

.publication-authors {
  font-size: 1rem;
  margin-bottom: 0.5rem;
}

.publication-date {
  font-size: 0.9rem;
  margin-bottom: 0.5rem;
}

.publication-link {
  font-size: 1rem;
  color: #409eff;
  text-decoration: none;
  font-weight: bold;
}

.publication-link:hover {
  text-decoration: underline;
}
</style>
