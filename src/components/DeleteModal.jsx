function DeleteModal({ title, message, onCancel, onConfirm }) {
  return (
    <div className="modal-overlay" onClick={onCancel}>
      <div className="modal-card" onClick={(e) => e.stopPropagation()}>
        <h2>{title}</h2>

        <p
          style={{
            marginTop: "10px",
            color: "#6b7280",
            fontSize: "20px",
            fontWeight: "500",
          }}
        >
          {message}
        </p>

        <div className="modal-actions">
          <button className="btn" onClick={onCancel}>
            Cancel
          </button>

          <button className="btn delete-confirm-btn" onClick={onConfirm}>
            Delete
          </button>
        </div>
      </div>
    </div>
  );
}

export default DeleteModal;
