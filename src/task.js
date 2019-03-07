import {createElement} from './create-element.js';

export default class Task {
  constructor(data) {
    this._title = data.title;
    this._dueDate = data.dueDate;
    this._tags = data.tags;
    this._picture = data.picture;
    this._color = data.color;
    this._repeatingDays = data.repeatingDays;
    this._isFavorite = data.isFavorite;

    this._element = null;
    this._onEdit = null;
  }

  _isRepeating(days) {
    for (const day in days) {
      if (days[day]) {
        return true;
      }
    }
    return false;
  }

  get _dateFormatter() {
    const dateOptions = {
      day: `numeric`,
      month: `long`,
      year: `numeric`
    };

    return new Intl.DateTimeFormat(`en-US`, dateOptions);
  }

  get _timeFormatter() {
    const timeOptions = {
      hour: `numeric`,
      minute: `numeric`,
    };

    return new Intl.DateTimeFormat(`ru`, timeOptions);
  }

  _onEditButtonClick() {
    return typeof this._onEdit === `function` && this._onEdit();
  }

  get element() {
    return this._element;
  }

  set onEdit(fn) {
    this._onEdit = fn;
  }

  get template() {
    return `<article class="card card--${this._color} ${this._isRepeating(this._repeatingDays) ? `card--repeat` : ``}">
      <form class="card__form" method="get">
        <div class="card__inner">
          <div class="card__control">
            <button type="button" class="card__btn card__btn--edit">
              edit
            </button>
            <button type="button" class="card__btn card__btn--archive">
              archive
            </button>
            <button
              type="button"
              class="card__btn card__btn--favorites ${this._isFavorite ? `card__btn--disabled` : ``}">
              favorites
            </button>
          </div>
          <div class="card__color-bar">
            <svg class="card__color-bar-wave" width="100%" height="10">
              <use xlink:href="#wave"></use>
            </svg>
          </div>
          <div class="card__textarea-wrap">
            <label>
              <textarea
                class="card__text"
                placeholder="Start typing your text here..."
                name="text">${this._title}
              </textarea>
            </label>
          </div>
          <div class="card__settings">
            <div class="card__details">
              <div class="card__dates">
                <button class="card__date-deadline-toggle" type="button">
                  date: <span class="card__date-status">no</span>
                </button>
                <fieldset class="card__date-deadline" ${(this._dueDate < Date.now()) ? `disabled` : ``}>
                  <label class="card__input-deadline-wrap">
                    <input
                      class="card__date"
                      type="text"
                      placeholder="${this._dateFormatter.format(this._dueDate)}"
                      name="date"
                      value = "${this._dateFormatter.format(this._dueDate)}"

                    />
                  </label>
                  <label class="card__input-deadline-wrap">
                    <input
                      class="card__time"
                      type="text"
                      placeholder="${this._timeFormatter.format(this._dueDate)}"
                      name="time"
                      value = "${this._timeFormatter.format(this._dueDate)}"
                    />
                  </label>
                </fieldset>
                <button class="card__repeat-toggle" type="button">
                  repeat:<span class="card__repeat-status">no</span>
                </button>
                <fieldset class="card__repeat-days ${this._isRepeating(this._repeatingDays) ? `` : ` disabled`}">
                  <div class="card__repeat-days-inner">
                    <input
                      class="visually-hidden card__repeat-day-input"
                      type="checkbox"
                      id="repeat-mo-2"
                      name="repeat"
                      value="mo"
                      ${this._repeatingDays.mo ? `checked` : ``}
                    />
                    <label class="card__repeat-day" for="repeat-mo-2">
                    mo
                    </label>
                    <input
                      class="visually-hidden card__repeat-day-input"
                      type="checkbox"
                      id="repeat-tu-2"
                      name="repeat"
                      value="tu"
                      ${this._repeatingDays.tu ? `checked` : ``}
                    />
                    <label class="card__repeat-day" for="repeat-tu-2">
                    tu
                    </label>
                    <input
                      class="visually-hidden card__repeat-day-input"
                      type="checkbox"
                      id="repeat-we-2"
                      name="repeat"
                      value="we"
                      ${this._repeatingDays.we ? `checked` : ``}
                    />
                    <label class="card__repeat-day" for="repeat-we-2">
                    we
                    </label>
                    <input
                      class="visually-hidden card__repeat-day-input"
                      type="checkbox"
                      id="repeat-th-2"
                      name="repeat"
                      value="th"
                      ${this._repeatingDays.th ? `checked` : ``}
                    />
                    <label class="card__repeat-day" for="repeat-th-2">
                       th
                    </label>
                    <input
                      class="visually-hidden card__repeat-day-input"
                      type="checkbox"
                      id="repeat-fr-2"
                      name="repeat"
                      value="fr"
                      ${this._repeatingDays.fr ? `checked` : ``}
                    />
                    <label class="card__repeat-day" for="repeat-fr-2">
                      fr
                    </label>
                    <input
                      class="visually-hidden card__repeat-day-input"
                      type="checkbox"
                      name="repeat"
                      value="sa"
                      id="repeat-sa-2"
                      ${this._repeatingDays.sa ? `checked` : ``}
                    />
                    <label class="card__repeat-day" for="repeat-sa-2">
                      sa
                    </label>
                    <input
                      class="visually-hidden card__repeat-day-input"
                      type="checkbox"
                      id="repeat-su-2"
                      name="repeat"
                      value="su"
                      ${this._repeatingDays.su ? `checked` : ``}
                    />
                    <label class="card__repeat-day" for="repeat-su-2">
                      su
                    </label>
                  </div>
                </fieldset>
              </div>
              <div class="card__hashtag">
                <div class="card__hashtag-list">
                ${(Array.from(this._tags).map((tag) => (`
                  <span class="card__hashtag-inner">
                    <input type="hidden" name="hashtag" value="${tag}" class="card__hashtag-hidden-input" />
                    <button type="button" class="card__hashtag-name">#${tag}</button>
                    <button type="button" class="card__hashtag-delete">delete</button>
                  </span>`.trim()
  ))).join(``)}
                </div>
                <label>
                  <input
                    type="text"
                    class="card__hashtag-input"
                    name="hashtag-input"
                    placeholder="Type new hashtag here"
                  />
                </label>
              </div>
            </div>
            <label class="card__img-wrap${this._picture ? `` : `card__img-wrap--empty`}">
              <input
                type="file"
                class="card__img-input visually-hidden"
                name="img"
              />
              <img
                src="${this._picture}"
                alt="task picture"
                class="card__img"
              />
            </label>
            <div class="card__colors-inner">
              <h3 class="card__colors-title">Color</h3>
              <div class="card__colors-wrap">
                <input
                  type="radio"
                  id="color-black-2"
                  class="card__color-input card__color-input--black visually-hidden"
                  name="color"
                  value="black"
                />
                <label
                  for="color-black-2"
                  class="card__color card__color--black">
                    black
                </label>
                <input
                  type="radio"
                  id="color-yellow-2"
                  class="card__color-input card__color-input--yellow visually-hidden"
                  name="color"
                  value="yellow"
                />
                <label
                  for="color-yellow-2"
                  class="card__color card__color--yellow">
                    yellow
                </label>
                <input
                  type="radio"
                  id="color-blue-2"
                  class="card__color-input card__color-input--blue visually-hidden"
                  name="color"
                  value="blue"
                />
                <label
                  for="color-blue-2"
                  class="card__color card__color--blue">
                    blue
                </label>
                <input
                  type="radio"
                  id="color-green-2"
                  class="card__color-input card__color-input--green visually-hidden"
                  name="color"
                  value="green"
                />
                <label
                  for="color-green-2"
                  class="card__color card__color--green"
                  >green</label
                >
                <input
                  type="radio"
                  id="color-pink-2"
                  class="card__color-input card__color-input--pink visually-hidden"
                  name="color"
                  value="pink"
                  checked
                />
                <label
                  for="color-pink-2"
                  class="card__color card__color--pink">
                    pink
                </label>
              </div>
            </div>
          </div>
          <div class="card__status-btns">
            <button class="card__save" type="submit">save</button>
            <button class="card__delete" type="button">delete</button>
          </div>
        </div>
      </form>
    </article>`.trim();
  }

  bind() {
    this._element.querySelector(`.card__btn--edit`)
          .addEventListener(`click`, this._onEditButtonClick.bind(this));
  }

  render() {
    this._element = createElement(this.template);
    this.bind();
    return this._element;
  }

  unbind() {
    this._element.querySelector(`.card__btn--edit`)
          .removeEventListener(`click`, this._onEditButtonClick.bind(this));
  }

  unrender() {
    this.unbind();
    this._element = null;
  }

}
