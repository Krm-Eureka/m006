import endpoint from "./axios";
const AUTH_API_URL = "/api/Account/authenticate";

const AuthLogin = async (email, password) => {
  try {
    const res = await endpoint.post(AUTH_API_URL, { email, password });
    // console.log(res);
    // console.log(res.data.succeeded);
    if (res.data.succeeded) {
      return {
        role: res.data.data.roles,
        success: true,
        token: res.data.data.jwToken,
        login_msg: res.data.message,
      };
    } else {
      return { success: false };
    }
  } catch (error) {
    console.error("Error during login:", error);
    throw error;
  }
};

export default AuthLogin;