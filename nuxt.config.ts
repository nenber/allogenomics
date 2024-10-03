// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: { enabled: true },
  runtimeConfig: {
    public: {
      PIPELINE: process.env.PIPELINE,
      PYTHON: process.env.PYTHON,
    },
  },
  modules: [
    "@element-plus/nuxt",
    "@nuxtjs/google-fonts",
    "nuxt-file-storage",
    "@nuxt/icon",
    "@nuxt/content",
    "@nuxt/image",
  ],

  css: ["~/assets/css/main.css"],

  googleFonts: {
    families: {
      Roboto: [300, 400, 700], // 300 pour light, 400 pour normal, 700 pour bold
    },
  },

  alias: {
    assets: "/<rootDir>/assets",
  },

  components: {
    global: true,
    dirs: ["~/components"],
  },

  fileStorage: {
    // enter the absolute path to the location of your storage
    // mount: '/home/$USR/development/nuxt-file-storage/server/files',
    mount: "E:/allogenomics-front/public",
    // {OR} use environment variables (recommended)
    // mount: process.env.mount
    // you need to set the mount in your .env file at the root of your project
  },

  build: {
    transpile: ["@popperjs/core"],
  },

  compatibilityDate: "2024-09-24",
});