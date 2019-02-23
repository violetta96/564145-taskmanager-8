const randomCardsRange = {
  MIN: 1,
  MAX: 10
};

const filtersNames = [
  `all`,
  `overdue`,
  `today`,
  `favorites`,
  `repeating`,
  `tags`,
  `archive`
];

// функция для генерирования случайного числа в диапазоне
const getRandomNumber = (max, min) => Math.floor(Math.random() * (max - min + 1)) + min;

// функция для создания филтра
export const generateFilter = (index, cardRandomNumber = getRandomNumber(randomCardsRange.MIN, randomCardsRange.MAX)) => {
  return `<input
            type="radio"
            id="filter__${filtersNames[index]}"
            class="filter__input visually-hidden"
            name="filter"
          />
          <label for="filter__${filtersNames[index]}" class="filter__label">
            ${filtersNames[index]}
            <span class="filter__all-count">${cardRandomNumber}</span>
          </label>`;
};

export {filtersNames};
