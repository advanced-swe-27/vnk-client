import config from "@/config"
import axios from "axios"

const Axios = axios.create({
    baseURL: config.api.local,
    withCredentials: true
})

export default Axios