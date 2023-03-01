import express from 'express'
import { signIn, signUp, forgotPassword, updateUser, refresh, logout, activateUser, resetPassword } from '../controllers/user.js'
import {body} from "express-validator/check/index.js"
import UserModel from '../models/UserModel.js'
import auth from '../middleware/auth.js'

const router = express.Router()

router.post('/signin',[
    body('email')
      .isEmail()
      .withMessage('Please enter a valid email address.')
      .normalizeEmail(),
    body('password', 'Password has to be valid.')
      .isLength({ min: 5 })
      .isAlphanumeric()
      .trim()
  ], signIn)
router.post('/signup',[
    body('email').isEmail().withMessage('Please enter a valid email').custom((value,{req})=>{
        return UserModel.findOne({email:value}).then(userDoc=>{
            if(userDoc) return Promise.reject("E-Mail exists already, please pick a different one")
        })
    }).normalizeEmail(),
    body('phone').isMobilePhone().withMessage('Please enter a valid phone').custom((value,{req})=>{
        return UserModel.findOne({phone:value}).then(userDoc=>{
            if(userDoc) return Promise.reject("Phone exists already, please pick a different one")
        })
    }),
    body('password','Please enter a password with only numbers and text at least 5 characters').isLength({min:5}).isAlphanumeric().trim(),
    body('confirmPassword').trim().custom((value,{req})=>{
        if(value!==req.body.password){
            throw new Error('Password have to match')
        }
        return true
    })
], signUp)
router.get('/refresh', refresh)
router.post('/logout',logout)

router.patch('/:id',[auth,body('email').isEmail().withMessage('Please enter a valid email').custom((value,{req})=>{
    return UserModel.findOne({email:value}).then(userDoc=>{
        if(userDoc && req.params.id!=userDoc._id) return Promise.reject("E-Mail exists already, please pick a different one")
    })
}).normalizeEmail(),
body('phone').isMobilePhone().withMessage('Please enter a valid phone').custom((value,{req})=>{
    return UserModel.findOne({phone:value}).then(userDoc=>{
        if(userDoc && req.params.id!=userDoc._id) return Promise.reject("Phone exists already, please pick a different one")
    })
}),
body('password','Please enter a password with only numbers and text at least 5 characters').isLength({min:5}).isAlphanumeric().trim(),
body('confirmPassword').trim().custom((value,{req})=>{
    if(value!==req.body.password){
        throw new Error('Password have to match')
    }
    return true
})],updateUser)

router.post('/forgot',body('email').isEmail().withMessage('Please enter a valid email').custom((value,{req})=>{
    return UserModel.findOne({email:value}).then(userDoc=>{
        if(!userDoc) return Promise.reject("E-Mail doesn't exists, please pick a different one")
    })
}) ,forgotPassword)
router.post('/verify/:userId/:token',activateUser)
router.patch('/reset/:id',[body('password','Please enter a password with only numbers and text at least 5 characters').isLength({min:5}).isAlphanumeric().trim(),
body('confirmPassword').trim().custom((value,{req})=>{
    if(value!==req.body.password){
        throw new Error('Password have to match')
    }
    return true
})],resetPassword)
/*router.get('/deneme',async(req,res)=>{
    const _id='63f7c279a950e784f893d8e4'
    try{
        const user=await UserModel.findByIdAndUpdate(_id,{name:'Cihan32'},{new:true})
        res.json({user})
    }catch(error){
        res.status(401).json({message: error.message})
    }
    
})*/

export default router