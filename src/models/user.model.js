import mongoose ,{Schema} from 'mongoose';
im
const userSchema=new Schema(
    {
        username:{
            type:String,
            required:true,
            unique:true,
            lowercase:true,
            index:true,
            trim:true

        },
        email:{
            type:String,
            required:true,
            unique:true,
            lowercase:true,
            
            trim:true

        },
        fullname:{
            type:String,
            required:true,
            unique:true,
            trim:true,
            index:true

        },
        avatar:{
            type:String,
            required:true
        },
        coverImage:{
            type:String

        },
        watchHistory:
        [{
            type:Schema.Types.ObjectId,
            ref:"video"


        }
    ],
    password:{
        type:String,
        required:[true,'password is required']
    },
    refreshToken:{
        type:String
    }



    },
    {
        timestamps:true

    }
)

export const User=mongoose.model("User",userSchema)