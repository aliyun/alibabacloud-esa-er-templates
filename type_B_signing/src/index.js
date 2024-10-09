import { createHash } from "node:crypto";

function handleRequest(request) {
  const url = new URL(request.url);
  const path = url.pathname;
  const parts = path.split('/');
  const delta = 3600;
  const privateKey = 'your_secret_key'
  const currentTimestamp = Math.floor(Date.now() / 1000);
  const timestamp = parts[1];
  const signature = parts[2];

  if (!timestamp || !signature) {
    return new Response('Unauthorized', { status: 401 });
  }

  const filePath = '/' + parts.slice(3).join('/');
  const signString = [privateKey, timestamp, filePath].join('');
  const md5 = createHash('md5').update(signString).digest('hex');

  if (md5 !== signature) {
    return new Response('Unauthorized', { status: 403 });
  }

  if (currentTimestamp > parseInt(timestamp)+ delta) {
    return new Response('Link expired', { status: 403 });
  }

  // 如果资源在其他域名，则请求后返回
  // const yourUrl = `https://your-dcdn-domain.com${path}${url.search}`
  // const cdnResponse = await fetch(yourUrl, request)
  // return new Response(cdnResponse.body, cdnResponse)

  // B鉴权的内容在path中，需要重新拼接
  return fetch(url.origin + filePath)
}

export default {
  async fetch(request) {
    return handleRequest(request)
  }
}
