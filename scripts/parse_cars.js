import fs from 'fs'
import path from 'path'
import { fileURLToPath } from 'url'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const root = path.resolve(__dirname, '..')
const carsDir = path.join(root, 'public', 'cars')
const assetsDir = path.join(root, 'public', 'cars_assets')

const folders = fs.readdirSync(carsDir).filter((f) => fs.statSync(path.join(carsDir, f)).isDirectory())

function findFiles(dir, ext) {
  let out = []
  for (const item of fs.readdirSync(dir)) {
    const p = path.join(dir, item)
    if (fs.statSync(p).isDirectory()) out = out.concat(findFiles(p, ext))
    else if (item.endsWith(ext)) out.push(p)
  }
  return out
}

const assetFolders = fs.readdirSync(assetsDir)

const parsedCars = folders.map((f, idx) => {
  const full = path.join(carsDir, f)
  const txts = findFiles(full, '.txt')
  let txtContent = ''
  if (txts.length > 0) {
    txtContent = fs.readFileSync(txts[0], 'utf-8')
  }

  // Find corresponding asset folder
  // Match using cleaned names
  const cleanF = f.toLowerCase().replace(/[^a-z0-9]/g, '')
  const matchedAsset = assetFolders.find((af) => {
    const cleanAf = af.toLowerCase().replace(/[^a-z0-9]/g, '')
    return cleanF === cleanAf || cleanF.includes(cleanAf) || cleanAf.includes(cleanF)
  })

  let images = []
  if (matchedAsset) {
    images = fs
      .readdirSync(path.join(assetsDir, matchedAsset))
      .filter((x) => x.endsWith('.png') || x.endsWith('.jpg'))
      .map((x) => `/cars_assets/${matchedAsset}/${x}`)
  }

  return {
    rawFolder: f,
    matchedAsset,
    imageCount: images.length,
    images,
    txtContent: txtContent.trim(),
  }
})

console.log(JSON.stringify(parsedCars, null, 2))
