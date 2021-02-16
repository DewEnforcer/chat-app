import {create} from "apisauce";

const client = create({
    baseURL: process.env.API_BASE_URL
})

export default {
    get: client.get,
    post: client.post,
    patch: client.patch,
    put: client.put,
    delete: client.delete
}