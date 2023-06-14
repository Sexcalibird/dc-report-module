import { memo } from "react";
import { useSelector } from "react-redux";
import {
  getImageFromSever,
  rid,
  formatNumberToPrice,
  getFullName,
  convertValueToYear,
  getSexFromString,
  docTenThuocTheoThongTu52,
  layDiaChi,
  localGet,
} from "../../helpers";
import moment from "moment";
import { formatCurrency, getSex } from "../../helpers";
import i18n, { languageKeys, languages } from "../../i18n";

export const stylePhieuBanLeThuoc = `
#phieu-ban-le-thuoc * { font-size: 1rem; line-height: 1.5em; font-family: "Times New Roman", Times, serif; }
#phieu-ban-le-thuoc .logo { width: 75px; height: 75px; object-fit: contain; }
#phieu-ban-le-thuoc .header { display: flex; gap: 20px; }
#phieu-ban-le-thuoc .hospital-name { text-transform: uppercase; font-weight: bold; }
#phieu-ban-le-thuoc .thong-tin-phieu { display:flex ; }
#phieu-ban-le-thuoc .title { text-transform: uppercase; font-size: 2rem; font-weight: bold; margin-top: 1.5rem; margin-bottom: 1rem; text-align: center; }
#phieu-ban-le-thuoc .table { margin-block: 1rem; }
#phieu-ban-le-thuoc .table * { font-size: 0.8rem; }
#phieu-ban-le-thuoc .table, .table th, .table td { border: 1px solid black; border-collapse: collapse; }
#phieu-ban-le-thuoc .table th, .table td { padding: 5px 10px; }
#phieu-ban-le-thuoc .table th { text-align: start; }
@media print {
   #phieu-ban-le-thuoc .foot-break { break-inside: avoid; }
}
`;

const PhieuBanLeThuoc = ({ data = {} }) => {
  const userProfile = useSelector((state) => state.auth.user);

  const { benh_nhan, donthuoc } = data;
  let dia_chi_benh_nhan = benh_nhan.DIA_CHI_CHI_TIET;
  if (!!benh_nhan.TEN_PHUONG_XA) {
    dia_chi_benh_nhan += `, ${benh_nhan.TEN_PHUONG_XA}`;
  }
  if (!!benh_nhan.TEN_QUAN_HUYEN) {
    dia_chi_benh_nhan += `, ${benh_nhan.TEN_QUAN_HUYEN}`;
  }
  if (!!benh_nhan.TEN_TINH_THANH) {
    dia_chi_benh_nhan += `, ${benh_nhan.TEN_TINH_THANH}`;
  }

  return (
    <div id="phieu-ban-le-thuoc">
      <div className="header">
        {data.BENH_VIEN.ANH_DAI_DIEN && <img src={getImageFromSever(data.BENH_VIEN.ANH_DAI_DIEN)} alt="" className="logo" />}

        <div>
          <div className="hospital-name">{data.BENH_VIEN.TEN_CSKCB}</div>
          <div>
            {i18n.t(languageKeys.dia_chi)}: {layDiaChi(data.BENH_VIEN)}
          </div>
          <div>
            {i18n.t(languageKeys.dien_thoai)}: {data.BENH_VIEN.SO_DIEN_THOAI || ""}
          </div>
        </div>
      </div>

      <div className="title">{i18n.t(languageKeys.Phieu_xuat_kho)}</div>

      <div style={{ display: "flex" }}>
        <div style={{ flex: "40%" }}>
          <div>
            {i18n.t(languageKeys.ho_va_ten)}: <b>{benh_nhan.TEN_BENH_NHAN || benh_nhan.TEN}</b>
          </div>
        </div>
        <div style={{ flex: "30%" }}>
          <div>
            {i18n.t(languageKeys.field_Nam_sinh)}: <b>{convertValueToYear(benh_nhan.NGAY_SINH)}</b>
          </div>
        </div>
        <div style={{ flex: "30%" }}>
          <div>
            {i18n.t(languageKeys.field_Gioi_tinh)}: <b>{getSexFromString(benh_nhan.GIOI_TINH)}</b>
          </div>
        </div>
      </div>
      <div style={{ width: "100%" }}>
        {i18n.t(languageKeys.field_So_dien_thoai)}: <b>{benh_nhan.SO_DIEN_THOAI}</b>
      </div>
      <div style={{ width: "100%" }}>
        {i18n.t(languageKeys.dia_chi)}: <b>{dia_chi_benh_nhan}</b>
      </div>
      <table style={{ width: "100%" }} className="table">
        <thead>
          <tr>
            <th style={{ width: "28px" }}>{i18n.t(languageKeys.field_Stt)}</th>
            <th>{i18n.t(languageKeys.field_Ten_thuoc)}</th>
            <th>ĐVT</th>
            <th>{i18n.t(languageKeys.field_SL)}</th>
            <th>{i18n.t(languageKeys.field_don_gia)}</th>
            <th>{i18n.t(languageKeys.vien_phi_thanh_tien)}</th>
          </tr>
        </thead>
        <tbody>
          {donthuoc.data_thuoc?.map((item, index) => {
            return (
              <tr key={rid()}>
                <td>{index + 1 >= 10 ? index + 1 : `0${index + 1}`}</td>
                <td>{docTenThuocTheoThongTu52(item)}</td>
                <td>{item.TEN_DON_VI_TINH}</td>
                <td>{item.SO_LUONG}</td>
                <td>{formatNumberToPrice(item.GIA_BAN)}</td>
                <td>{formatNumberToPrice(item.THANH_TIEN)}</td>
              </tr>
            );
          })}
          <tr>
            <td colSpan={5}>
              <div
                style={{
                  display: "flex",
                  justifyContent: "flex-end",
                }}
              >
                <div>{i18n.t(languageKeys.bao_cao_tong_cong)}: </div>
              </div>
            </td>
            <td>
              <span style={{ fontWeight: "bold" }}>{formatCurrency(donthuoc.TONG_THANH_TOAN, "", true)}</span>
            </td>
          </tr>
        </tbody>
      </table>

      <div className="foot-break" style={{ display: "table", justifyContent: "space-between" }}>
        <div style={{ display: "table-cell", whiteSpace: "nowrap" }}>
          <div style={{ display: "table" }}>
            <div style={{ display: "table-row" }}>
              <div style={{ display: "table-cell" }}>{i18n.t(languageKeys.vien_phi_thanh_tien)}:</div>
              <div
                style={{
                  display: "table-cell",
                  textAlign: "end",
                  paddingLeft: 20,
                  fontWeight: "bold",
                }}
              >
                {`${donthuoc.TONG_THANH_TOAN}`.replace(/\B(?=(\d{3})+(?!\d))/g, ".")}
              </div>
            </div>
            <div style={{ display: "table-row" }}>
              <div style={{ display: "table-cell" }}>{i18n.t(languageKeys.bang_chu)}:</div>
              <div
                style={{
                  display: "table-cell",
                  textAlign: "end",
                  paddingLeft: 20,
                  fontWeight: "bold",
                }}
              >
                {i18n.language === languages.tieng_viet ? DocTienBangChu(donthuoc.TONG_THANH_TOAN) : numToWords(donthuoc.TONG_THANH_TOAN)}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* <div>Ghi chú: {BAO_CAO.chi_tiet.GHI_CHU}</div> */}

      <div className="foot-break">
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "flex-end",
          }}
        >
          <i>
          {i18n.language === languages.tieng_viet ?  <>Ngày {moment().date()}, tháng {moment().month() + 1}, năm {moment().year()}</> : <div style={{marginLeft:"-55%"}}>{moment().format('MMMM d, YYYY')}</div>}
          </i>

          <div style={{ textAlign: "center", marginRight: 40 }}>
            <div>
              <b>{i18n.t(languageKeys.nguoi_lap)}</b>
            </div>
            <i>({i18n.t(languageKeys.ky_va_ghi_ro_ho_ten)})</i>
            <div style={{ marginTop: 80, fontWeight: "bold" }}>{getFullName(userProfile)}</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default memo(PhieuBanLeThuoc);

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

function numToWords (n) {
  const arr = x => Array.from(x);
  const num = x => Number(x) || 0;
  const str = x => String(x);
  const isEmpty = xs => xs.length === 0;
  const take = n => xs => xs.slice(0,n);
  const drop = n => xs => xs.slice(n);
  const reverse = xs => xs.slice(0).reverse();
  const comp = f => g => x => f (g (x));
  const not = x => !x;
  const chunk = n => xs =>
  isEmpty(xs) ? [] : [take(n)(xs), ...chunk (n) (drop (n) (xs))];
  let a = [
    '', 'one', 'two', 'three', 'four',
    'five', 'six', 'seven', 'eight', 'nine',
    'ten', 'eleven', 'twelve', 'thirteen', 'fourteen',
    'fifteen', 'sixteen', 'seventeen', 'eighteen', 'nineteen'
  ];
  let b = [
    '', '', 'twenty', 'thirty', 'forty',
    'fifty', 'sixty', 'seventy', 'eighty', 'ninety'
  ];
  let g = [
    '', 'thousand', 'million', 'billion', 'trillion', 'quadrillion',
    'quintillion', 'sextillion', 'septillion', 'octillion', 'nonillion'
  ];
  // this part is really nasty still
  // it might edit this again later to show how Monoids could fix this up
  let makeGroup = ([ones,tens,huns]) => {
    return [
      num(huns) === 0 ? '' : a[huns] + ' hundred ',
      num(ones) === 0 ? b[tens] : b[tens] && b[tens] + '-' || '',
      a[tens+ones] || a[ones]
    ].join('') + " dong";
  };
  // "thousands" constructor; no real good names for this, i guess
  let thousand = (group,i) => group === '' ? group : `${group} ${g[i]}`;
  // execute !
  if (typeof n === 'number') return numToWords(String(n));
  if (n === '0')             return 'zero';
  return comp (chunk(3)) (reverse) (arr(n))
    .map(makeGroup)
    .map(thousand)
    .filter(comp(not)(isEmpty))
    .reverse()
    .join(' ') + " dong";
};