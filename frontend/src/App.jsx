import { Route } from "react-router-dom";
import Home from "./Pages/Home";
import Chat from "./Pages/Chat";

function App() {

  return (
    <>
      <div className="App">
      <Route exact path="/" component={Home} />
      <Route path="/chat" component={Chat} />
      </div>
    </>
  )
}

export default App
