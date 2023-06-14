import moment from "moment";
import { memo } from "react";
import { useSelector } from "react-redux";
import { getImageFromSever, getFullName, formatNumberToPrice, formatCurrency } from "../../../helpers";
import i18n, { languageKeys, languages } from "../../../i18n";

export const styleBcThuNganBnDv = `
#thu_ngan_bn * {
    font-size: 1rem;
    line-height: 1.5em;
    font-family: "Times New Roman", Times, serif;
}

#thu_ngan_bn .logo {
    width: 75px;
    height: 75px;
    object-fit: contain;
}

#thu_ngan_bn .header {
    display: flex;
    gap: 20px;
    flex-direction: row;
}

#thu_ngan_bn .row-infomation {
    display: flex;
    flex-direction: row;
    gap: 20px;
    justify-content: space-between;
    width : 100%
}

#thu_ngan_bn .hospital-name {
    text-transform: uppercase;
    font-weight: bold;
}

#thu_ngan_bn .thong-tin-phieu {
    display: flex;
}

#thu_ngan_bn .title {
    text-transform: uppercase;
    font-size:28px;
    font-weight: bold;
    margin-top: 1.5rem;
    text-align: center;
    line-height: 32px;
    margin-top: 20px;
}

#thu_ngan_bn .reporter {
    text-align: center;
    font-size: 16px;
    line-height: 18px;
    font-weight: bold;
}

#thu_ngan_bn .info-row {
  display: flex;
  justify-content: space-between;
  font-size: 16px;
  line-height: 18px;
}

#thu_ngan_bn .info-row span {
  font-weight: bold;
}

#thu_ngan_bn .info-row div {
  text-align: center;
}


#thu_ngan_bn .table {
    margin-block: 1rem;
    width: 100%;
}

#thu_ngan_bn .table * {
    font-size: 0.8rem;
}

#thu_ngan_bn .table,
.table th, 
.table td {
    border: 1px solid black;
    border-collapse: collapse;
    text-align: center;
}

#thu_ngan_bn .table th,
.table td {
    padding: 5px 10px;
    
}

#thu_ngan_bn .table th {
    text-align: center;
}

#thu_ngan_bn .thong-tin-thuoc {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: flex-start;
}
#thu_ngan_bn .left-thong-tin-thuoc {
    width: 70%;
}
#thu_ngan_bn .right-thong-tin-thuoc {
    width: 30%;
}
#thu_ngan_bn .first-thong-tin{
    margin-top: 20px;
}
#thu_ngan_bn .date-time-footer{
    display: flex;
    margin-top: 20px;
    font-size: 14px;
    text-align: center;
}

#thu_ngan_bn .date-footer-right{
  width: 40%;
  text-align: center;
}
#thu_ngan_bn .footer{
    display: flex;
    flex-direction: row;
    justify-content: space-between;

}
#thu_ngan_bn .footer-chu-ky{
    text-align: center;
    font-size: 15px;
    font-weight: 700;
}
#thu_ngan_bn .ky-ten {
    font-style: italic;
    font-size: 14px;
    font-weight: normal;
}

#thu_ngan_bn .flex-wrap{
    display:flex;
    flex-direction:row;
}
#thu_ngan_bn .time-range{
  width : 230px !important;
}

#thu_ngan_bn .align-center { 
  text-align:center;
  margin-bottom: 16px;
}
@media print {
    #thu_ngan_bn .foot-break {
        break-inside: avoid;
    }

`;
const ThuNganBn = ({ data }) => {
  const userProfile = useSelector((state) => state.auth.user);

  // console.log("dansdnsakjdnjsakdnjsak", data);

    const totlSL = data?.exportData?.reduce((total, item) => (!!item.SO_LUONG ? (total += Number(item.SO_LUONG)) : total), 0);
    const totalMienGiam = data?.exportData?.reduce((total, item) => (!!item.TONG_TIEN_GIAM ? (total += Number(item.TONG_TIEN_GIAM)) : total), 0);
    const totalThanhToan = data?.exportData?.reduce((total, item) =>  (total += ((+item.DON_GIA * (item.SO_LUONG || 1)) - +item.TONG_TIEN_GIAM)), 0);

  const timeRange = !data?.dataRequest?.TU_NGAY
    ? `${moment().format("DD/MM/YYYY")} - ${moment().format("DD/MM/YYYY")}`
    : `${moment(data?.dataRequest?.TU_NGAY, "YYYYMMDD").format("DD/MM/YYYY")} - ${moment(data?.dataRequest?.DEN_NGAY, "YYYYMMDD").format(
        "DD/MM/YYYY"
      )}`;

  // const khoa = !data?.dataRequest?.selectedService ? i18n.t(languageKeys.tat_ca) : data?.dataRequest?.selectedService?.TEN_KHOA_PHONG;
  const doiTuong = !data?.dataRequest?.selectedObject ? i18n.t(languageKeys.tat_ca) : data?.dataRequest?.selectedObject?.TEN_DOI_TUONG;
  // const bac_si =TEN_DOI_TUONG
  //   data?.dataRequest?.selectedDoctors?.length === 0
  //     ? i18n.t(languageKeys.tat_ca)
  //     : data?.dataRequest?.selectedDoctors?.length === 1
  //     ? getFullName(data?.dataRequest?.selectedDoctors[0])
  //     : `${data?.dataRequest?.selectedDoctors?.length} ${i18n.t(languageKeys.bac_si)}`;

  return (
    <div id="thu_ngan_bn">
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

      <div className="title">{i18n.t(languageKeys.bao_cao_thu_ngan_benh_nhan)}</div>
      <div>
        <div className="reporter">
          {i18n.t(languageKeys.nguoi_lap_bao_cao)}: {getFullName(userProfile)}
        </div>
      </div>

      <div className="info-row">
        <div className="time-range">
          {i18n.t(languageKeys.field_thoi_gian)}: <span>{timeRange}</span>
        </div>
        <div>
          {i18n.t(languageKeys.field_Doi_tuong)}: <span>{doiTuong}</span>
        </div>
        <div>
          {i18n.t(languageKeys.ten_hinh_thuc_thanh_toan)}:{" "}
          <span>{data?.dataRequest?.TEN_HINH_THUC_TT ? data?.dataRequest?.TEN_HINH_THUC_TT : i18n.t(languageKeys.tat_ca)}</span>
        </div>
      </div>

      <table className="table">
        <thead>
          <th rowSpan="2">{i18n.t(languageKeys.stt)}</th>

          <th rowSpan="2">{i18n.t(languageKeys.ma_kh)}</th>

          <th rowSpan="2">{i18n.t(languageKeys.ten_khach_hang)}</th>

          <th rowSpan="2">{i18n.t(languageKeys.field_Ten_dich_vu)}</th>

          <th rowSpan="2">{i18n.t(languageKeys.ngay_thanh_toan)}</th>

          <th rowSpan="2">{i18n.t(languageKeys.field_So_phieu)}</th>

          <th rowSpan="2">{i18n.t(languageKeys.field_Bac_si_chi_dinh)}</th>

          <th rowSpan="2">{i18n.t(languageKeys.field_Phong_chi_dinh)}</th>

          <th rowSpan="2">{i18n.t(languageKeys.thoi_gian_chi_dinh)}</th>

          <th rowSpan="2">{i18n.t(languageKeys.field_hinh_thuc_thanh_toan)}</th>

          <th rowSpan="2">{i18n.t(languageKeys.txt_So_luong)}</th>

          <th rowSpan="2">{i18n.t(languageKeys.field_don_gia)}</th>

          <th rowSpan="2">{i18n.t(languageKeys.field_Mien_giam)}</th>

          <th rowSpan="2">{i18n.t(languageKeys.thanh_tien)}</th>
        </thead>

        {data?.exportData?.map((item, index) => (
          <tr>
            <td style={{ textAlign: "center" }}>{index + 1 < 10 ? `0${index + 1}` : index + 1}</td>
            <td style={{ textAlign: "center" }}>{item.MA_BENH_NHAN}</td>
            <td style={{ textAlign: "start" }}>{item.TEN_BENH_NHAN}</td>
            <td style={{ textAlign: "start" }}>{item.TEN_DICHVU}</td>
            <td style={{ textAlign: "start" }}>
              {item.GIO_THANH_TOAN} : {item.NGAY_THANH_TOAN ? moment(item.NGAY_THANH_TOAN).format("DD/MM/YYYY") : ""}
            </td>
            <td style={{ textAlign: "start" }}>{item.SO_PHIEU}</td>
            <td style={{ textAlign: "start" }}>{item.BAC_SI !== " " ? item.BAC_SI : i18n.t(languageKeys.data_Tiep_tan)}</td>
            <td style={{ textAlign: "start" }}>{item.PHONG_CHI_DINH ? item.PHONG_CHI_DINH : i18n.t(languageKeys.phong_tiep_don)}</td>
            <td style={{ textAlign: "start" }}>
              {item.GIO_CHI_DINH} : {item.NGAY_CHI_DINH ? moment(item.NGAY_CHI_DINH).format("DD/MM/YYYY") : ""}
            </td>
            <td style={{ textAlign: "start" }}>{item.HINH_THUC_THANH_TOAN}</td>
            <td style={{ textAlign: "start" }}>{item.SO_LUONG ? item.SO_LUONG : 1}</td>
            <td style={{ textAlign: "start" }}>{formatCurrency(item.DON_GIA, "", true)}</td>
            <td style={{ textAlign: "start" }}>{formatCurrency(item.TONG_TIEN_GIAM,"",true)}</td>
            <td style={{ textAlign: "start" }}>{formatCurrency(+item.DON_GIA - +item.TONG_TIEN_GIAM, "", true)}</td>
            {/* <td style={{ textAlign: "end" }}>{!!item.TIEN_KB ? formatNumberToPrice(item.TIEN_KB) : ""}</td>
            <td style={{ textAlign: "end" }}>{!!item.TIEN_XN ? formatNumberToPrice(item.TIEN_XN) : ""}</td>
            <td style={{ textAlign: "end" }}>{!!item.TIEN_CDHA ? formatNumberToPrice(item.TIEN_CDHA) : ""}</td>
            <td style={{ textAlign: "end" }}>{!!item.TIEN_KHAC ? formatNumberToPrice(item.TIEN_KHAC) : ""}</td>
            <td style={{ textAlign: "end" }}>{!!item.TIEN_THUOC ? formatNumberToPrice(item.TIEN_THUOC) : ""}</td>
            <td style={{ textAlign: "end" }}>{formatNumberToPrice(item.TONG_TIEN)}</td>
            <td style={{ textAlign: "end" }}>{!!item.TIEN_MIEN_GIAM ? formatNumberToPrice(item.TIEN_MIEN_GIAM) : ""}</td>
            <td style={{ textAlign: "end" }}>{!!item.TIEN_HUY ? formatNumberToPrice(item.TIEN_HUY) : ""}</td>
            <td style={{ textAlign: "end" }}>{formatNumberToPrice(item.TONG_THANH_TOAN)}</td> */}
          </tr>
        ))}
        <tr>
          <td></td>
          <td colSpan="9" style={{ fontWeight: 700, textAlign: "center" }}>
            {i18n.t(languageKeys.cong_khoan)}
          </td>
          <td style={{ textAlign: "end" }}>{totlSL}</td>
          <td></td>
          <td style={{ textAlign: "end" }}>{formatNumberToPrice(totalMienGiam)}</td>
          <td style={{ textAlign: "end" }}>{formatNumberToPrice(totalThanhToan)}</td>
         
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
export default memo(ThuNganBn);

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
