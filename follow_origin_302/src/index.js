/**
 * Determine the response from the origin server. If it is a 302 status code, automatically follow the redirect and return the result of the follow-up request to the client.
 */
export default {
  async fetch(request) {
    // Fetch origin server
    const response = await fetch(request, { redirect: "manual" });
    const status = response.status;

    // If status is 302, fetch the redirected location
    if (status === 302) {
      const res = await fetch(response.headers.get("Location"));
      return res;
    }

    return response;
  },
};
