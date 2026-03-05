const http = require('http');

const users = [
  {
    orgData: { name: 'Admin Org', tax_id: '1234567890', industry_type: 'Tech' },
    userData: { email: 'admin@example.com', username: 'admin', password: 'password123', role: 'ADMIN' },
  },
  {
    orgData: { name: 'Assessor Org', tax_id: '0987654321', industry_type: 'Audit' },
    userData: { email: 'assessor@example.com', username: 'assessor', password: 'password123', role: 'ASSESSOR' },
  },
  {
    orgData: { name: 'User Org', tax_id: '1111111111', industry_type: 'General' },
    userData: { email: 'user@example.com', username: 'user', password: 'password123', role: 'USER' },
  },
];

const register = (user) => {
  return new Promise((resolve, reject) => {
    const data = JSON.stringify(user);
    const req = http.request(
      'http://localhost:3001/auth/register',
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Content-Length': data.length,
        },
      },
      (res) => {
        let body = '';
        res.on('data', (c) => (body += c));
        res.on('end', () => {
          if (res.statusCode === 201) resolve(body);
          else reject(`Failed with ${res.statusCode}: ${body}`);
        });
      }
    );
    req.on('error', reject);
    req.write(data);
    req.end();
  });
};

async function seed() {
  for (const u of users) {
    try {
      console.log(`Registering ${u.userData.role}...`);
      await register(u);
      console.log(`✅ Success: ${u.userData.email}`);
    } catch (e) {
      console.error(`❌ Error seeding ${u.userData.email}:`, e);
    }
  }
}

seed();
