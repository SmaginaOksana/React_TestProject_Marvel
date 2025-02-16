import { Component, useState, lazy, Suspense } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Spinner } from "react-bootstrap";
import AppHeader from "../appHeader/AppHeader";
import RandomChar from "../randomChar/RandomChar";
import CharList from "../charList/CharList";
import CharInfo from "../charInfo/CharInfo";
import ComicsList from "../comicsList/ComicsList";
import decoration from "../../resources/img/vision.png";
import ErrorBoundary from "../ErrorBoundary/ErrorBoundary";
import {
  ComicsPage,
  SinglePage,
  SingleComicLayout,
  SingleCharacterLayout,
} from "../pages";

const Page404 = lazy(() => import("../pages/Page404"));
const MainPage = lazy(() => import("../pages/MainPage"));

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
          <Suspense fallback={<Spinner />}>
            <Routes>
              <Route path="/" element={<MainPage />} />
              <Route path="/comics" element={<ComicsPage />} />
              <Route
                path="/comics/:id"
                element={
                  <SinglePage Component={SingleComicLayout} dataType="comic" />
                }
              />
              <Route
                path="/characters/:id"
                element={
                  <SinglePage
                    Component={SingleCharacterLayout}
                    dataType="character"
                  />
                }
              />
              <Route path="*" element={<Page404 />} />
            </Routes>
          </Suspense>
        </main>
      </div>
    </Router>
  );
};

export default App;
