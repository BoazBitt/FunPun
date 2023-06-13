import axios from "axios";
import { path } from './path'
import { toast } from "react-toastify";




const AddSentence = async (sentnce) =>{
    
    try {
        const { data } = await axios.post(`${path}/sentence/`,
            {
                headers: {
                    'Content-Type': 'application/json'
                },
                sentenceData: JSON.stringify(sentnce)
            },);   
            toast.success('')

            return data     
    
    }
    catch (err) {
        toast.error('קרתה שגיאה אנא נסה שוב')
        console.log("Cant Find Sentences!")
    }

}
export default AddSentence;