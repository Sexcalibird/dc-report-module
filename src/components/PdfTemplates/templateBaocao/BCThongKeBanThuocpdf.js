import moment from "moment";
import { memo } from "react";
import { useSelector } from "react-redux";
import { formatCurrency, formatDay, getImageFromSever } from "../../../helpers";
import i18n, { languageKeys, languages } from "../../../i18n";

export const styleBcThongKeBanThuocPdf = `
#medicineStatistical * {
    font-size: 1rem;
    line-height: 1.5em;
    font-family: "Times New Roman", Times, serif;
}

#medicineStatistical .logo {
    width: 75px;
    height: 75px;
    object-fit: contain;
}

#medicineStatistical .header {
    display: flex;
    gap: 20px;
    flex-direction: row;
}

#medicineStatistical .row-infomation {
    display: flex;
    flex-direction: row;
    gap: 20px;
    justify-content: space-between;
    width : 100%
}

#medicineStatistical .hospital-name {
    text-transform: uppercase;
    font-weight: bold;
}

#medicineStatistical .thong-tin-phieu {
    display: flex;
}

#medicineStatistical .title {
    text-transform: uppercase;
    font-size:24px;
    font-weight: bold;
    margin-top: 1.5rem;
    margin-bottom: 1rem;
    text-align: center;
    line-height: 32px;
    margin-top: 20px;
}

#medicineStatistical .date-time {
    text-align: center;
    font-size: 12px;
    line-height: 18px;
    font-weight: 400;
    display:flex;
    justify-content:space-between;
    margin:0 20%;
}
#medicineStatistical .date-time > div {
    font-size: 12px;
    line-height: 18px;
}
#medicineStatistical .date-time > div > b {
    font-size: 12px;
    line-height: 18px;
}
#medicineStatistical .table {
    margin-block: 1rem;
    width: 100%;
}

#medicineStatistical .table * {
    font-size: 0.8rem;
}

#medicineStatistical .table,
.table th, 
.table td {
    border: 1px solid black;
    border-collapse: collapse;
    text-align: center;
}

#medicineStatistical .table th,
.table td {
    padding: 5px 10px;
    
}

#medicineStatistical .table th {
    text-align: center;
}

#medicineStatistical .thong-tin-thuoc {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: flex-start;
}
#medicineStatistical .left-thong-tin-thuoc {
    width: 70%;
}
#medicineStatistical .right-thong-tin-thuoc {
    width: 30%;
}
#medicineStatistical .first-thong-tin{
    margin-top: 20px;
}
#medicineStatistical .date-time-footer{
    margin-top: 20px;
    font-size: 14px;
    text-align: end;
}
#medicineStatistical .footer{
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    padding:0 8%;

}
#medicineStatistical .footer-chu-ky{
    text-align: center;
    font-size: 15px;
    font-weight: 700;
}
#medicineStatistical .ky-ten {
    font-style: italic;
    font-size: 14px;
    font-weight: normal;
}

#medicineStatistical .flex-wrap{
    display:flex;
    flex-direction:row;
}
#medicineStatistical .date-wrap{
    width:100%;
}

@media print {
    #medicineStatistical .foot-break {
        break-inside: avoid;
    }

`;
const MedicineStatisticalPdf = ({ data }) => {
  const userProfile = useSelector((state) => state.auth.user);
  return (
    <div id="medicineStatistical">
      <div className="header">
        {userProfile.benh_vien.ANH_DAI_DIEN && <img className="logo" alt="" src={getImageFromSever(userProfile.benh_vien.ANH_DAI_DIEN)} />}
        <div>
          <div className="hospital-name">{userProfile.benh_vien.TEN_CSKCB}</div>
          <div>
            {i18n.t(languageKeys.dia_chi)} : {layDiaChi(userProfile.benh_vien)}
          </div>
          <div className="row-infomation">
            <div>
              {i18n.t(languageKeys.field_So_dien_thoai)}: {userProfile.benh_vien.SO_DIEN_THOAI || ""}
            </div>
            {/* <div>MS: {userProfile.benh_vien.MA_CSKCB}</div>
            <div>Số ......</div> */}
          </div>
        </div>
      </div>

      <div className="title">{i18n.t(languageKeys.label_bao_cao_thong_ke_ban_thuoc)}</div>
      <div className="date-wrap">
        <div className="w-2"></div>
        <div className="date-time">
          <div>
            {i18n.t(languageKeys.nguoi_lap_bao_cao)}:{" "}
            <b>
              {userProfile.HO} {userProfile.TEN}
            </b>
          </div>
          <div>
            {i18n.t(languageKeys.field_thoi_gian)}:{" "}
            <b>
              {data.range_time[0]} - {data.range_time[1]}
            </b>
          </div>
        </div>
        <div className="w-2"></div>
      </div>

      <table className="table">
        <thead>
          <th rowSpan="2">{i18n.t(languageKeys.stt)}</th>

          <th rowSpan="2">{i18n.t(languageKeys.field_ma_thuoc)}</th>

          <th rowSpan="3" style={{ width: "25%", textAlign: "left" }}>
            {i18n.t(languageKeys.field_ten_thuoc)}
          </th>

          <th rowSpan="2">{i18n.t(languageKeys.field_So_luong)}</th>

          <th rowSpan="2">{i18n.t(languageKeys.field_Don_vi)}</th>

          <th rowSpan="2">{i18n.t(languageKeys.field_don_gia)}</th>
          <th rowSpan="2">{i18n.t(languageKeys.field_tong_tien)}</th>
        </thead>

        {data?.medicineStatistical.map((item, index) => (
          <tr key={index}>
            <td>{index + 1}</td>
            <td>{item.MA_THUOC}</td>
            <td style={{ textAlign: "left" }}>{item.TEN_THUOC}</td>
            <td>{item.SO_LUONG}</td>
            <td>{item.TEN_DVT}</td>
            <td>{formatCurrency(item.GIA_BAN, "", true)}</td>
            <td>{formatCurrency(item.DOANH_THU, "", true)}</td>
          </tr>
        ))}
      </table>

      <div className="date-time-footer">
        {i18n.language === languages.tieng_viet ? (
          <>
            Ngày {moment().date()}, tháng {moment().month() + 1}, năm {moment().year()}
          </>
        ) : (
          <div style={{ marginRight: "6%" }}>{moment().format("MMMM d, YYYY")}</div>
        )}
      </div>
      <div className="footer">
        <div className="footer-chu-ky">
          {i18n.t(languageKeys.nguoi_lap_bao_cao).toUpperCase()}
          <div className="ky-ten">({i18n.t(languageKeys.ky_ten_va_dong_dau)})</div>
        </div>
      </div>
    </div>
  );
};
export default memo(MedicineStatisticalPdf);

const layDiaChi = (benh_vien) => {
  let string = "";
  if (benh_vien.DIA_CHI_CHI_TIET) {
    string = benh_vien.DIA_CHI_CHI_TIET;
  }
  if (benh_vien.TEN_PHUONG_XA) {
    string = string + `, ${benh_vien.TEN_PHUONG_XA}`;
  }
  if (benh_vien.TEN_QUAN_HUYEN) {
    string = string + `, ${benh_vien.TEN_QUAN_HUYEN}`;
  }
  if (benh_vien.TEN_TINH_THANH) {
    string = string + `, ${benh_vien.TEN_TINH_THANH}`;
  }
  return string;
};
