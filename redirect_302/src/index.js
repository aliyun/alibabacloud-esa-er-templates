function handleRequest(request) {
  const newUrl = 'https://aliyun.com';
  
  return Response.redirect(newUrl, 302);
}

export default {
  fetch(request) {
    return handleRequest(request);
  }
}
