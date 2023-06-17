import axios from "axios";
import { path } from './path'
import { toast } from "react-toastify";


const getSentences = async (id) => {

    try {
        const { data } = await axios.get(`${path}/sentence/${id}/`,
            {
                headers: {
                    'Content-Type': 'application/json'
                },
            },);   
            return data     
    
    }
    catch (err) {
        toast.error("Cant Find Sentences!")

        
    }



}

export default getSentences;