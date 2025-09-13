import axios from "axios";
import { setAccessToken } from "./token.service";

export const signup = async (
  firstName,
  lastName,
  email,
  password,
  confPassword,
  code
) => {
  try {
    // Check if all the fields are filled
    if (!firstName || !lastName || !email || !password || !confPassword)
      return { ok: false, message: "Please fill all the fields, except code." };

    // Check if the password and confirm password are the same
    if (password !== confPassword)
      return {
        ok: false,
        message: "Password and confirm password are not the same.",
      };

    const res = await axios.post("/auth/private/signup", {
      firstName,
      lastName,
      email,
      password,
      code,
    });

    if (res.status !== 200) return { ok: false, message: res.data.message };

    setAccessToken(res.data.accessToken);

    return { ok: true, message: "Sign up successful" };
  } catch (error) {
    console.log(error);
    return {
      ok: false,
      message: error.response?.data?.message || error.message,
    };
  }
};

export const login = async (email, password) => {
  try {
    if (!email || !password)
      return { ok: false, message: "Please fill all the fields." };

    const res = await axios.post("/auth/common/login", { email, password });

    if (res.status !== 200) return { ok: false, message: res.data.message };

    setAccessToken(res.data.accessToken);

    return { ok: true, message: "Login successful" };
  } catch (error) {
    return {
      ok: false,
      message: error.response?.data?.message || error.message,
    };
  }
};
