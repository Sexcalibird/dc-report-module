import moment from "moment";
import { memo } from "react";
import { useSelector } from "react-redux";
import { getImageFromSever, getFullName, formatNumberToPrice } from "../../../helpers";
import i18n, { languageKeys, languages } from "../../../i18n";

export const styleDoanhThu = `
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
const DoanhThu = ({ data }) => {
  const userProfile = useSelector((state) => state.auth.user);

  const totalTienKham = data?.exportData?.reduce((total, item) => (!!item.TIEN_KB ? (total += Number(item.TIEN_KB)) : total), 0);
  const totalTienThuoc = data?.exportData?.reduce((total, item) => (!!item.TIEN_THUOC ? (total += Number(item.TIEN_THUOC)) : total), 0);
  const totalMienGiam = data?.exportData?.reduce((total, item) => (!!item.TIEN_MIEN_GIAM ? (total += Number(item.TIEN_MIEN_GIAM)) : total), 0);
  const totalTienHuy = data?.exportData?.reduce((total, item) => (!!item.TIEN_HUY ? (total += Number(item.TIEN_HUY)) : total), 0);
  const totalTongTien = data?.exportData?.reduce((total, item) => (!!item.TONG_TIEN ? (total += Number(item.TONG_TIEN)) : total), 0);
  const totalTienXN = data?.exportData?.reduce((total, item) => (!!item.TIEN_XN ? (total += Number(item.TIEN_XN)) : total), 0);
  const totalTienCDHA = data?.exportData?.reduce((total, item) => (!!item.TIEN_CDHA ? (total += Number(item.TIEN_CDHA)) : total), 0);
  const totalTienKhac = data?.exportData?.reduce((total, item) => (!!item.TIEN_KHAC ? (total += Number(item.TIEN_KHAC)) : total), 0);
  const totalTongTT = data?.exportData?.reduce((total, item) => (!!item.TONG_THANH_TOAN ? (total += Number(item.TONG_THANH_TOAN)) : total), 0);

  const timeRange = !data?.dataRequest?.TU_NGAY
    ? `${moment().format("DD/MM/YYYY")} - ${moment().format("DD/MM/YYYY")}`
    : `${moment(data?.dataRequest?.TU_NGAY, "YYYYMMDD").format("DD/MM/YYYY")} - ${moment(data?.dataRequest?.DEN_NGAY, "YYYYMMDD").format(
        "DD/MM/YYYY"
      )}`;

  const khoa = !data?.dataRequest?.selectedSpeciality ? i18n.t(languageKeys.tat_ca) : data?.dataRequest?.selectedSpeciality?.TEN_KHOA_PHONG;
  const phong = !data?.dataRequest?.selectedRoom ? i18n.t(languageKeys.tat_ca) : data?.dataRequest?.selectedRoom?.TEN_KHOA_PHONG;
  const bac_si =
    data?.dataRequest?.selectedDoctors.length === 0
      ? i18n.t(languageKeys.tat_ca)
      : data?.dataRequest?.selectedDoctors.length === 1
      ? getFullName(data?.dataRequest?.selectedDoctors[0])
      : `${data?.dataRequest?.selectedDoctors.length} ${i18n.t(languageKeys.bac_si)}`;

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

      <div className="title">{i18n.t(languageKeys.bao_cao_doanh_thu)}</div>
      <div>
        <div className="reporter">
          {i18n.t(languageKeys.nguoi_lap_bao_cao)}: {getFullName(userProfile)}
        </div>
        <div className="align-center">
          <span>{i18n.t(languageKeys.ten_hinh_thuc_thanh_toan)}</span>:{" "}
          <b>{data?.dataRequest?.TEN_HINH_THUC_TT ? data?.dataRequest?.TEN_HINH_THUC_TT : i18n.t(languageKeys.tat_ca)}</b>
        </div>
      </div>

      <div className="info-row">
        <div className="time-range">
          {i18n.t(languageKeys.field_thoi_gian)}: <span>{timeRange}</span>
        </div>
        <div>
          {i18n.t(languageKeys.khoa)}: <span>{khoa}</span>
        </div>
        <div>
          {i18n.t(languageKeys.phong)}: <span>{phong}</span>
        </div>
        <div>
          {i18n.t(languageKeys.field_Bac_si)}: <span>{bac_si}</span>
        </div>
      </div>

      <table className="table">
        <thead>
          <th rowSpan="2">{i18n.t(languageKeys.stt)}</th>

          <th rowSpan="2">{i18n.t(languageKeys.field_Ma_benh_nhan)}</th>

          <th rowSpan="2">{i18n.t(languageKeys.field_Ten_benh_nhan)}</th>
          {/* <th rowSpan="2">{i18n.t(languageKeys.field_hinh_thuc_thanh_toan)}</th> */}

          <th rowSpan="2">{i18n.t(languageKeys.bao_cao_tien_kham)}</th>

          <th rowSpan="2">{i18n.t(languageKeys.bao_cao_tien_xet_nghiem)}</th>

          <th rowSpan="2">{i18n.t(languageKeys.bao_cao_tien_cdha)}</th>

          <th rowSpan="2">{i18n.t(languageKeys.bao_cao_tien_khac)}</th>

          <th rowSpan="2">{i18n.t(languageKeys.bao_cao_tien_thuoc)}</th>

          <th rowSpan="2">{i18n.t(languageKeys.field_Tong_tien)}</th>

          <th rowSpan="2">{i18n.t(languageKeys.field_Mien_giam)}</th>

          <th rowSpan="2">{i18n.t(languageKeys.bao_cao_tien_huy)}</th>

          <th rowSpan="2">{i18n.t(languageKeys.bao_cao_tong_cong)}</th>
        </thead>

        {data?.exportData?.map((item, index) => (
          <tr>
            <td style={{ textAlign: "center" }}>{index + 1 < 10 ? `0${index + 1}` : index + 1}</td>
            <td style={{ textAlign: "center" }}>{item.MA_BENH_NHAN}</td>
            <td style={{ textAlign: "start" }}>{item.TEN_BENH_NHAN}</td>
            {/* <td style={{ textAlign: "start" }}>{item.HINH_THUC_TT}</td> */}
            <td style={{ textAlign: "end" }}>{!!item.TIEN_KB ? formatNumberToPrice(item.TIEN_KB) : ""}</td>
            <td style={{ textAlign: "end" }}>{!!item.TIEN_XN ? formatNumberToPrice(item.TIEN_XN) : ""}</td>
            <td style={{ textAlign: "end" }}>{!!item.TIEN_CDHA ? formatNumberToPrice(item.TIEN_CDHA) : ""}</td>
            <td style={{ textAlign: "end" }}>{!!item.TIEN_KHAC ? formatNumberToPrice(item.TIEN_KHAC) : ""}</td>
            <td style={{ textAlign: "end" }}>{!!item.TIEN_THUOC ? formatNumberToPrice(item.TIEN_THUOC) : ""}</td>
            <td style={{ textAlign: "end" }}>{formatNumberToPrice(item.TONG_TIEN)}</td>
            <td style={{ textAlign: "end" }}>{!!item.TIEN_MIEN_GIAM ? formatNumberToPrice(item.TIEN_MIEN_GIAM) : ""}</td>
            <td style={{ textAlign: "end" }}>{!!item.TIEN_HUY ? formatNumberToPrice(item.TIEN_HUY) : ""}</td>
            <td style={{ textAlign: "end" }}>{formatNumberToPrice(item.TONG_THANH_TOAN)}</td>
          </tr>
        ))}
        <tr>
          <td></td>
          <td colSpan="2" style={{ fontWeight: 700, textAlign: "center" }}>
            {i18n.t(languageKeys.cong_khoan)}
          </td>
          <td style={{ textAlign: "end" }}>{formatNumberToPrice(totalTienKham)}</td>
          <td style={{ textAlign: "end" }}>{formatNumberToPrice(totalTienXN)}</td>
          <td style={{ textAlign: "end" }}>{formatNumberToPrice(totalTienCDHA)}</td>
          <td style={{ textAlign: "end" }}>{formatNumberToPrice(totalTienKhac)}</td>
          <td style={{ textAlign: "end" }}>{formatNumberToPrice(totalTienThuoc)}</td>
          <td style={{ textAlign: "end" }}>{formatNumberToPrice(totalTongTien)}</td>
          <td style={{ textAlign: "end" }}>{formatNumberToPrice(totalMienGiam)}</td>
          <td style={{ textAlign: "end" }}>{formatNumberToPrice(totalTienHuy)}</td>
          <td style={{ textAlign: "end" }}>{formatNumberToPrice(totalTongTT)}</td>
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
export default memo(DoanhThu);

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
