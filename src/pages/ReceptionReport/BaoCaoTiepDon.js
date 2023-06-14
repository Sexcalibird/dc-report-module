import i18n, { languageKeys } from "../../../i18n";
import { ConfirmModal, Table, Topbar } from "../../../components";
import { Button, Col, Row, DatePicker, Form, Layout, Rate, notification, Tooltip } from "antd";
import style from "./bctiepdon.module.less";
import { useCallback, useEffect, useRef, useState } from "react";
import { apis, keys, paths } from "../../../constants";
import moment from "moment";
import { useLocation } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { common_post, getFullName, getTenLoaiDoiTuong, HLog, isEmptyObject, layDiaChi, rid } from "../../../helpers";
import { resetEvent } from "../../../ducks/slices/eventSlice";
import Constants from "../../../constants/Constants";
import { apiXoaCuocKham } from "../../QuanLyTiepDon/apisTiepDon";
import CustomSider from "./components/CustomSider";
import { ExportOutlined, LoadingOutlined, PrinterOutlined } from "@ant-design/icons";
import { columnsBaoCaoTiepDon, getTextByStatus, getGioiTinhBN, statusList } from "../../QuanLyTiepDon/columnsTiepDon";
import { lsDoiTuong } from "../../QuanLyTiepDon/fieldsTiepDon";
import { exportExcel_BaoCaoTiepDon_v2 } from "../templateExcel/createExcel";
import ModalPDF from "../../../components/Modal/ModalPDF";
import { throttle } from "lodash";
import { resetTitle, updateTitle } from "../../../ducks/slices/titlePageSlice";
import { useMemo } from "react";
import { handleCheckPermissions } from "../../../helpers";
import { featureKeys, permissionActionKey } from "constants/keys";

export const appointmentViews = {
  da_tiep_nhan: "da_tiep_nhan",
  cuoc_hen_sap_toi: "cuoc_hen_sap_toi",
};

const noti_export_key = "noti_export_key";

const BaoCaoTiepDon = () => {
  const configRef = useRef();
  const baoCaoRef = useRef();
  const confirmRef = useRef();
  const { pathname } = useLocation();

  const [date, setDate] = useState([moment(), moment()]);
  const [searchString, setSearchString] = useState("");
  const [doiTuong, setDoiTuong] = useState(""); // value đối tượng
  const [reception, setReception] = useState(); // value người tiếp đón
  const [tenReception, setTenReception] = useState(""); // value người tiếp đón

  const [department, setDepartment] = useState(); // value khoa
  const [tenDepartment, setTenDepartment] = useState();

  const [status, setStatus] = useState(statusList[0].children.map((item) => item.value));
  const [paid, setPaid] = useState();

  const [deleteItem, setDeleteItem] = useState();
  const [columnsTable, setColumnsTable] = useState(columnsBaoCaoTiepDon);
  const [currentPage, setCurrentPage] = useState(1);

  const [loading, setLoading] = useState(false);
  const [dataSource, setDataSource] = useState([]);
  const [totalResult, setTotalResult] = useState(0);
  const render = useState("");
  const [filterOption, setFilterOption] = useState({});

  const dataEvent = useSelector((state) => state.eventSlice.event);
  const userProfile = useSelector((state) => state.auth.user);
  const dispatch = useDispatch();
  const currentView = pathname === paths.bao_cao_tiep_don ? appointmentViews.da_tiep_nhan : appointmentViews.cuoc_hen_sap_toi;
  const [dataRequest, setDataRequest] = useState({});

  useEffect(() => {
    setSearchString("");
    createColumnsTable();
    handleFilter();
  }, [currentView]);

  useEffect(() => {
    reloadAppointment(dataEvent);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dataEvent]);

  useEffect(() => {
    dispatch(
      updateTitle(
        currentView === appointmentViews.da_tiep_nhan ? i18n.t(languageKeys.tab_Bao_cao_tiep_don) : i18n.t(languageKeys.label_quan_ly_lich_hen)
      )
    );

    return () => {
      dispatch(resetTitle());
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  //hàm xử lí reload cuộc hẹn ở tab tiếp đón
  const reloadAppointment = (event) => {
    HLog("QuanLyTiepDon reloadAppointment event: ", event);
    if (event && !isEmptyObject(event)) {
      let { type } = event;
      HLog("QuanLyTiepDon reloadAppointment type: " + type);
      switch (type) {
        case Constants.EVENT_TIEP_DON_LUOT_DIEU_TRI:
        case Constants.CUOC_KHAM_VAO_KHAM:
        case Constants.CUOC_KHAM_KHAM_XONG:
        case Constants.EVENT_THANH_TOAN_LUOT_DIEU_TRI:
          HLog("QuanLyTiepDon reloadAppointment reload data EVENT_TIEP_DON_LUOT_DIEU_TRI: ");
          dispatch(resetEvent());
          break;
        case Constants.EVENT_LUOT_DIEU_TRI_KHAM_XONG:
          HLog("QuanLyTiepDon reloadAppointment reload data EVENT_LUOT_DIEU_TRI_KHAM_XONG: ");
          dispatch(resetEvent());
          break;
        default:
          break;
      }
    }
  };

  // Hàm xử lý sang trang tiếp theo
  const handleNextPage = () => getDataSource(searchString, currentPage + 1, date[0], date[1]);

  // Hàm xử lý quay lại trang trước
  const handlePrevPage = () => getDataSource(searchString, currentPage - 1, date[0], date[1]);

  // Hàm xử lý tải lại danh sách (clear luôn từ khóa tìm kiếm)
  const handleReloadList = () => {
    setSearchString("");
    setDate([]);
    return () => {
      resetField();
    };
  };
  // lấy danh sách lịch khám
  async function getDataSource(search_string = "", page = 1, fromDate, toDate) {
    setLoading(true);
    let res = undefined;
    try {
      res = await layDsLichKham({ ...dataRequest, page: page });
      if (!!res) {
        let { result, current_page, total } = res;
        setDataSource(result.map((item) => ({ ...item, key: rid() })));
        setCurrentPage(current_page);
        setTotalResult(total);
        console.log(total);
      }
    } catch (error) {
      HLog("LAY LICH KHAM THAT BAI", error);
    }
    setLoading(false);
  }

  const resetField = () => {
    setDate([moment(), moment()]);
    //setSearchString("");
    setReception();
    setDepartment();
    setDoiTuong(lsDoiTuong[0].ma_dt);

    setStatus([]);
    setPaid();

    // visibleModal(false)
    render[1](rid());
  };
  useEffect(() => {
    handleFilter({}, "");
  }, [render[0]]);

  const onChangeSelectTime = (time) => {
    setDate([moment(time[0]), moment(time[1])]);
    setCurrentPage(1);
  };

  // lấy danh sách lịch khám
  const layDsLichKham = async ({
    page,
    TU = moment().format("YYYYMMDD"),
    DEN = moment().format("YYYYMMDD"),
    search_string,
    filter_nguoi_tiep_don = "",
    filter_doi_tuong_benh_nhan = "",
    filter_trang_thai = [],
    filter_thanh_toan = "",
    filter_sap_xep_theo_key = {
      field: "",
      type: "",
    },
    KHOA_ID = "",
  }) => {
    let req = {
      partner_code: userProfile.partner_code,
      BENH_VIEN_ID: userProfile.BENH_VIEN_ID,
      page,
      limit: keys.limit,
      search_string,
      filter_nguoi_tiep_don,
      filter_doi_tuong_benh_nhan,
      filter_sap_xep_theo_key,
      filter_trang_thai,
      filter_thanh_toan,
      TU,
      DEN,
      KHOA_ID,
    };
    try {
      let res = await common_post(apis.bao_cao_tiep_don_ds_da_tiep_nhan, req, false);
      if (!!res && res.status === "OK") {
        return res;
      } else {
        notification.error({
          message: i18n.t(languageKeys.noti_lay_danh_sach_lich_kham_that_bai), //i18n.t(languageKeys)
          placement: "bottomLeft",
        });
      }
    } catch (error) {
      HLog("DANH SACH LỊCH KHÁM THẤT BẠI", error);
    }
    setLoading(false);
  };

  // khởi tạo cột
  const createColumnsTable = () => {
    let newColumns = columnsBaoCaoTiepDon.filter((obj) => {
      return !obj.unViewer;
    });
    setColumnsTable(newColumns);
  };

  const handleCancelItem = async () => {
    HLog("Delete item", deleteItem);
    try {
      let req = {
        LICH_KHAM_ID: deleteItem.LICH_KHAM_ID,
        partner_code: userProfile.partner_code,
      };
      let response = await apiXoaCuocKham(req);
      if (response) {
        setDeleteItem();
        confirmRef.current.close();
        getDataSource(searchString, 1, date[0], date[1]);
      }
    } catch (error) {
      HLog("delete item error ", error);
    }
  };

  //hàm tìm kiếm  lượt tiếp đón theo điền kiện
  const handleFilter = async (sxKey = {}, search_string = {}) => {
    if (!!date && date[1].diff(date[0], "years", true) > 1) {
      notification.error({
        message: "Thời gian khả dụng tối đa là 1 năm", //i18n.t(languageKeys)
        placement: "bottomLeft",
      });
      return;
    }
    HLog("reception", reception);
    HLog("department", department);
    setLoading(true);
    setFilterOption(sxKey);
    let body = {
      TU: date[0].format("YYYYMMDD"),
      DEN: date[1].format("YYYYMMDD"),
      filter_doi_tuong_benh_nhan: doiTuong,
      filter_nguoi_tiep_don: reception,
      filter_sap_xep_theo_key: sxKey,
      KHOA_ID: department,
      filter_trang_thai: status,
      filter_thanh_toan: paid,
      //search_string: search_string.length != 0 ? search_string : searchString,
      page: currentPage,
      ...search_string,
    };
    setDataRequest((val) => {
      let data = { ...body };
      data.nguoi_tiep_don = getFullName(tenReception);
      data.TEN_KHOA = !!department ? tenDepartment.TEN_KHOA_PHONG : "Tất cả";
      delete data.page;
      return data;
    });
    try {
      let res = await layDsLichKham(body);

      if (!!res) {
        let { result, current_page, total } = res;
        setDataSource(result.map((item) => ({ ...item, key: rid() })));
        setCurrentPage(current_page);
        setTotalResult(total);
      }
    } catch (error) {
      HLog("SẮP XẾP LỖI: bao cáo tiếp đón", error);
    }
    setLoading(false);
  };

  // lấy danh sách lịch khám
  const handleExportExcel = async () => {
    let req = {
      partner_code: userProfile.partner_code,
      BENH_VIEN_ID: userProfile.BENH_VIEN_ID,
      ...dataRequest,
      page: 1,
      limit: 1000,
    };
    try {
      let res = await common_post(apis.bao_cao_tiep_don_ds_da_tiep_nhan, req, false);
      console.log("Response export data", res);
      if (!!res && res.status === "OK") {
        exportExcel(res.result);
      } else {
        notification.error({
          message: i18n.t(languageKeys.noti_lay_danh_sach_lich_kham_that_bai), //i18n.t(languageKeys)
          placement: "bottomLeft",
        });
      }
    } catch (error) {
      HLog("DANH SACH LỊCH KHÁM THẤT BẠI", error);
    }
    setLoading(false);
  };

  const exportExcel = async (data) => {
    try {
      notification.open({
        key: noti_export_key,
        message: i18n.t(languageKeys.noti_Dang_xuat_danh_sach),
        placement: "bottomLeft",
        icon: <LoadingOutlined />,
        duration: 0,
      });
      
      if (!!data) {
        let exportData = {
          data: data,
          TEN_BENH_VIEN: userProfile.benh_vien.TEN_CSKCB,
          DIA_CHI: layDiaChi(userProfile.benh_vien),
          SO_DIEN_THOAI: !!userProfile.benh_vien.SO_DIEN_THOAI ? userProfile.benh_vien.SO_DIEN_THOAI : "",
          NGUOI_TIEP_DON: !!reception ? tenReception.HO + " " + tenReception.TEN : "Tất cả",
          KHOA: !!department ? tenDepartment.TEN_KHOA_PHONG : "Tất cả",
          NGAY_TU: !!date[0] ? date[0].format("DD/MM/YYYY") : moment().format("DD/MM/YYYY"),
          NGAY_DEN: !!date[1] ? date[1].format("DD/MM/YYYY") : moment().format("DD/MM/YYYY"),
          DOI_TUONG: getTenLoaiDoiTuong(doiTuong),
          NGUOI_TAO_BAO_CAO: userProfile.HO + " " + userProfile.TEN,
          ANH_DAI_DIEN: userProfile.benh_vien.ANH_DAI_DIEN,
          columns: columnsTable,
        };

        await exportExcel_BaoCaoTiepDon_v2(exportData).then(() => {
          notification.success({
            key: noti_export_key,
            message: i18n.t(languageKeys.noti_Xuat_danh_sach_thanh_cong),
            placement: "bottomLeft",
          });
        });
      } else {
        notification.error({
          key: noti_export_key,
          message: i18n.t(languageKeys.noti_Xuat_danh_sach_that_bai),
          placement: "bottomLeft",
        });
      }
    } catch (err) {
      notification.error({
        key: noti_export_key,
        message: i18n.t(languageKeys.noti_Xuat_danh_sach_that_bai),
        placement: "bottomLeft",
      });

      HLog("Export excel data error", err);
    }
  };

  const handlePrintPdf = () => {
    const req = {
      BENH_VIEN_ID: userProfile.BENH_VIEN_ID,
      partner_code: userProfile.partner_code,
      limit: 1000,
      ...dataRequest,
    };
    const api = apis.export_bao_cao_tiep_don;
    baoCaoRef.current.openModal(req, api);
  };

  const handleAutoSearch = useCallback(
    throttle((value) => handleFilter({}, value), 1000),
    [date, reception, doiTuong]
  );

  // const keyDownEvent = (event) => {
  //   if(!visibleModal){
  //     if(event.ctrlKey && event.key ==='i'){
  //       event.stopPropagation();
  //       event.preventDefault();
  //       handlePrintPdf();
  //     }
  //   }
  // }
  // useEventListener('keydown',keyDownEvent,window.document,!visibleModal)
  const configPermissions = useMemo(() => {
    return handleCheckPermissions(userProfile, featureKeys.bao_cao_tiep_don);
  }, [userProfile]);

  const RenderButtonPhanQuyen = ({ tooltipTxt = "", disabled = false, children, ...props }) => {
    return (
      <>
        <Tooltip title={!disabled ? tooltipTxt : "Bạn không có quyền cho chức năng này !"}>
          <Button {...props} disabled={disabled}>
            {children}
          </Button>
        </Tooltip>
      </>
    );
  };

  const handleSelect = (value) => {
    if (value === "all") {
      setStatus(statusList[0].children.map((item) => item.value));
    } else {
      setStatus((prev) => [...prev, value]);
    }
  };

  const handleDeSelect = (value) => {
    if (value === "all") {
      setStatus([]);
    } else {
      setStatus((prev) => prev.filter((item) => item !== value));
    }
  };

  return (
    <Layout>
      <Layout>
        <CustomSider
          onFilterTime={onChangeSelectTime}
          onFilter={handleFilter}
          page={currentPage}
          searchString={searchString}
          setSearchString={setSearchString}
          resetField={resetField}
          setDoiTuong={setDoiTuong}
          setTenReception={setTenReception}
          setReception={setReception}
          setDepartment={setDepartment}
          setTenDepartment={setTenDepartment}
          department={department}
          reception={reception}
          doiTuong={doiTuong}
          filterOption={filterOption}
          defaultDate={date}
          onAutoSearch={handleAutoSearch}
          status={status}
          setStatus={setStatus}
          handleSelect={handleSelect}
          handleDeSelect={handleDeSelect}
          paid={paid}
          setPaid={setPaid}
        />
        <Layout.Content>
          <Topbar
            className={style["topbar"]}
            addBtnText={i18n.t(languageKeys.label_Tiep_don)}
            setColumns={setColumnsTable}
            getColumns={columnsTable}
            showColumns
            totalNum={totalResult}
            addOnActions={
              <Row gutter={10} align="middle">
                <div className={style["drawer-action"]}></div>
                <RenderButtonPhanQuyen
                  type="primary"
                  className={style["top-btn"]}
                  onClick={handlePrintPdf}
                  disabled={!configPermissions[permissionActionKey.IN_PDF]}
                  tooltipTxt={i18n.t(languageKeys.button_In_bao_cao)}
                >
                  <PrinterOutlined />
                  {i18n.t(languageKeys.button_In_bao_cao)}
                </RenderButtonPhanQuyen>

                <RenderButtonPhanQuyen
                  type="primary"
                  className={style["top-btn"]}
                  onClick={handleExportExcel}
                  disabled={!configPermissions[permissionActionKey.XUAT_EXCEL]}
                  tooltipTxt={i18n.t(languageKeys.button_Xuat_excel)}
                >
                  <ExportOutlined />
                  {i18n.t(languageKeys.button_Xuat_excel)}
                </RenderButtonPhanQuyen>
              </Row>
            }
          />
          <Table
            columns={columnsTable}
            scroll={{ y: `calc(100vh - ${220}px)` }}
            dataSource={dataSource}
            showPagination
            currentPage={currentPage}
            totalResult={totalResult}
            limit={keys.limit}
            className={style["table-container"]}
            onPrev={handlePrevPage}
            onNext={handleNextPage}
            loading={loading}
            onChange={(a, b, record) => {
              handleFilter({
                field: record.field,
                type: record.order?.replace("end", ""),
              });
            }}
          />
        </Layout.Content>
      </Layout>
      {/* <ModalTiepDon
        ref={configRef}
        currentView={currentView}
        doAfterSubmit={handleReloadList}
        fromBaoCao = {true}
        onVisibleModal={setVisibleModal}
      /> */}
      <ConfirmModal
        ref={confirmRef}
        content="Bạn có chắc chắn muốn xóa lượt khám này không?"
        danger={true}
        onOk={handleCancelItem}
        onCancel={() => {
          setDeleteItem();
        }}
      />
      <ModalPDF ref={baoCaoRef} filters={dataRequest} />
    </Layout>
  );
};

export default BaoCaoTiepDon;
