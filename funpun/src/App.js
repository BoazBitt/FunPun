import './App.css';
import { BrowserRouter as Router, Routes, Route, useLocation } from "react-router-dom";
import { useLayoutEffect, Profiler } from 'react';


import Footer from './components/footer/Footer';
import Home from './components/Home/Home';
import Learn from './components/learn/Learn';
import Navbar from './components/NavBar/Navbar';
import Board from './components/Games/CardGame/Board';
import Jumble from './components/Games/WordJumble/WordsJumble'
import Whack from './components/Games/Whack/Whack';
import Test from './components/test/Test';
import Speech2Text from './components/speach/Speech2Text';
import Admin from './components/Admin/Admin';
import Teacher from './components/teacher/Teacher';


const Wrapper = ({ children }) => {
  const location = useLocation();
  useLayoutEffect(() => {
    document.documentElement.scrollTo(0, 0);
  }, [location.pathname]);
  return children
}


const App = () => {
  console.count('App.js:')
  function onRenderCallback(
    id, // the "id" prop of the Profiler tree that has just committed
    phase, // either "mount" (if the tree just mounted) or "update" (if it re-rendered)
    actualDuration, // time spent rendering the committed update
    baseDuration, // estimated time to render the entire subtree without memoization
    startTime, // when React began rendering this update
    commitTime, // when React committed this update
    interactions // the Set of interactions belonging to this update
  ) {
    // Aggregate or log render timings...
  }
  //VerbalTest
  return (
    <Profiler id="MyComponent" onRender={onRenderCallback}>
      <div>
        <Router>
          <Wrapper>
            <Navbar />
          </Wrapper>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/Learn" element={<Learn />} />
            <Route path="/Test" element={<Test />} />
            <Route path="/Jumble" element={<Jumble />} />
            <Route path="/VerbalTest" element={<Speech2Text />} />
            <Route path="/Whack" element={<Whack />} />
            <Route path="/CardGame" element={<Board />} />
            <Route path="/Admin" element={<Admin />} />
            <Route path="/Teacher" element={<Teacher />} />
          </Routes>
          <Footer />
        </Router>
      </div>
    </Profiler>
  );
}

export default App;


