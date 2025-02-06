import { Component, useEffect, useState } from "react";

import MarvelService from "../../services/MarvelService";
import useHookHTTPForMarvelService from "../../services/UseHookHTTPForMarvelService";
import Spinner from "../spinner/Spinner";
import ErrorMessage from "../errorMessage/ErrorMessage";
import Skeleton from "../skeleton/Skeleton";

import "./charInfo.scss";

// class CharInfo extends Component {
//   state = {
//     character: null,
//     loading: false,
//     error: false,
//   };

//   marvelService = new MarvelService();

//   componentDidMount() {
//     this.updateChar();
//   }

//   componentDidUpdate(prevProps, prevState) {
//     if (this.props.characterId !== prevProps.characterId) {
//       this.updateChar();
//     }
//   }

//   updateChar = () => {
//     const { characterId } = this.props;
//     if (!characterId) {
//       return;
//     }

//     this.onCharacterLoading();

//     this.marvelService
//       .getCharacter(characterId)
//       .then(this.onCharacterLoaded)
//       .catch(this.onError);
//   };

//   onCharacterLoading = () => {
//     this.setState({
//       loading: true,
//     });
//   };

//   onCharacterLoaded = (character) => {
//     this.setState({ character, loading: false }); // сокращенно от { character: character } т.к. название св-ва стейт и аргумента совпадают
//   };

//   onError = () => {
//     this.setState({ loading: false, error: true });
//   };

//   render() {
//     const { loading, error, character } = this.state;

//     const skeleton = character || loading || error ? null : <Skeleton />;
//     const errorMessage = error ? <ErrorMessage /> : null;
//     const spinner = loading ? <Spinner /> : null;
//     const content =
//       !(loading || error) && character ? <View character={character} /> : null;

//     return (
//       <div className="char__info">
//         {skeleton}
//         {errorMessage}
//         {spinner}
//         {content}
//       </div>
//     );
//   }
// }

// const View = ({ character }) => {
//   const { name, description, thumbnail, homepage, wiki, comics } = character;

//   const styleOfThumbnail = thumbnail.includes("not_available")
//     ? "contain"
//     : "cover";
//   const comicsList = comics.filter((item, index) => index < 10);

//   return (
//     <>
//       <div className="char__basics">
//         <img
//           src={thumbnail}
//           alt={name}
//           style={{ objectFit: styleOfThumbnail }}
//         />
//         <div>
//           <div className="char__info-name">{name}</div>
//           <div className="char__btns">
//             <a href="#" className="button button__main">
//               <div className="inner">{homepage}</div>
//             </a>
//             <a href="#" className="button button__secondary">
//               <div className="inner">{wiki}</div>
//             </a>
//           </div>
//         </div>
//       </div>
//       <div className="char__descr">{description}</div>
//       <div className="char__comics">Comics:</div>
//       {comics.length ? (
//         <ul className="char__comics-list">
//           {comicsList.map((item, index) => {
//             return (
//               <li className="char__comics-item" key={index}>
//                 {item.name}
//               </li>
//             );
//           })}
//         </ul>
//       ) : (
//         <p>There are no comics with this character ...</p>
//       )}
//     </>
//   );
// };

// export default CharInfo;

const CharInfo = ({ characterId }) => {
  const [character, setCharacter] = useState(null);

  const { loading, error, getCharacter, clearError } =
    useHookHTTPForMarvelService();

  useEffect(() => {
    updateChar();
  }, [characterId]);

  const updateChar = () => {
    if (!characterId) {
      return;
    }

    clearError(); // на случай, если описание персонажа не найдено в БД и не загрузилось,
    // то выскочит ошибка (у нас в catch в хуке), то код дальше не пойдет, поэтому очищаем,
    // чтобы при след нажании на для загрузки инфы нового персонажа она загрузилась

    getCharacter(characterId).then(onCharacterLoaded);
  };

  const onCharacterLoaded = (character) => {
    setCharacter(character); // сокращенно от { character: character } т.к. название св-ва стейт и аргумента совпадают
  };

  const skeleton = character || loading || error ? null : <Skeleton />;
  const errorMessage = error ? <ErrorMessage /> : null;
  const spinner = loading ? <Spinner /> : null;
  const content =
    !(loading || error) && character ? <View character={character} /> : null;

  return (
    <div className="char__info">
      {skeleton}
      {errorMessage}
      {spinner}
      {content}
    </div>
  );
};

const View = ({ character }) => {
  const { name, description, thumbnail, homepage, wiki, comics } = character;

  const styleOfThumbnail = thumbnail.includes("not_available")
    ? "contain"
    : "cover";
  const comicsList = comics.filter((item, index) => index < 10);

  return (
    <>
      <div className="char__basics">
        <img
          src={thumbnail}
          alt={name}
          style={{ objectFit: styleOfThumbnail }}
        />
        <div>
          <div className="char__info-name">{name}</div>
          <div className="char__btns">
            <a href="#" className="button button__main">
              <div className="inner">{homepage}</div>
            </a>
            <a href="#" className="button button__secondary">
              <div className="inner">{wiki}</div>
            </a>
          </div>
        </div>
      </div>
      <div className="char__descr">{description}</div>
      <div className="char__comics">Comics:</div>
      {comics.length ? (
        <ul className="char__comics-list">
          {comicsList.map((item, index) => {
            return (
              <li className="char__comics-item" key={index}>
                {item.name}
              </li>
            );
          })}
        </ul>
      ) : (
        <p>There are no comics with this character ...</p>
      )}
    </>
  );
};

export default CharInfo;
