import { Faker, en, de, ru } from "@faker-js/faker";
import { ALPHABETS } from "../constants";

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

export const generateUsers = (length, locale = "en", start = 0, seed) => {
  const faker = new Faker({ locale: [getlocale(locale)] });
  faker.seed(seed);
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

const handlePropertyErrors = (property, alphabet, locale, seed) => {
  const faker = new Faker({ locale: [getlocale(locale)] });
  faker.seed(seed);

  let noisyProperty = property;

  const errorType = Math.floor(faker.number.float() * 3);

  const position = Math.floor(faker.number.float() * noisyProperty.length);

  if (errorType === 0) {
    if (noisyProperty.length > 1) {
      noisyProperty =
        noisyProperty.slice(0, position) + noisyProperty.slice(position + 1);
    }
  } else if (errorType === 1) {
    const randomChar =
      alphabet[Math.floor(faker.number.float() * alphabet.length)];
    noisyProperty =
      noisyProperty.slice(0, position) +
      randomChar +
      noisyProperty.slice(position);
  } else if (errorType === 2 && position < noisyProperty.length - 1) {
    const char1 = noisyProperty.charAt(position);
    const char2 = noisyProperty.charAt(position + 1);
    noisyProperty =
      noisyProperty.slice(0, position) +
      char2 +
      char1 +
      noisyProperty.slice(position + 2);
  }

  return noisyProperty;
};

export const introduceErrors = (users, locale = "en", errorsRate, seed) => {
  const faker = new Faker({ locale: [getlocale(locale)] });
  faker.seed(seed);
  const noisyUsers = [...users];
  if (errorsRate === 0) {
    return noisyUsers;
  }

  for (let user of noisyUsers) {
    const steps = Math.floor(faker.number.float() + errorsRate);

    for (let i = 0; i < steps; i++) {
      const alphabet = ALPHABETS[locale];
      const property =
        Object.keys(user)[
          Math.floor(faker.number.float() * Object.keys(user).length)
        ];
      if (property === "key") {
        continue;
      } else if (property === "id") {
        handlePropertyErrors(
          user[property],
          alphabet + "0123456789",
          locale,
          seed
        );
      } else if (property === "phone") {
        handlePropertyErrors(user[property], "+-()0123456789", locale, seed);
      } else {
        user[property] = handlePropertyErrors(
          user[property],
          alphabet,
          locale,
          seed
        );
      }
    }
  }

  return noisyUsers;
};

export const createSeed = (locale, seedValue) => {
  const localeValue = locale === "en" ? 0 : locale === "ru" ? 1 : 2;
  return [Number(localeValue), Number(seedValue)];
};
