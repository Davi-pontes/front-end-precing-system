import axios from "axios";

export class Auth {
    static async validate() {
        try {
            const urlApiBackEnd = import.meta.env.VITE_API_BACKEND

            const { data } = await axios.get(urlApiBackEnd + '/login/validate', {
                withCredentials: true
            })

            if (data === 'unauthorized') {
                return false
            }

            return true

        } catch (error) {
            return false
        }
    }
}