import httpStatus from 'http-status-codes';
import AppError from "../../config/AppError";
import { IAuthProvider, IUser, Role } from "./user.interface";
import { User } from "./user.model";
import bcryptjs from "bcryptjs"
import { JwtPayload } from 'jsonwebtoken';
import { envVars } from '../../config/env';


const createUser = async (paylod: Partial<IUser>) => {
    const { email, password, ...rest } = paylod;
    const isUserExit = await User.findOne({ email });

    if (isUserExit) {
        throw new AppError(httpStatus.BAD_REQUEST, "User alredy exit in")
    }

    const hashespassword = await bcryptjs.hash(password as string, 10)

    // const isPasswordMatch = await bcryptjs.compare(password as string, hashespassword)

    const authProvider: IAuthProvider = { provider: "creadentials", providerId: email as string }

    const user = await User.create({

        email, password: hashespassword,
        auths: [authProvider],
        ...rest,
    })

    return user;
}

const updateUser = async (userId: string, payload:Partial<IUser>,decodedToken:JwtPayload)=>{

    const ifUserExit = await User.findById(userId);
    if (!ifUserExit) {
            throw new AppError(httpStatus.FORBIDDEN,"user not found")
        
    }
    if (payload.role) {
        if (decodedToken.role=== Role.USER || decodedToken.role=== Role.GUIDE) {
            throw new AppError(httpStatus.FORBIDDEN,"you are nota authorized")
        }
        if (payload.role===Role.SUPER_ADMIN && decodedToken.role=== Role.ADMIN) {
            throw new AppError(httpStatus.FORBIDDEN,"you are nota authorized")
            
        }
    }
    if (payload.isActive || payload.isDeleted || payload.isVerified) {
        if (decodedToken.role === Role.USER|| decodedToken.role === Role.GUIDE) {
            throw new AppError(httpStatus.FORBIDDEN,"you are nota authorized")
            
        }
    }

    if (payload.password) {
        payload.password = await bcryptjs.hash(payload.password, envVars.BCRYPT_SALT_ROUND)
    }

    const newUpadteUser = await User.findByIdAndUpdate(userId,payload,{new:true, runValidators:true})

    return newUpadteUser

}

const getAllUser = async () => {
    const users = await User.find({});

    const totalUser = await User.countDocuments();
    return {
        data: users,
        meta: {
            total: totalUser
        }
    }
}


export const userServices = {
    createUser, getAllUser,updateUser
}