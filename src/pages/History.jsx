import { Link } from "react-router-dom";
import { loadHistory } from "../utils/storage";

function History() {
  const history = loadHistory();

  return (
    <div className="container">
      <Link to="/">← Back</Link>

      <h1 className="page-title">History</h1>

      {history.length === 0 && <p>No decisions yet.</p>}

      {history.map((item, index) => (
        <div
          key={index}
          className="card"
          style={{
            marginBottom: "10px",
          }}
        >
          <h3>{item.result}</h3>

          <p>{item.category}</p>

          <small>{item.time}</small>
        </div>
      ))}
    </div>
  );
}

export default History;
