import { Component, useEffect, useState, useRef } from "react";
import PropTypes from "prop-types";
import Spinner from "../spinner/Spinner";
import ErrorMessage from "../errorMessage/ErrorMessage";
import MarvelService from "../../services/MarvelService";

import "./charList.scss";

// class CharList extends Component {
//   state = {
//     characters: [],
//     loading: true,
//     error: false,
//     newItemsLoading: false,
//     offset: 210,
//     itemsEnded: false,
//   };

//   marvelService = new MarvelService();

//   // когда компонент смонтирован, подгружаются ПЕРВЫЕ 9 персонажей
//   componentDidMount() {
//     // можно так
//     // this.marvelService
//     //   .getAllCharacters()
//     //   .then(this.onCharactersLoaded)
//     //   .catch(this.onError);

//     // а можно просто вставить onRequest без аргумента,
//     // т.е. действия те же, а аргумент по умолчанию
//     this.onRequest();
//   }

//   // подгрузка доп. 9 штук персонажей по клику на кнопку
//   onRequest = (offset) => {
//     // при запросе новых персонажей св-во меняется, чтобы кнопку сделать неактивной на период загрузки
//     this.onCharacterListLoading(); // загрузка персонажей в процессе

//     this.marvelService
//       .getAllCharacters(offset)
//       .then(this.onCharactersLoaded) // персонажи загружены успешно
//       .catch(this.onError); // произошла ошибка
//   };

//   onCharacterListLoading = () => {
//     this.setState({
//       newItemsLoading: true,
//     });
//   };

//   onCharactersLoaded = (newCharacters) => {
//     // проверяем, если с сервера пришло меньше 9 персонажей, значит их там больше нет,
//     //и необходимо удалить кнопку для последующих запросов
//     let ended = false;
//     if (newCharacters.length < 9) {
//       ended = true;
//     }

//     // условие, чтобы отменить первичный двойной запрос (в стрикт мод) на сервер после монтирования компонента
//     // т.к. при двойном персонажи на странице задваивались
//     if (this.state.characters[0]?.id === newCharacters[0].id) {
//       return;
//     }

//     this.setState(({ characters, offset }) => ({
//       // разворачиваем предыдущий массив, присоединяем к нему копию нового, полученного массива
//       characters: [...characters, ...newCharacters],

//       loading: false,
//       newItemsLoading: false, // персонажи загружены, меняем стейт
//       offset: offset + 9, // при получении новых персонажей увеличиваем отступ
//       itemsEnded: ended,
//     }));
//   };

//   onError = () => {
//     this.setState({ error: true });
//   };

//   itemRefs = []; // массив для ref-ов

//   setRef = (ref) => {
//     // добавление каждого ref в массив
//     this.itemRefs.push(ref);
//   };

//   focusOnItem = (id) => {
//     // при клике у эл-тов удаляем класс и добавляем только выделенному эл-ту по индексу в массиве
//     this.itemRefs.forEach((item) =>
//       item.classList.remove("char__item_selected")
//     );
//     this.itemRefs[id].classList.add("char__item_selected");
//     this.itemRefs[id].focus();
//   };

//   render() {
//     const { characters, loading, error, offset, newItemsLoading, itemsEnded } =
//       this.state;
//     const errorMessage = error ? <ErrorMessage /> : null;
//     const spinner = loading ? <Spinner /> : null;
//     const content = !(loading || error)
//       ? characters.map((item, i) => {
//           return (
//             <li
//               ref={this.setRef}
//               className="char__item"
//               key={item.id}
//               onClick={() => {
//                 this.props.onCharacterSelected(item.id);
//                 this.focusOnItem(i);
//               }}
//             >
//               <img
//                 src={item.thumbnail}
//                 alt={item.name}
//                 style={{
//                   objectFit: item.thumbnail.includes("not_available")
//                     ? "contain"
//                     : "cover",
//                 }}
//               />
//               <div className="char__name">{item.name}</div>
//             </li>
//           );
//         })
//       : null;

//     return (
//       <div className="char__list">
//         <ul className="char__grid">
//           {errorMessage}
//           {spinner}
//           {content}
//         </ul>
//         <button
//           className="button button__main button__long"
//           disabled={newItemsLoading} // когда в позиции true, то кнопка неактивна
//           style={{ display: itemsEnded ? "none" : "block" }}
//           onClick={() => {
//             this.onRequest(offset); // по клику запрашиваем еще 9 персонажей
//           }}
//         >
//           <div className="inner">load more</div>
//         </button>
//       </div>
//     );
//   }
// }

// CharList.propTypes = {
//   onCharacterSelected: PropTypes.func.isRequired,
// };
// export default CharList;

const CharList = (props) => {
  const [characters, setCharacters] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [newItemsLoading, setNewItemsLoading] = useState(false);
  const [offset, setOffset] = useState(210);
  const [itemsEnded, setItemsEnded] = useState(false);

  const marvelService = new MarvelService();

  useEffect(() => {
    onRequest();
  }, []);

  // подгрузка доп. 9 штук персонажей по клику на кнопку
  const onRequest = (offset) => {
    // при запросе новых персонажей св-во меняется, чтобы кнопку сделать неактивной на период загрузки
    onCharacterListLoading(); // загрузка персонажей в процессе

    marvelService
      .getAllCharacters(offset)
      .then(onCharactersLoaded) // персонажи загружены успешно
      .catch(onError); // произошла ошибка
  };

  const onCharacterListLoading = () => {
    setNewItemsLoading(true);
  };

  const onCharactersLoaded = (newCharacters) => {
    // проверяем, если с сервера пришло меньше 9 персонажей, значит их там больше нет,
    //и необходимо удалить кнопку для последующих запросов
    let ended = false;
    if (newCharacters.length < 9) {
      ended = true;
    }

    // условие, чтобы отменить первичный двойной запрос (в стрикт мод) на сервер после монтирования компонента
    // т.к. при двойном персонажи на странице задваивались
    if (characters[0]?.id === newCharacters[0].id) {
      return;
    }

    setCharacters((characters) => [...characters, ...newCharacters]);
    setLoading(false);
    setNewItemsLoading(false);
    setOffset((offset) => offset + 9);
    setItemsEnded(ended);
  };

  const onError = () => {
    setError(true);
    setLoading(false);
  };

  const itemRefs = useRef([]); // массив для ref-ов

  const focusOnItem = (id) => {
    // при клике у эл-тов удаляем класс и добавляем только выделенному эл-ту по индексу в массиве
    itemRefs.current.forEach((item) =>
      item.classList.remove("char__item_selected")
    );
    itemRefs.current[id].classList.add("char__item_selected");
    itemRefs.current[id].focus();
  };

  const errorMessage = error ? <ErrorMessage /> : null;

  const spinner = loading ? <Spinner /> : null;

  const items = !(loading || error)
    ? characters.map((item, i) => {
        return (
          <li
            ref={(item) => (itemRefs.current[i] = item)}
            className="char__item"
            key={item.id}
            onClick={() => {
              props.onCharacterSelected(item.id);
              focusOnItem(i);
            }}
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
        {items}
      </ul>
      <button
        className="button button__main button__long"
        disabled={newItemsLoading} // когда в позиции true, то кнопка неактивна
        style={{ display: itemsEnded ? "none" : "block" }}
        onClick={() => {
          onRequest(offset); // по клику запрашиваем еще 9 персонажей
        }}
      >
        <div className="inner">load more</div>
      </button>
    </div>
  );
};

CharList.propTypes = {
  onCharacterSelected: PropTypes.func.isRequired,
};
export default CharList;
