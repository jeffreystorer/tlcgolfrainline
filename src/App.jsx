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
  let isAdditionalInfo = false;
  let displayData;
  if (!loading) {
    displayData = data.filter((item, index) => index > 0);
    displayData.sort(sortCourse);
    if (info[1][0]) {
      isAdditionalInfo = true;
    }
  }
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
                <th>Notes</th>
                <th>Front Range Open</th>
                <th></th>
                <th>Back Range Open</th>
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
                      <td>{item[4]}</td>
                      <td>{item[5]}</td>
                      <td>{item[6]}</td>
                      <td>{item[7]}</td>
                    </tr>
                  );
                })}
            </tbody>
          </table>
          {isAdditionalInfo && (
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
