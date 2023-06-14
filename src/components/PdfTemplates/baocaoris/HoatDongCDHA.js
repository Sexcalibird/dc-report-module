import React, { memo } from "react";
import { useSelector } from "react-redux";
import { getImageFromSever, rid, formatNumberToPrice, getFullName, layDiaChi, flattenMessages } from "../../../helpers";
import { Table } from "antd";
import moment from "moment";
import i18n, { languageKeys, languages } from "../../../i18n";
import _ from "lodash";

export const styleHoatDongCDHA = `
#hoat-dong-cdha * { font-size: 1rem; line-height: 1.5em; font-family: "Times New Roman", Times, serif; }
#hoat-dong-cdha .logo { width: 75px; height: 75px; object-fit: contain; }
#hoat-dong-cdha .header { display: flex; gap: 20px; }
#hoat-dong-cdha .hospital-name { text-transform: uppercase; font-weight: bold; }
#hoat-dong-cdha .thong-tin-phieu { display:flex ; }
#hoat-dong-cdha .title { text-transform: uppercase; font-size: 2rem; font-weight: bold; margin-top: 1.5rem;  text-align: center; }
#hoat-dong-cdha .table { margin-block: 1rem; }
#hoat-dong-cdha .table * { font-size: 0.8rem; }
#hoat-dong-cdha .table, .table th, .table td { border: 1px solid black; border-collapse: collapse; margin:0;padding:0 }
#hoat-dong-cdha .table th, .table td { padding: 5px 10px; }
#hoat-dong-cdha .table th { text-align: start; }
@media print {
   #hoat-dong-cdha { break-inside: avoid; }
}
#hoat-dong-cdha .loai { text-transform: uppercase; font-size: 20px; font-weight: bold; margin-top: 5px;  text-align: center;}
#hoat-dong-cdha .time {  font-size: 16px; margin-bottom : 10px;width : 100%;  text-align: center; display:flex,flex-direction: row; justify-content : center}
#hoat-dong-cdha .time-bold {  font-size: 16px; margin-bottom : 10px, font-weight: bold;}
#hoat-dong-cdha .foot-break {  margin-top:16px;}
`;

const HoatDongCDHA = ({ data = {} }) => {
  const userProfile = useSelector((state) => state.auth.user);

  const { dataSource, filter, columns, filterService } = data;
  console.log(dataSource, columns[2].children, "dsamndjasndjkasndjasd");
  const renderHeaderTable = (cols) => {
    return (
      <thead>
        <tr>
          <th style={{ textAlign: "center" }} rowSpan="3">
            STT
          </th>
          <th rowSpan="3">{i18n.t(languageKeys.field_Phong_chi_dinh)}</th>
          <th style={{ textAlign: "center" }} colSpan={+cols[2]?.children?.length * 2}>
            {i18n.t(languageKeys.field_Loai_dich_vu)}
          </th>
        </tr>
        <tr>
          {cols[2]?.children?.map((item, index) => (
            <React.Fragment key={item.key}>
              <th style={{ textAlign: "center" }} colSpan="2">
                {item.title}
              </th>
            </React.Fragment>
          ))}
        </tr>
        <tr>
          {cols[2]?.children.map((item, index) => (
            <React.Fragment key={index}>
              <th style={{ textAlign: "center" }}>{i18n.t(languageKeys.chi_dinh)}</th>
              <th style={{ textAlign: "center" }}>{i18n.t(languageKeys.thuc_hien)}</th>
            </React.Fragment>
          ))}
        </tr>
      </thead>
    );
  };

  return (
    <div id="hoat-dong-cdha">
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

      <div className="title">{i18n.t(languageKeys.thong_ke_hoat_dong_chan_doan_tham_do_chuc_nang).toUpperCase()}</div>
      {/* <div className="loai">{`Loại dịch vụ : ${loai_dv.TEN_LOAI}`.toUpperCase()}</div> */}
      <div className="time">
        Thời gian báo cáo : <span className="time-bold">{`Từ ngày ${filter.TU_NGAY} đến ${filter.DEN_NGAY}`}</span>
      </div>
      <table style={{ width: "100%" }} className="table">
        {renderHeaderTable(columns)}
        <tbody>
          {dataSource?.map((item, index) => {
            return (
              <tr key={rid(7)}>
                <td style={{textAlign:'center'}}>{index + 1 >= 10 ? index + 1 : `0${index + 1}`}</td>
                <td>{item.TEN_PHONG}</td>
                {columns[2]?.children.map((col) => (
                  <React.Fragment key={rid()}>
                    <td style={{textAlign:'center'}}>{item[col.children[0].dataIndex]}</td>
                    <td style={{textAlign:'center'}}>{item[col.children[1].dataIndex]}</td>
                  </React.Fragment>
                ))}
              </tr>
            );
          })}
          <tr>
            <td colSpan={2} style={{textAlign:'right'}}><b>{i18n.t(languageKeys.tong_cong)}</b></td>
            {columns[2].children.map((col, index) => {
              return (
                <React.Fragment key={index}>
                  <td style={{textAlign:'center'}}><b>{+dataSource.reduce((acc,curr) => {
                    return acc + +curr[col.children[0].dataIndex]
                  },0)}</b></td>
                  <td style={{textAlign:'center'}}><b>{+dataSource.reduce((acc,curr) => {
                    return acc + +curr[col.children[1].dataIndex]
                  },0)}</b></td>
                </React.Fragment>
              );
            })}
            {/* <td>{formatNumberToPrice(result.reduce((total, item) =>  total += item.GIA_DICH_VU ,0))}</td> */}
          </tr>
        </tbody>
      </table>

      <div className="foot-break">
        <div style={{ display: "flex", justifyContent: "flex-end" }}>
          {i18n.language === languages.tieng_viet ? (
            <i>
              {moment().format("HH:mm") + ", "}
              {i18n.t(languageKeys.common_ngay)} {moment().date()},{i18n.t(languageKeys.common_thang)} {moment().month() + 1},{" "}
              {i18n.t(languageKeys.common_nam)} {moment().year()}
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

export default memo(HoatDongCDHA);
