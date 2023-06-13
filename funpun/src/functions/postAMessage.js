import axios from "axios";
import { path } from './path'
import { toast } from "react-toastify";


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
            toast.success('ההודעה פורסמה')

            return data     
    
    }
    catch (err) {
        toast.error('קרתה שגיאה אנא נסה שוב')

    }



}

export default postAMessage;