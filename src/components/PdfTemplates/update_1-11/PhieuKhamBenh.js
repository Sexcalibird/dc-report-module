import moment from "moment";
import React from "react";
import {getImageFromSever, layDiaChi, getSexFromString, getWeekdays, convertDateToValue} from "../../../helpers";
import { useSelector } from "react-redux";
import i18n, { languageKeys, languages } from "../../../i18n";
import  { HUONG_XU_TRI} from "../../../constants/keys";

export const stylePhieuKhamBenh = `
#phieu-kham-benh * { font-size: 12px; line-height: 1.5em; font-family: "Times New Roman", Times, serif; }
#phieu-kham-benh .logo { width: 75px; height: 75px; object-fit: contain; }
#phieu-kham-benh .header { display: flex; gap: 20px; }
#phieu-kham-benh .flex {
    display: flex;
  }
#phieu-kham-benh .flex.justify {
    justify-content: space-around;
  }

#phieu-kham-benh .tel {
    margin-right: 50px;
  }
#phieu-kham-benh .txt-700 {
    font-weight: 700;
  }
#phieu-kham-benh .container-title {
    font-weight: 700;
    font-size: 16px;
    line-height: 18px;
    text-align: center;
    text-transform: uppercase;
    margin-top: 1.5rem;
    margin-bottom: 1rem;
  }
#phieu-kham-benh .container__title--main {
    font-weight: 700;
    font-size: 15px;
    line-height: 14px;
  }
#phieu-kham-benh .container__ttbn--wrapper div {
    margin: 4px 0 0 0;
  }
#phieu-kham-benh .container-wrapper-flex {
    display: flex;
    flex-direction: row;
    width: 100%;
  }

  #phieu-kham-benh .container-wrapper-flex .col-3{
    width: 30%;
  }

  #phieu-kham-benh .container-wrapper-flex .col-4{
    width: 40%;
  }

  #phieu-kham-benh .thongtin-khambenh {
    width: 100%;
    display: flex;
    margin-top: 12px;
  }

  #phieu-kham-benh .thongtin-khambenh .left {
    width: 65%;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
  }

  #phieu-kham-benh .thongtin-khambenh .right {
    width: 35%;
  }

  #phieu-kham-benh .table-border {
    padding: 6px 0;
    border: 1px solid #000;
  }

  #phieu-kham-benh .table-item{
    padding-left:12px;
  }

  #phieu-kham-benh hr.solid {
    border-top: 1px solid #000;
  }

  #phieu-kham-benh .footer {
    display: flex;
    width: 100%;
    justify-content: flex-end;
  }

  #phieu-kham-benh .footer .footer-confirm {
    margin-right: 44px;
    text-align: center;
  }

  #phieu-kham-benh .name-space {
    height: 50px;
  }

  #phieu-kham-benh .txt-size-m{
    font-size: 14px;
  }

  #phieu-kham-benh .upperTxt{
    text-transform: uppercase;
  }

@media print {
#phieu-kham-benh .foot-break { break-inside: avoid; }
}
`;

const PhieuThongTinKhamBenh = ({ data }) => {
  const userProfile = useSelector((state) => state.auth.user);
  let { benh_nhan, chi_so_sinh_ton, hospital, bao_hiem, tom_tat_kham } = data;

  // let ma_benh_kem_theo = Array.isArray(tom_tat_kham.ma_benh_kem_theo)
  //   ? tom_tat_kham.ma_benh_kem_theo.map((item) => [item.ma_benh, item.ten_benh].join(" - ")).join("; ")
  //   : "";
  //
  // let ma_benh_chinh = Array.isArray(tom_tat_kham.ma_benh_chinh)
  // ? tom_tat_kham.ma_benh_chinh.map((item) => [item.ma_benh, item.ten_benh].join(" - ")).join("; ")
  // : "";

  const getBenh = (arr_icd , arr_yhct) => {
    let arr_ten_icd = []
    let arr_ten_yhct = []
    if (arr_icd && Array.isArray(arr_icd) && arr_icd.length > 0) {
      arr_ten_icd = arr_icd.map(item => item.ma_benh ? `${item.ma_benh} - ${item.ten_benh}` : `${item.ten_benh}`)
    }
    if (arr_yhct && Array.isArray(arr_yhct) && arr_yhct.length > 0) {
      arr_ten_yhct = arr_yhct.map(item => item.ma_benh ? `${item.ma_benh} - ${item.ten_benh}` : `${item.ten_benh}`)
    }
    return arr_ten_icd.concat(arr_ten_yhct).join(" ; ")
  }
  let imageUrl = getImageFromSever(userProfile.benh_vien.ANH_DAI_DIEN);

  const convertLoai = (arr, type) => {
    let data = [];
    if (Array.isArray(arr)) {
      data = arr
        .map((item) => {
          if (item.PHAN_LOAI === type) {
            return item.TEN_DV;
          }
        })
        .filter((item) => !!item)
        .join(", ");
    }

    if (!data.length) {
      data = "";
    }
    return data;
  };

  const convertKetQua = (arr, type) => {
    let data = [];
    if (Array.isArray(arr)) {
      data = arr
        .map((item) => {
          if (item.PHAN_LOAI === type) {
            return item.KET_QUA;
          }
        })
        .filter((item) => !!item)
        .join(", ");
    }

    if (!data.length) {
      data = "";
    }
    return data;
  }

  //hiển thị ngày tái khám
  const ngayTaiKham = (tom_tat_kham) => {
    let result = "";
    let {ngay_tai_kham, loai_tai_kham, tai_kham_sau} = tom_tat_kham;
    if(!ngay_tai_kham || ngay_tai_kham === "") { //nếu không có ngày tái khám
      return result;
    }
    let txtTuan = i18n.t(languageKeys.data_Tuan);
    let txtThu = "";
    if(loai_tai_kham === "NGAY") {
      txtTuan = i18n.t(languageKeys.data_Ngay);
    } else if(loai_tai_kham === "THANG") {
      txtTuan = i18n.t(languageKeys.data_Thang);
    }
    txtThu = getWeekdays(moment(ngay_tai_kham, "YYYYMMDD").valueOf()) + " " + i18n.t(languageKeys.data_Ngay).toLowerCase() 
    + " "  + convertDateToValue(ngay_tai_kham);
    result = i18n.t(languageKeys.field_Tai_kham_sau) + " " + tai_kham_sau + " " + txtTuan.toLowerCase() 
    + ", " + txtThu;

    return result;
  }

  let ds_ten_loai_chi_dinh_xn = convertLoai(data.ds_dv_cls, "XET_NGHIEM");

  let ds_ten_loai_chi_dinh_cdha = convertLoai(data.ds_dv_cls, "CDHA");

  let ds_ket_qua_xn = convertKetQua(data.ds_dv_cls, "XET_NGHIEM");
  let ds_ket_qua_cdha = convertKetQua(data.ds_dv_cls, "CDHA");
  return (
    <div id="phieu-kham-benh">
      <div className="header">
        {!!imageUrl && (
          <div className="img-header">
            <img className="logo" src={imageUrl} alt="" />
          </div>
        )}
        <div className="content-header">
          <h2 style={{ margin: 0, fontSize:15 }} className="upperTxt">
            {userProfile?.benh_vien?.TEN_CSKCB}
          </h2>
          <div>
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
      </div>
      <div className="container">
        <div className="container-title">{i18n.t(languageKeys.title_phieu_bao_cao_y_te)?.toUpperCase()}</div>
        <div className="container__chapter--1">
          <div className="container__title--main">I. {i18n.t(languageKeys.field_Thong_tin_hanh_chinh)?.toUpperCase()}</div>
          <div className="container__ttbn--wrapper">
            <div className="container-wrapper-flex">
              <div className="col-3">
                <div>
                {i18n.t(languageKeys.field_Ma_benh_nhan)}: <span className="txt-700 txt-size-m">{convertString(benh_nhan.ma_benh_nhan)}</span>
                </div>
                <div>{i18n.t(languageKeys.field_Gioi_tinh)}: {getSexFromString(benh_nhan.gioi_tinh)}</div>
              </div>
              <div className="col-4">
                <div>
                {i18n.t(languageKeys.ten_benh_nhan)}: <span className="txt-700 txt-size-m"> {convertString(benh_nhan.ten_benh_nhan)?.toUpperCase()} </span>
                </div>
                <div>{i18n.t(languageKeys.field_Doi_tuong)}: {convertString(benh_nhan.doi_tuong)}</div>
              </div>
              <div className="col-3">
                <div>
                  {benh_nhan.ngay_sinh.trim().length > 4 ? i18n.t(languageKeys.field_Ngay_sinh) : i18n.t(languageKeys.field_Nam_sinh)}: {(benh_nhan.ngay_sinh)}
                </div>
                <div>
                {i18n.t(languageKeys.field_So_dien_thoai)}: <span className="txt-700">{convertString(benh_nhan.sdt)}</span>
                </div>
              </div>
            </div>
          </div>
          <div className="dia-chi">{i18n.t(languageKeys.dia_chi)}: {convertString(benh_nhan.dia_chi)}</div>
          <div>{i18n.t(languageKeys.khoa_phong)}: {convertString(tom_tat_kham.ten_phong)}</div>
          <div>
            <span className="txt-700">{i18n.t(languageKeys.chan_doan_so_bo)}: </span> {tom_tat_kham.chan_doan_lam_sang}
          </div>
        </div>

        <div className="thongtin-khambenh">
          <div className="left">
            <div className="container__title--main">I. {i18n.t(languageKeys.thong_tin_kham_benh)?.toUpperCase()}</div>
            <div>
              <span className="txt-700"> 1. {i18n.t(languageKeys.field_Ly_do_kham)}: </span> {tom_tat_kham.ly_do_kham}
            </div>
            <div>
              <span className="txt-700"> 2. {i18n.t(languageKeys.field_Qua_trinh_benh_ly)}: </span> {tom_tat_kham.qua_trinh_benh_ly}
            </div>
            <div>
              <div className="txt-700"> 3. {i18n.t(languageKeys.tien_su_benh)}: </div>
              <ul style={{ margin: 0 }}>
                {!!tom_tat_kham.tien_su_ban_than && <li>{i18n.t(languageKeys.ban_than)} : {tom_tat_kham.tien_su_ban_than}</li>}
               {!!tom_tat_kham.tien_su_gia_dinh && <li>{i18n.t(languageKeys.gia_dinh)}: {tom_tat_kham.tien_su_gia_dinh}</li>}
              </ul>
            </div>
            <div className="container__title--main">II. {i18n.t(languageKeys.field_Kham_benh)?.toUpperCase()}</div>
          </div>

          <div className="right">
            <div className="table-border">
              <div className="table-item">{i18n.t(languageKeys.field_Mach)}: {convertString(chi_so_sinh_ton.mach)} {i18n.t(languageKeys.field_Lan_phut)}</div>
              <hr className="solid" />
              <div className="table-item">{i18n.t(languageKeys.field_Nhiet_do)}: {convertString(chi_so_sinh_ton.nhiet_do)} {i18n.t(languageKeys.field_Do_C)}</div>
              <hr className="solid" />
              <div className="table-item">
              {i18n.t(languageKeys.field_Huyet_ap)}:{" "}
                {!!chi_so_sinh_ton.huyet_ap && Array.isArray(chi_so_sinh_ton.huyet_ap)
                  ? ` ${convertString(chi_so_sinh_ton.huyet_ap[0])} / ${convertString(chi_so_sinh_ton.huyet_ap[1])}`
                  : ""}{" "}
                (mmHg)
              </div>
              <hr className="solid" />
              <div className="table-item">{i18n.t(languageKeys.field_Nhip_tho)}: {convertString(chi_so_sinh_ton.nhip_tho)} {i18n.t(languageKeys.field_Lan_phut)}</div>
              <hr className="solid" />
              <div className="table-item">{i18n.t(languageKeys.can_nang)}: {convertString(chi_so_sinh_ton.can_nang)} (Kg)</div>
              <hr className="solid" />
              <div className="table-item">{i18n.t(languageKeys.chieu_cao)}: {convertString(chi_so_sinh_ton.chieu_cao)} ( cm)</div>
            </div>
          </div>
        </div>

        <div style={{ marginTop: 12 }}>
          <span className="txt-700">1. {i18n.t(languageKeys.toan_than)}:</span>
          {tom_tat_kham.toan_than}
        </div>
        <div>
          <div > <span className="txt-700">2. {i18n.t(languageKeys.cac_bo_phan)}:{" "}</span> <span>{data.tom_tat_kham?.cac_bo_phan}</span></div>
          <ul style={{ margin: 0 }}>
            {!!tom_tat_kham.tuan_hoan&&(<li>{i18n.t(languageKeys.toan_than)}: {tom_tat_kham.tuan_hoan}</li>)}
            {!!tom_tat_kham.ho_hap && <li>{i18n.t(languageKeys.ho_hap)}: {tom_tat_kham.ho_hap}</li>}
            {!!tom_tat_kham.tieu_hoa && <li>{i18n.t(languageKeys.tieu_hoa)}: {tom_tat_kham.tieu_hoa}</li>}
            {!!tom_tat_kham.than_tiet_nieu && <li>{i18n.t(languageKeys.than_tiet_nieu)}: {tom_tat_kham.than_tiet_nieu}</li>}
            {!!tom_tat_kham.noi_tiet && <li>{i18n.t(languageKeys.noi_tiet)}: {tom_tat_kham.noi_tiet}</li>}
            {!!tom_tat_kham.co_xuong_khop && <li>{i18n.t(languageKeys.co_xuong_khop)}: {tom_tat_kham.co_xuong_khop}</li>}
            {!!tom_tat_kham.than_kinh && <li>{i18n.t(languageKeys.than_kinh)}: {tom_tat_kham.than_kinh}</li>}
          </ul>
        </div>
        <div>
          <div>
            <span className="txt-700">3. {i18n.t(languageKeys.chan_doan)}: </span>
            {getBenh(data.tom_tat_kham.ma_benh_chinh, data.tom_tat_kham.ma_benh_yhct_chinh)}
          </div>
        </div>
        <div>
          <div>
            <span className="txt-700">4. {i18n.t(languageKeys.field_Ma_benh_kem_theo)}: </span>
            {getBenh(data.tom_tat_kham.ma_benh_kem_theo, data.tom_tat_kham.ma_benh_yhct_kem_theo)}
          </div>
        </div>
        <div>
          <div>
            <div className="txt-700">5. {i18n.t(languageKeys.Chi_dinh_can_lam_sang)}:</div>
            <ul style={{ margin: 0 }}>
              {!!ds_ten_loai_chi_dinh_xn.length && <li>{i18n.t(languageKeys.xet_nghiem)}: {ds_ten_loai_chi_dinh_xn}</li>}
              {!!ds_ten_loai_chi_dinh_cdha.length && <li>{i18n.t(languageKeys.chan_doan_hinh_anh)}: {ds_ten_loai_chi_dinh_cdha}</li>}
            </ul>
            <ul>
            </ul>
          </div>
        </div>
        <div>
          <div>
            <div className="txt-700">6. {i18n.t(languageKeys.ket_qua_cls)}:</div>
            <ul style={{ margin: 0 }}>
              {!!ds_ket_qua_xn.length && <li>{i18n.t(languageKeys.xet_nghiem)}: {ds_ket_qua_xn}</li>}
              {!!ds_ket_qua_cdha.length && <li>{i18n.t(languageKeys.chan_doan_hinh_anh)}: {ds_ket_qua_cdha}</li>}
            </ul>
            <ul>
            </ul>
          </div>
        </div>
        <div>
          <div>
            <span className="txt-700">7. {i18n.t(languageKeys.xu_tri)}: </span>
            {tom_tat_kham.xu_tri && HUONG_XU_TRI[`${tom_tat_kham.xu_tri}`] ? HUONG_XU_TRI[`${tom_tat_kham.xu_tri}`] : ""}
          </div>
        </div>
        <div className="foot-break">
          <span className="txt-700">8. {i18n.t(languageKeys.loi_dan)}: </span>
          {tom_tat_kham.loi_dan}
        </div>
        <div className="foot-break">
          <span className="txt-700">9. {i18n.t(languageKeys.ngay_tai_kham)}: </span>
          {ngayTaiKham(tom_tat_kham)}
        </div>
      </div>
      <div className="footer">
        <div className="footer-confirm">
          {i18n.language === languages.tieng_viet ? (
            data?.ngay_tao ? <i>{data?.gio ? data.gio + ", " : ""}{data.ngay_tao}</i> :
            <i>
              {moment().format("HH:mm") + ", "}
              Ngày {moment().date()},tháng {moment().month() + 1}, năm {moment().year()}
            </i>
          ) : (
            <i> {moment().format("HH:mm , MMMM d, YYYY")}</i>
          )}
          <div className="txt-700">{i18n.t(languageKeys.field_Bac_si)}</div>
          <i>({i18n.t(languageKeys.ky_va_ghi_ro_ho_ten)})</i>
          <div className="name-space" />
          <div className="txt-700">{data.bac_si_ket_luan}</div>
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

export default PhieuThongTinKhamBenh;
