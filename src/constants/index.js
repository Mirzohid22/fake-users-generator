// import { Table } from "antd";
export const COUNTRIES = [
  {
    value: "en",
    label: "Eng",
  },
  {
    value: "ru",
    label: "Rus",
  },
  {
    value: "de",
    label: "Ger",
  },
];

export const COLUMNS = [
  {
    title: "№",
    dataIndex: "key",
    key: "key",
  },
  {
    title: "Id",
    dataIndex: "id",
    key: "id",
  },
  {
    title: "Name",
    dataIndex: "name",
    key: "name",
  },
  {
    title: "Email",
    dataIndex: "email",
    key: "email",
    render: (text) => (
      <a href={`mailto:${text}`} target="_blank" rel="noopener noreferrer">
        {text}
      </a>
    ),
  },
  {
    title: "Address",
    dataIndex: "address",
    key: "address",
  },
  {
    title: "Phone",
    dataIndex: "phone",
    key: "phone",
  },
];

export const ALPHABETS = {
  en: "abcdefghijklmnopqrstuvwxyz ",
  ru: "абвгдеёжзийклмнопрстуфхцчшщъыьэюя ",
  de: "abcdefghijklmnopqrstuvwxyzäöüß ",
};
