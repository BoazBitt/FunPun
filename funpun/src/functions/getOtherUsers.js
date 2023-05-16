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
                    userLevel: user.userLevel,
                    city: user.city,
                    id:user.user
                  }
            },);   
            return data     
    
    }
    catch (err) {
        console.log("Cant find other users!")
    }

//Cant Find Sentences!

}

export default getOtherUsers;