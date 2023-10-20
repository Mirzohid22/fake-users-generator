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

const handlePropertyErrors = (property, alphabet) => {
  let noisyProperty = property;

  // Randomly choose an error type (delete, add, or swap)
  const errorType = Math.floor(Math.random() * 3);

  // Determine the position for the error
  const position = Math.floor(Math.random() * noisyProperty.length);

  // Apply the selected error type
  if (errorType === 0) {
    // Delete character
    if (noisyProperty.length > 1) {
      noisyProperty =
        noisyProperty.slice(0, position) + noisyProperty.slice(position + 1);
    }
  } else if (errorType === 1) {
    // Add random character
    const randomChar = alphabet[Math.floor(Math.random() * alphabet.length)];
    noisyProperty =
      noisyProperty.slice(0, position) +
      randomChar +
      noisyProperty.slice(position);
  } else if (errorType === 2 && position < noisyProperty.length - 1) {
    // Swap nearby characters
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

export const introduceErrors = (users, locale = "en", errorsRate) => {
  const noisyUsers = [...users];
  if (errorsRate === 0) {
    return noisyUsers;
  }

  for (let user of noisyUsers) {
    const steps = Math.floor(Math.random() + errorsRate);
    for (let i = 0; i < steps; i++) {
      const alphabet = ALPHABETS[locale];
      const property =
        Object.keys(user)[Math.floor(Math.random() * Object.keys(user).length)];
      if (property === "key") {
        continue;
      } else if (property === "id") {
        handlePropertyErrors(user[property], alphabet + "0123456789");
      } else if (property === "phone") {
        handlePropertyErrors(user[property], "+-()0123456789");
      } else {
        user[property] = handlePropertyErrors(user[property], alphabet);
      }
    }
  }

  return noisyUsers;
};
