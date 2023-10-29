import { baseUrlAuth } from "./baseUrl"




export const loginApi = async (loginBody: API.LoginDTO) => {
  return await fetch(`${baseUrlAuth}/api/jwe`, {
    method: "POST",
    headers: {
      "content-type": "application/json",
    },
    body: JSON.stringify(loginBody),
  });
};
