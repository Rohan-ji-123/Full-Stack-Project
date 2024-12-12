const express = require("express");
const router = express.Router();
const wrapAsync = require("../utils/wrapAsync.js");
const Listing = require("../models/listing.js");
const flash = require("flash");
const {isLoggedIn} = require("../middleware.js");
const {isOwner,validateListing} = require("../middleware.js");

const multer  = require('multer')
// const {storage} = require("../cloudConfig.js");
// const upload = multer( storage );



const listingControllers = require("../controllers/listings.js");


const storage = multer.diskStorage({
    destination: function (req, file, cb) {
       return cb(null, './uploads');
    },
    filename: function (req, file, cb) {
    //   const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9)
      return cb(null, `${Date.now()}-${file.originalname}`);
    }
});

const upload = multer({ storage });


router
    .route("/")
    .get(wrapAsync(listingControllers.index))
    .post(
        isLoggedIn,
        upload.single("listing[image]"),
        validateListing,
        wrapAsync(listingControllers.createListing)
    );

//New Route
router.get("/new",isLoggedIn,listingControllers.renderNewForm);

router
    .route("/:id")
    .get(wrapAsync(listingControllers.showListing))
    .put(isLoggedIn,isOwner, upload.single("listing[image]"),validateListing,wrapAsync(listingControllers.updateListing))
    .delete(isLoggedIn,isOwner,wrapAsync(listingControllers.deleteListing))


//Edit Route
router.get("/:id/edit",isLoggedIn,isOwner,wrapAsync(listingControllers.renderEditForm));


module.exports = router;