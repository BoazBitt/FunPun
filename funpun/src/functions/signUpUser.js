import axios from "axios";
import { path } from './path'
import { toast } from "react-toastify";

const signUpUser = async (signUpData) => {
    const jsonfile = JSON.stringify(signUpData);
    try {
        const { data } = await axios.post(`${path}/signup`,
            {
                headers: {
                    'Content-Type': 'application/json',
                },
                data: jsonfile
       

            },);
            
        toast.success("החשבון נוצר בהצלחה");
        return { data }
    }
    catch (err) {
        toast.error('קרתה שגיאה אנא נסה שוב')
    }



}

export default signUpUser;