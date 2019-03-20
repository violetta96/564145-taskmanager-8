import moment from 'moment';
const titles = [
  `Изучить теорию`,
  `Сделать домашку`,
  `Пройти интенсив на соточку`
];

const tags = new Set([
  `homework`,
  `theory`,
  `practice`,
  `intensive`,
  `keks`
]);

const colors = [
  `black`,
  `yellow`,
  `blue`,
  `green`,
  `pink`
];

const DAY = 24 * 60 * 60 * 1000;

const DAYS_MAX = 14;

const DAYS_MIN = 7;

const getRandomNumber = (min, max) => Math.floor(Math.random() * (max - min)) + min;

const getRandomItem = (items) => items[getRandomNumber(0, items.length)];

const getRandomInt = (min, max) => Math.floor(Math.random() * (1 + max - min)) + min;

const getRandomTags = (items) => {
  let newArray = [...items];
  newArray.sort(() => Math.random() - 0.5);
  newArray = newArray.slice(0, getRandomInt(0, 3));

  return newArray;
};

export const task = () => ({
  title: getRandomItem(titles),
  dueDate: Date.now() - (DAYS_MIN * DAY) + Math.floor(Math.random() * DAYS_MAX) * DAY,
  dueTime: moment().format(`LT`),
  tags: getRandomTags(tags),
  picture: `http://picsum.photos/100/100?r=${Math.random()}`,
  color: getRandomItem(colors),
  repeatingDays: {
    'mo': !!getRandomInt(0, 1),
    'tu': !!getRandomInt(0, 1),
    'we': !!getRandomInt(0, 1),
    'th': !!getRandomInt(0, 1),
    'fr': !!getRandomInt(0, 1),
    'sa': !!getRandomInt(0, 1),
    'su': !!getRandomInt(0, 1),
  },
  isFavorite: !!getRandomInt(0, 1),
});

export const Color = {
  blue: `card--blue`,
  black: `card--black`,
  yellow: `card--yellow`,
  green: `card--green`,
  pink: `card--pink`,
};
