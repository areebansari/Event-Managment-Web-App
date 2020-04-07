const mongoose = require('mongoose');
const VenueModel = require('../../models/venues');

describe('Venues Model Test', () => {

    // It's just so easy to connect to the MongoDB Memory Server 
    // By using mongoose.connect
    beforeAll(async () => {
        await mongoose.connect(global.__MONGO_URI__, { useNewUrlParser: "true", useCreateIndex: "true" }, (err) => {
            if (err) {
                console.error(err);
                process.exit(1);
            }
        });
    });

    afterAll(async () => {
        await mongoose.connection.close();
      });

    test('CreateAndSaveVenue', async () => {
        const venueData =  { name: 'Brighton Convention and Event Centre', image: 'https://eventective-media.azureedge.net/2235051_lg.jpg',
                description: 'Brighton Convention and Event Centre is a beautiful North East Toronto destination for weddings, banquets and business events. With 16,627 square feet on 3.25 acres of landscaped grounds, the elegantly decorated we offer a world of possibilities for your personal and business special event needs. Our experienced, professional staff will ensure you receive truly personalized service, giving your guests the attention that they deserve. From your first visit to our hall until the end of your wedding celebration, you will love all we have to offer. We offer beautifully appointed bridal suites, large lobby, wheelchair access to halls and washrooms and a gorgeous outdoor patio that can be used for small ceremonies, weather permitting. There are indoor areas for photo you’ll always treasure.', 
                location: '2155 McNicoll Ave, Scarborough, ON M1V 5P1', price: '5000',
                capacity: 1000, category: 'Weddings, banquets and business events.',
                contactno: '416-299-0077', cateringAvailable: 'Yes', decorationAvailable: 'Yes'
            };
        const validVenue = new VenueModel(venueData);
        const savedVenue = await validVenue.save();
        // Object Id should be defined when successfully saved to MongoDB.
        expect(savedVenue.name).toBe(venueData.name);
        expect(savedVenue.image).toBe(venueData.image);   
        expect(savedVenue.description).toBe(venueData.description);   
        expect(savedVenue.location).toBe(venueData.location);        
        expect(savedVenue.price).toBe(venueData.price);
        expect(savedVenue.capacity).toBe(venueData.capacity);
        expect(savedVenue.category).toBe(venueData.category);
        expect(savedVenue.contactno).toBe(venueData.contactno);
        expect(savedVenue.cateringAvailable).toBe(venueData.cateringAvailable);
        expect(savedVenue.decorationAvailable).toBe(venueData.decorationAvailable);

    });

    // Test Schema is working!!!
    // You shouldn't be able to add in any field that isn't defined in the schema
    test('FieldNotDefinedInSchema', async () => {
        const venueData =  { name: 'Brighton Convention and Event Centre', image: 'https://eventective-media.azureedge.net/2235051_lg.jpg',
        description: 'Brighton Convention and Event Centre is a beautiful North East Toronto destination for weddings, banquets and business events. With 16,627 square feet on 3.25 acres of landscaped grounds, the elegantly decorated we offer a world of possibilities for your personal and business special event needs. Our experienced, professional staff will ensure you receive truly personalized service, giving your guests the attention that they deserve. From your first visit to our hall until the end of your wedding celebration, you will love all we have to offer. We offer beautifully appointed bridal suites, large lobby, wheelchair access to halls and washrooms and a gorgeous outdoor patio that can be used for small ceremonies, weather permitting. There are indoor areas for photo you’ll always treasure.', 
        location: '2155 McNicoll Ave, Scarborough, ON M1V 5P1', price: '5000',
        capacity: 1000, category: 'Weddings, banquets and business events.',
        contactno: '416-299-0077', cateringAvailable: 'Yes', decorationAvailable: 'Yes', rating: 'very good'};

        const validVenue = new VenueModel(venueData);
        const savedVenue = await validVenue.save();
        // Object Id should be defined when successfully saved to MongoDB.
        expect(savedVenue.name).toBe(venueData.name);
        expect(savedVenue.image).toBe(venueData.image);   
        expect(savedVenue.description).toBe(venueData.description);   
        expect(savedVenue.location).toBe(venueData.location);        
        expect(savedVenue.price).toBe(venueData.price);
        expect(savedVenue.capacity).toBe(venueData.capacity);
        expect(savedVenue.category).toBe(venueData.category);
        expect(savedVenue.contactno).toBe(venueData.contactno);
        expect(savedVenue.cateringAvailable).toBe(venueData.cateringAvailable);
        expect(savedVenue.decorationAvailable).toBe(venueData.decorationAvailable);
        expect(savedVenue.rating).toBeUndefined();
    });

    // Test Validation is working!!!
    test('MandatoryFieldNotProvided', async () => {
        const venueDataWithoutReqField = new VenueModel({image: 'https://eventective-media.azureedge.net/2235051_lg.jpg',
        description: 'Brighton Convention and Event Centre is a beautiful North East Toronto destination for weddings, banquets and business events. With 16,627 square feet on 3.25 acres of landscaped grounds, the elegantly decorated we offer a world of possibilities for your personal and business special event needs. Our experienced, professional staff will ensure you receive truly personalized service, giving your guests the attention that they deserve. From your first visit to our hall until the end of your wedding celebration, you will love all we have to offer. We offer beautifully appointed bridal suites, large lobby, wheelchair access to halls and washrooms and a gorgeous outdoor patio that can be used for small ceremonies, weather permitting. There are indoor areas for photo you’ll always treasure.', 
        location: '2155 McNicoll Ave, Scarborough, ON M1V 5P1', price: '5000',
        capacity: '1000', category: 'Weddings, banquets and business events.',
        contactno: '416-299-0077', cateringAvailable: 'Yes', decorationAvailable: 'Yes'});
        let err;
        try {
            const savedVenueWithoutReqField = await venueDataWithoutReqField.save();
            error = savedVenueWithoutReqField;
            //console.log(error);
        } catch (error) {
            err = error;
            //console.log(err);
        }
        expect(err).toBeInstanceOf(mongoose.Error.ValidationError);
        expect(err.errors.name).toBeDefined();
    });
})

