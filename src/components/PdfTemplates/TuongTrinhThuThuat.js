import moment from "moment";
import { useSelector } from "react-redux";
import { getImageFromSever, getSexFromString, layDiaChi } from "../../helpers";
import i18n, { languageKeys, languages } from "../../i18n";
import { useEffect } from "react";
import JsBarcode from "jsbarcode";
import { formatDateOfBirth } from "helpers";
import { convertDateToValue } from "../../helpers";
import { danhSachGioiTinh } from "constants/data";

const TuongTrinhThuThuat = ({ data, rid = "" }) => {
  const userProfile = useSelector((state) => state.auth.user);
  const {
    patientInfo,
    TEN_KHOA_PHONG,
    GIO_BAT_DAU,
    NGAY_BAT_DAU,
    GIO_KET_THUC,
    NGAY_KET_THUC,
    MO_TA_CHI_TIET,
    CHAN_DOAN,
    PHUONG_PHAP_TT,
    CACH_THUC_TT,
    CHAN_DOAN_LAM_SANG,
    LOAI_TT,
    TT_VIEN_CHINH,
    TT_PHU_MOT,
    TT_PHU_HAI,
    TT_PHU_BA,
    GIUP_VIEC,
    DUNG_CU_VIEN,
    GM_CHINH,

    GM_PHU,

    TTTT_ID,
  } = data || {};
  const { BENH_NHAN_ID, HO, TEN, NGAY_SINH, GIOI_TINH } = patientInfo || {};
  console.log("data::", data);
  useEffect(() => {
    if (BENH_NHAN_ID) {
      JsBarcode(`#barcode-${rid}`)
        .options({ font: "OCR-B" })
        .CODE128(BENH_NHAN_ID, {
          fontSize: 16,
          width: 1.3,
          height: 60,
          textMargin: 0,
        })
        .render();
    }
  }, [BENH_NHAN_ID, rid]);

  return (
    <div id="tuong-trinh-tt">
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
          <svg id={`barcode-${rid}`}></svg>
        </div>
      </div>
      <div>
        <p
          style={{
            textAlign: "center",
            fontSize: "20px",
            fontWeight: 700,
          }}
        >
          PHIẾU TƯỜNG TRÌNH PHẪU THUẬT/ THỦ THUẬT
        </p>
      </div>
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
        <div className="info-name">
          Họ tên BN: <b>{HO + " " + TEN ?? ""}</b>
        </div>
        <div className="info-birth">
          {i18n.t(languageKeys.field_Ngay_sinh)} : <span>{formatDateOfBirth(NGAY_SINH) ?? ""}</span>
        </div>
        <div className="info-gender">
          {i18n.t(languageKeys.field_Gioi_tinh)} :{" "}
          <span
            style={{
              textTransform: "capitalize",
            }}
          >
            {getSexFromString(GIOI_TINH) ?? ""}
          </span>
        </div>
      </div>
      <div>
        Khoa: <b>{TEN_KHOA_PHONG ?? ""}</b>
      </div>
      <div>Khởi mê</div>
      <div
        style={{
          display: "flex",
          alignItems: "center",
        }}
      >
        <div>Phẫu thuât/thủ thuật lúc: {(GIO_BAT_DAU ?? "") + " " + convertDateToValue(NGAY_BAT_DAU) ?? ""}</div>
        <div style={{ marginLeft: 50 }}>Kết thúc lúc: {(GIO_KET_THUC ?? "") + " " + convertDateToValue(NGAY_KET_THUC) ?? ""}</div>
      </div>
      <div>
        Chẩn đoán trước phẫu thuật/thủ thuật: <b>{CHAN_DOAN_LAM_SANG ?? ""}</b>
      </div>
      <div>
        Chẩn đoán trước phẫu thuật/thủ thuật: <b>{CHAN_DOAN ?? ""}</b>
      </div>
      <div>
        Phương pháp phẫu thuật/thủ thuật: <b>{PHUONG_PHAP_TT ?? ""}</b>
      </div>
      <div>
        Loại phẫu thuật/thủ thuật: <b>{LOAI_TT ?? ""}</b>
      </div>
      <div>
        Phương pháp vô cảm: <b></b>
      </div>
      <div>
        Bác sĩ phẫu thuật/thủ thuât: <b>{TT_VIEN_CHINH ?? ""}</b>
      </div>
      <div>
        Phụ mổ: <b>{TT_PHU_MOT ?? ""}</b>
      </div>
      <div>
        DC Viên: <b>{DUNG_CU_VIEN}</b>
      </div>
      <div>
        Bác sĩ gây mê hồi sức/gây tê: <b>{GM_CHINH ?? ""}</b>
      </div>
      <div>
        Gây tê/ Gây mê phụ: <b>{GM_PHU ?? ""}</b>
      </div>
      <div>
        Giúp việc: <b>{GIUP_VIEC ?? ""}</b>
      </div>
      <table style={{ width: "100%" }}>
        <thead>
          <tr>
            <th
              style={{
                width: "50%",
              }}
            >
              <p style={{ fontWeight: 600 }}>Lược đồ</p>
            </th>
            <th
              style={{
                width: "50%",
              }}
            >
              <p style={{ fontWeight: 600 }}> Các bước tiến hành</p>
            </th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                }}
              >
                <img
                  style={{
                    height: "150px",
                    objectFit: "contain",
                  }}
                  src={getImageFromSever(TTTT_ID)}
                  alt=""
                />
              </div>
            </td>
            <td style={{ position: "relative" }}>
              <div
                style={{
                  padding: 5,
                }}
              >
                <p style={{ fontWeight: 600, position: "absolute", top: -10, left: 5 }}>Mô tả:</p>
                <p>{MO_TA_CHI_TIET}</p>
              </div>
            </td>
          </tr>
        </tbody>
      </table>
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "flex-end",
        }}
      >
        <i>
          {i18n.language === languages.tieng_viet ? (
            <>
              {moment().format("HH:mm")}, Ngày {moment().date()}, tháng {moment().month() + 1}, năm {moment().year()}
            </>
          ) : (
            <div style={{ marginLeft: "-55%" }}>{moment().format("MMMM d, YYYY")}</div>
          )}
        </i>

        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <div>
            <b>Phẫu thuật/ thủ thuật viên chính</b>
          </div>
          <i>({i18n.t(languageKeys.ky_va_ghi_ro_ho_ten)})</i>
          {/* <div style={{ marginTop: 80, fontWeight: "bold" }}>{getFullName(userProfile)}</div> */}
          <div style={{ marginTop: 80, fontWeight: "bold" }}>{TT_VIEN_CHINH}</div>
        </div>
      </div>
    </div>
  );
};

export const styleTuongTrinhTT = `
#tuong-trinh-tt * {
  font-size: 1rem;
  line-height: 1.5em;
  font-family: "Times New Roman", Times, serif;
}

#tuong-trinh-tt .logo {
  width: 75px;
  height: 75px;
  object-fit: contain;
}

#tuong-trinh-tt .header {
  display: flex;
  flex-direction: row;
}

#tuong-trinh-tt .header-left {
  display: flex;
  width: 60%;
  gap: 20px;
  flex-direction: row;
}

#tuong-trinh-tt .header-right {
  width: 40%;
  text-align: center;
}
#tuong-trinh-tt table, th, td {
  border: 1px solid black;
  border-collapse: collapse;
}
`;

export default TuongTrinhThuThuat;
