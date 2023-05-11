import axios from "axios";
import { path } from './path'


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
        console.log("Invalid Shit!")
    }
}

export default createStudent;