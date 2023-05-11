import axios from "axios";


const createStudent = async (studentData) => {
    console.log("in func!",studentData)

    try {
        const { data } = await axios.post(`http://127.0.0.1:8000/school/Student/`,
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