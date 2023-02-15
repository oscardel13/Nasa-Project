import { useMemo } from "react";
import { Appear, Table, Paragraph, Link } from "arwes";
import Clickable from "../components/Clickable";


const History = props => {
  const {
    deleteLaunch,
  } = props;

  const tableBody = useMemo(() => {
    return props.launches?.filter((launch) => !launch.upcoming)
      .map((launch) => {
        return <tr key={String(launch.flightNumber)}>
          <td>
            <span style={
              {color: launch.success ? "greenyellow" : "red"}
            }>█</span>
          </td>
          <td>{launch.flightNumber}</td>
          <td>{new Date(launch.launchDate).toDateString()}</td>
          <td>{launch.mission}</td>
          <td>{launch.rocket}</td>
          <td>{launch.customers?.join(", ")}</td>
          <td>
            <Clickable style={{color:"red"}}>
              <Link style={{"color": "red", "textDecoration": "none"}} onClick={() => deleteLaunch(launch.flightNumber)}>
                ✖
              </Link>
            </Clickable>
          </td>
        </tr>;
      });
  }, [props.launches]);

  return <article id="history">
    <Appear animate show={props.entered}>
      <Paragraph>History of mission launches including SpaceX launches starting from the year 2006.</Paragraph>
      <Table animate>
        <table style={{tableLayout: "fixed"}}>
          <thead>
            <tr>
              <th style={{width: "2rem"}}></th>
              <th style={{width: "3rem"}}>No.</th>
              <th style={{width: "9rem"}}>Date</th>
              <th>Mission</th>
              <th style={{width: "7rem"}}>Rocket</th>
              <th>Customers</th>
              <th style={{width: "3rem"}}></th>
            </tr>
          </thead>
          <tbody>
            {tableBody}
          </tbody>
        </table>
      </Table>
    </Appear>
  </article>;
}
  
export default History;