import Smart from "./smart.js";

const createGenres = (genre) => {
  const createGenresTemplate = genre.map((item) => {
    return `<span class="film-details__genre">${item}</span>`;
  }).join(``);
  return createGenresTemplate;
};

const createComments = (comments) => {
  const createCommentsTemplate = comments.map((comment) => {
    return `<li class="film-details__comment">
        <span class="film-details__comment-emoji">
          <img src="./images/emoji/${comment.emotion}" width="55" height="55" alt="emoji-smile">
        </span>
        <div>
          <p class="film-details__comment-text">${comment.message}</p>
          <p class="film-details__comment-info">
            <span class="film-details__comment-author">${comment.author}</span>
            <span class="film-details__comment-day">${comment.date}</span>
            <button class="film-details__comment-delete">Delete</button>
          </p>
        </div>
      </li>`;
  }).join(``);

  return createCommentsTemplate;
};

const createFilmDetails = (data) => {

  const {name, poster, description, rating, ageRating, releaseDate, genre, duration, comments, producer, writers, actors, country} = data;

  return `<section class="film-details">
            <form class="film-details__inner" action="" method="get">
              <div class="film-details__top-container">
                <div class="film-details__close">
                  <button class="film-details__close-btn" type="button">close</button>
                </div>
                <div class="film-details__info-wrap">
                  <div class="film-details__poster">
                    <img class="film-details__poster-img" src="./images/posters/${poster}" alt="">
                    <p class="film-details__age">${ageRating}</p>
                  </div>

                  <div class="film-details__info">
                    <div class="film-details__info-head">
                      <div class="film-details__title-wrap">
                      <h3 class="film-details__title">${name}</h3>
                      <p class="film-details__title-original">Original: ${name}</p>
                    </div>

                    <div class="film-details__rating">
                      <p class="film-details__total-rating">${rating}</p>
                    </div>
                  </div>

                  <table class="film-details__table">
                    <tr class="film-details__row">
                      <td class="film-details__term">Director</td>
                      <td class="film-details__cell">${producer}</td>
                    </tr>
                    <tr class="film-details__row">
                      <td class="film-details__term">Writers</td>
                      <td class="film-details__cell">${writers.join(`, `)}</td>
                    </tr>
                    <tr class="film-details__row">
                      <td class="film-details__term">Actors</td>
                      <td class="film-details__cell">${actors.join(`, `)}</td>
                    </tr>
                    <tr class="film-details__row">
                      <td class="film-details__term">Release Date</td>
                      <td class="film-details__cell">${releaseDate}</td>
                    </tr>
                    <tr class="film-details__row">
                      <td class="film-details__term">Runtime</td>
                      <td class="film-details__cell">${duration}</td>
                    </tr>
                    <tr class="film-details__row">
                      <td class="film-details__term">Country</td>
                      <td class="film-details__cell">${country}</td>
                    </tr>
                    <tr class="film-details__row">
                      <td class="film-details__term">${(genre.length > 1) ? `Genres` : `Genre`}</td>
                      <td class="film-details__cell">
                        ${createGenres(genre)}
                    </tr>
                  </table>

                    <p class="film-details__film-description">${description}</p>
                  </div>
                </div>

                <section class="film-details__controls">
                  <input type="checkbox" class="film-details__control-input visually-hidden" id="watchlist" name="watchlist">
                  <label for="watchlist" class="film-details__control-label film-details__control-label--watchlist">Add to watchlist</label>

                  <input type="checkbox" class="film-details__control-input visually-hidden" id="watched" name="watched">
                  <label for="watched" class="film-details__control-label film-details__control-label--watched">Already watched</label>

                  <input type="checkbox" class="film-details__control-input visually-hidden" id="favorite" name="favorite">
                  <label for="favorite" class="film-details__control-label film-details__control-label--favorite">Add to favorites</label>
                </section>
              </div>

              <div class="film-details__bottom-container">
                <section class="film-details__comments-wrap">
                  <h3 class="film-details__comments-title">Comments <span class="film-details__comments-count">${comments.length}</span></h3>

                  <ul class="film-details__comments-list">
                    ${createComments(comments)}
                  </ul>

                  <div class="film-details__new-comment">
                    <div class="film-details__add-emoji-label">
                      ${(data.chosenEmojiSrc) ? `<img src="${data.chosenEmojiSrc}" width="55" height="55" alt="emoji-smile">` : ``}
                    </div>

                    <label class="film-details__comment-label">
                      <textarea class="film-details__comment-input" placeholder="Select reaction below and write comment here" name="comment"></textarea>
                    </label>

                    <div class="film-details__emoji-list">
                      <input class="film-details__emoji-item visually-hidden" name="comment-emoji" type="radio" id="emoji-smile" value="smile">
                      <label class="film-details__emoji-label" for="emoji-smile">
                        <img src="./images/emoji/smile.png" width="30" height="30" alt="emoji">
                      </label>

                      <input class="film-details__emoji-item visually-hidden" name="comment-emoji" type="radio" id="emoji-sleeping" value="sleeping">
                      <label class="film-details__emoji-label" for="emoji-sleeping">
                        <img src="./images/emoji/sleeping.png" width="30" height="30" alt="emoji">
                      </label>

                      <input class="film-details__emoji-item visually-hidden" name="comment-emoji" type="radio" id="emoji-puke" value="puke">
                      <label class="film-details__emoji-label" for="emoji-puke">
                        <img src="./images/emoji/puke.png" width="30" height="30" alt="emoji">
                      </label>

                      <input class="film-details__emoji-item visually-hidden" name="comment-emoji" type="radio" id="emoji-angry" value="angry">
                      <label class="film-details__emoji-label" for="emoji-angry">
                        <img src="./images/emoji/angry.png" width="30" height="30" alt="emoji">
                      </label>
                    </div>
                  </div>
                </section>
              </div>
            </form>
  </section>`;

};

export default class FilmDetail extends Smart {
  constructor(film) {
    super();

    this._data = FilmDetail.parseFilmToData(film);

    this._clickHandler = this._clickHandler.bind(this);
    this._favoriteClickHandler = this._favoriteClickHandler.bind(this);
    this._watchListClickHandler = this._watchListClickHandler.bind(this);
    this._historyClickHandler = this._historyClickHandler.bind(this);
    this._closeClickHandler = this._closeClickHandler.bind(this);

    this._emojiChooseHandler = this._emojiChooseHandler.bind(this);
    this._setInnerHandlers();
  }

  getTemplate() {
    return createFilmDetails(this._data);
  }

  restoreHandlers() {
    this._setInnerHandlers();
    this.setCloseClickHandler(this._callback.closeClick);
    this.setFavoriteClickHandler(this._callback.favoriteClick);
    this.setWatchListClickHandler(this._callback.watchListClick);
    this.setHistoryClickHandler(this._callback.historyClick);
  }

  _setInnerHandlers() {
    this.getElement()
      .querySelector(`.film-details__emoji-list`)
      .addEventListener(`click`, this._emojiChooseHandler);
  }

  static parseFilmToData(film) {
    return Object.assign(
        {},
        film,
        {
          chosenEmojiSrc: null
        }
    );
  }

  static parseDataToFilm(data) {
    data = Object.assign({}, data);

    data.chosenEmojiSrc = null;

    return data;
  }

  _clickHandler(evt) {
    evt.preventDefault();
    this._callback.click(evt, this._data);
  }

  _closeClickHandler(evt) {
    evt.preventDefault();
    this._callback.closeClick();
  }

  _emojiChooseHandler(evt) {
    evt.preventDefault();

    const target = evt.target;

    if (target.tagName === `IMG`) {
      this.updateData({
        chosenEmojiSrc: target.src
      });
    }
  }

  setCloseClickHandler(callback) {
    this._callback.closeClick = callback;
    this.getContainer(`.film-details__close-btn`).addEventListener(`click`, this._closeClickHandler);
  }

  _favoriteClickHandler(evt) {
    evt.preventDefault();
    this._callback.favoriteClick();
  }

  setFavoriteClickHandler(callback) {
    this._callback.favoriteClick = callback;
    this.getContainer(`.film-details__control-label--favorite`).addEventListener(`click`, this._favoriteClickHandler);
  }

  _watchListClickHandler(evt) {
    evt.preventDefault();
    this._callback.watchListClick();
  }

  setWatchListClickHandler(callback) {
    this._callback.watchListClick = callback;
    this.getContainer(`.film-details__control-label--watchlist`).addEventListener(`click`, this._watchListClickHandler);
  }

  _historyClickHandler(evt) {
    evt.preventDefault();
    this._callback.historyClick();
  }

  setHistoryClickHandler(callback) {
    this._callback.historyClick = callback;
    this.getContainer(`.film-details__control-label--watched`).addEventListener(`click`, this._historyClickHandler);
  }
}
