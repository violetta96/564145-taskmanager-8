
import generateCard from './make-task.js';
import {filtersNames, generateFilter} from './make-filter.js';

const CARDS_AMOUNT = 7;

// функция для отрисовки фильтров
const renderFilters = () => {
  let fragment = ``;
  const mainFilter = document.querySelector(`.main__filter`);
  for (let i = 0; i < filtersNames.length; i++) {
    fragment += generateFilter(i);
  }
  mainFilter.innerHTML = fragment;
};

// функция для отрисовки карточек
const renderCards = (num) => {
  let fragment = ``;
  const boardTasks = document.querySelector(`.board__tasks`);
  for (let i = 0; i < num; i++) {
    fragment += generateCard();
  }
  boardTasks.innerHTML = fragment;
};

// функция для добовления оброботчика событий на фильтр
const onFilterClick = (evt) => {
  const filterLabel = evt.target.closest(`.filter__label`);
  if (filterLabel) {
    const cardsNumber = filterLabel.querySelector(`.filter__all-count`).textContent;
    renderCards(cardsNumber);
  }
};

renderFilters();
renderCards(CARDS_AMOUNT);

document.body.addEventListener(`click`, onFilterClick);
