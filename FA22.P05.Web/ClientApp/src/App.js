
import './App.css';
import { HomeScreen } from './Screens/Home';
import { WebAppBar } from "../src/Components/AppBar";
import { GlobalContextProvider } from "../src/Context/GlobalContext"


function App() {


  return (
    <GlobalContextProvider>

      <div className="App">
        <WebAppBar />
        <HomeScreen />
      </div>
    </GlobalContextProvider>
  );
}

export default App;
