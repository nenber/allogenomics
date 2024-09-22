<template>
  <div class="layout-container">
    <header>
      <el-menu
        :default-active="activeIndex"
        class="el-menu-demo"
        mode="horizontal"
        :ellipsis="false"
        @select="handleSelect"
      >
        <el-menu-item
          index="0"
          class="menu-title"
        >
          <NuxtLink
            to="/"
            class="text-large-light"
          >
            Allogenomics
          </NuxtLink>
        </el-menu-item>
        <div class="flex-grow" />
        <el-menu-item
          style="display: flex;
  align-items: center;
  justify-content: center;"
          class="desktop-menu-item"
        >
          <a href="https://github.com/huguesrichard/Allopipe">
            <Icon
              name="uil:github"
              style="color: black;vertical-align: middle"
              size="2em"
            />

          </a>
        </el-menu-item>
        <el-menu-item
          index="1"
          class="desktop-menu-item"
        >
          <NuxtLink to="/">
            Home
          </NuxtLink>
        </el-menu-item>

        <el-menu-item
          index="2"
          class="desktop-menu-item"
        >
          <NuxtLink to="/publications">
            Publications
          </NuxtLink>
        </el-menu-item>
        <el-menu-item
          index="3"
          class="desktop-menu-item"
        >
          <NuxtLink to="/contact">
            Contact
          </NuxtLink>
        </el-menu-item>
        <el-menu-item
          index="4"
          class="desktop-menu-item"
        >
          <NuxtLink to="/about">
            About
          </NuxtLink>
        </el-menu-item>
        <el-button
          style="margin-right: 12px;"
          class="hamburger-btn"
          @click="drawer = true"
        >
          <el-icon>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              height="24px"
              viewBox="0 -960 960 960"
              width="24px"
              fill="#000000"
            >
              <path d="M120-240v-80h720v80H120Zm0-200v-80h720v80H120Zm0-200v-80h720v80H120Z" />
            </svg>
          </el-icon>
        </el-button>
      </el-menu>
    </header>

    <el-drawer
      v-model="drawer"
      direction="rtl"
      size="80%"
    >
      <el-menu
        :default-active="activeIndex"
        class="el-menu-vertical"
        @select="handleSelect"
      >
        <el-menu-item index="1">
          <NuxtLink to="/">
            Home
          </NuxtLink>
        </el-menu-item>
        <el-menu-item index="2">Publications</el-menu-item>
        <el-menu-item index="3">
          <NuxtLink to="/contact">
            Contact
          </NuxtLink>
        </el-menu-item>
        <el-menu-item index="4">About</el-menu-item>
      </el-menu>
    </el-drawer>

    <main>
      <NuxtPage />
    </main>
  </div>
</template>

<script lang="ts" setup>
import { ref } from "vue";
import { Menu } from "@element-plus/icons-vue";

const activeIndex = ref("1");
const drawer = ref(false);

const handleSelect = (key: string, keyPath: string[]) => {
  console.log(key, keyPath);
  drawer.value = false; // Close drawer when an item is selected
};
</script>

<style scoped>
.layout-container {
  display: flex;
  flex-direction: column;
  height: 100vh; /* S'assure que le conteneur prend toute la hauteur de la fenêtre */
  overflow-y: auto; /* Active le défilement si nécessaire */
}

header {
  position: sticky;
  top: 0;
  z-index: 10;
}

.el-menu-demo {
  display: flex;
  justify-content: center; /* Centre les éléments horizontalement */
  align-items: center;
  width: 100%; /* Assure que le menu prend toute la largeur du conteneur */
}

.el-menu-demo .el-menu-item {
  margin: 0 15px; /* Ajoute un espace autour des éléments du menu */
}

.menu-title {
  margin-right: auto;
}

.flex-grow {
  flex-grow: 1;
}

.hamburger-btn {
  display: none;
}

main {
  flex-grow: 1;
  overflow-y: auto; /* Permet le défilement du contenu principal */
}

footer {
  background-color: #f5f5f5;
  padding: 1rem;
  text-align: center;
}

@media (max-width: 768px) {
  .desktop-menu-item {
    display: none;
  }

  .hamburger-btn {
    display: block;
  }
}
</style>
