async function handleRequest(request) {
  const NAME = 'var';
  const TEST_RESPONSE = new Response('A group');
  const CONTROL_RESPONSE = new Response('B group');

  const cookie = request.headers.get('cookie');
  if (cookie && cookie.includes(`${NAME}=B group`)) {
    return CONTROL_RESPONSE;
  } else if (cookie && cookie.includes(`${NAME}=A group`)) {
    return TEST_RESPONSE;
  } else {
    // If there is no cookie, assign the request to a group randomly
    const group = Math.random() < 0.5 ? 'A group' : 'B group';
    const response = group === 'B group' ? CONTROL_RESPONSE : TEST_RESPONSE;
    response.headers.append('Set-Cookie', `${NAME}=${group}; path=/`);
    return response;
  }
}

export default {
  fetch(request) {
    return handleRequest(request);
  }
}
