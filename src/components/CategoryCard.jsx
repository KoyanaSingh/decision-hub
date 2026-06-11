import { Link } from "react-router-dom";

function CategoryCard({ category, onDelete, onQuickPick }) {
  return (
    <div className="card category-card">
      <button
        className="quick-btn"
        onClick={(e) => {
          e.stopPropagation();
          onQuickPick(category);
        }}
      >
        🎲
      </button>

      <button
        className="delete-btn"
        onClick={(e) => {
          e.stopPropagation();
          onDelete(category.id);
        }}
      >
        🗑️
      </button>

      <Link to={`/category/${category.id}`} className="card-link">
        <div className="emoji">{category.icon}</div>

        <h3>{category.name}</h3>

        <p>{category.items.length} items</p>
      </Link>
    </div>
  );
}

export default CategoryCard;
