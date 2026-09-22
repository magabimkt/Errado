const withMDX = require("@next/mdx")({
  extension: /\.mdx?$/,
});

const withPWA = require("next-pwa")({
  dest: "public",
  register: true,
  skipWaiting: true,
  disable: process.env.NODE_ENV === "development",
  runtimeCaching: [
    {
      urlPattern: /^https?.*\.(?:png|jpg|jpeg|svg|webp|gif)$/,
      handler: "CacheFirst",
      options: {
        cacheName: "images-cache",
        expiration: {
          maxEntries: 200,
          maxAgeSeconds: 30 * 24 * 60 * 60,
        },
      },
    },
    {
      urlPattern: /^https?.*\/(aulas|disciplinas)\/.*$/,
      handler: "CacheFirst",
      options: {
        cacheName: "lessons-cache",
        expiration: {
          maxEntries: 300,
          maxAgeSeconds: 90 * 24 * 60 * 60,
        },
      },
    },
    {
      urlPattern: /^https?.*\/(api)\/.*$/,
      handler: "NetworkFirst",
      options: {
        cacheName: "api-cache",
        networkTimeoutSeconds: 5,
        expiration: {
          maxEntries: 100,
          maxAgeSeconds: 24 * 60 * 60,
        },
      },
    },
  ],
});

/** @type {import('next').NextConfig} */
const nextConfig = {
  pageExtensions: ["ts", "tsx", "mdx"],
  reactStrictMode: true,
  output: "export",
  // Nome do repositório no GitHub — necessário porque o GitHub Pages publica
  // projetos em usuario.github.io/nome-do-repositorio (não na raiz).
  // Ajuste para o nome real do seu repositório antes do primeiro deploy.
  basePath: process.env.NEXT_PUBLIC_BASE_PATH || "",
  images: {
    unoptimized: true,
  },
};

module.exports = withPWA(withMDX(nextConfig));
