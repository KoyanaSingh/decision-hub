import { useParams, Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { loadCategories, saveCategories } from "../utils/storage";
import AddItemModal from "../components/AddItemModal";

function Category() {
  const { id } = useParams();
  const [category, setCategory] = useState(null);
  const [showAddModal, setShowAddModal] = useState(false);

  useEffect(() => {
    const categories = loadCategories();

    const foundCategory = categories.find((cat) => cat.id === id);

    setCategory(foundCategory);
  }, [id]);

  const addItem = (item) => {
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

      <button className="btn" onClick={() => setShowAddModal(true)}>
        + Add Item
      </button>

      <div
        style={{
          marginTop: "20px",
        }}
      >
        {category.items.length === 0 ? (
          <div className="empty-category">
            <div className="empty-icon">📭</div>

            <h2>No items yet</h2>

            <p>Start by adding your first item.</p>

            <button className="btn" onClick={() => setShowAddModal(true)}>
              + Add First Item
            </button>
          </div>
        ) : (
          category.items.map((item, index) => (
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
          ))
        )}
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
      {showAddModal && (
        <AddItemModal onClose={() => setShowAddModal(false)} onAdd={addItem} />
      )}
    </div>
  );
}

export default Category;
