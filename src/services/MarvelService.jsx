class MarvelService {
  _apiBase = `https://gateway.marvel.com:443/v1/public/`;
  _apiKey = `de5c6b9cf58378ed1e0c9aea72c2dd20`;
  _baseOffset = 210; // подгружка персонажей, начиная с 210-го

  getData = async (url) => {
    const res = await fetch(url);

    if (!res.ok) {
      throw new Error(`Couldn't fetch ${url}, status ${res.status}`);
    }

    return await res.json();
  };

  getAllCharacters = async (offset = this._baseOffset) => {
    const res = await this.getData(
      `${this._apiBase}characters?limit=9&offset=${offset}&apikey=${this._apiKey}`
    );

    // запускаем метод transform на каждом элементе массива res с помощью map
    // т.е. из каждого эл-та массива создастся объект в нужном нам виде и сохранится в новый массив
    return res.data.results.map(this._transformCharacter);
  };

  getCharacter = async (id) => {
    const res = await this.getData(
      `${this._apiBase}characters/${id}?apikey=${this._apiKey}`
    );
    return this._transformCharacter(res.data.results[0]);
  };

  // трансформируем полученные данные в нужный нам объект
  _transformCharacter = (character) => {
    return {
      id: character.id,
      name: character.name,
      description: character.description,
      thumbnail: character.thumbnail.path + `.` + character.thumbnail.extension,
      homepage: character.urls[0].url,
      wiki: character.urls[1].url,
      comics: character.comics.items,
    };
  };
}

export default MarvelService;
