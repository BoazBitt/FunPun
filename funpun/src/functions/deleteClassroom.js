import axios from "axios";


const deleteClassroom = async (ClassroomData) => {
    console.log("in func!",ClassroomData)

    try {
        const { data } = await axios.delete(`http://127.0.0.1:8000/school/Classroom/${ClassroomData.classID}/`,
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