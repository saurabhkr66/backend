import {v2} from 'cloudinary'

import fs from 'fs'


cloudinary.config({
    cloud_name:process.env.CLOUDINARY_CLOUD_NAME,
    api_key:process.env.CLOUDINARY_API_KEY,
    api_secret:process.env.CLOUDINARY_SECRET_KEY
    
})

const uploadonCloudinary=async(localFilepath)=>{
    try {
        if(!localFilepath) return null
       const response= await cloudinary.uploader.upload(localFilepath,{
            resource_type:"auto"
        })
        console.log("file has been uploaded on cloudinary",response.url);
        return response
    } catch (error) {
        fs.unlinkSync(localFilepath)
        return null;
    }
}
export {uploadonCloudinary}