import {create} from "apisauce";

const client = create({
    baseURL: "http://localhost:4000"
})

export default {
    get: client.get,
    post: client.post,
    patch: client.patch,
    put: client.put,
    delete: client.delete
}