
/**
 * 示例为对 aliyun.com 的反向代理, 并修改响应头后返给客户端
 * 测试时请将 url 替换为您自己的地址
 */
const url = "https://aliyun.com"

async function handleRequest(request) {
  const response = await fetch(url)

  // 仅复制返回内容的 body
  const newResponse = new Response(response.body, response)

  // 自定义增加 header
  newResponse.headers.append("custom-ER-add", "ER header")

  // 自定义删减 header
  newResponse.headers.delete("custom-ER-delete")

  // 自定义修改header
  newResponse.headers.set("custom-ER-reset", "ER header")

  return newResponse
}

export default {
  fetch(request) {
    return handleRequest(request)
  }
}