import { useState, useCallback } from "react";

export const useHttp = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [process, setProcess] = useState("waiting"); // for state-machine

  const request = useCallback(
    async (
      url,
      method = "GET",
      body = null,
      headers = {
        "Content-Type": "application/json",
      }
    ) => {
      setLoading(true);
      setProcess("loading"); // for state-machine

      try {
        const responce = await fetch(url, { method, body, headers });

        if (!responce.ok) {
          throw new Error(`Couldn't fetch ${url}, status ${responce.status}`);
        }

        const data = await responce.json();

        setLoading(false);
        // т.к. загрузка данных с сервера у нас асинхронная, то мы не можем менять состояние
        // process (confirmed) раньше, чем данные получены, т.к. в противном случае на стадии
        // switch case в charInfo в setContent запишется пустой массив с character
        // поэтому состояние process будем менять в charInfo после получения данных с сервера
        // setProcess("confirmed"); // for state-machine

        return data;
      } catch (e) {
        setLoading(false);
        setError(e.message);
        setProcess("error"); // for state-machine
        throw e;
      }
    },
    []
  );

  const clearError = useCallback(() => {
    setProcess("loading"); // for state-machine
    setError(null);
  }, []);

  return { loading, request, error, clearError, process, setProcess };
};
