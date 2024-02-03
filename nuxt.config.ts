import type { NuxtConfig } from "@nuxt/types";

// https://nuxt.com/docs/api/configuration/nuxt-config
const config: NuxtConfig = {
  devtools: { enabled: true },
  modules: ["@nuxt/test-utils/module", "@nuxtjs/tailwindcss", "shadcn-nuxt"],
  postcss: {
    plugins: {
      tailwindcss: {},
      autoprefixer: {},
    },
  },
  css: ["~/assets/css/main.css"],
  shadcn: {
    /**
     * Prefix for all the imported component
     */
    prefix: "",
    /**
     * Directory that the component lives in.
     * @default "./components/ui"
     */
    componentDir: "./components/ui",
  },
  buildModules: ["@nuxt/typescript-build"],
};

export default config;
