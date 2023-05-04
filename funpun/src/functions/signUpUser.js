import axios from "axios";


const signUpUser = async (signUpData) => {
    console.log("in function")
    console.log(signUpData)
    console.log(JSON.stringify(signUpData));
    const jsonfile = JSON.stringify(signUpData);
    console.log(jsonfile)
    
    try {
        const { data } = await axios.post('http://127.0.0.1:8000/signup',
            {
                headers: {
                    'Content-Type': 'application/json',
                },
                data: jsonfile
       

            },);
        alert("Account Created")
        return { data }
    }
    catch (err) {
        alert(err)
    }



}

export default signUpUser;