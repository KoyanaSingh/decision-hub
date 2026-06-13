import { useState } from "react";

function AddItemModal({ onClose, onAdd }) {
  const [value, setValue] = useState("");

  const handleSubmit = () => {
    if (!value.trim()) return;
    onAdd(value.trim());
    setValue("");
    onClose();
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-card" onClick={(e) => e.stopPropagation()}>
        <h2>Add Item</h2>

        <input
          autoFocus
          className="modal-input"
          placeholder="Enter item..."
          value={value}
          onChange={(e) => setValue(e.target.value)}
        />

        <div className="modal-actions">
          <button className="btn" onClick={onClose}>
            Cancel
          </button>

          <button className="btn" onClick={handleSubmit}>
            Add
          </button>
        </div>
      </div>
    </div>
  );
}

export default AddItemModal;
