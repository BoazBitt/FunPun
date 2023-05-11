import axios from "axios";
import { path } from './path'

const signUpUser = async (signUpData) => {
    console.log("in function")
    console.log(signUpData)
    console.log(JSON.stringify(signUpData));
    const jsonfile = JSON.stringify(signUpData);
    console.log(jsonfile)
    
    try {
        const { data } = await axios.post(`${path}/signup`,
            {
                headers: {
                    'Content-Type': 'application/json',
                },
                data: jsonfile
       

            },);
        alert("Account Created")
        return { data }
    }
    catch (err) {
        alert(err)
    }



}

export default signUpUser;