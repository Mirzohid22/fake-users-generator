import { Faker, en, de, ru } from "@faker-js/faker";

const getlocale = (locale) => {
  switch (locale) {
    case "en":
      return en;
    case "de":
      return de;
    case "ru":
      return ru;
    default:
      return en;
  }
};

export const generateUsers = (length, locale = "en", start = 0) => {
  const faker = new Faker({ locale: [getlocale(locale)] });
  const users = [];
  for (let i = start; i < length; i++) {
    users.push({
      key: i + 1,
      id: faker.database.mongodbObjectId(),
      name: faker.person.fullName(),
      email: faker.internet.email(),
      address: faker.location.city() + ", " + faker.location.street(),
      phone: faker.phone.number(),
    });
  }
  return users;
};
