import React from "react";
import JsBarcode from "jsbarcode";
import moment from "moment";
import { useSelector } from "react-redux";
import { brands } from "../../../constants";
import { convertDateToValue, getImageFromSever, layDiaChi } from "../../../helpers";
import i18n, { languageKeys, languages } from "../../../i18n";
import { typeInDonThuoc } from "../../../constants/keys";
export const styleDonThuocNew = `
#pdf-don-thuoc * { font-size: 12px; line-height: 1.5em; font-family: "Times New Roman", Times, serif; }
#pdf-don-thuoc .logo { width: 60px; height: 60px; object-fit: contain; }
#pdf-don-thuoc .header { display: flex; gap: 10px; }
#pdf-don-thuoc .hospital-name { font-size: 15px; text-transform: uppercase; font-weight: bold; }
#pdf-don-thuoc .title { text-transform: uppercase; font-size: 16px; font-weight: bold; margin-top: 1rem; margin-bottom: 0.5rem; text-align: center; }
#pdf-don-thuoc .label { font-weight: bold; }

#pdf-don-thuoc .table {
    margin-block: 1rem;
    width: 100%;
}

#pdf-don-thuoc .table * {
    font-size: 0.8rem;
}

#pdf-don-thuoc .table,
.table th, 
.table td {
    border: 1px solid #181818;
    border-collapse: collapse;
    text-align: center;
}

#pdf-don-thuoc .table th,
.table td {
    padding: 5px 10px;
}

#pdf-don-thuoc .name-space {
  height: 50px;
}

#pdf-don-thuoc .table th {
    text-align: center;
}
#pdf-don-thuoc .container-title {
    font-weight: 700;
    font-size: 16px;
    line-height: 18px;
    text-align: center;
    text-transform: uppercase;
    margin-top: 1.5rem;
    margin-bottom: 1rem;
  }
#pdf-don-thuoc .container__title--main {
    font-weight: 700;
    font-size: 15px;
    line-height: 14px;
  }
#pdf-don-thuoc .container__ttbn--wrapper div {
    margin: 4px 0 0 0; 
  }
#pdf-don-thuoc .container-wrapper-flex {
    display: flex;
    flex-direction: row;
    width: 100%;
  }
  #pdf-don-thuoc .container-wrapper-flex .col-3{
    width: 30%;
  }

  #pdf-don-thuoc .container-wrapper-flex .col-4{
    width: 40%;
  }
  #pdf-don-thuoc .footer {
    display: flex;
    width: 100%;
    justify-content: space-between;
    margin-top: 10px;
  }
  #pdf-don-thuoc .footer .signature {
    margin-right: 44px;
    text-align: center;
  }

  #pdf-don-thuoc .txt-size-m {
    font-size: 14px;
  }

  #pdf-don-thuoc .tel {
    margin-right: 50px;
  }

  #pdf-don-thuoc .txt-700{
    font-weight:700;
  }
@media print {
    #pdf-don-thuoc .foot-break { break-inside: avoid; }
}
`;

const DonThuoc = ({ data = { benh_nhan: {}, dich_vu: [], hospital: {}, thuoc: [], IS_DON_TPCN: false }, rid }) => {
  const userProfile = useSelector((state) => state.auth.user);
  let imageUrl = getImageFromSever(userProfile.benh_vien.ANH_DAI_DIEN);

  let { chuan_doan_benh_chinh, chuan_doan_benh_phu } = data;

  const convertBenh = (arr) => {
    let result = "";

    if (Array.isArray(arr)) {
      result = arr.map((item) => (!!item.MA_ICD ? `${item?.MA_ICD} - ${item.ten_benh}` : `${item.ten_benh}`)).join(", ");
      if (typeof result !== "string") {
        result = "";
      }
    }
    return result;
  };

  let benhChinh = convertBenh(chuan_doan_benh_chinh);
  let benhPhu = convertBenh(chuan_doan_benh_phu);

  React.useEffect(() => {
    if (!!rid && !!data.benh_nhan.ma_dinh_danh) {
      JsBarcode(`#barcode-${rid}`)
        .options({ font: "OCR-B" })
        .CODE128(data.benh_nhan.ma_dinh_danh, {
          fontSize: 13,
          width: 1.3,
          height: 60,
          textMargin: 0,
        })
        .render();
    }
  }, [data.benh_nhan.ma_benh_nhan, rid]);

  return (
    <div id="pdf-don-thuoc">
      <div>
        <div className="header">
          {!!imageUrl && (
            <div className="img-header">
              <img className="logo" src={imageUrl} alt="" />
            </div>
          )}
          <div>
            <div className="hospital-name txt-size-m">{userProfile.benh_vien.TEN_CSKCB}</div>

            <div>
              {" "}
              {i18n.t(languageKeys.dia_chi)}: {layDiaChi(userProfile.benh_vien)}
            </div>
            <div style={{ display: "flex" }}>
              <div className="tel">
                <span className="txt-700"> Tel: </span> {userProfile.benh_vien.SO_DIEN_THOAI}
              </div>
              <div>
                <span className="txt-700">Email:</span> {userProfile.benh_vien.EMAIL}
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="body">
        <div id="don-thuoc">
          <div className="title">{i18n.t(!data.IS_DON_TPCN ? languageKeys.don_thuoc_dich_vu : languageKeys.phieu_tu_van)}</div>

          <div className="container__ttbn--wrapper">
            <div className="container-wrapper-flex">
              <div className="col-3">
                <div>
                  {i18n.t(languageKeys.ma_benh_nhan)}: <span className="txt-700 txt-size-m">{data.benh_nhan?.ma_dinh_danh}</span>
                </div>
                <div>
                  {i18n.t(languageKeys.field_Gioi_tinh)}: {data.benh_nhan?.gioi_tinh}
                </div>
                <div>
                  {i18n.t(languageKeys.khoa)}: {data.ten_khoa || ""}
                </div>
              </div>
              <div className="col-4">
                <div>
                  {i18n.t(languageKeys.ten_benh_nhan)}: <span className="txt-700 txt-size-m"> {data.benh_nhan?.ho_ten}</span>
                </div>
                <div>
                  {i18n.t(languageKeys.field_Doi_tuong)}: {data.benh_nhan?.doi_tuong}
                </div>
                <div>
                  {i18n.t(languageKeys.phong)}: {data.ten_phong || ""}
                </div>
              </div>
              <div className="col-3">
                <div>
                  {i18n.t(languageKeys.field_Ngay_sinh)}: {(data.benh_nhan?.ngay_sinh?.length > 4) ? moment(data.benh_nhan?.ngay_sinh).format("DD/MM/YYYY") : data.benh_nhan?.ngay_sinh}
                </div>
                <div>
                  {i18n.t(languageKeys.field_So_dien_thoai)}: <span className="txt-700">{data.benh_nhan.so_dien_thoai}</span>
                </div>
              </div>
            </div>
          </div>
          <div className="dia-chi" >
            {i18n.t(languageKeys.dia_chi)}: {data.benh_nhan.dia_chi}
          </div>
          <div>
            {i18n.t(languageKeys.chan_doan_chinh)}: {benhChinh}
          </div>
          <div>
            {i18n.t(languageKeys.chan_doan_phu)}: {benhPhu}
          </div>
          <table className="table">
            <thead>
              <tr>
                <th>{i18n.t(languageKeys.stt)}</th>
                <th style={{ textAlign: "start", width: "35%" }}>{i18n.t(languageKeys.field_Ten_thuoc)}</th>
                <th>ĐVT</th>
                <th>{i18n.t(languageKeys.sl)}</th>
                <th>{i18n.t(languageKeys.ngay_dung)}</th>
                <th style={{ textAlign: "start", width: "30%" }}>{i18n.t(languageKeys.chi_dan_dung_thuoc)}</th>
              </tr>
            </thead>
            <tbody>
              {data.thuoc.map((item, index) => (
                <>
                  <tr>
                    <td>{index + 1}</td>
                    <td style={{ textAlign: "start", width: "35%" }}>{`${item.Thuoc_HoatChat} (${item.Thuoc_Ten}) ${item.NONG_DO}`}</td>
                    <td>{item.Thuoc_Dvt}</td>
                    <td>{item.Thuoc_SL}</td>
                    <td>{item.SoNgaySD}</td>
                    <td style={{ textAlign: "start", width: "20%", maxWidth: "25%" }}>{item.Chidan}</td>
                  </tr>
                </>
              ))}
            </tbody>
          </table>
          <div>
            {i18n.t(languageKeys.loi_dan_bac_sy)}: <span>{data?.loi_dan}</span>
          </div>
          <div className="txt-700">
            {i18n.t(languageKeys.ngay_tai_kham)}: {convertDateToValue(data.ngay_tai_kham)}
          </div>

          <div className="footer">
            <div style={{ textAlign: "center" }}>
              <div className="txt-700">{i18n.t(languageKeys.field_Ma_don_thuoc)}</div>
              <div>
                <svg id={`barcode-${rid}`}></svg>
              </div>
            </div>
            <div className="signature">
              {i18n.language === languages.tieng_viet ? (
                <i>
                  {moment().format("HH:mm") + ", "}
                  Ngày {moment().date()},tháng {moment().month() + 1}, năm {moment().year()}
                </i>
              ) : (
                <i> {moment().format("HH:mm , MMMM d, YYYY")}</i>
              )}
              <div className="txt-700">{i18n.t(languageKeys.field_Bac_si_ke_don)}</div>
              <i>({i18n.t(languageKeys.ky_va_ghi_ro_ho_ten)})</i>
              <div className="name-space"></div>
              <div className="txt-700">{data?.bac_si?.ho_ten}</div>
            </div>
          </div>

          <div>
            <i>* {i18n.t(languageKeys.kham_lai_xin_mang_theo_don)}</i>
          </div>

          <i>* {i18n.t(languageKeys.ten_bo_hoac_me_cua_tre)}</i>
        </div>
      </div>
    </div>
  );
};

export default DonThuoc;
