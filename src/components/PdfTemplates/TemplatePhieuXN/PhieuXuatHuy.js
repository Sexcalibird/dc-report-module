import { memo } from "react";
import { useSelector } from "react-redux";
import { getImageFromSever, rid, formatNumberToPrice, getFullName, layDiaChi } from "../../../helpers";
import moment from "moment";
import i18n, { languageKeys, languages } from "../../../i18n";

export const stylePhieuXuatHuy = `
#phieu-xuat-huy * { font-size: 1rem; line-height: 1.5em; font-family: "Times New Roman", Times, serif; }
#phieu-xuat-huy .logo { width: 75px; height: 75px; object-fit: contain; }
#phieu-xuat-huy .header { display: flex; gap: 20px; }
#phieu-xuat-huy .hospital-name { text-transform: uppercase; font-weight: bold; }
#phieu-xuat-huy .thong-tin-phieu { display:flex ; }
#phieu-xuat-huy .title { text-transform: uppercase; font-size: 2rem; font-weight: bold; margin-top: 1.5rem; margin-bottom: 1rem; text-align: center; }
#phieu-xuat-huy .table { margin-block: 1rem; }
#phieu-xuat-huy .table * { font-size: 0.8rem; }
#phieu-xuat-huy .table, .table th, .table td { border: 1px solid black; border-collapse: collapse; }
#phieu-xuat-huy .table th, .table td { padding: 5px 10px; }
#phieu-xuat-huy .table th { text-align: start; }
@media print {
   #phieu-xuat-huy .foot-break { break-inside: avoid; }
}
`;

const PhieuXuatHuy = ({ data = {} }) => {
  const userProfile = useSelector((state) => state.auth.user);

  const { BAO_CAO } = data;

  return (
    <div id="phieu-xuat-huy">
      <div className="header">
      {data.BENH_VIEN.ANH_DAI_DIEN && <img src={getImageFromSever(data.BENH_VIEN.ANH_DAI_DIEN)} alt="" className="logo" />}

        <div>
          <div className="hospital-name">{data.BENH_VIEN.TEN_CSKCB}</div>
          <div>
            {i18n.t(languageKeys.dia_chi)}: {`${layDiaChi(data.BENH_VIEN)}`}
          </div>
          <div>
            {i18n.t(languageKeys.dien_thoai)}: {data.BENH_VIEN.SO_DIEN_THOAI || ""}
          </div>
        </div>
      </div>

      <div className="title">{getTenPhieu(BAO_CAO.chi_tiet.PHAN_LOAI)}</div>

      <div style={{ display: "flex" }}>
        <div style={{ flex: "50%" }}>
          <div>
            {i18n.t(languageKeys.field_Ma_phieu)}: <b>{BAO_CAO.chi_tiet.MA_PHIEU}</b>
          </div>
          <div>
            {i18n.t(languageKeys.nguoi_lap)}: <b>{getFullName(userProfile)}</b>
          </div>
        </div>
        <div style={{ flex: "50%" }}>
          <div>
            {i18n.t(languageKeys.common_ngay)}:{" "}
            <b>
              {moment(BAO_CAO.chi_tiet.NGAY).format("DD/MM/YYYY")} {BAO_CAO.chi_tiet.GIO}
            </b>
          </div>

          <div>
            {i18n.t(languageKeys.field_Ghi_chu)}: <b>{BAO_CAO.chi_tiet.LY_DO || ""}</b>
          </div>
        </div>
      </div>
      <div style={{ width: "100%" }}>
        {i18n.t(languageKeys.chi_nhanh)}: <b>{BAO_CAO.chi_tiet.TEN_CSKCB}</b>
      </div>
      <table style={{ width: "100%" }} className="table">
        <thead>
          <tr>
            <th style={{ width: "28px" }}>{i18n.t(languageKeys.field_Stt)}</th>
            <th>{i18n.t(languageKeys.ma_hang)}</th>
            <th>{i18n.t(languageKeys.ten_hang)}</th>
            <th>{BAO_CAO.chi_tiet.PHAN_LOAI === "BAN_BENH_NHAN" ? i18n.t(languageKeys.field_So_luong) : i18n.t(languageKeys.sl_huy)}</th>
            <th>{BAO_CAO.chi_tiet.PHAN_LOAI === "BAN_BENH_NHAN" ? i18n.t(languageKeys.field_gia_ban) : i18n.t(languageKeys.field_gia_nhap)}</th>
            <th>{BAO_CAO.chi_tiet.PHAN_LOAI === "BAN_BENH_NHAN" ? i18n.t(languageKeys.vien_phi_thanh_tien) : i18n.t(languageKeys.gia_tri_huy)}</th>
          </tr>
        </thead>
        <tbody>
          {BAO_CAO.data_thuoc?.map((item, index) => {
            return (
              <tr key={rid()}>
                <td>{index + 1 >= 10 ? index + 1 : `0${index + 1}`}</td>
                <td>{item.MA_THUOC}</td>
                <td>{item.TEN_THUOC}</td>
                <td>{item.TONG_SO_LUONG}</td>
                <td style={{ textAlign: "end" }}>
                  {formatNumberToPrice(BAO_CAO.chi_tiet.PHAN_LOAI !== "BAN_BENH_NHAN" ? item.GIA_NHAP : item.GIA_BAN)}
                </td>
                <td style={{ textAlign: "end" }}>{formatNumberToPrice(item.THANH_TIEN)}</td>
              </tr>
            );
          })}
        </tbody>
      </table>

      <div className="foot-break" style={{ display: "table", justifyContent: "space-between" }}>
        <div style={{ display: "table-cell", width: "100%" }}>
          {i18n.t(languageKeys.field_So_luong)}: <b>{BAO_CAO.data_thuoc?.length}</b>
        </div>

        <div style={{ display: "table-cell", whiteSpace: "nowrap" }}>
          <div style={{ display: "table" }}>
            <div style={{ display: "table-row" }}>
              <div style={{ display: "table-cell" }}>
                {BAO_CAO.chi_tiet.PHAN_LOAI === "BAN_BENH_NHAN" ? i18n.t(languageKeys.field_Tong_tien) : i18n.t(languageKeys.txt_tong_gia_tri_huy)}{" "}
              </div>
              <div
                style={{
                  display: "table-cell",
                  textAlign: "end",
                  paddingLeft: 20,
                  fontWeight: "bold",
                }}
              >
                {`${BAO_CAO.chi_tiet.TONG_THANH_TOAN}`.replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
              </div>
            </div>
          </div>
        </div>
      </div>

      <div>
        {" "}
        {i18n.t(languageKeys.field_Ghi_chu)}: {BAO_CAO.chi_tiet.GHI_CHU}
      </div>

      <div className="foot-break">
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "flex-end",
          }}
        >
          {i18n.language === languages.tieng_viet ? (
            <i>
              {moment().format("HH:mm") + ", "}
              {i18n.t(languageKeys.common_ngay)} {moment().date()},{i18n.t(languageKeys.common_thang)} {moment().month() + 1}, {i18n.t(languageKeys.common_nam)} {moment().year()}
            </i>
          ) : (
            <i style={{ marginRight: "40px" }}> {moment().format("HH:mm , MMMM d, YYYY")}</i>
          )}

          <div style={{ textAlign: "center", marginRight: 40 }}>
            <div>
              <b> {i18n.t(languageKeys.nguoi_lap)}</b>
            </div>
            <i>({i18n.t(languageKeys.ky_va_ghi_ro_ho_ten)})</i>
            <div style={{ marginTop: 80, fontWeight: "bold" }}>{getFullName(userProfile)}</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default memo(PhieuXuatHuy);

const getTenPhieu = (type) => {
  switch (type) {
    case "XUAT_KHAC":
      return i18n.t(languageKeys.xuat_khac);
    case "XUAT_VO_HONG":
      return i18n.t(languageKeys.xuat_vo_hong);
    case "XUAT_HET_HAN":
      return i18n.t(languageKeys.xuat_het_han_su_dung);
    case "BAN_BENH_NHAN":
      return i18n.t(languageKeys.ban_benh_nhan);
    default:
      return i18n.t(languageKeys.duoc_phieu_xuat_huy);
  }
};
