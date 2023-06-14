import { memo } from "react";
import { useSelector } from "react-redux";
import { convertGender, convertMillisecondToAgeNotT, convertValueToMilisecond, getFullName, getImageFromSever } from "../../../helpers";
import i18n, { languageKeys, languages } from "../../../i18n";
import moment from "moment";

export const stylePhieuTraKqPdf = `
#phieu-container * {
    font-size: 1rem;
    line-height: 1.5em;
    font-family: "Times New Roman", Times, serif;
}

#phieu-container .logo {
    width: 75px;
    height: 75px;
    object-fit: contain;
}

#phieu-container .header {
    display: flex;
    gap: 20px;
    flex-direction: row;
}

#phieu-container .row-infomation {
    display: flex;
    flex-direction: row;
    gap: 10px;
    // justify-content: space-between;
    width : 100%
}

#phieu-container .hospital-name {
    text-transform: uppercase;
    font-weight: bold;
}

#phieu-container .thong-tin-phieu {
    display: flex;
}

#phieu-container .title {
    text-transform: uppercase;
    font-size: 18px;
    font-weight: bold;
    margin-top: 1.5rem;
    margin-bottom: 1rem;
    text-align: center;
    line-height: 32px;
    margin-top: 20px;
}
#phieu-container .title-info {
    font-style: normal;
    font-weight: 700;
    font-size: 12px;
    line-height: 13px;
}

#phieu-container .footer{
    margin-top:16px;
    text-align : center;
}

#phieu-container .title-footer {
    font-style: normal;
    font-weight: 700;
    font-size: 15px;
    line-height: 17px;
    text-align: center;
    text-transform: uppercase;
    color: #333333;
    margin-top : 10px
}
#phieu-container .date-footer {
    font-style: normal;
    font-weight: 400;
    font-size: 14px;
    line-height: 14px;
}

#phieu-container .row-anh{
    position: relative;
    display:flex;
    flex-direction:row;
    flex-wrap:wrap;
    justify-content:space-between;
    width:100%;
    height:100%;
}


#phieu-container .ket-luan-content{
    margin: 6px 0;
    font-size:14px;
}

#phieu-container .horizontal_dotted_line {
    border-bottom: 1px dotted black;
    width: 100%;
    margin:24px 0 14px 0;
}

#phieu-container .title-content{
    font-weight:700;
    font-size:14px;
}

#phieu-container .maumota-content{
    font-size:14px !important;
    h1,h2,h3,h4,h5{
        margin:0 !important;
    }
    table{
        page-break-before:none !important;
    }

}

#phieu-container .maumota-content > ul {
  margin:0px !important;
}

#phieu-container .maumota-content > p {
  margin: 0px !important;
  margin-bottom:0px !important;
  margin-top:0px !important;
}
#phieu-container .maumota-content > li {
  margin: 0px !important;
  margin-bottom:0px !important;
}

#phieu-container .image-kl{
    display:block;
    height:100%;
    align-items:center;
    align-self:flex-end;
}

#phieu-container .img-ket-qua{
    max-height:25vw;
    max-width:31vw;
    object-fit:contain;
}

#phieu-container .between-row{
    justify-content: space-between;
}

#phieu-container .evenly-row{
    justify-content: space-evenly;
}

#phieu-container table{
    border : none;
}
#phieu-container .bold-txt {
  font-weight: bold;
}

#phieu-container .info-group {
  display: flex;
  flex-direction: column;
  gap:2px;
  font-size: 12px;
}

#phieu-container .row-group_patient-info {
  display:flex;
}

.row-group-2 {
  width:50%;
}

.row-group-3 {
  width:25%;
}

@media print {
    #phieu-container .foot-break { break-inside: avoid; }
}
`;
const PhieuTraKetQua = ({ data }) => {
  const userProfile = useSelector((state) => state.auth.user);
  const renderKetLuan = () => {
    let arr = [];
    if (data.ket_luan) {
      arr = data.ket_luan.split("\n")

    }
    return(
      <ul style={{listStyle : "none",margin:0}}>
        {arr.map((item, index) => <li style={{margin:0}}> - {item}</li>)}
      </ul>
    )
  }


  console.log('dataaa', data);

  const genDate = () => {

    let date = data.NGAY_TRA_KET_QUA
    
    if(i18n.language === languages.tieng_viet) {
      return <>Ngày {date?.slice(date.length - 2)} Tháng { date?.slice(4,6) } Năm {date?.slice(0,4)}</>
    } else {
      return  new Date(moment(date,'YYYYMMDD')).toDateString();
    }
  }
  return (
    <div id="phieu-container">
      <div className="header">
        {userProfile.benh_vien.ANH_DAI_DIEN && <img className="logo" alt="" src={getImageFromSever(userProfile.benh_vien.ANH_DAI_DIEN)} />}
        <div>
          <div className="hospital-name">{userProfile.benh_vien.TEN_CSKCB}</div>
          <div>
            {i18n.t(languageKeys.dia_chi)} : {layDiaChi(userProfile.benh_vien)}
          </div>
          <div className="row-infomation">
            <div>
              {i18n.t(languageKeys.dien_thoai)}: {userProfile.benh_vien.SO_DIEN_THOAI || ""}
            </div>
          </div>
        </div>
      </div>

      <div className="title">{data.TEN_PHIEU || ""}</div>
      <div className="info-group">
        <div className="row-group_patient-info">
          <div className="row-group-2" >{i18n.t(languageKeys.ho_va_ten)} : <span>{data.TEN || ""}</span></div>
          <div className="row-group-3" ><span >{i18n.t(languageKeys.field_Tuoi)}: </span> <span>{!!data.NGAY_SINH && convertMillisecondToAgeNotT(convertValueToMilisecond(data.NGAY_SINH.length < 5 ? `${data.NGAY_SINH}0101` : data.NGAY_SINH))}</span></div>
          <div className="row-group-3" ><span >{i18n.t(languageKeys.field_Gioi_tinh)}: </span><span> {convertGender(data.GIOI_TINH)}</span></div>
        </div>
        <div className="row-group_patient-info">
          <div className="row-group-2"><span >{i18n.t(languageKeys.dia_chi)}: </span> <span>{data.DIA_CHI_CHI_TIET || ""}</span></div>
          <div className="row-group-2"><span >{i18n.t(languageKeys.field_So_dien_thoai)}: </span> <span>{data.SO_DIEN_THOAI}</span></div>

        </div>
      </div>

      <div>
        <span>{i18n.t(languageKeys.field_Bac_si_chi_dinh)} : </span> {data.BAC_SI || ""}
      </div>

      <div>
        <span>{i18n.t(languageKeys.field_Chan_doan_lam_sang)} : </span> {data.CHAN_DOAN_LAM_SANG || ""}
      </div>

      <div>
        <span>{i18n.t(languageKeys.field_Dich_vu_chi_dinh)} : </span> {data.KY_THUAT_CHI_DINH || ""}
      </div>

      <div className="title-content" style={{ textDecoration: "underline" }}>
        {i18n.t(languageKeys.field_Ket_qua).toUpperCase()}:
      </div>
      <div dangerouslySetInnerHTML={{ __html: data.maumota }} className="maumota-content" />
      <div className="title-content" style={{ textDecoration: "underline" }}>
        {i18n.t(languageKeys.field_ket_luan).toUpperCase()}:
      </div>
      <div className="ket-luan-content">{renderKetLuan()}</div>
      <div className="horizontal_dotted_line"></div>

      {/* {data?.arr_anh_ID?.length < 3 ? (
        <div className="row-anh foot-break evenly-row">
          {data?.arr_anh_ID?.map((item, index) => (
            <div className="image-kl">
              <img className="img-ket-qua" src={getImageFromSever(item)} alt={item} />
            </div>
          ))}
        </div>
      ) : (
        <div className="row-anh foot-break between-row">
          {data?.arr_anh_ID?.map((item, index) => (
            <div className="image-kl">
              <img className="img-ket-qua" src={getImageFromSever(item)} alt={item} />
            </div>
          ))}
        </div>
      )} */}

      <div style={{ display: "flex", justifyContent: "space-between", alignItems:"end" }} className="foot-break">
      <div className="footer">
        </div>
        <div className="footer">
          <div className="date-footer">{genDate()}</div>
          <div className="title-footer">{i18n.t(languageKeys.bac_si_phu_trach_kham)}</div>
          <div style={{ width: "100%", height: "80px" }}></div>
          <b style={{ fontSize: 14 }}>
            {i18n.t(languageKeys.field_Bac_si)}: {data.BAC_SI || ""}
          </b>
        </div>
      </div>
    </div>
  );
};
export default memo(PhieuTraKetQua);

export const layDiaChi = (benh_vien) => {
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
