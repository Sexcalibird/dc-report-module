import {Layout, Spin} from "antd";
import {MainHeader, RightMenu} from "../index.js";
import React, {Suspense} from "react"
import {Outlet} from "react-router-dom";
import i18n, {languageKeys} from "../../i18n/index.js";

const MainLayout = () => {
    return (
        <Layout style={{height: '100vh', width: '100%', overflow: "hidden"}}>
            <MainHeader/>
            <Layout>
                <Layout>
                    <Layout.Content style={{}}>
                        <Suspense
                            fallback={
                                <Spin
                                    spinning
                                    style={{
                                        position: "fixed",
                                        top: "50vh",
                                        left: "50%",
                                        transform: "translateX(-50%)",
                                    }}
                                    tip={i18n.t(languageKeys.noti_Dang_tai_du_lieu)}
                                />
                            }
                        >
                            <Outlet />
                        </Suspense>
                    </Layout.Content>
                </Layout>
                <RightMenu/>
            </Layout>
        </Layout>
    )
}

export default MainLayout