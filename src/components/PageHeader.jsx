import { useNavigate } from "react-router-dom";

function PageHeader({ title }) {
  const navigate = useNavigate();

  return (
    <div className="page-header">
      <button className="back-btn" onClick={() => navigate(-1)}>
        <span>←</span>
        Back
      </button>
    </div>
  );
}

export default PageHeader;
