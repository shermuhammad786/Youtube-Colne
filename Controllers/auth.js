import mongoose from "mongoose"
import User from "../Models/Users.js"
import bcrypt from "bcryptjs"
import Users from "../Models/Users.js";
import { createError } from "../error.js";
import jwt from "jsonwebtoken"
// import Cookie from 'universal-cookie';
// import { ConnectionPoolClosedEvent } from "mongodb";



export const signup = async (req, res, next) => {

    try {
        var salt = bcrypt.genSaltSync(10);
        var hash = bcrypt.hashSync(req.body.password, salt);
        const newUser = new User({ ...req.body, password: hash })

        const savedUser = await newUser.save()
        if (savedUser) {
            return res.status(200).send("SignUp successfully diverting you to SingIn page")
        } else {
            res.josn("not singnup")
        }

    } catch (err) {
        next(err, "error=====")
    }
}

export const singin = async (req, res, next) => {
    try {
        const findUser = await Users.findOne({ username: req.body.username });
        if (!findUser) return next(createError(404, "user not found!"))
        // console.log(findUser, "===>>>>>   find user")  
        const isCorrect = await bcrypt.compare(req.body.password, findUser.password)
        if (!isCorrect) return next(createError(400, "wrong credentials"))
        // console.log(isCorrect, "===>>> is correct")


        const token = jwt.sign({ id: findUser._id }, process.env.JWT)
        // console.log("===>>>>  ", process.env.JWT)
        // console.log("====>>>>", token)
        const { password, ...others } = findUser._doc

        res.cookie("myToken", token, {
            httpOnly: true,
        }).status(200).json(others)

    } catch (err) {
        next(err)
    }
}
// export const setCookies = async (req, res, next) => {
//     try {
//         const findUser = await Users.findOne({ username: req.body.username });
//         if (!findUser) return next(createError(404, "user not found!"))
//         // console.log(findUser, "===>>>>>   find user")  
//         const isCorrect = await bcrypt.compare(req.body.password, findUser.password)

//         if (!isCorrect) return next(createError(400, "wrong credentials"))


//         const token = jwt.sign({ id: findUser._id }, process.env.JWT)
//         res.status(200).json({
//             status: true,
//             token: token
//         })
//     } catch (error) {
//         next(createError(404, "cookie not found"))
//     }
// }

export const googleAuth = async (req, res, next) => {

    try {
        // const cookies = new Cookies()
        const user = await Users.findOne({ email: req.body.email });
        if (user) {
            // const token = jwt.sign({ id: user._id }, process.env.JWT)

            // cookies.set("access_token", token);

            // res.status(200).json(user)
        } else {
            // const cookies = new Cookies()
            const newUser = new Users({
                ...req.body,
                fromGoogle: true
            })
            const savedUser = await newUser.save();
            // const token = jwt.sign({ id: savedUser._id }, process.env.JWT)
            // cookies.set("access_token", `ooehfioawe909u3${Date.now()}hdsf89y39`);

            // res.status(200).json(savedUser)
        }
    } catch (error) {
        next(error)
    }
}