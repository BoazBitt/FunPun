import axios from "axios";
import { path } from './path'
import { toast } from "react-toastify";


const getClasses = async (id) => {


    try {
        const { data } = await axios.get(`${path}/school/Classroom/${id}/`,
            {
                headers: {
                    'Content-Type': 'application/json'
                },
            },);   
            return data     
    
    }
    catch (err) {
        toast.error('קרתה שגיאה אנא נסה שוב')

    }



}

export default getClasses;