export default {
  async fetch(request) {
    // Create a URL object from the incoming request
    const url = new URL(request.url);

    // Retrieve the 'uid' parameter from the URL's query string
    const uid = url.searchParams.get('uid');

    // Initialize the EdgeKV instance with the specified namespace
    const edgeKv = new EdgeKV({ namespace: 'test-msy' });

    // Check if the uid exists in EdgeKV
    const isExist = await edgeKv.get(uid, { type: 'text' });

    // If the uid exists in the blacklist, return a 403 Forbidden response
    if (isExist) {
      return new Response('Forbidden: uid forbidden', { status: 403 });
    } else {
      // If the uid is not blacklisted, fetch the request normally (self fetch)
      return await fetch(request);
    }
  }
};
