import axios from "axios";
import { path } from './path'
import { toast } from "react-toastify";


const getUserInfo = async (loginData) => {

    try {
        const { data } = await axios.post(`${path}/auth`,
            {
                headers: {
                    'Content-Type': 'application/json'
                },
                username: loginData.username,
                password: loginData.password
            },);        
        const token = data.token;
        const response = await axios.get(`${path}/account/${loginData.username}/`,
        {
            headers: {
                'Content-Type': 'application/json'
            },
        },);
        const user = response.data
        toast.success('התחברת בהצלחה')

        return { token: token, user: user };
    }
    catch (err) {
        toast.error('קרתה שגיאה אנא נסה שוב')

        console.log("Invalid UserName or Password")
    }



}

export default getUserInfo;