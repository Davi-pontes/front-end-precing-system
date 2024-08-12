import axios from "axios";

export class Auth {
    static async validate() {
        const urlApiBackEnd = import.meta.env.VITE_API_BACKEND

        const { data } = await axios.get(urlApiBackEnd + '/login/validate', {
            withCredentials: true
        })

        if (data === 'unauthorized') {
            return false
        }

        return true
    }
}