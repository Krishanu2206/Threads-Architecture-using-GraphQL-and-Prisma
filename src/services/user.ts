import prisma from "../lib/prismaclient";
import { comparepassword, hashpassword } from "../helpers/passwordmanager";
import { getjwttoken } from "../helpers/jwttoken";

export interface CreateUserPayload {
    firstname : string;
    lastname : string;
    email : string;
    password : string
}

export interface GetUserTokenPayload {
    email : string;
    password : string;
}

class Userservice{
    public static async createuser(payload : CreateUserPayload){
        const {firstname, lastname, email, password} = payload;
        const {salt, hashedPassword} = await hashpassword(password);
        const createduser = await prisma.user.create({
            data : {
                firstname : firstname,
                lastname : lastname,
                email : email,
                password : hashedPassword,
                salt : salt
            }
        })
        console.log(`User created: ${firstname} ${lastname}, email: ${email}`);
        return createduser.id;
    }

    public static async getusertoken(payload : GetUserTokenPayload){
        const {email, password} = payload;
        const existinguser = await prisma.user.findUnique({
            where:  {
                email : email
            }
        });
        if(!existinguser){
            return "Invalid credentials";
        }
        const hashedPassword = existinguser.password;
        const isMatch = await comparepassword(password, hashedPassword);
        if(!isMatch){
            return "Invalid credentials"
        }
        const token = await getjwttoken(existinguser.id);
        return token;
    }
}

export default Userservice;