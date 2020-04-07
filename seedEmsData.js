var mongoose = require("mongoose");
var Venues   = require("./models/venues");
var Catering = require("./models/catering");
var Decorations   = require("./models/decorations");
var Comment   = require("./models/comment");

var venuesData = [
    {
        name: 'Aperture Room',
        image: 'http://thorntonsmith.ca/wp-content/uploads/2014/12/aperture-venue-11-650x625.jpg',
        description: 'Aperture Room is a stylish event space located on the third floor of The Thornton-Smith Building in downtown Toronto. The name is derived from one of the building’s most prominent tenants, Toronto Camera, which occupied all four floors in 1966. The space features original exposed brick walls, three magnificent skylights, hardwood floors, plaster ceilings, LED lighting throughout and a refined heritage flare. Aperture Room also offers built-in AV equipment including state-of-the-art screens, projectors and architectural lighting, lending itself to all types of social and corporate events',
        location: 'The Thornton-Smith Building, 340 Yonge Street, Toronto, ON, Canada, M5G 1H1',
        price: '5000 CAD',
        capacity: 120,
        category: 'Social and Corporate events',
        contactno: '(111) 222 3333',
        cateringAvailable: 'Yes',
        decorationAvailable: 'No'
    },
    {
        name: 'Archeo',
        image: 'https://res.cloudinary.com/scvr/image/upload/c_fill,dpr_auto,f_auto,g_auto,q_auto,w_576/v1/production/gallery_photos/images/000/012/904/original/Archeo_Interiors-35.jpg',
        description: 'Located just inside the north entrance of The Distillery District, during à la carte services we offer a carefully curated Italian inspired menu that highlights seasonally selected ingredients. Featuring a boutique wine list with over a dozen wines by the glass, Archeo is the perfect choice when you want to impress in comfort for business lunches, pre-theatre dinners, and family meals. Set in a repurposed carpentry shop, our high yellow pine ceilings, exposed brick walls and reclaimed timber bar and tables offer a perfect blend of contemporary style and historic tradition, creating a unique rustic elegance. Large scale photographs of on-site heritage architecture by artist Steven Evans are novel room adornments.',
        location: 'Archeo Toronto, 31 Trinity St, Toronto, Ontario M5A 3C4',
        price: '2000 CAD',
        capacity: 140,
        category: 'Ceremony seating, Holiday parties, Plated dinners, and Cocktail events',
        contactno: '(416) 815-9898',
        cateringAvailable: 'Yes',
        decorationAvailable: 'No'
    }
]

var cateringData = [
    {
        name: 'A La Carte Kitchen',
        image: 'http://www.alacartekitchen.ca/resources/10.29.2017-ALCK-Gala-Dinner137.jpg.opt1252x949o0%2C0s1252x949.jpg',
        description: "It gives us great pleasure to welcome you to the world of à la Carte. We are a premier events caterer providing a wide variety of services ready to meet your needs and exceed your expectations. Superior tastes, polished service, innovative design and an excellent atmosphere. With this goal in mind one of Toronto's first full-service, fine culinary caterers was established in 1981. While Her Majesty Queen Elizabeth II, every Canadian Prime Minister since Pierre Trudeau, Oprah, Elizabeth Taylor, and Karl Lagerfeld  have all been served by à la Carte, other notables also served include great grandmothers, special uncles, happy couples, and proud parents to name a few.",
        location: '2 Thorncliffe Park Dr, East York, ON M4H 1G9',
        price: '25',
        beverages: 'No',
        contactno: '(416) 971-4068'
    },
    {
        name: 'Food Dudes',
        image: 'https://x56-wpengine.netdna-ssl.com/wp-content/uploads/2017/01/Website-1-1.jpg',
        description: "Since joining forces over a decade ago, The Food Dudes have grown their once small, home-based operation into Toronto’s most revered, innovative and adaptive catering and food service company. Executive Chef Adrian Niman founded The Food Dudes in 2007 upon completing his intense training at the Michelin-starred Reads Hotel in Mallorca, Spain. Adrian then partnered with Creative Director Brent McClenahan, who specializes in bridging the gap between design strategy and the culinary arts. They added Chief Executive Officer Lindsay Klein soon after, built a world-class team of passionate professionals, and quickly distinguished themselves as industry leaders. The Food Dudes consistently raise the bar by anticipating and fulfilling the dynamic needs of the modern metropolitan client - a desire for fresh and local ingredients, sophisticated original fare, flexible budgeting plans - all while providing a memorable culinary experience. From catered affairs of all styles and sizes to food trucks, restaurants, fundraisers and signature food-driven event experiences, The Food Dudes are Toronto’s most trusted hospitality specialists and premier providers of all things edible.",
        location: '24 Carlaw Ave #2, Toronto, ON M4M 2R7',
        price: '40',
        beverages: 'Yes',
        contactno: '(647) 340 3833'
    }
]

var decorationsData = [
    {
        name: 'Babylon Decor',
        image: 'https://babylondecor.com/wp-content/uploads/2018/07/Weddong-Decoration-Toronto.jpg',
        description: "We are one of the GTA’s leading wedding flowers & wedding decor specialists. Our design styles range from traditional to modern day trendy & chic. Our team of passionate wedding decorators will work effortlessly to make your dream wedding come to life. We would be honored to be a part of your wedding day, and in return we promise your complete satisfaction. Babylon Décor understands that your wedding day is one of the most important days of your life; you have been dreaming of your wedding day for many years and it is the one day where everything must be perfect. We encourage you to come in for a no obligation consultation, where we will work together and combine our thoughts to create your dream wedding. We will discuss your wedding theme, your expectations and the complete ambiance for your event. During this process we will bring fourth innovative, fresh and thought provoking ideas on how we can make your event extra special. Unlimited consultations with our experienced designers will have you feeling confident in our abilities and your décor choices.",
        location: '51 Roysun Rd, Unit # 5, Woodbridge, ON L4L 8P9',
        price: '10000',
        contactno: '(416) 444 4400'
    },
    {
        name: 'Design Mantraa',
        image: 'https://d2wvwvig0d1mx7.cloudfront.net/data/org/18834/media/img/cache/1000x0/1916599_1000x0.jpg',
        description: "There are so many different decisions that need to be made when you’re planning a wedding. Trust us, we know all about them. Many would say that wedding décor is one of THE MOST crucial elements at any event and decorating these events to perfection tends to require a lot of attention to details. Brides these days are extremely good at finding amazing ideas in bridal magazines and on social media. Hiring a good designer will ensure that all your wonderful ideas are translated into a beautiful reality on your wedding day in a manner that is personal and best suited to both you and your partner. Design Mantraa is a full-service décor company that specialises weddings and coRporate events. We pride ourselves on working tremendously hard for each one of our clients, making the experience as personal as possible.",
        location: '428 Gibraltar Drive, Studio 10, Mississauga, Ontario',
        price: '15000',
        contactno: '(647) 998-7527'
    }
]

function seedEmsData() {

    // remove all comments
    Comment.remove({}, function(err){
        if(err){
            console.log(err);
        }
        console.log("removed all comments!");
    });     

    //Venues
    Venues.remove({}, function(err){
        if(err){
            console.log(err);
        }
        console.log("removed all venues!");
        // add venues
        venuesData.forEach(function(seed){
            Venues.create(seed, function(err, venue){
                if(err){
                    console.log(err)
                } else {
                    console.log("added a venue");
                    venue.save();
                }
            });
        
    });
});

    //Catering
    Catering.remove({}, function(err){
        if(err){
            console.log(err);
        }
        console.log("removed all catering entries!");
        // add catering
        cateringData.forEach(function(seed){
            Catering.create(seed, function(err, catering){
                if(err){
                    console.log(err)
                } else {
                    console.log("added an entry in catering");
                    catering.save();
                }
            });
        
    });
});

    //Venues
    Decorations.remove({}, function(err){
        if(err){
            console.log(err);
        }
        console.log("removed all decoration entries!");
        // add decoration entries
        decorationsData.forEach(function(seed){
            Decorations.create(seed, function(err, decoration){
                if(err){
                    console.log(err)
                } else {
                    console.log("added an entry in decoration");
                    decoration.save();
                }
            });
        
    });
});

}

module.exports = seedEmsData;