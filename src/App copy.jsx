import React, { useEffect, useRef, useState } from 'react';
import useFetch from './useFetch';
import './App.css';

function App() {
  const isComponentMounted = useRef(true);
  const { loading, error, headings, data } = useFetch(
    '1GEP9S0xt1JBPLs3m0DoEOaQdwxwD8CEPFOXyxlxIKkg',
    'GHIN_Numbers',
    isComponentMounted
  );

  function filterHeadings(heading) {
    return index < 6;
  }
  return (
    <div className='App'>
      {loading ? (
        <div>Loading data . . . </div>
      ) : (
        <>
          <table>
            <caption>
              <strong>TLC Handicap Indexes</strong>
            </caption>
            <thead>
              <tr>
                <th>No.</th>
                {headings
                  .filter((heading, index) => index < 6)
                  .map((heading) => (
                    <th>{heading}</th>
                  ))}
              </tr>
            </thead>
            <tbody>
              {data.map((player, index) => (
                <tr key={player['GHIN Number']}>
                  <td id='ghinNumber'>{index}</td>
                  <td>{player['GHIN Number']}</td>
                  <td>{player['Local Number']}</td>
                  <td>{player['First Name']}</td>
                  <td>{player['Last Name']}</td>
                  <td>{parseInt(player['H.I.'])}</td>
                  <td>{player['Gender']}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </>
      )}
    </div>
  );
}

export default App;
