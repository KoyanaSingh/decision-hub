import { useState } from "react";

const ICONS = [
  "🍕",
  "📚",
  "🎬",
  "🏠",
  "💪",
  "💻",
  "🎮",
  "📖",
  "🎵",
  "✈️",
  "🛒",
  "❤️",
];

function CreateCategoryModal({ onClose, onCreate }) {
  const [name, setName] = useState("");
  const [icon, setIcon] = useState("📌");

  const handleCreate = () => {
    if (!name.trim()) return;

    onCreate({
      name: name.trim(),
      icon,
    });

    onClose();
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-card" onClick={(e) => e.stopPropagation()}>
        <h2>Create Category</h2>

        <input
          className="modal-input"
          placeholder="Category Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />

        <div className="icon-grid">
          {ICONS.map((item) => (
            <button
              key={item}
              className={icon === item ? "icon-btn active" : "icon-btn"}
              onClick={() => setIcon(item)}
            >
              {item}
            </button>
          ))}
        </div>

        <div className="modal-actions">
          <button className="btn" onClick={onClose}>
            Cancel
          </button>

          <button className="btn" onClick={handleCreate}>
            Create
          </button>
        </div>
      </div>
    </div>
  );
}

export default CreateCategoryModal;
