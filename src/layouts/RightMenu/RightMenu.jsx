import React from "react"
import style from "./right_menu.module.scss"
import {Divider, Layout, Menu} from "antd";
import {
    CIS_Icon,
    DuocIcon,
    Home_Icon,
    LIS_Icon,
    PRM_Icon,
    RIS_Icon,
    VatTuIcon
} from "../../assets/svg/index.js";
import apiServices from "../../config/apiServices.js";
import {useNavigate} from "react-router-dom";
import {keys, paths, routeApp} from "../../constants/index.js";
import {useSelector} from "react-redux";
import {getUser} from "../../ducks/slices/auth.slice.js";
import i18n, {languageKeys} from "../../i18n/index.js";

const RightMenu = () => {

    const accessToken = localStorage.getItem(keys.ACCESS_TOKEN);
    const refreshToken = localStorage.getItem(keys.REFRESH_TOKEN);

    const userProfile = useSelector(getUser)
    const module = userProfile?.module.filter(item => item !== routeApp.DANH_MUC)

    const menu = [
        {
            type: 'divider'
        },
        {
            label: 'CIS',
            key: apiServices.URL_CIS + "/" + paths.CIS,
            icon: <CIS_Icon/>,
            disabled: !module.includes(routeApp.CIS),
        },
        {
            type: 'divider'
        },
        {
            label: 'LIS',
            key: `${apiServices.URL_LIS}?access_token=${accessToken}&refresh_token=${refreshToken}`,
            icon: <LIS_Icon/>,
            disabled: !module.includes(routeApp.LIS),
        },
        {
            type: 'divider'
        },
        {
            label: 'RIS',
            key: apiServices.URL_CIS + "/" + paths.RIS,
            icon: <RIS_Icon/>,
            disabled: !module.includes(routeApp.RIS),
        },
        {
            type: 'divider'
        },
        {
            label: 'PRM',
            key: 4,
            icon: <PRM_Icon/>,
            disabled: !module.includes(routeApp.PRM),
        },
        {
            type: 'divider'
        },
        {
            label: i18n.t(languageKeys.right_duoc),
            key: apiServices.URL_CIS + "/" + paths.DUOC,
            icon: <DuocIcon/>,
            style: {height: 100},
            disabled: !module.includes(routeApp.DUOC),
        },
        // {
        //     type: 'divider'
        // },
        // {
        //     label: 'Vật tư\n' + 'tiêu hao,\n' + 'tủ trực',
        //     key: 6,
        //     icon: <VatTuIcon/>,
        //     style: {height: 120},
        // },
    ]

    return (
        <Layout.Sider
            width={90}
            className={style['right_menu']}
        >
            <Menu
                items={[
                    {
                        label: i18n.t(languageKeys.home_vtc),
                        key: apiServices.URL_CIS + paths.software_route,
                        icon: <Home_Icon/>,
                        style: {height: 90},
                    },
                    ...menu
                ]}
                className={style['custom_menu']}
                onClick={(e) => (window.location.href = e.key)}
                //onClick={(e) => window.open(e.key)}
            />
        </Layout.Sider>
    )
}

export default RightMenu