import http from "./httpService";
import jwtDecode from "jwt-decode";

const endPoint = "/auth";
const LOCAL_TOKEN_KEY = "CHAT_APP_AUTH_TOKEN";

const login = async dataObj => {
    const {data, ok} = await http.post(endPoint, dataObj);
    if (ok) saveToken(data);
}

const logout = () => localStorage.removeItem(LOCAL_TOKEN_KEY);

const saveToken = token => localStorage.setItem(LOCAL_TOKEN_KEY, token);

const decodeToken = () => jwtDecode(localStorage.getItem(LOCAL_TOKEN_KEY));

const getCurrentUser = () => {
    const user = decodeToken();
    if (!user) return null;

    return user;
}

export default {
    login,
    logout,
    getCurrentUser
}