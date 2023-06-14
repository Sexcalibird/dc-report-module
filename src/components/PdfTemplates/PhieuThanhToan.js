import JsBarcode from "jsbarcode";
import moment from "moment";
import { nanoid } from "nanoid";
import React, { useEffect } from "react";
import {
  getImageFromSever,
  getFullName,
  formatNumberToPrice,
  layDiaChi,
} from "../../helpers";
import { useSelector } from "react-redux";
import i18n, { languageKeys } from "../../i18n";

export const stylePhieuThanhToan = `
#phieu-thanh-toan * { font-size: 1rem; line-height: 1.5em; font-family: "Times New Roman", Times, serif; }
#phieu-thanh-toan .logo { width: 75px; height: 75px; object-fit: contain; }
#phieu-thanh-toan .header { display: flex; gap: 20px; }
#phieu-thanh-toan .hospital-name { text-transform: uppercase; font-weight: bold; }
#phieu-thanh-toan .stt { text-transform: uppercase; font-size: 2.5rem; font-weight: bold; margin-top: 1rem; margin-bottom: 0.5rem; }
#phieu-thanh-toan .table { margin-bottom: 1rem; margin-top: 0.5rem; }
#phieu-thanh-toan .table * { line-height: 1.2em; }
#phieu-thanh-toan .table, .table th, .table td { border: 1px solid black; border-collapse: collapse; }
#phieu-thanh-toan .table th, .table td { padding: 5px; }
#phieu-thanh-toan .table th { text-align: start; }
#phieu-thanh-toan .title { margin-block: 0.5rem; font-size: 1.2rem; font-weight: bold; }
#phieu-thanh-toan .foot-break { margin-top:50px; }
#phieu-thanh-toan .table { border: 0.3px solid #333333; width: 100%;border-radius: 5px; }
#phieu-thanh-toan .line { border-bottom: 0.01px dashed #000000; }
#phieu-thanh-toan .tableText { padding: 10px ;}
@media print {
#phieu-thanh-toan .foot-break { break-inside: avoid; }
}
`;

const PhieuThanhToan = ({
  data = { BAO_CAO: {}, BENH_VIEN: {} },
  rid = "",
}) => {
  const userProfile = useSelector((state) => state.auth.user);

  // useEffect(() => {
  //   if (!!rid && !!data.benh_nhan.ma_benh_nhan) {
  //     JsBarcode(`#barcode-${rid}`)
  //       .options({ font: "OCR-B" })
  //       .CODE128(data.benh_nhan.ma_benh_nhan, {
  //         fontSize: 13,
  //         width: 1.3,
  //         height: 60,
  //         textMargin: 0,
  //       })
  //       .render();
  //   }
  // }, [data.benh_nhan.ma_benh_nhan, rid]);
  return (
    <div id="phieu-thanh-toan">
      <div className="header">
        {data.BENH_VIEN.ANH_DAI_DIEN && <img
          src={getImageFromSever(data.BENH_VIEN.ANH_DAI_DIEN)}
          alt=""
          className="logo"
        />}

        <div>
          <div className="hospital-name">{data.BENH_VIEN.TEN_CSKCB}</div>
          <div>
            {i18n.t(languageKeys.dia_chi)}: {layDiaChi(data.BENH_VIEN)}
          </div>
          <div>{i18n.t(languageKeys.dien_thoai)}: {data.BENH_VIEN.SO_DIEN_THOAI || ""}</div>
        </div>
      </div>

      <div style={{ textAlign: "center", marginBottom: "1rem" }}>
        <div className="stt">{i18n.t(languageKeys.txt_phieu_chi)}</div>
      </div>

      <div style={{ display: "flex", justifyContent: "space-between" }}>
        <div style={{ width: "50%" }}>
          {i18n.t(languageKeys.field_Ma_phieu)} :{" "}
          <b style={{ textTransform: "uppercase" }}>{data.BAO_CAO.MA_PHIEU}</b>
        </div>
        <div style={{ width: "50%" }}>
          {i18n.t(languageKeys.common_ngay)}: <b>{moment(data.BAO_CAO.NGAY).format("DD/MM/YYYY")}</b>
        </div>
      </div>
      <div style={{ display: "flex", justifyContent: "space-between" }}>
        <div style={{ width: "50%" }}>
          {i18n.t(languageKeys.nguoi_lap)} :{" "}
          <b style={{ textTransform: "uppercase" }}>{data.BAO_CAO.NGUOI_TAO}</b>
        </div>
        <div style={{ width: "50%" }}>
        {i18n.t(languageKeys.txt_nguoi_nhan_tien)}: <b>{data.BAO_CAO.TEN_NCC}</b>
        </div>
      </div>

      <div>
      {i18n.t(languageKeys.chi_nhanh)}: <b>{data.BAO_CAO.TEN_CSKCB}</b>
      </div>

      <div>{i18n.t(languageKeys.txt_ly_do_nhan)}: {data.BAO_CAO.GHI_CHU || ""}</div>

      <div className="table">
        <div className="tableText">
          {i18n.t(languageKeys.txt_So_tien)} : <b> {formatNumberToPrice(data.BAO_CAO.SO_TIEN)} đồng</b>
        </div>
        <div className="line"></div>
        <div className="tableText">
          {i18n.t(languageKeys.bang_chu)} : <b>{data.BAO_CAO.SO_TIEN_CHU} đồng</b>
        </div>
      </div>

      {/* <table style={{ width: "100%" }} className="table">
        <thead>
          <tr>
            <td style={{ width: "1%", whiteSpace: "nowrap" }}>Số tiền</td>
            <td>Bằng chữ</td>
          </tr>
        </thead>
        <tbody>
          {data.dich_vu.map((item, index) => (
            <tr key={nanoid(5)}>
              <td>{index + 1 >= 10 ? index + 1 : `0${index + 1}`}</td>
              <td>
                <b>{item}</b>
              </td>
            </tr>
          ))}
        </tbody>
      </table> */}

      <div style={{ float: "right" }}>
        <i>
          {moment().format("HH:mm") +
            ", Ngày " +
            moment().format("DD") +
            " tháng " +
            moment().format("MM") +
            " năm " +
            +moment().format("YYYY")}
          {/* {data.ngay_tao} */}
        </i>
      </div>
      <div
        className="foot-break"
        style={{
          display: "flex",
          justifyContent: "space-between",
        }}
      >
        <div style={{ textAlign: "center" }}>
          <div style={{ fontWeight: "bold" }}>{i18n.t(languageKeys.txt_thu_quy)}</div>
          <i>({i18n.t(languageKeys.ky_va_ghi_ro_ho_ten)})</i>
          <div style={{ marginTop: 80, fontWeight: "bold" }}>
            {/* {getFullName(userProfile)} */}
          </div>
        </div>
        <div style={{ textAlign: "center" }}>
          <div style={{ fontWeight: "bold" }}>{i18n.t(languageKeys.txt_nguoi_lap_phieu)}</div>
          <i>({i18n.t(languageKeys.ky_va_ghi_ro_ho_ten)})</i>
          <div style={{ marginTop: 80, fontWeight: "bold" }}>
            {data.BAO_CAO.NGUOI_TAO}
          </div>
        </div>
        <div style={{ textAlign: "center" }}>
          <div style={{ fontWeight: "bold" }}>{i18n.t(languageKeys.txt_nguoi_nhan)}</div>
          <i>({i18n.t(languageKeys.ky_va_ghi_ro_ho_ten)})</i>
          <div style={{ marginTop: 80, fontWeight: "bold" }}>
            {/* {getFullName(userProfile)} */}
          </div>
        </div>
      </div>
    </div>
  );
};

export default PhieuThanhToan;
