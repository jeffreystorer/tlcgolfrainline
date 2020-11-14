import React from 'react';
import createGamesAndLineupTableHeaderRow from '../functions/createGamesAndLineupTableHeaderRow';


export default function GamesTableHeader({teesSelected}) {
  let cols = createGamesAndLineupTableHeaderRow(teesSelected);
  const getHeader = () => {
    var keys = cols;
    return keys.map((key, index)=>{
    return (
      <th className='game-header-cell'
        key={index}
        scope='col'
      >
        {key}
      </th>
    )})
  }

    return (
        <>
          <tr className='game-header-row'>
            {getHeader()}
          </tr>
        </>
    );
  }