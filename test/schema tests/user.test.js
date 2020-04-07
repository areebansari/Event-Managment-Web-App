const mongoose = require('mongoose');
const UserModel = require('../../models/user');

describe('User Model Test', () => {

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

    test('CreateAndSaveUser', async () => {
        const userData = { username: 'Roy', password: 'slhssjghslgh'};
        const validUser = new UserModel(userData);
        const savedUser = await validUser.save();
        // Object Id should be defined when successfully saved to MongoDB.
        expect(savedUser.username).toBe(userData.username);
        expect(savedUser.password).toBe(userData.password);
    });

        // Test Schema is working!!!
    // You shouldn't be able to add in any field that isn't defined in the schema
    test('FieldNotDefinedInSchema', async () => {
        const userData = { username: 'Raj', password: 'jkkkk', role: 'customer'};
        const validUser = new UserModel(userData);
        const savedUser = await validUser.save();
        // Object Id should be defined when successfully saved to MongoDB.
        expect(savedUser.username).toBe(userData.username);
        expect(savedUser.password).toBe(userData.password);
        expect(savedUser.role).toBeUndefined();
    });
})

