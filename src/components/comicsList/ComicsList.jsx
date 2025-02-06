import "./comicsList.scss";
import useHookHTTPForMarvelService from "../../services/UseHookHTTPForMarvelService";
import { useEffect, useState } from "react";
import Spinner from "../spinner/Spinner";
import ErrorMessage from "../errorMessage/ErrorMessage";
import { NavLink } from "react-router-dom";

const ComicsList = () => {
  const [allComics, setAllComics] = useState([]);
  const [newItemsLoading, setNewItemsLoading] = useState(false);
  const [offset, setOffset] = useState(0);
  const [comicsEnded, setComicsEnded] = useState(false);

  const { loading, error, getAllComics } = useHookHTTPForMarvelService();

  useEffect(() => {
    onRequest(offset, true);
  }, []);

  const onRequest = (offset, flag) => {
    getAllComics(offset).then(onAllComicsLoaded);
    flag ? setNewItemsLoading(false) : setNewItemsLoading(true);
  };

  const onAllComicsLoaded = (comics) => {
    let ended = false;
    if (comics.length < 8) {
      ended = true;
    }

    setNewItemsLoading(false);
    setComicsEnded(ended);

    setAllComics((allComics) => {
      // проверка на дублирование комиксов при первичном монтировании компонента
      // (в стрикт моде useEffect исполняется 2 раза, поэтому 2 запроса и 2 одинаковых массива)
      let newStateComics =
        allComics[0]?.id === comics[0].id
          ? [...comics]
          : [...allComics, ...comics];
      return newStateComics;
    });

    setOffset((offset) => {
      // проверка на прибавление 9 лишний раз при первичном монтировании компонента
      // (в стрикт моде useEffect исполняется 2 раза, поэтому 2 раза прибавляет девятку вместо 1 раза)
      let newOffset = offset === 8 ? offset : offset + 8;
      return newOffset;
    });
  };

  const spinner = loading && !newItemsLoading ? <Spinner /> : null;
  const errorMessage = error ? <ErrorMessage /> : null;
  const content = allComics?.map((item, i) => {
    const { thumbnail, id, title, price } = item;
    return (
      <li className="comics__item" key={i}>
        <NavLink to={`/comics/${id}`}>
          <img src={thumbnail} alt={title} className="comics__item-img" />
          <div className="comics__item-name">{title}</div>
          <div className="comics__item-price">{price} $</div>
        </NavLink>
      </li>
    );
  });

  return (
    <div className="comics__list">
      {spinner}
      {errorMessage}
      <ul className="comics__grid">{content}</ul>
      <button
        disabled={newItemsLoading}
        onClick={() => onRequest(offset, false)}
        className="button button__main button__long"
      >
        <div className="inner">load more</div>
      </button>
    </div>
  );
};

export default ComicsList;
