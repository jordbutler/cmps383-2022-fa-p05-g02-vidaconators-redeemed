
import './App.css';
import { HomeScreen } from './Screens/Home';
import { WebAppBar } from "../src/Components/AppBar";



function App() {


  return (
    <div className="App">
      <WebAppBar />
      <HomeScreen />
    </div>
  );
}

export default App;
