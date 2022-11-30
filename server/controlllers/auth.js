import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import User from '../models/User.js'


// Register user
export const register = async (req,res)=>{

    // appendin form data to database
    try{

        // destructuring data 
        const{
            username,
            email,
            phone,
            password,
        } = req
        .body;
        const salt = await bcrypt.genSalt();
        const
         passwordHash = await bcrypt.hash(password,salt
            )

            const user = new User
            ({
                username,
                email,
                phone,
                password,
            })
            const insertedUser = await user.save()
            // sending data to frontent when all ok
            res.status(201).json(insertedUser)
    }
    // catchin the error if any and send to frontent
    catch(err){
        console.log(err)
        res.status(500).json({error:err.message})
    }
}


 