import { memo } from "react";
import { useSelector } from "react-redux";
import { getImageFromSever, rid, formatNumberToPrice, getFullName, layDiaChi } from "../../../helpers";
import moment from "moment";
import i18n, { languageKeys, languages } from "../../../i18n";

export const styleSoCDHA = `
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

const SoCDHA = ({ data = {} }) => {
  const userProfile = useSelector((state) => state.auth.user);

  const { result, filter, loai_dv } = data;
  console.log("SSSSs", filter)

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

      <div className="title">{'Sổ chẩn đoán hình ảnh'.toUpperCase()}</div>
      <div className="loai">{`Loại dịch vụ : ${loai_dv.TEN_LOAI}`.toUpperCase()}</div>
      <div className="time">Thời gian báo cáo : <span className="time-bold">
        {`Từ ngày ${filter.TU_NGAY} đến ${filter.DEN_NGAY}`}
        </span></div>

      <table style={{ width: "100%" }} className="table">
        <thead>
          <tr>
            <th style={{ width: "28px" }}>{i18n.t(languageKeys.field_Stt)}</th>
            <th>{i18n.t(languageKeys.mau_dm_dich_vu)}</th>
            <th>{i18n.t(languageKeys.field_Ten_dich_vu)}</th>
            <th>{i18n.t(languageKeys.sl)}</th>
            <th>{i18n.t(languageKeys.field_don_gia)}</th>
            <th>{i18n.t(languageKeys.thanh_tien)}</th>
            <th>{i18n.t(languageKeys.ma_bn)}</th>
            <th>{i18n.t(languageKeys.ten_bn)}</th>
            <th>Phòng CĐ</th>
            <th>Thời gian CĐ</th>
            <th>BS trả KQ</th>
            <th>Thời gian KQ</th>
            <th>Phòng TH</th>
            <th>TT</th>
          </tr>
        </thead>
        <tbody>
          {result?.map((item, index) => {
            return (
              <tr key={rid()}>
                <td>{index + 1 >= 10 ? index + 1 : `0${index + 1}`}</td>
                <td>{item.MA_DICHVU}</td>
                <td>{item.TEN_DICHVU}</td>
                <td>{1}</td>
                <td>{formatNumberToPrice(item.GIA_DICH_VU)}</td>
                <td>{formatNumberToPrice(item.GIA_DICH_VU)}</td>
                <td>{item.MA_BENH_NHAN}</td>
                <td>{item.TEN_BENH_NHAN}</td>
                <td>{item.PHONG_CHI_DINH || "Tiếp tân"}</td>
                <td>{item.GIO_CHI_DINH} - {moment(item.NGAY_CHI_DINH, "YYYYMMDD").format("DD/MM/YYYY")}</td>
                <td>{item.BS_TRA_KQ}</td>
                <td>{item.GIO_TRA_KET_QUA} - {moment(item.NGAY_TRA_KET_QUA, "YYYYMMDD").format("DD/MM/YYYY")}</td>
                <td>{item.PHONG_THUC_HIEN}</td>
                <td>{item.THANH_TOAN ? 'Đã TT' : 'Chưa TT'}</td>
                {/* <td style={{ textAlign: "end" }}>{formatNumberToPrice(item.GIA_NHAP)}</td>
                <td style={{ textAlign: "end" }}>{item.SO_LUONG}</td>
                <td style={{ textAlign: "end" }}>{formatNumberToPrice(item.TONG_MIEN_GIAM)}</td>
                <td style={{ textAlign: "end" }}>{formatNumberToPrice(item.THANH_TIEN)}</td> */}
              </tr>
            );
          })}
          <tr>
            <td colSpan={5}>{i18n.t(languageKeys.field_Tong_tien)}</td>
            <td>{formatNumberToPrice(result.reduce((total, item) =>  total += item.GIA_DICH_VU ,0))}</td>
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
            <div>
              <b>{i18n.t(languageKeys.truong_khoa_chan_doan_hinh_anh)}</b>
            </div>
            <i>({i18n.t(languageKeys.ky_va_ghi_ro_ho_ten)})</i>
            <div style={{ marginTop: 80, fontWeight: "bold" }}></div>
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

export default memo(SoCDHA);
