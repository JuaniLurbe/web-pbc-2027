import { defineConfig, type Plugin } from 'vite'
import react from '@vitejs/plugin-react'
import fs from 'node:fs'
import path from 'node:path'

function copyDirRecursive(src: string, dest: string, exclude: Set<string> = new Set()) {
  if (!fs.existsSync(src)) return
  fs.mkdirSync(dest, { recursive: true })
  for (const entry of fs.readdirSync(src, { withFileTypes: true })) {
    if (exclude.has(entry.name)) continue
    const srcPath = path.join(src, entry.name)
    const destPath = path.join(dest, entry.name)
    if (entry.isDirectory()) {
      copyDirRecursive(srcPath, destPath, exclude)
    } else {
      fs.copyFileSync(srcPath, destPath)
    }
  }
}

function copyDashboardsPlugin(): Plugin {
  return {
    name: 'copy-static-dashboards',
    closeBundle() {
      const distRoot = path.resolve(__dirname, 'dist')
      copyDirRecursive(
        path.resolve(__dirname, 'planificacion-comandos'),
        path.join(distRoot, 'planificacion-comandos'),
        new Set(['supabase', 'README.md'])
      )
      copyDirRecursive(
        path.resolve(__dirname, 'dia-5-nacion'),
        path.join(distRoot, 'dia-5-nacion'),
        new Set(['README.md', 'directorio-dia5.md'])
      )
    }
  }
}

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react(), copyDashboardsPlugin()],
})
