import React from 'react';
import GamesTableHeader from './GamesTableHeader';
import GamesTableBody from './GamesTableBody';
import ButtonDownloadScreenShot from './ButtonDownloadScreenshot';
import {get, set} from '../functions/localStorage';
import fetchGamesGHIN from '../functions/fetchGamesGHIN';

export default function GamesTable({handicaps}) {
    set('players', handicaps.players);
    set('teesSelected', handicaps.teesSelected)
    const dataMode = get('dataMode');  
    fetchGamesGHIN(dataMode);
    
  return(
    <><br/><br/>
      <table id='games-table'>
      <div id='games-table-div'>
        <thead>
        <tr className= 'center'>
          <th colSpan={get('teesSelected').length + 1}>
            {handicaps.game} at {handicaps.course.toUpperCase()}
          </th>
        </tr>
          <GamesTableHeader teesSelected={handicaps.teesSelected} />
        </thead>
        <tbody>
          <GamesTableBody 
            course={handicaps.course}
            game={handicaps.game}
            games={handicaps.games}
            teesSelected={handicaps.teesSelected}
            ratings={handicaps.ratings} 
            slopes={handicaps.slopes} 
            pars={handicaps.pars}/>
        </tbody>
      </div>
      </table>
    <br></br><br></br>
    <div className='center'>
    <ButtonDownloadScreenShot game={handicaps.game} course={handicaps.course.toUpperCase()} element='games-table-div' format="PNG" page="Games" />
    </div>
    </>
  )
}

