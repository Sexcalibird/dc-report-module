import { keys } from ".";
import i18n, { languageKeys } from "../i18n";
import { featureKeys, keyLoaiNhanVien, staffGroup } from "./keys";

export const danhSachGioiTinh = [
  { key: keys.gioi_tinh_NAM, name: i18n.t(languageKeys.gioi_tinh_Nam) },
  { key: keys.gioi_tinh_NU, name: i18n.t(languageKeys.gioi_tinh_Nu) },
  { key: keys.gioi_tinh_KHAC, name: i18n.t(languageKeys.gioi_tinh_Khac) },
];

export const danhSachTuyenBv = [
  { key: "tuyen_trung_uong", name: i18n.t(languageKeys.data_Tuyen_trung_uong) },
  { key: "tuyen_tinh", name: i18n.t(languageKeys.data_Tuyen_tinh) },
  { key: "tuyen_huyen", name: i18n.t(languageKeys.data_Tuyen_huyen) },
  { key: "tuyen_xa", name: i18n.t(languageKeys.data_Tuyen_xa) },
  { key: "khong_phan_tuyen", name: i18n.t(languageKeys.data_Khong_phan_tuyen) },
];

// Danh sách hạng bệnh viện
export const danhSachHangBv = [
  { key: "hang_dac_biet", name: i18n.t(languageKeys.data_Hang_dac_biet) },
  { key: "hang_1", name: i18n.t(languageKeys.data_Hang) + " 1" },
  { key: "hang_2", name: i18n.t(languageKeys.data_Hang) + " 2" },
  { key: "hang_3", name: i18n.t(languageKeys.data_Hang) + " 3" },
  { key: "hang_4", name: i18n.t(languageKeys.data_Hang) + " 4" },
  { key: "khong_xep_hang", name: i18n.t(languageKeys.data_Khong_xep_hang) },
];

export const danhSachLoaiMay = [
  {
    key: "XET_NGHIEM",
    name: i18n.t(languageKeys.loai_khoa_xet_nghiem),
  },
  {
    key: "CDHA",
    name: "CDHA",
  },
  {
    key: "TDCN",
    name: "TDCN",
  },
  {
    key: "THU_THUAT",
    name: i18n.t(languageKeys.data_thu_thuat),
  },
];

export const danhSachLoaiKhoa = [
  {
    key: "KHAM_BENH",
    name: i18n.t(languageKeys.data_Kham_benh),
  },
  {
    key: "NOI_KHOA",
    name: i18n.t(languageKeys.data_Noi_khoa),
  },
  {
    key: "DUOC",
    name: i18n.t(languageKeys.data_Duoc),
  },
  {
    key: "TAI_CHINH",
    name: i18n.t(languageKeys.data_Tai_chinh),
  },
  {
    key: "XET_NGHIEM",
    name: i18n.t(languageKeys.data_Xet_nghiem),
  },
  {
    key: "CDHA",
    name: i18n.t(languageKeys.data_CDHA),
  },
  {
    key: "NOI_TRU",
    name: i18n.t(languageKeys.title_noi_tru),
  },
  {
    key: "KHAC",
    name: i18n.t(languageKeys.data_Khac),
  },
];

export const danhSachLoaiPhong = [
  {
    key: "KHAM_BENH",
    name: i18n.t(languageKeys.data_Kham_benh),
  },
  {
    key: "VIEN_PHI",
    name: i18n.t(languageKeys.data_Vien_phi),
  },
  {
    key: "BHYT",
    name: i18n.t(languageKeys.data_Bhyt),
  },
  {
    key: "LAY_MAU",
    name: i18n.t(languageKeys.data_Lay_mau),
  },
  {
    key: "NHA_THUOC",
    name: i18n.t(languageKeys.data_Nha_thuoc),
  },
  {
    key: "KHO_BHYT",
    name: i18n.t(languageKeys.data_Kho_bhyt),
  },
  {
    key: "XET_NGHIEM",
    name: i18n.t(languageKeys.data_Xet_nghiem),
  },
  {
    key: "CDHA",
    name: i18n.t(languageKeys.data_CDHA),
  },
  {
    key: "BUONG_DIEU_TRI",
    name: i18n.t(languageKeys.data_buong_dieu_tri),
  },
  {
    key: "THU_THUAT",
    name: i18n.t(languageKeys.data_thu_thuat),
  },
];

export const danhSachDoiTuong = [
  // { key: keys.BHYT, name: i18n.t(languageKeys.field_doi_tuong_BHYT) },
  { key: keys.VIEN_PHI, name: i18n.t(languageKeys.field_doi_tuong_vien_phi) },
  { key: keys.YEU_CAU, name: i18n.t(languageKeys.field_doi_tuong_yeu_cau) },
  {
    key: keys.NUOC_NGOAI,
    name: i18n.t(languageKeys.field_doi_tuong_nuoc_ngoai),
  },
];

export const danhSachKQKhamBenh = {
  KHOI_BENH: i18n.t(languageKeys.field_KQKB_khoi_benh),
  DO: i18n.t(languageKeys.field_KQKB_do),
  NANG: i18n.t(languageKeys.field_KQKB_nang),
  KHONG_THAY_DOI: i18n.t(languageKeys.field_KQKB_khong_thay_doi),
  TU_VONG: i18n.t(languageKeys.field_KQKB_tu_vong),
};

export const danhSachXuTri = {
  CHUYEN_KHOA: i18n.t(languageKeys.chuyen_khoa),
  RA_VIEN: i18n.t(languageKeys.field_cach_xu_tri_ra_vien),
  CHUYEN_VIEN: i18n.t(languageKeys.field_cach_xu_tri_chuyen_vien),
  TRON_VIEN: i18n.t(languageKeys.field_cach_xu_tri_tron_vien),
  XIN_RA_VIEN: i18n.t(languageKeys.field_cach_xu_tri_xin_ra_vien),
  TU_VONG: i18n.t(languageKeys.field_KQKB_tu_vong),
};

export const danhSachLoaiTaiKham = [
  { key: "NGAY", name: i18n.t(languageKeys.data_Ngay) },
  { key: "TUAN", name: i18n.t(languageKeys.data_Tuan) },
  { key: "THANG", name: i18n.t(languageKeys.data_Thang) },
];

export const danhSachKhoThuoc = {
  KT_TU_NGUYEN: i18n.t(languageKeys.data_Kho_thuoc_tu_nguyen),
  KT_BHYT: i18n.t(languageKeys.data_Kho_thuoc_bhyt),
};

export const danhSachLoaiKho = [
  { key: "KC", name: i18n.t(languageKeys.data_Kho_chan) },
  { key: "KL", name: i18n.t(languageKeys.data_Kho_le) },
  { key: "TT", name: i18n.t(languageKeys.data_Tu_truc) },
];

export const danhSachKieuKho = [
  { key: "KB", name: i18n.t(languageKeys.data_Noi_tru) },
  { key: "NT", name: i18n.t(languageKeys.data_Ngoai_tru) },
  { key: "TC", name: i18n.t(languageKeys.data_Noi_tru_Ngoai_tru) },
];
export const danhSachKieuKhoObj = {
  KB: i18n.t(languageKeys.data_Noi_tru),
  NT: i18n.t(languageKeys.data_Ngoai_tru),
  TC: i18n.t(languageKeys.data_Noi_tru_Ngoai_tru),
};

export const permissionTitle = {
  [featureKeys.quan_ly_he_thong]: i18n.t(languageKeys.menu_Quan_ly_he_thong),
  [featureKeys.quan_ly_danh_muc]: i18n.t(languageKeys.menu_Quan_ly_danh_muc),
  [featureKeys.thong_tin_cskcb]: i18n.t(languageKeys.menu_Thong_tin_cskcb),
  [featureKeys.quan_ly_nguoi_dung]: i18n.t(languageKeys.menu_Quan_ly_nguoi_dung),
  [featureKeys.lich_lam_viec]: i18n.t(languageKeys.menu_Lich_lam_viec),
  [featureKeys.quan_ly_tiep_don]: i18n.t(languageKeys.menu_Quan_ly_tiep_don),
  [featureKeys.tiep_don]: i18n.t(languageKeys.label_Tiep_don),
  [featureKeys.cuoc_hen_sap_toi]: i18n.t(languageKeys.label_quan_ly_lich_hen),
  [featureKeys.quan_ly_kham_benh]: i18n.t(languageKeys.menu_Quan_ly_kham_benh),
  [featureKeys.quan_ly_vien_phi]: i18n.t(languageKeys.menu_Quan_ly_vien_phi),
  [featureKeys.quan_ly_dich_vu_can_thanh_toan]: i18n.t(languageKeys.menu_Quan_ly_dich_vu_can_thanh_toan),
  [featureKeys.quan_ly_so_hoa_don]: i18n.t(languageKeys.menu_Quan_ly_so_hoa_don),
  [featureKeys.quan_ly_benh_nhan]: i18n.t(languageKeys.menu_Quan_ly_benh_nhan),
  [featureKeys.quan_ly_duoc_ngoai_tru]: i18n.t(languageKeys.menu_Quan_ly_duoc_ngoai_tru),
  [featureKeys.ban_thuoc]: i18n.t(languageKeys.menu_Ban_thuoc),
  [featureKeys.kho_thuoc]: i18n.t(languageKeys.menu_Kho_thuoc),
  [featureKeys.phieu_xuat_nhap]: i18n.t(languageKeys.menu_Phieu_xuat_nhap),
  [featureKeys.nha_cung_cap]: i18n.t(languageKeys.menu_Nha_cung_cap),
  [featureKeys.bang_dieu_khien]: i18n.t(languageKeys.menu_Bang_dieu_khien),
  [featureKeys.kho_duoc_ngoai_tru]: i18n.t(languageKeys.menu_Kho_duoc_ngoai_tru),
  [featureKeys.bao_cao_duoc_ngoai_tru]: i18n.t(languageKeys.menu_Bao_cao),
  [featureKeys.bao_cao_duoc]: i18n.t(languageKeys.bao_cao_duoc),
  [featureKeys.bao_cao]: i18n.t(languageKeys.menu_Bao_cao),
  [featureKeys.bao_cao_tiep_don]: i18n.t(languageKeys.tab_Bao_cao_tiep_don),
  [featureKeys.bao_cao_phieu_thu]: i18n.t(languageKeys.tab_Bao_cao_phieu_thu),
  [featureKeys.bao_cao_vien_phi]: i18n.t(languageKeys.tab_Bao_cao_vien_phi),
  [featureKeys.bao_cao_duoc_ngoai_tru]: i18n.t(languageKeys.menu_Bao_cao),
  [featureKeys.so_luong_ton_kho]: i18n.t(languageKeys.So_luong_ton_kho),
  [featureKeys.ton_kho]: i18n.t(languageKeys.ton_kho),
  [featureKeys.phieu_nhap_kho]: i18n.t(languageKeys.Phieu_nhap_kho),
  [featureKeys.phieu_xuat_kho]: i18n.t(languageKeys.Phieu_xuat_kho),
  [featureKeys.van_chuyen_kho]: i18n.t(languageKeys.Van_chuyen_kho),
  [featureKeys.the_kho]: i18n.t(languageKeys.The_kho),
  [featureKeys.quyen_duyet_phieu]: i18n.t(languageKeys.Quyen_duyet_phieu),
  [featureKeys.quan_ly_chan_doan_hinh_anh_ris]: i18n.t(languageKeys.ris_nhap_tay),

  [featureKeys.tao_mau_mo_ta_cdha]: i18n.t(languageKeys.phan_quyen_tao_mau_mo_ta),
  [featureKeys.sua_mau_mo_ta_cdha]: i18n.t(languageKeys.phan_quyen_sua_mau_mo_ta),
  [featureKeys.xoa_mau_mo_ta_cdha]: i18n.t(languageKeys.phan_quyen_xoa_mau_mo_ta),
  [featureKeys.khoa_mau_mo_ta_cdha]: i18n.t(languageKeys.phan_quyen_khoa_mau_mo_ta),
  [featureKeys.tra_ket_qua]: i18n.t(languageKeys.tra_ket_qua),
  [featureKeys.huy_tra_phieu_cdha]: i18n.t(languageKeys.huy_tra_phieu),
  [featureKeys.ban_thuoc]: i18n.t(languageKeys.menu_Ban_thuoc),
  [featureKeys.bao_cao_duoc]: i18n.t(languageKeys.bao_cao_duoc),
  [featureKeys.mau_mo_ta_cdha]: i18n.t(languageKeys.menu_mau_mo_ta_cdha),
  [featureKeys.tra_ket_qua_cdha]: i18n.t(languageKeys.menu_tra_kq_cdha),
};

//định nghĩa tên từng loại phiếu
export const dataLoaiPhieu = {
  PHIEU_NHAP: i18n.t(languageKeys.loai_phieu_nhap), //phiếu nhập hàng
  PHIEU_XUAT: i18n.t(languageKeys.loai_phieu_xuat), //phiếu xuất hàng
  //BAN_LE: i18n.t(languageKeys.loai_phieu_ban_le), //phiếu bán lẻ
  PHIEU_DIEU_CHINH: i18n.t(languageKeys.loai_phieu_dieu_chinh), //phiếu điều chỉnh tiền
  PHIEU_THANH_TOAN: i18n.t(languageKeys.loai_phieu_thanh_toan), //phiếu thanh toán
  //XUAT_HUY: i18n.t(languageKeys.loai_phieu_xuat_huy), //phiếu xuất huỷ
  //XUAT_TRA_NCC: i18n.t(languageKeys.loai_phieu_xuat_tra_ncc), //phiếu xuất trả nhà cung cấp
  //XUAT_BAN: i18n.t(languageKeys.loai_phieu_xuat_ban), //phiếu xuất bán,
  CHUYEN_KHO: i18n.t(languageKeys.phieu_chuyen_kho),
  XUAT_TRA_NCC: i18n.t(languageKeys.phan_loai_xuat_tra_ncc),
  XUAT_HUY: i18n.t(languageKeys.phan_loai_xuat_huy),
  BAN_BENH_NHAN: i18n.t(languageKeys.phan_loai_ban_benh_nhan),
  XUAT_KHAC: i18n.t(languageKeys.phan_loai_xuat_khac),
  XUAT_VO_HONG: i18n.t(languageKeys.phan_loai_xuat_vo_hong),
  XUAT_HET_HAN: i18n.t(languageKeys.phan_loai_xuat_het_han),
};

//loại phiếu thu bệnh nhân
export const loaiPhieu = {
  THANH_TOAN: "THANH_TOAN",
  HOAN_TIEN: "HOAN_TIEN",
  BAN_LE: "BAN_LE",
};

//Danh sách loại phiếu thu của bệnh nhân
export const danhSachLoaiPhieuBN = [
  { key: "BAN_THUOC", name: i18n.t(languageKeys.tab_Phieu_mua_thuoc) },
  { key: "THANH_TOAN", name: i18n.t(languageKeys.tab_Phieu_thanh_toan) },
  { key: "HOAN_TIEN", name: i18n.t(languageKeys.tab_Phieu_hoan_tien) },
];

export const nhomMau = [
  { key: "A", name: "A" },
  { key: "B", name: "B" },
  { key: "O", name: "O" },
  { key: "AB", name: "AB" },
];

export const RH = [
  { key: "DUONG", name: i18n.t(languageKeys.rh_duong) },
  { key: "AM", name: i18n.t(languageKeys.rh_am) },
];

export const dm_may_th = {
  XET_NGHIEM: "XET_NGHIEM",
  CDHA: "CDHA",
  TDCN: "TDCN",
  THU_THUAT: "THU_THUAT",
};

export const data_dm_may_th = {
  XET_NGHIEM: i18n.t(languageKeys.loai_khoa_xet_nghiem),
  CDHA: "CDHA",
  TDCN: "TDCN",
  THU_THUAT: i18n.t(languageKeys.data_thu_thuat),
};

export const loaiTuVong = [
  { key: "TREN_BAN_MO", name: i18n.t(languageKeys.tren_ban_mo) },
  { key: "TRONG_24H", name: i18n.t(languageKeys.trong_24h) },
  { key: "SAU_24H", name: i18n.t(languageKeys.sau_24h) },
];

export const listTaiBien = [
  { key: "DO_PHAU_THUAT", name: i18n.t(languageKeys.do_phau_thuat) },
  { key: "DO_THU_THUAT", name: i18n.t(languageKeys.do_thu_thuat) },
  { key: "DO_GAY_ME", name: i18n.t(languageKeys.do_gay_me) },
  { key: "DO_NHIEM_KHUAN", name: i18n.t(languageKeys.do_nhiem_khuan) },
  { key: "KHAC", name: i18n.t(languageKeys.data_Khac) },
];

//data chọn loại giường trong nội trú
export const dataLoaiGiuong = [
  { key: "GIUONG_THUONG", name: i18n.t(languageKeys.loai_giuong_thuong) },
  { key: "GIUONG_GHEP_2", name: i18n.t(languageKeys.loai_giuong_ghep_2) },
  { key: "GIUONG_GHEP_3", name: i18n.t(languageKeys.loai_giuong_ghep_3) },
];

// hoc ham
export const hoc_ham = [
  { key: "giao_su", name: i18n.t(languageKeys.data_Giao_su) },
  { key: "pho_giao_su", name: i18n.t(languageKeys.data_Pho_giao_su) },
  { key: "tien_si", name: i18n.t(languageKeys.data_Tien_si) },
  { key: "thac_si", name: i18n.t(languageKeys.data_Thac_si) },
  { key: "bs_ck_I", name: i18n.t(languageKeys.data_Bs_chuyen_khoa) + " II" },
  { key: "bs_ck_II", name: i18n.t(languageKeys.data_Bs_chuyen_khoa) + " I" },
  { key: "khac", name: i18n.t(languageKeys.data_Khac) },
];

// chuc danh
export const chuc_danh = [
  { key: "truong_khoa", name: i18n.t(languageKeys.data_Truong_khoa) },
  { key: "pho_khoa", name: i18n.t(languageKeys.data_Pho_khoa) },
  { key: "pho_giam_doc", name: i18n.t(languageKeys.data_Pho_giam_doc) },
  { key: "giam_doc", name: i18n.t(languageKeys.data_Giam_doc) },
  { key: "bac_si", name: i18n.t(languageKeys.data_Bac_si) },
];

// nhom nhan vien
export const nhom_nhan_vien = {
  [staffGroup.BAC_SI]: i18n.t(languageKeys.data_Bac_si),
  [staffGroup.THU_NGAN]: i18n.t(languageKeys.data_Thu_ngan),
  [staffGroup.KY_THUAT_VIEN_CDHA]: i18n.t(languageKeys.data_Ky_thuat_vien) + " " +i18n.t(languageKeys.chan_doan_hinh_anh).toLowerCase(),
  [staffGroup.KY_THUAT_VIEN_XN]: i18n.t(languageKeys.data_Ky_thuat_vien) + " " +i18n.t(languageKeys.xet_nghiem).toLowerCase(),
  [staffGroup.DIEU_DUONG]: i18n.t(languageKeys.data_Dieu_duong),
  [staffGroup.THU_KHO]: i18n.t(languageKeys.data_Thu_kho),
  [staffGroup.QUAN_TRI]: i18n.t(languageKeys.data_Quan_tri),
  [staffGroup.TIEP_TAN]: i18n.t(languageKeys.le_tan),
  [staffGroup.SALE]:"Sales",
  [staffGroup.DUOC_SI]:i18n.t(languageKeys.Duoc_si),
  [staffGroup.MARKETING]:"Marketing",
  [staffGroup.MKT_LEADER]:i18n.t(languageKeys.mkt_leader),
  [staffGroup.CSKH_LEADER]:i18n.t(languageKeys.cskh_leader),
  [staffGroup.CSKH]:i18n.t(languageKeys.cskh),
  [staffGroup.TELESALES]:"Telesales",
  // [staffGroup.nguoi_lay_mau]: i18n.t(languageKeys.data_Nguoi_lay_mau),
};

export const TEN_LOAI_KHO = {
  KHO_TONG: i18n.t(languageKeys.kho_tong),
  KHO_LE: i18n.t(languageKeys.kho_le),
  KHO_CHAN: i18n.t(languageKeys.data_Kho_chan),
  TU_TRUC: i18n.t(languageKeys.data_Tu_truc),
  NHA_THUOC: i18n.t(languageKeys.nha_thuoc),
};

export const DATA_LOAI_KHO = [
  {
    key: "KHO_TONG",
    name: i18n.t(languageKeys.kho_tong),
  },
  {
    key: "KHO_LE",
    name: i18n.t(languageKeys.kho_le),
  },
  {
    key: "NHA_THUOC",
    name: i18n.t(languageKeys.nha_thuoc),
  },
  {
    key: "TU_TRUC",
    name: i18n.t(languageKeys.data_Tu_truc),
  },
];

export const LOAI_BENH_NHAN_AP_DUNG = [
  {
    key: "BHYT",
    name: i18n.t(languageKeys.benh_nhan_bhyt),
  },
  {
    key: "NOI_TRU",
    name: i18n.t(languageKeys.benh_nhan_noi_tru),
  },
  {
    key: "NGOAI_TRU",
    name: i18n.t(languageKeys.benh_nhan_ngoai_tru),
  },
];
