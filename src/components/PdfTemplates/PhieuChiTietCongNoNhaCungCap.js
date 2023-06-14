import JsBarcode from "jsbarcode";
import moment from "moment";
import { nanoid } from "nanoid";
import React, { useEffect } from "react";
import { getImageFromSever, getFullName, formatCurrency, convertDateToValue, layDiaChi } from "../../helpers";
import { useSelector } from "react-redux";
import i18n, { languageKeys } from "../../i18n";

export const stylePhieuChiTietCongNoNhaCungCap = `
#phieu-chi-tiet-cong-no-nha-cung-cap * { font-size: 1rem; line-height: 1.5em; font-family: "Times New Roman", Times, serif; }
#phieu-chi-tiet-cong-no-nha-cung-cap .logo { width: 75px; height: 75px; object-fit: contain; }
#phieu-chi-tiet-cong-no-nha-cung-cap .header { display: flex; gap: 20px; }
#phieu-chi-tiet-cong-no-nha-cung-cap .hospital-name { text-transform: uppercase; font-weight: bold; }
#phieu-chi-tiet-cong-no-nha-cung-cap .main-title { text-transform: uppercase; font-size: 2.5rem; font-weight: bold; margin-top: 1rem; margin-bottom: 0.5rem; }
#phieu-chi-tiet-cong-no-nha-cung-cap .table { margin-bottom: 1rem; margin-top: 1rem; }
#phieu-chi-tiet-cong-no-nha-cung-cap .table * { line-height: 1.2em; }
#phieu-chi-tiet-cong-no-nha-cung-cap .table, .table th, .table td { border: 1px solid black; border-collapse: collapse; }
#phieu-chi-tiet-cong-no-nha-cung-cap .table th, .table td { padding: 5px; }
#phieu-chi-tiet-cong-no-nha-cung-cap .table th { text-align: center; font-weight: bold }
#phieu-chi-tiet-cong-no-nha-cung-cap .title { margin-block: 0.5rem; font-size: 1.2rem; font-weight: bold; }
@media print {
#phieu-chi-tiet-cong-no-nha-cung-cap .foot-break { break-inside: avoid; }
}
`;

const PhieuChiTietCongNoNhaCungCap = ({
  data = { BAO_CAO: {}, BENH_VIEN: {}, TU_NGAY: "", DEN_NGAY: "" },

  rid = "",
}) => {
  console.log("DÂDA", data);
  const userProfile = useSelector((state) => state.auth.user);

  return (
    <div id="phieu-chi-tiet-cong-no-nha-cung-cap">
      <div className="header">
        {data.BENH_VIEN.ANH_DAI_DIEN && <img src={getImageFromSever(data.BENH_VIEN.ANH_DAI_DIEN)} alt="" className="logo" />}

        <div>
          <div className="hospital-name">{data.BENH_VIEN.TEN_CSKCB}</div>
          <div>{i18n.t(languageKeys.dia_chi)}: {layDiaChi(data.BENH_VIEN)}</div>
          <div>{i18n.t(languageKeys.dien_thoai)}: {data.BENH_VIEN.SO_DIEN_THOAI || ""}</div>
        </div>
      </div>

      <div style={{ textAlign: "center", marginBottom: "1rem" }}>
        <div className="main-title">{i18n.t(languageKeys.title_Chi_tiet_cong_no_ncc)}</div>
      </div>
      <div style={{ textAlign: "center", marginBottom: "1rem" }}>
        <div >{`${i18n.t(languageKeys.common_ngay)} : ${data.TU_NGAY} - ${data.DEN_NGAY}`}</div>
      </div>

      <div>
        <b>{i18n.t(languageKeys.thong_tin_bo_loc)}</b>
      </div>

      <div style={{ display: "flex", justifyContent: "space-between" }}>
        <div>
          <div>
            {i18n.t(languageKeys.ten_nha_cung_cap)}: <b>{data.BAO_CAO.ncc_data.TEN_NCC}</b>
          </div>
          <div>
          {i18n.t(languageKeys.ma_nha_cung_cap)}: <b>{data.BAO_CAO.ncc_data.MA_NCC}</b>
          </div>
          <div>{i18n.t(languageKeys.dien_thoai)}: {data.BAO_CAO.ncc_data.SO_DIEN_THOAI || ""}</div>
        </div>
        {/* <div>Ngày: 01/01/2000 - 01/01/2001</div> */}
        <div style={{ display: "flex", gap: "50px" }}>
          <div>
            <div>{i18n.t(languageKeys.no_dau_ky)}</div>
            <div>{i18n.t(languageKeys.phat_sinh_trong_ky)}:</div>
            <div>{i18n.t(languageKeys.no_cuoi_ky)}</div>
          </div>
          <div
            style={{
              textAlign: "right",
            }}
          >
            <div>{formatCurrency(data.BAO_CAO.no_dau_ky, "", true)}</div>
            <div>{formatCurrency(data.BAO_CAO.TONG_GHI_NO, "", true)}</div>
            <div>{formatCurrency(data.BAO_CAO.no_cuoi_ky, "", true)}</div>
          </div>
          <div
            style={{
              textAlign: "right",
            }}
          >
            <br></br>
            <div>{formatCurrency(data.BAO_CAO.TONG_GHI_CO, "", true)}</div>
            <br></br>
          </div>
        </div>
      </div>

      <table style={{ width: "100%" }} className="table">
        <thead>
          <tr>
            <th>{i18n.t(languageKeys.thoi_gian)}</th>
            <th>{i18n.t(languageKeys.field_Ma_phieu)}</th>
            <th>{i18n.t(languageKeys.loai_phieu)}</th>
            <th>{i18n.t(languageKeys.tong_hoa_don)}</th>
            <th>{i18n.t(languageKeys.mien_giam_hoa_don)}</th>
            <th>{i18n.t(languageKeys.txt_can_tra_ncc)}</th>
            <th>{i18n.t(languageKeys.txt_thuc_tra)}</th>
            <th>{i18n.t(languageKeys.txt_ghi_no)}</th>
            <th>{i18n.t(languageKeys.txt_ghi_co)}</th>
          </tr>
        </thead>
        <tbody>
          {data.BAO_CAO.cong_no_data.map((item, index) => (
            <tr key={index}>
              <td>
                <b>{convertDateToValue(item.NGAY)}</b>
              </td>
              <td>
                <b>{item.MA_PHIEU}</b>
              </td>
              <td>
                <b>{getTitle(item.LOAI_PHIEU, item.PHAN_LOAI)}</b>
              </td>
              <td>
                <b>{formatCurrency(item.TONG_CHI_PHI, "", true)}</b>
              </td>
              <td>
                <b>{formatCurrency(item.TONG_MIEN_GIAM, "", true)}</b>
              </td>
              <td>
                <b>{formatCurrency(item.CAN_TRA, "", true)}</b>
              </td>
              <td>
                <b>{formatCurrency(item.THUC_TRA, "", true)}</b>
              </td>
              <td>
                <b>{item.GHI_NO !== "" ? formatCurrency(Number(item.GHI_NO), "", true) : ""}</b>
              </td>
              <td>
                <b>{item.GHI_CO !== "" ? formatCurrency(Number(item.GHI_CO), "", true) : ""}</b>
              </td>
            </tr>
          ))}

          <tr>
            <td colSpan={7}>
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                }}
              >
                <div>
                  {i18n.t(languageKeys.cong_khoan)}:
                  <span style={{ fontWeight: "bold" }}>{data.BAO_CAO.CONG_KHOAN}</span>
                </div>
                <div>{i18n.t(languageKeys.common_Tong)}: </div>
              </div>
            </td>
            <td>
              <span style={{ fontWeight: "bold" }}>{formatCurrency(Number(data.BAO_CAO.TONG_GHI_NO), "", true)}</span>
            </td>
            <td>
              <span style={{ fontWeight: "bold" }}>{formatCurrency(Number(data.BAO_CAO.TONG_GHI_CO), "", true)}</span>
            </td>
          </tr>
        </tbody>
      </table>

      <div
        className="foot-break"
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignContent: "center",
        }}
      >
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            textAlign: "center",
            justifyContent: "flex-end",
          }}
        >
          <div style={{ fontWeight: "bold" }}>{i18n.t(languageKeys.nha_cung_cap)}</div>
          <i>({i18n.t(languageKeys.ky_va_ghi_ro_ho_ten)})</i>
          <div style={{ marginTop: 102, fontWeight: "bold" }}>{`       `}</div>
        </div>

        <div
          style={{
            display: "flex",
            flexDirection: "column",
            textAlign: "center",
            justifyContent: "flex-end",
          }}
        >
          <div style={{ fontWeight: "bold" }}>
            {i18n.t(languageKeys.txt_nguoi_tao_phieu)}
          </div>
          <i>({i18n.t(languageKeys.ky_va_ghi_ro_ho_ten)})</i>
          <div style={{ marginTop: 80, fontWeight: "bold" }}>
            {getFullName(userProfile)}
          </div>
        </div>

        <div>
          <i>
          {moment().format("HH:mm") +
              ", " +
              ` ${i18n.t(languageKeys.common_ngay)} ` +
              moment().format("DD") +
              ` ${i18n.t(languageKeys.common_thang)} ` +
              moment().format("MM") +
              ` ${i18n.t(languageKeys.common_nam)} ` +
              +moment().format("YYYY")}
          </i>
          <div style={{ textAlign: "center" }}>
            <div style={{ fontWeight: "bold" }}>{i18n.t(languageKeys.txt_tm_cong_ty)}</div>
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

const getTitle = (key, type) => {
  switch (key) {
    case "PHIEU_XUAT":
      if (type === "XUAT_BAN") {
        return i18n.t(languageKeys.xuat_ban_dau_sac);
      }
      if (type === "XUAT_HUY") {
        return i18n.t(languageKeys.phan_loai_xuat_huy);
      }
      if (type === "XUAT_TRA_NCC") {
        return i18n.t(languageKeys.phan_loai_xuat_tra_ncc);
      }
      break;
    case "PHIEU_DIEU_CHINH":
      return i18n.t(languageKeys.loai_phieu_dieu_chinh);
    case "PHIEU_NHAP":
      return i18n.t(languageKeys.phieu_nhap);
    case "PHIEU_THANH_TOAN":
      return i18n.t(languageKeys.loai_phieu_thanh_toan);
    default:
      return "";
  }
};
export default PhieuChiTietCongNoNhaCungCap;
