import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { Home, Login, Signup } from '../pages';
import { Loader, Navbar } from './';
import { useAuth } from '../hooks';

function App() {
  const auth = useAuth();
  if (auth.loading) {
    return <Loader />;
  }

  return (
    <div className="App">
      <Router>
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/Signup" element={<Signup />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
