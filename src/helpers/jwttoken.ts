import jwt,{ JwtPayload } from 'jsonwebtoken';
import prisma from '../lib/prismaclient';

const getjwttoken = async(userid :string) : Promise<string> => {
    const user = await prisma.user.findUnique({
        where : {
            id : userid,
        }
    })
    const tokendata = {
        id : user.id,
        username : user.firstname + " " + user.lastname,
        email : user.email,
        profileimageurl : user.profileimageurl
    }
    const token = await jwt.sign(tokendata, process.env.JWT_SECRET!, { expiresIn : '1d' });
    return token;
}

const decodejwttoken = async(token : string) : Promise<object> => {
    const decoded = await jwt.verify(token, process.env.JWT_SECRET!) as JwtPayload;
    return decoded;
}

export { getjwttoken, decodejwttoken };