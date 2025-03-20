import express from 'express'
import path from 'path'
import { fileURLToPath } from 'url'
import fetch from 'node-fetch'

import fs from 'fs'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

const app = express()

app.use(express.json())
app.use(express.urlencoded({ extended: true }))

import { createDB } from './database.js'

createDB()

// if(!fs.existsSync('test.json')) {
//   fs.writeFileSync('test.json', JSON.stringify([]))
// }

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname ,'index.html'))
})

app.post('/enter', async(req, res) => {
  let body = req.body
  console.log('body', body)

  const isCheckValue = body.isCheck ? body.isCheck : 'off'

  //JSON 파일 저장
  // let origin = JSON.parse(fs.readFileSync('test.json'))
  // origin.push({ text: body.text, isCheck: isCheckValue, number: body.number })

  // fs.writeFileS('test.json', (JSON.stringify(origin)))
  
  try {
    const response = await fetch('http://localhost:3010/save', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ text : body.text, isCheck : isCheckValue , number : body.number})
    })

    if(!response.ok) {
      throw new Error('HTTP 에러', response.status)
    }
    console.log('DB 저장 성공')
    res.redirect('/')
  } catch (error) {
    console.log('DB 과정에서 error발생', error)
    res.status(500).send('DB 저장 실패')
  }

})

app.listen(3000, () => {  console.log('http://localhost:3000') })