import http from "./httpService";

const endPoint = "/chat";

const joinChat = data => http.post(`${endPoint}/join`, data);

const createChat = data => http.post(endPoint, data);

export default {
    joinChat,
    createChat
}