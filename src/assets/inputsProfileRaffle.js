const inputs = [
  {
    name: 'Имя', id: 'name', type: 'text', placeholder: 'Имя',
  },
  {
    name: 'Фамилия', id: 'surname', type: 'text', placeholder: 'Фамилия',
  },
  {
    name: 'Электронная почта',
    id: 'email',
    type: 'text',
    placeholder: 'example@mail.com',
  },
  {
    name: 'Последние 5 цифр паспорта',
    id: 'numberId',
    type: 'number',
    placeholder: '23456',
  },
  {
    name: 'Пол',
    id: 'sex',
    type: 'text',
    placeholder: 'М/Ж',
  },
  {
    name: 'Дата рождения (слитно)',
    id: 'dateBirth',
    type: 'number',
    placeholder: '01.01.1970 -> 01011970',
  },
  {
    name: 'Instagram',
    id: 'instagram',
    type: 'text',
    placeholder: 'https://www.instagram.com/nickname',
  },
  {
    name: 'Telegram',
    id: 'telegram',
    type: 'text',
    placeholder: '@nickname',
  },
  {
    name: 'Адрес',
    id: 'address',
    type: 'text',
    placeholder: 'Москва, ул. Пушкина, д. Колотушкина',
  },
  {
    name: 'Город',
    id: 'city',
    type: 'text',
    placeholder: 'Москва',
  },
  {
    name: 'Номер телефона',
    id: 'phone',
    type: 'number',
    placeholder: '88008008080',
  },
];
const currentProfile = {
  type: 'Raffle',
  name: null,
  surname: null,
  email: null,
  numberId: null,
  sex: null,
  dateBirth: null,
  instagram: null,
  telegram: null,
  address: null,
  city: null,
  phone: null,
};
export { inputs, currentProfile };
