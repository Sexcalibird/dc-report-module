import { memo } from "react";
import { useSelector } from "react-redux";
import { getImageFromSever, rid, formatNumberToPrice, getFullName, layDiaChi } from "../../../helpers";
import moment from "moment";
import i18n, { languageKeys, languages } from "../../../i18n";

export const styleThongKeRis = `
#phieu-xuat-tra * { font-size: 1rem; line-height: 1.5em; font-family: "Times New Roman", Times, serif; }
#phieu-xuat-tra .logo { width: 75px; height: 75px; object-fit: contain; }
#phieu-xuat-tra .header { display: flex; gap: 20px; }
#phieu-xuat-tra .hospital-name { text-transform: uppercase; font-weight: bold; }
#phieu-xuat-tra .thong-tin-phieu { display:flex ; }
#phieu-xuat-tra .title { text-transform: uppercase; font-size: 2rem; font-weight: bold; margin-top: 1.5rem;  text-align: center; }
#phieu-xuat-tra .table { margin-block: 1rem; }
#phieu-xuat-tra .table * { font-size: 0.8rem; }
#phieu-xuat-tra .table, .table th, .table td { border: 1px solid black; border-collapse: collapse; }
#phieu-xuat-tra .table th, .table td { padding: 5px 10px; }
#phieu-xuat-tra .table th { text-align: start; }
@media print {
   #phieu-xuat-tra { break-inside: avoid; }
}
#phieu-xuat-tra .loai { text-transform: uppercase; font-size: 20px; font-weight: bold; margin-top: 5px;  text-align: center;}
#phieu-xuat-tra .time {  font-size: 16px; margin-bottom : 10px;width : 100%;  text-align: center; display:flex,flex-direction: row; justify-content : center}
#phieu-xuat-tra .time-bold {  font-size: 16px; margin-bottom : 10px, font-weight: bold;}
`;

const ThongKeDvTheoBN = ({ data = {} }) => {
  const userProfile = useSelector((state) => state.auth.user);

  const { result, filter, loai_dv } = data;

  return (
    <div id="phieu-xuat-tra">
      <div className="header">
        {userProfile.benh_vien.ANH_DAI_DIEN && <img src={getImageFromSever(userProfile.benh_vien.ANH_DAI_DIEN)} alt="" className="logo" />}

        <div>
          <div className="hospital-name">{userProfile.benh_vien.TEN_CSKCB}</div>
          <div>
            {i18n.t(languageKeys.dia_chi)}: {`${layDiaChi(userProfile.benh_vien)}`}
          </div>
          <div>
            {i18n.t(languageKeys.dien_thoai)}: {userProfile.benh_vien.SO_DIEN_THOAI || ""}
          </div>
        </div>
      </div>

      <div className="title">{'SỔ THEO DÕI CHẨN ĐOÁN HÌNH ẢNH THEO BỆNH NHÂN'.toUpperCase()}</div>
      <div className="time">Thời gian báo cáo : <span className="time-bold">
        {`Từ ngày ${filter.TU_NGAY} đến ${filter.DEN_NGAY}`}
        </span></div>

      <table style={{ width: "100%" }} className="table">
        <thead>
          <tr>
            <th style={{ width: "28px" }}>{i18n.t(languageKeys.field_Stt)}</th>
            <th>{i18n.t(languageKeys.ma_bn)}</th>
            <th>{i18n.t(languageKeys.ten_bn)}</th>
            <th>{i18n.t(languageKeys.field_Ten_dich_vu)}</th>
            <th>{i18n.t(languageKeys.field_Phong_chi_dinh)}</th>
            <th>{i18n.t(languageKeys.field_Phong_thuc_hien)}</th>
          </tr>
        </thead>
        <tbody>
          {result?.map((item, index) => {
            return (
              <tr key={rid()}>
                <td>{index + 1 >= 10 ? index + 1 : `0${index + 1}`}</td>
                <td>{item.MA_BENH_NHAN}</td>
                <td>{item.TEN_BENH_NHAN}</td>
                <td>
                    <ul style={{listStyle : "none", padding : 0}}>
                        {item.DS_DICH_VU.map(item => <li>{item}</li>)}
                    </ul>
                </td>
                <td>{item.PHONG_CHI_DINH || i18n.t(languageKeys.data_Tiep_tan)}</td>
                <td>{item.PHONG_THUC_HIEN}</td>
               
              </tr>
            );
          })}
    
        </tbody>
      </table>

      <div className="foot-break">
        <div style={{ display: "flex", justifyContent: "flex-end" }}>
          {i18n.language === languages.tieng_viet ? (
            <i>
              {moment().format("HH:mm") + ", "}
              {i18n.t(languageKeys.common_ngay)} {moment().date()},{i18n.t(languageKeys.common_thang)} {moment().month() + 1}, {i18n.t(languageKeys.common_nam)} {moment().year()}
            </i>
          ) : (
            <i style={{ marginRight: "40px" }}> {moment().format("HH:mm , MMMM d, YYYY")}</i>
          )}
        </div>

        <div style={{ display: "flex", justifyContent: "space-between" }}>
          <div style={{ textAlign: "center", marginLeft: 40 }}>
            <div>
              <b>{i18n.t(languageKeys.nguoi_lap_bang)}</b>
            </div>
            <i>({i18n.t(languageKeys.ky_va_ghi_ro_ho_ten)})</i>
            <div style={{ marginTop: 80, fontWeight: "bold" }}></div>
          </div>

          <div style={{ textAlign: "center", marginLeft: 40 }}>
            <div>
              <b>Trưởng khoa chẩn đoán hình ảnh</b>
            </div>
            <i>({i18n.t(languageKeys.ky_va_ghi_ro_ho_ten)})</i>
            <div style={{ marginTop: 80, fontWeight: "bold" }}></div>
          </div>

          <div style={{ textAlign: "center", marginRight: 40 }}>
            <div>
              <b>{i18n.t(languageKeys.txt_ke_toan)}</b>
            </div>
            <i>({i18n.t(languageKeys.ky_va_ghi_ro_ho_ten)})</i>
            <div style={{ marginTop: 80, fontWeight: "bold" }}>{getFullName(userProfile)}</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default memo(ThongKeDvTheoBN);
