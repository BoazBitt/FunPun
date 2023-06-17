import axios from "axios";
import { path } from './path'
import { toast } from "react-toastify";


const getAllMessages = async (sender,receiver) => {

    try {
        const { data } = await axios.get(`${path}/message/`,
            {
                headers: {
                    'Content-Type': 'application/json'
                },
                params: {
                    sender: sender,
                    receiver:receiver

                  }
            },);
        return data

    }
    catch (err) {
        toast.error('קרתה שגיאה אנא נסה שוב')

        
    }



}

export default getAllMessages;