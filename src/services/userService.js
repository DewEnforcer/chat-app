import http from "./httpService";

const endPoint = "/users";

const signup = data => http.post(endPoint, data);

export default {
    signup
}