import moment from "moment";
import { memo } from "react";
import { useSelector } from "react-redux";
import { formatCurrency2,  formatDay, getImageFromSever } from "../../../helpers";
import i18n, { languageKeys, languages } from "../../../i18n";

export const styleBcDoanhThuBanThuocPdf = `
#medicineSaleReport * {
    font-size: 1rem;
    line-height: 1.5em;
    font-family: "Times New Roman", Times, serif;
}

#medicineSaleReport .logo {
    width: 75px;
    height: 75px;
    object-fit: contain;
}

#medicineSaleReport .header {
    display: flex;
    gap: 20px;
    flex-direction: row;
}

#medicineSaleReport .row-infomation {
    display: flex;
    flex-direction: row;
    gap: 20px;
    justify-content: space-between;
    width : 100%
}

#medicineSaleReport .hospital-name {
    text-transform: uppercase;
    font-weight: bold;
}

#medicineSaleReport .thong-tin-phieu {
    display: flex;
}

#medicineSaleReport .title {
    text-transform: uppercase;
    font-size:24px;
    font-weight: bold;
    margin-top: 1.5rem;
    margin-bottom: 1rem;
    text-align: center;
    line-height: 32px;
    margin-top: 20px;
}

#medicineSaleReport .date-time {
    text-align: center;
    font-size: 12px;
    line-height: 18px;
    font-weight: 400;
    display:flex;
    justify-content:space-between;
    margin:0 20%;
}
#medicineSaleReport .date-time > div {
    font-size: 12px;
    line-height: 18px;
}
#medicineSaleReport .date-time > div > b {
    font-size: 12px;
    line-height: 18px;
}
#medicineSaleReport .table {
    margin-block: 1rem;
    width: 100%;
}

#medicineSaleReport .table * {
    font-size: 0.8rem;
}

#medicineSaleReport .table,
.table th, 
.table td {
    border: 1px solid black;
    border-collapse: collapse;
    text-align: center;
}

#medicineSaleReport .table th,
.table td {
    padding: 5px 10px;
    
}

#medicineSaleReport .table th {
    text-align: center;
}

#medicineSaleReport .thong-tin-thuoc {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: flex-start;
}
#medicineSaleReport .left-thong-tin-thuoc {
    width: 70%;
}
#medicineSaleReport .right-thong-tin-thuoc {
    width: 30%;
}
#medicineSaleReport .first-thong-tin{
    margin-top: 20px;
}
#medicineSaleReport .date-time-footer{
    margin-top: 20px;
    font-size: 14px;
    text-align: end;
}
#medicineSaleReport .footer{
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    padding:0 8%;

}
#medicineSaleReport .footer-chu-ky{
    text-align: center;
    font-size: 15px;
    font-weight: 700;
}
#medicineSaleReport .ky-ten {
    font-style: italic;
    font-size: 14px;
    font-weight: normal;
}

#medicineSaleReport .flex-wrap{
    display:flex;
    flex-direction:row;
}
#medicineSaleReport .date-wrap{
    width:100%;
}

@media print {
    #medicineSaleReport .foot-break {
        break-inside: avoid;
    }

`;
const MedicineSalePdf = ({ data }) => {
  const userProfile = useSelector((state) => state.auth.user);

  return (
    <div id="medicineSaleReport">
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

      <div className="title">{i18n.t(languageKeys.bao_cao_doanh_thu_ban_thuoc)}</div>
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

          <th rowSpan="2">{i18n.t(languageKeys.field_thoi_gian)}</th>

          <th rowSpan="3" style={{ width: "25%", textAlign: "left" }}>
            {i18n.t(languageKeys.field_ten_khach_hang)}
          </th>

          <th rowSpan="2">{i18n.t(languageKeys.field_So_dien_thoai)}</th>

          <th rowSpan="2">{i18n.t(languageKeys.field_Tong_gia_tien)}</th>

          <th rowSpan="2">{i18n.t(languageKeys.field_nguoi_ban_thuoc)}</th>
        </thead>

        {data.medicineSaleReport.map((item, index) => (
          <tr>
            <td>{index + 1}</td>
            <td>{formatDay(item.NGAY)}</td>
            <td style={{ textAlign: "left" }}>{item.TEN_BENH_NHAN}</td>
            <td>{item.SO_DIEN_THOAI}</td>
            <td>{formatCurrency2(item.TONG_THANH_TOAN, "", true)}</td>
            <td>{item.NGUOI_BAN}</td>
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
export default memo(MedicineSalePdf);

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
