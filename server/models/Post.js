import mongoose from 'mongoose';
 
const postSchema = mongoose.Schema(
    {
      
        createdBy:{
            type:mongoose.ObjectId,
            ref:'Users',
        },
        discription:String,
        filepath:String,
        like:{
            type:Map,
            of:Boolean,
        },
        Comments:{
            type:Array,
            default:[]
        } 
        
    },
    {timestamp:true}
)

const Post = mongoose.model("Post",postSchema)

export default Post;