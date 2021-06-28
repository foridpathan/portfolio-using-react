import './recourses/css/style.css'
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js//bootstrap.bundle'

import { BrowserRouter } from 'react-router-dom';
import Routes from './routes';

function App(props) {
  return (
    <BrowserRouter>
      <Routes {...props} />
    </BrowserRouter>
  );
}

export default App;
