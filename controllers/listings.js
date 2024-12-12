const { model } = require("mongoose");
const Listing = require("../models/listing");
// const mbxGeocoding = require('@mapbox/mapbox-sdk/services/geocoding');

module.exports.index = async(req,res)=>{
    const allListings =await Listing.find({});
    res.render("listings/index.ejs",{allListings})
};

module.exports.renderNewForm = (req,res)=>{
    res.render("listings/new.ejs");
};

module.exports.showListing = async(req,res)=>{
    let {id} = req.params;
    const listing = await Listing.findById(id)
        .populate({
            path :"reviews",
            populate : {
                path : "author",
            }
        });
    if(!listing){
        req.flash("error","Listings you requested does not exits");
        res.redirect("/listings");
    }
    console.log(listing);
    res.render("listings/show.ejs",{listing});
};

module.exports.createListing = async(req,res,next)=>{
    let url = req.file.path;
    let filename = req.file.filename;

    let newListing = new Listing( req.body.listing);
    newListing.owner = req.user._id;
    newListing.image = {url,filename};
    await newListing.save();
    req.flash("success","New Liatings Created");
    res.redirect("/listings");
};

module.exports.renderEditForm =  async(req,res,next)=>{
    // console.log("Rohan");
    let {id} = req.params;
    const listing = await Listing.findById(id);
    if(!listing){
        req.flash("error","Listings you requested does not exits");
        res.redirect("/listings")
    }
    res.render("listings/edit.ejs",{listing});
};


module.exports.updateListing = async (req,res)=>{
    if(!req.body.listing){
        throw new ExpressError(400,"send valid data for listing");
    }
    let{id}= req.params;
    let listing =  await Listing.findByIdAndUpdate(id,{...req.body.listing});

    if(typeof req.file !== "undefined"){       
        let url = req.file.path;
        let filename = req.file.filename;
        listing.image = {url , filename};
        await listing.save();
    }
    // await listing.save();

    req.flash("success"," Listings Updated ");
    res.redirect(`/listings/${id}`);
};

module.exports.deleteListing = async(req,res)=>{
    let {id} = req.params;
    let deletedListings = await Listing.findByIdAndDelete(id);
    console.log(deletedListings);
    req.flash("success"," Listings Deleted");
    res.redirect("/listings");
};