import { Hono } from 'hono';

const api = new Hono();

// CORS middleware
api.use('*', async (c, next) => {
  const origin = c.req.header('Origin');
  
  // Set CORS headers
  c.header('Access-Control-Allow-Origin', origin || '*');
  c.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
  c.header('Access-Control-Allow-Headers', 'Content-Type, Authorization');
  c.header('Access-Control-Max-Age', '86400');
  
  // Handle preflight requests
  if (c.req.method === 'OPTIONS') {
    return c.text('', 204);
  }
  
  await next();
});

// GET /api/example
api.get('/example', (c) => {
  return c.json({
    success: true,
    message: 'This is a GET request example',
    method: 'GET',
    timestamp: new Date().toISOString(),
    data: {
      id: 1,
      name: 'Example Resource',
      description: 'This is an example API response'
    }
  });
});

// GET /api/example/:id
api.get('/example/:id', (c) => {
  const { id } = c.req.param();
  return c.json({
    success: true,
    message: `Retrieved resource with id: ${id}`,
    method: 'GET',
    timestamp: new Date().toISOString(),
    data: {
      id: parseInt(id),
      name: `Resource ${id}`,
      description: `This is resource number ${id}`
    }
  });
});

// POST /api/example
api.post('/example', async (c) => {
  try {
    const body = await c.req.json();
    return c.json({
      success: true,
      message: 'Data received successfully',
      method: 'POST',
      timestamp: new Date().toISOString(),
      receivedData: body,
      data: {
        id: Date.now(),
        ...body,
        createdAt: new Date().toISOString()
      }
    }, 201);
  } catch (error) {
    return c.json({
      success: false,
      message: 'Invalid JSON in request body',
      method: 'POST',
      timestamp: new Date().toISOString(),
      error: error.message
    }, 400);
  }
});

export default api;
