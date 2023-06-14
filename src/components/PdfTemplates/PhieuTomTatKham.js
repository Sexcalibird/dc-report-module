import JsBarcode from "jsbarcode";
import moment from "moment";
import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { getFullName, getImageFromSever } from "../../helpers";
import i18n, { languageKeys, languages } from "../../i18n";

export const stylePhieuTomTatKham = `
#phieu-tom-tat-kham * { font-size: 1rem; line-height: 1.5em; font-family: 'Times New Roman', Times, serif; }
#phieu-tom-tat-kham .logo { width: 80px; height: 80px; object-fit: contain; }
#phieu-tom-tat-kham .header { display: flex; gap: 20px; }
#phieu-tom-tat-kham .hospital-name { text-transform: uppercase; font-weight: bold; font-size: 1.2rem; }
#phieu-tom-tat-kham .title { text-transform: uppercase; font-size: 2rem; font-weight: bold; margin-top: 1.5rem; margin-bottom: 1rem; text-align: center; }
#phieu-tom-tat-kham .subtitle { margin-block: 0.5rem; font-size: 1.2rem; font-weight: bold; }
#phieu-tom-tat-kham .table { margin-block: 1rem; }
#phieu-tom-tat-kham .table, .table th, .table td { border: 1px solid black; border-collapse: collapse; }
#phieu-tom-tat-kham .table th, .table td { padding: 5px 10px; }
#phieu-tom-tat-kham .table th { text-align: start; }
#phieu-tom-tat-kham .exam-info > div { margin-bottom: 0.5em; }
#phieu-tom-tat-kham .avatar { height: 80px; width: 80px; padding-right: 15px; }
#phieu-tom-tat-kham .anotherFoot { display: flex; justify-content: end; padding-top: 10px; }
#phieu-tom-tat-kham .anotherFoot > div { text-align: center; }
#phieu-tom-tat-kham .des { font-style: italic; }
@media print {
   #phieu-tom-tat-kham .foot-break { break-inside: avoid; }
}
`;

const PhieuTomTatKham = ({ data = { benh_nhan: {}, dich_vu: [], hospital: {} }, rid, ly_do_kham = "" }) => {
  const userProfile = useSelector((state) => state.auth.user);

  useEffect(() => {
    if (!!rid && !!data.benh_nhan.ma_benh_nhan) {
      JsBarcode(`#barcode-${rid}`)
        .options({ font: "OCR-B" })
        .CODE128(data.benh_nhan.ma_benh_nhan, {
          fontSize: 16,
          width: 1.3,
          height: 60,
          textMargin: 0,
        })
        .render();
    }
  }, [data.benh_nhan.ma_benh_nhan, rid]);

  return (
    <div id="phieu-tom-tat-kham">
      <div className="header">
        <img className="logo" src={getImageFromSever(data.hospital.avatar)} alt="" />

        <div style={{ display: "flex", gap: 5, justifyContent: "space-between" }}>
          <div style={{ flexGrow: 1 }}>
            <div className="hospital-name">{data.hospital.name}</div>
            <div>{i18n.t(languageKeys.field_Dia_chi)}: {data.hospital.address}</div>
            <div>{i18n.t(languageKeys.dien_thoai)}: {data.hospital.phone}</div>
          </div>

          <svg id={`barcode-${rid}`}></svg>
        </div>
      </div>

      <div className="title">{i18n.t(languageKeys.title_Phieu_tom_tat_kham).toUpperCase()}</div>

      <div>
        <div className="subtitle">{i18n.t(languageKeys.thong_tin_khach_hang)}</div>

        <div style={{ display: "grid", gridTemplateColumns: "40% 60%" }}>
          <div>
          {i18n.t(languageKeys.ma_khach_hang)}: <b>{data.benh_nhan.ma_benh_nhan}</b>
          </div>

          <div>
          {i18n.t(languageKeys.ten_khach_hang)}: <b>{data.benh_nhan.ten_benh_nhan}</b>
          </div>
        </div>

        <div style={{ display: "flex", justifyContent: "space-between" }}>
          <div>{i18n.t(languageKeys.field_Doi_tuong)}: {data.benh_nhan.doi_tuong}</div>
          <div>{i18n.t(languageKeys.field_Gioi_tinh)}: {data.benh_nhan.gioi_tinh}</div>
          <div>{i18n.t(languageKeys.field_Nam_sinh)}: {data.benh_nhan.ngay_sinh}</div>
          <div>{i18n.t(languageKeys.field_So_dien_thoai)}: {data.benh_nhan.sdt}</div>
        </div>

        <div className="subtitle" style={{ marginTop: 10 }}>
        {i18n.t(languageKeys.field_Chi_so_sinh_ton)}
        </div>

        <table style={{ width: "100%" }} className="table">
          <tbody>
            <tr>
              <td>
              {i18n.t(languageKeys.field_Mach)}: <b>{data.chi_so_sinh_ton.mach}</b> lần/phút
              </td>
              <td>
              {i18n.t(languageKeys.field_Nhiet_do)}: <b>{data.chi_so_sinh_ton.nhiet_do}</b> độ C
              </td>
              <td>
                Sp02: <b> {data.chi_so_sinh_ton.Sp02}</b> %
              </td>
            </tr>

            <tr>
              <td>
              {i18n.t(languageKeys.field_Nhip_tho)}: <b>{data.chi_so_sinh_ton.nhip_tho}</b> nhịp/phút
              </td>

              <td colSpan="2">
              {i18n.t(languageKeys.field_Huyet_ap)}:{" "}
                {data.chi_so_sinh_ton.huyet_ap.map((huyet_ap, index) => {
                  return index !== 0 ? (
                    <React.Fragment key={index}>
                      {" "}
                      - <b>{huyet_ap}</b> mmHg
                    </React.Fragment>
                  ) : (
                    <React.Fragment key={index}>
                      <b>{huyet_ap}</b> mmHg
                    </React.Fragment>
                  );
                })}
              </td>
            </tr>
          </tbody>
        </table>

        <div className="exam-info">
          <div>
            <b>{i18n.t(languageKeys.field_Ly_do_kham)}</b>: {data.tom_tat_kham.ly_do_kham || ly_do_kham || ""}
          </div>
          <div>
            <b>{i18n.t(languageKeys.field_Qua_trinh_benh_ly)}</b>: {data.tom_tat_kham.qua_trinh_benh_ly}
          </div>
          <div>
            <b>{i18n.t(languageKeys.field_Tien_su_ban_than)}</b>: {data.tom_tat_kham.tien_su_ban_than}
          </div>
          <div>
            <b>{i18n.t(languageKeys.field_Tien_su_gia_dinh)}</b>: {data.tom_tat_kham.tien_su_gia_dinh}
          </div>
          <div>
            <b>{i18n.t(languageKeys.field_Kham_lam_sang)}</b>: {data.tom_tat_kham.kham_lam_sang}
          </div>
          <div>
            <b>{i18n.t(languageKeys.field_Ma_benh_chinh)}</b>:{" "}
            {data.tom_tat_kham.ma_benh_chinh.map((ma_benh_chinh, index) => {
              return (
                <React.Fragment key={index}>
                  <b>{ma_benh_chinh.ma_benh}</b> - {ma_benh_chinh.ten_benh}
                </React.Fragment>
              );
            })}
          </div>
          <div>
            <b>{i18n.t(languageKeys.field_Ma_benh_kem_theo)}</b>:{" "}
            {data.tom_tat_kham.ma_benh_kem_theo.map((ma_benh_kem_theo, index) => {
              return index !== 0 ? (
                <React.Fragment key={index}>
                  ;{" "}
                  {!!ma_benh_kem_theo.ma_benh ? (
                    <>
                      <b>{ma_benh_kem_theo.ma_benh}</b> -{" "}
                    </>
                  ) : (
                    <></>
                  )}
                  {ma_benh_kem_theo.ten_benh}
                </React.Fragment>
              ) : (
                <React.Fragment key={index}>
                  {!!ma_benh_kem_theo.ma_benh ? (
                    <>
                      <b>{ma_benh_kem_theo.ma_benh}</b> -{" "}
                    </>
                  ) : (
                    <></>
                  )}
                  {ma_benh_kem_theo.ten_benh}
                </React.Fragment>
              );
            })}
          </div>
          <div>
            <b>{i18n.t(languageKeys.field_Chan_doan_lam_sang)}</b>: {data.tom_tat_kham.chan_doan_lam_sang}
          </div>
          <div>
            <b>{i18n.t(languageKeys.field_Chan_doan_xac_dinh)}</b>: {data.tom_tat_kham.chan_doan_xac_dinh}
          </div>
          <div>
            <b>{i18n.t(languageKeys.field_Cach_giai_quyet)}</b>: {data.tom_tat_kham.cach_giai_quyet}
          </div>
          <div>
            <b>{i18n.t(languageKeys.field_Ghi_chu)}</b>: {data.tom_tat_kham.ghi_chu}
          </div>
          {/* <div>
            <b>Kết quả điều trị</b>: {data.tom_tat_kham.ket_qua_dieu_tri}
          </div>
          <div>
            <b>Xử trí</b>: {data.tom_tat_kham.xu_tri}
          </div> */}

          {!!data?.tom_tat_kham?.ngay_tai_kham && (
            <div>
              <b>{i18n.t(languageKeys.field_ngay_tai_kham)}</b>: {moment(data.tom_tat_kham.ngay_tai_kham, "YYYYMMDD").format("DD/MM/YYYY")}
            </div>
          )}
        </div>

        <div className="foot-break" style={{ minHeight: "20vh" }}>
          {/* <i>{data.ngay_tao}</i> */}

          <i style={{ display: "flex", justifyContent: "end" }}>
            { i18n.language === languages.tieng_viet ? moment().format("HH:mm") + `,  ${i18n.t(languageKeys.common_ngay)} ` + moment().format("DD") + ` ${i18n.t(languageKeys.common_thang)} ` + moment().format("MM") + ` ${i18n.t(languageKeys.common_nam)} ` + +moment().format("YYYY")
              :<div>{moment().format('MMMM d, YYYY')}</div>
            }
          </i>

          <div className="anotherFoot">
            <div style={{ marginRight: 40 }}>
              <b>{i18n.t(languageKeys.bac_si).toUpperCase()}</b>
              <div className="des">({i18n.t(languageKeys.ky_va_ghi_ro_ho_ten)})</div>
              <div style={{ marginTop: 90, fontWeight: "bold" }}>{getFullName(userProfile)}</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PhieuTomTatKham;
