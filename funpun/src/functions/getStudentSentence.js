import axios from "axios";
import { path } from './path'
import { toast } from "react-toastify";

const getStudentSentence = async (level) => {

    try {
        const { data } = await axios.get(`${path}/sentence/`,
            {
                headers: {
                    'Content-Type': 'application/json'
                },
                params: {
                    level: level
                  }
            },);   
            return data     
    
    }
    catch (err) {
        toast.error('קרתה שגיאה אנא נסה שוב')

    }



}

export default getStudentSentence;