// Simple health check script
const https = require('https');
const http = require('http');

const url = process.env.HEALTH_CHECK_URL || 'https://portfolio-production-8534.up.railway.app/health';

function checkHealth() {
  const protocol = url.startsWith('https') ? https : http;
  
  const req = protocol.get(url, (res) => {
    if (res.statusCode === 200) {
      console.log('✅ Health check passed');
      process.exit(0);
    } else {
      console.log('❌ Health check failed with status:', res.statusCode);
      process.exit(1);
    }
  });
  
  req.on('error', (err) => {
    console.log('❌ Health check failed:', err.message);
    process.exit(1);
  });
  
  req.setTimeout(10000, () => {
    console.log('❌ Health check timeout');
    req.destroy();
    process.exit(1);
  });
}

checkHealth();

