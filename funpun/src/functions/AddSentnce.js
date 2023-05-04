import axios from "axios";
import S1 from '../Data/sentences'

const AddSentence = async (sentence) =>{
    
    try {
        const { data } = await axios.post(`http://127.0.0.1:8000/sentence/`,
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