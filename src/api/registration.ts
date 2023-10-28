export const createNewUser = async (merchantRegBody: API.UserDTO) => {
  return await fetch(
    "http://137.184.47.182:8081/payaccess/api/v1/merchant/new-merchant-signup",
    {
      method: "POST",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify(merchantRegBody),
    },
  );
};
