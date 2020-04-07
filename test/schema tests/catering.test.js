const mongoose = require('mongoose');
const CateringModel = require('../../models/catering');

describe('Catering Model Test', () => {

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

    test('CreateAndSaveCateringData', async () => {

        const cateringData = { name: 'Tasty Catering', image: 'https://s3-media0.fl.yelpcdn.com/bphoto/ygnNiki0Arkydr4SJoA8hA/l.jpgs', description: 'Healthful, delicious and sustainably sourced food that nourishes the body and supports a healthy environment',
        location: '1255 Sheppard Avenue East, North York, M2K1E2', price: '100', beverages: 'Yes', 
        contactno: '416-410-2928'};
        const validCateringData = new CateringModel(cateringData);
        const savedCateringData = await validCateringData.save();
        // Object Id should be defined when successfully saved to MongoDB.
        expect(savedCateringData.name).toBe(cateringData.name);
        expect(savedCateringData.image).toBe(cateringData.image);   
        expect(savedCateringData.description).toBe(cateringData.description);   
        expect(savedCateringData.location).toBe(cateringData.location);        
        expect(savedCateringData.price).toBe(cateringData.price);
        expect(savedCateringData.beverages).toBe(cateringData.beverages);
        expect(savedCateringData.contactno).toBe(cateringData.contactno);
    });

        // Test Schema is working!!!
    // You shouldn't be able to add in any field that isn't defined in the schema
    test('FieldNotDefinedInSchema', async () => {
        const cateringData = { name: 'Tasty Catering', image: 'https://s3-media0.fl.yelpcdn.com/bphoto/ygnNiki0Arkydr4SJoA8hA/l.jpgs', description: 'Healthful, delicious and sustainably sourced food that nourishes the body and supports a healthy environment',
        location: '1255 Sheppard Avenue East, North York, M2K1E2', price: '100', beverages: 'Yes', 
        contactno: '416-410-2928', rating: 'very good'};
        const validCateringData = new CateringModel(cateringData);
        const savedCateringData = await validCateringData.save();
        // Object Id should be defined when successfully saved to MongoDB.
        expect(savedCateringData.name).toBe(cateringData.name);
        expect(savedCateringData.image).toBe(cateringData.image);   
        expect(savedCateringData.description).toBe(cateringData.description);   
        expect(savedCateringData.location).toBe(cateringData.location);        
        expect(savedCateringData.price).toBe(cateringData.price);
        expect(savedCateringData.beverages).toBe(cateringData.beverages);
        expect(savedCateringData.contactno).toBe(cateringData.contactno);        
        expect(savedCateringData.rating).toBeUndefined();
    });

    // Test Validation is working!!!
    test('MandatoryFieldNotProvided', async () => {
        const cateringData = { image: 'https://s3-media0.fl.yelpcdn.com/bphoto/ygnNiki0Arkydr4SJoA8hA/l.jpgs', description: 'Healthful, delicious and sustainably sourced food that nourishes the body and supports a healthy environment',
        location: '1255 Sheppard Avenue East, North York, M2K1E2', price: '100', beverages: 'Yes', 
        contactno: '416-410-2928'};
        const cateringWithoutRequiredField = new CateringModel(cateringData);
        let err;
        try {
            const savedCateringDataWithoutRequiredField = await cateringWithoutRequiredField.save();
            error = savedCateringDataWithoutRequiredField;
        } catch (error) {
            err = error;
        }
        expect(err).toBeInstanceOf(mongoose.Error.ValidationError);
        expect(err.errors.name).toBeDefined();
    });
})

