import moment from "moment";
import React from "react";
import {
  getImageFromSever,
  layDiaChi,
  rid as _rid,
  formatCurrency,
  convertDateToValue,
  formatDateOfBirth,
  getSexFromString,
  HLog,
} from "../../../helpers";
import { useSelector } from "react-redux";
import i18n, { languageKeys, languages } from "../../../i18n";
import JsBarcode from "jsbarcode";

export const styleChiDinhNew = `
#phieu-chi-dinh * { font-size: 12px; line-height: 1.5em; font-family: "Times New Roman", Times, serif; }
#phieu-chi-dinh .logo { width: 75px; height: 75px; object-fit: contain; }
#phieu-chi-dinh .header { display: flex; gap: 20px; width:100% }
#phieu-chi-dinh .content-header { position:relative; width:70% }
#phieu-chi-dinh .flex {
    display: flex;
  }
#phieu-chi-dinh .flex.justify {
    justify-content: space-around;
  }

#phieu-chi-dinh .tel {
    margin-right: 50px;
  }
#phieu-chi-dinh .txt-700 {
    font-weight: 700;
  }
#phieu-chi-dinh .container-title {
    font-weight: 700;
    font-size: 16px;
    line-height: 18px;
    text-align: center;
    text-transform: uppercase;
    margin-top: 1.5rem;
    margin-bottom: 1rem;
  }
#phieu-chi-dinh .container__title--main {
    font-weight: 700;
    font-size: 15px;
    line-height: 14px;
  }
#phieu-chi-dinh .container__ttbn--wrapper div {
    margin: 4px 0 0 0;
  }
#phieu-chi-dinh .container-wrapper-flex {
    display: flex;
    flex-direction: row;
    width: 100%;
  }

  #phieu-chi-dinh .container-wrapper-flex .col-3{
    width: 30%;
  }

  #phieu-chi-dinh .container-wrapper-flex .col-4{
    width: 40%;
  }

  #phieu-chi-dinh .thongtin-khambenh {
    width: 100%;
    display: flex;
    margin-top: 12px;
  }

  #phieu-chi-dinh .thongtin-khambenh .left {
    width: 65%;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
  }

  #phieu-chi-dinh .thongtin-khambenh .right {
    width: 35%;
  }

  #phieu-chi-dinh .table {
    margin-block: 1rem;
    width: 100%;
}

  #phieu-chi-dinh .table * {
    font-size: 0.8rem;
}

#phieu-chi-dinh .table,
.table th, 
.table td {
    border: 1px solid black;
    border-collapse: collapse;
}

#phieu-chi-dinh .table th,
.table td {
    padding: 5px 10px;
}

  #phieu-chi-dinh hr.solid {
    border-top: 1px solid #000;
  }

  #phieu-chi-dinh .footer {
    display: flex;
    width: 100%;
    justify-content: space-between;
    margin-top:12px;
  }

  #phieu-chi-dinh .footer .footer-confirm {
    margin-right: 44px;
    text-align: center;
  }

  #phieu-chi-dinh .name-space {
    height: 50px;
  }
  
  #phieu-chi-dinh .upperTxt{
    text-transform: uppercase;
  }
  #phieu-chi-dinh .txt-size-m{
    font-size: 14px;
  }

  #phieu-chi-dinh .barcode-top-right {
    position: absolute;
    width:30%;
    right:0;
    top: 0;
  }

  #phieu-chi-dinh .footer .signature {
    margin-right: 44px;
    text-align: center;
  }

@media print {
#phieu-chi-dinh .foot-break { break-inside: avoid; }
}
`;

const PhieuChiDinh = ({ data, rid }) => {
  const userProfile = useSelector((state) => state.auth.user);

  let { dich_vu } = data;
  console.log(dich_vu, "dich_vudich_vudich_vu");
  let imageUrl = getImageFromSever(userProfile.benh_vien.ANH_DAI_DIEN);

  React.useEffect(() => {
    let MA_PHIEU = data.MA_PHIEU; //lấy ra mã phiếu để kiểm tra, nếu có mã phiếu thì in mã phiếu, ngược lại in mã bệnh nhân
    if (!!rid && !!MA_PHIEU) {
      //in mã phiếu
      JsBarcode(`#barcode-${rid}`)
        .options({ font: "OCR-B" })
        .CODE128(MA_PHIEU, {
          fontSize: 13,
          width: 1.3,
          height: 60,
          textMargin: 0,
        })
        .render();
    }
  }, [data.benh_nhan.ma_benh_nhan, rid]);

  return (
    <div id="phieu-chi-dinh">
      <div className="header">
        {!!imageUrl && (
          <div className="img-header">
            <img className="logo" src={imageUrl} alt="" />
          </div>
        )}
        <div className="content-header">
          <h2 style={{ margin: 0, fontSize: 15 }} className="upperTxt">
            {userProfile?.benh_vien?.TEN_CSKCB}
          </h2>
          <div style={{wordWrap: 'break-word'}}>
            <span className="txt-700">{i18n.t(languageKeys.dia_chi)}:</span> {layDiaChi(userProfile.benh_vien)}
          </div>
          <div className="flex">
            <div className="tel">
              <span className="txt-700"> Tel: </span> {convertString(userProfile.benh_vien.SO_DIEN_THOAI)}
            </div>
            <div>
              <span className="txt-700">Email:</span> {convertString(userProfile.benh_vien.EMAIL)}
            </div>
          </div>
        </div>
        <div className="barcode-top-right" style={{ textAlign: "center", position: "relative" }}>
          <div>{!!data.MA_PHIEU && <svg id={`barcode-${rid}`}></svg>}</div>
        </div>
      </div>
      <div className="container">
        <div className="container-title">{i18n.t(languageKeys.title_phieu_chi_dinh_dich_vu)}</div>
        <div className="container__chapter--1">
          <div className="container__ttbn--wrapper">
            <div className="container-wrapper-flex">
              <div className="col-3">
                <div>
                  {i18n.t(languageKeys.ma_benh_nhan)}: <span className="txt-700 txt-size-m">{data.benh_nhan?.ma_benh_nhan}</span>
                </div>
                <div>
                  {i18n.t(languageKeys.field_Gioi_tinh)}: {getSexFromString(data.benh_nhan?.gioi_tinh)}
                </div>
              </div>
              <div className="col-4">
                <div>
                  {i18n.t(languageKeys.ten_benh_nhan)}: <span className="txt-700 txt-size-m"> {data.benh_nhan?.ten_benh_nhan} </span>
                </div>
                <div>
                  {i18n.t(languageKeys.field_Doi_tuong)}: {data.bao_hiem?.ten_doi_tuong}
                </div>
              </div>
              <div className="col-3">
                <div>
                  {i18n.t(languageKeys.field_Ngay_sinh)}: {formatDateOfBirth(data.benh_nhan?.ngay_sinh)}
                </div>
                <div>
                  {i18n.t(languageKeys.field_So_dien_thoai)}:<span className="txt-700"> {` ${data.benh_nhan?.sdt}`}</span>
                </div>
              </div>
            </div>
          </div>
          <div className="dia-chi">
            {i18n.t(languageKeys.dia_chi)}: {data.benh_nhan?.dia_chi}
          </div>
          <div>
            {/* {i18n.t(languageKeys.khoa_phong)}: {!!data.isTiepDon ? i18n.t(languageKeys.phong_tiep_don) :data.ten_phong} */}
            {i18n.t(languageKeys.noi_chi_dinh)}: {!data.ten_phong ? i18n.t(languageKeys.phong_tiep_don) : data.ten_phong}
          </div>
          <div>
            {i18n.t(languageKeys.noi_thuc_hien)}: {dich_vu[0].PHONG_THUC_HIEN}
          </div>
          <div>
            <span className="txt-700" style={{ marginRight: 8 }}>
              {i18n.t(languageKeys.chan_doan_so_bo)}:
            </span>
            <span>{data.chan_doan_lam_sang}</span>
          </div>
        </div>

        <div>
          <table className="table">
            <thead>
              <th>{i18n.t(languageKeys.common_tt)}</th>
              <th style={{ textAlign: "start", width: "25%", maxWidth: "30%" }}>{i18n.t(languageKeys.field_Ten_dich_vu)}</th>
              <th>{i18n.t(languageKeys.field_So_luong)}</th>
              <th>{i18n.t(languageKeys.field_don_gia)}</th>
              <th>{i18n.t(languageKeys.vien_phi_thanh_tien)}</th>
            </thead>
            <tbody>
              {dich_vu[0].data.map((item, index) => {
                // HLog("item: ", item)
                return (
                  <>
                    <tr key={_rid()}>
                      <td colSpan={4} style={{ textAlign: "start", fontWeight: 700 }}>
                        {`${index + 1}. ${item.TEN_LOAI_DV}`}
                      </td>
                      <td colSpan={1} style={{ textAlign: "end", fontWeight: 700 }}>
                        {formatCurrency(item.THANH_TIEN, "", true)}
                      </td>
                    </tr>
                    {!!item.data &&
                      item?.data?.map((childService, id) => {
                        return (
                          <tr key={_rid()}>
                            <td>{id + 1}</td>
                            <td style={{ width: "30%" }}>{childService.TEN_DICHVU}</td>
                            <td style={{textAlign:"center"}}>{childService.SO_LUONG}</td>
                            <td style={{ textAlign: "end" }}>
                              {childService.DON_GIA
                                ? formatCurrency(childService.DON_GIA, "", true)
                                : null || formatCurrency(childService.GIA_DICH_VU, "", true)}
                            </td>
                            <td style={{ textAlign: "end" }}>{formatCurrency(childService.THANH_TIEN, "", true)}</td>
                          </tr>
                        );
                      })}
                  </>
                );
              })}
              <tr key={_rid()}>
                <td colSpan={4} style={{ textAlign: "end", fontWeight: 700 }}>
                  {i18n.t(languageKeys.thanh_tien)}:
                </td>
                <td colSpan={1} style={{ textAlign: "end", fontWeight: 700 }}>
                  {formatCurrency(data.tong_thanh_tien, "", true)}
                </td>
              </tr>
            </tbody>
          </table>
        </div>
        <div>
          <div>
            {i18n.t(languageKeys.tong_tien_nguoi_benh_phai_tra)}:{" "}
            <span>
              <strong>{formatCurrency(data.tong_thanh_tien, "", true)}</strong>{" "}
              <i>{i18n.language === languages.tieng_viet ? DocTienBangChu(data.tong_thanh_tien) : numToWords(data.tong_thanh_tien)}</i>
            </span>
          </div>
        </div>
      </div>
      <strong>{i18n.t(languageKeys.da_duoc_tu_van_day_du)}</strong>
      <div className="footer">
        <div style={{ textAlign: "center" }}>
          <div></div>
        </div>
        <div className="signature">
          {i18n.language === languages.tieng_viet ? (
            data?.ngay_tao ? (
              <i>
                {data?.gio}, {data.ngay_tao}
              </i>
            ) : (
              <i>
                {moment().format("HH:mm") + ", "}
                Ngày {moment().date()},tháng {moment().month() + 1}, năm {moment().year()}
              </i>
            )
          ) : (
            <i> {moment().format("HH:mm , MMMM d, YYYY")}</i>
          )}
          <div className="txt-700">{i18n.t(languageKeys.nguoi_chi_dinh)}</div>
          <i>({i18n.t(languageKeys.ky_va_ghi_ro_ho_ten)})</i>
          <div className="name-space"></div>
          <div className="txt-700">{data.nguoi_hien_thi || data.bac_si_chi_dinh || data.nguoi_tiep_don}</div>
        </div>
      </div>
    </div>
  );
};

let convertString = (field) => {
  let text = "";

  if (!!field && typeof field === "string") {
    text = field;
  } else if (!!field && typeof field === "number") {
    text = `${field}`;
  }
  return text;
};

export default PhieuChiDinh;

var ChuSo = new Array(" không ", " một ", " hai ", " ba ", " bốn ", " năm ", " sáu ", " bảy ", " tám ", " chín ");
var Tien = new Array("", " nghìn", " triệu", " tỷ", " nghìn tỷ", " triệu tỷ");

var digit = new Array(" zero ", " one ", " two ", " three ", " four ", " five ", " six ", " seven ", " eight ", " nine ");
var money = new Array("", " thousand", " milion", " bilion", " thousand bilion", " milion bilion");

//1. Hàm đọc số có ba chữ số;
function DocSo3ChuSo(baso) {
  var tram;
  var chuc;
  var donvi;
  var KetQua = "";
  tram = parseInt(baso / 100);
  chuc = parseInt((baso % 100) / 10);
  donvi = baso % 10;
  if (tram === 0 && chuc === 0 && donvi === 0) return "";
  if (tram !== 0) {
    KetQua += ChuSo[tram] + " trăm ";
    if (chuc === 0 && donvi !== 0) KetQua += " linh ";
  }
  if (chuc !== 0 && chuc !== 1) {
    KetQua += ChuSo[chuc] + " mươi";
    if (chuc === 0 && donvi !== 0) KetQua = KetQua + " linh ";
  }
  if (chuc === 1) KetQua += " mười ";
  switch (donvi) {
    case 1:
      if (chuc !== 0 && chuc !== 1) {
        KetQua += " mốt ";
      } else {
        KetQua += ChuSo[donvi];
      }
      break;
    case 5:
      if (chuc === 0) {
        KetQua += ChuSo[donvi];
      } else {
        KetQua += " lăm ";
      }
      break;
    default:
      if (donvi !== 0) {
        KetQua += ChuSo[donvi];
      }
      break;
  }
  return KetQua;
}

//2. Hàm đọc số thành chữ (Sử dụng hàm đọc số có ba chữ số)
function DocTienBangChu(SoTien) {
  SoTien = Number(SoTien);
  var lan = 0;
  var i = 0;
  var so = 0;
  var KetQua = "";
  var tmp = "";
  var ViTri = new Array();
  if (SoTien < 0) return `${i18n.t(languageKeys.noti_so_tien_am)} !`;
  if (SoTien === 0) return `${i18n.t(languageKeys.noti_khong_dong)} !`;
  if (SoTien > 0) {
    so = SoTien;
  } else {
    so = -SoTien;
  }
  if (SoTien > 8999999999999999) {
    //SoTien = 0;
    return "Số quá lớn!";
  }
  ViTri[5] = Math.floor(so / 1000000000000000);
  if (isNaN(ViTri[5])) ViTri[5] = "0";
  so = so - parseFloat(ViTri[5].toString()) * 1000000000000000;
  ViTri[4] = Math.floor(so / 1000000000000);
  if (isNaN(ViTri[4])) ViTri[4] = "0";
  so = so - parseFloat(ViTri[4].toString()) * 1000000000000;
  ViTri[3] = Math.floor(so / 1000000000);
  if (isNaN(ViTri[3])) ViTri[3] = "0";
  so = so - parseFloat(ViTri[3].toString()) * 1000000000;
  ViTri[2] = parseInt(so / 1000000);
  if (isNaN(ViTri[2])) ViTri[2] = "0";
  ViTri[1] = parseInt((so % 1000000) / 1000);
  if (isNaN(ViTri[1])) ViTri[1] = "0";
  ViTri[0] = parseInt(so % 1000);
  if (isNaN(ViTri[0])) ViTri[0] = "0";
  if (ViTri[5] > 0) {
    lan = 5;
  } else if (ViTri[4] > 0) {
    lan = 4;
  } else if (ViTri[3] > 0) {
    lan = 3;
  } else if (ViTri[2] > 0) {
    lan = 2;
  } else if (ViTri[1] > 0) {
    lan = 1;
  } else {
    lan = 0;
  }
  for (i = lan; i >= 0; i--) {
    tmp = DocSo3ChuSo(ViTri[i]);
    KetQua += tmp;
    if (ViTri[i] > 0) KetQua += Tien[i];
    if (i > 0 && tmp.length > 0) KetQua += ","; //&& (!string.IsNullOrEmpty(tmp))
  }
  if (KetQua.substring(KetQua.length - 1) === ",") {
    KetQua = KetQua.substring(0, KetQua.length - 1);
  }
  KetQua = KetQua.substring(1, 2).toUpperCase() + KetQua.substring(2);

  return KetQua + " đồng"; //.substring(0, 1);//.toUpperCase();// + KetQua.substring(1);
}

function numToWords(n) {
  const arr = (x) => Array.from(x);
  const num = (x) => Number(x) || 0;
  const str = (x) => String(x);
  const isEmpty = (xs) => xs.length === 0;
  const take = (n) => (xs) => xs.slice(0, n);
  const drop = (n) => (xs) => xs.slice(n);
  const reverse = (xs) => xs.slice(0).reverse();
  const comp = (f) => (g) => (x) => f(g(x));
  const not = (x) => !x;
  const chunk = (n) => (xs) => isEmpty(xs) ? [] : [take(n)(xs), ...chunk(n)(drop(n)(xs))];
  let a = [
    "",
    "one",
    "two",
    "three",
    "four",
    "five",
    "six",
    "seven",
    "eight",
    "nine",
    "ten",
    "eleven",
    "twelve",
    "thirteen",
    "fourteen",
    "fifteen",
    "sixteen",
    "seventeen",
    "eighteen",
    "nineteen",
  ];
  let b = ["", "", "twenty", "thirty", "forty", "fifty", "sixty", "seventy", "eighty", "ninety"];
  let g = ["", "thousand", "million", "billion", "trillion", "quadrillion", "quintillion", "sextillion", "septillion", "octillion", "nonillion"];
  // this part is really nasty still
  // it might edit this again later to show how Monoids could fix this up
  let makeGroup = ([ones, tens, huns]) => {
    return (
      [num(huns) === 0 ? "" : a[huns] + " hundred ", num(ones) === 0 ? b[tens] : (b[tens] && b[tens] + "-") || "", a[tens + ones] || a[ones]].join(
        ""
      ) + " dong"
    );
  };
  // "thousands" constructor; no real good names for this, i guess
  let thousand = (group, i) => (group === "" ? group : `${group} ${g[i]}`);
  // execute !
  if (typeof n === "number") return numToWords(String(n));
  if (n === "0") return "zero";
  return comp(chunk(3))(reverse)(arr(n)).map(makeGroup).map(thousand).filter(comp(not)(isEmpty)).reverse().join(" ") + " dong";
}
