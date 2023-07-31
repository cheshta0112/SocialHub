import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
} from 'react-router-dom';
import { Home, Login, Signup, Settings } from '../pages';
import { Loader, Navbar } from './';
import { useAuth } from '../hooks';

// function PrivateRoute({ children, ...rest }) {
//   const auth = useAuth();
//   return (
//     <Route
//       {...rest}
//       render={() => {
//         if (auth.user) {
//           return children;
//         }
//         return <Navigate to="/Login" />;
//       }}
//     />
//   );
// }

function PrivateRoute({ children }) {
  const auth = useAuth();
  if (auth.user) {
    return children;
  } else {
    return <Navigate to="/login" exact />;
  }
}

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
          <Route
            exact
            path="/settings"
            element={
              <PrivateRoute>
                <Settings />
              </PrivateRoute>
            }
          />

          {/* <Route path="/Settings" element={<Settings />} /> */}
          {/* <PrivateRoute path="/Settings" element={<Settings />} /> */}
          {/* 
          <Route
            path="/Settings"
            element={
              <PrivateRoute>
                <Settings />
              </PrivateRoute>
            }
          /> */}
        </Routes>
      </Router>
    </div>
  );
}

export default App;

// import {
//   BrowserRouter as Router,
//   Route,
//   Routes,
//   Navigate,
// } from 'react-router-dom';
// import { Home, Login, Signup, Settings } from '../pages';
// import { Loader, Navbar } from './';
// import { useAuth } from '../hooks';

// function PrivateRoute({ children, ...rest }) {
//   const auth = useAuth();
//   return (
//     <Route
//       {...rest}
//       render={() => {
//         if (auth.user) {
//           return children;
//         }
//         return <Navigate to="/Login" />;
//       }}
//     />
//   );
// }

// function App() {
//   const auth = useAuth();
//   if (auth.loading) {
//     return <Loader />;
//   }

//   return (
//     <div className="App">
//       <Router>
//         <Navbar />
//         <Routes>
//           <Route path="/" element={<Home />} />
//           <Route path="/login" element={<Login />} />
//           <Route path="/Signup" element={<Signup />} />
//           <Route
//             path="/Settings"
//             element={
//               <PrivateRoute>
//                 <Settings />
//               </PrivateRoute>
//             }
//           />
//         </Routes>
//       </Router>
//     </div>
//   );
// }

// export default App;
