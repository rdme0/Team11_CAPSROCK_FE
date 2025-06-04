import { getUltravioletLevelText } from "../../util/iconMappings";
import "./getUltravioletLevelTag.css";

const getUVLevelTag = (data, isDashboard = false) => {
  const className = isDashboard ? 'dashboardUVLevelTag' : 'UVLevelTag';
  
  return (
    <div className={className}>
      <span>{getUltravioletLevelText(data)}</span>
    </div>
  );
};

export default getUVLevelTag
