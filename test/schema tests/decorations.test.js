const mongoose = require('mongoose');
const DecorationModel = require('../../models/decorations');

describe('Decorations Model Test', () => {

    // It's just so easy to connect to the MongoDB Memory Server 
    // By using mongoose.connect
    beforeAll(async () => {
        await mongoose.connect(global.__MONGO_URI__, { useNewUrlParser: true, useCreateIndex: true }, (err) => {
            if (err) {
                console.error(err);
                process.exit(1);
            }
        });
    });

    afterAll(async () => {
        await mongoose.connection.close();
      });

    test('CreateAndSaveDecorationData', async () => {
        const decorationData = { name: 'Queen Wedding Decor', image: 'https://www.queenweddingdecor.com/wp-content/uploads/2019/11/backdrop_2019_09_01.jpg',
        description: 'We are one of the Toronto wedding flowers & wedding decor specialists. Our design styles range from traditional to modern day trendy. We work closely with you and assist you with choosing the right type of wedding flowers, chair covers, centerpieces and backdrops for your wedding', location: '85 Midwest Rd, Scarborough, ON M1P 3A6', price: '1000', 
        contactno: '647-631-2227'};
        const validDecorationData = new DecorationModel(decorationData);
        const savedDecorationData = await validDecorationData.save();
        // Object Id should be defined when successfully saved to MongoDB.
        expect(savedDecorationData.name).toBe(decorationData.name);
        expect(savedDecorationData.image).toBe(decorationData.image);   
        expect(savedDecorationData.description).toBe(decorationData.description);   
        expect(savedDecorationData.location).toBe(decorationData.location);        
        expect(savedDecorationData.price).toBe(decorationData.price);
        expect(savedDecorationData.contactno).toBe(decorationData.contactno);
    });

    // Test Schema is working!!!
    // You shouldn't be able to add in any field that isn't defined in the schema
    test('FieldNotDefinedInSchema', async () => {
        const decorationData = { name: 'Queen Wedding Decor', image: 'https://www.queenweddingdecor.com/wp-content/uploads/2019/11/backdrop_2019_09_01.jpg',
        description: 'We are one of the Toronto wedding flowers & wedding decor specialists. Our design styles range from traditional to modern day trendy. We work closely with you and assist you with choosing the right type of wedding flowers, chair covers, centerpieces and backdrops for your wedding', location: '85 Midwest Rd, Scarborough, ON M1P 3A6', price: '1000', 
        contactno: '647-631-2227',
        rating: 'very good'};
        const validDecorationData = new DecorationModel(decorationData);
        const savedDecorationData = await validDecorationData.save();
        // Object Id should be defined when successfully saved to MongoDB.
        expect(savedDecorationData.name).toBe(decorationData.name);
        expect(savedDecorationData.image).toBe(decorationData.image);   
        expect(savedDecorationData.description).toBe(decorationData.description);   
        expect(savedDecorationData.location).toBe(decorationData.location);        
        expect(savedDecorationData.price).toBe(decorationData.price);
        expect(savedDecorationData.contactno).toBe(decorationData.contactno);
        expect(savedDecorationData.rating).toBeUndefined();
    });

    // Test Validation is working!!!
    test('MandatoryFieldNotProvided', async () => {
        const userWithoutRequiredField = new DecorationModel({ image: 'https://www.queenweddingdecor.com/wp-content/uploads/2019/11/backdrop_2019_09_01.jpg',
        description: 'We are one of the Toronto wedding flowers & wedding decor specialists. Our design styles range from traditional to modern day trendy. We work closely with you and assist you with choosing the right type of wedding flowers, chair covers, centerpieces and backdrops for your wedding', location: '85 Midwest Rd, Scarborough, ON M1P 3A6', price: '1000', 
        contactno: '647-631-2227'});
        let err;
        try {
            const savedDecorationDataWithoutRequiredField = await userWithoutRequiredField.save();
            error = savedDecorationDataWithoutRequiredField;
        } catch (error) {
            err = error;
        }
        expect(err).toBeInstanceOf(mongoose.Error.ValidationError);
        expect(err.errors.name).toBeDefined();
    });
})

