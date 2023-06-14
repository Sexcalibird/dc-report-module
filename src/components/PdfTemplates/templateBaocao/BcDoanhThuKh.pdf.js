import moment from "moment";
import { memo } from "react";
import { useSelector } from "react-redux";
import { getImageFromSever, getFullName, formatNumberToPrice, formatCurrency2, rid } from "../../../helpers";
import i18n, { languageKeys, languages } from "../../../i18n";

export const styleDoanhThuKh = `
#doanh-thu-kh * {
    font-size: 1rem;
    line-height: 1.5em;
    font-family: "Times New Roman", Times, serif;
}

#doanh-thu-kh .logo {
    width: 75px;
    height: 75px;
    object-fit: contain;
}

#doanh-thu-kh .header {
    display: flex;
    gap: 20px;
    flex-direction: row;
}

#doanh-thu-kh .row-infomation {
    display: flex;
    flex-direction: row;
    gap: 20px;
    justify-content: space-between;
    width : 100%
}

#doanh-thu-kh .hospital-name {
    text-transform: uppercase;
    font-weight: bold;
}

#doanh-thu-kh .thong-tin-phieu {
    display: flex;
}

#doanh-thu-kh .title {
    text-transform: uppercase;
    font-size:28px;
    font-weight: bold;
    margin-top: 1.5rem;
    text-align: center;
    line-height: 32px;
    margin-top: 20px;
}

#doanh-thu-kh .reporter {
    text-align: center;
    font-size: 16px;
    line-height: 18px;
    font-weight: bold;
}

#doanh-thu-kh .info-row {
  display: flex;
  justify-content: space-between;
  font-size: 16px;
  line-height: 18px;
}

#doanh-thu-kh .info-row span {
  font-weight: bold;
}

#doanh-thu-kh .info-row div {
  text-align: center;
}


#doanh-thu-kh .table {
    margin-block: 1rem;
    width: 100%;
}

#doanh-thu-kh .table * {
    font-size: 0.8rem;
}

#doanh-thu-kh .table,
.table th, 
.table td {
    border: 1px solid black;
    border-collapse: collapse;
    text-align: center;
}

#doanh-thu-kh .table th,
.table td {
    padding: 5px 10px;
    
}

#doanh-thu-kh .table th {
    text-align: center;
}

#doanh-thu-kh .thong-tin-thuoc {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: flex-start;
}
#doanh-thu-kh .left-thong-tin-thuoc {
    width: 70%;
}
#doanh-thu-kh .right-thong-tin-thuoc {
    width: 30%;
}
#doanh-thu-kh .first-thong-tin{
    margin-top: 20px;
}
#doanh-thu-kh .date-time-footer{
    display: flex;
    margin-top: 20px;
    font-size: 14px;
    text-align: center;
}

#doanh-thu-kh .date-footer-right{
  width: 40%;
  text-align: center;
}
#doanh-thu-kh .footer{
    display: flex;
    flex-direction: row;
    justify-content: space-between;

}
#doanh-thu-kh .footer-chu-ky{
    text-align: center;
    font-size: 15px;
    font-weight: 700;
}
#doanh-thu-kh .ky-ten {
    font-style: italic;
    font-size: 14px;
    font-weight: normal;
}

#doanh-thu-kh .flex-wrap{
    display:flex;
    flex-direction:row;
}
#doanh-thu-kh .time-range{
  width : 230px !important;
}

#doanh-thu-kh .align-center { 
  text-align:center;
  margin-bottom: 16px;
}
@media print {
    #doanh-thu-kh .foot-break {
        break-inside: avoid;
    }

`;
const PhuongThuc = ({ data,extraData }) => {
  const userProfile = useSelector((state) => state.auth.user);
  const totalTienKham = data?.exportData?.reduce((total, item) => (!!item.TIEN_KB ? (total += Number(item.TIEN_KB)) : total), 0);
  const totalTienThuoc = data?.exportData?.reduce((total, item) => (!!item.TIEN_THUOC ? (total += Number(item.TIEN_THUOC)) : total), 0);
  // const totalMienGiam = data?.exportData?.reduce((total, item) => (!!item.TIEN_MIEN_GIAM ? (total += Number(item.TIEN_MIEN_GIAM)) : total), 0);
  // const totalTienHuy = data?.exportData?.reduce((total, item) => (!!item.TIEN_HUY ? (total += Number(item.TIEN_HUY)) : total), 0);
  const totalTongTien = data?.exportData?.reduce((total, item) => (!!item.TONG_TIEN ? (total += Number(item.TONG_TIEN)) : total), 0);
  const totalTienXN = data?.exportData?.reduce((total, item) => (!!item.TIEN_XN ? (total += Number(item.TIEN_XN)) : total), 0);
  const totalTienCDHA = data?.exportData?.reduce((total, item) => (!!item.TIEN_CDHA ? (total += Number(item.TIEN_CDHA)) : total), 0);
  const totalTienKhac = data?.exportData?.reduce((total, item) => (!!item.TIEN_KHAC ? (total += Number(item.TIEN_KHAC)) : total), 0);

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
    <div id="doanh-thu-kh">
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

      <div className="title">{i18n.t(languageKeys.bao_cao_doanh_thu_kh)}</div>
      <div>
        <div className="reporter">
          {i18n.t(languageKeys.nguoi_lap_bao_cao)}: {getFullName(userProfile)}
        </div>
        <div className="align-center">
          {i18n.t(languageKeys.field_thoi_gian)}: <span>{timeRange}</span>
        </div>
      </div>

      <table className="table">
        <thead>
          <th rowSpan="2">{i18n.t(languageKeys.stt)}</th>
          <th rowSpan="2">{i18n.t(languageKeys.field_Ngay_kham)}</th>

          <th rowSpan="2">{i18n.t(languageKeys.ma_kh)}</th>

          <th rowSpan="2">{i18n.t(languageKeys.ten_khach_hang)}</th>

          <th style={{ textAlign: "center" }}>{i18n.t(languageKeys.bao_cao_tien_kham)}</th>
          <th style={{ textAlign: "center" }}>{i18n.t(languageKeys.bao_cao_tien_xet_nghiem)}</th>
          <th style={{ textAlign: "center" }}>{i18n.t(languageKeys.bao_cao_tien_cdha)}</th>
          <th style={{ textAlign: "center" }}>{i18n.t(languageKeys.bao_cao_tien_thuoc)}</th>
          <th style={{ textAlign: "center" }}>{i18n.t(languageKeys.bao_cao_tien_khac)}</th>
          <th style={{ textAlign: "center" }}>{i18n.t(languageKeys.tong_tien)}</th>



        </thead>

        {data?.exportData?.map((item, index) => (
          <tr>
            <td style={{ textAlign: "center" }}>{index + 1 < 10 ? `0${index + 1}` : index + 1}</td>
            <td style={{ textAlign: "center" }}>{moment(item.NGAY).format('DD/MM/YYYY')}</td>
            <td style={{ textAlign: "start" }}>{item.MA_BENH_NHAN}</td>
            <td style={{ textAlign: "start" }}>{item.TEN_BENH_NHAN}</td>
            <td style={{ textAlign: "end" }}>{formatCurrency2(item.TIEN_KB,"",true)}</td>
            <td style={{ textAlign: "end" }}>{formatCurrency2(item.TIEN_XN,"",true)}</td>
            <td style={{ textAlign: "end" }}>{formatCurrency2(item.TIEN_CDHA,"",true)}</td>
            <td style={{ textAlign: "end" }}>{formatCurrency2(item.TIEN_THUOC,"",true)}</td>
            <td style={{ textAlign: "end" }}>{formatCurrency2(item.TIEN_KHAC,"",true)}</td>
            <td style={{ textAlign: "end" }}>{formatCurrency2(item.TONG_TIEN,"",true)}</td>
          </tr>
        ))}
        <tr>
          <td style={{ textAlign: "end" }}></td>
          <td style={{ textAlign: "end" }}></td>
          <td style={{ textAlign: "end" }}></td>
          <td style={{ textAlign: "end" }}><b>{i18n.t(languageKeys.tong_cong)}: </b></td>
          <td style={{ textAlign: "end" }}>{formatNumberToPrice(totalTienKham)}</td>
          <td style={{ textAlign: "end" }}>{formatNumberToPrice(totalTienXN)}</td>
          <td style={{ textAlign: "end" }}>{formatNumberToPrice(totalTienCDHA)}</td>
          <td style={{ textAlign: "end" }}>{formatNumberToPrice(totalTienKhac)}</td>
          <td style={{ textAlign: "end" }}>{formatNumberToPrice(totalTienThuoc)}</td>
          <td style={{ textAlign: "end" }}>{formatNumberToPrice(totalTongTien)}</td>
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
export default memo(PhuongThuc);

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
