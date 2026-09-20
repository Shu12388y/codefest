import { api } from "../apis/api"

export const signupHandler = async({
    email,
    password
}:{
    email:string,
    password:string
})=>{
    try {
        const response = await api.post(`/api/v1/admin/signup`,{
            email,
            password
        });
        if(response.status != 201){
            return response.data;
        }
        return response.data;
    } catch (error) {
        throw new Error(String(error))
    }

}