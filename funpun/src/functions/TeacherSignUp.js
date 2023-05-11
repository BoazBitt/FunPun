import axios from "axios";
import { path } from './path'


const getSentences = async (signupData) => {
    console.log("in func!",signupData)

    try {
        const { data } = await axios.post(`${path}/school/Teacher/`,
            {
                headers: {
                    'Content-Type': 'application/json'
                },
                teacherData: JSON.stringify(signupData)
            },);   
            return data     
    
    }
    catch (err) {
        console.log("Invalid Shit!")
    }



}

export default getSentences;