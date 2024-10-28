import bcrypt from 'bcryptjs';

const hashpassword = async(password : string) : Promise<{ salt: string; hashedPassword: string }> => {
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);
    return {salt : salt, hashedPassword : hashedPassword};
}

const comparepassword = async(password : string, hashedPassword : string) : Promise<boolean> => {
    const isMatch = await bcrypt.compare(password, hashedPassword);
    return isMatch;
}

export { hashpassword, comparepassword };