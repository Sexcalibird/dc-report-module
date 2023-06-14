import React, { memo } from "react";
import { EllipsisOutlined, PrinterOutlined } from "@ant-design/icons";
import { Button, notification, Popover, Row, Space, Tooltip } from "antd";
import actionButton from "./actionButton.module.scss";
import { Delete, Download, Edit, EditAlt } from "../../assets/svg/index.js";
// import Switch from "../Switch/Switch";
import classNames from "classnames";
import i18n, {languageKeys} from "../../i18n/index.js";

export const ActionButton = ({
  record = {}, // Bản ghi
  onDelete = () => {}, // Hàm xóa bản ghi
  onEdit = () => {}, // Hàm sửa bản ghi
  onDowload = () => {},
  showEdit = true,
  showPrint = false,
  onPrint = () => {}, // Hàm in bản ghi
  showDelete = true,
  deleteDisabled = false,
  downloadDisabled = false,
  downloadTip = "Tải xuống bản ghi",
  showDownload = false,
  popupVersion = false,
  //   mapCateKey,
  disabledPrint = false,
  //   onToggle,
  //   cateKey,
  editDisabled = false,
  deleteTip = "Xóa bản ghi",
  fixedTip = "Sửa bản ghi",
  printTip = "In bản ghi",
  multipleDeleteTip = "Xóa nhiều",
  style = {},
}) => {
  // Hàm xử lý bật/tắt Khóa
  //   const handleToggle = async (val) => {
  //     try {
  //       const key_hien_thi = mapCateKey()[cateKey].fieldData.hien_thi;
  //       const bitVal = !!val ? 1 : 0;
  //       const res = await onToggle({ ...record, [key_hien_thi]: bitVal });

  //       if (res.status === "OK") {
  //         record[key_hien_thi] = bitVal;
  //         return res;
  //       }

  //       return res;
  //     } catch (error) {
  //       HLog("Handle toggle trang thai hien thi ERROR", error);
  //     }
  //   };

  // Hàm xử lý khi bật/tắt thành công
  //   const onToggleSuccess = () => {
  //     notification.success({
  //       message: i18n.t(languageKeys.cap_nhat_thanh_cong),
  //       placement: "bottomLeft",
  //     });
  //   };

  // Hàm xử lý khi bật/tắt thất bại
  //   const onToggleFail = (res) => {
  // let error_msg = getErrorMessage(res.error_code, i18n.t(languageKeys.cap_nhat_that_bai));

  // if (!!mapCateKey()[res.field]) {
  //   error_msg += `: ${i18n.t(languageKeys.cate_Danh_muc)} ${i18n.t(mapCateKey()[res.field].langKey)}`;
  // }

  //     notification.error({
  //       message: error_msg,
  //       placement: "bottomLeft",
  //     });
  //   };

  if (popupVersion) {
    return (
      <Popover
        content={
          /* ================= Khóa Bật/Tắt ================== */
          <div onClick={(e) => e.stopPropagation()}>
            {/* {!!onToggle && (
              <div className={actionButton["wrapper"]}>
                <div className={actionButton["label"]}>{i18n.t(languageKeys.field_Hien_thi)}</div>

                <div className={actionButton["inner"]}>
                  <Switch
                    onToggle={handleToggle}
                    initValue={record[mapCateKey()[cateKey].fieldData.hien_thi]}
                    onSuccess={onToggleSuccess}
                    onFail={onToggleFail}
                  />
                </div>
              </div>
            )} */}

            <div className={actionButton["wrapper"]}>
              <div className={actionButton["label"]}>Thao tác</div>

              {/* ================= Xóa bản ghi ================== */}
              {showDelete && (
                <Tooltip placement="topLeft" title={deleteTip}>
                  <Row className={actionButton["item"]} onClick={() => onDelete(record)}>
                    <Delete /> <div className={actionButton["txt"]}>Xóa</div>
                  </Row>
                </Tooltip>
              )}

              {/* ================= Sửa bản ghi ================== */}
              {showEdit && (
                <Tooltip placement="topLeft" title={fixedTip}>
                  <Row className={actionButton["item"]} onClick={() => onEdit(record)}>
                    <Edit /> <div className={actionButton["txt"]}>Chỉnh sửa</div>
                  </Row>
                </Tooltip>
              )}

              {showPrint && (
                <Tooltip placement="topLeft" title={printTip}>
                  <Row className={actionButton["item"]} onClick={() => onPrint(record)}>
                    <PrinterOutlined style={{ color: "#999", fontSize: 20, marginLeft: 2 }} />{" "}
                    <div className={actionButton["txt"]}>In phiếu</div>
                  </Row>
                </Tooltip>
              )}
            </div>
          </div>
        }
        trigger="click"
        placement="bottomRight"
        overlayClassName={actionButton["popup"]}
      >
        {/* ================= Nút \dấu 3 chấm dọc\ ================== */}
        <Button
          icon={<EllipsisOutlined />}
          type="link"
          className={actionButton["action-btn"]}
          onClick={(e) => e.stopPropagation()}
        ></Button>
      </Popover>
    );
  }

  return (
    <div
      style={{ display: "flex", gap: 10, justifyContent: "flex-end", ...style }}
      onClick={(e) => e.stopPropagation()}
    >
      {showPrint && (
        <Tooltip placement="topLeft" title={printTip}>
          <Button
            type="link"
            icon={<PrinterOutlined className={actionButton["icon"]} />}
            onClick={() => onPrint(record)}
            disabled={disabledPrint}
            className={classNames(actionButton["print-btn-icon"], disabledPrint && actionButton["disabled-print"])}
          >
            {/* {i18n.t(languageKeys.field_In_phieu)} */}
            In phiếu
          </Button>
        </Tooltip>
      )}

      {showEdit && (
        <Tooltip placement="topLeft" title={editDisabled ? i18n.t(languageKeys.noPermission) : fixedTip}>
          <Button
            type="link"
            onClick={() => onEdit(record)}
            style={{ padding: 0, display: "flex", alignItems: "center" }}
            disabled={editDisabled}
          >
            {/* {i18n.t(languageKeys.common_Chinh_sua)} */}
            <EditAlt
              className={actionButton[editDisabled ? "icon-edit-btn-dis" : "icon-edit-btn"]}
              style={{ transform: "scale(1.2)" }}
            />
          </Button>
        </Tooltip>
      )}
      {showDownload && (
        <Tooltip placement="topLeft" title={downloadTip}>
          <Button
            type="link"
            onClick={() => onDowload(record)}
            disabled={downloadDisabled}
            style={{ padding: 0, display: "flex", alignItems: "center" }}
          >
            <Download
              style={{ width: 20 }}
              className={`${
                actionButton[downloadDisabled ? "disable-icon-download-btn" : "icon-download-btn"]
              } action__btn--dowload__svg`}
            />
          </Button>
        </Tooltip>
      )}
      {showDelete && (
        <Tooltip placement="topLeft" title={deleteDisabled ? i18n.t(languageKeys.noPermission) : deleteTip}>
          <Button
            type="link"
            onClick={() => onDelete(record)}
            disabled={deleteDisabled}
            style={{ padding: 0, display: "flex", alignItems: "center" }}
          >
            {/* {i18n.t(languageKeys.common_Xoa)} */}
            <Delete
              style={{ width: 20 }}
              className={actionButton[deleteDisabled ? "disable-icon-delete-btn" : "icon-delete-btn"]}
            />
          </Button>
        </Tooltip>
      )}
    </div>
  );
};

export default memo(ActionButton);
