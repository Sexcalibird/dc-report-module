import moment from "moment";
import React, { memo } from "react";
import { getImageFromSever, getFullName } from "../../helpers";
import { useSelector } from "react-redux";
import { getTextByStatus, getGioiTinhBN } from "../../pages/QuanLyTiepDon/columnsTiepDon";
import i18n, { languageKeys, languages } from "../../i18n";

export const stylePhieuBaoCaoTiepDon = `
#phieu-bao-cao-tiep-don * { font-size: 1rem; line-height: 1.5em; font-family: "Times New Roman", Times, serif; }
#phieu-bao-cao-tiep-don .logo { width: 75px; height: 75px; object-fit: contain; }
#phieu-bao-cao-tiep-don .header { display: flex; gap: 20px; }
#phieu-bao-cao-tiep-don b { font-size: 1.2rem; }
#phieu-bao-cao-tiep-don .hospital-name { text-transform: uppercase; font-weight: bold; }
#phieu-bao-cao-tiep-don .report-name { text-transform: uppercase; font-size: 2.5rem; font-weight: bold; margin-top: 1rem; margin-bottom: 0.5rem; }
#phieu-bao-cao-tiep-don .table { margin-bottom: 1rem; margin-top: 0.5rem; }
#phieu-bao-cao-tiep-don .table * { line-height: 1.2em; }
#phieu-bao-cao-tiep-don .table, .table th, .table td { border: 1px solid black; border-collapse: collapse; }
#phieu-bao-cao-tiep-don .table th, .table td { padding: 5px; }
#phieu-bao-cao-tiep-don .table th { text-align: start; }
#phieu-bao-cao-tiep-don .title { margin-block: 0.5rem; font-size: 1.2rem; font-weight: bold; }
@media print {
   #phieu-bao-cao-tiep-don .foot-break { break-inside: avoid; }
}
`;

const PhieuBaoCaoTiepDon = ({ data = { hospital: {}, data: [] }, filters = {} }) => {
  const userProfile = useSelector((state) => state.auth.user);

  console.log("filters", filters);

  return (
    <div id="phieu-bao-cao-tiep-don">
      <div className="header">
      { data.hospital[0].avatar && <img src={getImageFromSever(data.hospital[0].avatar)} alt="" className="logo" /> }
        <div>
          <div className="hospital-name">{data.hospital[0].name}</div>
          <div>
            {i18n.t(languageKeys.dia_chi)}: {data.hospital[0].address}
          </div>
          <div>
            {i18n.t(languageKeys.dien_thoai)}: {data.hospital[0].phone}
          </div>
        </div>
      </div>

      <div style={{ textAlign: "center", marginBottom: "1rem" }}>
        <div className="report-name">{i18n.t(languageKeys.tab_Bao_cao_tiep_don)}</div>
        <b>
          {i18n.t(languageKeys.nguoi_lap_bao_cao)}: {getFullName(userProfile)}
        </b>
      </div>

      <div
        style={{
          display: "flex",
          marginBottom: "1rem",
        }}
      >
        <div style={{ flex: "35%" }}>
          {i18n.t(languageKeys.field_Nguoi_tiep_don)}: {!!filters.nguoi_tiep_don ? filters.nguoi_tiep_don : i18n.t(languageKeys.tat_ca)}
        </div>
        <div style={{ flex: "40%" }}>
          {i18n.t(languageKeys.thoi_gian)}: {!!filters.TU ? moment(filters.TU, "YYYYMMDD").format("DD/MM/YYYY") : moment().format("DD/MM/YYYY")} -{" "}
          {!!filters.DEN ? moment(filters.DEN, "YYYYMMDD").format("DD/MM/YYYY") : moment().format("DD/MM/YYYY")}
        </div>
        {/* <div style={{ flex: "25%" }}>
          Đối tượng:{" "}
          {!!filters.filter_doi_tuong_benh_nhan
            ? filters.filter_doi_tuong_benh_nhan === "VIEN_PHI"
              ? "Viện phí"
              : "Nước ngoài"
            : i18n.t(languageKeys.tat_ca)}
        </div> */}
        <div style={{ flex: "25%" }}>
        {i18n.t(languageKeys.khoa)}:{" "}
          {!!filters.TEN_KHOA
          ?
            filters.TEN_KHOA
            : i18n.t(languageKeys.tat_ca)}
        </div>
      </div>

      <table style={{ width: "100%" }} className="table">
        <thead>
          <tr>
            <th style={{ width: "28px" }}>{i18n.t(languageKeys.stt)}</th>
            <th>{i18n.t(languageKeys.cuoc_kham)}</th>
            <th>{i18n.t(languageKeys.field_Ma_benh_nhan)}</th>
            <th>{i18n.t(languageKeys.ten_benh_nhan)}</th>
            <th>{i18n.t(languageKeys.field_Nam_sinh)}</th>
            <th>{i18n.t(languageKeys.field_So_dien_thoai)}</th>
            <th>{i18n.t(languageKeys.field_Gioi_tinh)}</th>
            <th>{i18n.t(languageKeys.field_Doi_tuong_benh_nhan)}</th>
            <th>{i18n.t(languageKeys.khoa)}</th>
            <th>{i18n.t(languageKeys.label_ngay_tiep_don)}</th>
            <th>{i18n.t(languageKeys.field_Nguoi_tiep_don)}</th>
            <th>{i18n.t(languageKeys.trang_thai)}</th>
          </tr>
        </thead>
        <tbody>
          {data.data.map((item, index) => (
            <tr>
              <td>{index + 1 >= 10 ? index + 1 : `0${index + 1}`}</td>
              <td>{item.MA_CUOC_KHAM}</td>
              <td>{item.MA_BENH_NHAN}</td>
              <td>{item.TEN_BENH_NHAN}</td>
              <td>{moment(item.NGAY_SINH, "YYYYMMDD").format("YYYY")}</td>
              <td>{item.SO_DIEN_THOAI || ""}</td>
              <td>{getGioiTinhBN(item.GIOI_TINH)}</td>
              <td>{item.TEN_DOI_TUONG}</td>
              <td>{item.TEN_KHOA_PHONG}</td>
              <td>{<span>{item?.GIO ? item?.GIO + " - " : ""} {item.NGAY ? moment(item.NGAY, "YYYYMMDD").format("DD/MM/YYYY"): ""}</span>}</td>
              <td>{item.NGUOI_TIEP_DON}</td>
              <td>{getTextByStatus(item.TRANG_THAI_HIEN_TAI)}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <div>
        {i18n.t(languageKeys.txt_So_luong)}: <span style={{ fontWeight: "bold" }}>{data.data.length}</span>
      </div>

      <div className="foot-break" style={{ display: "flex", justifyContent: "flex-end" }}>
        <div>
          <i>
          {i18n.language === languages.tieng_viet ?
            <>Ngày {moment().date()}, tháng {moment().month() + 1}, năm {moment().year()}</> 
              :<div style={{marginLeft:"12%"}}>
              {moment().format('MMMM d, YYYY')}
            </div>
          }

          </i>

          <div style={{ textAlign: "center" }}>
            <div>
              <b>{i18n.t(languageKeys.nguoi_tao_bao_cao)} </b>
            </div>
            <i>({i18n.t(languageKeys.ky_va_ghi_ro_ho_ten)})</i>
            <div style={{ marginTop: 80, fontWeight: "bold" }}>
              {getFullName(userProfile)}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default memo(PhieuBaoCaoTiepDon);
