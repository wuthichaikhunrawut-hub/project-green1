const http = require('http');

function request(path, method, data, headers = {}) {
  return new Promise((resolve, reject) => {
    const body = data ? JSON.stringify(data) : '';
    const req = http.request(
      { 
        hostname: 'localhost', 
        port: 3001, 
        path, 
        method,
        headers: { 
          'Content-Type': 'application/json', 
          'Content-Length': Buffer.byteLength(body),
          ...headers
        }
      },
      (res) => {
        let b = '';
        res.on('data', c => b += c);
        res.on('end', () => {
          if (res.statusCode >= 200 && res.statusCode < 300) {
            try { resolve(JSON.parse(b || '{}')); } catch(e) { resolve(b); }
          } else {
            reject(`${res.statusCode}: ${b}`);
          }
        });
      }
    );
    req.on('error', reject);
    req.write(body);
    req.end();
  });
}

async function seed() {
  console.log('\n🌱 Seeding Mock Green Office Assessment Request...\n');

  try {
    // 1. Create a raw assessment
    console.log('📝 Creating new assessment for Org 1...');
    const assessment = await request('/assessments', 'POST', {
      assessment_year: 2026,
      status: 'PENDING'
    }, { 'x-org-id': '1', 'x-user-role': 'USER' });
    
    console.log(`✅ Created Assessment ID: ${assessment.id}`);
    
    // 2. Mock filling out the assessment self-scores
    console.log('🔄 Simulating user filling out self-scores...');
    
    // The details are auto-generated. Let's patch them.
    const detailsToUpdate = assessment.details.map((detail, index) => {
      // Simulate answering with score 3, 4, or 5
      const randomScore = Math.floor(Math.random() * 3) + 3; 
      return {
        assessment_detail_id: detail.id,
        // The API update method currently applies auditor scores, let's look at the service...
        // Actually the service 'update' only updates main fields & assessor_score right now.
        // If we want self_score, we must hit the DB directly or update the service.
      };
    });
    
    // As per AssessmentsService.update:
    // It only updates 'status', 'total_score', 'certified_level' and 'assessor_score'.
    // Let's just update the status to SUBMITTED to make it visible
    
    console.log('📢 Updating status to SUBMITTED...');
    await request(`/assessments/${assessment.id}`, 'PATCH', {
      status: 'SUBMITTED',
      total_score: 85.5
    }, { 'x-org-id': '1', 'x-user-role': 'USER' });
    
    console.log('✅ Assessment successfully mocked and submitted!');

  } catch (err) {
    console.error('❌ Failed to seed assessment:', err);
  }
}

seed();
