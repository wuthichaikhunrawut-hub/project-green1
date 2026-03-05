const sqlite3 = require('sqlite3').verbose();
const path = require('path');

const dbPath = path.resolve(__dirname, 'database.sqlite');
const db = new sqlite3.Database(dbPath, (err) => {
  if (err) {
    console.error('Could not connect to database', err);
    process.exit(1);
  }
});

const id1 = 'req-001-' + Date.now();
const id2 = 'req-002-' + Date.now();

// Insert an organization if it doesn't exist to bind the requests to
db.serialize(() => {
  db.run("INSERT OR IGNORE INTO organizations (org_id, name, tax_id, industry_type, created_at, updated_at) VALUES (1, 'Green Demo Corp', '0123456789123', 'Tech', datetime('now'), datetime('now'))");

  // Insert Certification Requests
  const stmt = db.prepare("INSERT INTO certification_requests (id, status, total_carbon, notes, created_at, updated_at, organization_id, evaluation_data) VALUES (?, ?, ?, ?, datetime('now'), datetime('now'), ?, ?)");
  
  stmt.run(id1, 'PENDING', 1250, 'ส่งขอประเมินรอบปี 2569 - ฝากพิจารณาด้วยครับ', 1, '{}');
  stmt.run(id2, 'APPROVED', 980, 'ข้อมูลครบถ้วน', 1, '{"status": "passed"}');
  
  stmt.finalize((err) => {
    if (err) console.error('Error inserting mock data:', err);
    else console.log('Mock data inserted successfully!');
    db.close();
  });
});
