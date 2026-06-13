import { useEffect, useState } from "react";
import CategoryCard from "../components/CategoryCard";
import {
  loadCategories,
  saveCategories,
  loadHistory,
  saveHistory,
} from "../utils/storage";
import { Link } from "react-router-dom";
import CreateCategoryModal from "../components/CreateCategoryModal";
import DeleteModal from "../components/DeleteModal";

function Dashboard() {
  const [categories, setCategories] = useState([]);
  const [search, setSearch] = useState("");
  const [quickResult, setQuickResult] = useState(null);
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [deleteCategoryId, setDeleteCategoryId] = useState(null);

  useEffect(() => {
    setCategories(loadCategories());
  }, []);

  useEffect(() => {
    saveCategories(categories);
  }, [categories]);

  const existingCategory = categories.find(
    (cat) => cat.name.toLowerCase() === name.toLowerCase(),
  );

  if (existingCategory && items.length > 0) {
    const append = window.confirm(
      `"${name}" already exists.\n\nAppend template items?`,
    );

    if (!append) return;

    const updatedCategories = categories.map((cat) => {
      if (cat.id === existingCategory.id) {
        return {
          ...cat,
          items: [...new Set([...cat.items, ...items])],
        };
      }

      return cat;
    });

    const addCategory = ({ name, icon, items = [] }) => {
      const newCategory = {
        id: Date.now().toString(),
        name,
        icon,
        items,
      };

      setCategories(updatedCategories);

      return;
    };

    setCategories([...categories, newCategory]);
  }

  const deleteCategory = (id) => {
    const updated = categories.filter((category) => category.id !== id);

    setCategories(updated);

    setDeleteCategoryId(null);
  };

  const quickPick = (category) => {
    if (!category.items.length) {
      alert("No items in this category.");
      return;
    }

    setQuickResult({
      loading: true,
    });

    setTimeout(() => {
      const randomIndex = Math.floor(Math.random() * category.items.length);

      const result = category.items[randomIndex];

      setQuickResult({
        category: category.name,
        result,
        loading: false,
      });

      const history = loadHistory();

      history.unshift({
        category: category.name,
        icon: category.icon,
        result,
        time: new Date().toLocaleString(),
      });

      saveHistory(history);
    }, 1200);
  };

  const filteredCategories = categories.filter((category) =>
    category.name.toLowerCase().includes(search.toLowerCase()),
  );

  const recentHistory = loadHistory().slice(0, 5);

  return (
    <div className="container">
      <div className="hero">
        <h1 className="page-title">Decision Hub</h1>

        <p className="hero-subtitle">
          Can't decide what to do? Let Decision Hub choose for you.
        </p>

        <p className="stats-text">{categories.length} Categories Available</p>
      </div>

      <input
        type="text"
        placeholder="Search categories..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        className="search-input"
      />

      <div className="actions">
        <button className="btn" onClick={() => setShowCreateModal(true)}>
          + New Category
        </button>

        <Link to="/history">
          <button className="btn">History</button>
        </Link>
      </div>

      {filteredCategories.length === 0 ? (
        <div className="empty-state">
          <h2>No categories found</h2>

          <p>Create a category or try another search.</p>
        </div>
      ) : (
        <div className="grid">
          {filteredCategories.map((category) => (
            <CategoryCard
              key={category.id}
              category={category}
              onDelete={(id) => setDeleteCategoryId(id)}
              onQuickPick={quickPick}
            />
          ))}
        </div>
      )}
      {recentHistory.length > 0 && (
        <>
          <h2
            style={{
              marginTop: "50px",
              marginBottom: "20px",
            }}
          >
            Recent Decisions
          </h2>

          <div className="grid">
            {recentHistory.map((decision, index) => (
              <div key={index} className="card recent-card">
                <div className="recent-header">
                  <span className="recent-icon">{decision.icon || "📌"}</span>

                  <h4>{decision.category}</h4>
                </div>

                <h3>{decision.result}</h3>
              </div>
            ))}
          </div>
        </>
      )}

      {quickResult && (
        <div className="modal-overlay" onClick={() => setQuickResult(null)}>
          <div className="result-modal" onClick={(e) => e.stopPropagation()}>
            {quickResult.loading ? (
              <>
                <div className="spinner"></div>
                <h2>Choosing...</h2>
              </>
            ) : (
              <>
                <div className="result-emoji">🎉</div>

                <h3>Your Decision</h3>

                <h1>{quickResult.result}</h1>

                <p>From {quickResult.category}</p>

                <button className="btn" onClick={() => setQuickResult(null)}>
                  Awesome
                </button>
              </>
            )}
          </div>
        </div>
      )}

      {showCreateModal && (
        <CreateCategoryModal
          onClose={() => setShowCreateModal(false)}
          onCreate={addCategory}
        />
      )}

      {deleteCategoryId && (
        <DeleteModal
          title="Delete Category?"
          message={categories.find((c) => c.id === deleteCategoryId)?.name}
          onCancel={() => setDeleteCategoryId(null)}
          onConfirm={() => deleteCategory(deleteCategoryId)}
        />
      )}
    </div>
  );
}

export default Dashboard;
