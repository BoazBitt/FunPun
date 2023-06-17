import axios from "axios";
import { path } from './path'
import { toast } from "react-toastify";


const createClassroom = async (ClassroomData) => {

    try {
        const { data } = await axios.post(`${path}/school/Classroom/`,
            {
                headers: {
                    'Content-Type': 'application/json'
                },
                classData: JSON.stringify(ClassroomData)
            },);   
            toast.success('הכיתה התווספה בהצלחה')

            return data   
              
    
    }
    catch (err) {
        toast.error('קרתה שגיאה אנא נסה שוב')

    }



}

export default createClassroom;