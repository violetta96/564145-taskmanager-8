import {tasksData} from './data.js';
import {filtersNames, generateFilter} from './make-filter.js';
import Task from './task.js';
import TaskEdit from './task-edit.js';

const CARDS_AMOUNT = 7;
const boardTasks = document.querySelector(`.board__tasks`);
const mainFilter = document.querySelector(`.main__filter`);

const data = tasksData(CARDS_AMOUNT);

// функция для отрисовки фильтров
const renderFilters = () => {
  let fragment = ``;
  for (let i = 0; i < filtersNames.length; i++) {
    fragment += generateFilter(i);
  }
  mainFilter.innerHTML = fragment;
};

const filterTasks = (tasks, filterName) => {
  switch (filterName) {
    case `filter__all`:
      return tasks;

    case `filter__overdue`:
      return tasks.filter((it) => it.dueDate < Date.now());

    case `filter__repeating`:
      return tasks.filter((it) => [...Object.entries(it.repeatingDays)]
          .some((rec) => rec[1]));
    default:
      return tasks;
  }
};

const updateTask = (tasks, newTask) => {
  tasks = Object.assign({}, tasks, newTask);
  return tasks;
};

// функция для отрисовки карточек
const renderTasks = (cardsData) => {
  boardTasks.innerHTML = ``;
  for (let i = 0; i < cardsData.length; i++) {
    const taskData = cardsData[i];
    const taskComponent = new Task(taskData);
    const editTaskComponent = new TaskEdit(taskData);

    taskComponent.render();
    boardTasks.appendChild(taskComponent.element);

    taskComponent.onEdit = () => {
      editTaskComponent.render();
      boardTasks.replaceChild(editTaskComponent.element, taskComponent.element);
      taskComponent.unrender();
    };

    editTaskComponent.onSubmit = (updatedTaskData) => {
      const updatedTask = updateTask(taskData, updatedTaskData);
      taskComponent.update(updatedTask);
      taskComponent.render();
      boardTasks.replaceChild(taskComponent.element, editTaskComponent.element);
      editTaskComponent.unrender();
    };

    editTaskComponent.onDelete = () => {
      editTaskComponent.unrender();
    };
  }
};


// функция для добовления оброботчика событий на фильтр
const onFilterClick = (evt) => {
  boardTasks.innerHTML = ``;
  const filterName = evt.target.id;
  const filteredTasks = filterTasks(data, filterName);
  renderTasks(filteredTasks);
};


renderFilters();
renderTasks(data);

document.body.addEventListener(`click`, onFilterClick);
