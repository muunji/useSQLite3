import express from 'express'
import sqlite3 from 'sqlite3'
import fs from 'fs'

const app = express()

app.use(express.json())
app.use(express.urlencoded({ extended: true }))

const db = new sqlite3.Database('test.db', (err) => {
  if (err) {
    console.log('DB 연결 실패', err.message)
  }
  console.log('DB 연결 성공')
})

//데이터 저장 API
app.post('/save', (req, res) => {
  const {text, isCheck, number} = req.body
  console.log('data', data)

  const isCheckValue = isCheck !== 'on' ? 0 : 1
  const numberValue = number ? parseFloat(number) : null
  
  db.run(`INSERT INTO test (text, isCheck,number) VALUES (?, ?,?)`, [text, isCheckValue,numberValue], function(err) {
    if (err) {
      console.error('DB 저장 실패:', err.message) // 에러 메시지 출력e) // 에러 메시지 출력
      res.status(500).send('DB 저장 실패')
      return
    }
    res.json({ id: this.lastID })
  })
})

//데이터베이스를 JSON파일로 저장하는 API 추가
app.get('/json', (req, res) => {
  db.all(`SELECT * FROM test`, (err, rows) => {
    if (err) {
      console.error('DB 조회 실패', err.message)
      res.status(500).send('DB 조회 실패')
      return
    }

    //데이터를 JSON 형식으로 변환하여 파일로 저장
    fs.writeFileSync('test.json', JSON.stringify(rows), 'utf-8')
    console.log('데이터가 JSON파일로 저장됨')

    res.json({message : 'JSON 파일 저장 완료'})
  })
})

app.listen(3010, ()=>{console.log('DB : http://localhost:3010')})