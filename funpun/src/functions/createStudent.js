import axios from "axios";
import { path } from './path'
import { toast } from "react-toastify";


const createStudent = async (studentData) => {
    try {
        const { data } = await axios.post(`${path}/school/Student/`,
            {
                headers: {
                    'Content-Type': 'application/json'
                },
                studentData: JSON.stringify(studentData)
            },);   
            return data     
    
    }
    catch (err) {
        toast.error('קרתה שגיאה אנא נסה שוב')

    }
}

export default createStudent;