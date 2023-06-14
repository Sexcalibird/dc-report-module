import { Button, Result } from "antd";
import { useNavigate } from "react-router-dom";

const NotFound = () => {
  const navigate = useNavigate();

  const handleClickReturn = () => {
    navigate('/');
  };

  return (
    <div style={{ minHeight: "100vh", display: "flex", alignItems: "center", justifyContent: "center" }}>
      <Result
        status="404"
        title="404"
        subTitle="Trang web không tồn tại"
        extra={
          <Button type="primary" onClick={handleClickReturn}>
            Quay lại trang chính
          </Button>
        }
      />
    </div>
  );
};

export default NotFound;
