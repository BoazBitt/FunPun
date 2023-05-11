import axios from "axios";
import { path } from './path'


const createClassroom = async (ClassroomData) => {
    console.log("in func!",ClassroomData)

    try {
        const { data } = await axios.post(`${path}/school/Classroom/`,
            {
                headers: {
                    'Content-Type': 'application/json'
                },
                classData: JSON.stringify(ClassroomData)
            },);   
            return data     
    
    }
    catch (err) {
        console.log("Invalid Shit!")
    }



}

export default createClassroom;