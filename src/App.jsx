import React, { useEffect, useRef, useState } from 'react';
import useFetchRainLine from './useFetchRainLinejs';
import TLGAC from '/TLGAC.png';
import './App.css';

export default function App() {
  const isComponentMounted = useRef(true);
  const { loading, error, data, info } = useFetchRainLine(isComponentMounted);

  function sortCourse(a, b) {
    if (a[1] < b[1]) {
      return -1;
    }
    if (a[1] > b[1]) {
      return 1;
    }
    return 0;
  }
  let hasAdditionalInfo = false;
  let displayData;
  let hasNotes = false;
  if (!loading) {
    displayData = data.filter((item, index) => index > 0);
    displayData.sort(sortCourse);
    if (info[1][0]) {
      hasAdditionalInfo = true;
    }
    for (let i = 1; i < 6; i++) {
      if (data[i][4]) {
        hasNotes = true;
      }
    }
  }

  const yesNo = {
    Yes: 'Open',
    No: 'Closed',
  };
  return (
    <div className='App'>
      {loading ? (
        <div>Loading data . . . </div>
      ) : (
        <>
          <img
            className='tlgac'
            alt='The Landings Club'
            height='auto'
            src={TLGAC}
            width='650'></img>
          <h3>Golf Rain Line Report</h3>
          <h3>{data[1][0]}</h3>
          <table>
            <thead>
              <tr>
                <th>Open Courses</th>
                <th>Cart Path</th>
                {hasNotes && <th>Notes</th>}
                <th>Front Range</th>
                <th>Back Range</th>
              </tr>
            </thead>
            <tbody>
              {displayData
                .filter((item, index) => item[2] === 'Open')
                .map((item, index) => {
                  return (
                    <tr key={index}>
                      <td>{item[1]}</td>
                      <td>{item[3]}</td>
                      {hasNotes && <td>{item[4]}</td>}
                      {item[5] === 'Yes' ? <td>{item[6]}</td> : <td>Closed</td>}
                      <td>{yesNo[item[7]]}</td>
                    </tr>
                  );
                })}
            </tbody>
          </table>
          {hasAdditionalInfo && (
            <>
              <h4>Additional Information</h4>
              <textarea readOnly={true} value={info[1][0]} />
            </>
          )}
        </>
      )}
    </div>
  );
}
