import Userservice, { CreateUserPayload, GetUserTokenPayload } from '../../services/user';

const queries = {
    getusertoken : async(parent : any, payload : GetUserTokenPayload)=>{
        return await Userservice.getusertoken(payload);
    },
    getcurrentloggedinuser : async(parent : any, parameters : any, context : any)=>{
        if(context && context.user){
            return context.user;
        }
        throw new Error("Not authenticated");
    }
}

const mutations = {
    createuser : async(parent : any, payload : CreateUserPayload)=>{
        return await Userservice.createuser(payload);
    }
}

export const resolvers = {queries, mutations};