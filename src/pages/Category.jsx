import { useParams, Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { loadCategories, saveCategories } from "../utils/storage";

function Category() {
  const { id } = useParams();

  const [category, setCategory] = useState(null);

  useEffect(() => {
    const categories = loadCategories();

    const foundCategory = categories.find((cat) => cat.id === id);

    setCategory(foundCategory);
  }, [id]);

  const addItem = () => {
    const item = prompt("Item Name?");

    if (!item || !category) return;

    const categories = loadCategories();

    const updatedCategories = categories.map((cat) => {
      if (cat.id === id) {
        return {
          ...cat,
          items: [...cat.items, item],
        };
      }

      return cat;
    });

    saveCategories(updatedCategories);

    const updatedCategory = updatedCategories.find((cat) => cat.id === id);

    setCategory(updatedCategory);
  };

  const deleteItem = (itemIndex) => {
    const categories = loadCategories();

    const updatedCategories = categories.map((cat) => {
      if (cat.id === id) {
        return {
          ...cat,
          items: cat.items.filter((_, index) => index !== itemIndex),
        };
      }

      return cat;
    });

    saveCategories(updatedCategories);

    const updatedCategory = updatedCategories.find((cat) => cat.id === id);

    setCategory(updatedCategory);
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
      <Link to="/">← Back</Link>

      <h1 className="page-title">
        {category.icon} {category.name}
      </h1>

      <button className="btn" onClick={addItem}>
        + Add Item
      </button>

      <div
        style={{
          marginTop: "20px",
        }}
      >
        {category.items.length === 0 && <p>No items yet</p>}

        {category.items.map((item, index) => (
          <div
            key={index}
            className="card"
            style={{
              marginBottom: "10px",
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <span>{item}</span>

            <button onClick={() => deleteItem(index)}>❌</button>
          </div>
        ))}
      </div>

      <Link to={`/wheel/${id}`}>
        <button
          className="btn"
          style={{
            marginTop: "20px",
          }}
        >
          🎡 Spin Wheel
        </button>
      </Link>
    </div>
  );
}

export default Category;
