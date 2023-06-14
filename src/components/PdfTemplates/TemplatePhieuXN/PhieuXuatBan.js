import { memo } from "react";
import { useSelector } from "react-redux";
import { getImageFromSever, rid, formatNumberToPrice, getFullName, layDiaChi } from "../../../helpers";
import moment from "moment";
import i18n, { languageKeys, languages } from "../../../i18n";

export const stylePhieuXuatBan = `
#phieu-xuat-ban * { font-size: 1rem; line-height: 1.5em; font-family: "Times New Roman", Times, serif; }
#phieu-xuat-ban .logo { width: 75px; height: 75px; object-fit: contain; }
#phieu-xuat-ban .header { display: flex; gap: 20px; }
#phieu-xuat-ban .hospital-name { text-transform: uppercase; font-weight: bold; }
#phieu-xuat-ban .thong-tin-phieu { display:flex ; }
#phieu-xuat-ban .title { text-transform: uppercase; font-size: 2rem; font-weight: bold; margin-top: 1.5rem; margin-bottom: 1rem; text-align: center; }
#phieu-xuat-ban .table { margin-block: 1rem; }
#phieu-xuat-ban .table * { font-size: 0.8rem; }
#phieu-xuat-ban .table, .table th, .table td { border: 1px solid black; border-collapse: collapse; }
#phieu-xuat-ban .table th, .table td { padding: 5px 10px; }
#phieu-xuat-ban .table th { text-align: start; }
@media print {
   #phieu-xuat-ban .foot-break { break-inside: avoid; }
}
`;

const PhieuXuatBan = ({ data = {} }) => {
  const userProfile = useSelector((state) => state.auth.user);

  const { BAO_CAO } = data;

  return (
    <div id="phieu-xuat-ban">
      <div className="header">
      {data.BENH_VIEN.ANH_DAI_DIEN && <img src={getImageFromSever(data.BENH_VIEN.ANH_DAI_DIEN)} alt="" className="logo" />}

        <div>
          <div className="hospital-name">{data.BENH_VIEN.TEN_CSKCB}</div>
          <div>
            {i18n.t(languageKeys.field_Dia_chi)}: {layDiaChi(data.BENH_VIEN)}
          </div>
          <div>
            {" "}
            {i18n.t(languageKeys.dien_thoai)}: {data.BENH_VIEN.SO_DIEN_THOAI || ""}
          </div>
        </div>
      </div>

      <div className="title">{i18n.t(languageKeys.tab_Phieu_mua_thuoc).toUpperCase()}</div>

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
            {i18n.t(languageKeys.nha_cung_cap)}: <b>{BAO_CAO.chi_tiet.TEN_NCC}</b>
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
            <th>{i18n.t(languageKeys.field_don_gia)}</th>
            <th>{i18n.t(languageKeys.field_So_luong)}</th>
            <th>{i18n.t(languageKeys.giam_gia)}</th>
            <th>{i18n.t(languageKeys.vien_phi_thanh_tien)}</th>
          </tr>
        </thead>
        <tbody>
          {BAO_CAO.data_thuoc?.map((item, index) => {
            return (
              <tr key={rid()}>
                <td>{index + 1 >= 10 ? index + 1 : `0${index + 1}`}</td>
                <td>{item.MA_THUOC}</td>
                <td>{item.TEN_THUOC}</td>
                <td>{formatNumberToPrice(item.GIA_BAN)}</td>
                <td>{item.SO_LUONG}</td>
                <td>{formatNumberToPrice(item.TONG_MIEN_GIAM)}</td>
                <td>{formatNumberToPrice(item.THANH_TIEN)}</td>
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
              <div style={{ display: "table-cell" }}>{i18n.t(languageKeys.tong_tien_hang)}:</div>
              <div
                style={{
                  display: "table-cell",
                  textAlign: "end",
                  paddingLeft: 20,
                  fontWeight: "bold",
                }}
              >
                {`${BAO_CAO.chi_tiet.TONG_CHI_PHI}`.replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
              </div>
            </div>

            <div style={{ display: "table-row" }}>
              <div style={{ display: "table-cell" }}>{i18n.t(languageKeys.mien_giam_hoa_don)}:</div>
              <div
                style={{
                  display: "table-cell",
                  textAlign: "end",
                  paddingLeft: 20,
                  fontWeight: "bold",
                }}
              >
                {`${BAO_CAO.chi_tiet.TONG_MIEN_GIAM}`.replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
              </div>
            </div>

            <div style={{ display: "table-row" }}>
              <div style={{ display: "table-cell" }}>{i18n.t(languageKeys.tien_ncc_can_tra)}:</div>
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
        {i18n.t(languageKeys.field_Ghi_chu)}: {BAO_CAO.chi_tiet.GHI_CHU}
      </div>

      <div className="foot-break">
        <div style={{ display: "flex", justifyContent: "flex-end" }}>
          {i18n.language === languages.tieng_viet ? (
            <i>
              {moment().format("HH:mm") + ", "}
              {i18n.t(languageKeys.common_ngay)} {moment().date()},{i18n.t(languageKeys.common_thang)} {moment().month() + 1}, {i18n.t(languageKeys.common_nam)} {moment().year()}
            </i>
          ) : (
            <i style={{ marginRight: "40px" }}> {moment().format("HH:mm , MMMM d, YYYY")}</i>
          )}
        </div>

        <div style={{ display: "flex", justifyContent: "space-between" }}>
          <div style={{ textAlign: "center", marginLeft: 40 }}>
            <div>
              <b>{i18n.t(languageKeys.nha_cung_cap)}</b>
            </div>
            <i>({i18n.t(languageKeys.ky_va_ghi_ro_ho_ten)})</i>
            <div style={{ marginTop: 80, fontWeight: "bold" }}></div>
          </div>

          <div style={{ textAlign: "center", marginRight: 40 }}>
            <div>
              <b>{i18n.t(languageKeys.nguoi_lap)}</b>
            </div>
            <i>({i18n.t(languageKeys.ky_va_ghi_ro_ho_ten)})</i>
            <div style={{ marginTop: 80, fontWeight: "bold" }}>{getFullName(userProfile)}</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default memo(PhieuXuatBan);
