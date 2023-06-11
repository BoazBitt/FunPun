import axios from "axios";
import { path } from './path'


const postAMessage = async (msgData) => {
    console.log("in func!",msgData)

    try {
        const { data } = await axios.post(`${path}/message/`,
            {
                headers: {
                    'Content-Type': 'application/json'
                },
                msgData: JSON.stringify(msgData)
            },);   
            return data     
    
    }
    catch (err) {
        console.log("Invalid Shit!")
    }



}

export default postAMessage;