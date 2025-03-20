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

app.post('/save', (req, res) => {
  const data = req.body
  console.log('data', data)

  // isCheck 값이 undefined 또는 null인 경우 기본값 설정
  const isCheckValue = data.isCheck !== 'on' ? 0 : 1
  const numberValue = data.number ? parseFloat(data.number) : null
  
  db.run(`INSERT INTO test (text, isCheck,number) VALUES (?, ?,?)`, [data.text, isCheckValue,numberValue], function(err) {
    if (err) {
      console.error('DB 저장 실패:', err.message) // 에러 메시지 출력e) // 에러 메시지 출력
      res.status(500).send('DB 저장 실패')
      return
    }
    res.json({ id: this.lastID })
  })
})

app.listen(3010, ()=>{console.log('DB : http://localhost:3010')})