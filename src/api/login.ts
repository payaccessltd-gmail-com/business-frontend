export const loginApi = async (loginBody: API.LoginDTO) => {
  return await fetch("http://137.184.47.182:8088/api/jwe", {
    method: "POST",
    headers: {
      "content-type": "application/json",
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, OPTIONS",
      "Access-Control-Allow-Headers": "Content-Type, Authorization",
    },
    body: JSON.stringify(loginBody),
  })
}
