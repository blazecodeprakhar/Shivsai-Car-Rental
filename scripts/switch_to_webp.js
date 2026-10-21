import fs from 'fs'

const files = [
  'src/data/fleetData.js',
  'src/components/sections/WhyUs.jsx',
  'src/components/sections/CTA.jsx',
]

for (const p of files) {
  let content = fs.readFileSync(p, 'utf8')
  content = content.replace(/\.png/g, '.webp')
  fs.writeFileSync(p, content, 'utf8')
  console.log(`Updated ${p}`)
}
