import { useParams, Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { loadCategories, loadHistory, saveHistory } from "../utils/storage";
import PageHeader from "../components/PageHeader";

function Wheel() {
  const { id } = useParams();

  const [category, setCategory] = useState(null);
  const [result, setResult] = useState("");

  useEffect(() => {
    const categories = loadCategories();

    const foundCategory = categories.find((cat) => cat.id === id);

    setCategory(foundCategory);
  }, [id]);

  const spinWheel = () => {
    if (!category) return;

    if (category.items.length === 0) {
      alert("Add some items first.");
      return;
    }

    const randomIndex = Math.floor(Math.random() * category.items.length);

    const selectedItem = category.items[randomIndex];

    setResult(selectedItem);

    const history = loadHistory();

    history.unshift({
      category: category.name,
      result: selectedItem,
      time: new Date().toLocaleString(),
    });

    saveHistory(history);
  };

  if (!category) {
    return (
      <div className="container">
        <h2>Category not found</h2>
      </div>
    );
  }

  return (
    <div className="container">
      <PageHeader />
      {/* <Link to={`/category/${id}`}>← Back</Link> */}

      <h1 className="page-title">🎡 {category.name}</h1>

      <div className="card">
        <h3>Options</h3>

        <ul
          style={{
            marginTop: "10px",
            paddingLeft: "20px",
          }}
        >
          {category.items.map((item, index) => (
            <li key={index}>{item}</li>
          ))}
        </ul>
      </div>

      <button
        className="btn"
        onClick={spinWheel}
        style={{
          marginTop: "20px",
        }}
      >
        SPIN
      </button>

      {result && (
        <div
          className="card"
          style={{
            marginTop: "20px",
            textAlign: "center",
          }}
        >
          <h3>Result</h3>

          <h2
            style={{
              marginTop: "10px",
            }}
          >
            👉 {result}
          </h2>
        </div>
      )}
    </div>
  );
}

export default Wheel;
