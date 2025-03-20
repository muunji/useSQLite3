import fs from 'fs'
import path from 'path'
import { fileURLToPath } from 'url'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

export function readJSONFile() {
  try {
    const data = fs.readFileSync(path.join(__dirname, 'test.json'), 'utf-8')
    return JSON.parse(data)
  } catch (err) {
    console.error('JSON 파일 읽기 실패:', err.message)
    return []
  }
}