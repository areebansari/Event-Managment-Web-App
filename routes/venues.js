var express = require("express");
var router  = express.Router();
var middleware = require("../middleware");
var request = require("request");
var Venues = require("../models/venues");
var Comment = require("../models/comment");

router.get('/', function(req, res) {
    Venues.find({}, function(err, venues) {
        if (err) {
            console.log(err);
        } else {
            //console.log("Venues")
            res.render('venues', { venues: venues });
        }
    });
});

router.get("/new", middleware.isLoggedIn, function(req, res){
    res.render("venues/new"); 
});

//SHOW - shows more info about a selected venue
router.get("/:id", function(req, res) {
    // find the campground with provided ID
    Venues.findById(req.params.id).populate("comments").exec(function(error, foundVenue){
        if(error){
            console.log(error);
        }else{
            //render show template with that venue
            res.render("venues/showvenue", {venue: foundVenue});
            
        }
    });    
});

//CREATE - add new venue to DB
router.post("/", middleware.isLoggedIn, function(req, res){
    var name = req.body.name;
    var image = req.body.image;
    var desc = req.body.description;
    var price = req.body.price;
    var loc = req.body.location;
    var cap = req.body.capacity;
    var cat = req.body.category;
    var con = req.body.contactno;
    var cater = req.body.cateringAvailable;
    var dec = req.body.decorationAvailable;
    var flag = false;
    if(name == "" || image == "" || desc == "" || price == "" || loc == "" || cap == "" || cat == "" || cater == "" || dec == "" || con == "") {
        console.log("Venue info not complete.");
        req.flash("error", "There cannot be an empty field!!");
        res.redirect("/venues/new");
    } else {
        flag = true;
        var newVenue = {name: name, image: image, description: desc, price: price, location: loc, capacity: cap, 
            category: cat, contactno: con, cateringAvailable: cater, decorationAvailable: dec}
        // Create a new venue and save to DB
        if(flag) {
            Venues.create(newVenue, function(err, newlyCreated){
                if(err){
                    console.log(err);
                } else {
                    newlyCreated.author.id = req.user._id;
                    newlyCreated.author.username = req.user.username;
                    newlyCreated.save();

                    //redirect back to venues page
                    console.log(newlyCreated);
                    res.redirect("/venues");
                }
            });
        }
    }
});

//NEW
router.get("/new", middleware.isLoggedIn, function(req, res){
    res.render("venues/new"); 
 });

//EDIT
router.get("/:id/edit", middleware.isLoggedIn, function(req, res){
    //find the venue with provided ID
    Venues.findById(req.params.id, function(err, foundVen){
        if(err){
            console.log(err);
        } else {
            //render show template with that venue
            res.render("venues/edit", {venue: foundVen});
        }
    });
});

//UPDATE
router.put("/:id", middleware.isLoggedIn, function(req, res){
    var newData = {name: req.body.name, 
        image: req.body.image, description: req.body.description, 
        contactno: req.body.contactno, price: req.body.price,
        location: req.body.location, capacity: req.body.capacity,
        cateringAvailable: req.body.cateringAvailable, decorationAvailable: req.body.decorationAvailable,
        category: req.body.category    
    };
    Venues.findByIdAndUpdate(req.params.id, {$set: newData}, function(err, venues){
        if(err){
            req.flash("error", err.message);
            res.redirect("back");
        } else {
            //console.log("HERE at edit");
            req.flash("success","Successfully Updated!");
            res.redirect("/venues/" + venues._id);
        }
    });
});

//DELETE
router.delete("/:id", middleware.isLoggedIn, function(req, res) {
    Venues.findByIdAndRemove(req.params.id, function(err, venues) {
      Comment.remove({
        _id: {
          $in: venues.comments
        }
      }, function(err, comments) {
        req.flash('error', venues.name + ' deleted!');
        res.redirect('/venues');
      })
    });
  });

//comment new
router.get("/:id/comments/new", middleware.isLoggedIn, function(req, res) {
    //console.log("MK : router.get(/:id/comments/new)");
    // find campground by id 
    Venues.findById(req.params.id, function(err, foundVenue){
        if(err){
            console.log(err);
        }else{
             // send that campground to new comment form template
            res.render("venues/comments/new", {venues: foundVenue});
        }
    });
   
});

router.post("/:id/comments", middleware.isLoggedIn, function(req, res){
    //console.log("MK : router.post(/:id/comments)");
    // lookup the venue using id
    Venues.findById(req.params.id, function(err, foundVenue) {
        if(err){
            console.log(err);
            res.redirect("/venues");
        }else{
            // create new comment
            Comment.create(req.body.comment, function(err, comment){
               if(err){
                   req.flash("error", "something went wrong");
                   console.log(err);
               }else{
                   // add username and id to the comment
                   comment.author.id = req.user._id;
                   comment.author.username = req.user.username;
                   //save comment
                   comment.save();
                   // connect new comment to the campgound
                   foundVenue.comments.push(comment);
                   foundVenue.save();  // saving the changes to the DB
                    // redirect to that show campground
                    //console.log("MK : ", comment);
                    req.flash("success", "Successfully added comment");
                    res.redirect('/venues/' + foundVenue._id);
               }
            });      
           
        }
    });
    
});

// EDIT Route
router.get("/:id/comments/:comment_id/edit", middleware.isLoggedIn, function(req, res){
    //console.log("MK : router.get(/:id/comments/:comment_id/edit)");
    Comment.findById(req.params.comment_id, function(err, foundComment) {
        if(err){
            console.log(err);
            res.redirect("back");
        }else{            
            res.render("venues/comments/edit", {venues_id: req.params.id, comment: foundComment});
        }
    });
});

//UPDATE Route
router.put("/:id/comments/:comment_id", middleware.isLoggedIn, function(req, res){
    // console.log("MK : router.put(/:id/comments/:comment_id)");
    Comment.findByIdAndUpdate(req.params.comment_id, req.body.comment, function(err, updatedComment){
        if(err){
            console.log(err);
            res.redirect("back");
        }else{
            res.redirect('/venues/' + req.params.id);
        }
    });
});

//COMMENT Destroy Route
router.delete("/:id/comments/:comment_id", middleware.isLoggedIn, function(req, res){
    //console.log("MK : router.delete(/:id/comments/:comment_id)");
    Comment.findByIdAndRemove(req.params.comment_id, function(err){
        if(err){
            console.log(err);
            res.redirect("/venues/" + req.params.id);
        }else{
            req.flash("success", "Successfully deleted the comment..");
            res.redirect("/venues/" + req.params.id);
        }
    });
});

module.exports = router;

