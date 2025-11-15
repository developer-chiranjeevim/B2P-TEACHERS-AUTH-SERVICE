import jwt from "jsonwebtoken";

const generateToken = async(id) => {


    const token =  jwt.sign({ id }, process.env.JWT_SECRET_KEY, {
        expiresIn: process.env.JWT_EXPIERS_IN
    });

    

    return token;
};


export {generateToken}

