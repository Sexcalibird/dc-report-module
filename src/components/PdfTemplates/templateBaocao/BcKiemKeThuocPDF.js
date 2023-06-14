import moment from "moment";
import { memo } from "react";
import { useSelector } from "react-redux";
import { rid, getImageFromSever } from "../../../helpers";
import i18n, { languageKeys, languages } from "../../../i18n";

export const styleKiemKePdf = `
#kiem-ke * {
    font-size: 1rem;
    line-height: 1.5em;
    font-family: "Times New Roman", Times, serif;
}

#kiem-ke .logo {
    width: 75px;
    height: 75px;
    object-fit: contain;
}

#kiem-ke .header {
    display: flex;
    gap: 40px;
    flex-direction: row;
    margin-left:20px;
}

#kiem-ke .row-infomation {
    display: flex;
    flex-direction: row;
    gap: 20px;
    justify-content: space-between;
    width : 100%
}

#kiem-ke .hospital-name {
    text-transform: uppercase;
    font-weight: bold;
}

#kiem-ke .thong-tin-phieu {
    display: flex;
}

#kiem-ke .title {
    text-transform: uppercase;
    font-size: 28px;
    font-weight: bold;
    margin-top: 1.5rem;
    margin-bottom: 1rem;
    text-align: center;
    line-height: 32px;
    margin-top: 20px;
}

#kiem-ke .date-time {
    text-align: center;
    font-size: 16px;
    line-height: 18px;
    font-weight: bold;
}

#kiem-ke .table {
    margin-block: 1rem;
    width: 100%;
    border-radius:5px;
}

#kiem-ke .table * {
    font-size: 0.8rem;
}

#kiem-ke .table,
.table th, 
.table td {
    border: 1px solid black;
    border-collapse: collapse;
    text-align: center;
}

#kiem-ke .table th,
.table td {
    padding: 5px 10px;
    
}

#kiem-ke .table th {
    text-align: center;
}

#kiem-ke .thong-tin-thuoc {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: flex-start;
}
#kiem-ke .left-thong-tin-thuoc {
    width: 70%;
}
#kiem-ke .right-thong-tin-thuoc {
    width: 30%;
}
#kiem-ke .first-thong-tin{
    margin-top: 20px;
}
#kiem-ke .date-time-footer{
    margin-top: 20px;
    font-size: 14px;
    text-align: end;
}
#kiem-ke .footer{
    display: flex;
    flex-direction: row;
    justify-content: space-between;

}
#kiem-ke .footer-chu-ky{
    text-align: center;
    font-size: 15px;
    font-weight: 700;
}
#kiem-ke .ky-ten {
    font-style: italic;
    font-size: 14px;
    font-weight: normal;
}
#kiem-ke .text-normal {
  font-size: 16px;
  font-weight: normal;
  line-height: 18.4px;
}
#kiem-ke .text-normal > .dotter{
  border-bottom: 1px dotted black;
  width: 100px;
}
#kiem-ke .nhan-su {
  display:flex;
  font-size: 16px;
  font-weight: normal;
  line-height: 18.4px;
  width:100%;
}

#kiem-ke .nhan-su-left {
  display:flex;
  justify-content:flex-start;
}

#kiem-ke nhan-su-right{
  display:flex;
  justify-content:flex-end;
}

#kiem-ke .wrap-nhan-su{

}
#kiem-ke .nhan-su > div{
  width:50%;
}

#kiem-ke .nhan-su > span{
  margin-right: 12px;
}

#kiem-ke .members {
  display:flex;
  flex-direction:row;
}

@media print {
    #kiem-ke .foot-break {
        break-inside: avoid;
    }

`;
const KiemkeThuoc = ({ data }) => {
  const userProfile = useSelector((state) => state.auth.user);

  let dataLength = [1, 2, 3, 4, 5, 6, 7, 8, 9];

  return (
    <div id="kiem-ke">
      <div className="header">
        {userProfile.benh_vien.ANH_DAI_DIEN && <img className="logo" alt="" src={getImageFromSever(userProfile.benh_vien.ANH_DAI_DIEN)} />}
        <div>
          <div className="hospital-name">{userProfile.benh_vien.TEN_CSKCB}</div>
          <div>{i18n.t(languageKeys.dia_chi)} : {layDiaChi(userProfile.benh_vien)}</div>
          <div className="row-infomation">
            <div>{i18n.t(languageKeys.field_So_dien_thoai)}: {userProfile.benh_vien.SO_DIEN_THOAI || ""}</div>
            {/* <div>
                        MS: ......
                    </div>
                    <div>
                        Số ......
                    </div> */}
          </div>
        </div>
      </div>

      <div className="title">{i18n.t(languageKeys.bao_cao_bien_ban_kiem_ke_thuoc)}</div>
      <div className="date-time">{i18n.t(languageKeys.nguoi_lap_bao_cao)}: {userProfile.HO + " " + userProfile.TEN}</div>

      <div className="text-normal">
        <b>{i18n.t(languageKeys.to_kiem_ke_gom_co)}:</b>
      </div>
      <div className="wrap-nhan-su">
        {data.members &&
          data.members.map((item, index) => (
            <div className="nhan-su">
              <span>{index + 1}. </span>{" "}
              <div>
              {i18n.t(languageKeys.ho_ten)}: <b>{item.HO_TEN.toUpperCase()}</b>
              </div>
              <div>
              {i18n.t(languageKeys.field_chuc_danh)}: <b>{item.CHUC_VU}</b>
              </div>
            </div>
          ))}
      </div>

      <div style={{ display: "flex", marginTop: 12 }}>
        <div style={{ marginRight: 18 }}>
        {i18n.t(languageKeys.thoi_gian_kiem_ke_thuoc)}: <b>{data.time_range}</b>
        </div>
        <div>{i18n.t(languageKeys.dia_chi_kiem_ke)}:..................................................................................................</div>
      </div>
      {/* <div className="date-time">Từ {moment(data.thong_tin.TU_NGAY).format("DD/MM/YYYY")} đến {moment(data.thong_tin.DEN_NGAY).format("DD/MM/YYYY")}</div>

        <div className="thong-tin-thuoc first-thong-tin">
            <div className="left-thong-tin-thuoc">
                Tên thuốc, hóa chất, vật tư y tế tiêu hao : {data.thong_tin.thuoc[0].TEN_THUOC}
            </div>
            <div className="right-thong-tin-thuoc">Mã số : {data.thong_tin.thuoc[0].MA_THUOC}</div>
        </div>
        <div className="thong-tin-thuoc">
            <div className="left-thong-tin-thuoc">
                Hàm lượng, nồng độ, quy cách đóng : {data.thong_tin.thuoc[0].HAM_LUONG}
            </div>
            <div className="right-thong-tin-thuoc">Mã vạch : {data.thong_tin.thuoc[0].MA_VACH || ""}</div>
        </div>
        <div className="thong-tin-thuoc">
            <div className="left-thong-tin-thuoc">
                Đơn vị : {data.thong_tin.thuoc[0].TEN_DVT}
            </div>
        </div> */}

      <table className="table">
        <tr>
          <th rowSpan="2">{i18n.t(languageKeys.stt)}</th>

          <th rowSpan="2">{i18n.t(languageKeys.field_Ten_thuoc)}</th>

          <th rowSpan="2">{i18n.t(languageKeys.field_Don_vi)}</th>

          <th rowSpan="2">{i18n.t(languageKeys.field_nuoc_san_xuat)}</th>

          <th rowSpan="2">{i18n.t(languageKeys.han_dung)}</th>

          <th colSpan="2">{i18n.t(languageKeys.field_So_luong)}</th>

          <th rowSpan="2">{i18n.t(languageKeys.hong_vo)}</th>

          <th rowSpan="2">{i18n.t(languageKeys.ghi_nho)}</th>
        </tr>

        <tr>
          <th>{i18n.t(languageKeys.so_sach)}</th>
          <th>{i18n.t(languageKeys.thuc_te)}</th>
        </tr>
        <tr>
          {dataLength.map((item) => (
            <th key={item}>{item}</th>
          ))}
        </tr>
        {data.data_Thuoc.map((item, index) => (
          <tr>
            <td>{item.STT}</td>
            <td>{item.TEN_THUOC}</td>
            <td>{item.TEN_DON_VI_TINH}</td>
            <td>{item.TEN_NUOC_SAN_XUAT}</td>
            <td>{item.HAN_SU_DUNG}</td>
            <td>{item.SO_LUONG}</td>
            <td></td>
            <td></td>
            <td></td>
          </tr>
        ))}
        <tr>
          <td></td>
          <td style={{ fontWeight: 700 }}>{i18n.t(languageKeys.cong_khoan)}</td>
          <td></td>
          <td></td>
          <td></td>
          <td>
            {data.data_Thuoc.reduce((acc, curr) => {
              let tong_tien;
              tong_tien = curr.SO_LUONG ? Number(acc) + Number(curr.SO_LUONG) : Number(acc) + 0;
              return tong_tien;
            }, 0)}
          </td>
          <td></td>
          <td></td>
          <td></td>
        </tr>
      </table>
      <span className="text-normal">
        {" "}
        <b>{i18n.t(languageKeys.y_kien_de_xuat)}:</b>
      </span>
      <div className="date-time-footer foot-break">
      {i18n.language === languages.tieng_viet ?  <>Ngày {moment().date()}, tháng {moment().month() + 1}, năm {moment().year()}</> : <div style={{marginRight:"8%"}}>{moment().format('MMMM d, YYYY')}</div>}
     </div>
      <div className="footer foot-break">
        <div className="footer-chu-ky">
        {i18n.t(languageKeys.thanh_vien).toUpperCase()}
          <div className="ky-ten">({i18n.t(languageKeys.ky_ten_va_ghi_ro_ho_ten)})</div>
          <div style={{ width: "100%", height: "200px" }}></div>
        </div>
        <div className="footer-chu-ky">
        {i18n.t(languageKeys.truong_phong_tckt).toUpperCase()}
          <div className="ky-ten">({i18n.t(languageKeys.ky_ten_va_ghi_ro_ho_ten)})</div>
          <div style={{ width: "100%", height: "200px" }}></div>
        </div>
        <div className="footer-chu-ky">
        {i18n.t(languageKeys.truong_khoa_duoc).toUpperCase()}
          <div className="ky-ten">({i18n.t(languageKeys.ky_ten_va_dong_dau)})</div>
          <div style={{ width: "100%", height: "200px" }}></div>
        </div>
      </div>
    </div>
  );
};
export default memo(KiemkeThuoc);

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
