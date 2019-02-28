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

const getRandomNumber = (min, max) => Math.floor(Math.random() * (max - min)) + min;

const getRandomItem = (items) => items[getRandomNumber(0, items.length)];

const getRandomInt = (min, max) => Math.floor(Math.random() * (1 + max - min)) + min;

const getRandomTags = (items) => {
  let newArray = [...items];
  newArray.sort(() => Math.random() - 0.5);
  newArray = newArray.slice(0, getRandomInt(0, 3));

  return newArray;
};

export default () => ({
  title: getRandomItem(titles),
  dueDate: Date.now() - (7 * 24 * 60 * 60 * 1000) + Math.floor(Math.random() * 14) * 24 * 60 * 60 * 1000,
  tags: getRandomTags(tags),
  picture: `http://picsum.photos/100/100?r=${Math.random()}`,
  color: getRandomItem(colors),
  repeatingDays: {
    'mo': getRandomInt(0, 1),
    'tu': getRandomInt(0, 1),
    'we': getRandomInt(0, 1),
    'th': getRandomInt(0, 1),
    'fr': getRandomInt(0, 1),
    'sa': getRandomInt(0, 1),
    'su': getRandomInt(0, 1),
  },
  isFavorite: getRandomInt(0, 1),
  isDone: getRandomInt(0, 1)
});
