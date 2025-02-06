import { Component, useState } from "react";
import AppHeader from "../appHeader/AppHeader";
import RandomChar from "../randomChar/RandomChar";
import CharList from "../charList/CharList";
import CharInfo from "../charInfo/CharInfo";
import ComicsList from "../comicsList/ComicsList";
import decoration from "../../resources/img/vision.png";
import ErrorBoundary from "../ErrorBoundary/ErrorBoundary";
import { MainPage, ComicsPage, SingleComicPage } from "../pages";
import Page404 from "../pages/Page404";

import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

// class App extends Component {
//   state = {
//     selectedCharacter: null,
//   };

//   onCharacterSelected = (id) => {
//     this.setState({
//       selectedCharacter: id,
//     });
//   };

//   render() {
//     return (
//       <div className="app">
//         <AppHeader />
//         <main>
//           <RandomChar />
//           <div className="char__content">
//             <CharList onCharacterSelected={this.onCharacterSelected} />
//             <CharInfo characterId={this.state.selectedCharacter} />
//           </div>
//           <img className="bg-decoration" src={decoration} alt="vision" />
//         </main>
//       </div>
//     );
//   }
// }
// export default App;

const App = () => {
  return (
    <Router>
      <div className="app">
        <AppHeader />
        <main>
          <Routes>
            <Route path="/" element={<MainPage />} />
            <Route path="/comics" element={<ComicsPage />} />
            <Route path="/comics/:comicId" element={<SingleComicPage />} />
            <Route path="*" element={<Page404 />} />
          </Routes>
        </main>
      </div>
    </Router>
  );
};

export default App;
