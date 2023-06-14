import { memo } from "react";
import { useSelector } from "react-redux";
import { getImageFromSever, rid, formatNumberToPrice, getFullName, layDiaChi } from "../../../helpers";
import moment from "moment";
import i18n, { languageKeys, languages } from "../../../i18n";

export const styleChiTietSoHoaDon = `
#phieu-xuat-tra * { font-size: 1rem; line-height: 1.5em; font-family: "Times New Roman", Times, serif; }
#phieu-xuat-tra .logo { width: 75px; height: 75px; object-fit: contain; }
#phieu-xuat-tra .header { display: flex; gap: 20px; }
#phieu-xuat-tra .hospital-name { text-transform: uppercase; font-weight: bold; }
#phieu-xuat-tra .thong-tin-phieu { display:flex ; }
#phieu-xuat-tra .title { text-transform: uppercase; font-size: 2rem; font-weight: bold; margin-top: 1.5rem;  text-align: center; }
#phieu-xuat-tra .table { margin-block: 1rem; }
#phieu-xuat-tra .table * { font-size: 0.8rem; }
#phieu-xuat-tra .table, .table th, .table td { border: 1px solid black; border-collapse: collapse; }
#phieu-xuat-tra .table th, .table td { padding: 5px 10px; }
#phieu-xuat-tra .table th { text-align: start; }
@media print {
   #phieu-xuat-tra { break-inside: avoid; }
}
#phieu-xuat-tra .loai { text-transform: uppercase; font-size: 20px; font-weight: bold; margin-top: 5px;  text-align: center;}
#phieu-xuat-tra .time {  font-size: 16px; margin-bottom : 10px;width : 100%;  text-align: center; display:flex,flex-direction: row; justify-content : center}
#phieu-xuat-tra .time-bold {  font-size: 16px; margin-bottom : 10px, font-weight: bold;}
`;

const ChiTietSoHoaDon = ( dataExport ) => {
  const userProfile = useSelector((state) => state.auth.user);

  const { data, from, to, ten_so, loai_so } = dataExport.data;
  const tong_chi_phi = data?.reduce((total, item) => (!!item.TONG_CHI_PHI ? (total += Number(item.TONG_CHI_PHI)) : total), 0);
  const mien_giam = data?.reduce((total, item) => (!!item.MIEN_GIAM ? (total += Number(item.MIEN_GIAM)) : total), 0);
  const tong_thanh_toan = data?.reduce((total, item) => (!!item.TONG_THANH_TOAN ? (total += Number(item.TONG_THANH_TOAN)) : total), 0);
  return (
    <div id="phieu-xuat-tra">
      <div className="header">
        {userProfile.benh_vien.ANH_DAI_DIEN && <img src={getImageFromSever(userProfile.benh_vien.ANH_DAI_DIEN)} alt="" className="logo" />}

        <div>
          <div className="hospital-name">{userProfile.benh_vien.TEN_CSKCB}</div>
          <div>
            {i18n.t(languageKeys.dia_chi)}: {`${layDiaChi(userProfile.benh_vien)}`}
          </div>
          <div>
            {i18n.t(languageKeys.dien_thoai)}: {userProfile.benh_vien.SO_DIEN_THOAI || ""}
          </div>
        </div>
      </div>

      {/* <div className="title">{'Sổ chẩn đoán hình ảnh'.toUpperCase()}</div> */}
      <div className="loai">{`${i18n.t(languageKeys.field_Ten_so)}: ${ten_so}`.toUpperCase()}</div>
      <div className="time">Thời gian: <span className="time-bold">
        {`Từ ngày ${from} đến ${to}`}
        </span></div>

      <table style={{ width: "100%" }} className="table">
        <thead>
          <tr>
            <th style={{ width: "28px" }}>{i18n.t(languageKeys.field_Stt)}</th>
            <th>{i18n.t(languageKeys.field_So_phieu)}</th>
            <th>{i18n.t(languageKeys.ten_bn)}</th>
            <th>{i18n.t(languageKeys.field_Ngay_tao)}</th>
            <th>{i18n.t(languageKeys.nguoi_tao)}</th>
            <th>{i18n.t(languageKeys.field_Tong_chi_phi)}</th>
            <th>{i18n.t(languageKeys.field_Mien_giam)}</th>
            <th>{i18n.t(languageKeys.tong_thanh_toan)}</th>
            <th>{i18n.t(languageKeys.field_phan_loai)}</th>
            {loai_so !== "SO_HOAN_TIEN" && <>
            <th>{i18n.t(languageKeys.field_hinh_thuc_thanh_toan)}</th>
            <th>{i18n.t(languageKeys.field_Ly_do_mien_giam)}</th>
            <th>{i18n.t(languageKeys.field_Ghi_chu)}</th>
            </>}
          </tr>
        </thead>
        <tbody>
          {data?.map((item, index) => {
            return (
              <tr key={rid()}>
                <td>{index + 1 >= 10 ? index + 1 : `0${index + 1}`}</td>
                <td>{item.SO_PHIEU}</td>
                <td>{item.TEN}</td>
                <td>{moment(item.NGAY,"YYYYMMDD").format("DD/MM/YYYY")}</td>
                <td>{item.NGUOI_TAO}</td>
                <td>{formatNumberToPrice(item.TONG_CHI_PHI)}</td>
                <td>{formatNumberToPrice(item.MIEN_GIAM)}</td>
                <td>{formatNumberToPrice(item.TONG_THANH_TOAN)}</td>
                <td>{item.NHOM === "THANH_TOAN" ? i18n.t(languageKeys.txt_thanh_toan) : i18n.t(languageKeys.field_hoan_tien)}</td>
                {loai_so !== "SO_HOAN_TIEN" && <>
                <td>{item.TEN_HINH_THUC_THANH_TOAN}</td>
                <td>{item.LY_DO_MIEN_GIAM}</td>
                <td>{item.GHI_CHU} </td>
                </>}
               
              </tr>
            );
          })}
          <tr>
            <td colSpan={5}>{i18n.t(languageKeys.cong_khoan)}</td>
            <td>{formatNumberToPrice(tong_chi_phi)}</td>
            <td>{formatNumberToPrice(mien_giam)}</td>
            <td>{formatNumberToPrice(tong_thanh_toan)}</td>
            <td></td>
            {loai_so !== "SO_HOAN_TIEN" && <>
            <td></td>
            <td></td>
            <td></td>
            </>}
          </tr>
        </tbody>
      </table>

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
              <b>{i18n.t(languageKeys.nguoi_lap_bang)}</b>
            </div>
            <i>({i18n.t(languageKeys.ky_va_ghi_ro_ho_ten)})</i>
            <div style={{ marginTop: 80, fontWeight: "bold" }}></div>
          </div>

          <div style={{ textAlign: "center", marginLeft: 40 }}>
            {/* <div>
              <b>{i18n.t(languageKeys.truong_khoa_chan_doan_hinh_anh)}</b>
            </div>
            <i>({i18n.t(languageKeys.ky_va_ghi_ro_ho_ten)})</i>
            <div style={{ marginTop: 80, fontWeight: "bold" }}></div> */}
          </div>

          <div style={{ textAlign: "center", marginRight: 40 }}>
            <div>
              <b>{i18n.t(languageKeys.txt_ke_toan)}</b>
            </div>
            <i>({i18n.t(languageKeys.ky_va_ghi_ro_ho_ten)})</i>
            <div style={{ marginTop: 80, fontWeight: "bold" }}>{getFullName(userProfile)}</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default memo(ChiTietSoHoaDon);
