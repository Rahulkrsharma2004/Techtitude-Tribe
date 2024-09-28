// import React from 'react';
import { BrowserRouter as Router, Route, Switch, Link } from 'react-router-dom';
import StudentList from './components/StudentList';
import ExcelUpload from './components/UploadExcel';

const App = () => {
  return (
    <Router>
      <div className="min-h-screen bg-gray-100">
        <nav className="bg-blue-600 p-4">
          <ul className="flex space-x-4">
            <li>
              <Link to="/" className="text-white hover:underline">
                Student List
              </Link>
            </li>
            <li>
              <Link to="/upload" className="text-white hover:underline">
                Upload Excel
              </Link>
            </li>
          </ul>
        </nav>
        <div className="p-4">
          <Switch>
            <Route path="/" exact component={StudentList} />
            <Route path="/upload" component={ExcelUpload} />
          </Switch>
        </div>
      </div>
    </Router>
  );
};

export default App;
