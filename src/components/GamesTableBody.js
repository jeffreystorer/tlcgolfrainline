import React from 'react';
import createGamesTableBodyRows from '../functions/createGamesTableBodyRows.js';

const GamesTableBody = ({showFirstName, course, game, games, teesSelected, ratings, slopes, pars}) => {  
  let rows = createGamesTableBodyRows(showFirstName, course, game, games, teesSelected, ratings, slopes, pars);
  let rowsTD = [];
  let colCount = rows[0].length;

  function generateRows (){
    for (var i = 0; i <rows.length; i++){
      rowsTD[i] = (
        <tr key={i}>
          <td className="game-left-row-cell">{rows[i][0]}</td>
          {generateCols(i)}
        </tr>
      )
    }
    return rowsTD;
  }

  function generateCols(i) {
      let tds = [];
      for (var j = 1; j < colCount; j++){
        tds[j] = (
          <td className='game-other-row-cell' key={j}>
            {rows[i][j]}
          </td>
        )
      }
    return tds;

  }
  
  return (
      <>
        {generateRows()}
      </>
  );

}

export default GamesTableBody;