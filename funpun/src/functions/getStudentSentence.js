import axios from "axios";
import { path } from './path'

const getStudentSentence = async (level) => {

    try {
        const { data } = await axios.get(`${path}/sentence/`,
            {
                headers: {
                    'Content-Type': 'application/json'
                },
                params: {
                    level: level
                  }
            },);   
            return data     
    
    }
    catch (err) {
        console.log("Cant Find Sentences!")
    }



}

export default getStudentSentence;