import moment from "moment";
import { memo } from "react";
import { useSelector } from "react-redux";
import { rid, getImageFromSever, getTrangThaiPhieuThuoc, convertDateToValue } from "../../../helpers";
import i18n, { languageKeys, languages } from "../../../i18n";

export const styleTheKhoPdf = `
#the-kho * {
    font-size: 1rem;
    line-height: 1.5em;
    font-family: "Times New Roman", Times, serif;
}

#the-kho .logo {
    width: 75px;
    height: 75px;
    object-fit: contain;
}

#the-kho .header {
    display: flex;
    gap: 20px;
    flex-direction: row;
}

#the-kho .row-infomation {
    display: flex;
    flex-direction: row;
    gap: 20px;
    justify-content: space-between;
    width : 100%
}

#the-kho .hospital-name {
    text-transform: uppercase;
    font-weight: bold;
}

#the-kho .thong-tin-phieu {
    display: flex;
}

#the-kho .title {
    text-transform: uppercase;
    font-size: 28px;
    font-weight: bold;
    margin-top: 1.5rem;
    margin-bottom: 1rem;
    text-align: center;
    line-height: 32px;
    margin-top: 20px;
}

#the-kho .date-time {
    text-align: center;
    font-size: 16px;
    line-height: 18px;
    font-weight: 400;
}

#the-kho .table {
    margin-block: 1rem;
    width: 100%;
}

#the-kho .table * {
    font-size: 0.8rem;
}

#the-kho .table,
.table th, 
.table td {
    border: 1px solid black;
    border-collapse: collapse;
    text-align: center;
}

#the-kho .table th,
.table td {
    padding: 5px 10px;
    
}

#the-kho .table th {
    text-align: center;
}

#the-kho .thong-tin-thuoc {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: flex-start;
}
#the-kho .left-thong-tin-thuoc {
    width: 70%;
}
#the-kho .right-thong-tin-thuoc {
    width: 30%;
    margin-right : 10px
}
#the-kho .first-thong-tin{
    margin-top: 20px;
}
#the-kho .date-time-footer{
    margin-top: 20px;
    font-size: 14px;
    text-align: end;
}
#the-kho .footer{
    display: flex;
    flex-direction: row;
    justify-content: space-between;

}
#the-kho .footer-chu-ky{
    text-align: center;
    font-size: 15px;
    font-weight: 700;
}
#the-kho .ky-ten {
    font-style: italic;
    font-size: 14px;
    font-weight: normal;
}


@media print {
    #the-kho .foot-break {
        break-inside: avoid;
    }

`;
const TheKho = ({ data }) => {
  const userProfile = useSelector((state) => state.auth.user);
  console.log("dsadsada", data?.thong_tin.thuoc[0].Thuoc_Ten);
  return (
    <div id="the-kho">
      <div className="header">
        {userProfile.benh_vien.ANH_DAI_DIEN && <img className="logo" alt="" src={getImageFromSever(userProfile.benh_vien.ANH_DAI_DIEN)} />}
        <div>
          <div className="hospital-name">{userProfile.benh_vien.TEN_CSKCB}</div>
          <div>
            {i18n.t(languageKeys.dia_chi)} : {layDiaChi(userProfile.benh_vien)}
          </div>
          <div className="row-infomation">
            <div>
              {i18n.t(languageKeys.dien_thoai)}: {userProfile.benh_vien.SO_DIEN_THOAI || ""}
            </div>
            <div>MS: ......</div>
            <div> {i18n.t(languageKeys.so)} ......</div>
          </div>
        </div>
      </div>

      <div className="title"> {i18n.t(languageKeys.the_kho).toUpperCase()}</div>
      <div style={{ textAlign: "center" }}>
        <b>
          {" "}
          {i18n.t(languageKeys.nguoi_lap_bao_cao)}: {userProfile.HO + " " + userProfile.TEN}
        </b>
      </div>

      <div>
        {i18n.t(languageKeys.thoi_gian)}:
        <b>
          {" "}
          {moment(data.thong_tin.TU_NGAY).format("DD/MM/YYYY")} - {moment(data.thong_tin.DEN_NGAY).format("DD/MM/YYYY")}
        </b>
      </div>
      <div className="thong-tin-thuoc first-thong-tin">
        <div className="left-thong-tin-thuoc">
          {i18n.t(languageKeys.ten_thuoc_hoa_chat)} : {data.thong_tin.thuoc[0].TEN_THUOC}
        </div>
        <div className="right-thong-tin-thuoc">
          {i18n.t(languageKeys.ma_so)} : {data.thong_tin.thuoc[0].MA_THUOC}
        </div>
      </div>
      <div className="thong-tin-thuoc">
        <div className="left-thong-tin-thuoc">
          {" "}
          {i18n.t(languageKeys.ham_luong_nong_do)} : {data.thong_tin.thuoc[0].HAM_LUONG}
        </div>
        <div className="right-thong-tin-thuoc">
          {" "}
          {i18n.t(languageKeys.field_ma_vach)} : {data.thong_tin.thuoc[0].MA_VACH || ""}
        </div>
      </div>
      <div className="thong-tin-thuoc">
        <div className="left-thong-tin-thuoc">
          {" "}
          {i18n.t(languageKeys.field_Don_vi)} : {data.thong_tin.thuoc[0].TEN_DVT}
        </div>
        {/* <div className="right-thong-tin-thuoc"></div> */}
      </div>

      <table className="table">
        <tr>
          <th rowspan="2">{i18n.language === languages.tieng_viet ? <>Ngày Tháng</> : "Date"}</th>

          <th colspan="2">{i18n.t(languageKeys.so_chung_tu)}</th>

          <th rowspan="2">{i18n.t(languageKeys.bao_cao_lo_sx)}</th>

          <th rowspan="2">{i18n.t(languageKeys.bao_cao_han_dung)}</th>

          <th rowspan="2">{i18n.t(languageKeys.bao_cao_dien_giai)}</th>

          <th rowspan="2">{i18n.t(languageKeys.so_luong_dau_ky)}</th>

          <th colspan="3">{i18n.t(languageKeys.field_So_luong)}</th>

          {/* <th rowspan="2">Ghi chú</th> */}
          <th rowspan="2">{i18n.t(languageKeys.field_Trang_thai)}</th>
          {/* <th rowspan="2">Người hủy</th>
                <th rowspan="2">Ngày hủy</th> */}
        </tr>

        <tr>
          <th>{i18n.t(languageKeys.common_Nhap)}</th>
          <th>{i18n.t(languageKeys.xuat)}</th>

          <th>{i18n.t(languageKeys.common_Nhap)}</th>
          <th>{i18n.t(languageKeys.xuat)}</th>
          <th>{i18n.t(languageKeys.bao_cao_ton_cuoi_ky)}</th>
        </tr>
        {data.result.map((item, index) => (
          <tr>
            <td>{item.NGAY_THANG}</td>
            <td>{item.LOAI_PHIEU === "PHIEU_NHAP" ? item.CHUNG_TU : "-"}</td>
            <td>{item.LOAI_PHIEU === "PHIEU_XUAT" ? item.CHUNG_TU : "-"}</td>

            <td>{item.MA_LO}</td>
            <td>{item.HAN_SU_DUNG ? moment(item.HAN_SU_DUNG).format("DD/MM/YYYY") : "-"}</td>

            <td></td>

            <td>{item.TON_DAU_KY}</td>

            <td>{item.LOAI_PHIEU === "PHIEU_NHAP" ? item.SO_LUONG : "-"}</td>
            <td>{item.LOAI_PHIEU === "PHIEU_XUAT" ? item.SO_LUONG : "-"}</td>
            <td>{item.TON_CUOI_KY}</td>

            <td>{getTrangThaiPhieuThuoc(item.TRANG_THAI_PHIEU)}</td>
            {/* <td>{item.NGUOI_HUY || "-"}</td>
                 <td>{item.NGAY_HUY && item.GIO_HUY ?  item.GIO_HUY + " - " + convertDateToValue(item.NGAY_HUY) : "-"}</td> */}
          </tr>
        ))}
      </table>

      <div className="date-time-footer">
      {i18n.language === languages.tieng_viet ?  <>Ngày {moment().date()}, tháng {moment().month() + 1}, năm {moment().year()}</> : <div style={{marginLeft:"-55%"}}>{moment().format('MMMM d, YYYY')}</div>}

      </div>
      <div className="footer">
        <div className="footer-chu-ky">{i18n.t(languageKeys.nguoi_lap_bang)?.toUpperCase()}</div>
        <div className="footer-chu-ky">{i18n.t(languageKeys.field_Truong_khoa)?.toUpperCase()}</div>
        <div className="footer-chu-ky">
          {i18n.t(languageKeys.data_Giam_doc)}
          <div className="ky-ten">({i18n.t(languageKeys.ky_ten_va_dong_dau)})</div>
        </div>
      </div>
    </div>
  );
};
export default memo(TheKho);

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
