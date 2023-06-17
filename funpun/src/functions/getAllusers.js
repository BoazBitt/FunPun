import axios from "axios";
import { path } from './path'

const getOtherUsers = async (user) => {

    try {
        const { data } = await axios.get(`${path}/account/`,
            {
                headers: {
                    'Content-Type': 'application/json'
                },
                params: {

                  }
            },);   

            return data     
    
    }
    catch (err) {
    }

//Cant Find Sentences!

}

export default getOtherUsers;