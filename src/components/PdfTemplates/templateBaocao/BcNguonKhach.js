import moment from "moment";
import { memo } from "react";
import { useSelector } from "react-redux";
import { getImageFromSever, getFullName, formatNumberToPrice } from "../../../helpers";
import i18n, { languageKeys, languages } from "../../../i18n";

export const styleBcNguonKhach = `
#doanh-thu * {
    font-size: 1rem;
    line-height: 1.5em;
    font-family: "Times New Roman", Times, serif;
}

#doanh-thu .logo {
    width: 75px;
    height: 75px;
    object-fit: contain;
}

#doanh-thu .header {
    display: flex;
    gap: 20px;
    flex-direction: row;
}

#doanh-thu .row-infomation {
    display: flex;
    flex-direction: row;
    gap: 20px;
    justify-content: space-between;
    width : 100%
}

#doanh-thu .hospital-name {
    text-transform: uppercase;
    font-weight: bold;
}

#doanh-thu .thong-tin-phieu {
    display: flex;
}

#doanh-thu .title {
    text-transform: uppercase;
    font-size:28px;
    font-weight: bold;
    margin-top: 1.5rem;
    text-align: center;
    line-height: 32px;
    margin-top: 20px;
}

#doanh-thu .reporter {
    text-align: center;
    font-size: 16px;
    line-height: 18px;
    font-weight: bold;
}

#doanh-thu .info-row {
  display: flex;
  justify-content: space-between;
  font-size: 16px;
  line-height: 18px;
}

#doanh-thu .info-row span {
  font-weight: bold;
}

#doanh-thu .info-row div {
  text-align: center;
}


#doanh-thu .table {
    margin-block: 1rem;
    width: 100%;
}

#doanh-thu .table * {
    font-size: 0.8rem;
}

#doanh-thu .table,
.table th, 
.table td {
    border: 1px solid black;
    border-collapse: collapse;
    text-align: center;
}

#doanh-thu .table th,
.table td {
    padding: 5px 10px;
    
}

#doanh-thu .table th {
    text-align: center;
}

#doanh-thu .thong-tin-thuoc {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: flex-start;
}
#doanh-thu .left-thong-tin-thuoc {
    width: 70%;
}
#doanh-thu .right-thong-tin-thuoc {
    width: 30%;
}
#doanh-thu .first-thong-tin{
    margin-top: 20px;
}
#doanh-thu .date-time-footer{
    display: flex;
    margin-top: 20px;
    font-size: 14px;
    text-align: center;
}

#doanh-thu .date-footer-right{
  width: 40%;
  text-align: center;
}
#doanh-thu .footer{
    display: flex;
    flex-direction: row;
    justify-content: space-between;

}
#doanh-thu .footer-chu-ky{
    text-align: center;
    font-size: 15px;
    font-weight: 700;
}
#doanh-thu .ky-ten {
    font-style: italic;
    font-size: 14px;
    font-weight: normal;
}

#doanh-thu .flex-wrap{
    display:flex;
    flex-direction:row;
}
#doanh-thu .time-range{
  width : 230px !important;
}

#doanh-thu .align-center { 
  text-align:center;
  margin-bottom: 16px;
}
@media print {
    #doanh-thu .foot-break {
        break-inside: avoid;
    }

`;
const BcNguonKhach = ({ data }) => {
  const userProfile = useSelector((state) => state.auth.user);

  const totalTienKham = data?.exportData?.reduce((total, item) => (!!item.TIEN_KB ? (total += Number(item.TIEN_KB)) : total), 0);
  const totalTienThuoc = data?.exportData?.reduce((total, item) => (!!item.TIEN_THUOC ? (total += Number(item.TIEN_THUOC)) : total), 0);
  const totalTongTien = data?.exportData?.reduce((total, item) => (!!item.TONG_THANH_TOAN ? (total += Number(item.TONG_THANH_TOAN)) : total), 0);
  const totalTienXN = data?.exportData?.reduce((total, item) => (!!item.TIEN_XN ? (total += Number(item.TIEN_XN)) : total), 0);
  const totalTienCDHA = data?.exportData?.reduce((total, item) => (!!item.TIEN_CDHA ? (total += Number(item.TIEN_CDHA)) : total), 0);
  const totalLuotKham = data?.exportData?.reduce((total, item) => (!!item.LUOT_TIEP_DON ? (total += Number(item.LUOT_TIEP_DON)) : total), 0);

  const timeRange = !data?.dataRequest?.TU_NGAY
    ? `${moment().format("DD/MM/YYYY")} - ${moment().format("DD/MM/YYYY")}`
    : `${moment(data?.dataRequest?.TU_NGAY, "YYYYMMDD").format("DD/MM/YYYY")} - ${moment(data?.dataRequest?.DEN_NGAY, "YYYYMMDD").format(
        "DD/MM/YYYY"
      )}`;
  const txtDsNguonKhach = data?.dataRequest?.selectedNguonKhach.map(item => item.TEN_NGUON_KHACH)

  return (
    <div id="doanh-thu">
      <div className="header">
        {userProfile.benh_vien.ANH_DAI_DIEN && <img className="logo" alt="" src={getImageFromSever(userProfile.benh_vien.ANH_DAI_DIEN)} />}
        <div>
          <div className="hospital-name">{userProfile.benh_vien.TEN_CSKCB}</div>
          <div>
            {i18n.t(languageKeys.dia_chi)}: {layDiaChi(userProfile.benh_vien)}
          </div>
          <div className="row-infomation">
            <div>
              {i18n.t(languageKeys.field_So_dien_thoai)}: {userProfile.benh_vien.SO_DIEN_THOAI || ""}
            </div>
          </div>
        </div>
      </div>

      <div className="title">Báo cáo nguồn khách</div>
      <div>
        <div className="reporter">
          {i18n.t(languageKeys.nguoi_lap_bao_cao)}: {getFullName(userProfile)}
        </div>
        <div className="align-center">
          <span>{i18n.t(languageKeys.nguon_khach)}</span>:{" "}
          <b>{txtDsNguonKhach.length > 0 ? txtDsNguonKhach.join(", ") : i18n.t(languageKeys.tat_ca)}</b>
        </div>
        <div className="align-center">
          <span>{i18n.t(languageKeys.thoi_gian)}</span>:{" "}
          <b>{timeRange}</b>
        </div>
      </div>


      <table className="table">
        <thead>
          <th rowSpan="2">{i18n.t(languageKeys.stt)}</th>

          <th rowSpan="2">{i18n.t(languageKeys.field_ma_nguon_khach)}</th>

          <th rowSpan="2">{i18n.t(languageKeys.field_ten_nguon_khach)}</th>
          {/* <th rowSpan="2">{i18n.t(languageKeys.field_hinh_thuc_thanh_toan)}</th> */}

          <th rowSpan="2">Lượt tiếp đón</th>

          <th rowSpan="2">{i18n.t(languageKeys.bao_cao_tien_kham)}</th>

          <th rowSpan="2">{i18n.t(languageKeys.bao_cao_tien_xet_nghiem)}</th>

          <th rowSpan="2">{i18n.t(languageKeys.bao_cao_tien_cdha)}</th>

          <th rowSpan="2">{i18n.t(languageKeys.bao_cao_tien_thuoc)}</th>

          <th rowSpan="2">{i18n.t(languageKeys.field_Tong_tien)}</th>
        </thead>

        {data?.exportData?.map((item, index) => (
          <tr>
            <td style={{ textAlign: "start" }}>{index + 1 < 10 ? `0${index + 1}` : index + 1}</td>
            <td style={{ textAlign: "start" }}>{item.MA_NGUON_KHACH}</td>
            <td style={{ textAlign: "start" }}>{item.TEN_NGUON_KHACH}</td>
            <td style={{ textAlign: "start" }}>{item.LUOT_TIEP_DON}</td>
            <td style={{ textAlign: "start" }}>{!!item.TIEN_KB ? formatNumberToPrice(item.TIEN_KB) : 0}</td>
            <td style={{ textAlign: "start" }}>{!!item.TIEN_XN ? formatNumberToPrice(item.TIEN_XN) : 0}</td>
            <td style={{ textAlign: "start" }}>{!!item.TIEN_CDHA ? formatNumberToPrice(item.TIEN_CDHA) : 0}</td>
            <td style={{ textAlign: "start" }}>{!!item.TIEN_THUOC ? formatNumberToPrice(item.TIEN_THUOC) : 0}</td>
            <td style={{ textAlign: "start" }}>{formatNumberToPrice(item.TONG_THANH_TOAN)}</td>
          </tr>
        ))}
        <tr>
          <td></td>
          <td colSpan="2" style={{ fontWeight: 700, textAlign: "center" }}>
            {i18n.t(languageKeys.cong_khoan)}
          </td>
          <td style={{ textAlign: "start" }}>{totalLuotKham}</td>
          <td style={{ textAlign: "start" }}>{formatNumberToPrice(totalTienKham)}</td>
          <td style={{ textAlign: "start" }}>{formatNumberToPrice(totalTienXN)}</td>
          <td style={{ textAlign: "start" }}>{formatNumberToPrice(totalTienCDHA)}</td>
          <td style={{ textAlign: "start" }}>{formatNumberToPrice(totalTienThuoc)}</td>
          <td style={{ textAlign: "start" }}>{formatNumberToPrice(totalTongTien)}</td>

        </tr>
      </table>
      <div style={{ display: "flex", justifyContent: "flex-end" }}>
        <div className="date-time-footer">
          <>
            {i18n.language === languages.tieng_viet ? (
              <>
                Ngày {moment().date()}, tháng {moment().month() + 1}, năm {moment().year()}
              </>
            ) : (
              <div className="date-footer-right">{moment().format("MMMM d, YYYY")}</div>
            )}
          </>
        </div>
      </div>
      <div className="footer">
        <div className="footer-chu-ky">
          {i18n.t(languageKeys.nguoi_lap_bao_cao).toUpperCase()}
          <div className="ky-ten">({i18n.t(languageKeys.ky_ten_va_dong_dau)})</div>
          {/* <div style={{ marginTop: 80, fontWeight: "bold" }}>{getFullName(userProfile)}</div> */}
        </div>
        <div className="footer-chu-ky">
          {i18n.t(languageKeys.truong_phong_tckt).toUpperCase()}
          <div className="ky-ten">({i18n.t(languageKeys.ky_ten_va_dong_dau)})</div>
        </div>
      </div>
    </div>
  );
};
export default memo(BcNguonKhach);

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
