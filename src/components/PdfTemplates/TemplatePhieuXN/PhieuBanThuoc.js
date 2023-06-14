import { memo } from "react";
import { getImageFromSever, rid, formatNumberToPrice, layDiaChi } from "../../../helpers";
import moment from "moment";
import i18n, { languageKeys } from "../../../i18n";

export const stylePhieuBanThuoc = `
#phieu-ban-thuoc * { font-size: 1rem; line-height: 1.5em; font-family: "Times New Roman", Times, serif; }
#phieu-ban-thuoc .logo { width: 75px; height: 75px; object-fit: contain; }
#phieu-ban-thuoc .header { display: flex; gap: 20px; }
#phieu-ban-thuoc .hospital-name { text-transform: uppercase; font-weight: bold; }
#phieu-ban-thuoc .thong-tin-phieu { display:flex ; }
#phieu-ban-thuoc .title { text-transform: uppercase; font-size: 2rem; font-weight: bold; margin-top: 1.5rem; margin-bottom: 1rem; text-align: center; }
#phieu-ban-thuoc .table { margin-block: 1rem; }
#phieu-ban-thuoc .table * { font-size: 0.8rem; }
#phieu-ban-thuoc .table, .table th, .table td { border: 1px solid black; border-collapse: collapse; }
#phieu-ban-thuoc .table th, .table td { padding: 5px 10px; }
#phieu-ban-thuoc .table th { text-align: start; }
@media print {
   #phieu-ban-thuoc .foot-break { break-inside: avoid; }
}
`;

const PhieuBanThuoc = ({ data = {} }) => {
  const { BAO_CAO } = data;

  return (
    <div id="phieu-ban-thuoc">
      <div className="header">
        <img src={getImageFromSever(data.BENH_VIEN.ANH_DAI_DIEN)} alt="" className="logo" />

        <div>
          <div className="hospital-name">{data.BENH_VIEN.TEN_CSKCB}</div>
          <div>
            {i18n.t(languageKeys.dia_chi)}: {layDiaChi(data.BENH_VIEN)}
          </div>
          <div>
            {i18n.t(languageKeys.dien_thoai)}: {data.BENH_VIEN.SO_DIEN_THOAI || ""}
          </div>
        </div>
      </div>

      <div className="title">{i18n.t(languageKeys.hoa_don_ban_hang)}</div>

      <div style={{ display: "flex" }}>
        <div style={{ flex: "50%" }}>
          <div>
            {i18n.t(languageKeys.field_Ma_phieu)}: <b>{BAO_CAO.chi_tiet.MA_PHIEU}</b>
          </div>
          <div>
            {i18n.t(languageKeys.khach_hang)}:<b> {BAO_CAO.chi_tiet.TEN_BENH_NHAN}</b>
          </div>
        </div>
        <div style={{ flex: "50%" }}>
          <div>
            {i18n.t(languageKeys.data_Ngay)}:{" "}
            <b>
              {moment(BAO_CAO.chi_tiet.NGAY).format("DD/MM/YYYY")} {BAO_CAO.chi_tiet.GIO}
            </b>
          </div>
          <div>
            {i18n.t(languageKeys.field_So_dien_thoai)}: {BAO_CAO.chi_tiet.SO_DIEN_THOAI || ""}
          </div>
        </div>
      </div>
      <table style={{ width: "100%" }} className="table">
        <thead>
          <tr>
            <th style={{ width: "28px" }}> {i18n.t(languageKeys.field_Stt)}</th>
            <th> {i18n.t(languageKeys.ten_san_pham)}</th>
            <th> {i18n.t(languageKeys.txt_So_luong)}</th>
            <th>{i18n.t(languageKeys.vien_phi_Don_gia)}</th>
            <th>{i18n.t(languageKeys.vien_phi_thanh_tien)}</th>
          </tr>
        </thead>
        <tbody>
          {BAO_CAO.data_thuoc?.map((item, index) => {
            return (
              <tr key={rid()}>
                <td>{index + 1 >= 10 ? index + 1 : `0${index + 1}`}</td>
                <td>{item.TEN_THUOC}</td>
                <td>{item.SO_LUONG}</td>
                <td>{formatNumberToPrice(item.GIA_BAN)}</td>
                <td>{formatNumberToPrice(item.THANH_TIEN)}</td>
              </tr>
            );
          })}
        </tbody>
      </table>

      <div
        className="foot-break"
        style={{
          display: "table",
          justifyContent: "space-between",
          marginBottom: 20,
        }}
      >
        <div style={{ display: "table-cell", width: "100%" }}>
          {i18n.t(languageKeys.txt_So_luong)}: <b>{BAO_CAO.data_thuoc?.length}</b>
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
              <div style={{ display: "table-cell" }}>{i18n.t(languageKeys.tong_tien_hang)}:</div>
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
              <div style={{ display: "table-cell" }}>{i18n.t(languageKeys.tong_thanh_toan)}:</div>
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

      <div style={{ textAlign: "center" }}>
        <i>{i18n.t(languageKeys.cam_on_va_hen_gap_lai)}!</i>
      </div>
    </div>
  );
};

export default memo(PhieuBanThuoc);
