import axios from "axios";


const createClassroom = async (ClassroomData) => {
    console.log("in func!",ClassroomData)

    try {
        const { data } = await axios.post(`http://127.0.0.1:8000/school/Classroom/`,
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