import moment from "moment";
import { memo } from "react";
import { useSelector } from "react-redux";
import { getImageFromSever, getFullName, formatNumberToPrice } from "../../../helpers";
import i18n, { languageKeys, languages } from "../../../i18n";

export const styleBacSiChiDinh = `
#chi-dinh * {
    font-size: 1rem;
    line-height: 1.5em;
    font-family: "Times New Roman", Times, serif;
}

#chi-dinh .logo {
    width: 75px;
    height: 75px;
    object-fit: contain;
}

#chi-dinh .header {
    display: flex;
    gap: 20px;
    flex-direction: row;
}

#chi-dinh .row-infomation {
    display: flex;
    flex-direction: row;
    gap: 20px;
    justify-content: space-between;
    width : 100%
}

#chi-dinh .hospital-name {
    text-transform: uppercase;
    font-weight: bold;
}

#chi-dinh .thong-tin-phieu {
    display: flex;
}

#chi-dinh .title {
    text-transform: uppercase;
    font-size:28px;
    font-weight: bold;
    margin-top: 1.5rem;
    text-align: center;
    line-height: 32px;
    margin-top: 20px;
}

#chi-dinh .reporter {
    text-align: center;
    font-size: 16px;
    line-height: 18px;
    font-weight: bold;
    margin-bottom: 26px;
}

#chi-dinh .info-row {
  display: flex;
  font-size: 16px;
  line-height: 18px;
}

#chi-dinh .info-row span {
  font-weight: bold;
}

#chi-dinh .info-row div {
  width: 33%;
  text-align: center;
}


#chi-dinh .table {
    margin-block: 1rem;
    width: 100%;
}

#chi-dinh .table * {
    font-size: 0.8rem;
}

#chi-dinh .table,
.table th, 
.table td {
    border: 1px solid black;
    border-collapse: collapse;
}

#chi-dinh .table th,
.table td {
    padding: 5px 10px;
}

#chi-dinh .table tbody th {
  text-align: start;
}

#chi-dinh .thong-tin-thuoc {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: flex-start;
}
#chi-dinh .left-thong-tin-thuoc {
    width: 70%;
}
#chi-dinh .right-thong-tin-thuoc {
    width: 30%;
}
#chi-dinh .first-thong-tin{
    margin-top: 20px;
}
#chi-dinh .date-time-footer{
    display: flex;
    margin-top: 20px;
    justify-content: flex-end;
    font-size: 14px;
    text-align: center;
}
#chi-dinh .footer{
    display: flex;
    flex-direction: row;
    justify-content: space-between;

}
#chi-dinh .footer-chu-ky{
    text-align: center;
    font-size: 15px;
    font-weight: 700;
}
#chi-dinh .ky-ten {
    font-style: italic;
    font-size: 14px;
    font-weight: normal;
}

#chi-dinh .flex-wrap{
    display:flex;
    flex-direction:row;
}

@media print {
    #chi-dinh .foot-break {
        break-inside: avoid;
    }

`;
const BacSiChiDinh = ({ data }) => {
  const userProfile = useSelector((state) => state.auth.user);

  const timeRange = !data?.dataRequest?.TU_NGAY
    ? `${moment().format("DD/MM/YYYY")} - ${moment().format("DD/MM/YYYY")}`
    : `${moment(data?.dataRequest?.TU_NGAY, "YYYYMMDD").format("DD/MM/YYYY")} - ${moment(data?.dataRequest?.DEN_NGAY, "YYYYMMDD").format(
        "DD/MM/YYYY"
      )}`;

  const bsChiDinh =
    data?.dataRequest?.selectedDoctors.length === 0
      ? i18n.t(languageKeys.tat_ca)
      : data?.dataRequest?.selectedDoctors.length === 1
      ? getFullName(data?.dataRequest?.selectedDoctors[0])
      : `${data?.dataRequest?.selectedDoctors.length} ${i18n.t(languageKeys.bac_si)}`;
  const trang_thai = data?.dataRequest?.selectedStatus === "DA_THUC_HIEN" ? i18n.t(languageKeys.da_thuc_hien) : data?.dataRequest?.selectedStatus === "CHO_THUC_HIEN" ? i18n.t(languageKeys.chua_thuc_hien) : i18n.t(languageKeys.tat_ca);
  const tongBenhNhan = data?.exportData?.reduce((total, item) => (!!item.TONG_BN ? (total += Number(item.TONG_BN)) : total), 0);
  const tongTienKham = data?.exportData?.reduce((total, item) => (!!item.TIEN_KB ? (total += Number(item.TIEN_KB)) : total), 0);
  const tongTienDvkt = data?.exportData?.reduce((total, item) => (!!item.TIEN_CLS ? (total += Number(item.TIEN_CLS)) : total), 0);
  const tongTienThuoc = data?.exportData?.reduce((total, item) => (!!item.TIEN_THUOC ? (total += Number(item.TIEN_THUOC)) : total), 0);
  const tongTienMienGiam = data?.exportData?.reduce((total, item) => (!!item.TIEN_MIEN_GIAM ? (total += Number(item.TIEN_MIEN_GIAM)) : total), 0);
  const tongTienHuy = data?.exportData?.reduce((total, item) => (!!item.TIEN_HUY ? (total += Number(item.TIEN_HUY)) : total), 0);
  const tongTatCa = data?.exportData?.reduce((total, item) => (!!item.TONG_TIEN ? (total += Number(item.TONG_TIEN)) : total), 0);

  return (
    <div id="chi-dinh">
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

      <div className="title">{i18n.t(languageKeys.bao_cao_bac_si_chi_dinh)}</div>
      <div>
        <div className="reporter">{i18n.t(languageKeys.nguoi_lap_bao_cao)}: {getFullName(userProfile)}</div>
      </div>

      <div className="info-row">
        <div>
        {i18n.t(languageKeys.field_thoi_gian)}: <span>{timeRange}</span>
        </div>
        <div>
        {i18n.t(languageKeys.field_Bac_si_chi_dinh)}: <span>{bsChiDinh}</span>
        </div>
        <div>
        {i18n.t(languageKeys.trang_thai)}: <span>{trang_thai}</span>
        </div>
      </div>

      <table className="table">
        <thead>
          <tr>
            <th>{i18n.t(languageKeys.stt)}</th>
            <th>{i18n.t(languageKeys.ten_bs_chi_dinh)}</th>
            <th>{i18n.t(languageKeys.tong_so_benh_nhan)}</th>
            <th>{i18n.t(languageKeys.bao_cao_tien_kham)}</th>
            <th>{i18n.t(languageKeys.bao_cao_tien_dvkt)}</th>
            <th>{i18n.t(languageKeys.bao_cao_tien_thuoc)}</th>
            <th>{i18n.t(languageKeys.bao_cao_tien_mien_giam)}</th>
            <th>{i18n.t(languageKeys.bao_cao_tien_huy)}</th>
            <th>{i18n.t(languageKeys.bao_cao_tong_cong)}</th>
          </tr>
        </thead>

        <tbody>
          {data?.exportData?.map((nhan_su, index) => (
            <tr key={index}>
              <td style={{ textAlign: "center" }}>{index + 1 < 10 ? `0${index + 1}` : index + 1}</td>
              <td>{getFullName(nhan_su)}</td>
              <td style={{ textAlign: "end" }}>{!!nhan_su.TONG_BN ? formatNumberToPrice(nhan_su.TONG_BN) : ""}</td>
              <td style={{ textAlign: "end" }}>{!!nhan_su.TIEN_KB ? formatNumberToPrice(nhan_su.TIEN_KB) : ""}</td>
              <td style={{ textAlign: "end" }}>{!!nhan_su.TIEN_CLS ? formatNumberToPrice(nhan_su.TIEN_CLS) : ""}</td>
              <td style={{ textAlign: "end" }}>{!!nhan_su.TIEN_THUOC ? formatNumberToPrice(nhan_su.TIEN_THUOC) : ""}</td>
              <td style={{ textAlign: "end" }}>
                {!!nhan_su.TIEN_MIEN_GIAM && nhan_su.TIEN_MIEN_GIAM !== "0" ? formatNumberToPrice(nhan_su.TIEN_MIEN_GIAM) : ""}
              </td>
              <td style={{ textAlign: "end" }}>{!!nhan_su.TIEN_HUY ? formatNumberToPrice(nhan_su.TIEN_HUY) : ""}</td>
              <td style={{ textAlign: "end" }}>{formatNumberToPrice(nhan_su.TONG_TIEN)}</td>
            </tr>
          ))}

          <tr>
            <th></th>
            <th>{i18n.t(languageKeys.bao_cao_tong_cong)}</th>
            <th style={{ textAlign: "end" }}>{formatNumberToPrice(tongBenhNhan)}</th>
            <th style={{ textAlign: "end" }}>{formatNumberToPrice(tongTienKham)}</th>
            <th style={{ textAlign: "end" }}>{formatNumberToPrice(tongTienDvkt)}</th>
            <th style={{ textAlign: "end" }}>{formatNumberToPrice(tongTienThuoc)}</th>
            <th style={{ textAlign: "end" }}>{formatNumberToPrice(tongTienMienGiam)}</th>
            <th style={{ textAlign: "end" }}>{formatNumberToPrice(tongTienHuy)}</th>
            <th style={{ textAlign: "end" }}>{formatNumberToPrice(tongTatCa)}</th>
          </tr>
        </tbody>
      </table>

      <div className="foot-break">
        <div className="date-time-footer">
          {i18n.language === languages.tieng_viet ?  <>Ngày {moment().date()}, tháng {moment().month() + 1}, năm {moment().year()}</> : <div style={{marginRight:"12%"}}>{moment().format('MMMM d, YYYY')}</div>}
        </div>
        <div className="footer">
          <div className="footer-chu-ky">
          {i18n.t(languageKeys.nguoi_lap_bao_cao).toUpperCase()}
            <div className="ky-ten">({i18n.t(languageKeys.ky_ten_va_dong_dau)})</div>
          </div>
          <div className="footer-chu-ky">
            {i18n.t(languageKeys.truong_phong_tckt).toUpperCase()}
            <div className="ky-ten">({i18n.t(languageKeys.ky_ten_va_dong_dau)})</div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default memo(BacSiChiDinh);

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
