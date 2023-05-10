import axios from "axios";


const getStudentSentence = async (level) => {

    try {
        const { data } = await axios.get(`http://127.0.0.1:8000/sentence/`,
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