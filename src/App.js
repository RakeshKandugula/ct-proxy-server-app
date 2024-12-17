import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import HomePage from './home';
import ToolPage1 from './Components/Upload';
import AboutToolPage1 from "./Components/About"

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/STEPXMLGenerator" element={<ToolPage1 />} />
        <Route path="/tool/About/ExcelToXml" element={<AboutToolPage1 />} />
        <Route path="/" element={<HomePage />} />
      </Routes>
    </Router>
  );
}

export default App;
