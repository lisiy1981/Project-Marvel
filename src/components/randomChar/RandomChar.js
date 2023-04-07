import { Component } from "react";
import MarvelService from "../../services/MarvelService";
import Spinner from "../spinner/Spinner";
import ErrorMessage from "../errorMessage/ErrorMessage";
import mjolnir from "../../resources/img/mjolnir.png";
import "./randomChar.scss";

class RandomChar extends Component {
  //   state = {
  //     name: null,
  //     description: null,
  //     thumbnail: null,
  //     homepage: null,
  //     wiki: null,
  //   };

  state = {
    char: {},
    loading: true,
    error: false,
  };

  marvelService = new MarvelService();

  componentDidMount() {
    this.updateChar();
  }

  onCharLoaded = (char) => {
    this.setState({
      char,
      loading: false,
    });
  };

  onError = () => {
    this.setState({
      loading: false,
      error: true,
    });
  };

  //   onCharLoaded = (char) => {
  //     this.setState({
  //       char,
  //     });
  //   };
  updateChar = () => {
    this.setState({ loading: true });
    const id = Math.floor(Math.random() * (1011400 - 1011000) + 1011000);

    // this.marvelService.getCharacter(id).then((res) => {
    //   //   this.setState({
    //   //     name: res.data.results[0].name,
    //   //     description: res.data.results[0].description,
    //   //     thumbnail:
    //   //       res.data.results[0].thumbnail.path +
    //   //       "." +
    //   //       res.data.results[0].thumbnail.extension,
    //   //     homepage: res.data.results[0].urls[0].url,
    //   //     wiki: res.data.results[0].urls[1].url,
    //   //   });
    //   this.setState(res);
    // });
    this.marvelService
      .getCharacter(id)
      .then(this.onCharLoaded)
      .catch(this.onError);
  };

  render() {
    // const { name, description, thumbnail, homepage, wiki } = this.state;
    // const {
    //   char: { name, description, thumbnail, homepage, wiki },
    // } = this.state;

    const {
      // char: { name, description, thumbnail, homepage, wiki },
      char,
      loading,
      error,
    } = this.state;

    const errorMessage = error ? <ErrorMessage /> : null;
    const spinner = loading ? <Spinner /> : null;
    const content = !(loading || error) ? <View char={char} /> : null;

    return (
      <div className="randomchar">
        {/* {loading ? <Spinner /> : <View char={char} />} */}
        {errorMessage}
        {spinner}
        {content}
        {/* <div className="randomchar__block">
          <img
            src={thumbnail}
            alt="Random character"
            className="randomchar__img"
          />
          <div className="randomchar__info">
            <p className="randomchar__name">{name}</p>
            <p className="randomchar__descr">{description}</p>
            <div className="randomchar__btns">
              <a href={homepage} className="button button__main">
                <div className="inner">homepage</div>
              </a>
              <a href={wiki} className="button button__secondary">
                <div className="inner">Wiki</div>
              </a>
            </div>
          </div>
        </div> */}
        <div className="randomchar__static">
          <p className="randomchar__title">
            Random character for today!
            <br />
            Do you want to get to know him better?
          </p>
          <p className="randomchar__title">Or choose another one</p>
          <button className="button button__main" onClick={this.updateChar}>
            <div className="inner">try it</div>
          </button>
          <img src={mjolnir} alt="mjolnir" className="randomchar__decoration" />
        </div>
      </div>
    );
  }
}

const View = ({ char }) => {
  const { name, description, thumbnail, homepage, wiki } = char;
  const notDescription = description
    ? description
    : "There is no description for this character";
  const bigDescription =
    description.length > 209 ? `${description.slice(0, 210)}...` : description;

  let imgBig =
    "http://i.annihil.us/u/prod/marvel/i/mg/b/40/image_not_available.jpg";

  return (
    <div className="randomchar__block">
      <img
        src={thumbnail}
        alt="Random character"
        className="randomchar__img"
        style={{ objectFit: thumbnail === imgBig ? "contain" : "cover" }}
      />
      <div className="randomchar__info">
        <p className="randomchar__name">{name}</p>
        <p className="randomchar__descr">{bigDescription || notDescription}</p>
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
