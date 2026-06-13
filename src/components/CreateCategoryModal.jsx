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

const TEMPLATES = [
  {
    name: "What To Eat",
    icon: "🍕",
    items: ["Pizza", "Burger", "Biryani", "Dosa", "Momos", "Pasta"],
  },
  {
    name: "What To Study",
    icon: "📚",
    items: ["DSA", "React", "Node.js", "System Design", "JavaScript", "SQL"],
  },
  {
    name: "What To Watch",
    icon: "🎬",
    items: ["Movie", "Anime", "YouTube", "Documentary", "Netflix Series"],
  },
  {
    name: "Chores",
    icon: "🧹",
    items: ["Laundry", "Clean Room", "Wash Dishes", "Organize Desk", "Vacuum"],
  },
  {
    name: "Mom's Cooking",
    icon: "👩",
    items: ["Paneer", "Rajma", "Dal Rice", "Chole", "Pulao", "Paratha"],
  },
];

function CreateCategoryModal({ onClose, onCreate }) {
  const [name, setName] = useState("");
  const [icon, setIcon] = useState("📌");
  const [showTemplates, setShowTemplates] = useState(false);
  const [error, setError] = useState("");

  const handleCreate = () => {
    if (!name.trim()) {
      setError("Category name is required");
      return;
    }

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
          onChange={(e) => {
            setName(e.target.value);
            setError("");
          }}
        />

        {error && <p className="error-text">{error}</p>}

        <hr />

        <h3 style={{ marginTop: "20px" }}>Select Icon</h3>

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

        <hr />

        <button
          className="template-toggle"
          onClick={() => setShowTemplates(!showTemplates)}
        >
          {showTemplates ? "▲" : "▼"} Quick Templates
        </button>

        {showTemplates && (
          <div className="template-grid">
            {TEMPLATES.map((template) => (
              <button
                key={template.name}
                className="template-btn"
                onClick={() => {
                  onCreate({
                    name: template.name,
                    icon: template.icon,
                    items: template.items,
                  });

                  onClose();
                }}
              >
                {template.icon} {template.name}
              </button>
            ))}
          </div>
        )}

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
