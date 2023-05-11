import axios from "axios";
import { path } from './path'

const deleteClassroom = async (ClassroomData) => {
    console.log("in func!",ClassroomData)

    try {
        const { data } = await axios.delete(`${path}/school/Classroom/${ClassroomData.classID}/`,
            {
                headers: {
                    'Content-Type': 'application/json'
                },
            },);   
            return data     
    
    }
    catch (err) {
        console.log("Invalid Shit!")
    }



}

export default deleteClassroom;