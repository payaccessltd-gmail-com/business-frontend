import { baseUrlAuth } from "./baseUrl"

export const loginApi = async (loginBody: API.LoginDTO) => {

  return await fetch(`${baseUrlAuth}/api/jwe`, {
    method: "POST",
    headers: myHeaders,
    redirect: "follow",
    body: JSON.stringify(loginBody),
  });
};
