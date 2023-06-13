import axios from "axios";
import { path } from './path'
import { toast } from "react-toastify";



const UpdateUser = async (id,userData) =>{
    try {
        const { data } = await axios.put(`${path}/account/${id}/`,
            {
                headers: {
                    'Content-Type': 'application/json'
                },
                userData: JSON.stringify(userData)
            },);   
            toast.success('המידע התעדכן בהצלחה')

            return data     
    
    }
    catch (err) {
        toast.error('קרתה שגיאה אנא נסה שוב')
    }

}
export default UpdateUser;