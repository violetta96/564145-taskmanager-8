import {task} from './data.js';
import {filtersNames, generateFilter} from './make-filter.js';
import Task from './task.js';
import TaskEdit from './task-edit.js';

const CARDS_AMOUNT = 7;
const boardTasks = document.querySelector(`.board__tasks`);
const mainFilter = document.querySelector(`.main__filter`);

const createTasks = (count) => {
  const tasks = [];
  for (let i = 0; i < count; i++) {
    tasks.push(task());
  }
  return tasks;
};

const data = createTasks(CARDS_AMOUNT);

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
  }
};

const updateTask = (tasks, newTask) => {
  tasks = Object.assign({}, tasks, newTask);
  return tasks;
};

const deleteTask = (tasks, i) => {
  tasks.splice(i, 1);
  return tasks;
};

// функция для отрисовки карточек
const renderTasks = (cardData) => {
  boardTasks.innerHTML = ``;

  const fragment = document.createDocumentFragment();
  for (let i = 0; i < cardData.length; i++) {
    const taskData = cardData;
    const taskComponent = new Task(taskData);
    const editTaskComponent = new TaskEdit(taskData);

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
      deleteTask(taskData, i);
      editTaskComponent.unrender();
    };

    fragment.appendChild(taskComponent.render());
  }

  boardTasks.appendChild(fragment);
};


// функция для добовления оброботчика событий на фильтр
const onFilterClick = (evt) => {
  const filterName = evt.target.id;
  const filteredTasks = filterTasks(data, filterName);
  renderTasks(filteredTasks);
};


renderFilters();
renderTasks(data);

document.body.addEventListener(`click`, onFilterClick);
