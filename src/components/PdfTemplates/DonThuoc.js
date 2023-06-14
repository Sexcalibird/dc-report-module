import moment from "moment";
import { useSelector } from "react-redux";
import { brands } from "../../constants";
import { docTenThuocTheoThongTu52, getImageFromSever, layDiaChi } from "../../helpers";
import i18n, { languageKeys, languages } from "../../i18n";

export const styleDonThuoc = `
#pdf-don-thuoc * { font-size: 1rem; line-height: 1.5em; font-family: "Times New Roman", Times, serif; }
#pdf-don-thuoc .logo { width: 60px; height: 60px; object-fit: contain; }
#pdf-don-thuoc .header { display: flex; gap: 10px; }
#pdf-don-thuoc .hospital-name { font-size: 1.2rem; text-transform: uppercase; font-weight: bold; }
#pdf-don-thuoc .title { text-transform: uppercase; font-size: 2rem; font-weight: bold; margin-top: 1rem; margin-bottom: 0.5rem; text-align: center; }
#pdf-don-thuoc .label { font-weight: bold; }
@media print {
    #pdf-don-thuoc .foot-break { break-inside: avoid; }
}
`;

const DonThuoc = ({ data = { benh_nhan: {}, dich_vu: [], hospital: {} }, rid }) => {
  const userProfile = useSelector((state) => state.auth.user);

  return (
    <div id="pdf-don-thuoc">
      <div>
        <div className="header">
        { data.hospital.avatar && <img src={getImageFromSever(data.hospital.avatar)} alt="" className="logo" /> }

          <div>
            <div className="hospital-name">{data.hospital.name}</div>

            <div>
              {" "}
              {i18n.t(languageKeys.dia_chi)}: {layDiaChi(userProfile.benh_vien)}
            </div>
          </div>
        </div>
      </div>

      <div className="title"> {i18n.t(languageKeys.Don_thuoc)}</div>

      <div className="body">
        <div className="wrapper">
          <div>
            <span className="label"> {i18n.t(languageKeys.ho_va_ten)}: </span>
            {data.benh_nhan.ho_ten}
          </div>

          <div style={{ display: "grid", gridTemplateColumns: "40% 60%" }}>
            <div>
              <span className="label"> {i18n.t(languageKeys.do_tuoi)}: </span>
              {data.benh_nhan.tuoi}
            </div>

            <div>
              <span className="label">{i18n.t(languageKeys.field_Gioi_tinh)}: </span>
              {data.benh_nhan.gioi_tinh}
            </div>
          </div>

          <div>
            <span className="label">{i18n.t(languageKeys.dia_chi)}: </span>

            {data.benh_nhan.dia_chi}
          </div>

          <div>
            <span className="label">{i18n.t(languageKeys.field_Chan_doan_benh_chinh)}: </span>

            {data.chuan_doan_benh_chinh.map((item, index) => (index !== 0 ? ", " : "") + item.ten_benh)}
          </div>
        </div>

        <div
          style={{
            borderTop: "1px solid #00000050",
            borderBottom: "1px solid #00000050",
            marginBlock: 10,
            paddingBlock: 10,
          }}
        >
          {data.thuoc.map((item, index) => (
            <div
              key={index}
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                gap: 10,
              }}
              className="foot-break"
            >
              <div>
                <div className="label" style={{ fontSize: "1.15rem" }}>
                  {index + 1}. {docTenThuocTheoThongTu52(item)}
                </div>

                <div>
                  <span className="label">{i18n.t(languageKeys.field_Cach_dung)}: </span>
                  {item.Chidan}
                </div>
              </div>

              <div style={{ fontSize: "1.1rem" }}>{item.Thuoc_SL + " " + item.Thuoc_Dvt}</div>
            </div>
          ))}
        </div>

        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
          }}
        >
          <div className="label">
            {i18n.t(languageKeys.cong_khoan)}: {data.thuoc.length}
          </div>
        </div>

        <div className="foot-break" style={{ marginBlock: 5 }}>
          <div className="label">{i18n.t(languageKeys.field_Loi_dan)}:</div>
          <div>{data.loi_dan}</div>
        </div>

        <div className="foot-break" style={{ marginTop: 20 }}>
          <div style={{ textAlign: "end", marginBottom: 10 }}>
          {i18n.language === languages.tieng_viet ?  <>Ngày {moment().date()}, tháng {moment().month() + 1}, năm {moment().year()}</> : <div>{moment().format('MMMM d, YYYY')}</div>}
          </div>

          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              gap: 20,
            }}
          >
            {userProfile.benh_vien.BRAND === brands.tmedical ? (
              <div style={{ textAlign: "center", marginLeft: 50 }}>
                <div className="label">{i18n.t(languageKeys.khach_hang)}</div>

                <i style={{ fontSize: "0.9rem" }}>({i18n.t(languageKeys.ky_va_ghi_ro_ho_ten)})</i>

                <div className="label" style={{ marginTop: 100 }}>
                  {data.benh_nhan.ho_ten}
                </div>
              </div>
            ) : (
              <div></div>
            )}

            <div style={{ textAlign: "center", marginRight: 50 }}>
              <div className="label">{i18n.t(languageKeys.field_Bac_si_ke_don)}</div>

              <i style={{ fontSize: "0.9rem" }}>({i18n.t(languageKeys.ky_va_ghi_ro_ho_ten)})</i>

              <div className="label" style={{ marginTop: 100 }}>
                {data.bac_si.ho_ten}
              </div>
            </div>
          </div>
        </div>

        <div style={{ marginTop: 20 }} className="foot-break">
          {!!data.ngay_tai_kham && <i style={{ fontSize: "0.9rem" }}>{i18n.t(languageKeys.kham_lai_theo_don_thuoc_nay)}</i>}

          {!!data.ngay_tai_kham && (
            <div
              style={{
                borderTop: "1px solid #00000025",
                marginTop: 10,
                paddingTop: 10,
              }}
            >
              <span className="label">{i18n.t(languageKeys.field_ngay_tai_kham)}: </span>
              {data.ngay_tai_kham}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default DonThuoc;
