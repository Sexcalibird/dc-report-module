import { memo } from "react";
import { useSelector } from "react-redux";
import { rid, getImageFromSever, layDiaChi } from "../../../helpers";
import i18n, { languageKeys } from "../../../i18n";

export const stylePhieuBanLe = `
#phieu-nhap-hang * { font-size: 1rem; line-height: 1.5em; font-family: "Times New Roman", Times, serif; }
#phieu-nhap-hang .logo { width: 75px; height: 75px; object-fit: contain; }
#phieu-nhap-hang .header { display: flex; gap: 20px; }
#phieu-nhap-hang b { font-size: 1.2rem; }
#phieu-nhap-hang .hospital-name { text-transform: uppercase; font-weight: bold; }
#phieu-nhap-hang .thong-tin-phieu { display:flex ; }

`;
const PhieuBanLe = ({ data = {} }) => {
  const userProfile = useSelector((state) => state.auth.user);

  return (
    <div id="Phieu-nhap-hang">
      <div className="header">
        <img src={getImageFromSever(data.BENH_VIEN.ANH_DAI_DIEN)} alt="" className="logo" />
        <h1 className="hospital-name"></h1>
        <div>
          {i18n.t(languageKeys.dia_chi)} : {layDiaChi(data?.BENH_VIEN)}
        </div>
        <div>
          {i18n.t(languageKeys.dien_thoai)} : {data?.BENH_VIEN?.SO_DIEN_THOAI || ""}
        </div>
      </div>
      <div className="thong-tin-phieu">
        <h1>{i18n.t(languageKeys.hoa_don_ban_hang).toUpperCase()}</h1>
        <div className="col-left">
          {/* <div>Số hóa đơn: <b>{data}</b></div> */}
          <div>{i18n.t(languageKeys.khach_hang)}:</div>
        </div>
        <div className="col-right">
          {/* <div>Ngày: <b>{data}</b></div> */}
          <div> {i18n.t(languageKeys.field_So_dien_thoai)}:</div>
        </div>
      </div>
      <table>
        <thead>
          <tr>
            <th style={{ width: "28px" }}> {i18n.t(languageKeys.field_Stt)}</th>
            <th> {i18n.t(languageKeys.ten_san_pham)}</th>
            <th>{i18n.t(languageKeys.txt_So_luong)}</th>
            <th>{i18n.t(languageKeys.vien_phi_Don_gia)}</th>
            <th>{i18n.t(languageKeys.vien_phi_mien_giam)}</th>
            <th>{i18n.t(languageKeys.vien_phi_thanh_tien)}</th>
          </tr>
        </thead>
        <tbody>
          {/* {data?.data_thuoc.map((item,index) => { 
              return (
                  <tr key={rid()}>
                      <td></td>
                  </tr>
              )  
             })} */}
        </tbody>
      </table>
      <div>
        <div className="col-left">{/* <div>Số lượng:  <b>{data}</b></div> */}</div>
        <div className="col-right">
          {/* <div>Tổng tiền hàng:  <b>{data}</b></div> */}
          {/* <div>Chiết khấu hóa đơn: <b>{data}</b></div> */}
          {/* <div>Tổng thanh toán:  <b>{data}</b></div> */}
        </div>
      </div>
      <div>{i18n.t(languageKeys.field_Ghi_chu)}</div>
    </div>
  );
};
export default memo(PhieuBanLe);
