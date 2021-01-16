import React, { useState, useEffect } from "react"
import GamesTableHeader from "./GamesTableHeader"
import GamesTableBody from "./GamesTableBody"
import ButtonDownloadScreenShot from "./ButtonDownloadScreenshot"
import { get, set } from "../functions/localStorage"
import fetchGamesGHIN from "../functions/fetchGamesGHIN"

export default function GamesTable({ handicaps }) {
  const [showFirstName, setShowFirstName] = useState(false)
  set("teesSelected", handicaps.teesSelected)
  const dataMode = "ghin"
  fetchGamesGHIN(dataMode, handicaps.players)
  const players = get("players")
  const [refreshed, setRefreshed] = useState(false)

  function handleShowFirstNameChange() {
    setShowFirstName(!showFirstName)
  }

  useEffect(() => {
    if (!refreshed) setRefreshed(true)
  }, [refreshed])

  return (
    <>
      <div className="center">
        <input
          type="checkbox"
          id="showFirstName"
          onChange={handleShowFirstNameChange}
          defaultChecked={showFirstName}
        ></input>
        <label htmlFor="showFirstName">Show First Name</label>
      </div>
      <br></br>
      <table id="games-table" className="background-white">
        <div id="games-table-div" className="background-white">
          <thead>
            <tr className="center background-white">
              <th colSpan={get("teesSelected").length + 1}>
                {handicaps.game} at {handicaps.course.toUpperCase()}
              </th>
            </tr>
            <GamesTableHeader teesSelected={handicaps.teesSelected} />
          </thead>
          <tbody className="background-white">
            <GamesTableBody
              showFirstName={showFirstName}
              players={players}
              course={handicaps.course}
              game={handicaps.game}
              games={handicaps.games}
              teesSelected={handicaps.teesSelected}
              ratings={handicaps.ratings}
              slopes={handicaps.slopes}
              pars={handicaps.pars}
            />
          </tbody>
        </div>
      </table>
      <br></br>
      <br></br>
      <div className="center">
        <ButtonDownloadScreenShot
          game={handicaps.game}
          course={handicaps.course.toUpperCase()}
          element="games-table-div"
          format="JPEG"
          page="Games"
        />
      </div>
    </>
  )
}
