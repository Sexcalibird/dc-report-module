import moment from "moment";
import { memo } from "react";
import { useSelector } from "react-redux";
import { rid, getImageFromSever, formatCurrency } from "../../../helpers";
import i18n, { languageKeys, languages } from "../../../i18n";

export const styleKhangSinhPdf = `
#khang-sinh * {
    font-size: 1rem;
    line-height: 1.5em;
    font-family: "Times New Roman", Times, serif;
}

#khang-sinh .logo {
    width: 75px;
    height: 75px;
    object-fit: contain;
}

#khang-sinh .header {
    display: flex;
    gap: 20px;
    flex-direction: row;
}

#khang-sinh .row-infomation {
    display: flex;
    flex-direction: row;
    gap: 20px;
    justify-content: space-between;
    width : 100%
}

#khang-sinh .hospital-name {
    text-transform: uppercase;
    font-weight: bold;
}

#khang-sinh .thong-tin-phieu {
    display: flex;
}

#khang-sinh .title {
    text-transform: uppercase;
    font-size: 28px;
    font-weight: bold;
    margin-top: 1.5rem;
    margin-bottom: 1rem;
    text-align: center;
    line-height: 32px;
    margin-top: 20px;
}

#khang-sinh .date-time {
    display: flex;
    justify-content: space-evenly;
    font-size: 16px;
    line-height: 18px;
    font-weight: 400;

}

#khang-sinh .wrap-date{
  text-align:center;
  margin:auto;
}

#khang-sinh .table {
    margin-block: 1rem;
    width: 100%;
}

#khang-sinh .table * {
    font-size: 0.8rem;
}

#khang-sinh .table,
.table th, 
.table td {
    border: 1px solid black;
    border-collapse: collapse;
    text-align: center;
}

#khang-sinh .table th,
.table td {
    padding: 5px 10px;
    
}

#khang-sinh .table th {
    text-align: center;
}

#khang-sinh .thong-tin-thuoc {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: flex-start;
}
#khang-sinh .left-thong-tin-thuoc {
    width: 70%;
}
#khang-sinh .right-thong-tin-thuoc {
    width: 30%;
}
#khang-sinh .first-thong-tin{
    margin-top: 20px;
}
#khang-sinh .date-time-footer{
    margin-top: 20px;
    font-size: 14px;
    text-align: end;
}
#khang-sinh .footer{
    display: flex;
    flex-direction: row;
    justify-content: space-between;

}
#khang-sinh .footer-chu-ky{
    text-align: center;
    font-size: 15px;
    font-weight: 700;
}
#khang-sinh .ky-ten {
    font-style: italic;
    font-size: 14px;
    font-weight: normal;
}

@media print {
    #khang-sinh .foot-break {
        break-inside: avoid;
    }

`;
const BcKhangSinh = ({ data }) => {
  const userProfile = useSelector((state) => state.auth.user);
  console.log("DATA_PRINT", data);

  let dataLength = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13];
  return (
    <div id="khang-sinh">
      <div className="header">
      {userProfile.benh_vien.ANH_DAI_DIEN && (<img className="logo" alt="" src={getImageFromSever(userProfile.benh_vien.ANH_DAI_DIEN)} />)}
        <div>
          <div className="hospital-name">{userProfile.benh_vien.TEN_CSKCB}</div>
          <div>
            {i18n.t(languageKeys.dia_chi)}: {layDiaChi(userProfile.benh_vien)}
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

      <div className="title">{i18n.t(languageKeys.bao_cao_su_dung_thuoc_khang_sinh)}</div>
      <div className="wrap-date">
        <div className="date-time">
          <div>
            {i18n.t(languageKeys.nguoi_lap_bao_cao)}: <b>{userProfile.HO + " " + userProfile.TEN}</b>
          </div>
          <div>
            {i18n.t(languageKeys.thoi_gian)}:<b> {data.time_range[0]}</b> - <b>{data.time_range[1]}</b>
          </div>
        </div>
      </div>
      <table className="table">
        <tr>
          <th rowSpan="2">{i18n.t(languageKeys.stt)}</th>

          <th rowSpan="2">{i18n.t(languageKeys.ma)}</th>

          <th rowSpan="2" colSpan="1">
            {i18n.t(languageKeys.bao_cao_ten_thuoc_ham_luong_nong_do)}
          </th>

          <th rowSpan="2">{i18n.t(languageKeys.field_Don_vi)}</th>

          <th rowSpan="2">{i18n.t(languageKeys.field_don_gia)}</th>

          <th colSpan="2">{i18n.t(languageKeys.bao_cao_ngoai_tru)}</th>

          <th colSpan="2">{i18n.t(languageKeys.data_Khac)}</th>

          <th colSpan="2">{i18n.t(languageKeys.common_Huy)}</th>

          <th colSpan="2">{i18n.t(languageKeys.bao_cao_tong_cong)}</th>
        </tr>

        <tr>
          <th>{i18n.t(languageKeys.field_So_luong)}</th>
          <th>{i18n.t(languageKeys.bao_cao_tien)}</th>

          <th>{i18n.t(languageKeys.field_So_luong)}</th>
          <th>{i18n.t(languageKeys.bao_cao_tien)}</th>

          <th>{i18n.t(languageKeys.field_So_luong)}</th>
          <th>{i18n.t(languageKeys.bao_cao_tien)}</th>

          <th>{i18n.t(languageKeys.field_So_luong)}</th>
          <th>{i18n.t(languageKeys.bao_cao_tien)}</th>
        </tr>
        <tr>
          {dataLength.map((item) => (
            <th key={item}>{item}</th>
          ))}
        </tr>
        {data.data_thuoc.map((item, index) => (
          <tr key={item.key}>
            <td>{item.STT}</td>
            <td>{item.MA_THUOC}</td>
            <td>{item.TEN_THUOC}</td>

            <td>{item.TEN_DON_VI_TINH}</td>
            <td style={{ textAlign: "end" }}>{formatCurrency(item.DON_GIA, "", true)}</td>

            <td>{item["NGOAI_TRU.SO_LUONG_NGOAI_TRU"]}</td>
            <td style={{ textAlign: "end" }}>{formatCurrency(item["NGOAI_TRU.TIEN_NGOAI_TRU"], "", true)}</td>

            <td>{item["KHAC.SO_LUONG_KHAC"]}</td>
            <td style={{ textAlign: "end" }}>{formatCurrency(item["KHAC.TIEN_KHAC"], "", true)}</td>

            <td>{item["HUY.SO_LUONG_HUY"]}</td>
            <td style={{ textAlign: "end" }}>{formatCurrency(item["HUY.TIEN_HUY"], "", true)}</td>

            <td>{item["TONG_CONG.SO_LUONG_TONG_CONG"]}</td>
            <td style={{ textAlign: "end" }}>{formatCurrency(item["TONG_CONG.TIEN_TONG_CONG"], "", true)}</td>
          </tr>
        ))}
      </table>

      <div className="date-time-footer">
      {i18n.language === languages.tieng_viet ?  <>Ngày {moment().date()}, tháng {moment().month() + 1}, năm {moment().year()}</> : <div style={{marginLeft:"-55%"}}>{moment().format('MMMM d, YYYY')}</div>}
      </div>
      <div className="footer">
        <div className="footer-chu-ky">
          {i18n.t(languageKeys.nguoi_lap_bao_cao).toUpperCase()}
          <div className="ky-ten">({i18n.t(languageKeys.ky_ten_va_ghi_ro_ho_ten)})</div>
        </div>
        <div className="footer-chu-ky">
          {i18n.t(languageKeys.truong_phong_tckt).toUpperCase()}
          <div className="ky-ten">({i18n.t(languageKeys.ky_ten_va_ghi_ro_ho_ten)})</div>
        </div>
        <div className="footer-chu-ky">
          {i18n.t(languageKeys.truong_khoa_duoc).toUpperCase()}
          <div className="ky-ten">({i18n.t(languageKeys.ky_ten_va_ghi_ro_ho_ten)})</div>
        </div>
        <div className="footer-chu-ky">
          {i18n.t(languageKeys.data_Giam_doc).toUpperCase()}
          <div className="ky-ten">({i18n.t(languageKeys.ky_ten_va_dong_dau)})</div>
        </div>
      </div>
    </div>
  );
};
export default memo(BcKhangSinh);

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
