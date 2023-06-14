import moment from "moment";
import { memo } from "react";
import { useSelector } from "react-redux";
import { getImageFromSever, getFullName, formatNumberToPrice } from "../../../helpers";
import i18n, { languageKeys, languages } from "../../../i18n";
import _ from "lodash";
import { nanoid } from "@reduxjs/toolkit";
import { getMienGiamTongTien } from "pages/BaoCao/BaoCaoVienPhi/BaoCaoPhieuThuDichVu/TableBaoCaoPhieuThuDv";

export const styleBcPhieuThuDv = `
#doanh-thu * {
    font-size: 1rem;
    line-height: 1.5em;
    font-family: "Times New Roman", Times, serif;
}

#doanh-thu .logo {
    width: 75px;
    height: 75px;
    object-fit: contain;
}

#doanh-thu .header {
    display: flex;
    gap: 20px;
    flex-direction: row;
}

#doanh-thu .row-infomation {
    display: flex;
    flex-direction: row;
    gap: 20px;
    justify-content: space-between;
    width : 100%
}

#doanh-thu .hospital-name {
    text-transform: uppercase;
    font-weight: bold;
}

#doanh-thu .thong-tin-phieu {
    display: flex;
}

#doanh-thu .title {
    text-transform: uppercase;
    font-size:28px;
    font-weight: bold;
    margin-top: 1.5rem;
    text-align: center;
    line-height: 32px;
    margin-top: 20px;
}

#doanh-thu .reporter {
    text-align: center;
    font-size: 16px;
    line-height: 18px;
    font-weight: bold;
}

#doanh-thu .info-row {
  
  justify-content: space-between;
  font-size: 16px;
  line-height: 18px;

  text-align:center;
}

#doanh-thu .info-row span {
  font-weight: bold;
}

#doanh-thu .info-row div {
  text-align: center;
}


#doanh-thu .table {
    margin-block: 1rem;
    width: 100%;
}

#doanh-thu .table * {
    font-size: 0.8rem;
}

#doanh-thu .table,
.table th, 
.table td {
    border: 1px solid black;
    border-collapse: collapse;
    text-align: center;
}

#doanh-thu .table th,
.table td {
    padding: 5px 10px;
    
}

#doanh-thu .table th {
    text-align: center;
}

#doanh-thu .thong-tin-thuoc {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: flex-start;
}
#doanh-thu .left-thong-tin-thuoc {
    width: 70%;
}
#doanh-thu .right-thong-tin-thuoc {
    width: 30%;
}
#doanh-thu .first-thong-tin{
    margin-top: 20px;
}
#doanh-thu .date-time-footer{
    display: flex;
    margin-top: 20px;
    font-size: 14px;
    text-align: center;
}

#doanh-thu .date-footer-right{
  width: 40%;
  text-align: center;
}
#doanh-thu .footer{
    display: flex;
    flex-direction: row;
    justify-content: space-between;

}
#doanh-thu .footer-chu-ky{
    text-align: center;
    font-size: 15px;
    font-weight: 700;
}
#doanh-thu .ky-ten {
    font-style: italic;
    font-size: 14px;
    font-weight: normal;
}

#doanh-thu .flex-wrap{
    display:flex;
    flex-direction:row;
}
#doanh-thu .time-range{
  width : 230px !important;
}

#doanh-thu .align-center { 
  text-align:center;
  margin-bottom: 16px;
}
@media print {
    #doanh-thu .foot-break {
        break-inside: avoid;
    }

`;
const BcPhieuThuDv = ({ data }) => {
  const userProfile = useSelector((state) => state.auth.user);
  const temp_data = useSelector((state) => state.snapShot.temp_data);

  let arr_tien_te =   temp_data.columns.filter(c => c.footerKey === "money").map(c => c.dataIndex);
  let TONG_THANH_TOAN = 0;
  data?.exportData?.forEach(dat => {
    arr_tien_te.forEach(key => {
      TONG_THANH_TOAN += Number(dat[key]);
    })
  })


  

  const getTongTien = (array) => {
    const dataSource = array ? getData(temp_data.columns, array) : [];
    let TONG_TIEN = 0;
    let TONG_TIEN_GIAM = 0;
    let TONG_THANH_TOAN = 0
    for(const item of dataSource) {
      const {totalTongTien, totalMienGiam, totalTT  } = getMienGiamTongTien(item, temp_data.columns);
      TONG_TIEN = TONG_TIEN + totalTongTien;
      TONG_TIEN_GIAM = TONG_TIEN_GIAM + totalMienGiam;
      TONG_THANH_TOAN = TONG_THANH_TOAN + totalTT;
    }
    return { TONG_TIEN ,TONG_TIEN_GIAM,  TONG_THANH_TOAN}
  }

  const getData =  (col, _data) => {
    let obj = {}
    if (col && _data) {
      col.forEach((element, index) => {
        obj[`${element.key}`] = element.key;
      });
      obj.GIO = "GIO"
      const arr = [];
      for(const element of _data) {
        const arrayEntries = Object.entries(element)
        const item = {};
        for(const key of arrayEntries) {
          if (obj[`${key[0]}`]) {
            item[`${key[0]}`] = key[1]
          }
        }
        arr.push(item)
      }
      return arr;
    }
    return []
  }

  const total = {
    TIEN_KB:data?.exportData?.reduce((total, item) => (!!item.TIEN_KB ? (total += Number(item.TIEN_KB)) : total), 0),    
    TIEN_XN:data?.exportData?.reduce((total, item) => (!!item.TIEN_XN ? (total += Number(item.TIEN_XN)) : total), 0), 
    TIEN_CDHA:data?.exportData?.reduce((total, item) => (!!item.TIEN_CDHA ? (total += Number(item.TIEN_CDHA)) : total), 0),
    TIEN_THUOC: data?.exportData?.reduce((total, item) => (!!item.TIEN_THUOC ? (total += Number(item.TIEN_THUOC)) : total), 0),
    TONG_TIEN: getTongTien(data?.exportData).TONG_TIEN,
    TONG_TIEN_GIAM: getTongTien( data?.exportData).TONG_TIEN_GIAM,
    TIEN_HUY:data?.exportData?.reduce((total, item) => (!!item.TIEN_HUY ? (total += Number(item.TIEN_HUY)) : total), 0),
    TIEN_KHAC:data?.exportData?.reduce((total, item) => (!!item.TIEN_KHAC ? (total += Number(item.TIEN_KHAC)) : total), 0),
    TONG_THANH_TOAN : getTongTien(data?.exportData).TONG_THANH_TOAN,
    MIEN_GIAM_KB : data?.exportData?.reduce((total, item) => (!!item.MIEN_GIAM_KB ? (total += Number(item.MIEN_GIAM_KB)) : total), 0),   
    MIEN_GIAM_XN : data?.exportData?.reduce((total, item) => (!!item.MIEN_GIAM_XN ? (total += Number(item.MIEN_GIAM_XN)) : total), 0),   
    MIEN_GIAM_CDHA : data?.exportData?.reduce((total, item) => (!!item.MIEN_GIAM_CDHA ? (total += Number(item.MIEN_GIAM_CDHA)) : total), 0),   
    MIEN_GIAM_KHAC : data?.exportData?.reduce((total, item) => (!!item.MIEN_GIAM_KHAC ? (total += Number(item.MIEN_GIAM_KHAC)) : total), 0),
    
    
    
  }

  const timeRange = !data?.dataRequest?.TU_NGAY
    ? `${moment().format("DD/MM/YYYY")} - ${moment().format("DD/MM/YYYY")}`
    : `${moment(data?.dataRequest?.TU_NGAY, "YYYYMMDD").format("DD/MM/YYYY")} - ${moment(data?.dataRequest?.DEN_NGAY, "YYYYMMDD").format(
        "DD/MM/YYYY"
      )}`;

  // const khoa = !data?.dataRequest?.selectedSpeciality ? i18n.t(languageKeys.tat_ca) : data?.dataRequest?.selectedSpeciality?.TEN_KHOA_PHONG;
  // const phong = !data?.dataRequest?.selectedRoom ? i18n.t(languageKeys.tat_ca) : data?.dataRequest?.selectedRoom?.TEN_KHOA_PHONG;
  // const bac_si =
  //   data?.dataRequest?.selectedDoctors.length === 0
  //     ? i18n.t(languageKeys.tat_ca)
  //     : data?.dataRequest?.selectedDoctors.length === 1
  //     ? getFullName(data?.dataRequest?.selectedDoctors[0])
  //     : `${data?.dataRequest?.selectedDoctors.length} ${i18n.t(languageKeys.bac_si)}`;


  const renderHeader = () => {
    return temp_data.columns.map((col,index) => {
      return <th rowSpan={2}>{col.title}</th>
    })
  }

  const renderCols = (item,col,idP) => {
    const { TIEN_KHAC = 0, TIEN_CDHA = 0, TIEN_XN = 0, TIEN_KB = 0 } = item;
    const totalTongTien = +TIEN_KHAC + +TIEN_CDHA + +TIEN_XN + +TIEN_KB
    const {MIEN_GIAM_KHAC = 0, MIEN_GIAM_CDHA = 0, MIEN_GIAM_XN = 0, MIEN_GIAM_KB = 0} = item;
    const totalMienGiam = +MIEN_GIAM_KHAC + +MIEN_GIAM_CDHA + +MIEN_GIAM_XN + +MIEN_GIAM_KB
    if(col.key === "TONG_THANH_TOAN") {
      let arr_tien_te = temp_data.columns.filter(column => column.footerKey === 'money');
      let sum = 0;
      arr_tien_te.forEach(column => {
        sum = sum + Number(item[column.dataIndex])
      })
      return formatNumberToPrice(totalTongTien - totalMienGiam)

    }

    if(col.key === "TONG_TIEN") {
      return formatNumberToPrice(totalTongTien)
    }

    if(col.key === "TONG_MIEN_GIAM") {
      return formatNumberToPrice(totalMienGiam)
    }
    if(_.isNumber(item[col.key])) return <>{formatNumberToPrice(item[col.key])}</>
    if(col.key === "STT") return idP + 1;
    if(col.key === "NGAY") return item.GIO + " - " + moment(item.NGAY, "YYYYMMDD").format("DD/MM/YYYY");

    return item[col.key]
  }

  const renderFooterTable = () => {
    let { columns } = temp_data;

    let footerTongCong;
    let footerTienTe;
    if(Array.isArray(columns)) {
      footerTongCong = (
      <td colSpan={columns.filter(c => c.footerKey === "text").length} style={{ fontWeight: 700, textAlign: "right" }} key={nanoid()}>
        {i18n.t(languageKeys.cong_khoan)}:{" "}
      </td>);

      footerTienTe = columns.filter(c => c.footerKey !== "text").map((col,index) => {
        return (
          <td style={{ textAlign: "end",fontWeight:"bold" }} key={nanoid()}>{ Object.keys(total).includes(col.key) ? formatNumberToPrice(total[col.key]) : ""}</td>
        )
      })
    }
    
    return <>{footerTongCong}{footerTienTe}</>
  }

  return (
    <div id="doanh-thu">
      <div className="header">
        {userProfile.benh_vien.ANH_DAI_DIEN && <img className="logo" alt="" src={getImageFromSever(userProfile.benh_vien.ANH_DAI_DIEN)} />}
        <div>
          <div className="hospital-name">{userProfile.benh_vien.TEN_CSKCB}</div>
          <div>
            {i18n.t(languageKeys.dia_chi)}: {layDiaChi(userProfile.benh_vien)}
          </div>
          <div className="row-infomation">
            <div>
              {i18n.t(languageKeys.field_So_dien_thoai)}: {userProfile.benh_vien.SO_DIEN_THOAI || ""}
            </div>
          </div>
        </div>
      </div>

      <div className="title">{i18n.t(languageKeys.bao_cao_phieu_thu_dich_vu)}</div>
      <div>
        <div className="reporter">
          {i18n.t(languageKeys.nguoi_lap_bao_cao)}: {getFullName(userProfile)}
        </div>
        <div className="align-center">
          <span>{i18n.t(languageKeys.field_thoi_gian)}</span>:{" "}
          <b><span>{timeRange}</span></b>
        </div>
      </div>

      <table className="table">
        <thead>
          {!temp_data.columns.find(i => i.footerKey === 'text') && <td key={nanoid(4)}></td>}
          {renderHeader()}
        </thead>

        {getData(temp_data.columns, data?.exportData).map((item, indexParent) => (
          <tr>
            {!temp_data.columns.find(i => i.footerKey === 'text') && <td key={nanoid(4)}></td>}
            {temp_data.columns.map((col,index) => {

              return (
                <td key={index} style={{ textAlign: _.isNumber(item[col.key]) ? 'end':"start" }}>
                  {renderCols(item,col,indexParent)}
                </td>
              )})}
          </tr>
        ))}
        <tr>
          {renderFooterTable()}
        </tr>
      </table>
      <div style={{ display: "flex", justifyContent: "flex-end" }}>
        <div className="date-time-footer">
          <>
            {i18n.language === languages.tieng_viet ? (
              <>
                Ngày {moment().date()}, tháng {moment().month() + 1}, năm {moment().year()}
              </>
            ) : (
              <div className="date-footer-right">{moment().format("MMMM d, YYYY")}</div>
            )}
          </>
        </div>
      </div>
      <div className="footer">
        <div className="footer-chu-ky">
          {i18n.t(languageKeys.nguoi_lap_bao_cao).toUpperCase()}
          <div className="ky-ten">({i18n.t(languageKeys.ky_ten_va_dong_dau)})</div>
          {/* <div style={{ marginTop: 80, fontWeight: "bold" }}>{getFullName(userProfile)}</div> */}
        </div>
        <div className="footer-chu-ky">
          {i18n.t(languageKeys.truong_phong_tckt).toUpperCase()}
          <div className="ky-ten">({i18n.t(languageKeys.ky_ten_va_dong_dau)})</div>
        </div>
      </div>
    </div>
  );
};
export default memo(BcPhieuThuDv);

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
