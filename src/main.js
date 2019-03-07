import task from './data.js';
// import generateCard from './make-task.js';
import {filtersNames, generateFilter} from './make-filter.js';
import Task from './task.js';
import TaskEdit from './task-edit.js';

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
const renderTasks = (num) => {
  const boardTasks = document.querySelector(`.board__tasks`);
  boardTasks.innerHTML = ``;
  for (let i = 0; i < num; i++) {
    const taskComponent = new Task(task());
    const editTaskComponent = new TaskEdit(task());

    boardTasks.appendChild(taskComponent.render());

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
  }
};

// функция для добовления оброботчика событий на фильтр
const onFilterClick = (evt) => {
  const filterLabel = evt.target.closest(`.filter__label`);
  if (filterLabel) {
    const cardsNumber = filterLabel.querySelector(`.filter__all-count`).textContent;
    renderTasks(cardsNumber);
  }
};


renderFilters();
renderTasks(CARDS_AMOUNT);

document.body.addEventListener(`click`, onFilterClick);
