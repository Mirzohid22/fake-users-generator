import { faker } from "@faker-js/faker";

export const generateUsers = (length) => {
    const users = [];
    for (let i = 0; i < length; i++) {
        users.push({
        key: i + 1,
        id: faker.database.mongodbObjectId(),
        name: faker.person.fullName(),
        email: faker.internet.email(),
        address: faker.location.street(),
        phone: faker.phone.number(),
        });
    }
    return users;
};
