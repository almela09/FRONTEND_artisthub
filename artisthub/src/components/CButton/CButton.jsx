import { useNavigate } from "react-router-dom";
import "./CButton.css";
export const CButton = ({ path, title }) => {
  const navigate = useNavigate();

  return (
    <div className="customlink-design" onClick={() => navigate(path)}>
      {title}
    </div>
  );
};
