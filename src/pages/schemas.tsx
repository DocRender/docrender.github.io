import { Link } from "react-router-dom";
import { Card, Space } from "antd";
import GROUPS from "../schemas";

const SchemasPage = () => {
  return (
    <div className="container">
      <h1 className="title">XRender Expo</h1>
      {GROUPS.map((group) => {
        return (
          <div key={group.id} style={{ width: "100%" }}>
            <h1 className="group-title">{group.title}</h1>
            <Space size="large" className="cards">
              {group.businesses.map((business) => {
                return (
                  <div key={business.id} className="card" onClick={() => {}}>
                    <Link to={`/schemas/${business.id}@${group.id}`}>
                      <Card title={business.title || business.id}>{business.desc}</Card>
                    </Link>
                  </div>
                );
              })}
            </Space>
          </div>
        );
      })}
    </div>
  );
};

export default SchemasPage;
