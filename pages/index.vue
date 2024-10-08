<template>
  <div>
    <div class="c-main">
      <div>
        <el-row class="content-container">
          <h2 style="width: 100%">Publications</h2>
        </el-row>
        <el-row class="carousel-container">
          <el-carousel
            v-if="carouselItems && carouselItems.length"
            :interval="5000"
            arrow="hover"
            class="full-width-carousel"
            height="300px"
            indicator-position="outside"
          >
            <el-carousel-item
              v-for="item in carouselItems"
              :key="item.id"
            >
              <div class="carousel-content">
                <h3 style="line-height: auto">{{ item.title }}</h3>
                <p class="authors">{{ item.authors.join(", ") }}</p>
                <p class="date">{{ item.date }}</p>
                <!-- Affiche la date -->
                <el-button
                  type="primary"
                  @click="openArticle(item.link)"
                >Read Publication</el-button>
              </div>
            </el-carousel-item>
          </el-carousel>
          <p v-else>Loading carousel items...</p>
        </el-row>
        <section class="c-section c-section--1">
          <el-col :span="24">
            <el-row class="content-container">
              <p class="c-section--title">
                I want to discover what is Allogenomics, and how it can help me
              </p>
            </el-row>
            <el-row class="button-container">
              <el-button
                size="large"
                round
                class="get-started-button"
              >
                <NuxtLink to="/calculator">Launch my first analysis</NuxtLink>
              </el-button>
            </el-row>
          </el-col>
        </section>
        <el-image
          style="height: 500px; width: 100%;margin-bottom: 50px;margin-top: 10px;"
          src="/img/nefro.jpg"
          fit="contain"
        >
        </el-image>
      </div>

      <section class="c-section c-section--2">
        <div class="team-container">
          <h2 class="section-title">Our Team</h2>
          <el-space
            wrap
            :size="20"
            class="photo-grid"
          >
            <el-card
              shadow="hover"
              v-for="member in teamMembers"
              :key="member.name"
              class="photo-card"
            >
              <template #header>
                <div class="card-header">
                  <img
                    :src="member.image"
                    :alt="member.name"
                  />
                  <h3>{{ member.name }}</h3>
                </div>
              </template>
              <p>{{ member.description }}</p>
            </el-card>
          </el-space>

          <h2 class="section-title">Alumni and Close Collaborators</h2>
          <el-space
            wrap
            :size="20"
            class="photo-grid"
          >
            <el-card
              shadow="hover"
              v-for="collaborator in alumniCollaborators"
              :key="collaborator.name"
              class="photo-card"
            >
              <template #header>
                <div class="card-header">
                  <img
                    :src="collaborator.image"
                    :alt="collaborator.name"
                  />
                  <h3>{{ collaborator.name }}</h3>
                </div>
              </template>
              <p>{{ collaborator.description }}</p>
            </el-card>
          </el-space>
        </div>
      </section>

      <section class="c-section c-section--3">
        <div class="team-container">
          <h2 class="section-title">Affiliations</h2>
          <el-carousel
            :interval="1500"
            height="200px"
            class="sponsor-carousel"
          >
            <el-carousel-item
              v-for="item in sponsors"
              :key="item.name"
            >
              <el-image
                :src="item.image"
                fit="contain"
                class="sponsor-image"
              />
            </el-carousel-item>
          </el-carousel>
        </div>
      </section>
    </div>
  </div>
</template>

<script setup lang="ts">
const appConfig = useAppConfig();
import type { ImageProps } from "element-plus";

const carouselItems = ref();
const error = ref();
try {
  const { data, error: fetchError } = await useAsyncData("carouselItems", () =>
    queryContent("/publications").find()
  );

  if (fetchError.value) {
    throw new Error(fetchError.value.message);
  }

  carouselItems.value = data.value![0].body;
} catch (e) {
  error.value = e;
  console.error("Error loading carousel items:", e);
}

function openArticle(link) {
  window.open(link, "_blank");
}
const fits = [
  "fill",
  "contain",
  "cover",
  "none",
  "scale-down",
] as ImageProps["fit"][];

const sponsors = [
  { name: "Sponsor 1", image: "/img/aphp.gif" },
  { name: "Sponsor 2", image: "/img/inserm.png" },
  { name: "Sponsor 3", image: "/img/su.png" },
];
const teamMembers = [
  {
    name: "Hugues Richard",
    image: "/img/team/hugues-richard.png",
    description: "Bioinformatician",
  },
  {
    name: "Laurent Mesnard",
    image: "/img/team/laurent-mesnard.jpg",
    description: "Nephrologist",
  },
  {
    name: "Alice Aarnink",
    image: "/img/team/alice-aarnink.jpg",
    description: "Immunologist",
  },

  {
    name: "Pierre Laville",
    image: "/img/team/pierre_laville.png",
    description: "Bioinformatician",
  },
  {
    name: "Adele Dhuyser",
    image: "/img/team/adele.jpg",
    description: "Immunologist",
  },
];

const alumniCollaborators = reactive([
  {
    name: "Pierre Delaugere",
    image: "/img/team/pierre-delaugere.jpg",
    description: "Bioinformatician",
  },
]);
</script>

<style>
:root {
  --color-1: #ffffff;
  --color-2: #3f8beebb;
  --color-3: #ffffff;
}

.sponsor-carousel .el-carousel-item {
  display: flex;
  justify-content: center;
  align-items: center;
}

.sponsor-image {
  height: 80px; /* Réduit la hauteur des images */
  object-fit: contain; /* Conserve les proportions */
  transition: opacity 0.5s ease, transform 0.5s ease; /* Transition fluide */
}

.el-carousel .el-carousel-item:not(.is-active) .sponsor-image {
  opacity: 0.3; /* Transparence pour les images non actives */
  transform: scale(0.7); /* Réduit la taille des images non actives */
}
body {
  margin: 0;
  padding: 0;
  overflow: hidden; /* Empêche le défilement du corps de la page */
}

.c-main {
  width: 100%;
  /* height: 100vh; */
  overflow-y: auto; /* Permet le défilement vertical */
  scroll-snap-type: y proximity; /* Type de snap scrolling */
  scroll-behavior: smooth; /* Comportement de défilement fluide */
}

.c-section {
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  box-sizing: border-box; /* Inclut padding et bordures dans la hauteur totale */
  padding: 1rem; /* Ajoute du padding pour éviter que le contenu ne touche les bords */
  scroll-snap-align: start; /* Assure que le snap s'aligne au début de chaque section */
}

.c-section--1 {
  height: auto !important; /* Assure que chaque section occupe toute la hauteur de l'écran */

  background-color: var(--color-1);
  color: rgba(0, 0, 0, 0.623);
}

.c-section--2 {
  background-color: var(--color-2);
  color: white;
}

.c-section--3 {
  background-color: var(--color-3);
  color: rgba(0, 0, 0, 0.623);
}

.sponsor-carousel .el-carousel__container {
  display: flex;
  align-items: center;
  justify-content: center;
}

.sponsor-carousel .el-carousel__item {
  display: flex;
  justify-content: center;
  align-items: center;
}

.sponsor-image {
  height: 80px;
  max-width: 80%; /* Limite la largeur de l'image */
  object-fit: contain;
  transition: opacity 0.5s ease, transform 0.5s ease;
}

.el-carousel .el-carousel__item:not(.is-active) .sponsor-image {
  opacity: 0.3;
  transform: scale(0.7);
}

.full-width-carousel {
  width: 100%;
}

.carousel-image {
  width: 100%;
  height: auto; /* Ajuste la hauteur automatique pour garder les proportions */
  object-fit: cover;
}

.content-container {
  width: 100%;
  max-width: 800px;
  margin: 2rem auto;
  text-align: center;
}

.c-section--title {
  font-size: 2.5rem;
  margin-bottom: 2rem;
  text-align: center;
}

.button-container {
  display: flex;
  justify-content: center;
  margin-top: 2rem;
}

.get-started-button {
  font-size: 1.2rem;
}

.team-container {
  width: 100%;
  max-width: 1200px;
  margin: 0 auto;
}

.section-title {
  font-size: 2.5rem;
  margin-bottom: 2rem;
  text-align: center;
}

.photo-grid {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 1rem;
  max-height: none;
  overflow-y: visible;
}

.photo-card {
  width: 200px;
  margin-bottom: 20px;
}

.card-header {
  display: flex;
  align-items: center;
}

.card-header img {
  width: 60px;
  height: 60px;
  border-radius: 50%;
  object-fit: cover;
  margin-right: 10px;
}

.card-header h3 {
  margin: 0;
  font-size: 1rem;
}

.photo-card :deep(.el-card__header) {
  padding: 10px;
}

.photo-card :deep(.el-card__body) {
  padding: 10px;
}

.photo-card p {
  margin: 0;
  font-size: 0.9rem;
  color: #666;
}

@media (max-width: 768px) {
  .c-section--title {
    font-size: 2rem;
  }

  .section-title {
    font-size: 2rem;
  }

  .photo-card {
    width: 100%;
    max-width: 300px;
  }
}

@media (max-width: 480px) {
  .c-section--title {
    font-size: 1.5rem;
  }

  .section-title {
    font-size: 1.5rem;
  }

  .get-started-button {
    font-size: 1rem;
  }
}
.carousel-content {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 0 20px;
  text-align: center;
}

.carousel-content h3 {
  font-size: 1.5em;
  margin-bottom: 10px;
}

.carousel-content .authors {
  font-style: italic;
  margin-bottom: 10px;
}

.carousel-content .abstract {
  margin-bottom: 20px;
  /*max-height: 100px;*/
  overflow-y: auto;
}
.el-carousel__item h3 {
  line-height: normal;
}
</style>
