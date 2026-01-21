import { Hono } from 'hono';
import ssr from './ssr';
import api from './api';

const app = new Hono().basePath('/');

app.route('/ssr', ssr);
app.route('/api', api);


async function handleRequest(request) {
  return app.fetch(request);
}

export default {
  async fetch(request) {
    return handleRequest(request);
  }
};