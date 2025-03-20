import sqlite3 from 'sqlite3'

export function createDB() {
  const db = new sqlite3.Database('test.db', (err) => {
    if (err) {
      console.error('데이터베이스 연결 실패:', err.message)
    } else {
      console.log('데이터베이스 연결 성공')
      db.run(`
        CREATE TABLE IF NOT EXISTS test (
          id INTEGER PRIMARY KEY AUTOINCREMENT,
          text TEXT NOT NULL,
          isCheck INTEGER NOT NULL,
          number REAL
        )
      `, (err) => {
        if (err) {
          console.error('테이블 생성 실패:', err.message)
        } else {
          console.log('테이블 생성 성공')
        }
        db.close()
      })
    }
  })
}

