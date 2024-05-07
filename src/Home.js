import React from 'react';
import { Link } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import MoviesList from './MoviesList';


function Home() {
  return (
    <div className="container-fluid">
      <div className="row">
        <div className="col">
          <nav className="navbar navbar-light" style={{ height: '15vh', backgroundColor: 'blue' }}>
            <div className="container-fluid d-flex justify-content-between align-items-center">
              <Link to="/logout" className="btn btn-outline-light">Logout</Link>
              <Link to="/add-Movie">ADD MOVIES</Link>
              
            </div>
          </nav>
        </div>
      </div>
      <MoviesList/>
    </div>
  );
}

export default Home;

