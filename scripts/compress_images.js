import fs from 'fs'
import path from 'path'
import sharp from 'sharp'
import { fileURLToPath } from 'url'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const root = path.resolve(__dirname, '..')
const assetsDir = path.join(root, 'public', 'cars_assets')

async function run() {
  const dirs = fs.readdirSync(assetsDir).filter((d) => fs.statSync(path.join(assetsDir, d)).isDirectory())

  let originalTotal = 0
  let compressedTotal = 0
  let processedCount = 0

  for (const dir of dirs) {
    const fullDir = path.join(assetsDir, dir)
    const files = fs.readdirSync(fullDir).filter((f) => f.endsWith('.png') || f.endsWith('.jpg'))

    for (const file of files) {
      const srcPath = path.join(fullDir, file)
      const baseName = path.parse(file).name
      const destPath = path.join(fullDir, `${baseName}.webp`)

      const origStat = fs.statSync(srcPath)
      originalTotal += origStat.size

      // Resize & convert to webp
      await sharp(srcPath)
        .resize({ width: 1200, withoutEnlargement: true })
        .webp({ quality: 82, effort: 4 })
        .toFile(destPath)

      const compStat = fs.statSync(destPath)
      compressedTotal += compStat.size
      processedCount++
    }
  }

  console.log(`Successfully compressed ${processedCount} images!`)
  console.log(`Original size: ${(originalTotal / (1024 * 1024)).toFixed(2)} MB`)
  console.log(`Compressed size: ${(compressedTotal / (1024 * 1024)).toFixed(2)} MB`)
  console.log(`Saved: ${(((originalTotal - compressedTotal) / originalTotal) * 100).toFixed(1)}% bandwidth!`)
}

run().catch((err) => {
  console.error('Error compressing images:', err)
  process.exit(1)
})
