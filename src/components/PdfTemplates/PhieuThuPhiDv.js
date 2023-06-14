import JsBarcode from "jsbarcode";
import moment from "moment";
import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { getImageFromSever, getFullName, formatNumberToPrice, HLog, convertMillisecondToAge, convertValueToMilisecond } from "../../helpers";
import i18n, { languageKeys } from "../../i18n";

export const stylePhieuThuPhiDv = `
#phieu-thu-phi-dv * { font-size: 1rem; line-height: 1.5em; font-family: "Times New Roman", Times, serif; }
#phieu-thu-phi-dv .logo { width: 80px; height: 80px; object-fit: contain; }
#phieu-thu-phi-dv .header { display: flex; gap: 20px; }
#phieu-thu-phi-dv .hospital-name { text-transform: uppercase; font-weight: bold; font-size: 1.2rem; }
#phieu-thu-phi-dv .title { text-transform: uppercase; font-size: 2rem; font-weight: bold; margin-top: 1rem; margin-bottom: 0.5rem; text-align: center; }
#phieu-thu-phi-dv .subtitle { margin-block: 0.5rem; font-size: 1.2rem; font-weight: bold; }
#phieu-thu-phi-dv .table * { line-height: 1.2em; }
#phieu-thu-phi-dv .table { margin-top: 1rem; margin-bottom: 1.5rem; }
#phieu-thu-phi-dv .table, .table th, .table td { border: 1px solid black; border-collapse: collapse; }
#phieu-thu-phi-dv .table th, .table td { padding: 5px; }
#phieu-thu-phi-dv .table th { text-align: start; }
#phieu-thu-phi-dv .noBorder2 { border-right: none; }
#phieu-thu-phi-dv .noBorder { border-left: none; }
#phieu-thu-phi-dv .foot { display: flex; justify-content: space-between; padding-top: 20px; }
#phieu-thu-phi-dv .avatar { height: 80px; width: 80px; padding-right: 15px; }
#phieu-thu-phi-dv .anotherFoot { display: flex; padding-top: 10px; }
#phieu-thu-phi-dv .anotherFoot > div { width: 50%; text-align: center; }
#phieu-thu-phi-dv .des { font-style: italic; }
#phieu-thu-phi-dv .sub-barcode-text { font-size:13px;position:absolute;top:60px; right:12px; }
@media print {
   #phieu-thu-phi-dv, #phieu-thu-phi-dv .foot-break { break-inside: avoid; }
}
`;

const PhieuThuPhiDv = ({ data = { benh_nhan: {}, dich_vu: [], hospital: {}, nhom: "" }, rid }) => {
  const userProfile = useSelector((state) => state.auth.user);
  
  useEffect(() => {
    if (!!rid && !!data.benh_nhan.ma_benh_nhan) {
      JsBarcode(`#barcode-${rid}`)
        .options({ font: "OCR-B" })
        .CODE128(data.benh_nhan.ma_benh_nhan, {
          text: ` `,
          fontSize: 14,
          width: 1.2,
          height: 50,
          textMargin: 0,
        })
        .render();
    }
  }, [data.benh_nhan.ma_benh_nhan, rid]);



  const calculator = () => {
    const giatriMacDinh = "";
    return {
      soLuong: () => {
        try {
          let value = 0;
          data.nhom_dv.forEach(item => {
           const soLuongCon = item.dich_vu.reduce((acc,curr) => acc + +(curr.so_luong || curr.SO_LUONG),0)
           value += soLuongCon
          });
          return formatNumberToPrice(+value);
        } catch (error) {
          return giatriMacDinh
        }
      },
      tongTien : () => {
        try {
          let value = 0;
          data.nhom_dv.forEach(item => {
           const tongTienCon = item.dich_vu.reduce(
            (acc,dich_vu) => acc + +(dich_vu.don_gia * +(dich_vu.so_luong || dich_vu.SO_LUONG)),0)
           value += tongTienCon
          });
          return (+value);
        } catch (error) {
          return giatriMacDinh
        }
      },
      mienGiam : () => {
        try {
          let value = 0;
          data.nhom_dv.forEach(item => {
           const mienGiamCon = item.dich_vu.reduce((acc,dich_vu) => acc + +(dich_vu.mien_giam),0)
           value += mienGiamCon
          });
          return (+value);
        } catch (error) {
          return giatriMacDinh
        }
      },
      thanhTien : () => {
        try {
          let value = 0;
          value = calculator().tongTien() - calculator().mienGiam()
          return (+value);
        } catch (error) {
          return giatriMacDinh
        }
      },
      sum : (arr_dich_vu,key,onlyValue = false) =>{
        try {
          const value = arr_dich_vu.reduce((acc,curr) =>{
            let finalKey = Object.keys(curr).includes(key) ? key : key.toUpperCase()
            return acc + +curr[finalKey];
          },0)
          if(!onlyValue)
            return formatNumberToPrice(value) 
            else return value
        } catch (error) {
          return ""
        }
      },
      thanhTienTungDv: (arr_dich_vu) => {
        try {
        let value = arr_dich_vu.reduce((thanhTien,dv) => {
          return thanhTien + ((dv.so_luong ?? dv.SO_LUONG) * dv.don_gia) - dv.mien_giam
        },0)
         return formatNumberToPrice(+value)

        } catch (error) {
          HLog(error,'error calculating');
          return ""
        }
      }
    }
  }

  const tinhTuoi = () => {
    try {
      
      if(data.benh_nhan?.ngay_sinh.includes('/')) {
        return convertMillisecondToAge(convertValueToMilisecond(moment(data.benh_nhan?.ngay_sinh,'DD/MM/YYYY').format('YYYYMMDD')))
      } else {
        return convertMillisecondToAge(convertValueToMilisecond(data.benh_nhan?.ngay_sinh))
      }
      
    } catch (error) {
      return data.benh_nhan.tuoi
    }

  }




  return Array(2)
    .fill(null)
    .map((_, index) => (
      <div id="phieu-thu-phi-dv" style={index === 0 ? { marginTop: -7 } : {}} key={index}>
        <div className="header">
          {data.hospital.avatar && <img src={getImageFromSever(data.hospital.avatar)} alt="" className="logo" />}

          <div style={{ display: "flex", gap: 5, justifyContent: "space-between", width: "100%" }}>
            <div style={{ flexGrow: 1 }}>
              <div className="hospital-name">{data.hospital.name}</div>
              <div>
                {i18n.t(languageKeys.field_Dia_chi)}: {data.hospital.address}
              </div>
              <div>
                {i18n.t(languageKeys.dien_thoai)}: {data.hospital.phone}
              </div>
            </div>

            <div>
              <svg id={`barcode-${rid}`}></svg>
              <div className="sub-barcode-text">
                <div>
                  {i18n.t(languageKeys.ma_kh)}:<b> {data.benh_nhan.ma_benh_nhan}</b>
                </div>
                <div>
                  {i18n.t(languageKeys.field_So_phieu)} : <b>{data.benh_nhan.SO_PHIEU}</b>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="title">
          {data.nhom === "HOAN_TIEN"
            ? i18n.t(languageKeys.tab_Phieu_hoan_tien).toUpperCase()
            : i18n.t(languageKeys.title_Phieu_thu_phi_dich_vu).toUpperCase()}
        </div>

        <div className="subtitle" style={{ textAlign: "center", lineHeight: "1em" }}>
          (Liên {index + 1}: {index + 1 === 1 ? i18n.t(languageKeys.thu_ngan_giu) : i18n.t(languageKeys.khach_hang_giu)})
        </div>

        <div className="subtitle">{i18n.t(languageKeys.thong_tin_khach_hang)}</div>

        <div>
          <div style={{ display: "grid", gridTemplateColumns: "40% 60%" }}>
            <div>
              {i18n.t(languageKeys.ma_khach_hang)}: <b>{data.benh_nhan.ma_benh_nhan}</b>
            </div>
            <div>
              {i18n.t(languageKeys.ten_khach_hang)}: <b> {data.benh_nhan.ten_benh_nhan}</b>
            </div>
          </div>

          <div style={{ display: "grid", gridTemplateColumns: "40% 60%" }}>
            <div style={{ display: "flex", gap: "20%" }}>
              <div>
                {" "}
                {i18n.t(languageKeys.field_Gioi_tinh)}: {data.benh_nhan.gioi_tinh}
              </div>
            </div>

            <div style={{ display: "flex", gap: "20%" }}>
              <div>
                {" "}
                {i18n.t(languageKeys.field_Nam_sinh)}: {data.benh_nhan?.ngay_sinh.split("/").pop()}
              </div>
              <div>
                {" "}
                {/* {i18n.t(languageKeys.field_Tuoi)}: {data.benh_nhan.tuoi} */}
                {i18n.t(languageKeys.field_Tuoi)}: {tinhTuoi()}
              </div>
            </div>
          </div>

          <div style={{ display: "grid", gridTemplateColumns: "40% 60%" }}>
            <div>
              {" "}
              {i18n.t(languageKeys.field_So_dien_thoai)}: {data.benh_nhan.sdt}
            </div>
            <div>
              {" "}
              {i18n.t(languageKeys.field_Doi_tuong)}: {data.benh_nhan.doi_tuong}
            </div>
          </div>
          <div>
            {" "}
            {i18n.t(languageKeys.field_hinh_thuc_thanh_toan)}: {data.hinh_thuc_tt || data.benh_nhan.hinh_thuc_tt || ""}
          </div>
          <div>
            {" "}
            {i18n.t(languageKeys.dia_chi)}: {data.benh_nhan.dia_chi}
          </div>

          <div>
            {data.nhom === "HOAN_TIEN" ? (
              <div>
                {" "}
                {i18n.t(languageKeys.field_Ly_do_hoan_tien)} : {data.benh_nhan.ly_do_hoan_tien}
              </div>
            ) : (
              <div>
                {" "}
                {i18n.t(languageKeys.field_Ly_do_mien_giam)} : {data.benh_nhan.ly_do_mien_giam}
              </div>
            )}
          </div>

          <table style={{ width: "100%" }} className="table">
            <thead>
              <tr>
                <th>{i18n.t(languageKeys.stt)}</th>
                <th>{i18n.t(languageKeys.field_Ten_dich_vu)}</th>
                <th>{i18n.t(languageKeys.field_Don_vi)}</th>
                <th>{i18n.t(languageKeys.field_So_luong)}</th>
                <th>{i18n.t(languageKeys.field_don_gia)}</th>
                <th>{i18n.t(languageKeys.tong_tien)}</th>
                <th>{i18n.t(languageKeys.field_Mien_giam)}</th>
                <th>{i18n.t(languageKeys.vien_phi_thanh_tien)}</th>
              </tr>
            </thead>

            <tbody>
              {data.nhom_dv.map((nhom_dv, index) => {
                return (
                  <React.Fragment key={index}>
                    <tr>
                      <th className="noBorder2" colSpan="2">
                        {nhom_dv.nhom_dv}
                      </th>
                      <th colSpan="1">
                      </th>
                      <th colSpan="1">
                        {calculator().sum(nhom_dv.dich_vu,'so_luong')}
                      </th>
                      <th colSpan="1" style={{ textAlign: "end" }}>
                      </th>
                      <th className="noBorder" style={{ textAlign: "end" }}>{formatNumberToPrice(countSum(nhom_dv.dich_vu))}</th>
                      
                      <th colSpan="1" style={{ textAlign: "end" }}>
                        {calculator().sum(nhom_dv.dich_vu,'mien_giam')}
                      </th>
                      <th colSpan="1" style={{ textAlign: "end" }}>
                        {calculator().thanhTienTungDv(nhom_dv.dich_vu)}
                      </th>
                    </tr>

                    {nhom_dv.dich_vu.map((dich_vu, index) => {
                      return (
                        <tr key={index}>
                          <td>{index + 1 < 10 ? `0${index + 1}` : index + 1}</td>
                          <td>{dich_vu.ten_dich_vu}</td>
                          <td>{dich_vu.don_vi}</td>
                          <td>{dich_vu.so_luong || dich_vu.SO_LUONG}</td>
                          <td style={{ textAlign: "end" }}>{formatNumberToPrice(dich_vu.don_gia)}</td>
                          <td style={{ textAlign: "end" }}>{formatNumberToPrice(+dich_vu.don_gia * +(dich_vu.so_luong || dich_vu.SO_LUONG))}</td>
                          <td style={{ textAlign: "end" }}>{formatNumberToPrice(dich_vu.mien_giam)}</td>
                          <td style={{ textAlign: "end" }}>{formatNumberToPrice((+dich_vu.don_gia * +(dich_vu.so_luong || dich_vu.SO_LUONG)) - +dich_vu.mien_giam)}</td>
                        </tr>
                      );
                    })}
                  </React.Fragment>
                );
              })}

              <tr>
                <td colSpan='3'>
                  <b>{i18n.t(languageKeys.bao_cao_tong_cong)}</b>
                </td>
                <td colSpan="1" style={{ textAlign: "start", borderRight: "none", fontWeight: "bold" }}>
                  {formatNumberToPrice(calculator().soLuong())}
                </td>
                <td colSpan="1" style={{ textAlign: "end", borderRight: "none", fontWeight: "bold" }}>
                </td>
                <td colSpan="1" style={{ textAlign: "end", borderRight: "none", fontWeight: "bold" }}>
                  {formatNumberToPrice(calculator().tongTien())}
                </td>
                <td colSpan="1" style={{ textAlign: "end", borderRight: "none", fontWeight: "bold" }}>
                  {formatNumberToPrice(calculator().mienGiam())}
                </td>
                <td colSpan="1" style={{ textAlign: "end", borderRight: "none", fontWeight: "bold" }}>
                {formatNumberToPrice(calculator().thanhTien())}
                </td>
                {/* <th style={{ borderLeft: "none" }}>{formatNumberToPrice(countToTalSum(data.nhom_dv))}</th> */}
              </tr>
            </tbody>
          </table>

          {data.nhom === "THANH_TOAN" && (
            <div className="foot-break" style={{ display: "flex", justifyContent: "space-between" }}>
              <div>
                {i18n.t(languageKeys.cong_khoan)} :{" "}
                <b>{countQuantity(data.nhom_dv) < 10 ? `0${countQuantity(data.nhom_dv)}` : countQuantity(data.nhom_dv)}</b>
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
                  <b>{formatNumberToPrice(countToTalSum(data.nhom_dv))}</b>
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
                  <b>{formatNumberToPrice(data.mien_giam)}</b>
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
                  <b>{formatNumberToPrice(countToTalSum(data.nhom_dv) - data.mien_giam)}</b>
                </div>
              </div>
            </div>
          )}

        </div>

        <div className="foot-break" style={{ minHeight: "20vh" }}>

          <div className="anotherFoot">
            <div style={{marginTop: 30}}>
              <b style={{ fontSize: "1.1rem" }}>{i18n.t(languageKeys.khach_hang)}</b>
              <div className="des">({i18n.t(languageKeys.ky_va_ghi_ro_ho_ten)})</div>
              <div style={{ marginTop: 100, fontWeight: "bold" }}>{data.benh_nhan.ten_benh_nhan}</div>
            </div>

            <div>
            <div style={{ display: "flex", justifyContent: "center", }}>
            {data?.ngay_tao ?
            <i>
              {data.gio ? data.gio + ", " : ""}{data.ngay_tao}
            </i>
            :
            <i
              style={{
                width: "50%",
                textAlign: "center",
                marginTop: 15,
              }}
            >
              {moment().format("HH:mm") +
                `,  ${i18n.t(languageKeys.common_ngay)} ` +
                moment().format("DD") +
                `  ${i18n.t(languageKeys.common_thang)} ` +
                moment().format("MM") +
                `  ${i18n.t(languageKeys.common_nam)} ` +
                +moment().format("YYYY")}
            </i>}
          </div>
              <b style={{ fontSize: "1.1rem" }}>Thu ngân</b>
              <div className="des">({i18n.t(languageKeys.ky_va_ghi_ro_ho_ten)})</div>
              <div style={{ marginTop: 100, fontWeight: "bold" }}>{data?.ten_nhan_su || ""}</div>
            </div>
          </div>
        </div>
      </div>
    ));
};

export default PhieuThuPhiDv;

// ham tinh tong DS hoa don
const countToTalSum = (ds_nhom_dv = []) => {
  return ds_nhom_dv.reduce((prevVal, nhom_dv) => {
    const ds_dich_vu = nhom_dv.dich_vu;
    const sum = ds_dich_vu.reduce((_prevVal, dich_vu) => {
      return _prevVal + Number(dich_vu.thanh_tien);
    }, 0);
    return prevVal + sum;
  }, 0);
};

// ham tinh tong ds dich vu
const countSum = (ds_dich_vu = []) => {
  return ds_dich_vu.reduce((prevVal, dich_vu) => {
    return prevVal + Number(dich_vu.thanh_tien);
  }, 0);
};

const countQuantity = (ds_nhom_dv = []) => {
  let currentArr = [];
  for (let i = 0; i < ds_nhom_dv.length; i++) {
    currentArr = [...currentArr, ...ds_nhom_dv[i].dich_vu];
  }
  return currentArr.length;
};
