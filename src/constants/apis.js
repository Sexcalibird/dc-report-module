import apiServices from "../config/apiServices";
import { getUrlApi } from "../helpers";

export default class ApiStrings {
  // Đăng nhập
  static login = getUrlApi(apiServices.GATEWAY_CIS + "api/public/cis/dangnhap"); // đăng nhập

  // danh mục bệnh viện
  static dm_bv_lay_ds = getUrlApi(apiServices.GATEWAY_CIS + "api/public/danhmucbenhvien/layDMBenhVien"); // lấy danh sách bệnh viện
  static dm_bv_them_moi = getUrlApi(apiServices.GATEWAY_CIS + "api/public/danhmucbenhvien/themDMBenhVien"); // Thêm mới bệnh viện
  static dm_bv_cap_nhat = getUrlApi(apiServices.GATEWAY_CIS + "api/public/danhmucbenhvien/suaDMBenhVien"); // Cập nhật bệnh viện
  static dm_bv_xoa_ds = getUrlApi(apiServices.GATEWAY_CIS + "api/public/danhmucbenhvien/xoaNhieuDMBenhVien"); // Xoa danh sach bệnh viện
  static dm_bv_khoa_ds = getUrlApi(apiServices.GATEWAY_CIS + "api/public/danhmucbenhvien/khoaNhieuDMBenhVien"); // Khoa danh sach bệnh viện

  // danh mục khoa
  static dm_khoa_them_moi = getUrlApi(apiServices.GATEWAY_CIS + "api/partner/danh-muc/khoa/them"); // thêm mới khoa
  static dm_khoa_nhap_ds = getUrlApi(apiServices.GATEWAY_CIS + "api/partner/danh-muc/khoa/nhapDanhSach"); // import danh sách khoa
  static dm_khoa_lay_ds = getUrlApi(apiServices.GATEWAY_CIS + "api/partner/danh-muc/khoa/layDanhSach"); // lấy danh sách khoa
  static dm_khoa_cap_nhat = getUrlApi(apiServices.GATEWAY_CIS + "api/partner/danh-muc/khoa/suaThongTin"); // cập nhật thông tin khoa
  static dm_khoa_xoa = getUrlApi(apiServices.GATEWAY_CIS + "api/partner/danh-muc/khoa/xoa"); // xóa (1 hoặc nhiều) khoa
  static dm_khoa_ds_byt = getUrlApi(apiServices.GATEWAY_CIS + "api/public/khoaBYT/layDanhSach"); // Lấy danh sách chuyên khoa Bộ Y Tế
  static dm_khoa_lock_ds = getUrlApi(apiServices.GATEWAY_CIS + "api/partner/danh-muc/khoa/suaTrangThai"); // khoá (1 hoặc nhiều) khoa

  // danh mục phòng
  static dm_phong_them_moi = getUrlApi(apiServices.GATEWAY_CIS + "api/partner/danh-muc/phong/them"); // thêm mới phòng
  static dm_phong_nhap_ds = getUrlApi(apiServices.GATEWAY_CIS + "api/partner/danh-muc/phong/nhapDanhSach"); // import danh sách phòng
  static dm_phong_lay_ds = getUrlApi(apiServices.GATEWAY_CIS + "api/partner/danh-muc/phong/layDanhSach"); // lấy danh sách phòng
  static dm_phong_cap_nhat = getUrlApi(apiServices.GATEWAY_CIS + "api/partner/danh-muc/phong/suaThongTin"); // cập nhật thông tin phòng
  static dm_phong_xoa = getUrlApi(apiServices.GATEWAY_CIS + "api/partner/danh-muc/phong/xoa"); // xóa (1 hoặc nhiều) phòng
  static dm_phong_chi_tiet = getUrlApi(apiServices.GATEWAY_CIS + "api/partner/danh-muc/phong/layChiTiet"); // lấy thông tin chi tiết của phòng
  static dm_phong_sua_trang_thai = getUrlApi(apiServices.GATEWAY_CIS + "api/partner/danh-muc/phong/suaTrangThai"); // sửa trạng thái hoạt động của 1 hoặc nhiều phòng

  // danh mục dv kĩ thuật
  static dm_dvkt_lay_ds = getUrlApi(apiServices.GATEWAY_CIS + "api/partner/public/dichvu/layDMDichVu"); // lấy danh sách dv kĩ thuật
  static dm_dvkt_them_moi = getUrlApi(apiServices.GATEWAY_CIS + "api/partner/public/dichvu/themDMDichVu"); // Thêm mới dv kĩ thuật
  static dm_dvkt_cap_nhat = getUrlApi(apiServices.GATEWAY_CIS + "api/partner/public/dichvu/suaDMDichVu"); // Cập nhật dv kĩ thuật
  static dm_dvkt_lay_ds_co_hieu_luc = getUrlApi(
    apiServices.GATEWAY_CIS + "api/partner/public/dichvu/layDMDichVuHieuLuc",
  ); // lấy danh sách dv kĩ thuật có hiệu lực
  static dm_dvkt_xoa = getUrlApi(apiServices.GATEWAY_CIS + "api/partner/public/dichvu/xoaDMDichVuTheoDS"); // xoa (danh sách) dv kĩ thuật
  static dm_dvkt_lay_chi_tiet = getUrlApi(apiServices.GATEWAY_CIS + "api/partner/public/dichvu/chiTietDichVu"); // lấy thông tin chi tiết dịch vụ
  static dm_dvkt_lock_ds = getUrlApi(apiServices.GATEWAY_CIS + "api/partner/public/dichvu/khoaDMDichVuTheoDS"); // lock ds dịch vụ
  static dm_dvkt_unlock_ds = getUrlApi(apiServices.GATEWAY_CIS + "api/partner/public/dichvu/moDMDichVuTheoDS"); // unlock ds dịch vụ

  // danh mục nhóm dv kĩ thuật
  static dm_nhom_dvkt_lay_ds = getUrlApi(apiServices.GATEWAY_CIS + "api/partner/public/dichvu/layDMNhomDichVuKyThuat"); // lấy danh sách nhóm dv kĩ thuật
  static dm_nhom_dvkt_them_moi = getUrlApi(
    apiServices.GATEWAY_CIS + "api/partner/public/dichvu/themDMNhomDichVuKyThuat",
  ); // Thêm mới nhóm dv kĩ thuật
  static dm_nhom_dvkt_cap_nhat = getUrlApi(
    apiServices.GATEWAY_CIS + "api/partner/public/dichvu/suaDMNhomDichVuKyThuat",
  ); // Cập nhật nhóm dv kĩ thuật
  static dm_nhom_dvkt_lay_ds_co_hieu_luc = getUrlApi(
    apiServices.GATEWAY_CIS + "api/partner/public/dichvu/layDMNhomDichVuKyThuatHieuLuc",
  ); // lấy danh sách nhóm dv kĩ thuật có hiệu lực
  static dm_nhom_dvkt_xoa = getUrlApi(apiServices.GATEWAY_CIS + "api/partner/public/dichvu/xoaDMNhomDichVuTheoDS"); // Xóa (danh sách) nhóm dv kĩ thuật
  static dm_nhom_dvkt_lock_ds = getUrlApi(apiServices.GATEWAY_CIS + "api/partner/public/dichvu/khoaDMNhomDichVuTheoDS"); // lock ds nhom dịch vụ
  static dm_nhom_dvkt_unlock_ds = getUrlApi(apiServices.GATEWAY_CIS + "api/partner/public/dichvu/moDMNhomDichVuTheoDS"); // unlock ds nhom dịch vụ

  // danh mục loại dv kĩ thuật
  static dm_loai_dvkt_lay_ds = getUrlApi(apiServices.GATEWAY_CIS + "api/partner/public/dichvu/layDMLoaiDichVu"); // lấy danh sách loại dv kĩ thuật
  static dm_loai_dvkt_them_moi = getUrlApi(apiServices.GATEWAY_CIS + "api/partner/public/dichvu/themDMLoaiDichVu"); // Thêm mới loại dv kĩ thuật
  static dm_loai_dvkt_cap_nhat = getUrlApi(apiServices.GATEWAY_CIS + "api/partner/public/dichvu/suaDMLoaiDichVu"); // Cập nhật loại dv kĩ thuật
  static dm_loai_dvkt_lay_ds_co_hieu_luc = getUrlApi(
    apiServices.GATEWAY_CIS + "api/partner/public/dichvu/layDMLoaiDichVuHieuLuc",
  ); // lấy danh sách loại dv kĩ thuật có hiệu lực
  static dm_loai_dvkt_xoa = getUrlApi(apiServices.GATEWAY_CIS + "api/partner/public/dichvu/xoaDMLoaiDichVuTheoDS"); // Xóa (danh sách) loại dv kĩ thuật
  static dm_loai_dvkt_lock_ds = getUrlApi(apiServices.GATEWAY_CIS + "api/partner/public/dichvu/khoaDMLoaiDichVuTheoDS"); // lock ds loai dịch vụ
  static dm_loai_dvkt_unlock_ds = getUrlApi(apiServices.GATEWAY_CIS + "api/partner/public/dichvu/moDMLoaiDichVuTheoDS"); // unlock ds loai dịch vụ

  //danh mục máy thực hiện
  static dm_layds_may = getUrlApi(apiServices.GATEWAY_CIS + "api/partner/public/ris/dmMayThucHienCLS"); // lấy danh sách máy thực hiện
  static dm_layds_may_hieu_luc = getUrlApi(apiServices.GATEWAY_CIS + "api/partner/public/ris/dmMayThucHienCLSHieuLuc"); // lấy danh sách máy thực hiện hiệu lực
  static dm_them_may_thuc_hien = getUrlApi(apiServices.GATEWAY_CIS + "api/partner/public/ris/themDmMayThucHienCLS"); // thêm máy thực hiện CLS
  static dm_cap_nhat_may_thuc_hien = getUrlApi(
    apiServices.GATEWAY_CIS + "api/partner/public/ris/capNhatDmMayThucHienCLS",
  ); // cập nhật máy thực hiện CLS
  static xoa_dm_may = getUrlApi(apiServices.GATEWAY_CIS + "api/partner/public/ris/xoaNhieuDmMayThucHienCLS"); // xoa 1 hoac nh máy thực hiện CLS
  static khoa_dm_may = getUrlApi(apiServices.GATEWAY_CIS + "api/partner/public/ris/khoaNhieuDmMayThucHienCLS"); // khoa 1 hoac nh máy thực hiện CLS

  // danh mục nhóm hóa đơn
  static dm_hoa_don_lay_ds = getUrlApi(apiServices.GATEWAY_CIS + "api/partner/public/hoadon/layDMHoaDon"); // lấy danh sách hóa đơn
  static dm_hoa_don_lay_ds_co_hieu_luc = getUrlApi(
    apiServices.GATEWAY_CIS + "api/partner/public/hoadon/layDMHoaDonHieuLuc",
  ); // lấy danh sách hóa đơn có hiệu lực
  static dm_hoa_don_them_moi = getUrlApi(apiServices.GATEWAY_CIS + "api/partner/public/hoadon/themDMHoaDon"); // thêm mới hóa đơn
  static dm_hoa_don_cap_nhat = getUrlApi(apiServices.GATEWAY_CIS + "api/partner/public/hoadon/suaDMHoaDon"); // cập nhật hóa đơn
  static dm_hoa_don_xoa = getUrlApi(apiServices.GATEWAY_CIS + "api/partner/public/hoadon/xoaDMHoaDonTheoDS"); // xóa (danh sách) hóa đơn
  static dm_hoa_don_lock_ds = getUrlApi(apiServices.GATEWAY_CIS + "api/partner/public/hoadon/khoaDMHoaDonTheoDS"); // lock ds loai dịch vụ
  static dm_hoa_don_unlock_ds = getUrlApi(apiServices.GATEWAY_CIS + "api/partner/public/hoadon/moDMHoaDonTheoDS"); // unlock ds loai dịch vụ

  // danh mục thông tin cá nhân VD= địa chỉ; nghề nghiệp ; dân tộc ; quốc gia
  // danh mục tỉnh thành
  static dm_tinhthanh_lay_ds = getUrlApi(apiServices.GATEWAY_CIS + "api/public/tinh-thanh/layDanhSach"); // lấy danh sách tỉnh
  static dm_tinhthanh_them = getUrlApi(apiServices.GATEWAY_CIS + "api/public/tinh-thanh/them"); // thêm tỉnh thành
  static dm_tinhthanh_nhap_ds = getUrlApi(apiServices.GATEWAY_CIS + "api/public/tinh-thanh/nhapDanhSach"); //import tỉnh thành;
  static dm_tinhthanh_cap_nhat = getUrlApi(apiServices.GATEWAY_CIS + "api/public/tinh-thanh/suaThongTin"); // cập nhật thông tin tỉnh thành
  static dm_tinhthanh_sua_trang_thai = getUrlApi(apiServices.GATEWAY_CIS + "api/public/tinh-thanh/suaTrangThai"); // cập nhật trạng thái hoạt động tỉnh thành;
  //dm_tinhthanh_tao_mac_dinh = getUrlApi(apiServices.GATEWAY_CIS) + "api/public/tinh-thanh/taoMacDinh" ; // tạo mặc định

  // danh mục quận huyện
  static dm_quanhuyen_lay_ds = getUrlApi(apiServices.GATEWAY_CIS + "api/public/quan-huyen/layDanhSach"); // lấy danh sách huyện
  static dm_quanhuyen_them = getUrlApi(apiServices.GATEWAY_CIS + "api/public/quan-huyen/them"); // thêm  quận huyện
  static dm_quanhuyen_nhap_ds = getUrlApi(apiServices.GATEWAY_CIS + "api/public/quan-huyen/nhapDanhSach"); //import quận huyện;
  static dm_quanhuyen_cap_nhat = getUrlApi(apiServices.GATEWAY_CIS + "api/public/quan-huyen/suaThongTin"); // cập nhật thông tin quận huyện
  static dm_quanhuyen_sua_trang_thai = getUrlApi(apiServices.GATEWAY_CIS + "api/public/quan-huyen/suaTrangThai"); // cập nhật trạng thái hoạt động quận huyện;
  //dm_tinhthanh_tao_mac_dinh = getUrlApi(apiServices.GATEWAY_CIS) + "api/public/tinh-thanh/taoMacDinh" ; // tạo mặc định

  // danh mục xã phường
  static dm_xaphuong_lay_ds = getUrlApi(apiServices.GATEWAY_CIS + "api/public/xa-phuong/layDanhSach"); // lấy danh sách xã phường
  static dm_xaphuong_them = getUrlApi(apiServices.GATEWAY_CIS + "api/public/xa-phuong/them"); // thêm  xã phường
  static dm_xaphuong_nhap_ds = getUrlApi(apiServices.GATEWAY_CIS + "api/public/xa-phuong/nhapDanhSach"); //import xã phường;
  static dm_xaphuong_cap_nhat = getUrlApi(apiServices.GATEWAY_CIS + "api/public/xa-phuong/suaThongTin"); // cập nhật thông tin xã phường
  static dm_xaphuong_sua_trang_thai = getUrlApi(apiServices.GATEWAY_CIS + "api/public/xa-phuong/suaTrangThai"); // cập nhật trạng thái hoạt động xã phường;
  //dm_tinhthanh_tao_mac_dinh = getUrlApi(apiServices.GATEWAY_CIS) + "api/public/tinh-thanh/taoMacDinh" ; // tạo mặc định

  // danh mục nghề nghiệp
  static dm_nghenghiep_lay_ds = getUrlApi(apiServices.GATEWAY_CIS + "api/public/danh-muc/layDMNgheNghiep"); // lấy danh sách nghề nghiệp

  // danh mục dân tộc
  static dm_dantoc_lay_ds = getUrlApi(apiServices.GATEWAY_CIS + "api/public/dan-toc/layDanhSach"); // lấy danh sách dân tộc

  // danh mục quốc gia
  static dm_quocgia_lay_ds = getUrlApi(apiServices.GATEWAY_CIS + "api/public/quoc-gia/layDanhSach"); // lấy danh sách quốc gia
  static dm_quocgia_lay_ds_co_hieu_luc = getUrlApi(apiServices.GATEWAY_CIS + "api/public/quoc-gia/layDanhSachHieuLuc"); // lấy danh sách quốc gia co hieu luc
  static dm_quocgia_them = getUrlApi(apiServices.GATEWAY_CIS + "api/public/quoc-gia/them"); // thêm  quốc gia
  static dm_quocgia_nhap_ds = getUrlApi(apiServices.GATEWAY_CIS + "api/public/quoc-gia/nhapDanhSach"); //import quốc gia;
  static dm_quocgia_cap_nhat = getUrlApi(apiServices.GATEWAY_CIS + "api/public/quoc-gia/suaThongTin"); // cập nhật thông tin quốc gia
  static dm_quocgia_sua_trang_thai = getUrlApi(apiServices.GATEWAY_CIS + "api/public/quoc-gia/suaTrangThai"); // cập nhật trạng thái hoạt động quốc gia;
  //dm_tinhthanh_tao_mac_dinh = getUrlApi(apiServices.GATEWAY_CIS) + "api/public/tinh-thanh/taoMacDinh" ; // tạo mặc định

  // danh mục đơn vị tính
  static dm_don_vi_tinh_lay_ds = getUrlApi(apiServices.GATEWAY_CIS + "api/partner/public/donvitinh/layDMDonViTinh"); // lấy danh sách đơn vị tính
  static dm_don_vi_tinh_lay_ds_co_hieu_luc = getUrlApi(
    apiServices.GATEWAY_CIS + "api/partner/public/donvitinh/layDMDonViTinhHieuLuc",
  ); // lấy danh sách đơn vị tính có hiệu lực
  static dm_don_vi_tinh_them_moi = getUrlApi(apiServices.GATEWAY_CIS + "api/partner/public/donvitinh/themDMDonViTinh"); // thêm mới đơn vị tính
  static dm_don_vi_tinh_cap_nhat = getUrlApi(apiServices.GATEWAY_CIS + "api/partner/public/donvitinh/suaDMDonViTinh"); // cập nhật đơn vị tính
  static dm_don_vi_tinh_xoa_ds = getUrlApi(
    apiServices.GATEWAY_CIS + "api/partner/public/donvitinh/xoaNhieuDMDonViTinh",
  ); // xoa ds don vi tinh
  static dm_don_vi_tinh_khoa_ds = getUrlApi(
    apiServices.GATEWAY_CIS + "api/partner/public/donvitinh/khoaNhieuDMDonViTinh",
  ); // khoa ds don vi tinh
  static sua_ghi_chu_don_thuoc = getUrlApi(apiServices.GATEWAY_CIS + "api/partner/public/lichkham/suaGhiChuDonThuoc"); // lấy danh sách đơn vị tính

  // danh mục nhóm BHYT
  static dm_nhom_bhyt_lay_ds = getUrlApi(apiServices.GATEWAY_CIS + "api/public/bhyt/layDMNHomBHYT"); // lấy danh sách nhóm bhyt có hiệu lực

  //danh mục ICD
  static dm_ICD_lay_ds = getUrlApi(apiServices.GATEWAY_CIS + "api/public/icd10/layDMICD"); // lấy danh sách ICD 10
  static dm_ICD_them = getUrlApi(apiServices.GATEWAY_CIS + "api/public/icd10/themDMICD"); // thêm ICD
  static dm_ICD_sua = getUrlApi(apiServices.GATEWAY_CIS + "api/public/icd10/suaDMICD"); // sửa ICD

  //danh mục nhom ICD
  static dm_ICD_lay_ds_nhom = getUrlApi(apiServices.GATEWAY_CIS + "api/public/icd10/layDMNhomICD"); // lấy các nhóm ICD 10
  static dm_ICD_them_moi_nhom = getUrlApi(apiServices.GATEWAY_CIS + "api/public/icd10/themDMNhomICD"); // thêm nhóm ICD
  static dm_ICD_sua_nhom = getUrlApi(apiServices.GATEWAY_CIS + "api/public/icd10/suaDMNhomICD"); /// sửa nhóm ICD
  static dm_ICD_lay_ds_nhom_co_hieu_luc = getUrlApi(apiServices.GATEWAY_CIS + "api/public/icd10/layDMNhomICDHieuLuc"); // lấy danh sách nhóm icd có hiệu lực

  // thông tin cơ sở khám chữa bệnh
  static dm_thong_tin_cskcb = getUrlApi(apiServices.GATEWAY_CIS + "api/partner/public/benhvien/layBenhVien"); /// lấy chi tiết cơ sở khám chữa bệnh
  static dm_update_thong_tin_cskcb = getUrlApi(apiServices.GATEWAY_CIS + "api/partner/public/benhvien/suaBenhVien"); // sửa thông tin cơ sở khám chữa bệnh
  static dm_lay_tuyen_bv = getUrlApi(apiServices.GATEWAY_CIS + "api/public/benhvien/layDMTuyenBenhVien"); // lấy tuyến bệnh viện
  static dm_hang_bv = getUrlApi(apiServices.GATEWAY_CIS + "api/public/benhvien/layDMHangBenhVien"); // lấy hạng bệnh viên
  // tiếp đón
  static tiep_don_ds_da_tiep_nhan = getUrlApi(
    apiServices.GATEWAY_CIS + "api/partner/public/lichkham/layDsLichKhamDaTiepNhan",
  ); // lấy danh sách lịch khám đã tiếp nhận
  static bao_cao_tiep_don_ds_da_tiep_nhan = getUrlApi(
    apiServices.GATEWAY_CIS + "api/partner/public/lichkham/layDataLichKhamBCTiepDon",
  ); // lấy danh sách lịch khám đã tiếp nhận tại báo cáo
  static tiep_don_luu_dang_ky_kham = getUrlApi(apiServices.GATEWAY_CIS + "api/partner/public/lichkham/luuLichKham"); // lưu đăng ký khám
  static tiep_don_luu_dang_ky_can_lam_sang = getUrlApi(
    apiServices.GATEWAY_CIS + "api/partner/public/lichkham/luuDangKyCLS",
  ); // lưu đăng ký khám
  static tiep_don_ds_doi_tuong_benh_nhan = getUrlApi(
    apiServices.GATEWAY_CIS + "api/public/lichkham/layDoiTuongBenhNhan",
  ); // lấy ds đối tượng bệnh nhân
  static in_phieu_tiep_don = getUrlApi(apiServices.GATEWAY_CIS + "api/partner/public/lichkham/inPhieuTiepDon"); // lấy danh sách phiếu in
  static lay_ds_phieu_tiep_don = getUrlApi(apiServices.GATEWAY_CIS + "api/partner/public/inPDF/inPhieuTiepDon"); // in phieu tiep don
  static tiep_don_chi_tiet_lich_kham = getUrlApi(
    apiServices.GATEWAY_CIS + "api/partner/public/lichkham/layChiTietLichKham",
  ); // lấy chi tiết lượt khám theo lượt khám ID
  static tiep_don_kiem_tra_thong_tin = getUrlApi(
    apiServices.GATEWAY_CIS + "api/partner/public/benhNhan/kiemTraThongTin",
  ); // kiểm tra thông tin bệnh nhân trên db

  /// VIEN phi _ so hoa don
  static vien_phi_lay_ds_so_hoa_don = getUrlApi(
    apiServices.GATEWAY_CIS + "api/partner/public/soHoaDon/laySoHoaDonTatCa",
  );
  static vien_phi_tao_so_hoa_don = getUrlApi(apiServices.GATEWAY_CIS + "api/partner/public/soHoaDon/themSoHoaDon");
  static vien_phi_lay_chi_tiet_so_hoa_don = getUrlApi(
    apiServices.GATEWAY_CIS + "api/partner/public/soHoaDon/layChiTietSoHoaDon",
  );
  static vien_phi_cap_nhat_so_hoa_don = getUrlApi(apiServices.GATEWAY_CIS + "api/partner/public/soHoaDon/suaSoHoaDon");
  static vien_phi_xoa_so_hoa_don = getUrlApi(apiServices.GATEWAY_CIS + "api/partner/public/soHoaDon/xoaNhieuSoHoaDon");
  static lay_ds_so_hoa_don_co_phan_quyen = getUrlApi(
    apiServices.GATEWAY_CIS + "api/partner/public/soHoaDon/laySoHoaDonPhanQuyen",
  ); // lấy danh sách sổ tổng hợp theo phân quyền user
  static vien_phi_lay_danh_sach_hoa_don_trong_so = getUrlApi(
    apiServices.GATEWAY_CIS + "api/partner/public/hoadon/layDsHoaDonTheoSo",
  );
  static in_hoa_don_thanh_toan = getUrlApi(apiServices.GATEWAY_CIS + "api/partner/public/inPDF/inPhieuThuPhiDV"); ///in hóa đơn theo id hóa đơn
  static vien_phi_lay_danh_sach_hoa_don_theo_benh_nhan = getUrlApi(
    apiServices.GATEWAY_CIS + "api/partner/public/hoadon/layDanhSachHoaDonTheoBenhNhan",
  ); //lay danh sach hoa don theo benh nhan
  /// USER
  static dm_lay_ds_user = getUrlApi(apiServices.GATEWAY_CIS + "api/partner/public/nhansu/layDsNhanSu"); // lấy danh sách user
  static dm_them_moi_user = getUrlApi(apiServices.GATEWAY_CIS + "api/partner/public/nhansu/themNhanSu"); // thêm mới user
  static dm_cap_nhat_user = getUrlApi(apiServices.GATEWAY_CIS + "api/partner/public/nhansu/capNhatNhanSu"); // cập nhật user
  static dm_xoa_ds_user = getUrlApi(apiServices.GATEWAY_CIS + "api/partner/public/nhansu/xoaNhanSuTheoDs"); // xóa user
  static dm_khoa_ds_user = getUrlApi(apiServices.GATEWAY_CIS + "api/partner/public/nhansu/khoaNhanSuTheoDs"); // khóa user
  static dm_lay_phong_theo_khoa = getUrlApi(apiServices.GATEWAY_CIS + "api/partner/danh-muc/phong/layPhongTheoKhoa"); // lấy phòng theo khoa
  static dm_user_lay_ds_quyen = getUrlApi(apiServices.GATEWAY_CIS + "api/partner/public/quyen/layDSTinhNang"); // lấy danh sách quyền

  static tiep_don_ds_phong_theo_dv = getUrlApi(
    apiServices.GATEWAY_CIS + "api/partner/public/lichkham/layPhongTheoDVID",
  ); // lấy ds phòng theo dịch vụ
  static tiep_don_tao_benh_nhan = getUrlApi(apiServices.GATEWAY_CIS + "api/partner/public/benhNhan/themBenhNhan"); // thêm bệnh nhân
  static tiep_don_ds_benh_nhan = getUrlApi(apiServices.GATEWAY_CIS + "api/partner/public/benhNhan/layDanhSachBenhNhan"); // lấy ds bệnh nhân
  static lay_nhom_nhan_su = getUrlApi(apiServices.GATEWAY_CIS + "api/partner/public/nhansu/layNhomNhanSuBenhVien");
  static lay_phong_theo_nhan_su = getUrlApi(apiServices.GATEWAY_CIS + "api/partner/public/nhansu/layPhongTheoNhanSuID");

  /// apis DANH MỤC THUỐC
  static dm_lay_ds_hang_sx = getUrlApi(apiServices.GATEWAY_CIS + "api/partner/public/hangsx/layDMHangSanXuat");
  static dm_lay_ds_hang_sx_co_hieu_luc = getUrlApi(
    apiServices.GATEWAY_CIS + "api/partner/public/hangsx/layDMHangSanXuatHieuLuc",
  );
  static dm_them_hang_sx = getUrlApi(apiServices.GATEWAY_CIS + "api/partner/public/hangsx/themDMHangSanXuat");
  static dm_sua_hang_sx = getUrlApi(apiServices.GATEWAY_CIS + "api/partner/public/hangsx/suaDMHangSanXuat");
  static dm_xoa_ds_hang_sx = getUrlApi(apiServices.GATEWAY_CIS + "api/partner/public/hangsx/xoaNhieuDMHangSx");
  static dm_khoa_ds_hang_sx = getUrlApi(apiServices.GATEWAY_CIS + "api/partner/public/hangsx/khoaNhieuDMHangSx");

  static dm_lay_ds_duong_dung = getUrlApi(apiServices.GATEWAY_CIS + "api/partner/public/duongdung/layDMDuongDungBYT");
  static dm_them_duong_dung = getUrlApi(apiServices.GATEWAY_CIS + "api/partner/public/duongdung/themDMDuongDungBYT");
  static dm_sua_duong_dung = getUrlApi(apiServices.GATEWAY_CIS + "api/partner/public/duongdung/suaDMDuongDungBYT");
  static dm_xoa_ds_duong_dung = getUrlApi(
    apiServices.GATEWAY_CIS + "api/partner/public/duongdung/xoaNhieuDMDuongDungBYT",
  );
  static dm_khoa_ds_duong_dung = getUrlApi(
    apiServices.GATEWAY_CIS + "api/partner/public/duongdung/khoaNhieuDMDuongDungBYT",
  );

  static dm_lay_ds_hoat_chat = getUrlApi(apiServices.GATEWAY_CIS + "api/partner/public/hoatchat/layDMHoatChat");
  static dm_lay_ds_hoat_chat_co_hieu_luc = getUrlApi(
    apiServices.GATEWAY_CIS + "api/partner/public/hoatchat/layDMHoatChatHieuLuc",
  );
  static dm_them_hoat_chat = getUrlApi(apiServices.GATEWAY_CIS + "api/partner/public/hoatchat/themDMHoatChat");
  static dm_sua_hoat_chat = getUrlApi(apiServices.GATEWAY_CIS + "api/partner/public/hoatchat/suaDMHoatChat");
  static dm_xoa_ds_hoat_chat = getUrlApi(apiServices.GATEWAY_CIS + "api/partner/public/hoatchat/xoaNhieuDMHoatChat");
  static dm_khoa_ds_hoat_chat = getUrlApi(apiServices.GATEWAY_CIS + "api/partner/public/hoatchat/khoaNhieuDMHoatChat");

  static dm_lay_ds_thuoc = getUrlApi(apiServices.GATEWAY_CIS + "api/partner/public/thuoc/layDMThuoc");
  static dm_them_thuoc = getUrlApi(apiServices.GATEWAY_CIS + "api/partner/public/thuoc/themDMThuoc");
  static dm_them_thuoc_v2 = getUrlApi(apiServices.GATEWAY_CIS + "api/partner/public/thuoc/themDMThuocV2");
  static dm_sua_thuoc = getUrlApi(apiServices.GATEWAY_CIS + "api/partner/public/thuoc/suaDMThuoc");
  static dm_xoa_ds_thuoc = getUrlApi(apiServices.GATEWAY_CIS + "api/partner/public/thuoc/xoaNhieuDMThuoc");
  static dm_khoa_ds_thuoc = getUrlApi(apiServices.GATEWAY_CIS + "api/partner/public/thuoc/khoaNhieuDMThuoc");

  static dm_lay_ds_kho_tutruc = getUrlApi(apiServices.GATEWAY_CIS + "api/partner/public/khoTuTruc/layDMKhoTuTruc");
  static dm_them_kho_tutruc = getUrlApi(apiServices.GATEWAY_CIS + "api/partner/public/khoTuTruc/themDMKhoTuTruc");
  static dm_sua_kho_tutruc = getUrlApi(apiServices.GATEWAY_CIS + "api/partner/public/khoTuTruc/suaDMKhoTuTruc");
  static dm_xoa_ds_kho_tutruc = getUrlApi(apiServices.GATEWAY_CIS + "api/partner/public/khoTuTruc/xoaNhieuDMKhoTuTruc");
  static dm_khoa_ds_kho_tutruc = getUrlApi(
    apiServices.GATEWAY_CIS + "api/partner/public/khoTuTruc/khoaNhieuDMKhoTuTruc",
  );

  static search_dm_thuoc = getUrlApi(apiServices.GATEWAY_CIS + "api/partner/public/thuoc/searchDMThuoc"); // api tìm kiếm thuốc theo tên ; mã ; hoạt chất
  ///Api liên quan đến phần khám bệnh
  static khambenh_ds_benh_nhan_kham = getUrlApi(
    apiServices.GATEWAY_CIS + "api/partner/public/lichkham/layHangChoLichKham",
  ); //lấy danh sách bệnh nhân chờ khám; đang khám CLS; hoàn thành
  static khambenh_lay_dm_phong = getUrlApi(
    apiServices.GATEWAY_CIS + "api/partner/danh-muc/phong/layDanhMucPhongHieuLuc",
  ); //lấy danh sách phòng mà bác sĩ đang làm việc
  static khambenh_lay_lskb_benh_nhan = getUrlApi(
    apiServices.GATEWAY_CIS + "api/partner/public/lichkham/layLichSuKhamBenh",
  ); // lấy danh sách lịch sử khám bệnh của bệnh nhân
  static khambenh_lay_ds_xu_tri = getUrlApi(apiServices.GATEWAY_CIS + "api/public/lichkham/layDsXuTri"); // lấy danh sách xử trí
  static khambenh_luu_thong_tin_kham = getUrlApi(
    apiServices.GATEWAY_CIS + "api/partner/public/lichkham/luuThongTinKhamBenh",
  ); // lưu thông tin khám bệnh
  static khambenh_lay_thong_tin_kham = getUrlApi(
    apiServices.GATEWAY_CIS + "api/partner/public/lichkham/layThongTinKhamBenh",
  ); // lấy thông tin khám bệnh
  static khambenh_luu_don_thuoc = getUrlApi(apiServices.GATEWAY_CIS + "api/partner/public/lichkham/luuDonThuoc"); // lưu đơn thuốc
  static khambenh_lay_ds_don_thuoc = getUrlApi(apiServices.GATEWAY_CIS + "api/partner/public/lichkham/layDsDonThuoc"); //lấy danh sách đon thuốc theo lượt điều trị
  static khamnbenh_lay_chi_tiet_don_thuoc = getUrlApi(
    apiServices.GATEWAY_CIS + "api/partner/public/lichkham/layChiTietDonThuoc",
  ); // lấy chi tiết đơn thuốc
  static khambenh_xoa_ds_don_thuoc = getUrlApi(
    apiServices.GATEWAY_CIS + "api/partner/public/lichkham/khoaDonThuocTheoDs",
  ); // xóa danh sahcs đơn thuốc
  static khambenh_lay_chi_tiet_benh_nhan = getUrlApi(
    apiServices.GATEWAY_CIS + "api/partner/public/lichkham/layChiTietBenhNhanTheoLuotKham",
  ); // lấy chi tiết bệnh nhân theo lượt khám
  static khambenh_lay_ds_dv_cls = getUrlApi(apiServices.GATEWAY_CIS + "api/partner/public/dichvu/layDanhSachDichVuCLS"); // lấy danh sách dịch vụ cls
  static khambenh_lay_dv_theo_luot_dieu_tri = getUrlApi(
    apiServices.GATEWAY_CIS + "api/partner/public/lichkham/layDichVuTheoLuotDieuTri",
  ); // lấy danh sách dịch vụ cls đã đăng ký cho 1 lượt khám
  static khambenh_xoa_ds_dich_vu_chi_dinh_cls = getUrlApi(
    apiServices.GATEWAY_CIS + "api/partner/public/lichkham/capNhatTrangThaiDichVuDieuTri",
  ); // xoá danh sách các chỉ định cận lâm sàng hiện tại
  static khambenh_in_don_thuoc = getUrlApi(apiServices.GATEWAY_CIS + "api/partner/public/lichkham/inDonThuoc"); // in đơn thuốc
  static khambenh_lay_don_thuoc = getUrlApi(
    apiServices.GATEWAY_CIS + "api/partner/public/lichkham/layChiTietDonThuocMoi",
  ); // (update mới) lấy đơn thuốc
  static khambenh_lay_ds_phieu_cls = getUrlApi(
    apiServices.GATEWAY_CIS + "api/partner/public/lichkham/layDanhSachPhieuCLS",
  ); //lấy danh sách phiếu cls
  static khambenh_huy_ds_dv_cls = getUrlApi(apiServices.GATEWAY_CIS + "api/partner/public/dichvu/huyDichVuCLS"); // hủy dịch vụ cls
  static khambenh_xoa_phieu_cls = getUrlApi(apiServices.GATEWAY_CIS + "api/partner/public/lichkham/xoaPhieuCLS"); // xoá danh sách các chỉ định cận lâm sàng hiện tại
  static khambenh_in_phieu_tom_tat_kham = getUrlApi(
    apiServices.GATEWAY_CIS + "api/partner/public/inPDF/inPhieuTomTatKham",
  ); // in phieu tom tat kham (man hinh thong tin kham)
  static khambenh_in_phieu_cls = getUrlApi(apiServices.GATEWAY_CIS + "api/partner/public/inPDF/inPhieuCLS"); //in phiếu cls

  // danh mục xuất khác
  static dm_lay_danh_sach_ly_do_xuat_huy_phieu_thuoc = getUrlApi(
    apiServices.GATEWAY_CIS + "api/partner/public/phieu_thuoc/ly_do_xuat_huy/layDsLyDoXuatHuyPhieuThuoc",
  ); // lấy danh sách xuất khác
  static dm_them_ly_do_xuat_huy_phieu_thuoc = getUrlApi(
    apiServices.GATEWAY_CIS + "api/partner/public/phieu_thuoc/ly_do_xuat_huy/themLyDoXuatHuyPhieuThuoc",
  ); // thêm lý do xuất khác
  static dm_sua_ly_do_xuat_huy_phieu_thuoc = getUrlApi(
    apiServices.GATEWAY_CIS + "api/partner/public/phieu_thuoc/ly_do_xuat_huy/suaLyDoXuatHuyPhieuThuoc",
  ); // sửa lý do xuất khác
  static dm_xoa_ly_do_xuat_huy_phieu_thuoc = getUrlApi(
    apiServices.GATEWAY_CIS + "api/partner/public/phieu_thuoc/ly_do_xuat_huy/xoaKhoaLyDoHuyPhieuThuoc",
  ); // xóa lý do xuất khác
  static dm_lay_danh_sach_ly_do_xuat_huy_phieu_thuoc_hieu_luc = getUrlApi(
    apiServices.GATEWAY_CIS + "api/partner/public/phieu_thuoc/ly_do_xuat_huy/layDsLyDoXuatHuyPhieuThuocHieuLuc",
  ); // xóa lý do xuất khác

  // danh mục nguồn nhập thuốc
  static dm_lay_danh_sach_nguon_nhap_thuoc = getUrlApi(
    apiServices.GATEWAY_CIS + "api/partner/public/thuoc/nguon_nhap_thuoc/layDsNguonNhapThuoc",
  ); // lấy danh sách nguồn nhập thuốc
  static dm_lay_danh_sach_nguon_nhap_thuoc_co_hieu_luc = getUrlApi(
    apiServices.GATEWAY_CIS + "api/partner/public/thuoc/nguon_nhap_thuoc/layDsNguonNhapThuocHieuLuc",
  ); // lấy danh sách nguồn nhập thuốc có hiệu lực
  static dm_them_nguon_nhap_thuoc = getUrlApi(
    apiServices.GATEWAY_CIS + "api/partner/public/thuoc/nguon_nhap_thuoc/themLyNguonNhapThuoc",
  ); // thêm lý do nguồn nhập thuốc
  static dm_sua_nguon_nhap_thuoc = getUrlApi(
    apiServices.GATEWAY_CIS + "api/partner/public/thuoc/nguon_nhap_thuoc/suaNguonNhapThuoc",
  ); // sửa lý do nguồn nhập thuốc
  static dm_xoa_nguon_nhap_thuoc = getUrlApi(
    apiServices.GATEWAY_CIS + "api/partner/public/thuoc/nguon_nhap_thuoc/xoaKhoaNguonNhapThuoc",
  ); // xóa lý do nguồn nhập thuốc

  //Vien phi
  static vienphi_luu_tam_hoan_ung = getUrlApi(apiServices.GATEWAY_CIS + "api/partner/public/hoadon/luuTamUngHoanUng"); // lưu tạm ứng hoàn ứng của bệnh nhân
  static vienphi_lay_so_hoa_don_kha_dung = getUrlApi(
    apiServices.GATEWAY_CIS + "api/partner/public/soHoaDon/laySoHoaDonKhaDung",
  ); // lấy sổ hóa đơn chưa đầy
  static vienphi_luu_hoa_don_thanh_toan = getUrlApi(
    apiServices.GATEWAY_CIS + "api/partner/public/hoadon/luuHoaDonThanhToan",
  ); // lưu hóa đơn thanh toán
  static vienphi_lay_ds_dich_vu_chua_thanh_toan = getUrlApi(
    apiServices.GATEWAY_CIS + "api/partner/public/hoadon/layDichVuChuaThanhToan",
  ); // lấy danh sách dịch vụ chưa thanh toán
  static vienphi_luu_tam_hoan_ung = getUrlApi(apiServices.GATEWAY_CIS + "api/partner/public/hoadon/luuTamUngHoanUng"); // lưu tạm ứng hoàn ứng của bệnh nhân
  static vienphi_lay_so_hoa_don_kha_dung = getUrlApi(
    apiServices.GATEWAY_CIS + "api/partner/public/soHoaDon/laySoHoaDonKhaDung",
  ); // lấy sổ hóa đơn chưa đầy
  static vienphi_luu_hoa_don_thanh_toan = getUrlApi(
    apiServices.GATEWAY_CIS + "api/partner/public/hoadon/luuHoaDonThanhToan",
  ); // lưu hóa đơn thanh toán
  static vienphi_luu_hoa_don_thanh_toan_v2 = getUrlApi(
    apiServices.GATEWAY_CIS + "api/partner/public/hoadon/luuHoaDonThanhToanV2",
  ); // lưu hóa đơn thanh toán 2
  static vienphi_lay_ds_dich_vu_chua_thanh_toan = getUrlApi(
    apiServices.GATEWAY_CIS + "api/partner/public/hoadon/layDichVuChuaThanhToan",
  ); // lấy danh sách dịch vụ chưa thanh toán
  static vienphi_lay_ds_benh_nhan_chua_thanh_toan = getUrlApi(
    apiServices.GATEWAY_CIS + "api/partner/public/hoadon/layBenhNhanChuaThanhToan",
  ); // lấy danh sách bệnh nhân chưa thanh toán

  static lich_lam_viec_luu_lich_lam_viec = getUrlApi(
    apiServices.GATEWAY_CIS + "api/partner/public/lichlamviec/luuLichLamViec",
  ); // lưu lịch làm việc
  static lich_lam_viec_lay_ds_bac_si_theo_phong = getUrlApi(
    apiServices.GATEWAY_CIS + "api/partner/public/nhansu/layNhanSuTheoPhong",
  ); // lấy danh sách bác sĩ theo phòng
  static lich_lam_viec_lay_ds_lich_lam_viec = getUrlApi(
    apiServices.GATEWAY_CIS + "api/partner/public/lichlamviec/layLichLamViecBenhVien",
  ); // lấy lịch làm việc
  static lich_lam_viec_luu_cai_dat_mac_dinh = getUrlApi(
    apiServices.GATEWAY_CIS + "api/partner/public/lichlamviec/luuCaiDatGioMacDinh",
  ); // lưu cài đặt giờ mặc định
  static lich_lam_viec_lay_cai_dat_mac_dinh = getUrlApi(
    apiServices.GATEWAY_CIS + "api/partner/public/lichlamviec/layCaiDatGioMacDinh",
  ); // lấy cài đặt giờ mặc định

  //Tạo mới lịch hẹn
  static lay_ngay_lam_viec_cua_phong = getUrlApi(
    apiServices.GATEWAY_CIS + "api/partner/public/lichkham/layNgayLamViec",
  ); // lấy ngày làm việc của phòng
  static lay_gio_lam_viec_theo_ngay = getUrlApi(
    apiServices.GATEWAY_CIS + "api/partner/public/lichkham/layGioLamViecCuaNgay",
  ); // lấy giờ làm việc theo ngày
  static lay_bac_si_kham_benh_theo_phong_va_ngay = getUrlApi(
    apiServices.GATEWAY_CIS + "api/partner/public/lichkham/layBacSiThucHien",
  ); // lấy bác sĩ khám bệnh theo phòng và ngày
  static them_lich_kham_theo_ngay = getUrlApi(
    apiServices.GATEWAY_CIS + "api/partner/public/lichkham/luuDatLichKhamTheoNgay",
  ); // thêm lịch khám theo ngày
  static lay_ds_lich_kham_sap_toi = getUrlApi(
    apiServices.GATEWAY_CIS + "api/partner/public/lichkham/layDsLichKhamSapToi",
  );
  static chuyen_trang_thai_tiep_don_cuoc_hen_sap_toi = getUrlApi(
    apiServices.GATEWAY_CIS + "api/partner/public/lichkham/tiepDonLichKhamTheoLichKhamID",
  );
  static chuyen_trang_thai_xac_nhan_cuoc_hen_sap_toi = getUrlApi(
    apiServices.GATEWAY_CIS + "api/partner/public/lichkham/xacNhanLichKhamTheoLichKhamID",
  );
  static lay_chi_tiet_cuoc_hen = getUrlApi(
    apiServices.GATEWAY_CIS + "api/partner/public/lichkham/layDsDichVuTheoLichKhamID",
  );
  static cap_nhat_cuoc_hen = getUrlApi(
    apiServices.GATEWAY_CIS + "api/partner/public/lichkham/capNhatDichVuKhamTheoLichKhamID",
  );

  //EventSource
  static event_reload_cuoc_hen = apiServices.H247_EVENT_SOURCE + "sse/cis/cuocHen"; //api liên quan đến reload cuộc hẹn
  static event_reload_kham_benh = apiServices.H247_EVENT_SOURCE + "sse/cis/reloadKhamBenh"; //api reload cuộc hẹn ở phần khám bệnh
  static event_reload_ris = apiServices.H247_EVENT_SOURCE + "sse/cis/reloadRIS"; // api reload hàng chờ ris
  // export danh muc
  static dm_khoa_export = getUrlApi(apiServices.GATEWAY_CIS + "api/partner/public/danh-muc/khoa/exportKhoa");
  static dm_phong_export = getUrlApi(apiServices.GATEWAY_CIS + "api/partner/danh-muc/phong/exportPhong");
  static dm_hoa_don_export = getUrlApi(apiServices.GATEWAY_CIS + "api/partner/public/hoadon/exportNHD");
  static dm_don_vi_tinh_export = getUrlApi(apiServices.GATEWAY_CIS + "api/partner/public/donvitinh/exportDVT");
  static dm_nhom_dvkt_export = getUrlApi(apiServices.GATEWAY_CIS + "api/partner/public/dichvu/exportNDV");
  static dm_loai_dvkt_export = getUrlApi(apiServices.GATEWAY_CIS + "api/partner/public/dichvu/exportLDV");
  static dm_dvkt_export = getUrlApi(apiServices.GATEWAY_CIS + "api/partner/public/dichvu/exportDV");
  static dm_kho_tu_truc_export = getUrlApi(apiServices.GATEWAY_CIS + "api/partner/public/khoTuTruc/exportKhoTuTruc");
  static dm_hang_sx_export = getUrlApi(apiServices.GATEWAY_CIS + "api/partner/public/hangsx/exportHSX");
  static dm_duong_dung_export = getUrlApi(apiServices.GATEWAY_CIS + "api/partner/public/duongdung/exportDuongDung");
  static dm_hoat_chat_export = getUrlApi(apiServices.GATEWAY_CIS + "api/partner/public/hoatchat/exportHoatChat");
  static dm_thuoc_export = getUrlApi(apiServices.GATEWAY_CIS + "api/partner/public/thuoc/exportThuoc");
  static lay_chi_tiet_cuoc_hen_da_kham = getUrlApi(
    apiServices.GATEWAY_CIS + "api/partner/public/lichkham/layThongTinLichSuKhamBenh",
  );
  static lay_chi_tiet_don_thuoc_moi = getUrlApi(
    apiServices.GATEWAY_CIS + "api/partner/public/lichkham/layChiTietDonThuocMoi",
  );

  // lấy chi tiết thông tin 1 cuộc đã khám
  static lay_chi_tiet_cuoc_hen_da_kham = getUrlApi(
    apiServices.GATEWAY_CIS + "api/partner/public/lichkham/layThongTinLichSuKhamBenh",
  );
  static upload_imge_base64 = getUrlApi(apiServices.GATEWAY_CIS + "api/public/anh/luuAnh");

  static lay_chi_tiet_cuoc_hen_da_kham = getUrlApi(
    apiServices.GATEWAY_CIS + "api/partner/public/lichkham/layThongTinLichSuKhamBenh",
  );

  static lay_chi_tiet_phong_PUBLIC_API = getUrlApi(
    apiServices.GATEWAY_CIS + "api/partner/public/danh-muc/phong/layChiTiet",
  ); // lấy chi tiết phòng khám (public api không cần gửi access token lên) dành riêng cho t-medical

  static lay_data_in_phieu_tiep_don = getUrlApi(
    apiServices.GATEWAY_CIS + "api/partner/public/inPDF/layDataPhieuTiepDon",
  ); // (mới) lấy data để in phiếu tiếp đón
  static gen_Ma_thuoc = getUrlApi(apiServices.GATEWAY_CIS + "api/partner/public/thuoc/genMaThuoc");
  static lay_data_in_phieu_thu_phi_dv = getUrlApi(
    apiServices.GATEWAY_CIS + "api/partner/public/inPDF/layDataPhieuThuPhiDV",
  ); // (mới) lấy data để in phiếu thu phi dich vu
  static lay_data_in_nhieu_phieu_thu_phi_dv = getUrlApi(
    apiServices.GATEWAY_CIS + "api/partner/public/inPDF/layDataNhieuPhieuThuPhiDV",
  ); // (mới) lấy data để in nhieu phiếu thu phi dich vu
  static lay_data_in_phieu_dv_cls = getUrlApi(apiServices.GATEWAY_CIS + "api/partner/public/inPDF/layDataPhieuCLS"); // (mới) lấy data để in phiếu dịch vụ cls
  static lay_data_in_nhieu_phieu_dv_cls = getUrlApi(
    apiServices.GATEWAY_CIS + "api/partner/public/inPDF/layDataNhieuPhieuCls",
  ); // (mới) lấy data để in nhiểu phiếu dịch vụ cls
  static lay_data_in_phieu_tom_tat_kham = getUrlApi(
    apiServices.GATEWAY_CIS + "api/partner/public/inPDF/layDataPhieuTomTatKham",
  ); // (mới) lấy data để in phiếu tom tat kham
  static lay_data_in_don_thuoc = getUrlApi(apiServices.GATEWAY_CIS + "api/partner/public/lichkham/layDataDonThuoc"); // (mới) lấy data để in đơn thuốc

  static huy_dich_vu_da_dat = getUrlApi(apiServices.GATEWAY_CIS + "api/partner/public/lichkham/huyDichVu"); // (mới) hủy dịch vụ trong phần viện phí
  static vienphi_lay_ds_dich_vu_cua_benh_nhan = getUrlApi(
    apiServices.GATEWAY_CIS + "api/partner/public/hoadon/layDichVuTheoLichKham",
  ); // (mới) lấy danh sách dịch vụ trong viện phí của bệnh nhân

  static tiep_don_sua_thong_tin_benh_nhan = getUrlApi(
    apiServices.GATEWAY_CIS + "api/partner/public/benhNhan/suaThongTin",
  ); // sửa thông tin bệnh nhân trong tiếp đón
  static tiep_don_ = getUrlApi(apiServices.GATEWAY_CIS + "api/partner/public/lichkham/chinhSuaCuocKham"); // (mới) lưu khám bệnh và dịch vụ trong tiếp đón

  static xoa_cuoc_hen = getUrlApi(apiServices.GATEWAY_CIS + "api/partner/public/lichkham/xoaCuocKham"); // xóa cuộc khám hẹn
  static chinh_su_dich_vu_cuoc_kham = getUrlApi(
    apiServices.GATEWAY_CIS + "api/partner/public/lichkham/chinhSuaCuocKham",
  ); // chỉnh sửa dịch vụ của các dịch vụ
  static xoa_don_thuoc = getUrlApi(apiServices.GATEWAY_CIS + "api/partner/public/lichkham/xoaDonThuocTheoID"); // xóa đơn thuốc theo đơn thuốc ID

  static tiep_don_sua_thong_tin_benh_nhan = getUrlApi(
    apiServices.GATEWAY_CIS + "api/partner/public/benhNhan/suaThongTin",
  ); // sửa thông tin bệnh nhân trong tiếp đón
  static tiep_don_ = getUrlApi(apiServices.GATEWAY_CIS + "api/partner/public/lichkham/chinhSuaCuocKham"); // (mới) lưu khám bệnh và dịch vụ trong tiếp đón
  static lay_ds_bao_cao_phieu_thu = getUrlApi(apiServices.GATEWAY_CIS + "api/partner/public/hoadon/layDanhSachHoaDon"); // Lấy danh sách hóa đơn viện phí (báo cáo phiếu thu)

  static lay_nhom_cls = getUrlApi(apiServices.GATEWAY_CIS + "api/public/nhomCLS/layNhomCLS"); // lấy nhóm CLS
  //THỐNG KÊ//////////////////////
  static tong_quan_benh_nhan = getUrlApi(apiServices.GATEWAY_CIS + "api/partner/public/thongKe/tongQuanBenhNhan"); // tổng quan bệnh nhân
  static tong_quan_doanh_thu_trung_binh = getUrlApi(
    apiServices.GATEWAY_CIS + "api/partner/public/thongKe/doanhThuTrungBinhCuocKham",
  );
  static lay_data_thong_ke_Tong_quan_kinh_doanh = getUrlApi(
    apiServices.GATEWAY_CIS + "api/partner/public/thongKe/tongQuanTinhKinhDoanh",
  ); // lấy data biểu đồ tổng quan kinh doanh
  static lay_data_thong_ke_Tong_quan_tiep_don = getUrlApi(
    apiServices.GATEWAY_CIS + "api/partner/public/thongKe/tongQuanTiepDonKhamChuaBenh",
  ); // lấy nhóm CLS

  //check passoword
  static check_password = getUrlApi(apiServices.GATEWAY_CIS + "api/partner/public/nhansu/kiemTraMatKhauNguoiDung");

  static lay_ds_bao_cao_phieu_thu = getUrlApi(apiServices.GATEWAY_CIS + "api/partner/public/hoadon/layDanhSachHoaDon"); // Lấy danh sách báo cáo phiếu thu
  static export_bao_cao_phieu_thu = getUrlApi(apiServices.GATEWAY_CIS + "api/partner/public/hoadon/xuatBaoCaoPhieuThu"); // xuất báo cáo phiếu thu
  static lay_ds_bao_cao_vien_phi = getUrlApi(
    apiServices.GATEWAY_CIS + "api/partner/public/hoadon/layDsDichVuCuaPhieuThu",
  ); // Lấy danh sách báo cáo viện phí
  static export_bao_cao_vien_phi = getUrlApi(apiServices.GATEWAY_CIS + "api/partner/public/hoadon/xuatBaoCaoVienPhi"); // xuất báo cáo viện phí
  static lay_ds_phong_thuc_hien = getUrlApi(apiServices.GATEWAY_CIS + "api/partner/danh-muc/phong/layPhongThucHien"); // lấy danh sách phòng thực hiện

  static xoa_cuoc_hen = getUrlApi(apiServices.GATEWAY_CIS + "api/partner/public/lichkham/xoaCuocKham"); // xóa cuộc khám hẹn
  static chinh_su_dich_vu_cuoc_kham = getUrlApi(
    apiServices.GATEWAY_CIS + "api/partner/public/lichkham/chinhSuaCuocKham",
  ); // chỉnh sửa dịch vụ của các dịch vụ

  // **
  //phòng nội trú

  static tao_phong_noi_tru = getUrlApi(apiServices.GATEWAY_CIS + "api/partner/danh-muc/phong-noi-tru/themPhong"); // tạo phong nội trú

  static import_ds_phong_noi_tru = getUrlApi(
    apiServices.GATEWAY_CIS + "api/partner/danh-muc/phong-noi-tru/nhapDanhSachPhong",
  ); // import ds phòng nội trú

  static xoa_phong_noi_tru = getUrlApi(apiServices.GATEWAY_CIS + "api/partner/danh-muc/phong-noi-tru/xoaPhong"); // xóa phòng nội trú

  static lay_chi_tiet_phong_theo_id_noi_tru = getUrlApi(
    apiServices.GATEWAY_CIS + "api/partner/danh-muc/phong-noi-tru/layChiTietPhongTheoID",
  ); // lấy chi tiết 1 phòng theo id

  static lay_phong_noi_tru_theo_khoa = getUrlApi(
    apiServices.GATEWAY_CIS + "api/partner/danh-muc/phong-noi-tru/layPhongTheoKhoa",
  ); // lấy phòng nội trú theo khoa

  static doi_trang_thai_khoa_phong_noi_tru = getUrlApi(
    apiServices.GATEWAY_CIS + "api/partner/danh-muc/phong-noi-tru/doiTrangThaiPhong",
  ); // đổi trạng thái khóa

  static export_ds_noi_tru = getUrlApi(apiServices.GATEWAY_CIS + "api/partner/danh-muc/phong-noi-tru/exportPhong"); //export ds phòng nội trú

  static lay_ds_phong_noi_tru = getUrlApi(
    apiServices.GATEWAY_CIS + "api/partner/danh-muc/phong-noi-tru/layDanhMucPhongNoiTru",
  ); //lấy ds phòng nội trú

  static cap_nhat_thong_tin_phong_noi_tru = getUrlApi(
    apiServices.GATEWAY_CIS + "api/partner/danh-muc/phong-noi-tru/capNhatPhong",
  ); //cập nhật thông tin phòng nội trú

  static lay_ds_buong_dieu_tri = getUrlApi(
    apiServices.GATEWAY_CIS + "api/partner/danh-muc/phong-noi-tru/layDanhSachBuongDieuTri",
  ); //lấy ds buồng điều trị
  // danh mục giường bệnh
  static dm_lay_ds_giuong_benh = getUrlApi(
    apiServices.GATEWAY_CIS + "api/partner/danh-muc/giuong-dieu-tri/layDsGiuong",
  ); // lấy danh sách giương bệnh
  static dm_them_giuong_benh = getUrlApi(apiServices.GATEWAY_CIS + "api/partner/danh-muc/giuong-dieu-tri/themGiuong"); // lấy thêm sách giương bệnh
  static dm_sua_giuong_benh = getUrlApi(
    apiServices.GATEWAY_CIS + "api/partner/danh-muc/giuong-dieu-tri/suaThongTinGiuongDieuTri",
  ); // lấy sửa sách giương bệnh
  static lay_ds_phong_noi_tru = getUrlApi(
    apiServices.GATEWAY_CIS + "api/partner/danh-muc/phong-noi-tru/layDanhMucPhongNoiTruHieuLuc",
  ); // lấy xóa sách giương bệnh
  static dm_update_status_giuong_benh = getUrlApi(
    apiServices.GATEWAY_CIS + "api/partner/danh-muc/giuong-dieu-tri/suaChiSoGiuong",
  ); // lấy xóa sách giương bệnh
  static dm_import_giuong_benh = getUrlApi(
    apiServices.GATEWAY_CIS + "api/partner/danh-muc/giuong-dieu-tri/importGiuong",
  ); // lấy xóa sách giương bệnh
  static dm_export_giuong_benh = getUrlApi(
    apiServices.GATEWAY_CIS + "api/partner/danh-muc/giuong-dieu-tri/exportDmGiuong",
  ); // lấy xóa sách giương bệnh
  static dm_lay_chi_tiet_giuong_benh = getUrlApi(
    apiServices.GATEWAY_CIS + "api/partner/danh-muc/giuong-dieu-tri/layChiTietGiuong",
  ); // lấy xóa sách giương bệnh
  //api/partner/danh-muc/phong-noi-tru/layDanhMucPhongNoiTruHieuLuc
  ///// ================================ QUẢN LÝ DƯỢC NGOẠI TRÚ ================================
  //====== apis nhóm nhà cung cấp
  static them_moi_nhom_ncc = getUrlApi(apiServices.GATEWAY_CIS + "api/partner/public/nhomNhaCungCap/themMoi"); // thêm mới nhóm nhà cung cáp
  static lay_ds_nhom_ncc = getUrlApi(apiServices.GATEWAY_CIS + "api/partner/public/nhomNhaCungCap/layDanhSach"); //  lấy danh sách nhóm nhà cung cấp
  static sua_thong_tin_nhom_ncc = getUrlApi(apiServices.GATEWAY_CIS + "api/partner/public/nhomNhaCungCap/suaThongTin"); // sửa nhóm nhà cung cấp

  // ===== apis nhà cung cấp
  static them_moi_ncc = getUrlApi(apiServices.GATEWAY_CIS + "api/partner/public/nhaCungCap/themMoi"); // thêm mới nhóm nhà cung cáp
  static lay_ds_ncc = getUrlApi(apiServices.GATEWAY_CIS + "api/partner/public/nhaCungCap/layDanhSach"); //  lấy danh sách nhóm nhà cung cấp
  static lay_ds_ncc_hieu_luc = getUrlApi(
    apiServices.GATEWAY_CIS + "api/partner/public/nhaCungCap/layDanhSachNCCHieuLuc",
  ); //  lấy danh sách nhà cung cấp hiệu lực
  static sua_thong_tin_ncc = getUrlApi(apiServices.GATEWAY_CIS + "api/partner/public/nhaCungCap/suaThongTin"); // sửa nhóm nhà cung cấp

  static lay_hang_cho_mua_thuoc = getUrlApi(
    apiServices.GATEWAY_CIS + "api/partner/public/phieu_thuoc/layHangChoBanThuocTheoNgay",
  ); // lấy hàng chờ bệnh nhân mua thuốc
  static tao_benh_nhan_mua_thuoc = getUrlApi(
    apiServices.GATEWAY_CIS + "api/partner/public/phieu_thuoc/taoBenhNhanMuaThuoc",
  ); // tạo bệnh nhân mua thuốc (dành riêng cho vãng lai và bệnh nhân mới)

  static lay_thong_tin_chi_tiet_benh_nhan = getUrlApi(
    apiServices.GATEWAY_CIS + "api/partner/public/benhNhan/thongTinChiTiet",
  ); // lấy thông tin chi tiết bệnh nhân
  static huy_slot_mua_thuoc_cua_khach_vang_lai = getUrlApi(
    apiServices.GATEWAY_CIS + "api/partner/public/phieu_thuoc/huySlotMuaThuocVangLai",
  ); // Hủy slot mua thuốc trong hàng chờ của khách vãng lai

  static them_moi_ncc = getUrlApi(apiServices.GATEWAY_CIS + "api/partner/public/nhaCungCap/themMoi"); // thêm mới nhóm nhà cung cáp
  static lay_ds_ncc = getUrlApi(apiServices.GATEWAY_CIS + "api/partner/public/nhaCungCap/layDanhSach"); //  lấy danh sách nhóm nhà cung cấp
  static sua_thong_tin_ncc = getUrlApi(apiServices.GATEWAY_CIS + "api/partner/public/nhaCungCap/suaThongTin");
  static lich_su_nhap_tra_hang = getUrlApi(
    apiServices.GATEWAY_CIS + "api/partner/public/nhaCungCap/layLSNhapTraNCCThuoc",
  ); // lấy lịch sử nhập trả hàng
  static lay_danh_sach_cong_no = getUrlApi(apiServices.GATEWAY_CIS + "api/partner/public/nhaCungCap/layCongNoNCCThuoc"); // lấy danh sách công nợ
  static cap_nhat_cac_trang_thai_ncc = getUrlApi(
    apiServices.GATEWAY_CIS + "api/partner/public/nhaCungCap/capNhatChiSoNcc",
  ); // sửa nhóm nhà cung cấp
  static them_phieu_thanh_toan = getUrlApi(
    apiServices.GATEWAY_CIS + "api/partner/public/nhaCungCap/luuPhieuThanhToanCongNo",
  ); // thêm phiếu thanh toán
  static xuat_file_cong_no = getUrlApi(apiServices.GATEWAY_CIS + "api/partner/public/nhaCungCap/xuatLsCongNoNCCThuoc"); // xuất file công nợ
  static xuat_file_lich_su_tra_hang = getUrlApi(
    apiServices.GATEWAY_CIS + "api/partner/public/nhaCungCap/xuatLsNhapTraHang",
  ); // xuất file lịch sử trả hàng
  static them_phieu_dieu_chinh = getUrlApi(
    apiServices.GATEWAY_CIS + "api/partner/public/nhaCungCap/luuPhieuDieuChinhCongNo",
  ); // Thêm phiếu điều chỉnh

  static them_moi_ncc = getUrlApi(apiServices.GATEWAY_CIS + "api/partner/public/nhaCungCap/themMoi"); // thêm mới nhóm nhà cung cáp
  static lay_ds_ncc = getUrlApi(apiServices.GATEWAY_CIS + "api/partner/public/nhaCungCap/layDanhSach"); //  lấy danh sách nhóm nhà cung cấp
  static sua_thong_tin_ncc = getUrlApi(apiServices.GATEWAY_CIS + "api/partner/public/nhaCungCap/suaThongTin"); // sửa nhóm nhà cung cấp

  // ===== apis Phiếu
  static lay_ds_nhom_thuoc = getUrlApi(apiServices.GATEWAY_CIS + "api/partner/public/nhomThuoc/layDanhSachNhomThuoc"); // lấy danh sách nhóm thuốc
  static lay_ds_nhom_thuoc_hieu_luc = getUrlApi(
    apiServices.GATEWAY_CIS + "api/partner/public/nhomThuoc/layDanhSachNhomThuocHieuLuc",
  ); // lấy danh sách nhóm thuốc có hiệu lực
  static lay_loai_phieu_nhap_xuat = getUrlApi(
    apiServices.GATEWAY_CIS + "api/partner/public/phieu_thuoc/layPhanLoaiPhieu",
  ); // lấy phân loại phiếu
  static lay_ds_phieu_nhap_xuat = getUrlApi(apiServices.GATEWAY_CIS + "api/partner/public/phieu_thuoc/layDsPhieuThuoc"); // lấy Danh sách phiếu thuốc
  static lay_chi_tiet_phieu_nhap_xuat = getUrlApi(
    apiServices.GATEWAY_CIS + "api/partner/public/phieu_thuoc/layChiTietPhieu",
  ); // lấy chi tiết từng phiếu thuốc
  static luu_phieu_nhap_thuoc = getUrlApi(apiServices.GATEWAY_CIS + "api/partner/public/phieu_thuoc/luuPhieuNhap"); // Lưu phiếu nhập thuốc
  static luu_phieu_xuat_thuoc = getUrlApi(apiServices.GATEWAY_CIS + "api/partner/public/phieu_thuoc/luuPhieuXuat"); // Lưu phiếu xuất thuốc
  static luu_phieu_ban_le_thuoc = getUrlApi(apiServices.GATEWAY_CIS + "api/partner/public/phieu_thuoc/luuPhieuBanLe"); // Lưu phiếu bán lẻ thuốc cho bệnh nhân
  static cap_nhat_phieu_ban_le_thuoc = getUrlApi(
    apiServices.GATEWAY_CIS + "api/partner/public/phieu_thuoc/themThuocVaoPhieuBanBenhNhan",
  ); // Lưu phiếu bán lẻ thuốc cho bệnh nhân
  static xoa_thuoc_phieu_ban_le_thuoc = getUrlApi(
    apiServices.GATEWAY_CIS + "api/partner/public/phieu_thuoc/xoaThuocTrongPhieu",
  ); // Xóa thuốc trong phiếu
  static xoa_tat_ca_thuoc_phieu_ban_le_thuoc = getUrlApi(
    apiServices.GATEWAY_CIS + "api/partner/public/phieu_thuoc/xoaTatCaThuocTrongPhieu",
  ); // Xóa tất cả thuốc trong phiếu
  static cap_nhat_thuoc_phieu_ban_le_thuoc = getUrlApi(
    apiServices.GATEWAY_CIS + "api/partner/public/phieu_thuoc/capNhatSoLuongThuocTrongPhieuBanBenhNhan",
  ); // Xóa thuốc trong
  static lay_ds_lo_thuoc = getUrlApi(apiServices.GATEWAY_CIS + "api/partner/public/phieu_thuoc/layDanhSachLoThuoc"); // Lấy ds lô thuốc
  static them_lo_thuoc = getUrlApi(apiServices.GATEWAY_CIS + "api/partner/public/phieu_thuoc/themLoThuoc"); // thêm lô thuốc
  static lay_chi_tiet_phieu = getUrlApi(apiServices.GATEWAY_CIS + "api/partner/public/phieu_thuoc/layChiTietPhieu"); // Lấy chi tiết phiếu theo ID
  static cai_dat_noi_bat_phieu = getUrlApi(
    apiServices.GATEWAY_CIS + "api/partner/public/phieu_thuoc/caiDatNoiBatPhieu",
  ); // cài đặt độ nổi bật phiếu
  static lay_ds_phieu_mau = getUrlApi(apiServices.GATEWAY_CIS + "api/partner/public/phieu_thuoc/layDsPhieuMau"); // lấy phieu mau
  static lay_chi_tiet_phieu_mau = getUrlApi(
    apiServices.GATEWAY_CIS + "api/partner/public/phieu_thuoc/layChiTietPhieuMau",
  ); // lấy phieu mau theo ID

  static cap_nhat_cac_trang_thai_ncc = getUrlApi(
    apiServices.GATEWAY_CIS + "api/partner/public/nhaCungCap/capNhatChiSoNcc",
  ); // sửa nhóm nhà cung cấp
  //api kho thuốc
  static lay_chi_tiet_thuoc = getUrlApi(apiServices.GATEWAY_CIS + "api/partner/public/thuoc/layChiTietThuoc"); //api lấy chi tiết thuốc
  static lay_ds_the_kho = getUrlApi(apiServices.GATEWAY_CIS + "api/partner/public/phieu_thuoc/layDanhSachTheKho"); //api lấy ds thẻ kho
  static lay_ds_lo_theo_thuoc = getUrlApi(
    apiServices.GATEWAY_CIS + "api/partner/public/phieu_thuoc/layDanhSachLoTheoThuoc",
  ); //api lấy ds lô, hạn sử dụng theo thuốc
  //Api sửa thông tin trạng thái của thuốc (trạng thái, Nổi bật, khoá )
  static sua_trang_thai_thuoc = getUrlApi(apiServices.GATEWAY_CIS + "api/partner/public/kho_thuoc/suaChiSoThuoc");
  static lay_ds_thuoc_trong_kho = getUrlApi(
    apiServices.GATEWAY_CIS + "api/partner/public/kho_thuoc/layDanhSachThuocTrongKho",
  );

  static lay_ds_lich_su_phieu = getUrlApi(apiServices.GATEWAY_CIS + "api/partner/public/phieu_thuoc/layLichSuBanThuoc"); // api lấy ds lịch sử phiếu

  static sua_trang_thai_thuoc = getUrlApi(apiServices.GATEWAY_CIS + "api/partner/public/kho_thuoc/suaChiSoThuoc"); //Api sửa thông tin trạng thái của thuốc (trạng thái, Nổi bật, khoá )

  static lay_don_thuoc_theo_lich_kham = getUrlApi(
    apiServices.GATEWAY_CIS + "api/partner/public/lichkham/layDonThuocTheoLK",
  ); // lấy đơn thuốc theo lịch khám
  static lay_thuoc_trong_don_thuoc = getUrlApi(
    apiServices.GATEWAY_CIS + "api/partner/public/lichkham/layChiTietDonThuoc",
  ); // lấy thuốc trong đơn thuốc
  static them_moi_nhom_thuoc = getUrlApi(apiServices.GATEWAY_CIS + "api/partner/public/nhomThuoc/themNhomThuoc"); // thêm mới nhóm thuốc
  static sua_thong_tin_nhom_thuoc = getUrlApi(apiServices.GATEWAY_CIS + "api/partner/public/nhomThuoc/suaNhomThuoc"); // sửa thông tin nhóm thuốc

  static lay_nhom_cls = getUrlApi(apiServices.GATEWAY_CIS + "api/public/nhomCLS/layNhomCLS"); // lấy nhóm CLS

  //THỐNG KÊ//////////////////////
  static lay_data_thong_ke_Tong_quan_kinh_doanh = getUrlApi(
    apiServices.GATEWAY_CIS + "api/partner/public/thongKe/tongQuanTinhKinhDoanh",
  ); // lấy data biểu đồ tổng quan kinh doanh
  static lay_data_thong_ke_Tong_quan_tiep_don = getUrlApi(
    apiServices.GATEWAY_CIS + "api/partner/public/thongKe/tongQuanTiepDonKhamChuaBenh",
  ); // lấy nhóm CLS

  //api Danh Sách Bệnh Nhân
  static lay_danh_sach_benh_nhan = getUrlApi(apiServices.GATEWAY_CIS + "api/partner/public/benhNhan/layBenhNhan"); //Api lấy danh sách bệnh nhân của viện
  // xóa nhiều cuộc hẹn tiếp đón
  static xoa_nhieu_cuoc_kham_tiep_don = getUrlApi(
    apiServices.GATEWAY_CIS + "api/partner/public/lichkham/xoaNhieuCuocKham",
  );
  static cap_nhat_noi_bat_bn = getUrlApi(apiServices.GATEWAY_CIS + "api/partner/public/benhNhan/capNhatNoiBatBenhNhan"); //api cập nhật nổi bật bệnh nhân, trong tab bệnh nhân
  static lay_thongtin_benh_nhan = getUrlApi(apiServices.GATEWAY_CIS + "api/partner/public/benhNhan/layChiTietBenhNhan"); //lấy thông tin chi tiết bệnh nhân
  static lay_ds_benh_chinh = getUrlApi(
    apiServices.GATEWAY_CIS + "api/partner/public/lichkham/layChanDoanBenhCuaBenhNhan",
  ); //lấy ds bệnh chính
  static lay_ds_lich_su_phieu_thu = getUrlApi(
    apiServices.GATEWAY_CIS + "api/partner/public/hoadon/layDanhSachHoaDonTheoBenhNhan",
  ); //lấy ds lịch sử phiếu thu đã tạo của bệnh nhân
  static lay_khoa_bn_da_kham = getUrlApi(apiServices.GATEWAY_CIS + "api/partner/public/lichkham/layKhoaBenhNhanDaKham"); //Lấy ds khoa bệnh nhân đã khám tại viện
  static lay_ds_nguoi_tao_phieu = getUrlApi(
    apiServices.GATEWAY_CIS + "api/partner/public/hoadon/layDSNguoiTaoPhieuChoBenhNhan",
  ); //Lấy ds người tạo phiếu cho bệnh nhân

  static export_bao_cao_tiep_don = getUrlApi(
    apiServices.GATEWAY_CIS + "api/partner/public/inPDF/layDataPhieuBaoCaoTiepDon",
  ); // xuất báo cáo tiếp đón

  // api in phiếu
  static phieu_nhap_pdf = getUrlApi(apiServices.GATEWAY_CIS + "api/partner/public/phieu_thuoc/xuatPhieuNhapThuoc"); // in phiếu nhập
  static xuat_tra_pdf = getUrlApi(apiServices.GATEWAY_CIS + "api/partner/public/phieu_thuoc/xuatPhieuXuatTraThuoc"); // in phiếu xuất trả
  static xuat_ban_pdf = getUrlApi(apiServices.GATEWAY_CIS + "api/partner/public/phieu_thuoc/xuatPhieuBanThuoc"); // in phiếu xuât bán
  static xuat_huy_pdf = getUrlApi(apiServices.GATEWAY_CIS + "api/partner/public/phieu_thuoc/xuatPhieuXuatHuyThuoc"); // in phiếu xuât hủy
  static ban_le_pdf = getUrlApi(apiServices.GATEWAY_CIS + "api/partner/public/phieu_thuoc/xuatPhieuBanLeThuoc"); // in phiếu xuât bán lẻ

  static xua_file_cong_no_ncc = getUrlApi(apiServices.GATEWAY_CIS + "api/partner/public/phieu_thuoc/xuatChiTietCongNo");
  static phieu_nhap_pdf = getUrlApi(apiServices.GATEWAY_CIS + "api/partner/public/phieu_thuoc/xuatPhieuNhapThuoc"); // in phiếu nhập
  static xuat_tra_pdf = getUrlApi(apiServices.GATEWAY_CIS + "api/partner/public/phieu_thuoc/xuatPhieuXuatTraThuoc"); // in phiếu xuất trả
  static xuat_ban_pdf = getUrlApi(apiServices.GATEWAY_CIS + "api/partner/public/phieu_thuoc/xuatPhieuBanThuoc"); // in phiếu xuât bán
  static xuat_huy_pdf = getUrlApi(apiServices.GATEWAY_CIS + "api/partner/public/phieu_thuoc/xuatPhieuXuatHuyThuoc"); // in phiếu xuât hủy
  static ban_le_pdf = getUrlApi(apiServices.GATEWAY_CIS + "api/partner/public/phieu_thuoc/xuatPhieuBanLeThuoc"); // in phiếu xuât bán lẻ
  static thanh_toan_pdf = getUrlApi(apiServices.GATEWAY_CIS + "api/partner/public/phieu_thuoc/inChiTietPhieuThanhToan"); // in phiếu thanh toán
  static chi_tiet_cong_no = getUrlApi(apiServices.GATEWAY_CIS + "api/partner/public/phieu_thuoc/xuatChiTietCongNo"); // in phiếu chi tiết công nợ

  //lấy danh sách phiếu thu đã tạo
  static ds_phieu_thu_da_tao = getUrlApi(
    apiServices.GATEWAY_CIS + "api/partner/public/benhNhan/layDSPhieuThuDaTaoTheoBenhNhan",
  ); // in phiếu chi tiết công nợ

  // kho thuốc mới
  static lay_ds_kho_thuoc = getUrlApi(apiServices.GATEWAY_CIS + "api/partner/public/kho_thuoc/layDanhSachKhoThuoc");
  static lay_ds_kho_thuoc_hieu_luc = getUrlApi(
    apiServices.GATEWAY_CIS + "api/partner/public/kho_thuoc/layDanhSachKhoThuocHieuLuc",
  );
  static cap_nhat_thong_tin_kho_thuoc = getUrlApi(
    apiServices.GATEWAY_CIS + "api/partner/public/kho_thuoc/capNhatKhoThuoc",
  );
  static them_kho_thuoc = getUrlApi(apiServices.GATEWAY_CIS + "api/partner/public/kho_thuoc/themKhoThuoc");
  static lay_chi_tiet_kho_thuoc = getUrlApi(
    apiServices.GATEWAY_CIS + "api/partner/public/kho_thuoc/layChiTietKhoThuoc",
  );
  static search_thuoc_tao_phieu = getUrlApi(
    apiServices.GATEWAY_CIS + "api/partner/public/thuoc/searchDMThuocChoPhieuThuoc",
  ); // search thuốc
  static them_slot_thuoc_tam_thoi = getUrlApi(
    apiServices.GATEWAY_CIS + "api/partner/public/phieu_thuoc/themSlotGiuSlThuoc",
  );
  static xoa_slot_thuoc_tam_thoi = getUrlApi(
    apiServices.GATEWAY_CIS + "api/partner/public/phieu_thuoc/xoaSlotGiuSlThuoc",
  );
  static cap_nhat_slot_thuoc_tam_thoi = getUrlApi(
    apiServices.GATEWAY_CIS + "api/partner/public/phieu_thuoc/capNhatSlotGiuThuoc",
  );
  static xuat_exel_the_kho = getUrlApi(apiServices.GATEWAY_CIS + "api/partner/public/phieu_thuoc/xuatDanhSachTheKho"); // xuất exel thẻ kho
  static cap_nhat_trang_thai_phieu = getUrlApi(
    apiServices.GATEWAY_CIS + "api/partner/public/phieu_thuoc/capNhatTrangThaiPhieuThuoc",
  );
  static cap_nhat_thanh_toan_phieu = getUrlApi(
    apiServices.GATEWAY_CIS + "api/partner/public/phieu_thuoc/capNhatThanhToanPhieuThuoc",
  );
  static lay_chi_tiet_phieu_thuoc = getUrlApi(
    apiServices.GATEWAY_CIS + "api/partner/public/phieu_thuoc/layPhieuBanThuocTheoDonThuoc",
  );
  static lay_chi_tiet_don_thuoc_ke_don = getUrlApi(
    apiServices.GATEWAY_CIS + "api/partner/public/lichkham/layChiTietDonThuoc",
  );
  static lay_thong_tin_don_ban_thuoc = getUrlApi(
    apiServices.GATEWAY_CIS + "api/partner/public/lichkham/layThongTinDonThuoc",
  );

  //api kê đơn thuốc, bán thuốc
  static cap_nhat_benh_nhan_hang_cho_ban_thuoc = getUrlApi(
    apiServices.GATEWAY_CIS + "api/partner/public/phieu_thuoc/capNhatBenhNhanTrongHangChoBanThuoc",
  ); //tìm kiếm thuốc theo kho để kê hoặc bán cho bệnh nhân

  static lay_ds_kho_thuoc_theo_phong = getUrlApi(
    apiServices.GATEWAY_CIS + "api/partner/public/kho_thuoc/layDanhSachKhoThuocHieuLuc",
  ); //lấy ds các kho thuốc có hiệu lực theo phòng
  static tim_kiem_thuoc_theo_kho = getUrlApi(
    apiServices.GATEWAY_CIS + "api/partner/public/thuoc/searchDMThuocBanBenhNhan",
  ); //tìm kiếm thuốc theo kho để kê hoặc bán cho bệnh nhân
  static tim_kiem_thuoc_kha_dung_theo_kho = getUrlApi(
    apiServices.GATEWAY_CIS + "api/partner/public/thuoc/searchDMThuocChoPhieuThuoc",
  ); //tìm kiếm thuốc theo kho để kê hoặc bán cho bệnh nhân
  static lay_ds_kho_thuoc_theo_phong = getUrlApi(
    apiServices.GATEWAY_CIS + "api/partner/public/kho_thuoc/layDanhSachKhoThuocHieuLuc",
  ); //lấy ds các kho thuốc có hiệu lực theo phòng
  static lay_danh_sach_don_thuoc_mau = getUrlApi(
    apiServices.GATEWAY_CIS + "api/partner/public/lichkham/layDsDonThuocMauBacSi",
  ); //lấy danh sách đơn thuốc mẫu
  static lay_chi_tiet_don_thuoc_mau = getUrlApi(
    apiServices.GATEWAY_CIS + "api/partner/public/lichkham/layChiTietDonThuocMau	",
  ); //lấy chi tiết đơn thuốc mẫu
  static xoa_don_thuoc_mau = getUrlApi(apiServices.GATEWAY_CIS + "api/partner/public/lichkham/xoaDonThuocMau"); //xóa đơn thuốc mẫu

  // báo cáo thuôc
  static lay_thuoc_theo_kho_co_hieu_luc = getUrlApi(
    apiServices.GATEWAY_CIS + "api/partner/public/kho_thuoc/layDanhSachThuocHieuLucTrongKho",
  ); // lấy thuốc có hiệu lực trong 1 kho
  static lay_bao_bao_thuoc_khang_sinh = getUrlApi(
    apiServices.GATEWAY_CIS + "api/partner/public/phieu_thuoc/xuatBaoCaoSuDungThuocKhangSinh",
  );
  static xuat_bien_ban_kiem_ke = getUrlApi(
    apiServices.GATEWAY_CIS + "api/partner/public/phieu_thuoc/xuatKiemKeThuocTrongKho",
  );
  static lay_bao_cao_nhap_xuat_ton = getUrlApi(
    apiServices.GATEWAY_CIS + "api/partner/public/phieu_thuoc/xuatThongKeNhapXuatTonThuoc",
  );
  static lay_bao_cao_kiem_nhap = getUrlApi(
    apiServices.GATEWAY_CIS + "api/partner/public/phieu_thuoc/xuatBienBanKiemNhapThuoc",
  );
  static huy_phieu_giu_cho = getUrlApi(apiServices.GATEWAY_CIS + "api/partner/public/phieu_thuoc/huyPhieuSlotGiuThuoc"); //
  static lay_lich_su_nhap_thuoc_dm_thuoc = getUrlApi(
    apiServices.GATEWAY_CIS + "api/partner/public/phieu_thuoc/layLichSuNhapThuoc",
  ); // lấy lịch sử nhập thuốc
  static sua_lo_thuoc_dm_thuoc = getUrlApi(
    apiServices.GATEWAY_CIS + "api/partner/public/phieu_thuoc/capNhatGiaThuocTrongKho",
  ); // sửa lô thuốc trong lịch sử nhập thuốc

  static lay_chi_tiet_don_theo_benh_nhan = getUrlApi(
    apiServices.GATEWAY_CIS + "api/partner/public/hoaddon/layDSChiTietHoaDonTheoBenhNhan",
  ); // lấy danh sách dịch vụ tại màn đã thanh toán trong dịch vụ khám bệnh

  // báo cáo thuôc
  static lay_thuoc_theo_kho_co_hieu_luc = getUrlApi(
    apiServices.GATEWAY_CIS + "api/partner/public/kho_thuoc/layDanhSachThuocHieuLucTrongKho",
  ); // lấy thuốc có hiệu lực trong 1 kho
  static lay_bao_bao_thuoc_khang_sinh = getUrlApi(
    apiServices.GATEWAY_CIS + "api/partner/public/phieu_thuoc/xuatBaoCaoSuDungThuocKhangSinh",
  );
  static xuat_bien_ban_kiem_ke = getUrlApi(
    apiServices.GATEWAY_CIS + "api/partner/public/phieu_thuoc/xuatKiemKeThuocTrongKho",
  );
  static lay_ds_bien_ban_kiem_ke = getUrlApi(
    apiServices.GATEWAY_CIS + "api/partner/public/phieu_thuoc/layDsKiemKeThuocTrongKho",
  );
  static lay_bao_cao_kiem_nhap = getUrlApi(
    apiServices.GATEWAY_CIS + "api/partner/public/phieu_thuoc/xuatBienBanKiemNhapThuoc",
  );
  static huy_phieu_giu_cho = getUrlApi(apiServices.GATEWAY_CIS + "api/partner/public/phieu_thuoc/huyPhieuSlotGiuThuoc");
  static khoa_kho_thuoc_theo_ds_id = getUrlApi(
    apiServices.GATEWAY_CIS + "api/partner/public/kho_thuoc/khoaKhoThuocTheoDsID",
  );
  static duyet_phieu_chuyen_kho = getUrlApi(
    apiServices.GATEWAY_CIS + "api/partner/public/phieu_thuoc/capNhatPhieuThuocChuyenKho",
  );
  static in_phieu_dich_vu_da_thanh_toan = getUrlApi(
    apiServices.GATEWAY_CIS + "api/partner/public/hoaddon/inCacDichVuDaThanhToanTheoHoaDon",
  ); // In các dịch vụ dã thanh toán của một hóa đơn (loại trừ các dịch vụ đã hòan tiền)
  static in_cac_phieu_dich_vu_da_thanh_toan = getUrlApi(
    apiServices.GATEWAY_CIS + "api/partner/public/hoaddon/inCacDichVuDaThanhToanTheoNhieuHoaDon",
  ); // In các dịch vụ dã thanh toán của một hóa đơn (loại trừ các dịch vụ đã hòan tiền)
  static lay_ds_template_pdf_theo_vien = getUrlApi(
    apiServices.GATEWAY_CIS + "api/partner/public/template/layTemplateTheoBenhVien",
  ); // api lấy template pdf theo viện
  static in_the_kho_pdf = getUrlApi(apiServices.GATEWAY_CIS + "api/partner/public/phieu_thuoc/layDataTheKho"); // api lấy data in thẻ kho

  static lay_thuoc_trong_kho = getUrlApi(
    apiServices.GATEWAY_CIS + "api/partner/public/kho_thuoc/layThongTinThuocTrongKho",
  ); // hủy duyệt phiếu chuyển kho

  static api_lay_kho_thuoc_ban_thuoc = getUrlApi(
    apiServices.GATEWAY_CIS + "api/partner/public/kho_thuoc/layKhoNhanSuDuocPhepBan",
  ); //
  static api_lay_thuoc_truoc_khi_duyet = getUrlApi(
    apiServices.GATEWAY_CIS + "api/partner/public/phieu_thuoc/layDsThuocTrongPhieuBanTruocKhiDuyet",
  );
  static api_lay_thuoc_sau_khi_duyet = getUrlApi(
    apiServices.GATEWAY_CIS + "api/partner/public/phieu_thuoc/layPhieuBanThuocTheoDonThuoc",
  );
  static api_huy_xuat_kho_phieu_ban_thuoc = getUrlApi(
    apiServices.GATEWAY_CIS + "api/partner/public/phieu_thuoc/huyXuatKhoPhieuBanThuoc",
  ); // hủy duyệt phiếu bán thuốc

  static huy_phieu_nhap_xuat = getUrlApi(apiServices.GATEWAY_CIS + "api/partner/public/phieu_thuoc/huyPhieuNhapXuat"); /// hủy phiếu nhập xuất
  static api_search_thuoc_phieu_nhap = getUrlApi(
    apiServices.GATEWAY_CIS + "api/partner/public/thuoc/searchDMThuocChoPhieuNhapThuoc",
  ); // api search thuốc cho phiếu nhập
  static api_huy_duyet_phieu_chuyen_kho = getUrlApi(
    apiServices.GATEWAY_CIS + "api/partner/public/phieu_thuoc/huyDuyetPhieuChuyenKho",
  ); // hủy duyệt phiếu chuyển kho

  static lay_bao_cao_vien_phi_phong_chuc_nang = getUrlApi(
    apiServices.GATEWAY_CIS + "api/partner/public/hoadon/layBaoCaoVienPhiPhongChucNang",
  ); // lấy báo cáo viện phí phòng chức năng
  static lay_bao_cao_vien_phi_bs_chi_dinh = getUrlApi(
    apiServices.GATEWAY_CIS + "api/partner/public/lichkham/layDataBaoCaoBacSiChiDinh",
  ); // lấy báo cáo viện phí bác sĩ chỉ định
  static lay_data_bao_cao_thu_ngan = getUrlApi(
    apiServices.GATEWAY_CIS + "api/partner/public/lichkham/layDataBaoCaoThuNgan",
  ); // api lấy báo cáo thu ngân
  static lay_danh_sach_bac_si = getUrlApi(apiServices.GATEWAY_CIS + "api/partner/public/nhansu/layDsBacSi"); // api lấy danh sách bác sĩ
  static lay_data_bao_cao_doanh_thu = getUrlApi(
    apiServices.GATEWAY_CIS + "api/partner/public/lichkham/layDataBaoCaoDoanhThu",
  ); // api lấy báo cáo doanh thu

  static lay_ds_mau_mo_ta_cdha = getUrlApi(apiServices.GATEWAY_CIS + "api/partner/public/ris/dsMauMoTa"); // api lấy danh sách mẫu mô tả cdha
  static them_moi_mau_mo_ta_cdha = getUrlApi(apiServices.GATEWAY_CIS + "api/partner/public/ris/themMauMoTa"); // api thêm mới mẫu mô tả cdha
  static cap_nhat_mau_mo_ta_cdha = getUrlApi(apiServices.GATEWAY_CIS + "api/partner/public/ris/capNhatMauMoTa"); // api cập nhật mẫu mô tả cdha
  static xoa_nhieu_mau_mo_ta = getUrlApi(apiServices.GATEWAY_CIS + "api/partner/public/ris/xoaNhieuMauMoTa");
  static khoa_nhieu_mau_mo_ta = getUrlApi(apiServices.GATEWAY_CIS + "api/partner/public/ris/khoaNhieuMauMoTa");

  static ris_lay_danh_sach_phieu = getUrlApi(
    apiServices.GATEWAY_CIS + "api/partner/public/ris/layDanhSachPhieuChiDinh",
  );
  static ris_lay_chi_tiet_phieu = getUrlApi(apiServices.GATEWAY_CIS + "api/partner/public/ris/layChiTietPhieuChiDinh");
  static ris_cap_nhat_trang_thai_phieu_chi_dinh = getUrlApi(
    apiServices.GATEWAY_CIS + "api/partner/public/ris/capNhatTrangThaiPhieuChiDinh",
  );
  static ris_in_phieu_tra_kq = getUrlApi(apiServices.GATEWAY_CIS + "api/partner/public/ris/inPhieuTraKQ");
  static ris_huy_ket_qua_phieu = getUrlApi(apiServices.GATEWAY_CIS + "api/partner/public/ris/huyPhieuTraKetQua");

  static ris_lay_ds_phong = getUrlApi(apiServices.GATEWAY_CIS + "api/partner/public/ris/layDanhSachPhongCDHALamViec");
  static ris_lay_ds_mau_mo_ta = getUrlApi(apiServices.GATEWAY_CIS + "api/partner/public/ris/layDsMauMoTa");
  static ris_luu_ket_qua_phieu = getUrlApi(apiServices.GATEWAY_CIS + "api/partner/public/ris/traKetQuaRIS");

  static ris_lay_chi_tiet_phieu_tra = getUrlApi(
    apiServices.GATEWAY_CIS + "api/partner/public/ris/layChiTietPhieuTraKetQua",
  );
  static ris_huy_dich_vu_phieu_tra_kq = getUrlApi(
    apiServices.GATEWAY_CIS + "api/partner/public/ris/huyDichVuPhieuTraKetQua",
  );

  static khambenh_lay_thong_tin_lich_kham_moi = getUrlApi(
    apiServices.GATEWAY_CIS + "api/partner/public/lichkham/layThongTinKhamBenhTheoLDTKhamBenh",
  );
  static huy_dich_vu_cls_moi = getUrlApi(apiServices.GATEWAY_CIS + "api/partner/public/lichkham/huyPhieuChiDinhCLSMoi");

  // Hỗ trợ khách hàng
  static lay_ds_cau_hoi_cua_toi = getUrlApi(
    apiServices.GATEWAY_CIS + "api/partner/public/cisSupport/layDanhSachCauHoiNhanSu",
  );
  static lay_ds_cau_hoi_thuong_gap = getUrlApi(
    apiServices.GATEWAY_CIS + "api/partner/public/cisSupport/layDanhSachCauHoiThuongGap",
  );
  static gui_cau_hoi = getUrlApi(apiServices.GATEWAY_CIS + "api/partner/public/cisSupport/taoCauHoiHoTro");

  static lay_ds_don_thuoc_cu_cua_benh_nhan = getUrlApi(
    apiServices.GATEWAY_CIS + "api/partner/public/lichkham/layDsDonThuocCuCuaBenhNhan",
  );
  static lay_chi_tiet_don_cu_cua_benh_nhan = getUrlApi(
    apiServices.GATEWAY_CIS + "api/partner/public/lichkham/layChiTietDonThuocCuBenhNhan",
  );
  static lay_ds_quyen_nhan_su_chi_dinh = getUrlApi(
    apiServices.GATEWAY_CIS + "api/partner/public/quyen/layDSQuyenTheoNhanSu",
  );

  // danh mục đối tượng
  static dm_lay_ds_doi_tuong = getUrlApi(apiServices.GATEWAY_CIS + "api/partner/public/dm_doituong/layDsDoiTuong"); //in phiếu cls
  static dm_lay_ds_doi_tuong_hieu_luc = getUrlApi(
    apiServices.GATEWAY_CIS + "api/partner/public/dm_doituong/layDsDoiTuongCoHieuLuc",
  ); //in phiếu cls
  static dm_them_doi_tuong = getUrlApi(apiServices.GATEWAY_CIS + "api/partner/public/dm_doituong/themDoiTuong"); //in phiếu cls
  static dm_sua_doi_tuong = getUrlApi(apiServices.GATEWAY_CIS + "api/partner/public/dm_doituong/suaDoiTuong"); //in phiếu cls
  static dm_khoa_doi_tuong = getUrlApi(
    apiServices.GATEWAY_CIS + "api/partner/public/dm_doituong/capNhatTrangThaiNhieuDoiTuong",
  ); //in phiếu cls
  static dm_xoa_doi_tuong = getUrlApi(apiServices.GATEWAY_CIS + "api/partner/public/dm_doituong/xoaNhieuDoiTuong"); //in phiếu cls
  static dm_import_doi_tuong = getUrlApi(apiServices.GATEWAY_CIS + "api/partner/public/dm_doituong/importDoiTuong"); //in phiếu cls
  static dm_export_doi_tuong = getUrlApi(apiServices.GATEWAY_CIS + "api/partner/public/dm_doituong/exportDoiTuong"); //in phiếu cls

  // danh mục nguồn khách
  static dm_lay_ds_nguon_khach = getUrlApi(
    apiServices.GATEWAY_CIS + "api/partner/public/dm_nguonkhach/layDanhSachNguonKhach",
  ); //in phiếu cls
  static dm_lay_ds_nguon_khach_hieu_luc = getUrlApi(
    apiServices.GATEWAY_CIS + "api/partner/public/dm_nguonkhach/layDanhSachNguonKhachCoHieuLuc",
  ); //in phiếu cls
  static dm_them_nguon_khach = getUrlApi(apiServices.GATEWAY_CIS + "api/partner/public/dm_nguonkhach/themNguonKhach"); //in phiếu cls
  static dm_sua_nguon_khach = getUrlApi(apiServices.GATEWAY_CIS + "api/partner/public/dm_nguonkhach/capNhatNguonKhach"); //in phiếu cls
  static dm_xoa_nguon_khach = getUrlApi(
    apiServices.GATEWAY_CIS + "api/partner/public/dm_nguonkhach/xoaNhieuNguonKhach",
  ); //in phiếu cls
  static dm_khoa_nguon_khach = getUrlApi(
    apiServices.GATEWAY_CIS + "api/partner/public/dm_nguonkhach/khoaNhieuNguonKhach",
  ); //in phiếu cls
  static dm_import_nguon_khach = getUrlApi(
    apiServices.GATEWAY_CIS + "api/partner/public/dm_nguonkhach/importNguonKhach",
  ); //in phiếu cls
  static dm_export_nguon_khach = getUrlApi(
    apiServices.GATEWAY_CIS + "api/partner/public/dm_nguonkhach/exportNguonKhach",
  );
  //in phiếu cls

  // danh mục nguồn khách
  static dm_lay_ds_cach_dung = getUrlApi(
    apiServices.GATEWAY_CIS + "api/partner/public/dm_cachdungthuoc/layDanhSachCachDungThuoc",
  );
  static dm_lay_ds_cach_dung_hieu_luc = getUrlApi(
    apiServices.GATEWAY_CIS + "api/partner/public/dm_cachdungthuoc/layDanhSachCachDungThuocCoHieuLuc",
  );
  static dm_them_cach_dung = getUrlApi(
    apiServices.GATEWAY_CIS + "api/partner/public/dm_cachdungthuoc/themCachDungThuoc",
  );
  static dm_sua_cach_dung = getUrlApi(
    apiServices.GATEWAY_CIS + "api/partner/public/dm_cachdungthuoc/capNhatCachDungThuoc",
  );
  static dm_xoa_cach_dung = getUrlApi(
    apiServices.GATEWAY_CIS + "api/partner/public/dm_cachdungthuoc/xoaNhieuCachDungThuoc",
  );
  static dm_khoa_cach_dung = getUrlApi(
    apiServices.GATEWAY_CIS + "api/partner/public/dm_cachdungthuoc/khoaNhieuCachDungThuoc",
  );
  static dm_import_cach_dung = getUrlApi(
    apiServices.GATEWAY_CIS + "api/partner/public/dm_cachdungthuoc/importCachDungThuoc",
  );
  static dm_export_cach_dung = getUrlApi(
    apiServices.GATEWAY_CIS + "api/partner/public/dm_cachdungthuoc/exportCachDungThuoc",
  );

  /// UPDATE LỊCH SỬ KHÁM BỆNH
  static khambenh_lay_lich_su_luot_dieu_tri = getUrlApi(
    apiServices.GATEWAY_CIS + "api/partner/public/lichkham/layLichSuLuotDieuTri",
  );
  static khambenh_lay_lich_su_don_thuoc = getUrlApi(
    apiServices.GATEWAY_CIS + "api/partner/public/lichkham/layLichSuDonThuoc",
  );
  static khambenh_lay_lich_can_lam_sang = getUrlApi(
    apiServices.GATEWAY_CIS + "api/partner/public/lichkham/layLichSuCLS",
  );
  static khambenh_lay_lich_su_xem_nhanh = getUrlApi(
    apiServices.GATEWAY_CIS + "api/partner/public/lichkham/layLichSuXemNhanh",
  );
  static khambenh_lay_chi_tiet_lich_su_luot_dieu_tri = getUrlApi(
    apiServices.GATEWAY_CIS + "api/partner/public/lichkham/layChitietLichSuLuotDieuTri",
  );
  static ris_lay_ds_dich_vu = getUrlApi(apiServices.GATEWAY_CIS + "api/partner/public/dichvu/layDMDichVuCDHA");

  static in_don_thuoc_v2 = getUrlApi(apiServices.GATEWAY_CIS + "api/partner/public/lichkham/layDataDonThuocV2");
  static lay_chi_tiet_phieu_xn = getUrlApi(apiServices.GATEWAY_CIS + "api/partner/public/lichkham/layKQXNTheoPhieu");
  static in_phieu_ket_qua_xn = getUrlApi(apiServices.GATEWAY_CIS + "api/partner/public/lichkham/inKQXNTheoPhieu");
  static in_don_thuoc_v2 = getUrlApi(apiServices.GATEWAY_CIS + "api/partner/public/lichkham/layDataDonThuocV2");

  //Mẫu thông tin khám
  static ds_mau_tt_kham = getUrlApi(apiServices.GATEWAY_CIS + "api/partner/public/lichkham/danhsachmauthongtinkham");
  static luu_mau_tt_kham = getUrlApi(apiServices.GATEWAY_CIS + "api/partner/public/lichkham/luumauthongtinkham");
  static sua_mau_tt_kham = getUrlApi(apiServices.GATEWAY_CIS + "api/partner/public/lichkham/capnhatmauthongtinkham");
  static xoa_mau_tt_kham = getUrlApi(apiServices.GATEWAY_CIS + "api/partner/public/lichkham/xoamauthongtinkham");
  static chi_tiet_mau_tt_kham = getUrlApi(
    apiServices.GATEWAY_CIS + "api/partner/public/lichkham/chitietmauthongtinkham",
  );

  static lay_chi_tiet_phieu_xn = getUrlApi(apiServices.GATEWAY_CIS + "api/partner/public/lichkham/layKQXNTheoPhieu");
  static in_phieu_ket_qua_xn = getUrlApi(apiServices.GATEWAY_CIS + "api/partner/public/lichkham/inKQXNTheoPhieu");
  static lay_ds_file_dinh_kem = getUrlApi(
    apiServices.GATEWAY_CIS + "api/partner/public/benhpham/layTepDinhKemBenhPham",
  );

  static dm_them_hinh_thuc_thanh_toan = getUrlApi(
    apiServices.GATEWAY_CIS + "api/partner/public/dm_hinhthuc/themHinhThuc",
  );
  static dm_sua_hinh_thuc_thanh_toan = getUrlApi(
    apiServices.GATEWAY_CIS + "api/partner/public/dm_hinhthuc/suaHinhThuc",
  );
  static dm_khoa_hinh_thuc_thanh_toan = getUrlApi(
    apiServices.GATEWAY_CIS + "api/partner/public/dm_hinhthuc/khoaNhieuHinhThuc",
  );
  static dm_xoa_hinh_thuc_thanh_toan = getUrlApi(
    apiServices.GATEWAY_CIS + "api/partner/public/dm_hinhthuc/xoaNhieuHinhThuc",
  );
  static dm_lay_hinh_thuc_thanh_toan = getUrlApi(
    apiServices.GATEWAY_CIS + "api/partner/public/dm_hinhthuc/layDsHinhThuc",
  );

  static dm_lay_hinh_thuc_thanh_toan_hieu_luc = getUrlApi(
    apiServices.GATEWAY_CIS + "api/partner/public/dm_hinhthuc/layDsHinhThuc",
  );
  static ris_bao_cao_so_cdha = getUrlApi(apiServices.GATEWAY_CIS + "api/partner/public/ris/layBaoCaoSoCDHA");
  static ris_bao_cao_so_hoat_dong_chan_doan_ds_dv = getUrlApi(
    apiServices.GATEWAY_CIS + "api/partner/public/dichvu/layDMLoaiDichVuXetNghiemHieuLuc",
  );
  static ris_bao_cao_so_hoat_dong_chan_doan = getUrlApi(
    apiServices.GATEWAY_CIS + "api/partner/public/ris/baoCaoHoatDongRISTheoLoaiDv",
  );
  static ris_in_bao_cao_so_hoat_dong_chan_doan = getUrlApi(
    apiServices.GATEWAY_CIS + "api/partner/public/ris/inBaoCaoHoatDongRISTheoLoaiDv",
  );
  static ris_bao_cao_thong_ke_theo_bn = getUrlApi(
    apiServices.GATEWAY_CIS + "api/partner/public/ris/layThongKeDvCDHATheoBN",
  );
  static bao_cao_thu_ngan_benh_nhan_dich_vu = getUrlApi(
    apiServices.GATEWAY_CIS + "api/partner/public/baocao/baoCaoBenhNhanDichVu",
  );
  static bao_cao_phieu_thu_dich_vu = getUrlApi(
    apiServices.GATEWAY_CIS + "api/partner/public/baocao/baoCaoPhieuThuDichVu",
  );
  static bao_cao_phuong_thuc_thanh_toan = getUrlApi(
    apiServices.GATEWAY_CIS + "api/partner/public/lichkham/layDataBaoCaoPhuongThucThanhToanTheoBenhNhan",
  );
  static bao_cao_doanh_thu_theo_khach_hang = getUrlApi(
    apiServices.GATEWAY_CIS + "api/partner/public/lichkham/layDataBaoCaoDoanhThuTheoBenhNhan",
  );

  static dm_lay_ds_thuoc = getUrlApi(apiServices.GATEWAY_CIS + "api/partner/public/thuoc/layDMThuoc");

  // danh mục thủ thuật
  static dm_thuthuat_lay_ds_cttt = getUrlApi(
    apiServices.GATEWAY_CIS + "api/partner/public/thuthuat/layDmCachThucThuThuat",
  );
  static dm_thuthuat_them_cttt = getUrlApi(
    apiServices.GATEWAY_CIS + "api/partner/public/thuthuat/themDmCachThucThuThuat",
  );
  static dm_thuthuat_sua_mot_cttt = getUrlApi(
    apiServices.GATEWAY_CIS + "api/partner/public/thuthuat/suaDmCachThucThuThuat",
  );
  static dm_thuthuat_xoa_cttt = getUrlApi(
    apiServices.GATEWAY_CIS + "api/partner/public/thuthuat/xoaDmCachThucThuThuat",
  );
  static dm_thuthuat_export_cttt = getUrlApi(apiServices.GATEWAY_CIS + "api/partner/public/thuthuat/exportCTTT");
  // =
  static dm_thuthuat_lay_ds_pptt = getUrlApi(
    apiServices.GATEWAY_CIS + "api/partner/public/thuthuat/layDmPhuongPhapThuThuat",
  );
  static dm_thuthuat_them_pptt = getUrlApi(
    apiServices.GATEWAY_CIS + "api/partner/public/thuthuat/themDmPhuongPhapThuThuat",
  );
  static dm_thuthuat_sua_mot_pptt = getUrlApi(
    apiServices.GATEWAY_CIS + "api/partner/public/thuthuat/suaDmPhuongPhapThuThuat",
  );
  static dm_thuthuat_xoa_pptt = getUrlApi(
    apiServices.GATEWAY_CIS + "api/partner/public/thuthuat/xoaDmPhuongPhapThuThuat",
  );
  static dm_thuthuat_export_pptt = getUrlApi(apiServices.GATEWAY_CIS + "api/partner/public/thuthuat/exportPPTT");

  // LIS
  static machine_device_api_get = getUrlApi(
    apiServices.GATEWAY_LIS + "api/partner/public/mayxetnghiem/layDsMayXetNghiem",
  );
  static machine_device_api_add = getUrlApi(
    apiServices.GATEWAY_LIS + "api/partner/public/mayxetnghiem/themMayXetNghiem",
  );
  static machine_device_api_delete = getUrlApi(
    apiServices.GATEWAY_LIS + "api/partner/public/mayxetnghiem/xoaNhieuMayXetNghiem",
  );
  static machine_device_api_update = getUrlApi(
    apiServices.GATEWAY_LIS + "api/partner/public/mayxetnghiem/suaMayXetNghiem",
  );
  static machine_device_api_export = getUrlApi(
    apiServices.GATEWAY_LIS + "api/partner/public/mayxetnghiem/xuatDmMayXetNghiem",
  );
  static machine_device_api_import = getUrlApi(
    apiServices.GATEWAY_LIS + "api/partner/public/mayxetnghiem/nhapDmMayXetNghiem",
  );
  static lock_machine_device_api_update = getUrlApi(
    apiServices.GATEWAY_LIS + "api/partner/public/mayxetnghiem/khoaNhieuMayXetNghiem",
  );
  // kết quả xét nghiệm chuẩn
  static layDsLoaiDichVuVaSlDvCon = getUrlApi(
    apiServices.GATEWAY_LIS + "api/partner/public/xetnghiem/layDsLoaiDichVuVaSlDvCon",
  );
  static lay_ds_loai_xet_nghiem_hieu_luc = getUrlApi(
    apiServices.GATEWAY_LIS + "api/partner/public/xetnghiem/layDMLoaiDichVuHieuLuc",
  );
  static layDanhMucPhongHieuLuc = getUrlApi(
    apiServices.GATEWAY_LIS + "api/partner/public/phong/layDanhMucPhongHieuLuc",
  );
  static dm_don_vi_tinh_lay_ds_co_hieu_luc_lis = getUrlApi(
    apiServices.GATEWAY_LIS + "api/partner/public/donvitinh/layDMDonViTinhHieuLuc",
  ); // lấy danh sách đơn vị tính có hiệu lực

  static sua_chi_so_xet_nghiem = getUrlApi(apiServices.GATEWAY_LIS + "api/partner/public/xetnghiem/suaDichVu");
  static them_chi_so_va_chi_so_kem_theo = getUrlApi(
    apiServices.GATEWAY_LIS + "api/partner/public/xetnghiem/themDMDichVu",
  );
  static layDsDvConTheoLoaiXetNghiemHieuLuc = getUrlApi(
    apiServices.GATEWAY_LIS + "api/partner/public/xetnghiem/layDsDvConTheoLoaiDvHieuLuc",
  );
  static lay_ds_chi_so_kem_theo_theo_loai_xet_nghiem = getUrlApi(
    apiServices.GATEWAY_LIS + "api/partner/public/xetnghiem/layDsDvConTheoLoaiDv",
  );
  static tim_kiem_chi_so_xet_nghiem = getUrlApi(
    apiServices.GATEWAY_LIS + "api/partner/public/xetnghiem/timKiemDichVuXetNghiem",
  );
  static xoa_nhieu_chi_so_xet_nghiem = getUrlApi(
    apiServices.GATEWAY_LIS + "api/partner/public/xetnghiem/xoaNhieuDichVuXetNghiem",
  );
  static lay_phong_lay_mau_dv = getUrlApi(apiServices.GATEWAY_LIS + "api/partner/public/xetnghiem/layPhongLayMauDv");
  static luu_chi_so_kem_theo = getUrlApi(apiServices.GATEWAY_LIS + "api/partner/public/xetnghiem/luuChiSoKemTheo");
  static tim_kiem_chi_so_xet_nghiem_kem_theo = getUrlApi(
    apiServices.GATEWAY_LIS + "api/partner/public/xetnghiem/timKiemChiSoXetNghiem",
  );

  static machine_control_api_get = getUrlApi(
    apiServices.GATEWAY_LIS + "api/partner/public/mayxetnghiem/layThongSoMayXetNghiem",
  );
  static machine_detail_api_get = getUrlApi(
    apiServices.GATEWAY_LIS + "api/partner/public/mayxetnghiem/layThongSoMayXetNghiem",
  );
  static DsLoaiDichVuVaSlDvCon_api_get = getUrlApi(
    apiServices.GATEWAY_LIS + "api/partner/public/xetnghiem/layDsLoaiDichVuVaSlDvCon",
  );
  static layDsDvConTheoLoaiDvHieuLuc_api_get = getUrlApi(
    apiServices.GATEWAY_LIS + "api/partner/public/xetnghiem/layDsDvConTheoLoaiDvHieuLuc",
  );
  static luuThongSoMayXetNghiem_api_luu = getUrlApi(
    apiServices.GATEWAY_LIS + "api/partner/public/mayxetnghiem/luuThongSoMayXetNghiem",
  );
  static xoaThongSoMayXetNghiem_api_delete = getUrlApi(
    apiServices.GATEWAY_LIS + "api/partner/public/mayxetnghiem/xoaThongSoMayXetNghiem",
  );
  static capNhatThongSoMayXetNghiem_api_update = getUrlApi(
    apiServices.GATEWAY_LIS + "api/partner/public/mayxetnghiem/capNhatThongSoMayXetNghiem",
  );
  static capNhatThongSoMayXetNghiem_api_lock = getUrlApi(
    apiServices.GATEWAY_LIS + "api/partner/public/mayxetnghiem/capNhatTrangThaiKhoaThongSoMayXetNghiem",
  );

  static gen_Ma_thuoc = getUrlApi(apiServices.GATEWAY_CIS + "api/partner/public/thuoc/genMaThuoc");
  static layDsQuyen = getUrlApi(apiServices.GATEWAY_CIS + "api/partner/public/quyen/layTatCaQuyen");

// cài đặt phân hệ khám chữa bệnh
  static luuPhanHeCSKCB = getUrlApi(apiServices.GATEWAY_CIS + "api/partner/public/phanhe/luuPhanHeCSKCB");

  
}
