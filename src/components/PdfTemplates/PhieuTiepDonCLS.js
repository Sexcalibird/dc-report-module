import JsBarcode from "jsbarcode";
import moment from "moment";
import { nanoid } from "nanoid";
import React, { memo, useEffect } from "react";
import { useSelector } from "react-redux";
import { getFullName, getImageFromSever } from "../../helpers";
import i18n, { languageKeys } from "../../i18n";

export const stylePhieuTiepDonCLS = `
#phieu-cls * { font-size: 1rem; line-height: 1.5em; font-family: "Times New Roman", Times, serif; }
#phieu-cls .logo { width: 75px; height: 75px; object-fit: contain; }
#phieu-cls .header { display: flex; gap: 20px; }
#phieu-cls .hospital-name { text-transform: uppercase; font-weight: bold; }
#phieu-cls .stt { text-transform: uppercase; font-size: 2.5rem; font-weight: bold; margin-top: 1rem; margin-bottom: 0.5rem; }
#phieu-cls .table { margin-bottom: 1rem; margin-top: 0.5rem; }
#phieu-cls .table * { line-height: 1.2em; }
#phieu-cls .table, .table th, .table td { border: 1px solid black; border-collapse: collapse; }
#phieu-cls .table th, .table td { padding: 5px; }
#phieu-cls .table th { text-align: start; }
#phieu-cls .title { margin-block: 0.5rem; font-size: 1.2rem; font-weight: bold; }
@media print {
   #phieu-cls .foot-break { break-inside: avoid; }
}
`;

const PhieuTiepDonCLS = ({
  data = { benh_nhan: {}, dich_vu: [], hospital: {}, bao_hiem: {} },
  rid = "",
  combineAllRoom = false,
  chiDinhCls = false,
}) => {
  const userProfile = useSelector((state) => state.auth.user);

  useEffect(() => {
    if (!!rid && !!data.benh_nhan.ma_benh_nhan) {
      JsBarcode(`#barcode-${rid}`)
        .options({ font: "OCR-B" })
        .CODE128(data.benh_nhan.ma_benh_nhan, {
          fontSize: 13,
          width: 1.3,
          height: 60,
          textMargin: 0,
        })
        .render();
    }
  }, [data.benh_nhan.ma_benh_nhan, rid]);

  return (
    <div id="phieu-cls">
      <div className="header">
      { data.hospital.avatar && <img src={getImageFromSever(data.hospital.avatar)} alt="" className="logo" /> }

        <div>
          <div className="hospital-name">{data.hospital.name}</div>
          <div>{i18n.t(languageKeys.field_Dia_chi)}: {data.hospital.address}</div>
          <div>{i18n.t(languageKeys.dien_thoai)}: {data.hospital.phone}</div>
        </div>
      </div>

      <div style={{ textAlign: "center", marginBottom: "1rem" }}>
        <div className="stt">{i18n.t(languageKeys.stt)}: {data.STT}</div>
        {!combineAllRoom && <div className="hospital-name">{data.hospital.ten_phong}</div>}
      </div>

      <div style={{ display: "flex", justifyContent: "start" }}>
        <div style={{ width: "33%" }}>
        {i18n.t(languageKeys.field_Ma_benh_nhan)}: <b>{data.benh_nhan.ma_benh_nhan}</b>
        </div>
        <div style={{ width: "67%" }}>
        {i18n.t(languageKeys.ten_benh_nhan)}:
          <b style={{ textTransform: "uppercase" }}>{data.benh_nhan.ten_benh_nhan}</b>
        </div>
      </div>

      <div style={{ display: "flex", justifyContent: "space-between" }}>
        <div style={{ width: "33%" }}>{i18n.t(languageKeys.field_Gioi_tinh)}: {data.benh_nhan.gioi_tinh}</div>

        <div style={{ width: "33%" }}>{i18n.t(languageKeys.field_Nam_sinh)}: {data.benh_nhan.ngay_sinh}</div>
        <div style={{ width: "33%" }}>
        {i18n.t(languageKeys.kham_ngay)}: <b>{data.bao_hiem.kham_ngay}</b>
        </div>
      </div>

      <div style={{ display: "flex", justifyContent: "start" }}>
        <div style={{ width: "33.3%" }}>{i18n.t(languageKeys.field_So_dien_thoai)}: {data.benh_nhan.sdt}</div>
        {/* <div style={{ width: "33%" }}>
          Địa chỉ: {data.benh_nhan.dia_chi.replace(/^(\,[^,]+){2}\,/, "")}
        </div> */}
        <div style={{ width: "33%" }}>{i18n.t(languageKeys.field_Doi_tuong)}: {data.bao_hiem.doi_tuong}</div>
      </div>
      <div style={{ display: "flex", justifyContent: "space-between" }}>
        <div>{i18n.t(languageKeys.dia_chi)}: {data.benh_nhan.dia_chi.replace(/^(\,[^,]+){2}\,/, "")}</div>
      </div>

      <div>
        <b>{i18n.t(languageKeys.chan_doan)}: </b> {data.benh_nhan.chan_doan_xac_dinh}
      </div>

      {!chiDinhCls && <div>{i18n.t(languageKeys.field_Ly_do_kham)}: {data.ly_do_vao_vien || ""}</div>}

      <div className="title">{i18n.t(languageKeys.dich_vu)}</div>

      {!combineAllRoom ? (
        <table style={{ width: "100%" }} className="table">
          <thead>
            <tr>
              <td style={{ width: "1%", whiteSpace: "nowrap" }}>
                <b>{i18n.t(languageKeys.stt)}</b>
              </td>
              <td style={{ width: "49%" }}>
                <b>{i18n.t(languageKeys.field_Ten_dich_vu)}</b>
              </td>
              <td style={{ width: "50%" }}>
                <b>{i18n.t(languageKeys.field_Ghi_chu)}</b>
              </td>
            </tr>
          </thead>
          <tbody>
            {data.dich_vu.map((item, index) => (
              <tr key={nanoid(5)}>
                <td>{index + 1 >= 10 ? index + 1 : `0${index + 1}`}</td>
                <td>{item.TEN_DICH_VU}</td>
                <td>{item.GHI_CHU}</td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <table style={{ width: "100%" }} className="table">
          <thead>
            <tr>
              <td style={{ width: "1%", whiteSpace: "nowrap" }}>{i18n.t(languageKeys.stt)}</td>
              <td style={{ width: "50%" }}>{i18n.t(languageKeys.field_Ten_dich_vu)}</td>
              <td>{i18n.t(languageKeys.field_Phong_thuc_hien)}</td>
            </tr>
          </thead>
          <tbody>
            {data.dich_vu.map((item, index) => (
              <tr key={nanoid(5)}>
                <td>{index + 1 >= 10 ? index + 1 : `0${index + 1}`}</td>
                <td>
                  <b>{item.name}</b>
                </td>
                <td>
                  <b>{item.room}</b>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}

      <div>
        <b>{i18n.t(languageKeys.field_Ghi_chu)}: </b> {data.ghi_chu && data.ghi_chu !== "undefined" ? data.ghi_chu :  ""}
      </div>

      {/* <div className="title">Bảo hiểm</div>

            <table>
              <tbody>
                <tr>
                  <td width="99%" style={{ whiteSpace: "nowrap" }}>
                    <div>
                      Số thẻ BHYT: <b>AL-395-3295050060</b>
                    </div>
                    <div>
                      Đối tượng: <b>Bảo hiểm - 80%</b>
                    </div>
                  </td>
                  <td style={{ whiteSpace: "nowrap" }}>
                    <div>Hạn thẻ đến: 01/01/2025</div>
                    <div>
                      Khám ngày: <b>07:51 - 13/01/2022</b>
                    </div>
                  </td>
                </tr>
              </tbody>
            </table> */}

      <div className="foot-break" style={{ display: "flex", justifyContent: "space-between" }}>
        <div>
          <svg id={`barcode-${rid}`}></svg>
        </div>

        <div>
          <i>
            {moment().format("HH:mm") + `, ${i18n.t(languageKeys.common_ngay)} ` + moment().format("DD") + ` ${i18n.t(languageKeys.common_thang)} ` + moment().format("MM") + ` ${i18n.t(languageKeys.common_nam)} ` +moment().format("YYYY")}
            {/* {data.ngay_tao} */}
          </i>

          <div style={{ textAlign: "center" }}>
            <div style={{ fontWeight: "bold" }}>{chiDinhCls ? i18n.t(languageKeys.bac_si) : i18n.t(languageKeys.field_Nguoi_tiep_don)}</div>
            <i>({i18n.t(languageKeys.ky_ten_va_ghi_ro_ho_ten)})</i>
            <div style={{ marginTop: 80, fontWeight: "bold" }}>{getFullName(userProfile)}</div>
          </div>
        </div>
      </div>

      <div style={{ textAlign: "center", marginTop: 10 }}>
        <i>{i18n.t(languageKeys.Phieu_co_gia_tri_trong_ngay)}</i>
      </div>
    </div>
  );
};

export default memo(PhieuTiepDonCLS);
