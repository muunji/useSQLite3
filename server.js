import express from 'express'
import sqlite3 from 'sqlite3'
import fs from 'fs'

import { readJSONFile } from './readJSONFile.js'
import { saveDataToDb } from './saveDataToDb.js'

const app = express()

app.use(express.json())
app.use(express.urlencoded({ extended: true }))

const db = new sqlite3.Database('test.db', (err) => {
  if (err) {
    console.log('DB 연결 실패', err.message)
  }
  console.log('DB 연결 성공')
})

const jsonData = readJSONFile()
saveDataToDb(jsonData, db)

app.listen(3010, ()=>{console.log('DB : http://localhost:3010')})