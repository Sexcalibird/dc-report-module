import moment from "moment";
import { memo } from "react";
import { useSelector } from "react-redux";
import { getImageFromSever, getFullName, formatNumberToPrice, formatCurrency2, rid } from "../../../helpers";
import i18n, { languageKeys, languages } from "../../../i18n";

export const stylePhuongThuc = `
#phuong-thuc * {
    font-size: 1rem;
    line-height: 1.5em;
    font-family: "Times New Roman", Times, serif;
}

#phuong-thuc .logo {
    width: 75px;
    height: 75px;
    object-fit: contain;
}

#phuong-thuc .header {
    display: flex;
    gap: 20px;
    flex-direction: row;
}

#phuong-thuc .row-infomation {
    display: flex;
    flex-direction: row;
    gap: 20px;
    justify-content: space-between;
    width : 100%
}

#phuong-thuc .hospital-name {
    text-transform: uppercase;
    font-weight: bold;
}

#phuong-thuc .thong-tin-phieu {
    display: flex;
}

#phuong-thuc .title {
    text-transform: uppercase;
    font-size:28px;
    font-weight: bold;
    margin-top: 1.5rem;
    text-align: center;
    line-height: 32px;
    margin-top: 20px;
}

#phuong-thuc .reporter {
    text-align: center;
    font-size: 16px;
    line-height: 18px;
    font-weight: bold;
}

#phuong-thuc .info-row {
  display: flex;
  justify-content: space-between;
  font-size: 16px;
  line-height: 18px;
}

#phuong-thuc .info-row span {
  font-weight: bold;
}

#phuong-thuc .info-row div {
  text-align: center;
}


#phuong-thuc .table {
    margin-block: 1rem;
    width: 100%;
}

#phuong-thuc .table * {
    font-size: 0.8rem;
}

#phuong-thuc .table,
.table th, 
.table td {
    border: 1px solid black;
    border-collapse: collapse;
    text-align: center;
}

#phuong-thuc .table th,
.table td {
    padding: 5px 10px;
    
}

#phuong-thuc .table th {
    text-align: center;
}

#phuong-thuc .thong-tin-thuoc {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: flex-start;
}
#phuong-thuc .left-thong-tin-thuoc {
    width: 70%;
}
#phuong-thuc .right-thong-tin-thuoc {
    width: 30%;
}
#phuong-thuc .first-thong-tin{
    margin-top: 20px;
}
#phuong-thuc .date-time-footer{
    display: flex;
    margin-top: 20px;
    font-size: 14px;
    text-align: center;
}

#phuong-thuc .date-footer-right{
  width: 40%;
  text-align: center;
}
#phuong-thuc .footer{
    display: flex;
    flex-direction: row;
    justify-content: space-between;

}
#phuong-thuc .footer-chu-ky{
    text-align: center;
    font-size: 15px;
    font-weight: 700;
}
#phuong-thuc .ky-ten {
    font-style: italic;
    font-size: 14px;
    font-weight: normal;
}

#phuong-thuc .flex-wrap{
    display:flex;
    flex-direction:row;
}
#phuong-thuc .time-range{
  width : 230px !important;
}

#phuong-thuc .align-center { 
  text-align:center;
  margin-bottom: 16px;
}
@media print {
    #phuong-thuc .foot-break {
        break-inside: avoid;
    }

`;
const PhuongThuc = ({ data, extraData }) => {
  const userProfile = useSelector((state) => state.auth.user);

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

  const tong_tien = data?.exportData?.reduce((acc, curr) => {
    return acc + +curr?.SO_TIEN;
  }, 0);

  return (
    <div id="phuong-thuc">
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

      <div className="title">{i18n.t(languageKeys.bao_cao_phuong_thuc_thanh_toan)}</div>
      <div>
        <div className="reporter">
          {i18n.t(languageKeys.nguoi_lap_bao_cao)}: {getFullName(userProfile)}
        </div>
        <div className="align-center">
          <span>{i18n.t(languageKeys.field_thoi_gian)}</span>: <span>{timeRange}</span>
        </div>
      </div>

      <table className="table">
        <thead>
          <th rowSpan="2">{i18n.t(languageKeys.stt)}</th>
          <th rowSpan="2">{i18n.t(languageKeys.ngay_thanh_toan)}</th>

          <th rowSpan="2">{i18n.t(languageKeys.field_So_phieu)}</th>

          <th rowSpan="2">{i18n.t(languageKeys.ten_khach_hang)}</th>
          <th rowSpan="2">{i18n.t(languageKeys.sdt)}</th>
          {/* <th rowSpan="2">{i18n.t(languageKeys.field_hinh_thuc_thanh_toan)}</th> */}

          <th rowSpan="2">{i18n.t(languageKeys.field_hinh_thuc_thanh_toan)}</th>
          <th rowSpan="2">{i18n.t(languageKeys.txt_So_tien)}</th>


        </thead>

        {data?.exportData?.map((item, index) => (
          <tr>
            <td style={{ textAlign: "center" }}>{index + 1 < 10 ? `0${index + 1}` : index + 1}</td>
            <td style={{ textAlign: "center" }}>{moment(item.NGAY).format("DD/MM/YYYY")}</td>
            <td style={{ textAlign: "start" }}>{item.SO_PHIEU}</td>
            <td style={{ textAlign: "start" }}>{item.TEN_BENH_NHAN}</td>
            <td style={{ textAlign: "start" }}>{item.SO_DIEN_THOAI}</td>
            <td style={{ textAlign: "start" }}>{item.TEN_HINH_THUC_THANH_TOAN}</td>
            <td style={{ textAlign: "right" }}>{formatCurrency2(item.SO_TIEN, "", true)}</td>
            {/* <td style={{ textAlign: "start" }}>{item.MA_BENH_NHAN}</td> */}
            {/* {data?.extraData?.columnPaymentTypes?.map((col, index) => {
              return (
                <td key={rid()} style={{ textAlign: "right" }}>
                  {item?.[col.ID] ? formatCurrency2(item?.[col?.ID], "", true) : 0}
                </td>
              );
            })} */}
          </tr>
        ))}
        <tr>
          <td colSpan="6" style={{ fontWeight: 700, textAlign: "right" }}>
            <b>{i18n.t(languageKeys.cong_khoan)}:</b>
          </td>
          <td style={{ textAlign: "right",fontWeight:"bold" }}>{tong_tien ? formatCurrency2(tong_tien, "", true) : 0}</td>

          {/* {data?.extraData?.columnPaymentTypes?.map((col, index) => {
            let total = data?.exportData?.reduce((acc, curr) => {
              return acc + +curr?.[col.ID];
            }, 0);
            return (
              <td style={{ textAlign: "right" }} key={index}>
                {formatCurrency2(total, "", true)}
              </td>
            );
          })} */}
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
          <div className="ky-ten">{i18n.t(languageKeys.ky_ten_va_dong_dau)}</div>
          {/* <div style={{ marginTop: 80, fontWeight: "bold" }}>{getFullName(userProfile)}</div> */}
        </div>
        <div className="footer-chu-ky">
          {i18n.t(languageKeys.truong_phong_tckt).toUpperCase()}
          <div className="ky-ten">{i18n.t(languageKeys.ky_ten_va_dong_dau)}</div>
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
