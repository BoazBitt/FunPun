import axios from "axios";


const getSentences = async (id) => {

    try {
        const { data } = await axios.get(`http://127.0.0.1:8000/sentence/${id}/`,
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