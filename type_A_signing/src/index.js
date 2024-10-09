import { createHash } from "node:crypto";

async function handleRequest(request) {
  const url = new URL(request.url);
  const path = url.pathname;
  const delta = 3600;

  const authKeyTypeA = url.searchParams.get('auth_key');

  const privateKey = 'your_secret_key'
  const currentTimestamp = Math.floor(Date.now() / 1000);

  if (!authKeyTypeA) {
    return new Response('Unauthorized', { status: 401 });
  }

  const [timestamp, rand, uid, signature] = authKeyTypeA.split('-');

  if (currentTimestamp > parseInt(timestamp)+ delta) {
    return new Response('Link expired', { status: 403 });
  }

  const signString = [path, timestamp, rand, uid, privateKey].join('-');

  const md5 = createHash('md5').update(signString).digest('hex');

  if (md5 !== signature) {
    return new Response('Unauthorized', { status: 401 });
  }

  // 如果资源在其他域名，则请求后返回
  // const yourUrl = `https://your-dcdn-domain.com${path}${url.search}`
  // const cdnResponse = await fetch(yourUrl, request)
  // return new Response(cdnResponse.body, cdnResponse)

  // 大多情况下回源即可
  return fetch(request.url)
}

export default {
  async fetch(request) {
    return handleRequest(request)
  }
}
