import moment from "moment";
import { memo } from "react";
import { useSelector } from "react-redux";
import { getImageFromSever, formatCurrency } from "../../../helpers";
import i18n, { languageKeys, languages } from "../../../i18n";

export const styleNhapxuatPdf = `
#nhap-xuat * {
    font-size: 1rem;
    line-height: 1.5em;
    font-family: "Times New Roman", Times, serif;
}

#nhap-xuat .logo {
    width: 75px;
    height: 75px;
    object-fit: contain;
}

#nhap-xuat .header {
    display: flex;
    gap: 20px;
    flex-direction: row;
}

#nhap-xuat .row-infomation {
    display: flex;
    flex-direction: row;
    gap: 20px;
    justify-content: space-between;
    width : 100%
}

#nhap-xuat .hospital-name {
    text-transform: uppercase;
    font-weight: bold;
}

#nhap-xuat .thong-tin-phieu {
    display: flex;
}

#nhap-xuat .title {
    text-transform: uppercase;
    font-size:24px;
    font-weight: bold;
    margin-top: 1.5rem;
    margin-bottom: 1rem;
    text-align: center;
    line-height: 32px;
    margin-top: 20px;
}

#nhap-xuat .date-time {
    text-align: center;
    font-size: 12px;
    line-height: 18px;
    font-weight: 400;
    display:flex;
    justify-content:space-between;
    margin:0 20%;
}
#nhap-xuat .date-time > div {
    font-size: 12px;
    line-height: 18px;
}
#nhap-xuat .date-time > div > b {
    font-size: 12px;
    line-height: 18px;
}
#nhap-xuat .table {
    margin-block: 1rem;
    width: 100%;
}

#nhap-xuat .table * {
    font-size: 0.8rem;
}

#nhap-xuat .table,
.table th, 
.table td {
    border: 1px solid black;
    border-collapse: collapse;
    text-align: center;
}

#nhap-xuat .table th,
.table td {
    padding: 5px 10px;
    
}

#nhap-xuat .table th {
    text-align: center;
}

#nhap-xuat .thong-tin-thuoc {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: flex-start;
}
#nhap-xuat .left-thong-tin-thuoc {
    width: 70%;
}
#nhap-xuat .right-thong-tin-thuoc {
    width: 30%;
}
#nhap-xuat .first-thong-tin{
    margin-top: 20px;
}
#nhap-xuat .date-time-footer{
    margin-top: 20px;
    font-size: 14px;
    text-align: end;
}
#nhap-xuat .footer{
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    padding:0 8%;

}
#nhap-xuat .footer-chu-ky{
    text-align: center;
    font-size: 15px;
    font-weight: 700;
}
#nhap-xuat .ky-ten {
    font-style: italic;
    font-size: 14px;
    font-weight: normal;
}

#nhap-xuat .flex-wrap{
    display:flex;
    flex-direction:row;
}
#nhap-xuat .date-wrap{
    width:100%;
}

@media print {
    #nhap-xuat .foot-break {
        break-inside: avoid;
    }

`;
const NhapXuat = ({ data }) => {
  const userProfile = useSelector((state) => state.auth.user);

  return (
    <div id="nhap-xuat">
      <div className="header">
        {userProfile.benh_vien.ANH_DAI_DIEN && <img className="logo" alt="" src={getImageFromSever(userProfile.benh_vien.ANH_DAI_DIEN)} />}
        <div>
          <div className="hospital-name">{userProfile.benh_vien.TEN_CSKCB}</div>
          <div>{i18n.t(languageKeys.dia_chi)} : {layDiaChi(userProfile.benh_vien)}</div>
          <div className="row-infomation">
            <div>{i18n.t(languageKeys.field_So_dien_thoai)}: {userProfile.benh_vien.SO_DIEN_THOAI || ""}</div>
            {/* <div>MS: {userProfile.benh_vien.MA_CSKCB}</div>
            <div>Số ......</div> */}
          </div>
        </div>
      </div>

      <div className="title">{i18n.t(languageKeys.bao_cao_xuat_nhap_ton)}</div>
      <div className="date-wrap">
        <div className="w-2"></div>
        <div className="date-time">
          <div>
          {i18n.t(languageKeys.nguoi_lap_bao_cao)}: <b>{userProfile.HO}{" "}{userProfile.TEN}</b>
          </div>
          <div>
          {i18n.t(languageKeys.field_thoi_gian)}: <b>{data.range_time[0]} - {data.range_time[1]}</b>
          </div>
          <div>
          {i18n.t(languageKeys.thuoc_kho)}: <b>{data.kho_thuoc ? data.kho_thuoc : i18n.t(languageKeys.tat_ca)}</b>
          </div>
        </div>
        <div className="w-2"></div>
      </div>

      <table className="table">
        <thead>
          <th rowSpan="2">{i18n.t(languageKeys.stt)}</th>

          <th rowSpan="2">{i18n.t(languageKeys.field_Ma_thuoc)}</th>

          <th rowSpan="3" style={{width:"25%",textAlign:"left"}}>{i18n.t(languageKeys.field_Ten_thuoc)}</th>

          <th rowSpan="2">{i18n.t(languageKeys.field_Don_vi)}</th>

          <th rowSpan="2">{i18n.t(languageKeys.field_don_gia)}</th>

          <th rowSpan="2">{i18n.t(languageKeys.bao_cao_ton_dau_ky)}</th>

          <th rowSpan="2">{i18n.t(languageKeys.sl_nhap)}</th>
          <th rowSpan="2">{i18n.t(languageKeys.sl_xuat)}</th>

          <th rowSpan="2">{i18n.t(languageKeys.bao_cao_ton_cuoi_ky)}</th>
        </thead>

        {data.data_thuoc.map((item, index) => (
          <tr>
            <td>{item.STT}</td>

            <td>{item.MA_THUOC}</td>
            <td style={{textAlign: "left"}}>{item.TEN_THUOC}</td>
            <td>{item.TEN_DON_VI_TINH}</td>
            <td style={{textAlign:"end"}}>{formatCurrency(item.GIA_NHAP,"",true)}</td>

            <td>{item.TON_DAU_KY}</td>
            <td>{item["NHAP.SO_LUONG"]}</td>
            <td>{item["XUAT.SO_LUONG"]}</td>
            <td><b>{item.TON_CUOI_KY}</b></td>
          </tr>
        ))}
      </table>

      <div className="date-time-footer">
        {i18n.language === languages.tieng_viet ?  <>Ngày {moment().date()}, tháng {moment().month() + 1}, năm {moment().year()}</> : <div style={{marginRight:"6%"}}>{moment().format('MMMM d, YYYY')}</div>}

      </div>
      <div className="footer">
        <div className="footer-chu-ky">{i18n.t(languageKeys.nguoi_lap_bao_cao).toUpperCase()}
          <div className="ky-ten">({i18n.t(languageKeys.ky_ten_va_ghi_ro_ho_ten)})</div>
        </div>
        <div className="footer-chu-ky">{i18n.t(languageKeys.truong_khoa_duoc).toUpperCase()}
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
export default memo(NhapXuat);

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
