import JsBarcode from "jsbarcode";
import moment from "moment";
import { nanoid } from "nanoid";
import React, { useEffect } from "react";
import { getImageFromSever, getFullName, formatCurrency, convertDateToValue, layDiaChi } from "../../helpers";
import { useSelector } from "react-redux";
import i18n, { languageKeys, languages } from "../../i18n";

export const stylePhieuNhapKho = `
#phieu-nhap-kho * { font-size: 1rem; line-height: 1.5em; font-family: "Times New Roman", Times, serif; }
#phieu-nhap-kho .logo { width: 75px; height: 75px; object-fit: contain; }
#phieu-nhap-kho .header { display: flex;  align-items: flex-end; justify-content: space-between;  margin-bottom: 1rem;}
#phieu-nhap-kho .header-right { display: flex; align-items: center;}
#phieu-nhap-kho .hospital-name { text-transform: uppercase; font-weight: bold; }
#phieu-nhap-kho .main-title { text-align: center; text-transform: uppercase; font-size: 1.5rem; font-weight: bold;}
#phieu-nhap-kho .info { display: flex; justify-content: space-between; }
#phieu-nhap-kho .list { padding: 0; list-style-type: none; }
#phieu-nhap-kho .list > li:before { content: "-"; margin-right: 5px}
#phieu-nhap-kho .table { margin-bottom: 1rem; margin-top: 1rem; }
#phieu-nhap-kho .table * { line-height: 1.2em; }
#phieu-nhap-kho .table, .table th, .table td { border: 1px solid black; border-collapse: collapse; }
#phieu-nhap-kho .table th, .table td { padding: 5px; }
#phieu-nhap-kho .table th { text-align: center; font-weight: bold }
#phieu-nhap-kho .title { margin-block: 0.5rem; font-size: 1.2rem; font-weight: bold; }

@media print {
#phieu-nhap-kho .foot-break {break-inside: avoid; display: flex; justify-content: space-between; margin-top: 16px}
#phieu-nhap-kho .signature { display: flex; flex-direction: column; text-align: center; justify-content: flex-end}
}
`;

const PhieuNhapKho = ({ data = { BAO_CAO: {}, BENH_VIEN: {} }, rid = "" }) => {
  const userProfile = useSelector((state) => state.auth.user);

  return (
    <div id="phieu-nhap-kho">
      <div className="header">
        <div className="header-right">
          {data.BENH_VIEN.ANH_DAI_DIEN && <img src={getImageFromSever(data.BENH_VIEN.ANH_DAI_DIEN)} alt="" className="logo" />}

          <div style={{ marginLeft: 10 }}>
            <div className="hospital-name">{data.BENH_VIEN.TEN_CSKCB}</div>
            <div>
              {i18n.t(languageKeys.field_Dia_chi)}: {layDiaChi(data.BENH_VIEN)}
            </div>
            <div>
              {i18n.t(languageKeys.dien_thoai)}: {data.BENH_VIEN.SO_DIEN_THOAI || ""}
            </div>
          </div>
        </div>

        <div style={{ textAlign: "center", fontWeight: "bold" }}>
          <div style={{ textTransform: "uppercase" }}>{i18n.t(languageKeys.cong_hoa_xa_hoi_chu_nghia)}</div>
          <div>{i18n.t(languageKeys.doc_lay_tu_do_hanh_phuc)}</div>
        </div>
      </div>
      <div style={{ textAlign: "end" }}>
        <b>
          {i18n.t(languageKeys.so)}: {data.BAO_CAO.chi_tiet.MA_PHIEU}
        </b>
      </div>
      <div className="main-title">
        <div>
          {data.BAO_CAO.chi_tiet.PHAN_LOAI === "CHUYEN_KHO"
            ? i18n.t(languageKeys.phieu_chuyen_kho)?.toUpperCase()
            : i18n.t(languageKeys.Phieu_nhap_kho)?.toUpperCase()}
        </div>
      </div>
      <div className="info">
        <div>
          {data.BAO_CAO.chi_tiet.PHAN_LOAI === "CHUYEN_KHO" ? (
            <ul className="list">
              {/* <li>
            Họ tên người giao: <b></b>
</li> */}
              <li>
                {i18n.t(languageKeys.duoc_kho_xuat_thuoc)}: {data.BAO_CAO.chi_tiet.TU_KHO_TEN} <b></b>
              </li>
              <li>
                {i18n.t(languageKeys.duoc_kho_nhap_thuoc)}: {data.BAO_CAO.chi_tiet.TEN_KHO}
                <b></b>
              </li>
              {/* <li>
            Địa chỉ: <b></b>
          </li> */}

              <li>
                {i18n.t(languageKeys.bao_cao_dien_giai)}: {data.BAO_CAO.chi_tiet.GHI_CHU}
                <b></b>
              </li>
            </ul>
          ) : (
            <ul className="list">
              {/* <li>
              Họ tên người giao: <b></b>
            </li> */}
              <li>
                {i18n.t(languageKeys.txt_hoa_don_so)}: {data.BAO_CAO.chi_tiet.MA_HOA_DON} <b></b>
              </li>
              <li>
                {i18n.t(languageKeys.nha_cung_cap)}: {data.BAO_CAO.chi_tiet.TEN_NCC}
                <b></b>
              </li>
              {/* <li>
              Địa chỉ: <b></b>
            </li> */}
              <li>
                {i18n.t(languageKeys.txt_nhap_tai_kho)}: {data.BAO_CAO.chi_tiet.TEN_KHO} <b></b>
              </li>
              <li>
                {i18n.t(languageKeys.bao_cao_dien_giai)}: {data.BAO_CAO.chi_tiet.GHI_CHU}
                <b></b>
              </li>
            </ul>
          )}
        </div>
        {/* <div style={{ marginTop: "2.5rem" }}>
          Ngày hóa đơn: <b></b>
        </div> */}
      </div>
      <table style={{ width: "100%" }} className="table">
        <thead>
          <tr>
            <th style={{ width: "5%" }}>STT</th>
            <th style={{ width: "30%" }}>{i18n.t(languageKeys.ten_thuoc_vat_tu)}</th>
            <th style={{ width: "5%" }}>{i18n.t(languageKeys.field_Don_vi)}</th>
            <th style={{ width: "8%" }}>{i18n.t(languageKeys.field_so_lo)}</th>
            <th style={{ width: "10%" }}>{i18n.t(languageKeys.han_dung)}</th>
            <th style={{ width: "5%" }}>{i18n.t(languageKeys.txt_So_luong)}</th>
            <th style={{ width: "5%" }}>{i18n.t(languageKeys.field_Gia_nhap)}</th>
            <th style={{ width: "12%" }}>
              {i18n.t(languageKeys.field_don_gia)} ({i18n.t(languageKeys.common_da)} VAT)
            </th>
            <th style={{ width: "20%" }}>Thành tiền</th>
          </tr>
        </thead>
        <tbody>
          {data.BAO_CAO.data_thuoc.map((item, index) => (
            <tr key={index}>
              <td>
                <b>{index + 1}</b>
              </td>
              <td>
                <b>{item.Thuoc_Ten}</b>
              </td>
              <td>
                <b>{item.TEN_DVT}</b>
              </td>

              <td>
                <b>{item.data_LO_THUOC[0].MA_LO}</b>
              </td>
              <td>
                <b>{convertDateToValue(item.data_LO_THUOC[0].HAN_SU_DUNG)}</b>
              </td>
              <td>
                <b>{item.SO_LUONG}</b>
              </td>
              <td style={{ textAlign: "end" }}>
                <b>{formatCurrency(item.GIA_NHAP, "", true)}</b>
              </td>
              <td style={{ textAlign: "end" }}>
                <b>{formatCurrency(item.GIA_CO_VAT, "", true)}</b>
              </td>
              <td style={{ textAlign: "end" }}>
                <b>{formatCurrency(item.THANH_TIEN, "", true)}</b>
              </td>
            </tr>
          ))}

          <tr>
            <td colSpan={8}>
              <div
                style={{
                  display: "flex",
                  justifyContent: "flex-end",
                }}
              >
                <div>{i18n.t(languageKeys.tong_tien)}: </div>
              </div>
            </td>
            <td style={{ textAlign: "end" }}>
              <span style={{ fontWeight: "bold" }}>{formatCurrency(data.BAO_CAO.chi_tiet.TONG_CHI_PHI, "", true)}</span>
            </td>
          </tr>
        </tbody>
      </table>
      <div className="foot-break" style={{ display: "flex", justifyContent: "space-between" }}>
        <div>
          {i18n.t(languageKeys.cong_khoan)} : <b>{data?.BAO_CAO?.data_thuoc?.length}</b>
        </div>
        <div>
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              gap: 20,
              alignItems: "center",
            }}
          >
            <div>(1) {i18n.t(languageKeys.tong_tien)}:</div>
            <b>{formatCurrency(data.BAO_CAO.chi_tiet.TONG_CHI_PHI, "đ", true)}</b>
          </div>

          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              gap: 20,
              alignItems: "center",
            }}
          >
            <div>(2) {i18n.t(languageKeys.field_Mien_giam)}:</div>
            <b>{formatCurrency(data.BAO_CAO.chi_tiet.TONG_MIEN_GIAM, "đ", true)}</b>
          </div>

          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              gap: 20,
              alignItems: "center",
              borderTop: "1px solid #000",
              marginTop: 5,
              paddingTop: 5,
            }}
          >
            <div>(3) = (1) - (2) {i18n.t(languageKeys.tong_thanh_toan)}:</div>
            <b>{formatCurrency(data.BAO_CAO.chi_tiet.TONG_THANH_TOAN, "đ", true)}</b>
          </div>
        </div>
      </div>
      <div className="foot-break">
        <div className="signature">
          <div style={{ fontWeight: "bold" }}>{i18n.t(languageKeys.field_Thu_kho)}</div>
          <i>({i18n.t(languageKeys.ky_va_ghi_ro_ho_ten)})</i>
          <div style={{ marginTop: 80, fontWeight: "bold" }}></div>
        </div>

        <div className="signature">
          <div style={{ fontWeight: "bold" }}>{i18n.t(languageKeys.txt_nguoi_giao)}</div>
          <i>({i18n.t(languageKeys.ky_va_ghi_ro_ho_ten)})</i>
          <div style={{ marginTop: 80, fontWeight: "bold" }}></div>
        </div>

        <div className="signature">
          <div style={{ fontWeight: "bold" }}>{i18n.t(languageKeys.txt_ke_toan)}</div>
          <i>({i18n.t(languageKeys.ky_va_ghi_ro_ho_ten)})</i>
          <div style={{ marginTop: 80, fontWeight: "bold" }}></div>
        </div>

        <div className="signature">
          <div style={{ fontWeight: "bold" }}>{i18n.t(languageKeys.truong_khoa_duoc)}</div>
          <i>({i18n.t(languageKeys.ky_va_ghi_ro_ho_ten)})</i>
          <div style={{ marginTop: 80, fontWeight: "bold" }}></div>
        </div>

        <div className="signature">
          <i>
            <div className="date-time-footer">
              <>
                {i18n.language === languages.tieng_viet ? (
                  <div style={{ fontSize: 14 }}>
                    Ngày {moment().date()}, tháng {moment().month() + 1}, năm {moment().year()}
                  </div>
                ) : (
                  <div className="date-footer-right">{moment().format("MMMM d, YYYY")}</div>
                )}
              </>
            </div>
            <div>
              <div style={{ fontWeight: "bold" }}>{i18n.t(languageKeys.txt_Thu_truong_don_vi)}</div>
              <i>({i18n.t(languageKeys.ky_va_ghi_ro_ho_ten)})</i>
              <div style={{ marginTop: 80, fontWeight: "bold" }}></div>
            </div>
          </i>
        </div>
      </div>
    </div>
  );
};

export default PhieuNhapKho;
