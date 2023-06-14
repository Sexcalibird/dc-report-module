import moment from "moment";
import {
  getImageFromSever,
  getFullName,
  formatNumberToPrice,
  rid,
  layDiaChi,
} from "../../helpers";
import { useSelector } from "react-redux";
import i18n, { languageKeys } from "../../i18n";

export const stylePhieuBaoCaoVienPhi = `
#phieu-bao-cao-vien-phi * { font-size: 1rem; line-height: 1.5em; font-family: "Times New Roman", Times, serif; }
#phieu-bao-cao-vien-phi .logo { width: 60px; height: 60px; object-fit: contain; }
#phieu-bao-cao-vien-phi .header { display: flex; gap: 20px; }
#phieu-bao-cao-vien-phi b { font-size: 1.2rem; }
#phieu-bao-cao-vien-phi .hospital-name { text-transform: uppercase; font-weight: bold; }
#phieu-bao-cao-vien-phi .report-name { text-transform: uppercase; font-size: 2.5rem; font-weight: bold; margin-top: 1rem; margin-bottom: 0.5rem; }
#phieu-bao-cao-vien-phi .table { margin-bottom: 1rem; margin-top: 0.5rem; }
#phieu-bao-cao-vien-phi .table * { line-height: 1.2em; font-size: 0.8rem; }
#phieu-bao-cao-vien-phi .table, .table th, .table td { border: 1px solid black; border-collapse: collapse; }
#phieu-bao-cao-vien-phi .table th, .table td { padding: 5px; }
#phieu-bao-cao-vien-phi .table th { text-align: start; }
#phieu-bao-cao-vien-phi .title { margin-block: 0.5rem; font-size: 1.2rem; font-weight: bold; }
@media print {
   #phieu-bao-cao-vien-phi .foot-break { break-inside: avoid; }
}
`;

const PhieuBaoCaoVienPhi = ({
  data = { BO_LOC: {}, BENH_VIEN: {}, BAO_CAO: { DANH_SACH_DICH_VU: [] } },
  nguoi_tiep_don = {},
  phong_thuc_hien = {},
  columns = [],
}) => {
  const userProfile = useSelector((state) => state.auth.user);

  const renderColumns = (item) => {
    return columns.map((col) => {
      switch (col.dataIndex) {
        case "MA_CUOC_KHAM":
          return <td style={{ fontWeight: "bold" }}>{item.MA_CUOC_KHAM}</td>;

        case "MA_BENH_NHAN":
          return <td style={{ fontWeight: "bold" }}>{item.MA_BENH_NHAN}</td>;

        case "TEN":
          return <td>{item.TEN}</td>;

        case "DOI_TUONG_BENH_NHAN":
          return (
            <td>
              {item.DOI_TUONG_BENH_NHAN === "VIEN_PHI"
                ? i18n.t(languageKeys.data_Vien_phi)
                : i18n.t(languageKeys.field_doi_tuong_nuoc_ngoai)
              }
            </td>
          );

        case "DICH_VU":
          return <td>{item.DICH_VU}</td>;

        case "PHAN_LOAI":
          return (
            <td>{item.PHAN_LOAI === "KHAM_BENH" ? i18n.t(languageKeys.field_Kham_benh) : i18n.t(languageKeys.data_Kham_cls)}</td>
          );

        case "TEN_KHOA_PHONG":
          return <td>{item.TEN_KHOA_PHONG}</td>;

        case "NGUOI_TAO":
          return <td>{item.NGUOI_TAO}</td>;

        case "NGAY":
          return <td>{moment(item.NGAY, "YYYYMMDD").format("DD/MM/YYYY")}</td>;

        case "GIA_DICH_VU":
          return <td>{formatNumberToPrice(item.GIA_DICH_VU)}</td>;

        case "TONG_TIEN_GIAM":
          return <td>{formatNumberToPrice(item.TONG_TIEN_GIAM)}</td>;

        case "THANH_TIEN":
          return <td>{formatNumberToPrice(item.THANH_TIEN)}</td>;

        default:
          return null;
      }
    });
  };

  return (
    <div id="phieu-bao-cao-vien-phi">
      <div className="header">
      { data.BENH_VIEN.ANH_DAI_DIEN && <img src={getImageFromSever(data.BENH_VIEN.ANH_DAI_DIEN)} alt="" className="logo" /> }

        <div>
          <div className="hospital-name">{data.BENH_VIEN.TEN_CSKCB}</div>
          <div>
            {i18n.t(languageKeys.field_Dia_chi)}:{" "}
            {layDiaChi(data.BENH_VIEN)}
          </div>
          <div>{i18n.t(languageKeys.dien_thoai)}: {data.BENH_VIEN.SO_DIEN_THOAI || ""}</div>
        </div>
      </div>

      <div style={{ textAlign: "center", marginBottom: "1rem" }}>
        <div className="report-name">{i18n.t(languageKeys.tab_Bao_cao_vien_phi)}</div>
        <b>{i18n.t(languageKeys.nguoi_lap_bao_cao)}: {getFullName(userProfile)}</b>
      </div>

      <div>
        <b>{i18n.t(languageKeys.thong_tin_bo_loc)}</b>
      </div>

      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "flex-end",
          marginBottom: "1rem",
        }}
      >
        <div style={{ width: "40%" }}>
          <div>
            {i18n.t(languageKeys.field_Nguoi_tiep_don)}:{" "}
            {!!data.BO_LOC.NHANSU_ID
              ? !!nguoi_tiep_don
                ? getFullName(nguoi_tiep_don)
                : ""
              : "Tất cả"}
          </div>
          <div>
          {i18n.t(languageKeys.field_Doi_tuong)}:{" "}
            {!!data.BO_LOC.DOI_TUONG_BENH_NHAN
              ? data.BO_LOC.DOI_TUONG_BENH_NHAN === "VIEN_PHI"
                ? i18n.t(languageKeys.data_Vien_phi)
                : i18n.t(languageKeys.field_doi_tuong_nuoc_ngoai)
              : i18n.t(languageKeys.tat_ca)}
          </div>
        </div>

        <div style={{ width: "30%" }}>
          <div>
            Ngày: {moment(data.BO_LOC.TU, "YYYYMMDD").format("DD/MM/YYYY")} -{" "}
            {moment(data.BO_LOC.DEN, "YYYYMMDD").format("DD/MM/YYYY")}
          </div>
          <div>
            Loại dịch vụ:{" "}
            {!!data.BO_LOC.LOAI_DV
              ? data.BO_LOC.LOAI_DV === "KHAM_BENH"
                ? i18n.t(languageKeys.field_Kham_benh)
                : i18n.t(languageKeys.data_Kham_cls)
              : i18n.t(languageKeys.tat_ca)}
          </div>
        </div>

        <div style={{ width: "30%" }}>
          <div>
            {i18n.t(languageKeys.field_Phong_thuc_hien)}:{" "}
            {!!data.BO_LOC.PHONG_ID
              ? !!phong_thuc_hien
                ? phong_thuc_hien.TEN_KHOA_PHONG
                : ""
              : i18n.t(languageKeys.tat_ca)}
          </div>
        </div>
      </div>

      <table style={{ width: "100%" }} className="table">
        <thead>
          <tr>
            {columns.map((col) => (
              <th key={col.key}>{col.title}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {data.BAO_CAO.DANH_SACH_DICH_VU.map((item) => (
            <tr key={rid()}>{renderColumns(item)}</tr>
          ))}

          <tr>
            <td colSpan={columns.length}>
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                }}
              >
                <div>
                  {i18n.t(languageKeys.cong_khoan)}:
                  <span style={{ fontWeight: "bold" }}>
                    {data.BAO_CAO.DANH_SACH_DICH_VU.length}
                  </span>
                </div>
                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    gap: "1rem",
                  }}
                >
                  <div>
                  {i18n.t(languageKeys.field_Tong_chi_phi)}:
                    <span style={{ fontWeight: "bold" }}>
                      {formatNumberToPrice(data.BAO_CAO.TONG_CHI_PHI)}
                    </span>
                  </div>
                  <div>
                  {i18n.t(languageKeys.field_Mien_giam)}:
                    <span style={{ fontWeight: "bold" }}>
                      {formatNumberToPrice(data.BAO_CAO.MIEN_GIAM)}
                    </span>
                  </div>
                  <div>
                  {i18n.t(languageKeys.tong_thanh_toan)}:
                    <span style={{ fontWeight: "bold" }}>
                      {formatNumberToPrice(data.BAO_CAO.TONG_THANH_TOAN)}
                    </span>
                  </div>
                </div>
              </div>
            </td>
          </tr>

          {/* <tr>
            <td colSpan={columns.length - 2}>
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                }}
              >
                <div>
                  Cộng khoản:{" "}
                  <span style={{ fontWeight: "bold" }}>
                    {data.BAO_CAO.DANH_SACH_DICH_VU.length}
                  </span>
                </div>
                <div>Tổng: </div>
              </div>
            </td>
            <td>
              <span style={{ fontWeight: "bold" }}>
                {formatNumberToPrice(data.BAO_CAO.MIEN_GIAM)}
              </span>
            </td>
            <td>
              <span style={{ fontWeight: "bold" }}>
                {formatNumberToPrice(data.BAO_CAO.TONG_THANH_TOAN)}
              </span>
            </td>
          </tr> */}
        </tbody>
      </table>

      <div
        className="foot-break"
        style={{ display: "flex", justifyContent: "flex-end" }}
      >
        <div>
          <i>
            {moment().format("HH:mm") +
              ", " +
              i18n.t(languageKeys.common_ngay) +
              moment().format("DD") +
              ` ${i18n.t(languageKeys.common_thang)} ` +
              moment().format("MM") +
              ` ${i18n.t(languageKeys.common_nam)} ` +
              +moment().format("YYYY")}
          </i>

          <div style={{ textAlign: "center" }}>
            <div>
              <b>{i18n.t(languageKeys.nguoi_lap_bao_cao)}</b>
            </div>
            <i>({i18n.t(languageKeys.ky_ten_va_ghi_ro_ho_ten)})</i>
            <div style={{ marginTop: 80, fontWeight: "bold" }}>
              {getFullName(userProfile)}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PhieuBaoCaoVienPhi;
