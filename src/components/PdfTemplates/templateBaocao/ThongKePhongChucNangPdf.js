import moment from "moment";
import { memo } from "react";
import { useSelector } from "react-redux";
import { formatNumberToPrice, getFullName, getImageFromSever, rid } from "../../../helpers";
import i18n, { languageKeys, languages } from "../../../i18n";

export const stylePhongChucNangPdf = `
#phong-cn * {
    font-size: 1rem;
    line-height: 1.5em;
    font-family: "Times New Roman", Times, serif;
}

#phong-cn .logo {
    width: 75px;
    height: 75px;
    object-fit: contain;
}

#phong-cn .header {
    display: flex;
    flex-direction: row;
}

#phong-cn .header-left {
    display: flex;
    width: 60%;
    gap: 20px;
    flex-direction: row;
}

#phong-cn .header-right {
    width: 40%;
    text-align: center;
}

#phong-cn .header-department {
    text-transform: uppercase;
    font-weight: bold;
}

#phong-cn .header-date {
    font-style: italic;
}

#phong-cn .hospital-name {
    text-transform: uppercase;
    font-weight: bold;
}


#phong-cn .title {
    text-transform: uppercase;
    font-size: 28px;
    font-weight: bold;
    margin-top: 1.5rem;
    margin-bottom: 1rem;
    text-align: center;
    line-height: 32px;
    margin-top: 20px;
}

#phong-cn .date-time {
    text-align: center;
    font-size: 16px;
    line-height: 18px;
    font-weight: 400;
    font-weight: 400;
    font-style: italic;
}

#phong-cn .report {
    text-align: center;
    font-size: 16px;
    line-height: 18px;
    font-weight: bold;
    font-style: italic;
}

#phong-cn .table {
    margin-block: 1rem;
    width: 100%;
}

#phong-cn .table * {
    font-size: 0.8rem;
}

#phong-cn .table,
.table th, 
.table td {
    border: 1px solid black;
    border-collapse: collapse;
}

#phong-cn .table th,
.table td {
    padding: 5px 10px;
}

#phong-cn .date-time-footer{
    margin-top: 20px;
    display: flex;
    font-size: 14px;
    text-align: center;
}
#phong-cn .footer{
    display: flex;
    flex-direction: row;
    justify-content: space-between;

}
#phong-cn .footer-chu-ky{
    text-align: center;
    font-size: 15px;
    font-weight: 700;
}
#phong-cn .ky-ten {
    font-style: italic;
    font-size: 14px;
    font-weight: normal;
}

@media print {
    #phong-cn .foot-break {
        break-inside: avoid;
    }

`;
const ThongKePhongChucNang = ({ data }) => {
  const userProfile = useSelector((state) => state.auth.user);

  const timeRange = !data?.dataRequest?.TU_NGAY
    ? `${moment().format("DD/MM/YYYY")} ${i18n.t(languageKeys.field_Den)} ${moment().format("DD/MM/YYYY")}`
    : `${moment(data?.dataRequest?.TU_NGAY, "YYYYMMDD").format("DD/MM/YYYY")} ${i18n.t(languageKeys.field_Den)} ${moment(
        data?.dataRequest?.DEN_NGAY,
        "YYYYMMDD"
      ).format("DD/MM/YYYY")}`;

  const room =
    data?.dataRequest?.selectedRooms.length === 0
      ? i18n.t(languageKeys.tat_ca)
      : data?.dataRequest?.selectedRooms.length === 1
      ? data?.dataRequest?.selectedRooms[0]?.TEN_KHOA_PHONG
      : `${data?.dataRequest?.selectedRooms.length} ${i18n.t(languageKeys.phong)}`;
  const trang_thai =
    data?.dataRequest?.selectedStatus === "DA_THUC_HIEN"
      ? i18n.t(languageKeys.bc_da_thuc_hien)
      : data?.dataRequest?.selectedStatus === "CHO_THUC_HIEN"
      ? i18n.t(languageKeys.chua_thuc_hien)
      : i18n.t(languageKeys.tat_ca);
  return (
    <div id="phong-cn">
      <div className="header">
        <div className="header-left">
          {userProfile.benh_vien.ANH_DAI_DIEN && <img className="logo" alt="" src={getImageFromSever(userProfile.benh_vien.ANH_DAI_DIEN)} />}
          <div>
            <div className="hospital-name">{userProfile.benh_vien.TEN_CSKCB}</div>
            <div>
              {i18n.t(languageKeys.dia_chi)} : {layDiaChi(userProfile.benh_vien)}
            </div>
            <div>
              {i18n.t(languageKeys.field_So_dien_thoai)}: {!!userProfile.benh_vien.SO_DIEN_THOAI ? userProfile.benh_vien.SO_DIEN_THOAI : ""}
            </div>
          </div>
        </div>

        <div className="header-right">
          <div className="header-department">{i18n.t(languageKeys.txt_phong_tai_chinh_ke_toan)}</div>
          <div className="header-date">
            {i18n.language === languages.tieng_viet ? (
              <>
                Ngày {moment().date()}, tháng {moment().month() + 1}, năm {moment().year()}
              </>
            ) : (
              <div style={{ marginLeft: "-50%" }}>{moment().format("MMMM d, YYYY")}</div>
            )}
          </div>
        </div>
      </div>

      <div className="title">{i18n.t(languageKeys.thong_ke_phong_chuc_nang)}</div>
      <div className="date-time">
        {i18n.t(languageKeys.field_Tu)} {timeRange} - {i18n.t(languageKeys.trang_thai)}: {trang_thai} - {i18n.t(languageKeys.phong)}: {room}
      </div>
      <div className="report">
        {i18n.t(languageKeys.nguoi_lap_bao_cao)}: {getFullName(userProfile)}
      </div>

      <table className="table">
        <thead>
          <th>{i18n.t(languageKeys.stt)}</th>
          <th>{i18n.t(languageKeys.field_Ten_dich_vu)}</th>
          <th>{i18n.t(languageKeys.field_So_luong)}</th>
          <th>{i18n.t(languageKeys.field_don_gia)}</th>
          <th>{i18n.t(languageKeys.vien_phi_thanh_tien)}</th>
        </thead>

        <tbody>
          {data?.exportData?.map((item) => (
            <>
              <tr key={rid()}>
                <th colSpan={2} style={{ borderRight: "none", textAlign: "start" }}>
                  {item.TEN_KHOA_PHONG}
                </th>
                <th colSpan={1} style={{ textAlign: "center", borderWidth: "1px 0px" }}>
                  {formatNumberToPrice(item.SO_LUONG)}
                </th>
                <th style={{ borderWidth: "1px 0px" }}></th>
                <th colSpan={1} style={{ textAlign: "end", borderWidth: "1px 0px" }}>
                  {formatNumberToPrice(item.THANH_TIEN)}
                </th>
              </tr>

              {!!item.children &&
                item.children.length > 0 &&
                item.children.map((child) => (
                  <tr key={rid()}>
                    <td style={{ textAlign: "center" }}>{child.STT}</td>
                    <td>{child.TEN_DICHVU}</td>
                    <td style={{ textAlign: "center" }}>{formatNumberToPrice(child.SO_LUONG)}</td>
                    <td style={{ textAlign: "end" }}>{formatNumberToPrice(child.DON_GIA)}</td>
                    <td style={{ textAlign: "end" }}>{formatNumberToPrice(child.THANH_TIEN)}</td>
                  </tr>
                ))}
            </>
          ))}
        </tbody>
      </table>

      <div className="footer">
        <div>
          <div className="footer-chu-ky">
            {i18n.t(languageKeys.nguoi_lap_bao_cao)}
            <div className="ky-ten">({i18n.t(languageKeys.ky_ten_va_dong_dau)})</div>
          </div>
        </div>
        <div>
          <div className="date-time-footer">
            {i18n.language === languages.tieng_viet ? (
              <>
                Ngày {moment().date()}, tháng {moment().month() + 1}, năm {moment().year()}
              </>
            ) : (
              <div style={{ marginRight: "8%" }}>{moment().format("MMMM d, YYYY")}</div>
            )}
          </div>
          <div className="footer-chu-ky">
            {i18n.t(languageKeys.truong_phong_tckt)}
            <div className="ky-ten">({i18n.t(languageKeys.ky_ten_va_dong_dau)})</div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default memo(ThongKePhongChucNang);

const layDiaChi = (benh_vien) => {
  let string = "";
  if (benh_vien.DIA_CHI_CHI_TIET) {
    string = benh_vien.DIA_CHI_CHI_TIET;
  }
  if (benh_vien.TEN_PHUONG_XA) {
    string = string + `, ${benh_vien.TEN_PHUONG_XA}`;
  }
  if (benh_vien.TEN_QUAN_HUYEN) {
    string = string + `, ${benh_vien.TEN_QUAN_HUYEN}`;
  }
  if (benh_vien.TEN_TINH_THANH) {
    string = string + `, ${benh_vien.TEN_TINH_THANH}`;
  }
  return string;
};
