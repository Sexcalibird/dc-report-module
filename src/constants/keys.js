import i18n, { languageKeys } from "../i18n";

export const keys = {
  ACCESS_TOKEN: "ACCESS_TOKEN",
  REFRESH_TOKEN: "REFRESH_TOKEN",
  SEARCH_DELAY_TIME: 2000,
  LIST_LIMIT_RECORDS: 20,

  DEFAULT_PASSWORD: "123312",
  DURATION_CLOSE_NOTI: 3,

  TIMEOUT: 8000,
  KEYCLOAK_PASSWORD: "oAkPKrCJetROQpSrS6IPYnMjzu7UvlVS",

  limit: 20, // giới hạn số data trả về
  limit_debs: 10,
  maxLimit: 50, //giới hạn tối đa số phần tử gọi api
  limit_hospital_fee: 15,
  limit_min_length: 3, // giới hạn dưới kí tự search

  // đối tượng bệnh nhân
  BHYT: "BHYT",
  VIEN_PHI: "VIEN_PHI",
  YEU_CAU: "YEU_CAU",
  MIEN_GIAM: "MIEN_GIAM",
  NUOC_NGOAI: "NUOC_NGOAI",
  KT_TU_NGUYEN: "KT_TU_NGUYEN",
  KT_BHYT: "KT_BHYT",
  DT_KHAC: "KHAC",
  KHAM_DOAN: "KHAM_DOAN",
  gioi_tinh_NAM: "nam",
  gioi_tinh_NU: "nu",
  gioi_tinh_KHAC: "khac",
};

export const validateMessages = {
  required: i18n.t(languageKeys.validate_required),
  types: {
    email: i18n.t(languageKeys.validate_type_email),
    number: i18n.t(languageKeys.validate_type_number),
    url: i18n.t(languageKeys.message_khong_dung_dinh_dang),
  },
  number: {
    range: i18n.t(languageKeys.validate_number_range),
  },
  whitespace: i18n.t(languageKeys.validate_required),
  pattern: {
    mismatch: i18n.t(languageKeys.validate_type_pattern),
  },
  string: {
    max: i18n.t(languageKeys.validate_number_max),
  },
};

export const featureKeys = {
  quan_ly_tiep_don: "QL_TIEP_DON",
  quan_ly_danh_muc: "QUAN_LY_DANH_MUC_CHUNG",
  quan_ly_nguoi_dung: "QUAN_LY_NGUOI_DUNG",
  thong_tin_cskcb: "THONG_TIN_CSKCB",
  quan_ly_vien_phi: "QL_VIEN_PHI",
  quan_ly_kham_benh: "QL_KHAM_BENH",
  quan_ly_chan_doan_hinh_anh_ris: "RIS_NHAP_TAY",
  quan_ly_bhyt: "quan_ly_bhyt",
  quan_ly_xep_hang_qms: "quan_ly_xep_hang_qms",
  quan_ly_dich_vu_can_thanh_toan: "DV_CAN_THANH_TOAN",
  quan_ly_so_hoa_don: "QL_SO_TONG_HOP",
  quan_ly_xet_nghiem_lis: "quan_ly_xet_nghiem_lis",
  lich_lam_viec: "LICH_LAM_VIEC",
  quan_ly_he_thong: "QL_HE_THONG",
  tiep_don: "DON_TIEP",
  bang_dieu_khien: "BANG_DIEU_KHIEN",
  cuoc_hen_sap_toi: "CUOC_HEN_SAP_TOI",
  duoc_ngoai_tru: "DUOC_NGOAI_TRU",
  ban_thuoc: "BAN_THUOC",
  kho_thuoc: "KHO_THUOC",
  phieu_xuat_nhap: "PHIEU_NHAP_XUAT",
  nha_cung_cap: "NHA_CUNG_CAP",
  quan_ly_noi_tru: "QUAN_LY_NOI_TRU",
  quan_ly_benh_nhan: "QL_BENH_NHAN",
  bao_cao_duoc_ngoai_tru: "BAO_CAO_DUOC_NGOAI_TRU",
  bao_cao_duoc: "BAO_CAO_DUOC",
  bao_cao: "QL_BAO_CAO",
  bao_cao_vien_phi: "BAO_CAO_VIEN_PHI",
  bao_cao_phieu_thu: "BAO_CAO_PHIEU_THU",
  bao_cao_tiep_don: "BAO_CAO_TIEP_DON",
  ton_kho: "TON_KHO",
  kho_duoc_ngoai_tru: "KHO_THUOC",
  quan_ly_xuat_khac: "QUAN_LY_XUAT_KHAC",
  thong_ke: "THONG_KE",
  so_luong_ton_kho: "SO_LUONG_TON_KHO",
  phieu_nhap_kho: "PHIEU_NHAP_KHO",
  phieu_xuat_kho: "PHIEU_XUAT_KHO",
  van_chuyen_kho: "VAN_CHUYEN_KHO",
  the_kho: "THE_KHO",
  quyen_duyet_phieu: "QUYEN_DUYET_PHIEU",
  mau_mo_ta_cdha: "MAU_MO_TA_CDHA",
  tra_ket_qua_cdha: "TRA_KET_QUA_CDHA",
  tao_mau_mo_ta_cdha: "TAO_MAU_MO_TA_CDHA",
  sua_mau_mo_ta_cdha: "SUA_MAU_MO_TA_CDHA",
  xoa_mau_mo_ta_cdha: "XOA_MAU_MO_TA_CDHA",
  khoa_mau_mo_ta_cdha: "KHOA_MAU_MO_TA_CDHA",
  tra_ket_qua: "TRA_KET_QUA",
  huy_tra_phieu_cdha: "HUY_TRA_PHIEU",
  ho_tro_khach_hang: "HO_TRO_KHACH_HANG",
  bao_cao_cdha: "BAO_CAO_CDHA",
  quan_ly_phan_he: "QL_PHAN_HE",

  quan_ly_dv_cis: "QUAN_LY_DV_CIS",
  may_thuc_hien_ris: "MAY_THUC_HIEN_RIS",
  mau_mo_ta_ris: "MAU_MO_TA_RIS",
  thiet_bi_may_lis: "THIET_BI_MAY_LIS",
  du_lieu_dk_may_lis: "DU_LIEU_DIEU_KHIEN_MAY_LIS",
  quan_ly_dm_cis: "QUAN_LY_DANH_MUC_CIS",
  quan_ly_dv_lis: "QUAN_LY_DV_LIS",
};

export const keysDanhMuc = {
  dm_noi_tru_phong: "dm_noi_tru_phong", // danh mục phòng nội trú
  dm_benh_vien: "dm_benh_vien", // danh mục bệnh viện
  dm_khoa: "dm_khoa", // danh mục khoa
  dm_phong: "DM_PHONG", // danh mục phòng
  dm_dich_vu_ki_thuat: "DM_DICHVU_KYTHUAT", // danh mục dịch vụ kĩ thuật
  dm_nhom_dv_ki_thuat: "dm_nhom_dv_ki_thuat", // danh mục nhóm dịch vụ kĩ thuật
  dm_loai_dv_ki_thuat: "DM_LOAI_DICHVU_KYTHUAT", // danh mục loại dịch vụ kĩ thuật
  dm_nhom_hoa_don: "dm_nhom_hoa_don", // danh mục nhóm hóa đơn
  dm_thuoc: "DM_THUOC", // danh mục thuốc
  dm_nha_thuoc: "dm_nha_thuoc", // danh mục nhà thuốc
  dm_hang_san_xuat: "dm_hang_san_xuat", // danh mục hãng sản xuất
  dm_duong_dung: "dm_duong_dung", // danh mục đường dùng
  dm_kho_tu_truc: "dm_kho_tu_truc", // danh mục kho, tủ trực
  dm_don_vi_tinh: "dm_don_vi_tinh", // danh mục đơn vị tính
  dm_hoat_chat: "DM_HOAT_CHAT", // danh mục kho, tủ trực
  dm_tinh: "dm_tinh", // danh mục tỉnh
  dm_huyen: "dm_huyen", // danh mục huyện
  dm_xa: "dm_xa", // danh mục xã
  dm_icd10: "dm_icd10", // danh mục ICD10
  dm_nhom_icd10: "dm_nhom_icd10", // danh mục nhóm ICD10
  dm_nghe_nghiep: "dm_nghe_nghiep", // danh mục nghề nghiệp
  dm_dan_toc: "dm_dan_toc", // danh mục dân tộc
  dm_quoc_gia: "dm_quoc_gia", // danh mục quốc gia
  //dm_kho_tu_truc:"dm_kho_tu_truc",
  dm_giuong: "dm_giuong",
  dm_pp_vo_cam: "dm_pp_vo_cam",
  dm_xuat_khac: "dm_xuat_khac",
  dm_nguon: "dm_nguon",
  dm_kho_thuoc: "dm_kho_thuoc",
  dm_may_thuc_hien: "dm_may_thuc_hien",
  dm_nguon_khach: "dm_nguon_khach",
  dm_doi_tuong: "dm_doi_tuong",
  dm_cach_dung: "dm_cach_dung",
  dm_hinh_thuc_thanh_toan: "dm_hinh_thuc_thanh_toan",
  dm_cachthuc_thuthuat: "dm_cachthuc_thuthuat",
  dm_phuongphap_thu_thuat: "dm_phuongphap_thuthuat",
  dm_nha_cung_cap: "dm_nha_cung_cap",
};

export const loai_doi_tuong = {
  [keys.VIEN_PHI]: "Viện phí",
  [keys.BHYT]: "BHYT",
  [keys.KHAM_DOAN]: "Khám đoàn",
  [keys.DT_KHAC]: "Khác",
};

export const keyLoaiNhanVien = {
  bac_si: "BAC_SI",
  thu_ngan: "THU_NGAN",
  ky_thuat_vien: "KY_THUAT_VIEN",
  dieu_duong: "DIEU_DUONG",
  thu_kho: "THU_KHO",
  quan_tri: "QUAN_TRI",
  tiep_tan: "TIEP_TAN",
  nguoi_lay_mau: "NGUOI_LAY_MAU",
};

export const keyLIS = {
  dm_thiet_bi_may: "dm_thiet_bi_may",
  dm_ket_qua_XN_chuan: "dm_ket_qua_XN_chuan",
  dm_du_lieu_dieu_khien_may: "dm_du_lieu_dieu_khien_may",
};

export const drawerSize = {
  small: "50vw",
  medium: "75vw",
  large: "90vw",
};

export const shorthandKey = {
  them: "a",
  luu: "s",
  xoa: "d",
};

export const permissionActionKey = {
  XEM: "XEM",
  THEM_MOI: "THEM_MOI",
  THEM: "THEM",
  SUA: "SUA",
  XOA: "XOA",
  HUY: "HUY",
  IN_PDF: "IN_PDF",
  XUAT_EXCEL: "XUAT_EXCEL",
  XAC_NHAN: "XAC_NHAN",
  THUC_HIEN: "THUC_HIEN",
  TAI_XUONG: "TAI_XUONG",
  KHOA: "KHOA",
  CAI_DAT_LLV: "CAI_DAT_LLV",
};

// Quyền lớp 2
export const cisPermission = {
  DASHBOARD: "CIS.DASHBOARD",
  QUAN_LY_DICH_VU: "CIS.QUAN_LY_DICH_VU",
  LICH_LAM_VIEC: "CIS.LICH_LAM_VIEC",
  QUAN_LY_CACH_THUC_THU_THUAT: "CIS.QUAN_LY_CACH_THUC_THU_THUAT",
  QUAN_LY_PHUONG_PHAP_THU_THUAT: "CIS.QUAN_LY_PHUONG_PHAP_THU_THUAT",
  BAO_CAO_TIEP_DON: "CIS.QL_BAO_CAO.BAO_CAO_TIEP_DON",
  BAO_CAO_VIEN_PHI: "CIS.QL_BAO_CAO.BAO_CAO_VIEN_PHI",
  BAO_CAO_THU_THUAT: "CIS.QL_BAO_CAO.BAO_CAO_THU_THUAT",
  TIEP_DON: "CIS.QL_TIEP_DON.DON_TIEP",
  QUAN_LY_LICH_HEN: "CIS.QL_TIEP_DON.CUOC_HEN_SAP_TOI",
  DICH_VU_CAN_THANH_TOAN: "CIS.QL_VIEN_PHI.DICH_VU_CAN_THANH_TOAN",
  QUAN_LY_SO_TONG_HOP: "CIS.QL_VIEN_PHI.QUAN_LY_SO_TONG_HOP",
  QL_BENH_NHAN: "CIS.QL_BENH_NHAN",
  CHI_SO_SINH_TON: "CIS.QL_KHAM_BENH.CHI_SO_SINH_TON",
  THONG_TIN_KHAM: "CIS.QL_KHAM_BENH.THONG_TIN_KHAM",
  CHI_DINH_CLS: "CIS.QL_KHAM_BENH.CHI_DINH_CLS",
  KE_DON_THUOC: "CIS.QL_KHAM_BENH.KE_DON_THUOC",
  THUC_HIEN_THU_THUAT: "CIS.QL_KHAM_BENH.THUC_HIEN_THU_THUAT",
};

export const cisPermissionTemplate = {
  QUAN_LY_TIEP_DON: [cisPermission.QUAN_LY_LICH_HEN, cisPermission.TIEP_DON],
  QUAN_LY_VIEN_PHI: [cisPermission.DICH_VU_CAN_THANH_TOAN, cisPermission.QUAN_LY_SO_TONG_HOP],
  QUAN_LY_KHAM_BENH: [
    cisPermission.CHI_DINH_CLS,
    cisPermission.CHI_SO_SINH_TON,
    cisPermission.THONG_TIN_KHAM,
    cisPermission.THUC_HIEN_THU_THUAT,
    cisPermission.KE_DON_THUOC,
  ],
  QL_BENH_NHAN: [
    `${cisPermission.QL_BENH_NHAN}.${permissionActionKey.XEM}`,
    `${cisPermission.QL_BENH_NHAN}.${permissionActionKey.TAI_XUONG}`,
  ],
  BAO_CAO: [cisPermission.BAO_CAO_TIEP_DON, cisPermission.BAO_CAO_VIEN_PHI, cisPermission.BAO_CAO_THU_THUAT],
};

export const prmPermission = {
  DASHBOARD: "PRM.DASHBOARD",
  BAO_CAO_DOANH_THU: "PRM.BAO_CAO_DOANH_THU",
  BAO_CAO_KH_CA_NHAN: "PRM.BAO_CAO_KH_CA_NHAN",
  BAO_CAO_KH_DOANH_NGHIEP: "PRM.BAO_CAO_KH_DOANH_NGHIEP",
  BAO_CAO_CUOC_GOI: "PRM.BAO_CAO_CUOC_GOI",
  BAO_CAO_HIEU_QUA_VOUCHER: "PRM.BAO_CAO_HIEU_QUA_VOUCHER",
  QUAN_LY_CUOC_GOI: "PRM.QUAN_LY_CUOC_GOI",
  QUAN_LY_DAT_HEN: "PRM.QUAN_LY_DAT_HEN",
  QUAN_LY_TIN_NHAN: "PRM.QUAN_LY_TIN_NHAN",
  QUAN_LY_DON_HANG: "PRM.QUAN_LY_DON_HANG",
  QUAN_LY_KPI: "PRM.QUAN_LY_KPI",
  QUAN_LY_KHACH_HANG_TIEM_NANG: "PRM.QUAN_LY_KHACH_HANG_TIEM_NANG",
  QUAN_LY_KHACH_HANG_CA_NHAN: "PRM.QUAN_LY_KHACH_HANG_CA_NHAN",
  QUAN_LY_KHACH_HANG_DOANH_NGHIEP: "PRM.QUAN_LY_KHACH_HANG_DOANH_NGHIEP",
  QUAN_LY_PHAN_HOI_KHACH_HANG: "PRM.QUAN_LY_PHAN_HOI_KHACH_HANG",
  EMAIL_MKT: "PRM.EMAIL_MKT",
  SMS_MKT: "PRM.SMS_MKT",
  QUAN_LY_VOUCHER: "PRM.QUAN_LY_VOUCHER",
};

export const danhMucPermission = {
  THONG_TIN_CSKCB: "MANAGEMENT.DM_CHUNG.THONG_TIN_CSKCB",
  QUAN_LY_NGUOI_DUNG: "MANAGEMENT.DM_CHUNG.QUAN_LY_NGUOI_DUNG",
  QUAN_LY_DV_CIS: "MANAGEMENT.DM_CIS.QUAN_LY_DV_CIS",
  QUAN_LY_DV_RIS: "MANAGEMENT.DM_RIS.QUAN_LY_DV_RIS",
  QUAN_LY_DV_LIS: "MANAGEMENT.DM_LIS.QUAN_LY_DV_LIS",
  QUAN_LY_DANH_MUC_CHUNG: "MANAGEMENT.DM_CHUNG.QUAN_LY_DANH_MUC_CHUNG",
  QUAN_LY_DANH_MUC_CIS: "MANAGEMENT.DM_CIS.QUAN_LY_DANH_MUC_CIS",
  QUAN_LY_DANH_MUC_LIS: "MANAGEMENT.DM_LIS.QUAN_LY_DANH_MUC_LIS",
  QUAN_LY_DANH_MUC_RIS: "MANAGEMENT.DM_RIS.QUAN_LY_DANH_MUC_RIS",
  MAY_THUC_HIEN_RIS: "MANAGEMENT.DM_RIS.MAY_THUC_HIEN_RIS",
  MAU_MO_TA_RIS: "MANAGEMENT.DM_RIS.MAU_MO_TA_RIS",
  THIET_BI_MAY_LIS: "MANAGEMENT.DM_LIS.THIET_BI_MAY_LIS",
  DU_LIEU_DIEU_KHIEN_MAY_LIS: "MANAGEMENT.DM_LIS.DU_LIEU_DIEU_KHIEN_MAY_LIS",
  DUOC_NGOAI_TRU: "MANAGEMENT.DUOC_NGOAI_TRU",
  LICH_LAM_VIEC: "MANAGEMENT.DM_CIS.LICH_LAM_VIEC",

  DM_CHUNG: "MANAGEMENT.DM_CHUNG",
  QUAN_LY_CIS: "MANAGEMENT.DM_CIS",
  QUAN_LY_LIS: "MANAGEMENT.DM_LIS",
  QUAN_LY_RIS: "MANAGEMENT.DM_RIS",
};

export const danhMucPermissionTemplate = {
  DUOC_NGOAI_TRU: [
    `${danhMucPermission.DUOC_NGOAI_TRU}.${permissionActionKey.XEM}`,
    `${danhMucPermission.DUOC_NGOAI_TRU}.${permissionActionKey.THEM}`,
    `${danhMucPermission.DUOC_NGOAI_TRU}.${permissionActionKey.SUA}`,
    `${danhMucPermission.DUOC_NGOAI_TRU}.${permissionActionKey.XOA}`,
    `${danhMucPermission.DUOC_NGOAI_TRU}.${permissionActionKey.KHOA}`,
    `${danhMucPermission.DUOC_NGOAI_TRU}.${permissionActionKey.XUAT_EXCEL}`,
  ],
  DM_CHUNG: [
    danhMucPermission.THONG_TIN_CSKCB,
    danhMucPermission.QUAN_LY_NGUOI_DUNG,
    danhMucPermission.QUAN_LY_DANH_MUC_CHUNG,
  ],
  CIS: [danhMucPermission.QUAN_LY_DV_CIS, danhMucPermission.QUAN_LY_DANH_MUC_CIS, danhMucPermission.LICH_LAM_VIEC],
  RIS: [danhMucPermission.QUAN_LY_DV_RIS, danhMucPermission.MAU_MO_TA_RIS, danhMucPermission.MAY_THUC_HIEN_RIS],
  LIS: [
    danhMucPermission.QUAN_LY_DV_LIS,
    danhMucPermission.THIET_BI_MAY_LIS,
    danhMucPermission.DU_LIEU_DIEU_KHIEN_MAY_LIS,
  ],
};

export const prmPermissionTemplate = {
  DASHBOARD: [
    `${prmPermission.DASHBOARD}.${permissionActionKey.XEM}`,
    `${prmPermission.DASHBOARD}.${permissionActionKey.THEM}`,
    `${prmPermission.DASHBOARD}.${permissionActionKey.SUA}`,
    `${prmPermission.DASHBOARD}.${permissionActionKey.XOA}`,
    `${prmPermission.DASHBOARD}.${permissionActionKey.IN_PDF}`,
  ],
  BAO_CAO: Object.entries(prmPermission).map((objArr) => objArr[0].includes("BAO_CAO") && objArr[1]),
  QUAN_LY_CONG_VIEC: [
    prmPermission.QUAN_LY_CUOC_GOI,
    prmPermission.QUAN_LY_DAT_HEN,
    prmPermission.QUAN_LY_TIN_NHAN,
    prmPermission.QUAN_LY_DON_HANG,
    prmPermission.QUAN_LY_KPI,
  ],
  QUAN_LY_KHACH_HANG: [
    prmPermission.QUAN_LY_KHACH_HANG_TIEM_NANG,
    prmPermission.QUAN_LY_KHACH_HANG_CA_NHAN,
    prmPermission.QUAN_LY_KHACH_HANG_DOANH_NGHIEP,
  ],
  MARKETING: [prmPermission.EMAIL_MKT, prmPermission.SMS_MKT, prmPermission.QUAN_LY_VOUCHER],
  QUAN_LY_PHAN_HOI_KHACH_HANG: [
    `${prmPermission.QUAN_LY_PHAN_HOI_KHACH_HANG}.${permissionActionKey.XEM}`,
    `${prmPermission.QUAN_LY_PHAN_HOI_KHACH_HANG}.${permissionActionKey.THEM}`,
    `${prmPermission.QUAN_LY_PHAN_HOI_KHACH_HANG}.${permissionActionKey.SUA}`,
    `${prmPermission.QUAN_LY_PHAN_HOI_KHACH_HANG}.${permissionActionKey.XOA}`,
    `${prmPermission.QUAN_LY_PHAN_HOI_KHACH_HANG}.${permissionActionKey.IN_PDF}`,
  ],
};

export const staffGroup = {
  THU_KHO: "THU_KHO",
  THU_NGAN: "THU_NGAN",
  TIEP_TAN: "TIEP_TAN",
  KY_THUAT_VIEN_XN: "KY_THUAT_VIEN_XN",
  KY_THUAT_VIEN_CDHA: "KY_THUAT_VIEN_CDHA",
  DIEU_DUONG: "DIEU_DUONG",
  DUOC_SI: "DUOC_SI",
  SALE: "SALE",
  TELESALES: "TELESALES",
  CSKH: "CSKH",
  CSKH_LEADER: "CSKH_LEADER",
  MKT_LEADER: "MKT_LEADER",
  MARKETING: "MARKETING",
  BAC_SI: "BAC_SI",
  QUAN_TRI: "QUAN_TRI",
};

export const routeApp = {
  CIS: "CIS",
  LIS: "LIS",
  RIS: "RIS",
  PRM: "PRM",
  HOME: "HOME",
  DANH_MUC: "MANAGEMENT",
  DUOC: "DUOC",
};

export const decentralization = {
  CIS: "CIS",
  RIS: "RIS",
  LIS: "LIS",
  PRM: "PRM",
  DUOC_NGOAI_TRU: "DUOC",
  DANH_MUC: "MANAGEMENT",
};

export const staffGroupPermission = {
  [staffGroup.THU_KHO]: [decentralization.DUOC_NGOAI_TRU, decentralization.DANH_MUC],
  [staffGroup.THU_NGAN]: [decentralization.CIS, decentralization.DANH_MUC],
  [staffGroup.TIEP_TAN]: [decentralization.CIS, decentralization.DANH_MUC],
  [staffGroup.KY_THUAT_VIEN_XN]: [decentralization.LIS, decentralization.DANH_MUC],
  [staffGroup.KY_THUAT_VIEN_CDHA]: [decentralization.RIS, decentralization.DANH_MUC],
  [staffGroup.DIEU_DUONG]: [decentralization.CIS, decentralization.DANH_MUC],
  [staffGroup.DUOC_SI]: [decentralization.DUOC_NGOAI_TRU, decentralization.DANH_MUC],
  [staffGroup.SALE]: [decentralization.PRM, decentralization.DANH_MUC],
  [staffGroup.TELESALES]: [decentralization.PRM, decentralization.DANH_MUC],
  [staffGroup.CSKH]: [decentralization.PRM, decentralization.DANH_MUC],
  [staffGroup.CSKH_LEADER]: [decentralization.PRM, decentralization.DANH_MUC],
  [staffGroup.MKT_LEADER]: [decentralization.PRM, decentralization.DANH_MUC],
  [staffGroup.MARKETING]: [decentralization.PRM, decentralization.DANH_MUC],
  [staffGroup.BAC_SI]: [decentralization.CIS, decentralization.DANH_MUC],
};
