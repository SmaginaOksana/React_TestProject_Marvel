import { useEffect, useState } from "react";
import { useParams, NavLink } from "react-router-dom";

import useHookHTTPForMarvelService from "../../../services/UseHookHTTPForMarvelService";
import Spinner from "../../spinner/Spinner";
import ErrorMessage from "../../errorMessage/ErrorMessage";

import "./SingleComicPage.scss";

const SingleComicPage = () => {
  const { comicId } = useParams();

  const [singleComic, setSingleComic] = useState({});

  const { loading, error, getComic, clearError } =
    useHookHTTPForMarvelService();

  useEffect(() => {
    updateComic();
  }, [comicId]);

  const updateComic = () => {
    clearError();
    getComic(comicId).then(onComicLoaded);
  };

  const onComicLoaded = (comic) => {
    setSingleComic({ ...comic });
  };

  const spinner = loading ? <Spinner /> : null;
  const errorMessage = error ? <ErrorMessage /> : null;

  const { title, thumbnail, description, pageCount, language, price } =
    singleComic;

  const content =
    Object.keys(singleComic).length !== 0 ? (
      <div className="single-comic">
        <img src={thumbnail} alt={title} className="single-comic__img" />
        <div className="single-comic__info">
          <h2 className="single-comic__name">{title}</h2>
          <p className="single-comic__descr">{description}</p>
          <p className="single-comic__descr">{pageCount}</p>
          <p className="single-comic__descr">Language: {language}</p>
          <div className="single-comic__price">{price} $</div>
        </div>
        <NavLink to="/comics" className="single-comic__back">
          Back to all
        </NavLink>
      </div>
    ) : null;

  return (
    <>
      {spinner}
      {errorMessage}
      {content}
    </>
  );
};

export default SingleComicPage;
