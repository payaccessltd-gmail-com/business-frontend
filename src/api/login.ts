export const loginApi = async (loginBody: API.LoginDTO) => {
  return await fetch("http://137.184.47.182:8088/api/jwe", {
    method: "POST",
    headers: {
      "content-type": "application/json",
    },
    body: JSON.stringify(loginBody),
  })
}
