import {Button, Divider, Form, Layout, Radio} from "antd";
import {ComplexDatePicker, Select} from "../../components/index.js";
import i18n, {languageKeys} from "../../i18n/index.js";

const ReceptionSider = () => {

    const {form} = Form.useForm()

    return (
        <Layout.Sider style={{background: "white"}}>
            <ComplexDatePicker onChange={() => {}}/>
            <Form form={form} layout="vertical">
                <Form.Item label={i18n.t(languageKeys.khoa)}>
                    <Select/>
                </Form.Item>
                <Divider dashed/>
                <Form.Item label={i18n.t(languageKeys.field_Nguoi_tiep_don)}>
                    <Select/>
                </Form.Item>
                <Divider dashed/>
                <Form.Item label={i18n.t(languageKeys.field_Trang_thai_cuoc_hen)}>
                    <Select/>
                </Form.Item>
                <Divider dashed/>
                <Form.Item label={i18n.t(languageKeys.trang_thai_thanh_toan)}>
                    <Radio.Group style={{display: "grid"}}>
                        <Radio value={1}>A</Radio>
                        <Radio value={2}>B</Radio>
                        <Radio value={3}>C</Radio>
                    </Radio.Group>
                </Form.Item>
            </Form>
            <Button>Reset</Button>
            <Button>Apply</Button>
        </Layout.Sider>
    )
}

export default ReceptionSider