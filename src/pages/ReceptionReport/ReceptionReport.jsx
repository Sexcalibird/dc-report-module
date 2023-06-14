import {Layout} from "antd";
import {Topbar} from "../../components/index.js";
import i18n, {languageKeys} from "../../i18n/index.js";
import ReceptionSider from "./ReceptionSider.jsx";

const ReceptionReport = () => {
    return (
        <Layout>
            <Topbar
                title={i18n.t(languageKeys.tab_Bao_cao_tiep_don)}
                showTotalNum={false}
                showColumns
            />
            <Layout>
                <ReceptionSider/>
            </Layout>
        </Layout>
    )
}

export default ReceptionReport