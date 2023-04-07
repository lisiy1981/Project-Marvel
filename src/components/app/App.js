import { Component } from "react";

import AppHeader from "../appHeader/AppHeader";
import RandomChar from "../randomChar/RandomChar";
import CharList from "../charList/CharList";
import CharInfo from "../charInfo/CharInfo";

import decoration from "../../resources/img/vision.png";

// const App = () => {
//   return (
//     <div className="app">
//       <AppHeader />
//       <main>
//         <RandomChar />
//         <div className="char__content">
//           <CharList />
//           <CharInfo />
//         </div>
//         <img className="bg-decoration" src={decoration} alt="vision" />
//       </main>
//     </div>
//   );
// };

//TODO: тест с жизненными циклами
// class App extends Component {
//   state = {
//     showRandomChar: true,
//   };

//   toggleRandomChar = () => {
//     return this.setState((state) => ({
//       showRandomChar: !state.showRandomChar,
//     }));
//   };

//   render() {
//     return (
//       <div className="app">
//         <AppHeader />
//         <main>
//           {/* {this.state.showRandomChar ? <RandomChar /> : null}
//           <button onClick={this.toggleRandomChar}>Click toggle</button> */}
//           <div className="char__content">
//             <CharList />
//             <CharInfo />
//           </div>
//           <img className="bg-decoration" src={decoration} alt="vision" />
//         </main>
//       </div>
//     );
//   }
// }

class App extends Component {
  // state = {
  //   showRandomChar: true,
  // };

  // toggleRandomChar = () => {
  //   this.setState((state) => {
  //     return {
  //       showRandomChar: !state.showRandomChar,
  //     };
  //   });
  // };

  state = {
    selectedChar: null,
  };

  onCharSelected = (id) => {
    this.setState({
      selectedChar: id,
    });
  };

  render() {
    return (
      <div className="app">
        <AppHeader />
        <main>
          {/* {this.state.showRandomChar ? <RandomChar /> : null}
          <button onClick={this.toggleRandomChar}>Click me</button> */}
          <RandomChar />
          <div className="char__content">
            {/* <CharList />
            <CharInfo /> */}
            <CharList onCharSelected={this.onCharSelected} />
            <CharInfo charId={this.state.selectedChar} />
          </div>
          <img className="bg-decoration" src={decoration} alt="vision" />
        </main>
      </div>
    );
  }
}

export default App;
