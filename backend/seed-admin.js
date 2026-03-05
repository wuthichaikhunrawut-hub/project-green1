const http = require('http');

function post(path, data) {
  return new Promise((resolve, reject) => {
    const body = JSON.stringify(data);
    const req = http.request(
      { hostname: 'localhost', port: 3001, path, method: 'POST',
        headers: { 'Content-Type': 'application/json', 'Content-Length': Buffer.byteLength(body) }
      },
      (res) => {
        let b = '';
        res.on('data', c => b += c);
        res.on('end', () => res.statusCode < 300 ? resolve(b) : reject(`${res.statusCode}: ${b}`));
      }
    );
    req.on('error', reject);
    req.write(body);
    req.end();
  });
}

// ---- Green Office Criteria (เกณฑ์มาตรฐานหน่วยงาน จากเอกสาร) ----
const criteria = [
  // หมวดที่ 1: นโยบายและการบริหารจัดการ
  { category_number: 1, criteria_code: '1.1', criteria_name: 'นโยบายด้านสิ่งแวดล้อม', max_score: 5, description: 'มีนโยบายด้านสิ่งแวดล้อมที่ผู้บริหารสูงสุดลงนาม และสื่อสารให้บุคลากรทราบ', year_version: 2024 },
  { category_number: 1, criteria_code: '1.2', criteria_name: 'การจัดตั้งคณะทำงาน Green Office', max_score: 5, description: 'มีคณะทำงานด้านสิ่งแวดล้อมที่ชัดเจน มีการประชุมและติดตามผลอย่างสม่ำเสมอ', year_version: 2024 },
  { category_number: 1, criteria_code: '1.3', criteria_name: 'การกำหนดเป้าหมายและแผนงาน', max_score: 5, description: 'มีการกำหนดเป้าหมายด้านสิ่งแวดล้อมที่วัดได้และมีแผนปฏิบัติการที่ชัดเจน', year_version: 2024 },
  // หมวดที่ 2: การใช้พลังงาน
  { category_number: 2, criteria_code: '2.1', criteria_name: 'การติดตามการใช้ไฟฟ้า', max_score: 5, description: 'มีการบันทึกและติดตามปริมาณการใช้ไฟฟ้ารายเดือน', year_version: 2024 },
  { category_number: 2, criteria_code: '2.2', criteria_name: 'มาตรการประหยัดพลังงาน', max_score: 5, description: 'มีมาตรการและกิจกรรมเพื่อลดการใช้พลังงานไฟฟ้า เช่น การปิดไฟ ปิดเครื่องปรับอากาศ', year_version: 2024 },
  { category_number: 2, criteria_code: '2.3', criteria_name: 'อุปกรณ์ประหยัดพลังงาน', max_score: 5, description: 'ใช้อุปกรณ์ไฟฟ้าที่มีฉลากประหยัดไฟฟ้า (เบอร์ 5)', year_version: 2024 },
  // หมวดที่ 3: การใช้น้ำ
  { category_number: 3, criteria_code: '3.1', criteria_name: 'การติดตามการใช้น้ำ', max_score: 5, description: 'มีการบันทึกและติดตามปริมาณการใช้น้ำรายเดือน', year_version: 2024 },
  { category_number: 3, criteria_code: '3.2', criteria_name: 'มาตรการประหยัดน้ำ', max_score: 5, description: 'มีมาตรการลดการใช้น้ำ เช่น การติดตั้งก๊อกน้ำประหยัด หัวฉีดประหยัดน้ำ', year_version: 2024 },
  // หมวดที่ 4: การจัดการของเสีย
  { category_number: 4, criteria_code: '4.1', criteria_name: 'การคัดแยกขยะ', max_score: 5, description: 'มีระบบคัดแยกขยะที่ชัดเจน มีถังขยะหลายประเภทและป้ายบ่งชี้', year_version: 2024 },
  { category_number: 4, criteria_code: '4.2', criteria_name: 'การลดการใช้กระดาษ', max_score: 5, description: 'มีมาตรการลดการใช้กระดาษ เช่น การใช้เอกสารดิจิทัล การพิมพ์หน้าสองด้าน', year_version: 2024 },
  { category_number: 4, criteria_code: '4.3', criteria_name: 'การจัดการของเสียอันตราย', max_score: 5, description: 'มีการรวบรวมและกำจัดของเสียอันตราย เช่น หลอดไฟ แบตเตอรี่ ตลับหมึก', year_version: 2024 },
  // หมวดที่ 5: สิ่งแวดล้อมภายในอาคาร
  { category_number: 5, criteria_code: '5.1', criteria_name: 'คุณภาพอากาศภายในอาคาร', max_score: 5, description: 'มีการตรวจวัดและควบคุมคุณภาพอากาศในอาคาร รวมถึงการระบายอากาศที่เหมาะสม', year_version: 2024 },
  { category_number: 5, criteria_code: '5.2', criteria_name: 'ความสะอาดและความเป็นระเบียน', max_score: 5, description: 'สถานที่ทำงานสะอาด เป็นระเบียบ ไม่มีฝุ่นละอองสะสม', year_version: 2024 },
  // หมวดที่ 6: การสื่อสารและการมีส่วนร่วม
  { category_number: 6, criteria_code: '6.1', criteria_name: 'การฝึกอบรมและสร้างความตระหนัก', max_score: 5, description: 'มีการฝึกอบรมด้านสิ่งแวดล้อมให้แก่บุคลากรอย่างน้อยปีละ 1 ครั้ง', year_version: 2024 },
  { category_number: 6, criteria_code: '6.2', criteria_name: 'การรายงานผลและการปรับปรุง', max_score: 5, description: 'มีการรายงานผลการดำเนินงานด้านสิ่งแวดล้อมและมีการปรับปรุงอย่างต่อเนื่อง', year_version: 2024 },
];

// ---- Emission Factors (ค่าสัมประสิทธิ์คาร์บอนมาตรฐานไทย) ----
const emissionFactors = [
  { category: 'ไฟฟ้า (Electricity)', type_name: 'ไฟฟ้า กฟน./กฟภ. (Grid Electricity)', unit: 'kWh', factor_value: 0.4999, gwp_version: 'TGO 2023', is_active: true },
  { category: 'เชื้อเพลิง (Fuel)', type_name: 'น้ำมันดีเซล (Diesel)', unit: 'ลิตร', factor_value: 2.6800, gwp_version: 'IPCC AR6', is_active: true },
  { category: 'เชื้อเพลิง (Fuel)', type_name: 'น้ำมันเบนซิน 95 (Gasoline)', unit: 'ลิตร', factor_value: 2.3100, gwp_version: 'IPCC AR6', is_active: true },
  { category: 'เชื้อเพลิง (Fuel)', type_name: 'ก๊าซ LPG', unit: 'กก.', factor_value: 2.9840, gwp_version: 'IPCC AR6', is_active: true },
  { category: 'เชื้อเพลิง (Fuel)', type_name: 'ก๊าซ NGV (CNG)', unit: 'กก.', factor_value: 2.7500, gwp_version: 'IPCC AR6', is_active: true },
  { category: 'น้ำประปา (Water)', type_name: 'น้ำประปา (Tap Water)', unit: 'ลบ.ม.', factor_value: 0.3440, gwp_version: 'TGO 2023', is_active: true },
  { category: 'กระดาษ (Paper)', type_name: 'กระดาษ A4 (Copy Paper)', unit: 'รีม', factor_value: 0.9000, gwp_version: 'IPCC AR6', is_active: true },
  { category: 'ขยะ (Waste)', type_name: 'ขยะทั่วไป (General Waste)', unit: 'กก.', factor_value: 0.5000, gwp_version: 'IPCC AR6', is_active: true },
  { category: 'การเดินทาง (Travel)', type_name: 'รถยนต์ส่วนตัว (Car)', unit: 'กม.', factor_value: 0.1850, gwp_version: 'IPCC AR6', is_active: true },
  { category: 'การเดินทาง (Travel)', type_name: 'รถไฟฟ้า BTS/MRT', unit: 'กม.', factor_value: 0.0410, gwp_version: 'IPCC AR6', is_active: true },
  { category: 'การเดินทาง (Travel)', type_name: 'เครื่องบิน (Domestic Flight)', unit: 'กม.', factor_value: 0.2550, gwp_version: 'IPCC AR6', is_active: true },
];

// ---- Subscription Plans ----
const plans = [
  {
    name: 'Basic',
    description: 'เหมาะสำหรับองค์กรขนาดเล็กที่ต้องการเริ่มต้นติดตามการปล่อยก๊าซเรือนกระจก',
    price_per_month: 0,
    max_users: 3,
    max_locations: 1,
    has_ai_scan: false,
    has_green_office: false,
    is_active: true
  },
  {
    name: 'Professional',
    description: 'สำหรับองค์กรขนาดกลาง ครบครันด้วยฟีเจอร์ AI และการประเมิน Green Office',
    price_per_month: 1990,
    max_users: 20,
    max_locations: 3,
    has_ai_scan: true,
    has_green_office: true,
    is_active: true
  },
  {
    name: 'Enterprise',
    description: 'สำหรับองค์กรขนาดใหญ่ รองรับผู้ใช้ไม่จำกัด พร้อมรายงานในเชิงลึก',
    price_per_month: 4990,
    max_users: 999,
    max_locations: 99,
    has_ai_scan: true,
    has_green_office: true,
    is_active: true
  },
];

async function seed() {
  console.log('\n🌱 Seeding Admin Sample Data...\n');

  // Seed Green Criteria
  console.log('📋 Seeding Green Office Criteria...');
  for (const c of criteria) {
    try {
      await post('/admin/green-criteria', c);
      console.log(`  ✅ ${c.criteria_code} - ${c.criteria_name}`);
    } catch (e) {
      console.log(`  ⚠️  Skip ${c.criteria_code}: ${e}`);
    }
  }

  // Seed Emission Factors
  console.log('\n🌿 Seeding Emission Factors...');
  for (const f of emissionFactors) {
    try {
      await post('/admin/emission-factors', f);
      console.log(`  ✅ ${f.type_name}`);
    } catch (e) {
      console.log(`  ⚠️  Skip ${f.type_name}: ${e}`);
    }
  }

  // Seed Subscription Plans
  console.log('\n💳 Seeding Subscription Plans...');
  for (const p of plans) {
    try {
      await post('/admin/subscriptions/plans', p);
      console.log(`  ✅ Plan: ${p.name}`);
    } catch (e) {
      console.log(`  ⚠️  Skip ${p.name}: ${e}`);
    }
  }

  console.log('\n✅ Seed complete!\n');
}

seed();
