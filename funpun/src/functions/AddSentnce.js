import axios from "axios";
import S1 from '../Data/sentences'
import { path } from './path'



const AddSentence = async (sentence) =>{
    
    try {
        const { data } = await axios.post(`${path}/sentence/`,
            {
                headers: {
                    'Content-Type': 'application/json'
                },
                sentenceData: JSON.stringify(S1[3])
            },);   
            return data     
    
    }
    catch (err) {
        console.log("Cant Find Sentences!")
    }

}
export default AddSentence;