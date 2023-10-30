export const loginApi = async (loginBody: API.LoginDTO) => {
  var myHeaders = new Headers();
  myHeaders.append("Content-Type", "application/json");

  return await fetch("http://137.184.47.182:8081/token-issuer-1.0.0/api/jwe", {
    method: "POST",
    headers: myHeaders,
    redirect: "follow",
    body: JSON.stringify(loginBody),
  });
};
