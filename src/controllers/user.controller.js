import { asyncHandler} from "../utils/asyncHandler.js";
import {ApiError} from "../utils/ApiError.js";
import {User} from "../models/user.model.js";
import {uploadonCloudinary} from "../utils/cloudinary.js"
import { ApiResponse } from "../utils/ApiResponse.js";
const registerUser=asyncHandler(async(req,res)=>{
    // take user detail from frontend
    // validate user details
    // check if user already exists:username,email
    //check for image check for avatat
    //upload them to cloudinary
    // create user object-create entry in db
    // remove password and refresh token field from response
    // check for user creation
    // return response

const{fullname,email,username,password}=req.body

if(fullname===""){
    throw new ApiError(400,"fullname is required")
}
if(email===""){
    throw new ApiError(400,"email is required")
}
if(username===""){
    throw new ApiError(400,"username is required")
}
if(password===""){
    throw new ApiError(400,"password is required")
}
const existeduser=await User.findOne({
    $or:[{username},{email}]
})
if(existeduser){
    throw new ApiError(400,"user already exists")
}
const avatarlocalpath=req.files?.avatar[0]?.path;
//const coverimagelocalpath=req.files?.coverImage[0]?.path;
let coverimagelocalpath;
if(req.files && Array.isArray(req.files.coverImage)&& req.files.coverImage.length>0){
    coverimagelocalpath=req.files.coverImage[0].path
}
if(!avatarlocalpath){
    throw new ApiError(400,"avatar is required")
}
 const avatar=await uploadonCloudinary(avatarlocalpath)
 const coverImage=await uploadonCloudinary(coverimagelocalpath)

 if(!avatar){
    throw new ApiError(400,"avatar is required")
 }
 const user=await User.create({
    fullname,
    avatar:avatar.url,
    coverImage:coverImage?.url || "",
    email,
    password,
    username:username.toLowerCase()

    
 })
 const createduser=await User.findById(user._id).select(
    "-password -refreshToken"
 )
 if(!createduser){
    throw new ApiError(500,"something went wrong")
 }
 return res.status(201).json(
    new ApiResponse(200,createduser,"user registred successfully")
 )



})
export { registerUser}