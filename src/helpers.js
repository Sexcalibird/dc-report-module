import { apis, keys } from "./constants";
import cryptoRandomString from "crypto-random-string";
import axios from "axios";
import sha256 from "sha256";
import moment from "moment";
import * as XLSX from "xlsx";
import * as FileSaver from "file-saver";
import { notification } from "antd";
import i18n, { languageKeys } from "./i18n";
import apiServices from "./config/apiServices";
import { featureKeys } from "./constants/keys";
import * as _ from "lodash";
import {mainInstance} from "./services/apiInstances.js";

//hàm xử lí url để gọi đúng service
export function getUrlApi(stringUrl) {
  return stringUrl;
}

export const localGet = (key, fallback = "") => {
  const val = localStorage.getItem(key);
  if (!val || val === "undefined" || val === "") return fallback;
  return JSON.parse(val);
};

export const localSet = (key, val) => {
  HLog("Auth Saga setLocal key:", key, "with data", val);
  return localStorage.setItem(key, JSON.stringify(val));
};

export const localRemove = (key) => {
  return localStorage.removeItem(key);
};

// random id (default: 5 chữ cái)
export const rid = (length = 5, type) => cryptoRandomString({ length: length, type });

export function HLog() {
  if (apiServices.enable_app_log) {
    console.log.apply(this, arguments);
  }
}

HLog.render = (string) => {
  if (apiServices.enable_app_log) {
    console.log(`%cRender`, "color: #e7eb0a", string);
  }
};

// lấy url ảnh để Preview
export function getBase64(file) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result);
    reader.onerror = (error) => reject(error);
  });
}

//đổi millisecond sang date DD/mm/yyy
export function convertMillisecondToDate(duration, separator = "/", dateOnly = false) {
  if (duration == null || duration === "") {
    return "";
  }
  let outPut = "";
  duration = Number(duration);
  var isoFormat = new Date(duration);
  let year = isoFormat.getFullYear();
  let month = isoFormat.getUTCMonth() + 1;
  let date = isoFormat.getDate();
  if (month < 10) {
    month = "0" + month;
  }
  if (date < 10) {
    date = "0" + date;
  }
  if (dateOnly) {
    outPut = date + separator + month;
  } else {
    outPut = date + separator + month + separator + year;
  }
  return outPut;
}

// đổi milisecond sang giờ
export function convertTimeUTCToTime(time) {
  let date = new Date();
  date.setUTCHours(Number(time.split(":")[0]));
  date.setUTCMinutes(Number(time.split(":")[1]));
  let hours = date.getHours();
  let minutes = date.getMinutes();
  hours = hours < 10 ? "0" + hours : hours;
  minutes = minutes < 10 ? "0" + minutes : minutes;
  let result = hours + ":" + minutes;
  return result;
}

//đổi millisecond dạng UTC sang thời gian
export function convertMilliUTCToTime(duration) {
  if (duration == null || duration === "") return "";
  var minutes = parseInt((duration / (1000 * 60)) % 60),
    hours = parseInt((duration / (1000 * 60 * 60)) % 24);
  hours = hours < 10 ? "0" + hours : hours;
  minutes = minutes < 10 ? "0" + minutes : minutes;
  let time = hours + ":" + minutes;
  let result = convertTimeUTCToTime(time);
  return result;
}

// chuyển từ DD/MM/YYY sang MMMMYYDD
export const convertDateToValue = (dateString) => {
  if (dateString && dateString !== "") {
    let year = dateString.slice(0, 4);
    let moth = dateString.slice(4, 6);
    let date = dateString.slice(6, 8);
    return date + "/" + moth + "/" + year;
  }
  return "";
};

// chuyển từ MMMMYYDD sang DD//MM/YYY
export const convertValueToDate = (string) => {
  if (string && string !== "") {
    let arr = string.split("/");
    if (arr[1].length === 1) {
      arr[1] = "0" + arr[1];
    }
    if (arr[0].length === 1) {
      arr[0] = "0" + arr[0];
    }
    return arr[2] + arr[1] + arr[0];
  }
};

// chuyển từ MMMMYYDD sang YYYY
export const convertValueToYear = (dateString) => {
  if (dateString && dateString !== "") {
    let year = dateString.slice(0, 4);
    return year;
  }
  return "";
};

// chuyển từ MMMMYYDD sang DD//MM/YYY
export const convertValueToMilisecond = (string) => {
  let milisecond;
  if (string && string !== "") {
    let year = string.slice(0, 4);
    let moth = string.slice(4, 6);
    let date = string.slice(6, 8);
    milisecond = new Date(year, moth, date).getTime();
  }
  return milisecond;
};

//hàm format đơn vị tiền tệ thêm 3 số 0 vào cuối (isFull = false thì thêm .000)
export function formatCurrency(num, currency = "", isFull = false) {
  if (!num || num === "") {
    let response = "0 " + currency;
    return response;
  }
  num = Number(num);
  if (num === 0) {
    return "0 " + currency;
  }
  if (num.length === 2) {
    if (num === "00") {
      num = num.replace("00", "0");
    }
  }
  if (num.length > 1) {
    let first = num.substring(0, 1);
    if (first === "0") {
      num = num.substring(1, num.length);
    }
  }
  let result = num.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1.");
  if (!isFull) {
    result = result + ".000 ";
  }
  return result + currency;
}

//format định dạng giá khi thao tác ô input giá
export const formatNumberToPrice = (x, currency = "") => {
  //HLog("Helpers formatNumberToPrice before x: " + x + " currency: " + currency);
  if (!x || x === "" || x === 0) {
    return 0;
  }
  x = x.toString();
  x = x.replace(/ /g, "");
  var pattern = /(-?\d+)(\d{3})/;
  while (pattern.test(x)) x = x.replace(pattern, "$1.$2");
  if (typeof currency === "string") {
    x = currency !== "" ? x + " " + currency : x;
  }

  //HLog("Helpers formatNumberToPrice after x: " + x + " currency: " + currency);
  return x;
};

export const formatPriceToNumber = (x) => {
  try {
    x = x.toString();
    if (x === 0 || x === "") {
      return 0;
    }
    while (x.charAt(0) === 0 && x.length > 1) {
      x = x.substr(1);
    }
    x = x.replace(/ /g, "");
    return Number(x.replace(/[.]+/g, "").trim());
  } catch (error) {
    HLog(error);
  }
};

//hàm validate giá nhập vào và trả lại theo dạng 123.455.232
export const validatePriceInput = (input) => {
  if (!input) {
    return 0;
  }
  HLog("onchangePrice", input);
  input = input.replace(/[^0-9.]/g, "");
  input = formatPriceToNumber(input);
  input = formatNumberToPrice(input);
  HLog("new", input);
  return input;
};

export const encrypt256 = async (key) => {
  HLog("my key: " + key);
  try {
    const encrypted = await sha256(key);
    return encrypted;
  } catch (error) {
    HLog("cant encrypt key...", error);
    return null;
  }
};

//kiểm tra đối tượng object có rỗng hay không
export function isEmptyObject(obj) {
  return JSON.stringify(obj) === "{}";
}

//in hoa chữ cái đầu mỗi từ
export function capital_letter(str) {
  let result = "";
  if (str) {
    str = str.replace(/\s{2,}/g, " ");
    str = str.split(" ");
    // HLog(str);

    for (var i = 0, x = str.length; i < x; i++) {
      if (!!str[i][0]) {
        str[i] = str[i][0].toUpperCase() + str[i].substr(1);
      }
    }
    result = str.join(" ");
  }

  return result;
}

//hàm chuyển đổi firstName, lastName thành fullTime theo ngôn ngữ
export function getFullName(objectInfo) {
  // HLog("Utils getFullName objectInfo: " + JSON.stringify(objectInfo));
  if (objectInfo != null && !isEmptyObject(objectInfo)) {
    // let lang = getLocale();
    let firstName = objectInfo?.HO || "";
    let lastName = objectInfo?.TEN || "";
    let userName = capital_letter(firstName) + " " + capital_letter(lastName);
    return userName.trim();
  } else {
    return "";
  }
}

//hàm trả về tuổi của người dùng
export function convertMillisecondToAge(millisecond, format) {
  // Dành cho trường hợp giá trị đầu vào là dd/mm/yyyy @.@
  if (typeof millisecond === "string" && millisecond.includes("/")) {
    const arrNoSlash = millisecond.split("/");

    if ([...arrNoSlash].length === 3) {
      //millisecond = moment(millisecond, "DD/MM/YYYY").valueOf();
      millisecond = moment(millisecond, format).valueOf();
    }
  }

  if (moment(millisecond, "YYYYMMDD", true).isValid()) {
    millisecond = moment(millisecond, "YYYYMMDD").valueOf();
  }

  millisecond = Number(millisecond); // đổi input thành number

  // nếu milli = NaN hoặc milli = 0 thì return "--"
  if (isNaN(millisecond) || millisecond === 0) {
    return "--";
  }

  // đổi input (milli) về gap giữa hiện tại và input
  let duration = Math.floor(moment.duration(moment().diff(moment(millisecond))).asYears());

  // nếu gap > 0 thì trả về số tuổi (gap được làm tròn xuống)
  if (duration > 0) {
    return `${duration}T`;
  }
  // ngược lại thì trả về số tháng tuổi (gap cũng được làm tròn xuống)
  else {
    duration = Math.ceil(moment.duration(moment().diff(moment(millisecond))).asMonths());
    return `${duration} tháng`;
  }
}

//hàm trả về tuổi của người dùng
export function convertMillisecondToAgeNotT(millisecond, format) {
  // Dành cho trường hợp giá trị đầu vào là dd/mm/yyyy @.@
  if (typeof millisecond === "string" && millisecond.includes("/")) {
    const arrNoSlash = millisecond.split("/");

    if ([...arrNoSlash].length === 3) {
      //millisecond = moment(millisecond, "DD/MM/YYYY").valueOf();
      millisecond = moment(millisecond, format).valueOf();
    }
  }

  millisecond = Number(millisecond); // đổi input thành number

  // nếu milli = NaN hoặc milli = 0 thì return "--"
  if (isNaN(millisecond) || millisecond === 0) {
    return "--";
  }

  // đổi input (milli) về gap giữa hiện tại và input
  let duration = Math.floor(moment.duration(moment().diff(moment(millisecond))).asYears());

  // nếu gap > 0 thì trả về số tuổi (gap được làm tròn xuống)
  if (duration > 0) {
    return `${duration}`;
  }
  // ngược lại thì trả về số tháng tuổi (gap cũng được làm tròn xuống)
  else {
    duration = Math.ceil(moment.duration(moment().diff(moment(millisecond))).asMonths());
    return `${duration} tháng`;
  }
}

export const common_post = async (url, body) => {
  try {
    const response = await mainInstance.post(url, body);

    let result = response.data;
    return result;
  } catch (error) {
    HLog(error.message);

    if (error.message.includes("timeout")) {
      notification.error({
        message: i18n.t(languageKeys.app_loi_ket_noi),
        placement: "bottomLeft",
      });
    }

    return null;
  }
};

// lay gioi tinh
export function getSex(value) {
  let str_return = "";
  if (!value || value === 0 || value === "0") {
    //str_return = t(languageKeys.PSO__MODAL_DETAIL__SEX_FEMALE);
    str_return = i18n.t(languageKeys.gioi_tinh_Nu);
  } else if (value === 1 || value === "1") {
    // str_return = t(languageKeys.PSO__MODAL_DETAIL__SEX_MALE);
    str_return = i18n.t(languageKeys.gioi_tinh_Nam);
  } else if (value === 2) {
    // str_return = t(languageKeys.PSO__MODAL_DETAIL__SEX_OTHER);
    str_return = i18n.t(languageKeys.gioi_tinh_Khac);
  }
  return str_return;
}

// lay gioi tinh
export function getSexFromString(value) {
  switch (value) {
    case "nam":
      return i18n.t(languageKeys.gioi_tinh_Nam);
    case "nu":
      return i18n.t(languageKeys.gioi_tinh_Nu);
    default:
      return i18n.t(languageKeys.gioi_tinh_Khac);
  }
}

// hàm lấy danh sách tỉnh thành
export const getAllProvinces = async () => {
  const response = await axios.get("https://api.deepcare.vn/address/getAllProvince");

  const { status, data } = response.data;

  if (status === "OK") {
    return data;
  }

  return [];
};

// hàm lấy danh sách quận huyện
export const getAllDistricts = async (code) => {
  const response = await axios.post("https://api.deepcare.vn/address/searchByCode", {
    address_type: 1,
    code: code,
  });
  const { status, data } = response.data;

  if (status === "OK") {
    return data;
  }

  return [];
};

// hàm lấy danh sách xã phường
export const getAllWards = async (code) => {
  const response = await axios.post("https://api.deepcare.vn/address/searchByCode", {
    address_type: 2,
    code: code,
  });

  const { status, data } = response.data;

  if (status === "OK") {
    return data;
  }

  return [];
};

//hàm lấy thời gian hiển thị cho cuộc hẹn tùy theo type cuộc hẹn
export function getTimeScheduleByType(record) {
  if (!record || !record.schedule_type) {
    return "";
  }

  if (record.schedule_type === keys.section) {
    return convertMilliSlotToTime(record.gio_bat_dau) + " - " + convertMilliSlotToTime(record.gio_ket_thuc);
  } else {
    return convertMilliSlotToTime(record.gio_kham);
  }
}

//hàm đổi thời gian khám millisecond UTC sang thời gian hiện tại
export function convertMilliSlotToTime(milli) {
  if (milli === null || milli === undefined || milli === "") {
    return;
  }
  if (typeof milli == "string") {
    return milli;
  }
  let duration = Number(milli);
  var //   milliseconds = Number((duration % 1000) / 100),
    //     seconds = Number((duration / 1000) % 60),
    minutes = Number((duration / (1000 * 60)) % 60),
    hours = Number((duration / (1000 * 60 * 60)) % 24);

  let newhours = hours < 10 ? "0" + hours : hours;
  let newminutes = minutes < 10 ? "0" + minutes : minutes;
  //   let newseconds = seconds < 10 ? "0" + seconds : seconds;
  let times = newhours + ":" + newminutes;
  return convertTimeUTCToTime(times);
}

//lấy ký tự đầu tiên của học hàm, học vị bác sĩ
export function getEducation(item) {
  if (item == null || isEmptyObject(item)) {
    return "";
  }
  let education = "";
  let academic_rank_name = item.academic_rank_name;
  let degree_name = item.degree_name;
  //học hàm giáo sư, phó giáo sư, tiến sĩ
  if (academic_rank_name != null && academic_rank_name !== "") {
    education = getFirstCharactor(academic_rank_name);
  }
  //học vị, thạc sĩ, bác sĩ...
  if (degree_name != null && degree_name !== "") {
    let result = getFirstCharactor(degree_name);
    if (degree_name.includes("Thạc")) {
      result = "ThS";
    } else if (degree_name.includes("Cử nhân")) {
      result = "BS";
    }
    if (education !== "") {
      education = education + "." + result;
    } else education = result;
  }
  if (education === "") {
    return "BS";
  }
  return education;
}

//lấy ký tự đầu tiên của học hàm, học vị
function getFirstCharactor(txtCharactor) {
  let result = "";
  let arrCharactor = txtCharactor.toLocaleUpperCase().split(" ");
  for (let i = 0; i < arrCharactor.length; i++) {
    let text = arrCharactor[i];
    //nếu là bác sĩ chuyên khoa 2
    if (text === "II") {
      return "BS.CKII";
    } else if (text === "I") {
      //nếu là bác sĩ chuyên khoa 1
      return "BS.CKI";
    }
    result = result + (text ? text.charAt(0).toUpperCase() : "");
  }
  return result;
}

//lấy ra millisecond thời gian theo giờ GMT
export function getTimeMillisecondUTC() {
  let date = new Date();
  let formatdateUTC = date.toUTCString();
  let output = new Date(formatdateUTC).getTime();
  return output;
}

// hàm đọc file excel
export const readExcel = (file, onOk = () => {}) => {
  const promise = new Promise((resolve, reject) => {
    const fileReader = new FileReader();
    fileReader.readAsArrayBuffer(file);

    fileReader.onload = (e) => {
      const bufferArray = e.target.result;

      const wb = XLSX.read(bufferArray, { type: "buffer" });

      const wsname = wb.SheetNames[0];

      const ws = wb.Sheets[wsname];

      const data = XLSX.utils.sheet_to_json(ws);

      resolve(data);
    };

    fileReader.onerror = (error) => {
      reject(error);
    };
  });

  promise.then((d) => {
    HLog("excel data", d);
    onOk(d);
  });
};

export const exportToCSV = async (csvData = [], fileName = "data", offsetRow = 0) => {
  try {
    const fileType = "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8";

    const fileExtension = ".xlsx";

    const ws = XLSX.utils.json_to_sheet(csvData);

    let offColumns = [];

    if (csvData.length > 0) {
      const firstData = csvData[0];
      const keyLength = Object.keys(firstData).length;
      offColumns = new Array(keyLength).fill(null).map(() => [""]);
    }

    XLSX.utils.sheet_add_aoa(
      ws,
      new Array(offsetRow).fill(null).map(() => offColumns),
      { origin: 0 }
    );

    let wb = { Sheets: { data: ws }, SheetNames: ["data"] };

    const excelBuffer = await XLSX.write(wb, {
      bookType: "xlsx",
      type: "array",
    });

    const data = new Blob([excelBuffer], { type: fileType });

    FileSaver.saveAs(data, fileName + fileExtension);
  } catch (error) {
    HLog("[ERROR] export csv error");
  }
};


export const getImageFromSever = (ID) => {
  if (ID && ID !== "") {
    return `${apiServices.GATEWAY_CIS}public/file?ID=${ID}`;
  }
  return "";
};

export const beforeUpload = (file) => {
  const isImage = file.type.indexOf("image/") === 0;
  if (!isImage) {
    notification.error({
      message: i18n.t(languageKeys.noti_Chi_duoc_upload_anh),
    });
  }

  const isLt5M = file.size / 1024 / 1024 < 5;
  if (!isLt5M) {
    notification.error({
      message: i18n.t(languageKeys.noti_Kich_thuoc_anh_be_hon_5mb),
    });
  }
  return isImage && isLt5M;
};
export function isJsonString(str) {
  try {
    JSON.parse(str);
  } catch (e) {
    return false;
  }
  return true;
}

// xử lý lấy giá trị object
export function handleGetProperty(object, props, default_value, ignore_value) {
  let result = default_value;
  if (object) {
    result = object[`${props}`];
  }
  if (typeof result != "number" && typeof result != "boolean") {
    if (!result) {
      result = default_value;
    }
  }
  if (result === ignore_value) {
    return default_value;
  }

  return result;
}
//lấy ra thứ trong tuần
export function getWeekdays(strDate) {
  if (!strDate || strDate === "") {
    return "";
  }
  let result = "";
  let days = [
    i18n.t(languageKeys.chu_nhat),
    i18n.t(languageKeys.thu_2),
    i18n.t(languageKeys.thu_3),
    i18n.t(languageKeys.thu_4),
    i18n.t(languageKeys.thu_5),
    i18n.t(languageKeys.thu_6),
    i18n.t(languageKeys.thu_7),
  ];
  let date = new Date(parseInt(strDate));
  result = days[date.getDay()];

  return result;
}

export const getErrorMessage = (error_code, fallback = `ERROR: ${error_code}`, res = {}) => {
  if (!error_code) return fallback;

  switch (error_code.toString()) {
    case "001":
      return i18n.t(languageKeys.error_loi_ton_tai);
    case "002":
      return i18n.t(languageKeys.error_loi_khong_nhap_gia_tri);
    case "003":
      return i18n.t(languageKeys.error_gia_tri_khong_hop_le);
    case "004":
      return i18n.t(languageKeys.error_khong_trung_khop);
    case "paid_service":
    case "009":
      return i18n.t(languageKeys.error_dich_vu_da_thanh_toan);
    case "007":
      return i18n.t(languageKeys.error_Rang_buoc_ton_tai);
    case "008":
      return i18n.t(languageKeys.error_Khong_sua_duoc_lich_kham);
    case "012":
      return (
        i18n.t(languageKeys.error_loi_ton_tai) +
        ` ${i18n.t(languageKeys.error_body__at_column)} ${res.field} ${i18n.t(languageKeys.error_body__and_duplicate_value)} ${res.Dupllicate_value}`
      );
    case "015":
      return i18n.t(languageKeys.error_khong_the_khoa_phong_do_co_benh_nhan_cho_kham);
    default:
      return fallback;
  }
};

export const getDayName = (day) => {
  switch (day) {
    case 0:
      return i18n.t(languageKeys.data_Chu_nhat);
    case 1:
      return i18n.t(languageKeys.data_Thu_2);
    case 2:
      return i18n.t(languageKeys.data_Thu_3);
    case 3:
      return i18n.t(languageKeys.data_Thu_4);
    case 4:
      return i18n.t(languageKeys.data_Thu_5);
    case 5:
      return i18n.t(languageKeys.data_Thu_6);
    case 6:
      return i18n.t(languageKeys.data_Thu_7);
    default:
      return "";
  }
};

export const removeVietnameseTones = (str) => {
  str = str.replace(/à|á|ạ|ả|ã|â|ầ|ấ|ậ|ẩ|ẫ|ă|ằ|ắ|ặ|ẳ|ẵ/g, "a");
  str = str.replace(/è|é|ẹ|ẻ|ẽ|ê|ề|ế|ệ|ể|ễ/g, "e");
  str = str.replace(/ì|í|ị|ỉ|ĩ/g, "i");
  str = str.replace(/ò|ó|ọ|ỏ|õ|ô|ồ|ố|ộ|ổ|ỗ|ơ|ờ|ớ|ợ|ở|ỡ/g, "o");
  str = str.replace(/ù|ú|ụ|ủ|ũ|ư|ừ|ứ|ự|ử|ữ/g, "u");
  str = str.replace(/ỳ|ý|ỵ|ỷ|ỹ/g, "y");
  str = str.replace(/đ/g, "d");
  str = str.replace(/À|Á|Ạ|Ả|Ã|Â|Ầ|Ấ|Ậ|Ẩ|Ẫ|Ă|Ằ|Ắ|Ặ|Ẳ|Ẵ/g, "A");
  str = str.replace(/È|É|Ẹ|Ẻ|Ẽ|Ê|Ề|Ế|Ệ|Ể|Ễ/g, "E");
  str = str.replace(/Ì|Í|Ị|Ỉ|Ĩ/g, "I");
  str = str.replace(/Ò|Ó|Ọ|Ỏ|Õ|Ô|Ồ|Ố|Ộ|Ổ|Ỗ|Ơ|Ờ|Ớ|Ợ|Ở|Ỡ/g, "O");
  str = str.replace(/Ù|Ú|Ụ|Ủ|Ũ|Ư|Ừ|Ứ|Ự|Ử|Ữ/g, "U");
  str = str.replace(/Ỳ|Ý|Ỵ|Ỷ|Ỹ/g, "Y");
  str = str.replace(/Đ/g, "D");
  // Some system encode vietnamese combining accent as individual utf-8 characters
  // Một vài bộ encode coi các dấu mũ, dấu chữ như một kí tự riêng biệt nên thêm hai dòng này
  str = str.replace(/\u0300|\u0301|\u0303|\u0309|\u0323/g, ""); // ̀ ́ ̃ ̉ ̣  huyền, sắc, ngã, hỏi, nặng
  str = str.replace(/\u02C6|\u0306|\u031B/g, ""); // ˆ ̆ ̛  Â, Ê, Ă, Ơ, Ư
  // Remove extra spaces
  // Bỏ các khoảng trắng liền nhau
  str = str.replace(/ + /g, " ");
  str = str.trim();
  // Remove punctuations
  // Bỏ dấu câu, kí tự đặc biệt
  str = str.replace(/!|@|%|\^|\*|\(|\)|\+|\=|\<|\>|\?|\/|,|\.|\:|\;|\'|\"|\&|\#|\[|\]|~|\$|_|`|-|{|}|\||\\/g, " ");
  return str;
};

//function check quyền user
/* userProfile: thông tin người dùng chứa QUYEN
/* featureKey: key quyền cần check( định nghĩa trong file keys)
/* strict: có cần check chính xác key hay không hay chỉ cần include ( ví dụ key QL_NS.QL_TK chứa QL_TK)
*/
export const isAccessAllowed = (userProfile, featureKey = "", strict = false) => {
  if (featureKey === featureKeys.ho_tro_khach_hang) return true;

  var featureList = userProfile.QUYEN || [];
  if (typeof featureList === "string") {
    featureList = JSON.parse(featureList);
  }

  if (!featureList || (Array.isArray(featureList) && featureList.length === 0)) {
    return false;
  }

  const checkResult = featureList.some((feature) => (!!strict ? feature === featureKey : feature.includes(featureKey)));

  return checkResult;
};

export const currencyParser = (val) => {
  try {
    // for when the input gets clears
    if (typeof val === "string" && !val.length) {
      val = null;
    }
    if (val != null) {
      // detecting and parsing between comma and dot
      var group = new Intl.NumberFormat("vi-VN").format(1111).replace(/1/g, "");
      var decimal = new Intl.NumberFormat("vi-VN").format(1.1).replace(/1/g, "");
      var reversedVal = val.replace(new RegExp("\\" + group, "g"), "");
      reversedVal = reversedVal.replace(new RegExp("\\" + decimal, "g"), ".");

      // removing everything except the digits and dot
      // reversedVal = reversedVal.replace(/[^0-9.]/g, "");
      //  => 1232.21

      // appending digits properly
      const digitsAfterDecimalCount = (reversedVal.split(".")[1] || []).length;
      const needsDigitsAppended = digitsAfterDecimalCount > 2;

      if (needsDigitsAppended) {
        reversedVal = reversedVal * Math.pow(10, digitsAfterDecimalCount - 2);
      }

      return Number.isNaN(reversedVal) ? 0 : reversedVal;
    }
  } catch (error) {
    console.error(error);
  }
};

export const currencyParserNotAlowNegativeNum = (val) => {
  try {
    // for when the input gets clears
    if (typeof val === "string" && !val.length) {
      val = null;
    }
    if (val != null) {
      // detecting and parsing between comma and dot
      var group = new Intl.NumberFormat("vi-VN").format(1111).replace(/1/g, "");
      var decimal = new Intl.NumberFormat("vi-VN").format(1.1).replace(/1/g, "");
      var reversedVal = val.replace(new RegExp("\\" + group, "g"), "");
      reversedVal = reversedVal.replace(new RegExp("\\" + decimal, "g"), ".");

      // removing everything except the digits and dot
      reversedVal = reversedVal.replace(/[^0-9.]/g, "");
      //  => 1232.21

      // appending digits properly
      const digitsAfterDecimalCount = (reversedVal.split(".")[1] || []).length;
      const needsDigitsAppended = digitsAfterDecimalCount > 2;

      if (needsDigitsAppended) {
        reversedVal = reversedVal * Math.pow(10, digitsAfterDecimalCount - 2);
      }

      return Number.isNaN(reversedVal) ? 0 : reversedVal;
    }
  } catch (error) {
    console.error(error);
  }
};
export const getDateBefore = (value) => {
  let today = new Date();
  let before = new Date().getTime() - value * 86400000;
  console.log(before);
  let year = new Date(before).getFullYear().toString();
  let month = new Date(before).getMonth() + 1;
  console.log("MONTH", typeof month);
  let newMonth = () => {
    let monthVal = month.toString();
    if (monthVal === 1) {
      return `0${monthVal}`;
    } else {
      return monthVal;
    }
  };
  let date = new Date(before).getDate().toString();
  let newDate = moment();
  console.log("newDate", date);
  return year + newMonth() + date;
};

//Lấy các chữ cái đầu tiên của từng từ
export const getFirstLetters = (str) => {
  const firstLetters = str
    .split(" ")
    .map((word) => (!isNaN(Number(word[0])) ? word : word[0]))
    .join("");

  return locdau(firstLetters);
};

// lọc dấu
export function locdau(str) {
  if (!str) {
    return "";
  } else {
    str = str.toLocaleLowerCase();
    str = str.replace(/à|á|ạ|ả|ã|â|ầ|ấ|ậ|ẩ|ẫ|ă|ằ|ắ|ặ|ẳ|ẵ/g, "a");
    str = str.replace(/è|é|ẹ|ẻ|ẽ|ê|ề|ế|ệ|ể|ễ/g, "e");
    str = str.replace(/ì|í|ị|ỉ|ĩ/g, "i");
    str = str.replace(/ò|ó|ọ|ỏ|õ|ô|ồ|ố|ộ|ổ|ỗ|ơ|ờ|ớ|ợ|ở|ỡ/g, "o");
    str = str.replace(/ù|ú|ụ|ủ|ũ|ư|ừ|ứ|ự|ử|ữ/g, "u");
    str = str.replace(/ỳ|ý|ỵ|ỷ|ỹ/g, "y");
    str = str.replace(/đ/g, "d");
    return str;
  }
}

export const getDateTimeTextVi = (date = moment()) => {
  return;
};
export const getDateBefore2 = (value) => {
  let myCurrentDate = new Date();
  let myPastDate = new Date(myCurrentDate);
  myPastDate.setDate(myPastDate.getDate() - value);
  return moment(myPastDate).format("YYYY/MM/DD").replaceAll("/", "");
};

export const getTextAge = (value) => {
  switch (value) {
    case "DUOI_MOT_TUOI":
      return `<1 ${i18n.t(languageKeys.tuoi)}`;
    case "TU_MOT_DEN_MUOI_HAI_TUOI":
      return `1 - 11 ${i18n.t(languageKeys.tuoi)}`;
    case "TU_MUOI_HAI_DEN_MUOI_TAM_TUOI":
      return `12-17 ${i18n.t(languageKeys.tuoi)}`;
    case "TU_MUOI_TAM_DEN_SAU_TU_TUOI":
      return `18 - 64 ${i18n.t(languageKeys.tuoi)}`;
    case "TREN_SAU_TU_TUOI":
      return `>64 ${i18n.t(languageKeys.tuoi)}`;
    default:
      return "";
  }
};

//hàm format đơn vị tiền tệ thêm 3 số 0 vào cuối (isFull = false thì thêm .000)
export function formatCurrency2(num, currency = "", isFull = false) {
  if (!num || num === "") {
    let response = "0 " + currency;
    return response;
  }
  num = Math.round(Number(num));
  if (num === 0) {
    return "0 " + currency;
  }

  if (num.length === 2) {
    if (num === "00") {
      num = num.replace("00", "0");
    }
  }
  if (num.length > 1) {
    let first = num.substring(0, 1);
    if (first === "0") {
      num = num.substring(1, num.length);
    }
  }
  let result = num.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1.");
  if (!isFull) {
    result = result + ".000 ";
  }
  return result + currency;
}

export const getTenLoaiDoiTuong = (key) => {
  switch (key) {
    case "":
      return i18n.t(languageKeys.option_Tat_ca);
    case "VIEN_PHI":
      return i18n.t(languageKeys.field_doi_tuong_vien_phi);
    case "NUOC_NGOAI":
      return i18n.t(languageKeys.field_doi_tuong_nuoc_ngoai);
    default:
      return i18n.t(languageKeys.option_Tat_ca);
  }
};

export function genIDOnlyNumber(maxSize = 10, prefix) {
  if (prefix) {
    maxSize = maxSize - prefix.length - 1;
  }
  let current_date = new Date();
  let current_time = current_date.getTime();
  let current_day = current_date.getDate();
  current_day = current_day < 10 ? "0" + current_day : `${current_day}`;
  let rand = Math.floor(Math.random() * (Math.floor(Math.random() * 1000) - Math.floor(Math.random() * 100) + 600) + Math.floor(Math.random() * 100));

  var s = 1234567890 * rand + current_time * rand;
  s += "";
  let result;

  // var str = Array(maxSize).join().split(',').map(function () { return s.charAt(Math.floor(Math.random() * s.length)); }).join('');
  let [_d1, _d2] = current_day;
  var str = [_d1, _d2];
  while (str.length < maxSize) {
    str.push(s.charAt(Math.floor(Math.random() * s.length)));
  }
  str = str.join("");
  if (!!prefix) {
    result = `${prefix.toLocaleUpperCase()}_${str}`;
  } else {
    result = `${str}`;
  }

  return result;
}
/**
 * @name validFragment
 * @description pick properties for insert input data into database
 * @param {Array<Object>} data raw data
 * @param {Object} columnStandard Object {"NHANSU_ID": "* removeAfterValid"}
 * param {* required require} {removeAfterValid}
 */
// chú ý với data[key] là json
export const validFragment = async (data, columnStandard) => {
  try {
    for (let i = 0; i < data.length; i++) {
      data[i] = _.pick(data[i], Object.keys(columnStandard));
    }
    return data;
  } catch (error) {
    HLog("[ERROR] function validFragment()", error?.message);
  }
};

export function docTenThuocTheoThongTu52(data_thuoc) {
  // let {TEN_THUOC , HAM_LUONG, NONG_DO, HOAT_CHAT} = data_thuoc;
  let TEN_THUOC = data_thuoc.TEN_THUOC || data_thuoc.Thuoc_Ten;
  let HOAT_CHAT = data_thuoc.HOAT_CHAT || data_thuoc.Thuoc_HoatChat;
  let NONG_DO = data_thuoc.NONG_DO;
  let HAM_LUONG = data_thuoc.HAM_LUONG;

  if (!!HOAT_CHAT) {
    if (HOAT_CHAT.includes("+") || HOAT_CHAT.includes(";")) {
      //thuốc có nhiều hoạt chất , trả về tên thương mại (các hoạt chất được phân cách bằng dấu + hoặc ; )
      console.log("nhiều hoạt chất");
      return TEN_THUOC;
    }

    let array_name = HOAT_CHAT.split(" ");
    //kiểm tra tên hoạt chất có chứa hàm lượng không, hàm lượng viết cuối và có số
    let ham_luong = array_name[array_name.length - 1].replace(/[^0-9]/g, "");

    //nếu có tên thương mại (tên thuốc), thì ghép vào không thì bỏ qua
    let ten_thuong_mai = !!TEN_THUOC ? " (" + TEN_THUOC + ") " : "";

    //nếu từ cuối có số => có hàm lượng, cộng thêm tên thương mại vào trước hàm lượng
    if (ham_luong !== "") {
      console.log("hoạt chất có hàm lượng");
      array_name[array_name.length - 1] = ten_thuong_mai + array_name[array_name.length - 1];
      return array_name.join("");
    }

    //Nếu không có hàm lượng trong hoạt chất, ghép thêm tên thương mại +  HAM_LUONG hoặc NONG_DO vào cuối, tùy theo cái nào có giá trị
    console.log("hoạt chất k có hàm lượng");
    let hl = !!HAM_LUONG ? HAM_LUONG : "";
    if (hl === "" && !!NONG_DO) {
      hl = NONG_DO;
    }
    return HOAT_CHAT + ten_thuong_mai + hl;
  }

  console.log("không có hoạt chất");
  //Không có tên hoạt chất, trả về tên thương mại
  return TEN_THUOC;
}

export function handleErrorHuyPhieu(error_code) {
  let string_error = "";
  switch (error_code) {
    case "016":
      string_error = "Không thể hủy phiếu vì có thuốc đã kê!";
      break;
    default:
      string_error = "Có lỗi xảy ra ! Không thể hủy phiếu";
      break;
  }
  return string_error;
}
// làm phẳng object
export const flattenMessages = (nestedMessages, prefix = "") => {
  if (nestedMessages == null) {
    return {};
  }
  return Object.keys(nestedMessages).reduce((messages, key) => {
    // value của object
    const value = nestedMessages[key];
    const prefixedKey = prefix ? `${prefix}.${key}` : key;

    if (typeof value === "string" || typeof value === "number") {
      Object.assign(messages, { [prefixedKey]: value });
    } else {
      Object.assign(messages, flattenMessages(value, prefixedKey));
    }

    return messages;
  }, {});
};

export const getTrangThaiPhieuThuoc = (status) => {
  switch (status) {
    case "HUY":
      return i18n.t(languageKeys.status_Da_huy);
    case "HOAN_THANH":
      return i18n.t(languageKeys.da_HT);
    case "CHO_DUYET":
      return i18n.t(languageKeys.cho_duyet);
    default:
      return "";
  }
};

export function removeTags(str = "") {
  // Create a new div element
  var tempDivElement = document.createElement("div");

  // Set the HTML content with the given value
  tempDivElement.innerHTML = str;

  console.log("div element", tempDivElement);

  // Retrieve the text property of the element
  return tempDivElement.textContent || tempDivElement.innerText || "";
}

// Convert nested HTML info flatten array
export function flattenHtml(node, flat = [], tagsList = []) {
  // Add the current tag
  tagsList.push(node);

  // Check if it is a leaf or not
  if (!node.childNodes.length) {
    // Calculate the node index
    let index = flat[flat.length - 1] === undefined ? 0 : flat[flat.length - 1].index + flat[flat.length - 1].length;
    // Push the node in the array
    flat.push({ index: index, length: node.length ?? 1, text: node.wholeText ?? "", parents: [...tagsList] });
  } else {
    // Call the function recursively on each child
    node.childNodes.forEach((child) => {
      flat = flattenHtml(child, flat, tagsList);
    });
  }
  // Remove the current tag
  tagsList.splice(tagsList.indexOf(node), 1);
  return flat;
}

export function deepEqual(object1, object2) {
  const keys1 = Object.keys(object1);
  const keys2 = Object.keys(object2);
  if (keys1.length !== keys2.length) {
    return false;
  }
  for (const key of keys1) {
    const val1 = object1[key];
    const val2 = object2[key];
    const areObjects = isObject(val1) && isObject(val2);
    if ((areObjects && !deepEqual(val1, val2)) || (!areObjects && val1 !== val2)) {
      return false;
    }
  }
  return true;
}
export function isObject(object) {
  return object != null && typeof object === "object";
}

export function layDiaChi(benh_vien) {
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
}

/**
 *
 * @param {*} arr  là mảng các quyền con (giới hạn ở lớp 3)
 * @returns mảng gồm các quyền gán kèm quyền cha
 */

export function addParentPermissionKey(arr) {
  if (isJsonString(arr)) {
    arr = JSON.parse(arr);
  }

  if (!Array.isArray(arr)) return arr;

  let result = [...arr];
  let primary = [];
  let secondary = [];
  let third = [];

  result.forEach((item, index) => {
    if (item.split(".").length < 2) primary.push(item);
    let split_item = item.split(".");

    if (split_item.length > 1) {
      primary.push(split_item[0]);
      secondary.push([split_item[0], split_item[1]].join("."));
      third.push(split_item.join("."));
    }
  });
  result = [...primary, ...secondary, ...third];
  result = _.uniq(result);
  return result;
}

export function removeParentPermissionKey(arr) {
  if (!Array.isArray(arr)) return arr;
  let result = [...arr];
  let primary = [];
  let secondary = [];
  let third = [];
  result.forEach((item, index) => {
    if (item.includes(".")) {
      secondary.push(item);
    } else {
      primary.push(item);
    }
  });
  secondary.forEach((item, index) => {
    for (let i = 0; i < primary.length; i++) {
      const e = primary[i];
      if (item.includes(e)) {
        delete primary[i];
      }
    }
    if (item.split(".").length === 3) {
      third.push(item);
    }
  });

  third.forEach((item, index) => {
    for (let i = 0; i < secondary.length; i++) {
      const e = secondary[i];
      if (item.includes(e)) {
        delete secondary[i];
      }
    }
  });
  result = [...primary, ...secondary, ...third].filter((item) => !!item);

  return result;
}

export const formPattern = {
  numberOnly: /^[0-9]*$/,
  email: /\S+@\S+\.\S+/,
  // phone: /^[0-9]*$/,
  phone: /^[0]?[35789]\d{8}$/,
  fullName: /[a-zA-Z]+\s+[a-zA-Z]+/g,
  numberDecimalPositive: /^[+]?([0-9]+(?:[\.][0-9]*)?|\.[0-9]+)$/,
  huyet_ap: /^\d{1,3}\/\d{1,3}$/,
};

export function formatDateOfBirth(string) {
  // nếu là năm thì hiển thị năm
  // nếu là YYYYMMDD thì fomat lại dạng DD/MM/YYYY
  let result = "";
  if (!!string) {
    result = string.length > 4 ? moment(string, "YYYYMMDD").format("DD/MM/YYYY") : string;
  }
  return result;
}

export const getFullDiaChi = (record = {}) => {
  let result = "";

  if (!!record.DIA_CHI_CHI_TIET) result += `${record.DIA_CHI_CHI_TIET}`;
  if (!!record.TEN_PHUONG_XA) result += `, ${record.TEN_PHUONG_XA}`;
  if (!!record.TEN_QUAN_HUYEN) result += `, ${record.TEN_QUAN_HUYEN}`;
  if (!!record.TEN_TINH_THANH) result += `, ${record.TEN_TINH_THANH}`;

  return result;
};

export function genCharArray(charA, charZ) {
  var a = [],
    i = charA.charCodeAt(0),
    j = charZ.charCodeAt(0);
  for (; i <= j; ++i) {
    a.push(String.fromCharCode(i));
  }
  return a;
}

export function getSizePayload(payload) {
  const jsonString = JSON.stringify(payload);
  const byteSize = new TextEncoder().encode(jsonString).length;
  return byteSize / 1048576;
}