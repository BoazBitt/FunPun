import axios from "axios";
import { path } from './path'

const getAllMessages = async (sender,receiver) => {

    try {
        const { data } = await axios.get(`${path}/message/`,
            {
                headers: {
                    'Content-Type': 'application/json'
                },
                params: {
                    sender: sender,
                    receiver:receiver

                  }
            },);
        return data

    }
    catch (err) {
        console.log("Cant Find Sentences!")
    }



}

export default getAllMessages;