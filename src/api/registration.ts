import { baseUrl } from "./baseUrl"


export const createNewUser = async (merchantRegBody: API.UserDTO) => {
  return await fetch(
    `${baseUrl}/api/v1/user/new-signup`,
    {
      method: "POST",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify(merchantRegBody),
    },
  );
};
