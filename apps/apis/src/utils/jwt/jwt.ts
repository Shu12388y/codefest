import jwt from "jsonwebtoken";

export class JWT{
    private jwtpayload:any;
    private jwtsecret:string;

    constructor(payload:any, secret:string){
        this.jwtpayload = payload;
        this.jwtsecret = secret;
    }

    public generate(){
        try {
            const data = jwt.sign(this.jwtpayload,this.jwtsecret,{
                expiresIn:'24Hr'
            });
            return data; 
        } catch (error) {
            throw new Error(String(error))
        }
    }




}