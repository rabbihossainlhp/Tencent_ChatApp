const Api_base_url = import.meta.env.VITE_REACT_APP_URL;

export const loginAndGenerateUserSig = async(userId,userName) =>{
    try{
        const res = fetch(`${Api_base_url}/user`,{
            method:'POST',
            headers:{
                "Content-Type":"application/json"
            },
            body:JSON.stringify(userId,userName),
        })

        const data = await res.json();

        if(!res.ok){
            throw new Error(data.err || 'login failed!!'); 
        }

        return data;
    }   
    catch(err){
        throw new Error(err);
    }
}