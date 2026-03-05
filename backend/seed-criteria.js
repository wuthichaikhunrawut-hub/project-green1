const sqlite3 = require('sqlite3').verbose();
const path = require('path');

const dbPath = path.resolve(__dirname, 'greensync.sqlite');
const db = new sqlite3.Database(dbPath, (err) => {
  if (err) {
    console.error('Could not connect to database', err);
    process.exit(1);
  }
});

const criteria = [
  { category: 1, code: '1.1', name: 'การกำหนดนโยบายสิ่งแวดล้อม', max: 5, desc: 'มีนโยบายสิ่งแวดล้อมที่ครอบคลุมและสื่อสารให้พนักงานทราบ' },
  { category: 1, code: '1.2', name: 'คณะทำงานและการทบทวนฝ่ายบริหาร', max: 5, desc: 'มีการแต่งตั้งคณะทำงานและประชุมทบทวนอย่างน้อยปีละ 1 ครั้ง' },
  { category: 2, code: '2.1', name: 'การสื่อสารและอบรมพนักงาน', max: 5, desc: 'มีการอบรมพนักงานเรื่องสำนักงานสีเขียวอย่างน้อย 80%' },
  { category: 3, code: '3.1', name: 'การจัดการพลังงาน (ไฟฟ้า)', max: 5, desc: 'มีมาตรการลดการใช้ไฟฟ้าและผลประเมินผ่านเกณฑ์' },
  { category: 3, code: '3.2', name: 'การจัดการทรัพยากร (น้ำ/กระดาษ)', max: 5, desc: 'มีมาตรการลดการใช้น้ำและกระดาษอย่างเป็นรูปธรรม' },
  { category: 4, code: '4.1', name: 'การจัดการของเสีย', max: 5, desc: 'มีการคัดแยกขยะอย่างถูกต้องและมีจุดทิ้งขยะที่เหมาะสม' },
  { category: 5, code: '5.1', name: 'สภาพแวดล้อมและความปลอดภัย', max: 5, desc: 'แสงสว่าง กลิ่น อากาศ และความปลอดภัยได้มาตรฐาน' },
  { category: 6, code: '6.1', name: 'การจัดซื้อจัดจ้างที่เป็นมิตรกับสิ่งแวดล้อม', max: 5, desc: 'มีสัดส่วนการจัดซื้อสินค้าฉลากเขียวไม่น้อยกว่า 30%' }
];

db.serialize(() => {
  console.log('Clearing existing criteria...');
  db.run("DELETE FROM green_criteria_master");
  
  console.log('Inserting mock Green Office criteria...');
  const stmt = db.prepare("INSERT INTO green_criteria_master (category_number, criteria_code, criteria_name, max_score, description, year_version) VALUES (?, ?, ?, ?, ?, 2024)");
  
  criteria.forEach(c => {
    stmt.run(c.category, c.code, c.name, c.max, c.desc);
  });

  stmt.finalize((err) => {
    if (err) console.error('Error inserting criteria data:', err);
    else console.log('Mock criteria inserted successfully!');
    db.close();
  });
});
