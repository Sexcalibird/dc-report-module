
import { useSelector } from 'react-redux';
import { Navigate, Route, useLocation } from 'react-router-dom';
import { Result } from "antd";

const PrivateRoute = (props) => {
    let { children, permission } = props
    const { user } = useSelector(state => state.auth)

    const checkPermission = () => {
        if (user.NHOM_NHAN_SU === "QUAN_TRI") return true
        let { QUYEN_CIS } = user
        if (!QUYEN_CIS) return false
        return  QUYEN_CIS.some(item => item === permission)

    }
    if (user && checkPermission()) {
        return children
    }else {
        return <Result
            status="404"
            title="404"
            subTitle="Bạn không có quyền truy cập trang này"
        />;
    }

};

export default PrivateRoute;


