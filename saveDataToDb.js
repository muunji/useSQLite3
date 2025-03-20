

export function saveDataToDb(data, db) { 
  data.forEach((item) => {
    const { text, isCheck, number } = item
    const isCheckValue = isCheck !== 'on' ? 0 : 1
    const numberValue = number ? parseFloat(number) : null

    db.run(`INSERT INTO test (text, isCheck, number) VALUES (?, ?, ?)`, [text, isCheckValue, numberValue], function (err) {
      if (err) {
        console.error('saveDataToDb 저장 실패:', err.message)
      } else {
        console.log(`ID ${this.lastID}번 데이터 저장 완료`)
      }
    })
  })
}