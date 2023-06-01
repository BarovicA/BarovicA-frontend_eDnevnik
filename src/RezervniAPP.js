import './App.css';
import { useState, useEffect } from "react";
import oopsImage from './oops-smiley.jpg';


const SearchExample = () => {
  const [q, setQ] = useState("");
  const [subjects, setSubjects] = useState([]);
  const [error, setError] = useState("");

  useEffect(() => {
    let ignore = false;
    const fetchData = async () => {
      try {
        if (q === "") {
          let response = await fetch("http://localhost:8080/api/v1/subjects");
          let data = await response.json();
          if (!ignore) setSubjects(data);
        } else {
          let response = await fetch(`http://localhost:8080/api/v1/subjects/search/?name=${encodeURIComponent(q)}`);
          let data = await response.json();
          if (!ignore) setSubjects(data);
        }
      } catch (error) {
        console.error("Error fetching data:", error);
        setError("Error fetching data. Please try again later."); // Postavljanje poruke o grešci
      }
    };
    fetchData();
    return () => {
      ignore = true;
    };
  }, [q]);

  return (
    <>
    <div className='page'>
      <header className="subject_container_header">
        <label>
          <input type="text" className="input_field" placeholder="Search..." value={q} onChange={(e) => { setQ(e.target.value); }} />
        </label>
      </header>

      <div className='container'>
      {error ? (
            <div className="error_message">
              <img src={oopsImage} alt="Oops" />
              <p>{error}</p>
            </div>) : null}
        <div className="subject_container">
          {subjects.map((s) => <ShowBook key={s.id} subject={s} />)}
        </div>
      </div>
    </div>
  </>
);

};

const ShowBook = ({subject}) => {

  return <div className='subject_card'>
              {//naslov
              }
              <div className='subject_title_container'> 
                  <p className='subject_title'> {subject.name} </p>
              </div>
              {/*info*/}
              <div className='subject_info'>
                  {//<div>id:&nbsp;{subject.id}</div>
                  }
                  <br/>
                  <div>School year:&nbsp;{subject.year}</div>
                  <div>Semester:&nbsp;{subject.semester}</div>
                  <div>Weekly Hours:&nbsp;{subject.weeklyHours}</div>
                  <br/>
                  <div> <a href=''>Prikaži...</a> </div>

              </div>
         </div>

}

function App() {
  return (
      <div>
        <SearchExample />
      </div>
  );
}

export default App;

import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);