import axios from "axios";


const getClasses = async (id) => {
    console.log('i am here!!!!',id)


    try {
        const { data } = await axios.get(`http://127.0.0.1:8000/school/Classroom/${id}/`,
            {
                headers: {
                    'Content-Type': 'application/json'
                },
            },);   
            return data     
    
    }
    catch (err) {
        console.log("Cant Find Classes!")
    }



}

export default getClasses;