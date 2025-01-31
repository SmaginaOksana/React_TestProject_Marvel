import { Component, useState } from "react";
import AppHeader from "../appHeader/AppHeader";
import RandomChar from "../randomChar/RandomChar";
import CharList from "../charList/CharList";
import CharInfo from "../charInfo/CharInfo";

import decoration from "../../resources/img/vision.png";

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
  const [selectedCharacter, setSelectedCharacter] = useState(null);

  const onCharacterSelected = (id) => {
    setSelectedCharacter(id);
  };

  {
    return (
      <div className="app">
        <AppHeader />
        <main>
          <RandomChar />
          <div className="char__content">
            <CharList onCharacterSelected={onCharacterSelected} />
            <CharInfo characterId={selectedCharacter} />
          </div>
          <img className="bg-decoration" src={decoration} alt="vision" />
        </main>
      </div>
    );
  }
};

export default App;
