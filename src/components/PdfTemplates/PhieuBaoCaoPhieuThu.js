import moment from "moment";
import React from "react";
import { getImageFromSever, getFullName, rid, formatNumberToPrice, layDiaChi } from "../../helpers";
import { useSelector } from "react-redux";
import i18n, { languageKeys, languages } from "../../i18n";

export const stylePhieuBaoCaoPhieuThu = `
#phieu-bao-cao-phieu-thu * { font-size: 1rem; line-height: 1.5em; font-family: "Times New Roman", Times, serif; }
#phieu-bao-cao-phieu-thu .logo { width: 75px; height: 75px; object-fit: contain; }
#phieu-bao-cao-phieu-thu .header { display: flex; gap: 20px; }
#phieu-bao-cao-phieu-thu b { font-size: 1.1rem; }
#phieu-bao-cao-phieu-thu .hospital-name { text-transform: uppercase; font-weight: bold; }
#phieu-bao-cao-phieu-thu .report-name { text-transform: uppercase; font-size: 2rem; font-weight: bold; margin-top: 1rem; margin-bottom: 0.5rem; }
#phieu-bao-cao-phieu-thu .table { margin-bottom: 1rem; margin-top: 0.5rem; }
#phieu-bao-cao-phieu-thu .table * { line-height: 1.2em; font-size: 0.8rem; }
#phieu-bao-cao-phieu-thu .table, .table th, .table td { border: 1px solid black; border-collapse: collapse; }
#phieu-bao-cao-phieu-thu .table th, .table td { padding: 5px; }
#phieu-bao-cao-phieu-thu .table th { text-align: start; }
#phieu-bao-cao-phieu-thu .title { margin-block: 0.5rem; font-size: 1.1rem; font-weight: bold; }
@media print {
   #phieu-bao-cao-phieu-thu .foot-break { break-inside: avoid; }
}
`;

const PhieuBaoCaoPhieuThu = ({ data = { BO_LOC: {}, BENH_VIEN: {}, BAO_CAO: { DANH_SACH_PHIEU_THU: [] } }, nguoi_tiep_don = {} }) => {
  const userProfile = useSelector((state) => state.auth.user);

  return (
    <div id="phieu-bao-cao-phieu-thu">
      <div className="header">
      { data.BENH_VIEN.ANH_DAI_DIEN && <img src={getImageFromSever(data.BENH_VIEN.ANH_DAI_DIEN)} alt="" className="logo" /> }

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

      <div style={{ textAlign: "center", marginBottom: "1rem" }}>
        <div className="report-name">{i18n.t(languageKeys.tab_Bao_cao_phieu_thu)}</div>
        <b>
          {i18n.t(languageKeys.nguoi_lap_bao_cao)}: {getFullName(userProfile)}
        </b>
      </div>

      <div>
        <b>{i18n.t(languageKeys.thong_tin_bo_loc)}</b>
      </div>

      <div
        style={{
          display: "flex",
          marginBottom: "1rem",
        }}
      >
        <div style={{ width: "50%" }}>
          <div>
            {i18n.t(languageKeys.field_Nguoi_tiep_don)}: {!!data.BO_LOC.NHANSU_ID ? (!!nguoi_tiep_don ? getFullName(nguoi_tiep_don) : "") : "Tất cả"}
          </div>
          <div>
            {i18n.t(languageKeys.field_Doi_tuong)}:{" "}
            {!!data.BO_LOC.DOI_TUONG_BENH_NHAN ? (data.BO_LOC.DOI_TUONG_BENH_NHAN === "VIEN_PHI" ? "Viện phí" : "Nước ngoài") : "Tất cả"}
          </div>
        </div>

        <div style={{ width: "50%" }}>
          <div>
            {i18n.t(languageKeys.common_ngay)}: {moment(data.BO_LOC.TU, "YYYYMMDD").format("DD/MM/YYYY")} -{" "}
            {moment(data.BO_LOC.DEN, "YYYYMMDD").format("DD/MM/YYYY")}
          </div>
          <div>
            {i18n.t(languageKeys.field_loai_phieu_thu)}:{" "}
            {!!data.BO_LOC.NHOM
              ? data.BO_LOC.NHOM === "THANH_TOAN"
                ? i18n.t(languageKeys.vien_phi_thanh_toan)
                : i18n.t(languageKeys.vien_phi_Hoan_tien)
              : i18n.t(languageKeys.option_Tat_ca)}
          </div>
        </div>
      </div>

      <table style={{ width: "100%" }} className="table">
        <thead>
          <tr>
            <th style={{ width: "28px" }}>{i18n.t(languageKeys.field_Stt)}</th>
            <th>{i18n.t(languageKeys.ten_benh_nhan)}</th>
            <th>{i18n.t(languageKeys.field_Ngay_tao)}</th>
            <th>{i18n.t(languageKeys.field_Nguoi_tao)}</th>
            <th>{i18n.t(languageKeys.loai_phieu)}</th>
            <th>{i18n.t(languageKeys.vien_phi_tong_chi_phi)}</th>
            <th>{i18n.t(languageKeys.field_Mien_giam)}</th>
            <th>{i18n.t(languageKeys.tong_thanh_toan)}</th>
          </tr>
        </thead>
        <tbody>
          {data.BAO_CAO.DANH_SACH_PHIEU_THU.map((item, index) => (
            <tr key={rid()}>
              <td>{index + 1 >= 10 ? index + 1 : `0${index + 1}`}</td>
              <td>{item.TEN}</td>
              <td>{moment(item.NGAY, "YYYYMMDD").format("DD/MM/YYYY")}</td>
              <td>{item.NGUOI_TAO}</td>
              <td>{item.NHOM === "THANH_TOAN" ? "Thanh toán" : "Hoàn tiền"}</td>
              <td>{formatNumberToPrice(item.TONG_CHI_PHI)}</td>
              <td>{formatNumberToPrice(item.MIEN_GIAM)}</td>
              <td>{formatNumberToPrice(item.TONG_THANH_TOAN)}</td>
            </tr>
          ))}
          <tr>
            <td colSpan={8}>
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                }}
              >
                <div>
                  {i18n.t(languageKeys.cong_khoan)}:<span style={{ fontWeight: "bold" }}>{data.BAO_CAO.DANH_SACH_PHIEU_THU.length}</span>
                </div>
                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    gap: "1rem",
                  }}
                >
                  <div>
                    {i18n.t(languageKeys.vien_phi_tong_chi_phi)}:
                    <span style={{ fontWeight: "bold" }}>{formatNumberToPrice(data.BAO_CAO.TONG_CHI_PHI)}</span>
                  </div>
                  <div>
                    {i18n.t(languageKeys.field_Mien_giam)}:<span style={{ fontWeight: "bold" }}>{formatNumberToPrice(data.BAO_CAO.MIEN_GIAM)}</span>
                  </div>
                  <div>
                    {i18n.t(languageKeys.tong_thanh_toan)}:
                    <span style={{ fontWeight: "bold" }}>{formatNumberToPrice(data.BAO_CAO.TONG_THANH_TOAN)}</span>
                  </div>
                </div>
              </div>
            </td>
          </tr>
        </tbody>
      </table>

      <div className="foot-break" style={{ display: "flex", justifyContent: "flex-end" }}>
        <div>
          {i18n.language === languages.tieng_viet ? (
            <i>
              {moment().format("HH:mm") + ", "}
              Ngày {moment().date()},tháng {moment().month() + 1}, năm {moment().year()}
            </i>
          ) : (
            <i style={{ marginRight: "40px" }}> {moment().format("HH:mm , MMMM d, YYYY")}</i>
          )}
          <div style={{ textAlign: "center" }}>
            <div>
              <b>{i18n.t(languageKeys.nguoi_lap_bao_cao)} </b>
            </div>
            <i>({i18n.t(languageKeys.ky_va_ghi_ro_ho_ten)})</i>
            <div style={{ marginTop: 80, fontWeight: "bold" }}>{getFullName(userProfile)}</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PhieuBaoCaoPhieuThu;
