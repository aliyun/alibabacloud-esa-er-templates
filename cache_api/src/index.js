export default {
  async fetch(request) {
    /** 
     * 如果 cache api 传入 request，会按照 request.url 作为key
     * 但这个例子需要通过 url 中带 searchParams 传 type 区分读写删操作
     * 不同的操作url不一致，所以这里用url.origin作为key
     */
    const url = new URL(request.url);
    const type = url.searchParams.get("type");
    async function doPut() {
      await cache.put(url.origin, new Response('Hello world', { headers: [["cache-control", "max-age=10"]] })); 
    }

    async function doGet() {
      const res = await cache.get(url.origin);
      return res;
    }

    async function doDelete() {
      await cache.delete(url.origin);
    }

    switch(type) {
      case 'put':
        await doPut();
        return new Response("OK", { status: 200 });
      case 'get':
        const res = await doGet();
        if (!res) return new Response("Not Found key", { status: 400 });
        return res;
      case 'delete':
        await doDelete();
        return new Response(`Delete ${url.origin} OK`, { status: 200 });
      default:
        return new Response("Did Nothing", { status: 200 });
    }
  },
};