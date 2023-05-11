import axios from "axios";
import { path } from './path'

const TeacherLogin = async (loginData) => {
    console.log("in Login:",loginData)

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
        console.log('token: ',token)
        const response = await axios.get(`${path}/school/Teacher/${loginData.username}/`,
        {
            headers: {
                'Content-Type': 'application/json'
            
            },
        },);
        const user = response.data
        return { token: token, user: user };
    }
    catch (err) {
        console.log("Invalid UserName or Password")
    }



}

export default TeacherLogin;