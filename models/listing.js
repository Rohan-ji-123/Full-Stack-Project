const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const Review = require("./review.js");


const listingSchema = new Schema({
    title:{
        type:String,
        required : true,
    },
    description : String,
    image:{
        // type:String,
        // default : 
        //     "https://4.bp.blogspot.com/-JWgpNkxAXeI/WRKfLDUPSRI/AAAAAAABBf4/ZPKw1x_sPXoad7uOQgsQp19rV2udrsTxgCLcB/s1600/awesome-home-design-contemporary.jpg",
        // set:(v) => 
        //     v === "" 
        //     ? "https://4.bp.blogspot.com/-JWgpNkxAXeI/WRKfLDUPSRI/AAAAAAABBf4/ZPKw1x_sPXoad7uOQgsQp19rV2udrsTxgCLcB/s1600/awesome-home-design-contemporary.jpg" 
        //     : v ,
        url : String,
        filename : String,
    },
    price:Number,
    location : String,
    country : String,
    reviews :[
        {
            type: Schema.Types.ObjectId,
            ref : "Review",
        }
    ],
    owner:{
        type : Schema.Types.ObjectId,
        ref : " User",
    },
});

listingSchema.post("findOneAndDelete",async(listing) =>{
    if(listing){
        await Review.deleteMany({_id : {$in : listing.reviews}})
    }
});

const Listing = mongoose.model("Listing",listingSchema);

module.exports = Listing;