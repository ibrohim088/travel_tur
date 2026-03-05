import fs from 'fs/promises'
import path from 'path'
import { fileURLToPath } from 'url'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

async function read(dir) {
  const data = await fs.readFile(path.join(__dirname, '../db', dir), 'utf-8')
  return data ? JSON.parse(data) : []
}

async function write(dir, data) {
  await fs.writeFile(path.join(__dirname, '../db', dir), JSON.stringify(data, null, 2))
  return { success: true }
}


export  { read, write }