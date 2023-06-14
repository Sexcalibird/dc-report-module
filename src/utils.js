import * as _ from "lodash";
import moment from "moment";

import i18n, { languageKeys } from "./i18n";

/**
 * @description hàm chuyển đổi firstName, lastName thành fullName
 * @param {object} person đối tượng NGƯỜI
 * @returns {String} full name của đối tượng NGƯỜI
 */
export function getFullName(person) {
  if (person != null && !_.isEmpty(person)) {
    const firstName = person?.HO || "";
    const lastName = person?.TEN || "";

    const userName = capital_letter(firstName) + " " + capital_letter(lastName);

    return userName.trim();
  }

  return "";
}

/**
 * @description hàm in hoa chữ cái đầu mỗi từ
 * @param {*} str string đầu vào cần được in hoa chữ cái đầu
 * @returns string được in hoa chữ cái đầu
 */
export function capital_letter(str) {
  let result = "";

  if (str) {
    str = str.replace(/\s{2,}/g, " ");
    str = str.split(" ");

    for (let i = 0, x = str.length; i < x; i++) {
      if (!!str[i][0]) {
        str[i] = str[i][0].toUpperCase() + str[i].substr(1);
      }
    }
    result = str.join(" ");
  }

  return result;
}

export const formatPhoneNumber = (phoneNumber = "") => {
  if (!_.isString(phoneNumber)) return phoneNumber;

  if (phoneNumber.length === 8) {
    return phoneNumber.replace(/\D*(\d{4})\D*(\d{4})\D*/, "$1 $2");
  }

  return phoneNumber.replace(/\D*(\d{4})\D*(\d{3})\D*(\d{3})\D*/, "$1 $2 $3");
};

/**
 * @name validFragment
 * @description pick properties for insert input data into database
 * @param {Array<Object>} data raw data
 * @param {Object} columnStandard Object {"NHANSU_ID": "* removeAfterValid"}
 * param {* required require} {removeAfterValid}
 */
export const validFragment = async (data, columnStandard) => {
  try {
    for (let i = 0; i < data.length; i++) {
      data[i] = _.pick(data[i], Object.keys(columnStandard));
    }
    return data;
  } catch (error) {
    console.log("[ERROR] function validFragment()", error?.message);
  }
};

export const formatNumberToPrice = (x, currency = "") => {
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

  return x;
};

export const currencyParser = (val) => {
  try {
    // for when the input gets clears
    if (typeof val === "string" && !val.length) {
      val = null;
    }
    if (val != null) {
      var group = new Intl.NumberFormat("vi-VN").format(1111).replace(/1/g, "");
      var decimal = new Intl.NumberFormat("vi-VN").format(1.1).replace(/1/g, "");
      var reversedVal = val.replace(new RegExp("\\" + group, "g"), "");
      reversedVal = reversedVal.replace(new RegExp("\\" + decimal, "g"), ".");

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

// export const getErrorMessage = (error_code, fallback = `ERROR: ${error_code}`, res = {}) => {
//   if (!error_code) return fallback;

//   switch (error_code.toString()) {
//     case "001":
//       return i18n.t(languageKeys.error_loi_ton_tai);
//     case "002":
//       return i18n.t(languageKeys.error_loi_khong_nhap_gia_tri);
//     case "003":
//       return i18n.t(languageKeys.error_gia_tri_khong_hop_le);
//     case "004":
//       return i18n.t(languageKeys.error_khong_trung_khop);
//     case "paid_service":
//     case "009":
//       return i18n.t(languageKeys.error_dich_vu_da_thanh_toan);
//     case "007":
//       return i18n.t(languageKeys.error_Rang_buoc_ton_tai);
//     case "008":
//       return i18n.t(languageKeys.error_Khong_sua_duoc_lich_kham);
//     case "012":
//       return (
//         i18n.t(languageKeys.error_loi_ton_tai) +
//         ` ${i18n.t(languageKeys.error_body__at_column)} ${res.field} ${i18n.t(
//           languageKeys.error_body__and_duplicate_value,
//         )} ${res.Dupllicate_value}`
//       );
//     case "015":
//       return i18n.t(languageKeys.error_khong_the_khoa_phong_do_co_benh_nhan_cho_kham);
//     default:
//       return fallback;
//   }
// };

export const getGender = (key) => {
  let result = "Khác";

  if (key === "nam") result = "Nam";
  else if (key === "nu") result = "Nữ";

  return result;
};

export const getDtbn = (key) => {
  switch (key) {
    case "VIEN_PHI":
      return "Viện phí";
    default:
      return "";
  }
};

export const getFullDiaChi = (record = {}) => {
  let result = "";

  if (!!record.DIA_CHI_CHI_TIET) result += `${record.DIA_CHI_CHI_TIET}`;
  if (!!record.TEN_PHUONG_XA) result += `, ${record.TEN_PHUONG_XA}`;
  if (!!record.TEN_QUAN_HUYEN) result += `, ${record.TEN_QUAN_HUYEN}`;
  if (!!record.TEN_TINH_THANH) result += `, ${record.TEN_TINH_THANH}`;

  return result;
};

//hàm trả về tuổi của người dùng
export function convertMillisecondToAge(millisecond, format, showUnit = true) {
  // Dành cho trường hợp giá trị đầu vào là dd/mm/yyyy @.@
  if (typeof millisecond === "string" && millisecond.includes("/")) {
    const arrNoSlash = millisecond.split("/");

    if ([...arrNoSlash].length === 3) {
      //millisecond = moment(millisecond, "DD/MM/YYYY").valueOf();
      millisecond = moment(millisecond, format).valueOf();
    }
  }
  if (millisecond.length === 4) {
    millisecond = millisecond + "0101";
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

  if (showUnit) {
    // nếu gap > 0 thì trả về số tuổi (gap được làm tròn xuống)
    if (duration > 0) {
      return `${duration}`;
    }
    // ngược lại thì trả về số tháng tuổi (gap cũng được làm tròn xuống)
    else {
      duration = Math.ceil(moment.duration(moment().diff(moment(millisecond))).asMonths());
      return `${duration} tháng`;
    }
  } else {
    if (duration > 0) {
      return `${duration}`;
    } else {
      return `1`;
    }
  }
}

export function formatDateOfBirth(string) {
  // nếu là năm thì hiển thị năm
  // nếu là YYYYMMDD thì fomat lại dạng DD/MM/YYYY
  let result = "";
  if (!!string) {
    result = string.length > 4 ? moment(string, "YYYYMMDD").format("DD/MM/YYYY") : string;
  }
  return result;
}

export function getDateFromSever(string) {
  let result = "";
  if (!!string && string.length > 4) {
    result = moment(string, "YYYYMMDD").format("DD/MM/YYYY");
  }
  return result;
}

export const checkLimitTimeOneYear = (arr_seach_time) => {
  let check = false;

  if (moment(arr_seach_time[0]).isSameOrBefore(moment(arr_seach_time[1]).subtract(1, "year"))) {
    check = true;
  } else if (moment(arr_seach_time[0]).isAfter(moment()) || moment(arr_seach_time[1]).isAfter(moment())) {
    check = true;
  }
  return check;
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

export function getBase64(file) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result);
    reader.onerror = (error) => reject(error);
  });
}

export function base64toBlob(base64Data) {
  const sliceSize = 1024;
  const byteCharacters = window.atob(base64Data);
  const bytesLength = byteCharacters.length;
  const slicesCount = Math.ceil(bytesLength / sliceSize);
  const byteArrays = new Array(slicesCount);

  for (let sliceIndex = 0; sliceIndex < slicesCount; ++sliceIndex) {
    const begin = sliceIndex * sliceSize;
    const end = Math.min(begin + sliceSize, bytesLength);

    const bytes = new Array(end - begin);
    for (let offset = begin, i = 0; offset < end; ++i, ++offset) {
      bytes[i] = byteCharacters[offset].charCodeAt(0);
    }
    byteArrays[sliceIndex] = new Uint8Array(bytes);
  }
  return new Blob(byteArrays, { type: "application/pdf" });
}

export function blobToBase64(blob) {
  return new Promise((resolve, _) => {
    const reader = new FileReader();
    reader.onloadend = () => resolve(reader.result);
    reader.readAsDataURL(blob);
  });
}

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

/**
 *
 * @param {*} file_ID string (ID of url fetch from server)
 * @param {*} url string (ID of url fetch from server)
 */
export function onPreviewFileUrl(file_ID, url) {}

//kiểm tra đối tượng object có rỗng hay không
export function isEmptyObject(obj) {
  return JSON.stringify(obj) === "{}";
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
