import axios from "axios";
import { path } from './path'

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
        console.log("Cant Find Sentences!")
    }



}

export default getSentences;