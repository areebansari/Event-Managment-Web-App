var mongoose = require('mongoose');
var csv = require('fast-csv');
var Venues   = require("./models/venues");
var Catering = require("./models/catering");
var Decorations   = require("./models/decorations");
var Comment   = require("./models/comment");
var User      = require("./models/user")

var csvHeaders = {
    VENUES: {
        headers: ['name', 'image', 'price', 'description', 'location', 
            'capacity', 'category', 'contactno', 'cateringAvailable', 'decorationAvailable']
    },
    CATERING: {
        headers: ['name', 'image', 'description', 'location', 'price', 'beverages', 'contactno']
    },    
    DECORATIONS: {
        headers: ['name', 'image', 'description', 'location', 'price', 'contactno']
    }
};

function userRegistration() {
    // remove all users
    User.deleteMany({}, function(err){
        if(err){
            console.log(err);
        }
        // console.log("removed all users");

        // create admin user
        User.register({username: "admin"}, "1234", function(err, user){
            if(err) {
                console.log(err);
            }
            else {
                user.save(function (err) {
                    if (err)
                        console.log(err);
                    else
                    console.log("created admin account")
                });

                // Add sample comments to business
                addComment();  
            }
        });         
    });        
}

var cmntData = [{text: "This decorator is best in the city"},
                {text: "This venue is suitable for all kinds of events."},
                {text: "Tasty food with fair price."}];

function addComment() {

    // remove all comments
    Comment.deleteMany({}, function(err){
        if(err){
            console.log(err);
        }
        // console.log("removed all comments!");    

        User.find({}, function(err, foundUsers){
            foundUsers.map(foundUser => {        
            // console.log("MK", foundUser)

            Decorations.find({}, function(err, foundDecos){
                foundDecos.map(foundDeco => {
            
                    foundDeco.author.id = foundUser._id;
                    foundDeco.author.username = foundUser.username;                

                    // create new comment
                    Comment.create(cmntData[0], function(err, comment){
                        if(err){
                            req.flash("error", "something went wrong");
                            console.log(err);
                        }else{

                            // add username and id to the comment
                            comment.author.id = foundUser._id;
                            comment.author.username = foundUser.username;
                            //save comment
                            comment.save();
                            // connect new comment to the campgound
                            foundDeco.comments.push(comment);
                            foundDeco.save();  // saving the changes to the DB
                        }
                    });
                });
            });
            
            Venues.find({}, function(err, foundVenues){
                foundVenues.map(foundVenue => {

                    foundVenue.author.id = foundUser._id;
                    foundVenue.author.username = foundUser.username; 

                    // create new comment
                    Comment.create(cmntData[1], function(err, comment){
                        if(err){
                            req.flash("error", "something went wrong");
                            console.log(err);
                        }else{

                            // add username and id to the comment
                            comment.author.id = foundUser._id;
                            comment.author.username = foundUser.username;
                            //save comment
                            comment.save();
                            // connect new comment to the campgound
                            foundVenue.comments.push(comment);
                            foundVenue.save();  // saving the changes to the DB
                        }
                    });
                });
            });
            
            Catering.find({}, function(err, foundCatering){
                foundCatering.map(foundCateror => {

                    foundCateror.author.id = foundUser._id;
                    foundCateror.author.username = foundUser.username; 

                    // create new comment
                    Comment.create(cmntData[2], function(err, comment){
                        if(err){
                            req.flash("error", "something went wrong");
                            console.log(err);
                        }else{

                            // add username and id to the comment
                            comment.author.id = foundUser._id;
                            comment.author.username = foundUser.username;
                            //save comment
                            comment.save();
                            // connect new comment to the campgound
                            foundCateror.comments.push(comment);
                            foundCateror.save();  // saving the changes to the DB
                        }
                    });
                });
            });         
        });
    });
});

}

function importCSVFile(filePath, modelSchema, modelName) {
    
    // Remove existing entries
    modelSchema.deleteMany({}, function(err){
        if(err){
            console.log(err);
        }
        //console.log("removed all " + modelName);

        // Populate data from CSV  
        csv
            .parseFile(filePath, {headers: true, ignoreEmpty: true})
            .on('data', function(data) {

                //console.log(data);
                
                var Obj = mongoose.model(modelName);
                var obj = new Obj();

                Object.keys(data).forEach(function(key) {
                    var val = data[key];
                    
                    //console.log(key);
                    //console.log(val);

                    if (val !== '')
                        obj.set(key, val);
                });

                obj.save(function (err) {
                    if (err)
                        console.log(err);
                });
                
            })
            .on('end', function() {
                console.log(modelName + " data loaded");
            });          
    });      
}

function seedEmsDataCsv() {

    // Import CSV to MongoDB
    importCSVFile(__dirname + '/dbdata/venues.csv', Venues, 'venues');
    importCSVFile(__dirname + '/dbdata/catering.csv', Catering, 'catering');
    importCSVFile(__dirname + '/dbdata/decorations.csv', Decorations, 'decorations');

    // Register admin and add admin comment to business
    userRegistration();     
}

module.exports = seedEmsDataCsv;