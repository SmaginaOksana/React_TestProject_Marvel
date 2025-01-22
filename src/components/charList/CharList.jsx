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
  };

  marvelService = new MarvelService();

  componentDidMount() {
    this.updateAllCharacters();
  }

  updateAllCharacters = () => {
    this.marvelService
      .getAllCharacters()
      .then(this.onCharactersLoaded)
      .catch(this.onError);
  };

  onCharactersLoaded = (characters) => {
    this.setState({
      characters,
      loading: false,
    });
  };

  onError = () => {
    this.setState({ error: true });
  };

  render() {
    const { characters, loading, error } = this.state;
    const errorMessage = error ? <ErrorMessage /> : null;
    const spinner = loading ? <Spinner /> : null;
    const content = !(loading || error)
      ? characters.map((item) => {
          return (
            <li className="char__item" key={item.id}>
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
        <button className="button button__main button__long">
          <div className="inner">load more</div>
        </button>
      </div>
    );
  }
}

export default CharList;
