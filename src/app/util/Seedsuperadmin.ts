import { IAuthProvider } from './../modules/user/user.interface';
import bcryptjs from 'bcryptjs';
import { envVars } from './../config/env';
import { User } from "../modules/user/user.model"
import { IUser, Role } from '../modules/user/user.interface';

export const seedSuperAdmin = async () => {
    try {
        const isSuperAdminExit = await User.findOne({ email: envVars.SUPER_ADMIN_EMAIL })

        if (isSuperAdminExit) {
            console.log("SUPER ADMIN EXITED");
            return;
        }
        const hashpasword = await bcryptjs.hash(envVars.SUPER_ADMIN_PASSWORD, Number(envVars.BCRYPT_SALT_ROUND));

        const authProvider: IAuthProvider = {
            provider: "creadentials",
            providerId: envVars.SUPER_ADMIN_EMAIL
        }
        const payload: IUser = {
            name: "Super Admin",
            role: Role.SUPER_ADMIN,
            email: envVars.SUPER_ADMIN_EMAIL,
            password: hashpasword,
            isVerified: true,
            auths: [authProvider]
        }
        const superAdmin = await User.create(payload);
        console.log("super add min created");
        console.log(superAdmin)
    } catch (error) {
        console.log(error)
    }
}