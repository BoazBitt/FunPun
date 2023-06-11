import axios from "axios";
import { path } from './path'



const AddSentence = async (sentnce) =>{
    
    try {
        const { data } = await axios.post(`${path}/sentence/`,
            {
                headers: {
                    'Content-Type': 'application/json'
                },
                sentenceData: JSON.stringify(sentnce)
            },);   
            return data     
    
    }
    catch (err) {
        console.log("Cant Find Sentences!")
    }

}
export default AddSentence;