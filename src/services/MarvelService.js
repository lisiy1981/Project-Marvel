const API_KEY = process.env.REACT_APP_API_KEY;

class MarvelService {
  _apiBase = "https://gateway.marvel.com:443/v1/public/";
  _apiKey = `apikey=${API_KEY}`;
  _baseOffset = 210;

  getResource = async (url) => {
    let res = await fetch(url);

    if (!res.ok) {
      throw new Error(`Could not fetch ${url}, status: ${res.status}`);
    }

    return await res.json();
  };

  //   getAllCharacters = () => {
  //     return this.getResurce(
  //       "https://gateway.marvel.com:443/v1/public/characters?limit=9&offset=210&apikey=0fe6881ee5195d5e1e316da8631e3a6b"
  //     );
  //   };
  getAllCharacters = async (offset = this._baseOffset) => {
    const res = await this.getResource(
      `${this._apiBase}characters?limit=9&offset=${offset}&${this._apiKey}`
    );
    return res.data.results.map(this._transformCharacter);
  };

  // getCharacter = (id) => {
  //   return this.getResurce(`${this._apiBase}characters/${id}?${this._apiKey}`);
  // };

  getCharacter = async (id) => {
    const res = await this.getResource(
      `${this._apiBase}characters/${id}?${this._apiKey}`
    );
    // return this._transformCharacter(res);
    return this._transformCharacter(res.data.results[0]);
  };
  // getCharacters = (id) => {
  //   return this.getResurce(
  //     `https://gateway.marvel.com:443/v1/public/characters/${id}?apikey=0fe6881ee5195d5e1e316da8631e3a6b`
  //   );
  // };
  // _transformCharacter = (res) => {
  //   return {
  //     name: res.data.results[0].name,
  //     description: res.data.results[0].description,
  //     thumbnail:
  //       res.data.results[0].thumbnail.path +
  //       "." +
  //       res.data.results[0].thumbnail.extension,
  //     homepage: res.data.results[0].urls[0].url,
  //     wiki: res.data.results[0].urls[1].url,
  //   };
  // };

  _transformCharacter = (char) => {
    return {
      comics: char.comics.items,
      id: char.id,
      name: char.name,
      description: char.description,
      thumbnail: char.thumbnail.path + "." + char.thumbnail.extension,
      homepage: char.urls[0].url,
      wiki: char.urls[1].url,
    };
  };
}
export default MarvelService;
