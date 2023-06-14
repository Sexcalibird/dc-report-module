import moment from "moment";
import { memo } from "react";
import { useSelector } from "react-redux";
import { getImageFromSever, formatNumberToPrice, getFullName, HLog } from "../../../helpers";
import i18n, { languageKeys, languages } from "../../../i18n";

export const styleTheoDoiThuNgan = `
#thu-ngan * {
    font-size: 1rem;
    line-height: 1.5em;
    font-family: "Times New Roman", Times, serif;
}

#thu-ngan .logo {
    width: 75px;
    height: 75px;
    object-fit: contain;
}

#thu-ngan .header {
    display: flex;
    gap: 20px;
    flex-direction: row;
}

#thu-ngan .row-infomation {
    display: flex;
    flex-direction: row;
    gap: 20px;
    justify-content: space-between;
    width : 100%
}

#thu-ngan .hospital-name {
    text-transform: uppercase;
    font-weight: bold;
}

#thu-ngan .thong-tin-phieu {
    display: flex;
}

#thu-ngan .title {
  text-transform: uppercase;
  font-size:28px;
  font-weight: bold;
  margin-top: 1.5rem;
  text-align: center;
  line-height: 32px;
  margin-top: 20px;
}

#thu-ngan .reporter {
    text-align: center;
    font-size: 16px;
    line-height: 18px;
    font-weight: bold;
    margin-bottom: 26px;
}

#thu-ngan .info-row {
   display: flex;
  justify-content: space-between;
  font-size: 16px;
  line-height: 18px;
}

#thu-ngan .info-row span {
  font-weight: bold;
}

#thu-ngan .info-row div {
  //width: 33%;
  text-align: center;
}


#thu-ngan .table {
    margin-block: 1rem;
    width: 100%;
}

#thu-ngan .table * {
    font-size: 0.8rem;
}

#thu-ngan .table,
.table th, 
.table td {
    border: 1px solid black;
    border-collapse: collapse;
}

#thu-ngan .table th,
.table td {
    padding: 5px 10px;
}

#thu-ngan .thong-tin-thuoc {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: flex-start;
}
#thu-ngan .left-thong-tin-thuoc {
    width: 70%;
}
#thu-ngan .right-thong-tin-thuoc {
    width: 30%;
}
#thu-ngan .first-thong-tin{
    margin-top: 20px;
}
#thu-ngan .date-time-footer{
    display: flex;
    margin-top: 20px;
    justify-content: flex-end;
    font-size: 14px;
    text-align: center;
}
#thu-ngan .footer{
    display: flex;
    flex-direction: row;
    justify-content: space-between;

}
#thu-ngan .footer-chu-ky{
    text-align: center;
    font-size: 15px;
    font-weight: 700;
}
#thu-ngan .ky-ten {
    font-style: italic;
    font-size: 14px;
    font-weight: normal;
    margin-bottom: 14px;
}

#thu-ngan .table tbody th {
  text-align: start;
}

#thu-ngan .flex-wrap{
    display:flex;
    flex-direction:row;
}

#thu-ngan .time-range{
  width : 230px !important;
}

@media print {
    #thu-ngan .foot-break {
        break-inside: avoid;
    }

`;
const TheoDoiThuNgan = ({ data }) => {
  HLog("TheoDoiThuNgan data: ", data);
  const userProfile = useSelector((state) => state.auth.user);


  const totalTienKham = data?.exportData?.reduce((total, item) => (!!item.TIEN_KB ? (total += Number(item.TIEN_KB)) : total), 0);
  const totalTienDVKT = data?.exportData?.reduce((total, item) => (!!item.TIEN_CLS ? (total += Number(item.TIEN_CLS)) : total), 0);
  const totalTienThuoc = data?.exportData?.reduce((total, item) => (!!item.TIEN_THUOC ? (total += Number(item.TIEN_THUOC)) : total), 0);
  const totalMienGiam = data?.exportData?.reduce((total, item) => (!!item.TIEN_MIEN_GIAM ? (total += Number(item.TIEN_MIEN_GIAM)) : total), 0);
  const totalTienHuy = data?.exportData?.reduce((total, item) => (!!item.TIEN_HUY ? (total += Number(item.TIEN_HUY)) : total), 0);
  const totalTongCong = data?.exportData?.reduce((total, item) => (!!item.TONG_TIEN ? (total += Number(item.TONG_TIEN)) : total), 0);

  const timeRange = !data?.dataRequest?.TU_NGAY
    ? `${moment().format("DD/MM/YYYY")} - ${moment().format("DD/MM/YYYY")}`
    : `${moment(data?.dataRequest?.TU_NGAY, "YYYYMMDD").format("DD/MM/YYYY")} - ${moment(data?.dataRequest?.DEN_NGAY, "YYYYMMDD").format(
        "DD/MM/YYYY"
      )}`;

  const thuNgan =
    data?.dataRequest?.selectedCashiers.length === 0
      ? i18n.t(languageKeys.tat_ca)
      : data?.dataRequest?.selectedCashiers.length === 1
      ? getFullName(data?.dataRequest?.selectedCashiers[0])
      : `${data?.dataRequest?.selectedCashiers.length} ${i18n.t(languageKeys.so_nhan_vien)}`;
  const hinh_thuc_tt = data?.dataRequest?.TEN_HINH_THUC_TT ? data?.dataRequest.TEN_HINH_THUC_TT : i18n.t(languageKeys.tat_ca)
  const khoa_filter = data?.dataRequest?.selectedSpeciality ? data.dataRequest.selectedSpeciality.TEN_KHOA_PHONG : i18n.t(languageKeys.tat_ca);
  return (
    <div id="thu-ngan">
      <div className="header">
        {userProfile.benh_vien.ANH_DAI_DIEN && <img className="logo" alt="" src={getImageFromSever(userProfile.benh_vien.ANH_DAI_DIEN)} />}
        <div>
          <div className="hospital-name">{userProfile.benh_vien.TEN_CSKCB}</div>
          <div>{i18n.t(languageKeys.dia_chi)} : {layDiaChi(userProfile.benh_vien)}</div>
          <div className="row-infomation">
            <div>{i18n.t(languageKeys.field_So_dien_thoai)}: {userProfile.benh_vien.SO_DIEN_THOAI || ""}</div>
          </div>
        </div>
      </div>

      <div className="title">{i18n.t(languageKeys.bao_cao_theo_doi_thu_ngan)}</div>
      <div>
        <div className="reporter">{i18n.t(languageKeys.nguoi_lap_bao_cao)}: {getFullName(userProfile)}</div>
      </div>

      <div className="info-row">
        <div className="time-range">
        {i18n.t(languageKeys.field_thoi_gian)}: <span>{timeRange}</span>
        </div>
        <div>
        {i18n.t(languageKeys.nhan_vien)}: <span>{thuNgan}</span>
        </div>
        {/*<div>*/}
        {/*  Đối tượng: <span>Viện phí</span>*/}
        {/*</div>*/}
        <div>
        {i18n.t(languageKeys.khoa)}: <span>{khoa_filter}</span>
        </div>
        <div>
        {i18n.t(languageKeys.field_hinh_thuc_thanh_toan)}: <span>{hinh_thuc_tt}</span>
        </div>
      </div>

      {/*<div className="info-row">*/}
      {/* */}
      {/*  <div>*/}
      {/*    Khoa: <span>{khoa_filter}</span>*/}
      {/*  </div>*/}
      {/*  <div>*/}
      {/*    Bác sĩ: <span>{bac_si}</span>*/}
      {/*  </div>*/}
      {/*</div>*/}

      <table className="table">
        <thead>
          <th>{i18n.t(languageKeys.stt)}</th>

          <th>{i18n.t(languageKeys.ten_nhan_vien)}</th>

          <th>{i18n.t(languageKeys.bao_cao_tien_kham)}</th>

          <th>{i18n.t(languageKeys.bao_cao_tien_dvkt)}</th>

          <th>{i18n.t(languageKeys.bao_cao_tien_thuoc)}</th>

          <th>{i18n.t(languageKeys.bao_cao_tien_mien_giam)}</th>

          <th>{i18n.t(languageKeys.bao_cao_tien_huy)}</th>
          {/* <th>{i18n.t(languageKeys.field_hinh_thuc_thanh_toan)}</th> */}
          <th>{i18n.t(languageKeys.bao_cao_tong_cong)}</th>
        </thead>

        <tbody>
          {data?.exportData?.map((item, index) => (
            <tr>
              <td style={{ textAlign: "center" }}>{index + 1 < 10 ? `0${index + 1}` : index + 1}</td>
              <td>{getFullName(item)}</td>
              <td style={{ textAlign: "end" }}>{!!item.TIEN_KB ? formatNumberToPrice(item.TIEN_KB) : ""}</td>
              <td style={{ textAlign: "end" }}>{!!item.TIEN_CLS ? formatNumberToPrice(item.TIEN_CLS) : ""}</td>
              <td style={{ textAlign: "end" }}>{!!item.TIEN_THUOC ? formatNumberToPrice(item.TIEN_THUOC) : ""}</td>
              <td style={{ textAlign: "end" }}>{!!item.TIEN_MIEN_GIAM ? formatNumberToPrice(item.TIEN_MIEN_GIAM) : ""}</td>
              <td style={{ textAlign: "end" }}>{!!item.TIEN_HUY ? formatNumberToPrice(item.TIEN_HUY) : ""}</td>
              {/* <td style={{ textAlign: "center" }}>{item?.HINH_THUC_TT}</td> */}
              <td style={{ textAlign: "end" }}>{formatNumberToPrice(item.TONG_TIEN)}</td>
            </tr>
          ))}

          <tr>
            <th></th>
            <th style={{ fontWeight: 700 }}>{i18n.t(languageKeys.cong_khoan)}</th>
            <th style={{ textAlign: "end" }}>{formatNumberToPrice(totalTienKham)}</th>
            <th style={{ textAlign: "end" }}>{formatNumberToPrice(totalTienDVKT)}</th>
            <th style={{ textAlign: "end" }}>{formatNumberToPrice(totalTienThuoc)}</th>
            <th style={{ textAlign: "end" }}>{formatNumberToPrice(totalMienGiam)}</th>
            <th style={{ textAlign: "end" }}>{formatNumberToPrice(totalTienHuy)}</th>
            {/* <th style={{ textAlign: "end" }}></th> */}
            <th style={{ textAlign: "end" }}>{formatNumberToPrice(totalTongCong)}</th>
          </tr>
        </tbody>
      </table>

      <div className="date-time-footer">
        <div>
          {i18n.language === languages.tieng_viet ?  <>Ngày {moment().date()}, tháng {moment().month() + 1}, năm {moment().year()}</> : <div style={{marginLeft:"-150%"}}>{moment().format('MMMM d, YYYY')}</div>}
        </div>
      </div>
      <div className="footer">
        <div className="footer-chu-ky">
        {i18n.t(languageKeys.nguoi_lap_bao_cao)}
          <div className="ky-ten">({i18n.t(languageKeys.ky_ten_va_dong_dau)})</div>
          {/* <div style={{ marginTop: 80, fontWeight: "bold" }}>{getFullName(userProfile)}</div> */}
        </div>
        <div className="footer-chu-ky">
        {i18n.t(languageKeys.truong_phong_tckt)}
          <div className="ky-ten">({i18n.t(languageKeys.ky_ten_va_dong_dau)})</div>
        </div>
      </div>
    </div>
  );
};
export default memo(TheoDoiThuNgan);

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
