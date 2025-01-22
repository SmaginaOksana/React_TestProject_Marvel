import { Component } from "react";
import Spinner from "../spinner/Spinner";
import ErrorMessage from "../errorMessage/ErrorMessage";
import "./randomChar.scss";
import mjolnir from "../../resources/img/mjolnir.png";
import MarvelService from "../../services/MarvelService";

class RandomChar extends Component {
  state = {
    character: {},
    loading: true,
    error: false,
  };

  marvelService = new MarvelService();
  // методы сервисов можно сделать статическими (прописать static у всех методов), не требующими создания экз класса,
  // тогда не создаем поле marvelService и просто обращаемся к сервисам ниже (строка 31)

  componentDidMount() {
    this.updateChar();
    // this.timerId = setInterval(this.updateChar, 3000); // просто отключили
  }

  componentWillUnmount() {
    clearInterval(this.timerId);
  }

  onCharacterLoading = () => {
    this.setState({
      loading: true,
    });
  };

  onCharacterLoaded = (character) => {
    this.setState({ character, loading: false }); // сокращенно от { character: character } т.к. название св-ва стейт и аргумента совпадают
  };

  onError = () => {
    this.setState({ loading: false, error: true });
  };

  updateChar = () => {
    const id = Math.floor(Math.random() * (1011400 - 1011000) + 1011000);
    this.onCharacterLoading();
    // MarvelService.getCharacter(id).then((res) => {
    this.marvelService
      .getCharacter(id)
      .then(
        this.onCharacterLoaded // т.к. у нас в then передается ссылка на ф-ю,
        // то можем не исп-ть call-back с responce, аргумент responce автом-ки передастся в эту ф-ю
      )
      .catch(this.onError);
  };

  render() {
    const { character, loading, error } = this.state;
    const errorMessage = error ? <ErrorMessage /> : null;
    const spinner = loading ? <Spinner /> : null;
    const content = !(loading || error) ? <View char={character} /> : null;

    return (
      <>
        <div className="randomchar">
          {errorMessage}
          {spinner}
          {content}
          <div className="randomchar__static">
            <p className="randomchar__title">
              Random character for today!
              <br />
              Do you want to get to know him better?
            </p>
            <p className="randomchar__title">Or choose another one</p>
            <button onClick={this.updateChar} className="button button__main">
              <div className="inner">try it</div>
            </button>
            <img
              src={mjolnir}
              alt="mjolnir"
              className="randomchar__decoration"
            />
          </div>
        </div>
      </>
    );
  }
}

const View = ({ char }) => {
  const { name, description, thumbnail, homepage, wiki } = char;
  const newDescription = description.length
    ? description.slice(0, 150) + " ..."
    : null;
  const styleOfThumbnail = thumbnail.includes("not_available")
    ? "contain"
    : "cover";

  return (
    <div className="randomchar__block">
      <img
        style={{ objectFit: styleOfThumbnail }}
        src={thumbnail}
        alt="Random character"
        className="randomchar__img"
      />
      <div className="randomchar__info">
        <p className="randomchar__name">{name}</p>
        <p className="randomchar__descr">
          {newDescription
            ? newDescription
            : "There is no description for this character"}
        </p>
        <div className="randomchar__btns">
          <a href={homepage} className="button button__main">
            <div className="inner">homepage</div>
          </a>
          <a href={wiki} className="button button__secondary">
            <div className="inner">Wiki</div>
          </a>
        </div>
      </div>
    </div>
  );
};

export default RandomChar;
