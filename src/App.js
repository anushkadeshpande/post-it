import './App.css';
import Welcome from './screens/Welcome';
import NewProject from './screens/NewProject';
import GetContent from './screens/GetContent';
import {BrowserRouter as Router, Routes, Route} from "react-router-dom"
import SelectTheme from './screens/SelectTheme';

function App() {

  return (
    <div className="App">
<Router>
  <Routes>
    <Route path="/" element={<Welcome />} />
    <Route path="/new/:projectId" element={<NewProject />} />
    <Route path="/getContent/:projectId" element={<GetContent />} />
    <Route path="/selectTheme/:projectId" element={<SelectTheme />} />
     {/* 
     1. Create a project --- create a projects.json, put project name as object and inside that the theme, content, etc
     1. Get ip text
     2. Choose color theme and design
     */}
     </Routes>
     </Router>
    </div>
  );
}

export default App;
