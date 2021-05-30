import './App.css';
import Content from './Content';
import NewUser from './NewUser';
import Chat from './Chat'
import {BrowserRouter as Router,Route,Switch} from 'react-router-dom'

function App() {
  return (
    <Router>
      <Switch>
        <Route exact path="/">
          <Content/>
        </Route>
        <Route path="/NewUser">
          <NewUser/>
        </Route>
        <Route path="/Chat">
          <Chat/>
        </Route>
        </Switch>
    </Router>
  );
}

export default App;
