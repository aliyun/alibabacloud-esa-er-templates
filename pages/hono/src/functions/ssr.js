import { Hono } from 'hono';
import { SSRPage } from './components/SSRPage.jsx';

const ssr = new Hono();

ssr.get('/:name', (c) => {
  const { name } = c.req.param();
  const timestamp = new Date().toLocaleString();
  
  return c.html(`<!DOCTYPE html>${SSRPage({ name, timestamp })}`);
});

export default ssr;
