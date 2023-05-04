import axios from "axios";


const getSentences = async (signupData) => {
    console.log("in func!",signupData)

    try {
        const { data } = await axios.post(`http://127.0.0.1:8000/school/Teacher/`,
            {
                headers: {
                    'Content-Type': 'application/json'
                },
                teacherData: JSON.stringify(signupData)
            },);   
            return data     
    
    }
    catch (err) {
        console.log("Invalid Shit!")
    }



}

export default getSentences;