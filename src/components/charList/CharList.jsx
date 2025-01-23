import { Component } from "react";
import Spinner from "../spinner/Spinner";
import ErrorMessage from "../errorMessage/ErrorMessage";
import MarvelService from "../../services/MarvelService";

import "./charList.scss";

class CharList extends Component {
  state = {
    characters: [],
    loading: true,
    error: false,
    newItemsLoading: false,
    offset: 210,
    itemsEnded: false,
  };

  marvelService = new MarvelService();

  // когда компонент смонтирован, подгружаются ПЕРВЫЕ 9 персонажей
  componentDidMount() {
    // можно так
    // this.marvelService
    //   .getAllCharacters()
    //   .then(this.onCharactersLoaded)
    //   .catch(this.onError);

    // а можно просто вставить onRequest без аргумента,
    // т.е. действия те же, а аргумент по умолчанию
    this.onRequest();
  }

  // подгрузка доп. 9 штук персонажей по клику на кнопку
  onRequest = (offset) => {
    // при запросе новых персонажей св-во меняется, чтобы кнопку сделать неактивной на период загрузки
    this.onCharacterListLoading(); // загрузка персонажей в процессе

    this.marvelService
      .getAllCharacters(offset)
      .then(this.onCharactersLoaded) // персонажи загружены успешно
      .catch(this.onError); // произошла ошибка
  };

  onCharacterListLoading = () => {
    this.setState({
      newItemsLoading: true,
    });
  };

  onCharactersLoaded = (newCharacters) => {
    // проверяем, если с сервера пришло меньше 9 персонажей, значит их там больше нет,
    //и необходимо удалить кнопку для последующих запросов
    let ended = false;
    if (newCharacters.length < 9) {
      ended = true;
    }

    this.setState(({ characters, offset }) => ({
      // разворачиваем предыдущий массив, присоединяем к нему копию нового, полученного массива
      characters: [...characters, ...newCharacters],

      loading: false,
      newItemsLoading: false, // персонажи загружены, меняем стейт
      offset: offset + 9, // при получении новых персонажей увеличиваем отступ
      itemsEnded: ended,
    }));
  };

  onError = () => {
    this.setState({ error: true });
  };

  render() {
    const { characters, loading, error, offset, newItemsLoading, itemsEnded } =
      this.state;
    const errorMessage = error ? <ErrorMessage /> : null;
    const spinner = loading ? <Spinner /> : null;
    const content = !(loading || error)
      ? characters.map((item, index) => {
          return (
            <li
              className="char__item"
              key={index}
              onClick={() => this.props.onCharacterSelected(item.id)}
            >
              <img
                src={item.thumbnail}
                alt={item.name}
                style={{
                  objectFit: item.thumbnail.includes("not_available")
                    ? "contain"
                    : "cover",
                }}
              />
              <div className="char__name">{item.name}</div>
            </li>
          );
        })
      : null;

    return (
      <div className="char__list">
        <ul className="char__grid">
          {errorMessage}
          {spinner}
          {content}
        </ul>
        <button
          className="button button__main button__long"
          disabled={newItemsLoading} // когда в позиции true, то кнопка неактивна
          style={{ display: itemsEnded ? "none" : "block" }}
          onClick={() => {
            this.onRequest(offset); // по клику запрашиваем еще 9 персонажей
          }}
        >
          <div className="inner">load more</div>
        </button>
      </div>
    );
  }
}

export default CharList;
