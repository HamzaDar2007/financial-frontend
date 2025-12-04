const http = require('http');

const options = {
  hostname: 'localhost',
  port: 3000,
  path: '/auth/register',
  method: 'OPTIONS', // Preflight request
  headers: {
    'Origin': 'http://localhost:5173',
    'Access-Control-Request-Method': 'POST',
    'Access-Control-Request-Headers': 'Content-Type'
  }
};

const req = http.request(options, (res) => {
  console.log(`STATUS: ${res.statusCode}`);
  console.log(`HEADERS: ${JSON.stringify(res.headers, null, 2)}`);
  
  // Check for CORS headers
  if (res.headers['access-control-allow-origin']) {
    console.log('\n✅ CORS is configured correctly!');
    console.log(`Allow-Origin: ${res.headers['access-control-allow-origin']}`);
  } else {
    console.log('\n❌ CORS headers missing!');
  }
});

req.on('error', (e) => {
  console.error(`problem with request: ${e.message}`);
});

req.end();
