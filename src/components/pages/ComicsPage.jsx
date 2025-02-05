import { useState } from "react";

import ComicsList from "../comicsList/ComicsList";
import SingleComic from "../singleComic/SingleComic";

function ComicsPage() {
  const [selectedComic, setSelectedComic] = useState(null);

  return (
    <>
      <ComicsList setSelectedComic={setSelectedComic} />
      <SingleComic selectedComic={selectedComic} />
    </>
  );
}

export default ComicsPage;
