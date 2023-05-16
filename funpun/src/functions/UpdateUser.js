import axios from "axios";
import { path } from './path'



const UpdateUser = async (id,userData) =>{
    console.log(id)
    console.log(userData)
    
    try {
        const { data } = await axios.put(`${path}/account/${id}/`,
            {
                headers: {
                    'Content-Type': 'application/json'
                },
                userData: JSON.stringify(userData)
            },);   
            return data     
    
    }
    catch (err) {
        console.log("Cant Find Sentences!")
    }

}
export default UpdateUser;