// import JsBarcode from "jsbarcode";
// import moment from "moment";
// import React from "react";

// import i18n, { languageKeys, languages } from "../../../../i18n";
// import { convertListName, formatPhoneNumber, getFullDiaChi } from "../../../../utils";
import JsBarcode from "jsbarcode";
import moment from "moment";
import React, { memo } from "react";
import { getImageFromSever, getFullName, formatNumberToPrice, getFullDiaChi, getSexFromString } from "../../../helpers";
import i18n, { languageKeys, languages } from "../../../i18n";
import * as _ from "lodash";

export const stylePhieuTraKqXn = `
#phieu-xn * {
  font-size: 12px;
  line-height: 1.5em;
  font-family: "Times New Roman", Times, serif;
}
#phieu-xn .logo {
  width: 75px;
  height: 75px;
  object-fit: contain;
}
#phieu-xn .header {
  display: flex;
  position: relative;
  gap: 20px;
}
#phieu-xn .flex {
  display: flex;
  width:100%;
}
#phieu-xn .flex.justify {
  justify-content: space-around;
}

#phieu-xn .tel {
  margin-right: 50px;
}
#phieu-xn .txt-700 {
  font-weight: 700;
}
#phieu-xn .container-title {
  font-weight: 700;
  font-size: 16px;
  line-height: 18px;
  text-align: center;
  text-transform: uppercase;
  margin-top: 1.5rem;
  margin-bottom: 1rem;
}
#phieu-xn .container__title--main {
  font-weight: 700;
  font-size: 15px;
  line-height: 14px;
}
#phieu-xn .container__ttbn--wrapper div {
  margin: 4px 0 0 0;
}
#phieu-xn .container-wrapper-flex {
  display: flex;
  flex-direction: row;
  width: 100%;
}

#phieu-xn .container-wrapper-flex .col-3 {
  width: 30%;
}

#phieu-xn .container-wrapper-flex .col-4 {
  width: 40%;
}

#phieu-xn .thongtin-khambenh {
  width: 100%;
  display: flex;
  margin-top: 12px;
}

#phieu-xn .thongtin-khambenh .left {
  width: 65%;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
}

#phieu-xn .flex .flex-35 {
  width: 35%;
}
#phieu-xn .flex .flex-40 {
  width: 40%;
}
#phieu-xn .flex .flex-50 {
  width: 50%;
}
#phieu-xn .table {
  margin-block: 1rem;
  width: 100%;
  border-collapse: collapse;
}

#phieu-xn .table * {
  font-size: 0.8rem;
}

#phieu-xn .table,
.table th,
.table td {
  border: 1px solid black;
}

#phieu-xn .table th,
.table td {
  padding: 5px 10px;
}

#phieu-xn hr.solid {
  border-top: 1px solid #000;
}

#phieu-xn .footer {
  display: flex;
  width: 100%;
  justify-content: space-between;
  margin-top: -10px;
}

#phieu-xn .footer .footer-confirm {
  margin-right: 44px;
  text-align: center;
}

#phieu-xn .name-space {
  height: 50px;
}

#phieu-xn .upperTxt {
  text-transform: uppercase;
}
#phieu-xn .txt-size-m {
  font-size: 14px;
}

#phieu-xn .footer .signature {
  width: 100px;
  height: 20px;
}

#phieu-xn .barcode {
  position: absolute;
  right: 12px;
  top: 35px;
  
  width: fit-content;
  height:60px;
}

#phieu-xn .list {
  margin:0;
  padding:0 0 0 12px;
  list-style-type:none;
}

@media print {
  #phieu-xn .foot-break {
    break-inside: avoid;
  }
}
`;

const PhieuTraKqXn = ({ data }) => {
  // const { benh_vien } = userProfile;
  const { BENH_VIEN: benh_vien, data: arrXn, BENH_PHAM: benh_pham } = data;
  React.useEffect(() => {
    if (!!benh_pham.BARCODE_QUAN_LY) {
      JsBarcode(`#barcode`)
        .options({ font: "OCR-B" })
        .CODE128(benh_pham.BARCODE_QUAN_LY, {
          fontSize: 13,
          width: 1.3,
          height: 60,
          textMargin: 0,
        })
        .render();
    }
  }, [benh_pham?.BARCODE_QUAN_LY]);


  const onCheckEdge = (result, edge = []) => {
    let align = "center";

    result = Number(result);

    if (isNaN(Number(result)) || isNaN(edge[0]) || isNaN(edge[1])) return align;

    if (result < edge[0]) {
      align = "left";
    } else if (result >= edge[0] && result < edge[1]) {
      align = "center";
    } else if (result > edge[1]) {
      align = "right";
    }
    return align;
  };

  return (
    <div id="phieu-xn">
      <div className="header">
        {/* {benh_vien?.ANH_DAI_DIEN && (
          <div className="logo">
            <img src={benh_vien?.ANH_DAI_DIEN} alt="" />
          </div>
        )} */}
       
        <div>
          <div className="container__title--main upperTxt" style={{ marginBottom: 4 }}>
            {benh_vien.TEN_CSKCB}
          </div>
          <div className="dia-chi">
            <span className="txt-700">{i18n.t(languageKeys.dia_chi)}:</span> <span>{getFullDiaChi(benh_vien)}</span>
          </div>
          <div className="flex">
            <div style={{ marginRight: 30 }}>
              <div>
                <span className="txt-700">Tel: </span>
                {formatPhoneNumber(benh_vien.SO_DIEN_THOAI)}
              </div>
              <div>
                <span className="txt-700">Hotline: </span>
                {formatPhoneNumber(benh_vien.SO_DIEN_THOAI)}
              </div>
            </div>
            <div>
              <span className="txt-700">Website: </span>
              {benh_vien?.website}
              <div>
                <span className="txt-700">Email: </span>
                {benh_vien.EMAIL}
              </div>
            </div>
          </div>
        </div>
        <div className="barcode">
          <div>
            <svg id={`barcode`}></svg>
          </div>
        </div>
      </div>

      <div className="container-title">PHIẾU KẾT QUẢ XÉT NGHIỆM</div>

      <div className="flex">
        <div className="flex-35">
          <div>
            {i18n.t(languageKeys.ten_benh_nhan)}: <span className="txt-700">{benh_pham.TEN}</span>
          </div>
          <div>
            {i18n.t(languageKeys.field_So_dien_thoai)}: <span className="txt-700">{formatPhoneNumber(benh_pham.SDT)}</span>
          </div>
          <div>
            {i18n.t(languageKeys.chan_doan_so_bo)}: {benh_pham.CHAN_DOAN}
          </div>
          <div>
            {i18n.t(languageKeys.bs_chi_dinh)}: {convertListName(benh_pham.BAC_SI_CHI_DINH)}
          </div>
        </div>
        <div style={{ width: "65%" }}>
          <div className="flex">
            <div className="flex-50">
              {i18n.t(languageKeys.field_Gioi_tinh)}: {getSexFromString(benh_pham.GIOI_TINH)}
            </div>
            <div style={{ width: "50%" }}>
              {i18n.t(languageKeys.field_Ngay_sinh)}: {benh_pham.NGAY_SINH}
            </div>
          </div>

          <div>
            {i18n.t(languageKeys.dia_chi)}: {getFullDiaChi(benh_pham)}
          </div>

          <div className="flex">
            <div>
              {i18n.t(languageKeys.field_Doi_tuong)}: {benh_pham.TEN_DOI_TUONG}
            </div>
          </div>

          <div className="flex">
            <div style={{ width: "50%" }}>
              {i18n.t(languageKeys.nguoi_lay_mau)}: {benh_pham.NGUOI_TAO}
            </div>
            <div style={{ width: "50%" }}>
              {i18n.t(languageKeys.thoi_gian_lay_mau)}: {benh_pham.GIO_TAO}{" "}
              {moment(benh_pham.NGAY_TAO).format("DD/MM/YYYY")}
            </div>
          </div>
        </div>
      </div>

      <div>
        <table className="table">
          <thead>
            <th colSpan="2" className="upperTxt" style={{ textAlign: "left" }}>
              {i18n.t(languageKeys.ten_xet_nghiem)}
            </th>
            <th className="upperTxt">{i18n.t(languageKeys.field_Ket_qua)}</th>
            <th className="upperTxt">{i18n.t(languageKeys.khoang_tham_chieu)}</th>
            <th className="upperTxt">{i18n.t(languageKeys.field_Don_vi)}</th>
          </thead>
          <tbody>
            {Array.isArray(arrXn) &&
              arrXn.map((item, index) => {
                return (
                  <>
                    <tr>
                      <td colSpan="5" style={{ fontWeight: "bold" }}>
                        {item.TEN_LOAI_DV}
                      </td>
                    </tr>
                    {Array.isArray(item?.data) &&
                      item.data.map((subItem, subIndex) => {
                        return (
                          <tr>
                            <td style={{ width: "50px" }}>01</td>
                            <td>{subItem.TEN_DV}</td>
                            <td
                              style={{
                                fontWeight:"bold",
                                textAlign:
                                  onCheckEdge(subItem.KET_QUA_XN, [
                                    Number(subItem.CAN_DUOI),
                                    Number(subItem.CAN_TREN),
                                  ]) || "center",
                              }}
                            >
                              {subItem.KET_QUA_XN}
                            </td>
                            <td style={{ textAlign: "center" }}>
                              {Number(subItem.CAN_DUOI)} - {Number(subItem.CAN_TREN)}
                            </td>
                            <td style={{ textAlign: "center" }}>{`${subItem.TEN_DVT}`}</td>
                          </tr>
                        );
                      })}
                  </>
                );
              })}
          </tbody>
        </table>
      </div>
      <div>
        <span className="txt-700">
          {i18n.t(languageKeys.ket_luan)}: {benh_pham.KET_LUAN}
        </span>
      </div>
      <div className="flex">
        <div>{i18n.t(languageKeys.ket_qua_in_dam)}</div>
        <ul className="list">
          <li>
            * {i18n.t(languageKeys.ket_qua_nam_lech)} {i18n.t(languageKeys.phai)}: Cao hơn CSBT
          </li>
          <li>
            * {i18n.t(languageKeys.ket_qua_nam_lech)} {i18n.t(languageKeys.trai)}: Thấp hơn CSBT
          </li>
          <li>* {i18n.t(languageKeys.ket_qua_nam_giua)}: Bình thường</li>
        </ul>
      </div>

      <div className="footer footer-break">
        <div></div>
        <div className="footer-confirm">
          <div>
            {i18n.language === languages.tieng_viet ? (
              <i>
                {moment().format("HH:mm") + ", "}
                Ngày {moment().date()},tháng {moment().month() + 1}, năm {moment().year()}
              </i>
            ) : (
              <i> {moment().format("HH:mm , MMMM d, YYYY")}</i>
            )}
          </div>
          <div>
            <span className="txt-700" style={{ textTransform: "capitalize" }}>
              {i18n.t(languageKeys.ky_thuat_vien)}
            </span>
          </div>
          <div>({i18n.t(languageKeys.ky_va_ghi_ro_ho_ten)})</div>
          <div className="signature"></div>
          <div>
            <span className="txt-700">{benh_pham.NGUOI_NHAP_KQ}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PhieuTraKqXn;

export const formatPhoneNumber = (phoneNumber = "") => {
    if (!_.isString(phoneNumber)) return phoneNumber;
  
    if (phoneNumber.length === 8) {
      return phoneNumber.replace(/\D*(\d{4})\D*(\d{4})\D*/, "$1 $2");
    }
  
    return phoneNumber.replace(/\D*(\d{4})\D*(\d{3})\D*(\d{3})\D*/, "$1 $2 $3");
};

  export const convertListName = (string, name = i18n.t(languageKeys.tiep_tan)) => {
    let _string = string;
    let result = "";
  
    if (!string.includes(";") && string.length === 0) return name;
    if (!string.includes(";") && !!string.length) return string;
  
    if (_string === "") {
      return result;
    }
  
    if (string.includes(";")) {
      _string = _string.split(";");
    }
    if (!!_string.length && _string.length < 2) {
      result = !_string[0] ? `${name}` : _string[0].join("");
    } else if (!!_string.length && _string.length >= 2) {
      for (let i = 0; i < _string.length; i++) {
        const element = _string[i];
        if (element.length == 0) {
          _string[i] = name;
        }
      }
      result = _string.join(";");
    }
    return result;
  };
  