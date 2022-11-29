import './App.css';
import { BrowserRouter as Router, Switch, Route} from 'react-router-dom'
import Login from './pages/Login';
import ResetPassword from './pages/ResetPassword';
import Home from './pages/Home';
import NewsCard from './components/News/NewsCard';

function App() {
  return (
    <Router>
      <Switch>
        <Route exact path='/' component={Home}/>
        <Route exact path='/login' component={Login}></Route>
        <Route exact path='/login/forgotpassword' component={ResetPassword}></Route>
        <Route exact path='/temp' component={NewsCard}></Route>
      </Switch>
    </Router>
  );
}

export default App;
