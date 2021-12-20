import API from "../../shared/api";

export const sendErrorMail = (payload)=>{
    return new Promise((resolve,reject)=>{
        API.post(`//send-errors`, payload)
        .then(res=>{
            if(res && res.data.status === 1){
                resolve(res.data);
            }else{
                reject({message: "Something went wrong!"})
            }
        }).catch(error=>{
            if(error && error.data){
                reject(error.data);
            }else{
                reject({message: "Something went wrong!"})
            }
        })
    })
}