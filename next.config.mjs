import { fileURLToPath } from 'url'
import { dirname } from 'path'

const __dirname = dirname(fileURLToPath(import.meta.url))

/** @type {import('next').NextConfig} */
const nextConfig = {
  // Export statique (HTML/CSS/JS) pour GitHub Pages, servi sur saarlab.synthi-ai.com.
  output: 'export',
  // Chaque route devient un dossier/index.html (routage fiable sur Pages).
  trailingSlash: true,
  turbopack: {
    root: __dirname,
  },
  typescript: {
    ignoreBuildErrors: true,
  },
  images: {
    // L'optimiseur d'images nécessite un serveur : on le désactive pour l'export.
    unoptimized: true,
  },
}

export default nextConfig
