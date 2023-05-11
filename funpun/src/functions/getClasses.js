import axios from "axios";
import { path } from './path'

const getClasses = async (id) => {
    console.log('i am here!!!!',id)


    try {
        const { data } = await axios.get(`${path}/school/Classroom/${id}/`,
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