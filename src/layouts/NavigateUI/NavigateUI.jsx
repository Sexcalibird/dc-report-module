import React, {useEffect, useState} from "react"
import style from './navigate.module.scss'
import {Layout, Menu} from "antd";
import {useLocation, useNavigate} from "react-router-dom";
import {danhMucPermission, keyLoaiNhanVien, paths} from "../../constants/index.js";
import {useSelector} from "react-redux";
import {getUser} from "../../ducks/slices/auth.slice.js";
// import {handleCheckPermissions} from "../../helpers.js";
import i18n, {languageKeys} from "../../i18n/index.js";

const NavigateUI = () => {

    const userProfile = useSelector(getUser)
    const navigate = useNavigate()
    const location = useLocation()

    const [selectedKey, setSelectedKey] = useState(location.pathname.split(paths.REPORT + '/')[1])

    // const checkCatalogDisabled = (catalog) => {
    //     if (userProfile.NHOM_NHAN_SU === keyLoaiNhanVien.quan_tri) {
    //         return false;
    //     } else {
    //         return JSON.parse(userProfile.QUYEN_MODULE).filter(perm => perm.includes(catalog)).length < 1;
    //     }
    // } ;

    const menu = [
        {
            label: i18n.t(languageKeys.tab_Bao_cao_tiep_don),
            key: paths.RECEPTION_RP,
            // disabled: checkCatalogDisabled(danhMucPermission.DM_CHUNG),
        },
        {
            label: i18n.t(languageKeys.tab_Bao_cao_vien_phi),
            key: paths.CIS,
            // disabled: checkCatalogDisabled(danhMucPermission.QUAN_LY_CIS),
        },
        {
            label: 'Bao cao hoa hong',
            key: 4,
            // disabled: checkCatalogDisabled(danhMucPermission.QUAN_LY_LIS),
        },
        {
            label: i18n.t(languageKeys.bao_cao_duoc),
            key: paths.DUOC_NGOAI_TRU,
            // disabled: checkCatalogDisabled(danhMucPermission.QUAN_LY_RIS),
        },
        {
            label: 'Báo cáo RIS',
            key: paths.RIS,
            // disabled: checkCatalogDisabled(danhMucPermission.DUOC_NGOAI_TRU),
        },
        {
            label: 'Báo cáo LIS',
            key: paths.LIS,
            // disabled: checkCatalogDisabled(danhMucPermission.DUOC_NGOAI_TRU),
        },
        {
            label: 'Báo cáo BHYT',
            key: 6,
            // disabled: checkCatalogDisabled(danhMucPermission.DUOC_NGOAI_TRU),
        },
    ]

    useEffect(() => {
        setSelectedKey(location.pathname.split(paths.REPORT + '/')[1])
        document.title = "Deepcare - " + menu.find(item => item.key === location.pathname.split(paths.REPORT + '/')[1])?.label
    },[location])

    return (
        <div className={style['menu-container']}>
            <Menu
                //defaultSelectedKeys={selectedKey}
                selectedKeys={selectedKey}
                mode='horizontal'
                items={menu}
                onClick={(e) => navigate(paths.REPORT + '/' + e.key)}
            />
        </div>
    )
}

export default NavigateUI