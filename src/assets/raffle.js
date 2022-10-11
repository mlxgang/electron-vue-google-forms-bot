const sizes = [
  5, 5.5, 6, 6.5, 7, 7.5, 8, 8.5, 9, 9.5, 10, 10.5, 11, 11.5, 12, 12.5,
];
const stores = [
  { value: 'traektoria', title: 'Траектория' },
  { value: 'test', title: 'Тест' },
];
const modes = [
  { value: true, title: 'Headless' },
  { value: false, title: 'Browser' },
];
const task = {
  type: 'Raffle',
  link: null,
  profile: null,
  size: null,
  store: null,
  mode: true,
  status: 'idle',
};
export {
  sizes, stores, modes, task,
};
