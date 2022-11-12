import React, { useEffect, useRef, useState } from 'react';
import useFetchRoster from './useFetchRainLine';
import './App.css';

export default function App() {
  const isComponentMounted = useRef(true);
  const { loading, error, data } = useFetchRoster(isComponentMounted);
  function sortLastName(a, b) {
    if (a[3] < b[3]) {
      return -1;
    }
    if (a[3] > b[3]) {
      return 1;
    }
    return 0;
  }

  let displayData;
  if (data) {
    displayData = data.filter((item, index) => index > 0);
    const upper = displayData.map((item) => {
      item[3] =
        item[3].charAt(0).toUpperCase() + item[3].substring(1).toLowerCase();
      return item;
    });
    displayData = upper;
    displayData.sort(sortLastName);
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
                {/* <th>No.</th> */}
                {data[0]
                  .filter(
                    (item, index) => index < 5 && index !== 1 && index !== 2
                  )
                  .map((item, index) => (
                    <th key={index}>{item}</th>
                  ))}
              </tr>
            </thead>
            <tbody>
              {displayData
                .filter((item, index) => item[5] === 'Male')
                .map((item, index) => (
                  <tr key={item[0]}>
                    {/* <td id='ghinNumber'>{index}</td> */}
                    <td>{item[0]}</td>
                    {/* <td>{item[1]}</td> */}
                    {/* <td>{item[2]}</td> */}
                    <td>{item[3]}</td>
                    <td>{item[4]}</td>
                    {/* <td>{item[5]}</td> */}
                  </tr>
                ))}
            </tbody>
          </table>
        </>
      )}
    </div>
  );
}
