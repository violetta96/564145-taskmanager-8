import task from './data.js';
import {filtersNames, generateFilter} from './make-filter.js';
import Task from './task.js';
import TaskEdit from './task-edit.js';

const CARDS_AMOUNT = 7;
const boardTasks = document.querySelector(`.board__tasks`);
const mainFilter = document.querySelector(`.main__filter`);

// функция для отрисовки фильтров
const renderFilters = () => {
  let fragment = ``;
  for (let i = 0; i < filtersNames.length; i++) {
    fragment += generateFilter(i);
  }
  mainFilter.innerHTML = fragment;
};

// функция для отрисовки карточек
const renderTasks = (num) => {
  const fragment = document.createDocumentFragment();
  for (let i = 0; i < num; i++) {
    const tasks = task();
    const taskComponent = new Task(tasks);
    const editTaskComponent = new TaskEdit(tasks);

    taskComponent.onEdit = () => {
      editTaskComponent.render();
      boardTasks.replaceChild(editTaskComponent.element, taskComponent.element);
      taskComponent.unrender();
    };

    editTaskComponent.onSubmit = () => {
      taskComponent.render();
      boardTasks.replaceChild(taskComponent.element, editTaskComponent.element);
      editTaskComponent.unrender();
    };

    fragment.appendChild(taskComponent.render());
  }

  boardTasks.appendChild(fragment);
};

// функция для добовления оброботчика событий на фильтр
const onFilterClick = (evt) => {
  const filterLabel = evt.target.closest(`.filter__label`);
  if (filterLabel) {
    boardTasks.innerHTML = ``;
    const cardsNumber = filterLabel.querySelector(`.filter__all-count`).textContent;
    renderTasks(cardsNumber);
  }
};


renderFilters();
renderTasks(CARDS_AMOUNT);

document.body.addEventListener(`click`, onFilterClick);
