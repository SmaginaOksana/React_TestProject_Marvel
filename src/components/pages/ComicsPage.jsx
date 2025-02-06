import { useState } from "react";

import ComicsList from "../comicsList/ComicsList";
import SingleComicPage from "./SingleComicPage/SingleComicPage";

function ComicsPage() {
  return (
    <>
      <ComicsList />
      <SingleComicPage />
    </>
  );
}

export default ComicsPage;
