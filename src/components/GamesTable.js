import React, { useState, useEffect } from "react"
import GamesTableHeader from "./GamesTableHeader"
import GamesTableBody from "./GamesTableBody"
import ButtonDownloadScreenShot from "./ButtonDownloadScreenshot"
import { get, set } from "../functions/localStorage"
import fetchGamesGHIN from "../functions/fetchGamesGHIN"

export default function GamesTable({ handicaps }) {
  set("teesSelected", handicaps.teesSelected)
  const dataMode = "roster"
  fetchGamesGHIN(dataMode, handicaps.players)
  const players = get("players")
  const [refreshed, setRefreshed] = useState(false)

  useEffect(() => {
    if (!refreshed) setRefreshed(true)
  }, [refreshed])

  return (
    <>
      <br />
      <br />
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
