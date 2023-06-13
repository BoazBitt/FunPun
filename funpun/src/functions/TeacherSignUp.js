import axios from "axios";
import { path } from './path'
import { toast } from "react-toastify";

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
            toast.success("החשבון נוצר בהצלחה");

            return data     
    
    }
    catch (err) {
        toast.error('קרתה שגיאה אנא נסה שוב')
    }



}

export default getSentences;