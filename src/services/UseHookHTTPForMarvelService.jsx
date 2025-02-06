import { useHttp } from "../hooks/http.hook";

const useHookHTTPForMarvelService = () => {
  const { loading, request, error, clearError } = useHttp();

  const _apiBase = `https://gateway.marvel.com/v1/public/`;
  const _apiKey = `de5c6b9cf58378ed1e0c9aea72c2dd20`;
  const _baseOffset = 210; // подгружка персонажей, начиная с 210-го

  const getAllCharacters = async (offset = _baseOffset) => {
    const res = await request(
      `${_apiBase}characters?limit=9&offset=${offset}&apikey=${_apiKey}`
    );

    // запускаем метод transform на каждом элементе массива res с помощью map
    // т.е. из каждого эл-та массива создастся объект в нужном нам виде и сохранится в новый массив
    return res.data.results.map(_transformCharacter);
  };

  const getCharacter = async (id) => {
    const res = await request(`${_apiBase}characters/${id}?apikey=${_apiKey}`);
    return _transformCharacter(res.data.results[0]);
  };

  const getAllComics = async (offset = 0) => {
    const res = await request(
      `${_apiBase}comics?orderBy=issueNumber&limit=8&offset=${offset}&apikey=${_apiKey}`
    );

    return res.data.results.map(_transformComics);
  };

  const getComic = async (id) => {
    if (!id) {
      return;
    }
    const res = await request(`${_apiBase}comics/${id}?apikey=${_apiKey}`);
    return _transformComics(res.data.results[0]);
  };

  // трансформируем полученные данные в нужный нам объект
  const _transformCharacter = (character) => {
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

  const _transformComics = (comics) => {
    return {
      id: comics.id,
      title: comics.title,
      description: comics.description || "There is no description",
      pageCount: comics.pageCount
        ? `${comics.pageCount} p.`
        : "No information about the number of pages",
      thumbnail: comics.thumbnail.path + "." + comics.thumbnail.extension,
      language: comics.textObjects[0]?.language || "en-us",
      // optional chaining operator
      price: comics.prices[0].price
        ? `${comics.prices[0].price}$`
        : "not available",
    };
  };

  return {
    loading,
    error,
    getAllCharacters,
    getCharacter,
    clearError,
    getAllComics,
    getComic,
  };
};

export default useHookHTTPForMarvelService;
