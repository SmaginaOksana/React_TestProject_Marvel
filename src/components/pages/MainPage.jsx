import { useState } from "react";

import RandomChar from "../randomChar/RandomChar";
import CharList from "../charList/CharList";
import CharInfo from "../charInfo/CharInfo";
import ErrorBoundary from "../ErrorBoundary/ErrorBoundary";
import decoration from "../../resources/img/vision.png";

function MainPage() {
  const [selectedCharacter, setSelectedCharacter] = useState(null);
  const onCharacterSelected = (id) => {
    setSelectedCharacter(id);
  };
  return (
    <>
      <ErrorBoundary>
        <RandomChar />
      </ErrorBoundary>
      <div className="char__content">
        <ErrorBoundary>
          <CharList onCharacterSelected={onCharacterSelected} />
        </ErrorBoundary>
        <ErrorBoundary>
          <CharInfo characterId={selectedCharacter} />
        </ErrorBoundary>
      </div>
      <img className="bg-decoration" src={decoration} alt="vision" />
    </>
  );
}

export default MainPage;
