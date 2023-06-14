import { notification } from "antd";
import { forwardRef, lazy, memo, Suspense, useImperativeHandle, useMemo, useRef, useState } from "react";
import { common_post, HLog, rid } from "../../helpers";
import i18n, { languageKeys } from "../../i18n";
import { LoadingOutlined } from "@ant-design/icons";
import Printd from "printd";
import { stylePhieuTiepDonCLS } from "../PdfTemplates/PhieuTiepDonCLS";
import { stylePhieuTiepDonKhamBenh } from "../PdfTemplates/PhieuTiepDonKhamBenh";
import { stylePhieuThuPhiDv } from "../PdfTemplates/PhieuThuPhiDv";
import { styleDonThuoc } from "../PdfTemplates/DonThuoc";
import { useSelector } from "react-redux";
import { stylePhieuBaoCaoPhieuThu } from "../PdfTemplates/PhieuBaoCaoPhieuThu";
import { stylePhieuBaoCaoVienPhi } from "../PdfTemplates/PhieuBaoCaoVienPhi";
import { stylePhieuBaoCaoTiepDon } from "../PdfTemplates/PhieuBaoCaoTiepDon";
import { stylePhieuThanhToan } from "../PdfTemplates/PhieuThanhToan";
import { stylePhieuNhapKho } from "../PdfTemplates/PhieuNhapKho";
import { stylePhieuXuatTra } from "../PdfTemplates/TemplatePhieuXN/PhieuXuatTra";
import { stylePhieuChiTietCongNoNhaCungCap } from "../PdfTemplates/PhieuChiTietCongNoNhaCungCap";
import { stylePhieuXuatBan } from "../PdfTemplates/TemplatePhieuXN/PhieuXuatBan";
import { stylePhieuXuatHuy } from "../PdfTemplates/TemplatePhieuXN/PhieuXuatHuy";
import { stylePhieuBanLeThuoc } from "../PdfTemplates/PhieuBanLeThuoc";
import { styleTheKhoPdf } from "../PdfTemplates/TemplatePhieuXN/TheKhoPdf";
import { styleKhangSinhPdf } from "../PdfTemplates/templateBaocao/BcKhangSinhPdf";
import { styleKiemKePdf } from "../PdfTemplates/templateBaocao/BcKiemKeThuocPDF";
import { styleNhapxuatPdf } from "../PdfTemplates/templateBaocao/BcNhapxuatPdf";
import { styleTheoDoiThuNgan } from "../PdfTemplates/templateBaocao/BcTheoDoiThuNganPdf";
import { styleBacSiChiDinh } from "../PdfTemplates/templateBaocao/BcBacSiChiDinhPdf";
import { stylePhongChucNangPdf } from "../PdfTemplates/templateBaocao/ThongKePhongChucNangPdf";
import { styleDoanhThu } from "../PdfTemplates/templateBaocao/BcDoanhThuPdf";
import { styleBCTheKhoPdf } from "../PdfTemplates/TemplatePhieuXN/BaocaoTheKhoPdf";
import { stylePhieuTraKqPdf } from "../PdfTemplates/templateRis/PhieuTraKetQua";
import { stylePhieuKhamBenh } from "../PdfTemplates/update_1-11/PhieuKhamBenh";
import { styleDonThuocNew } from "../PdfTemplates/update_1-11/DonThuoc_new";
import { styleChiDinhNew } from "../PdfTemplates/update_1-11/PhieuChiDinhNew";
import * as _ from "lodash";
import { stylePhieuTraKqXn } from "../PdfTemplates/ketquaxn/KetQuaXn";
import { styleSoCDHA } from "../PdfTemplates/baocaoris/SoCDHA";
import { styleHoatDongCDHA } from "../PdfTemplates/baocaoris/HoatDongCDHA";
import { styleThongKeRis } from "../PdfTemplates/baocaoris/ThongKeDvTheoBn";
import { styleBcThuNganBnDv } from "../PdfTemplates/templateBaocao/BcThuNganBnDv.pdf";
import { stylePhuongThuc } from "../PdfTemplates/templateBaocao/BcPhuongThuc.pdf";
import { styleDoanhThuKh } from "../PdfTemplates/templateBaocao/BcDoanhThuKh.pdf";
import { styleBcPhieuThuDv } from "../PdfTemplates/templateBaocao/BcPhieuThuDichVu";
import { styleChiTietSoHoaDon } from "../PdfTemplates/sohoadon/ChiTietSoHoaDon";

const noti_new_tab_key = "noti_new_tab_key";

const monitor = {
  phieuKhamBenh: {
    path: import("../PdfTemplates/PhieuTiepDonKhamBenh"),
    style: stylePhieuTiepDonKhamBenh,
  },
  phieuCLS: {
    path: import("../PdfTemplates/PhieuTiepDonCLS"),
    style: stylePhieuTiepDonCLS,
  },
  phieuThuPhiDV: {
    path: import("../PdfTemplates/PhieuThuPhiDv"),
    style: stylePhieuThuPhiDv,
  },
  // phieuTomTatKham: {
  //   path: import("../PdfTemplates/PhieuTomTatKham"),
  //   style: stylePhieuTomTatKham,
  // },
  donThuoc: {
    path: import("../PdfTemplates/DonThuoc"),
    style: styleDonThuoc,
  },
  xuatBaoCaoPhieuThu: {
    path: import("../PdfTemplates/PhieuBaoCaoPhieuThu"),
    style: stylePhieuBaoCaoPhieuThu,
  },
  xuatBaoCaoVienPhi: {
    path: import("../PdfTemplates/PhieuBaoCaoVienPhi"),
    style: stylePhieuBaoCaoVienPhi,
  },
  xuatPhieuBaoCaoTiepDon: {
    path: import("../PdfTemplates/PhieuBaoCaoTiepDon"),
    style: stylePhieuBaoCaoTiepDon,
  },
  PhieuNhapHang: {
    path: import("../PdfTemplates/PhieuNhapKho"),
    style: stylePhieuNhapKho,
  },
  PhieuXuatBan: {
    path: import("../PdfTemplates/TemplatePhieuXN/PhieuXuatBan"),
    style: stylePhieuXuatBan,
  },
  PhieuXuatTra: {
    path: import("../PdfTemplates/TemplatePhieuXN/PhieuXuatTra"),
    style: stylePhieuXuatTra,
  },
  PhieuXuatHuy: {
    path: import("../PdfTemplates/TemplatePhieuXN/PhieuXuatHuy"),
    style: stylePhieuXuatHuy,
  },
  // PhieuBanLe: {
  //   path: import("../PdfTemplates/TemplatePhieuXN/PhieuBanThuoc"),
  //   style: stylePhieuBanThuoc,
  // },
  PhieuBanLe: {
    path: import("../PdfTemplates/PhieuBanLeThuoc"),
    style: stylePhieuBanLeThuoc,
  },
  // PhieuThanhToan:{
  //   path: import("../PdfTemplates/TemplatePhieuXN/PhieuNhapHang"),
  //   style:stylePhieuNhapHang,
  // },
  ChiTietCongNo: {
    path: import("../PdfTemplates/PhieuChiTietCongNoNhaCungCap"),
    style: stylePhieuChiTietCongNoNhaCungCap,
  },
  PhieuThanhToan: {
    path: import("../PdfTemplates/PhieuThanhToan"),
    style: stylePhieuThanhToan,
  },
  // ChiTietCongNo: {
  //   path: import("../PdfTemplates/PhieuCongNo"),
  //   style: stylePhieuNhapHang,
  // },
  theKhoPDF: {
    path: import("../PdfTemplates/TemplatePhieuXN/TheKhoPdf"),
    style: styleTheKhoPdf,
  },
  khangSinhPDF: {
    path: import("../PdfTemplates/templateBaocao/BcKhangSinhPdf"),
    style: styleKhangSinhPdf,
  },
  BienBanKiemKeThuoc: {
    path: import("../PdfTemplates/templateBaocao/BcKiemKeThuocPDF"),
    style: styleKiemKePdf,
  },
  bcNhapxuatPDF: {
    path: import("../PdfTemplates/templateBaocao/BcNhapxuatPdf"),
    style: styleNhapxuatPdf,
  },
  bcTheoDoiThuNganPDF: {
    path: import("../PdfTemplates/templateBaocao/BcTheoDoiThuNganPdf"),
    style: styleTheoDoiThuNgan,
  },
  bcBacSiChiDinhPDF: {
    path: import("../PdfTemplates/templateBaocao/BcBacSiChiDinhPdf"),
    style: styleBacSiChiDinh,
  },
  bcPhongChucNangPDF: {
    path: import("../PdfTemplates/templateBaocao/ThongKePhongChucNangPdf"),
    style: stylePhongChucNangPdf,
  },
  bcDoanhThuPDF: {
    path: import("../PdfTemplates/templateBaocao/BcDoanhThuPdf"),
    style: styleDoanhThu,
  },
  bcTheKhoPDF: {
    path: import("../PdfTemplates/TemplatePhieuXN/BaocaoTheKhoPdf"),
    style: styleBCTheKhoPdf,
  },
  PhieuTraKq: {
    path: import("../PdfTemplates/templateRis/PhieuTraKetQua"),
    style: stylePhieuTraKqPdf,
  },
  phieuTomTatKham: {
    path: import("../PdfTemplates/update_1-11/PhieuKhamBenh"),
    style: stylePhieuKhamBenh,
  },
  donThuocMoi: {
    path: import("../PdfTemplates/update_1-11/DonThuoc_new"),
    style: styleDonThuocNew,
  },

  phieuCLSMoi: {
    path: import("../PdfTemplates/update_1-11/PhieuChiDinhNew"),
    style: styleChiDinhNew,
  },

  phieuTiepDonMoi: {
    path: import("../PdfTemplates/update_1-11/PhieuChiDinhNew"),
    style: styleChiDinhNew,
  },
  phieuTraKQXN : {
    path: import("../PdfTemplates/ketquaxn/KetQuaXn"),
    style : stylePhieuTraKqXn
  },
  soCDHA : {
    path : import("../PdfTemplates/baocaoris/SoCDHA"),
    style : styleSoCDHA
  },
  HoatDongCDHA : {
    path : import("../PdfTemplates/baocaoris/HoatDongCDHA"),
    style : styleHoatDongCDHA,
  },
  thongKeDvTheoBnRis : {
    path : import("../PdfTemplates/baocaoris/ThongKeDvTheoBn"),
    style : styleThongKeRis
  },
  bcThuNganBnDvPDF:  {
    path : import("../PdfTemplates/templateBaocao/BcThuNganBnDv.pdf"),
    style : styleBcThuNganBnDv,
  },
  bcPhuongThucThanhToanPDF: {
    path : import("../PdfTemplates/templateBaocao/BcPhuongThuc.pdf"),
    style : stylePhuongThuc,
  },
  bcDoanhThuKhachHangPDF: {
    path : import("../PdfTemplates/templateBaocao/BcDoanhThuKh.pdf"),
    style : styleDoanhThuKh,
  },
  bcPhieuThuDichVu : {
    path : import("../PdfTemplates/templateBaocao/BcPhieuThuDichVu"),
    style : styleBcPhieuThuDv
  },
  // phieuTiepDonTach: {
  //   path: import("../PdfTemplates/update_1-11/PhieuChiDinhNew"),
  //   style: styleChiDinhNew,
  // },
  chiTietSoHoaDon : {
    path : import("../PdfTemplates/sohoadon/ChiTietSoHoaDon"),
    style : styleChiTietSoHoaDon
  },

};

//key danh sách các loại phiếu mới
const keysPhieu = {
  PHIEU_TD_TACH: "phieuTiepDonTach", //Phiếu tiếp đón in tách
  PHIEU_CLS_TACH: "phieuCLSTach", //Phiếu CLS in tách
  PHIEU_TD_MOI: "phieuTiepDonMoi", //Phiếu tiếp đón mới
  PHIEU_CLS: "phieuCLS", //Phiếu CLS

}

const ModalPDF = forwardRef(
  ({ configCheck, chiDinhCls = false, ly_do_kham = "", nguoi_tiep_don = {}, phong_thuc_hien = {}, columns = [], ...props }, ref) => {
    const userProfile = useSelector((state) => state.auth.user);
    const [dataSource, setDataSource] = useState([]);
    const pdfRef = useRef();
    const styleRef = useRef([]);

    const componentProps = useMemo(
      () => ({
        chiDinhCls,
        ly_do_kham,
      }),
      [chiDinhCls, ly_do_kham]
    );

    useImperativeHandle(ref, () => ({
      async openModal(dataRequest, api, extraData = {}) {
        if (!!dataRequest) {
          HLog("Request Get Payment PDF", dataRequest);

          notification.open({
            key: noti_new_tab_key,
            message: i18n.t(languageKeys.noti_Dang_tai_du_lieu),
            placement: "bottomLeft",
            icon: <LoadingOutlined />,
            duration: 0,
          });

          try {
            const res = await common_post(api, dataRequest);

            if (res.status === "OK") {
              if (!!res.data) {
                let list = res.data;
                
                setDataSource(() => {
                  if (!Array.isArray(res.data)) {
                    list = [res.data];
                  }
                  let template = res.template;
                  let result = [];
                  let itemFirst = list.length > 0 ? list[0] : {}; //lấy ra phần tử đầu tiên của phiếu để kiểm tra template phiếu tách
                  
                  //kiểm tra nếu là tách phiếu tiếp đón, thì duyệt danh sách phiếu và in tách
                  //gán template = phieuTiepDonMoi để in ra có giao diện giống phiếu tiếp đón mặc định
                  if(template === keysPhieu.PHIEU_TD_TACH) {
                    list = res.data[0].dich_vu;
                    let data = res.data[0];
                    list.forEach((item) => {
                      let dichvu = item.data[0];
                      let MA_PHIEU = "";
                      if(!!dichvu) {
                        MA_PHIEU = dichvu.MA_PHIEU
                      }
                      
                      result.push({ ...data, dich_vu: [item], tong_thanh_tien: item.THANH_TIEN,MA_PHIEU, template:  keysPhieu.PHIEU_TD_MOI});
                    });

                    //Nếu là trường hợp phiếu CLS in tách
                  } else if(template === keysPhieu.PHIEU_CLS_TACH){ 
                    list = res.data[0].dich_vu;
                    let data = res.data[0];
                    
                    list.forEach((item) => {
                      let dichvu = item.data[0];
                      let MA_PHIEU = "";
                      if(!!dichvu) {
                        MA_PHIEU = dichvu.MA_PHIEU
                      }
                      
                      result.push({ ...data, dich_vu: [item], tong_thanh_tien: item.THANH_TIEN, MA_PHIEU, template:  keysPhieu.PHIEU_TD_MOI});
                    });

                  } else if(itemFirst && itemFirst.template === keysPhieu.PHIEU_CLS_TACH) { //trường hợp nếu item bên trong là phiếu tách
                    let arrData = res.data; //lấy ra mảng 
                    arrData.forEach((item) => {
                      //result.push(tachDvTuMangDv(item, item.dich_vu));
                      result = tachDvTuMangDv(item, item.dich_vu, result);
                    });

                  } else {
                    list.forEach((item) => {
                      if (!item.template) item.template = res.template;
                      if (item.template !== "donThuocMoi" || (item.template === "donThuocMoi" && item?.thuoc?.length > 0)) {
                        result.push({ ...item, ...extraData });
                      }
                    });
                  }
                  HLog("openModal result: ", result)
                  return result;
                });

                try {
                  setTimeout(() => {
                    const d = new Printd();
                    d.print(pdfRef.current, [
                      ` .pdf-container { min-height: 50vh; }
                        @media print {
                          .pdf-container { break-inside: avoid; }
                        }
                      `,
                      ...styleRef.current,
                    ]);

                    notification.success({
                      key: noti_new_tab_key,
                      message: i18n.t(languageKeys.noti_Tai_du_lieu_thanh_cong),
                      placement: "bottomLeft",
                    });
                  }, 1000);
                } catch (error) {
                  HLog("ModalPDF print error: ", error);

                  notification.error({
                    key: noti_new_tab_key,
                    message: i18n.t(languageKeys.noti_Tai_du_lieu_that_bai),
                    placement: "bottomLeft",
                  });
                }
              }
            }
          } catch (error) {
            HLog(error);
          }
        }
      },
      async openModalWithData(data, template = "", notification_key = "") {
        if (!!data && !!template) {
          HLog("Request Get Payment PDF", data);

          if (!notification_key) {
            notification.open({
              key: noti_new_tab_key,
              message: i18n.t(languageKeys.noti_Dang_tai_du_lieu),
              placement: "bottomLeft",
              icon: <LoadingOutlined />,
              duration: 0,
            });
          }

          try {
            setDataSource(() => {
              let list = data;
              if (!Array.isArray(data)) list = [data];
              HLog(
                "LIST",
                list,
                list.map((item) => {
                  if (!item.template) item.template = template;
                  return item;
                })
              );
              return list.map((item) => {
                if (!item.template) item.template = template;
                return item;
              });
            });

            try {
              setTimeout(() => {
                const d = new Printd();
                d.print(pdfRef.current, [
                  ` .pdf-container { min-height: 50vh; }
                    @media print {
                      .pdf-container { break-inside: avoid; }
                    }
                  `,
                  ...styleRef.current,
                ]);

                notification.success({
                  key: !!notification_key ? notification_key : noti_new_tab_key,
                  message: i18n.t(languageKeys.noti_Tai_du_lieu_thanh_cong),
                  placement: "bottomLeft",
                });
              }, 1000);
            } catch (error) {
              HLog("ModalPDF print error: ", error);
            }
          } catch (error) {
            HLog(error);
          }
        }
      },
    }));

    //xử lí tách các dịch vụ cùng phiếu ra thành 1 phiếu riêng trong mảng dịch vụ, mục đích dùng để in tách
    //data: chính là dữ liệu tổng hợp dùng để + vào phiếu tách
    const tachDvTuMangDv = (data, arrDichvu, result) => {
      arrDichvu.forEach((itemDv) => {
        let dichvu = itemDv.data[0];
        let MA_PHIEU = "";
        if(!!dichvu) {
          MA_PHIEU = dichvu.MA_PHIEU
        }
        
        result.push({ ...data, dich_vu: [itemDv], MA_PHIEU, template:  keysPhieu.PHIEU_TD_MOI, tong_thanh_tien: itemDv.THANH_TIEN});
      });
      return result;
    }

    const renderPhieu = useMemo(() => {
      let styleList = [];
      let arrPhieu = [];
      HLog("renderPhieu configCheck: ", configCheck, " dataSource: ", dataSource);
      // kiểm tra config
      if (!!configCheck) {
        // nếu config cần check là NHIEU_PHIEU_CHIDINH_CLS và config của viện là false
        if (configCheck === "NHIEU_PHIEU_CHIDINH_CLS" 
        && !userProfile.config.NHIEU_PHIEU_CHIDINH_CLS 
        && dataSource.length > 0) {
          HLog("renderPhieu dataSource: ", dataSource, " configCheck: ", configCheck);
          let Component = <></>;
          let firstItem = {};
          dataSource.forEach((data, index) => {
            if (index === 0) {
              Component = lazy(() => monitor[data.template].path);
              styleList.push(monitor[data.template].style);
              firstItem = data;
              firstItem.dich_vu = firstItem.dich_vu.map((item) => ({
                name: item,
                room: firstItem.hospital.ten_phong,
              }));
            } else {
              firstItem.dich_vu = [
                ...firstItem.dich_vu,
                ...data.dich_vu.map((item) => ({
                  name: item,
                  room: data.hospital.ten_phong,
                })),
              ];
            }
          });
          arrPhieu.push(
            <div className="pdf-container">
              <Suspense fallback={<></>}>
                <Component
                  data={firstItem}
                  rid={rid(5)}
                  combineAllRoom
                  nguoi_tiep_don={nguoi_tiep_don}
                  phong_thuc_hien={phong_thuc_hien}
                  {...componentProps}
                  {...props}
                />
              </Suspense>
            </div>
          );
        }
      }

      // nếu mà đống điều kiện ở trên không được check...
      if (arrPhieu.length === 0) {
        
        arrPhieu = dataSource.map((data) => {
          //HLog(" arrPhieu empty...data: ", data)
          const Component = lazy(() => monitor[data.template].path);
          styleList.push(monitor[data.template].style);
          return (
            <div className="pdf-container" key={rid(5)}>
              <Suspense fallback={<></>}>
                <Component
                  data={data}
                  rid={rid(5)}
                  nguoi_tiep_don={nguoi_tiep_don}
                  phong_thuc_hien={phong_thuc_hien}
                  columns={columns}
                  {...componentProps}
                  {...props}
                />
              </Suspense>
            </div>
          );
        });
      }

      styleRef.current = styleList;

      return arrPhieu;
    }, [columns, componentProps, configCheck, dataSource, nguoi_tiep_don, phong_thuc_hien, props, userProfile.config.NHIEU_PHIEU_CHIDINH_CLS]);

    return (
      <div ref={pdfRef} className="print-src">
        {renderPhieu}
      </div>
    );
  }
);

export default memo(ModalPDF);
