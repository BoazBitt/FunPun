import axios from "axios";
import { path } from './path'
import { toast } from "react-toastify";

const deleteClassroom = async (ClassroomData) => {
    console.log("in func!",ClassroomData)

    try {
        const { data } = await axios.delete(`${path}/school/Classroom/${ClassroomData.classID}/`,
            {
                headers: {
                    'Content-Type': 'application/json'
                },
            },);   
            toast.success('הכיתה נמחקה בהצלחה')

            return data     
    
    }
    catch (err) {
        toast.error('קרתה שגיאה אנא נסה שוב')

    }



}

export default deleteClassroom;