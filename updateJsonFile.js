import fs from 'fs'
import path from 'path'
import { fileURLToPath } from 'url'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

/**
 * 데이터베이스에서 데이터를 읽어와서 JSON파일로 저장하는 함수
 */

export function updateJsonFile(db) {
  db.all(`SELECT * FROM test`, (err, rows) => {
    if (err) {
      console.error('DB 조회 실패', err.message)
      return
    }
    fs.writeFileSync(path.join(__dirname, 'test.json'), JSON.stringify(rows), 'utf-8', (err) => {
      if (err) {
        console.error('JSON 파일 저장 실패', err.message)
        return
      }
      console.log('데이터가 JSON파일로 저장됨')
    })
  })
}