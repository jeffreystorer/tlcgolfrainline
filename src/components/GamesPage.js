import React from 'react';
import { useList} from "react-firebase-hooks/database";
import HandicapsDataService from "../services/HandicapsService";
import GamesTable from './GamesTable';

export default function GamesPage() {
  const [Handicaps, loading, error] = useList(HandicapsDataService.getAll());
  let handicaps;

  if (!loading && !error){
    let aHandicap = Handicaps[0];
    let savedHandicaps = aHandicap.val();
    handicaps = savedHandicaps.handicaps;
  }
  
  if (!loading && !error){
    return(
      <>
      <GamesTable handicaps={handicaps} />
      </>
    )
  } else {
    return null
  }  
}






