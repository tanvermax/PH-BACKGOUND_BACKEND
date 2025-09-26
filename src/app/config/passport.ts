// import  httpStatus from 'http-status-codes';
import passport from "passport"
import { Strategy as GoogleStrategy, Profile, VerifyCallback } from "passport-google-oauth20"
import { envVars } from "./env"
import { User } from "../modules/user/user.model";
import { Role } from "../modules/user/user.interface";
import { Strategy as LocalStrategy } from "passport-local";
import bcryptjs from "bcryptjs"
// import AppError from "./AppError";

passport.use(
    new LocalStrategy({
        usernameField: "email",
        passwordField: "password"
    }, async (email: string, password: string, done) => {
        try {
            const IsUserExit = await User.findOne({ email });

            if (!IsUserExit) {
                return done(null, false, { message: "User not found" });
            }

            // Check if user registered with Google but doesn't have password
            const googleAuthenticated = IsUserExit.auths.some(
                providerObject => providerObject.provider === "google"
            );
            
            if (googleAuthenticated && !IsUserExit.password) {
                return done(null, false, { 
                    message: "You authenticated with Google. To login with email/password, please set a password for your account." 
                });
            }

            const isPasswordMatch = await bcryptjs.compare(
                password as string,
                IsUserExit.password as string
            );

            if (!isPasswordMatch) {
                return done(null, false, { message: "Incorrect password" });
            }

            return done(null, IsUserExit);
        } catch (error) {
            console.log(error);
            return done(error);
        }
    })
);

passport.use(
    new GoogleStrategy(
        {
            clientID: envVars.GOOGLE_CLIENT_ID,
            clientSecret: envVars.GOOGLE_CLIENT_SECRET,
            callbackURL: envVars.GOOGLE_CALL_BACK_URL,
        }, async (
            accessToken: string, resrehToken: string, profile: Profile, done: VerifyCallback

        ) => {
        try {
            const email = profile.emails?.[0].value;
            if (!email) {
                return done(null, false, { message: "no email founde" })
            }
            let user = await User.findOne({ email });
            if (user) {
                user = await User.create({
                    email,
                    name: profile.displayName,
                    picture: profile.profileUrl,
                    role: Role.USER,
                    isVerified: true,
                    auths: [
                        {
                            provider: "google",
                            providerId: profile.id
                        }
                    ]
                })
            }
            return done(null, User)
        } catch (error) {

            console.log("GOole stategy Error", error);
            return done(error)
        }
    }
    )
)


// eslint-disable-next-line @typescript-eslint/no-explicit-any
passport.serializeUser((user: any, done: (err: any, id?: unknown) => void) => {
    done(null, user._id)
})

// eslint-disable-next-line @typescript-eslint/no-explicit-any
passport.deserializeUser(async (id: string, done: any) => {
    try {
        const user = await User.findById(id)
        done(null, user)
    } catch (error) {
        console.log(error);
        done(error)
    }
})