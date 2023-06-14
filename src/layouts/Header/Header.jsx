import React from "react";
import style from "./header.module.scss";
import { Avatar, Button, Divider, Layout, Popover, Space } from "antd";
import { DownOutlined, GlobalOutlined, SettingOutlined, UserOutlined } from "@ant-design/icons";
import {LogOut, QuanLy, DmIcon, VNFlag, BRFlag} from "../../assets/svg/index.js";
import { useNavigate } from "react-router-dom";
import { paths } from "../../constants";
import apiServices from "../../config/apiServices";
import {useSelector} from "react-redux";
import {getUser} from "../../ducks/slices/auth.slice.js";
import {getImageFromSever} from "../../helpers.js";
import i18n, {languageKeys, languages} from "../../i18n/index.js";
import NavigateUI from "../NavigateUI/NavigateUI.jsx";

const MainHeader = () => {

  const navigate = useNavigate();
  const userProfile = useSelector(getUser)
  const avatar = getImageFromSever(userProfile.ANH_DAI_DIEN)
  
  const handleLogout = () => {
    localStorage.clear();
    window.location.href = `${apiServices.URL_CIS}?redirect=${apiServices.URL_DANH_MUC}`;
  };

    const handleChangeLanguage = (val) => {
        i18n.changeLanguage(val);
        window.location.reload();
    };

  const UserSetting = () => (
    <Space size={3} direction={"vertical"} className={style["inner"]}>
      <Space size={10} style={{ fontWeight: 700, marginBottom: 3 }}>
        <Avatar size={30} src={avatar} />
        <span>{userProfile.HO + " " + userProfile.TEN}</span>
        <DownOutlined />
      </Space>
      <Button icon={<LogOut />} type="link" onClick={handleLogout} >
          {i18n.t(languageKeys.common_Dang_xuat)}
      </Button>

      <Popover
          content={() => {
              return (
                  <Space size={3} direction={"vertical"} className={style["inner"]}>
                      <Button
                          icon={<VNFlag />}
                          type="link"
                          onClick={() => handleChangeLanguage(languages.tieng_viet)}
                      >
                          &nbsp;{i18n.t(languageKeys.ngon_ngu_tieng_viet)}
                      </Button>
                      <Button
                          icon={<BRFlag />}
                          type="link"
                          onClick={() => handleChangeLanguage(languages.tieng_anh)}
                      >
                          &nbsp;{i18n.t(languageKeys.ngon_ngu_tieng_anh)}
                      </Button>
                  </Space>
              )
          }}
          placement="left"
      >
          <Button icon={<GlobalOutlined />} type="link">
              {i18n.t(languageKeys.common_Doi_ngon_ngu)}
          </Button>
      </Popover>

      {/*<Button icon={<UserOutlined />} type="link" onClick={(e) => navigate(paths.QL_TAI_KHOAN +"/")}>*/}
      {/*  Quản lý tài khoản*/}
      {/*</Button>*/}
      {/*<Button icon={<SettingOutlined />} type="link">*/}
      {/*  Quản lý license*/}
      {/*</Button>*/}
      <Divider dashed className={style["divider"]} />
      <p>Version: 0.0.1</p>
    </Space>
  );

  return (
    <Layout.Header className={style["header"]}>
        <div className={style['logo']}>
            <DmIcon/>
            <span>Quản lý báo cáo</span>
        </div>
        {/*<img src={LogoText} alt="logo" className={style['logo']}/>*/}

        <NavigateUI/>

        <Popover
            content={UserSetting}
            trigger="click"
            arrow={false}
            autoAdjustOverflow
            overlayClassName={style["setting"]}
            overlayInnerStyle={{ width: "100%", height: "100%", boxShadow: "none", padding: 0 }}
        >
            <Space size={10} className={style["user"]}>
                <Avatar size={30} src={avatar} />
                {/*<span>{userProfile.HO + " " + userProfile.TEN}</span>*/}
                {/*<DownOutlined />*/}
            </Space>
        </Popover>
    </Layout.Header>
  );
};

export default MainHeader;
