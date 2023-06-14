import { Button, Col, Divider, Modal, Row } from "antd";
import React, { forwardRef, useImperativeHandle, useState } from "react";
import { Logo } from "../../assets/svg";
import i18n, { languageKeys } from "../../i18n";
import modal from "./modal.module.scss";
import cn from "classnames";
import { useEventListener } from "../../hooks";

const ConfirmModal = forwardRef(
  (
    {
      children,
      width = 400, // Chiều rộng của modal
      title = i18n.t(languageKeys.title_Xac_nhan), // Text Tiêu đề của modal
      content = "Hãy xác nhận!", // Text Nội dung của modal
      okText = i18n.t(languageKeys.title_Xac_nhan), // Text nút Ok
      cancelText = i18n.t(languageKeys.common_Thoat), // Text nút Cancel
      onOk = () => {}, // Hàm xử lý khi bấm nút Ok
      onCancel = () => {}, // Hàm xử lý khi bấm nút Cancel
      okDisabled = false, // Disabled nút Ok
      clickOutsideDisabled = false, // Disabled việc \click ngoài modal -> đóng modal
      danger = false,
      hideEscape = false, // ẩn nút thoát
      zIndex,
      onPressCancelSuccess = () => {},
      ...props
    },
    ref,
  ) => {
    const [visible, setVisible] = useState(false);
    const [loading, setLoading] = useState(false);
    const [tempData, setTempData] = useState();

    useImperativeHandle(ref, () => ({
      open(data) {
        setVisible(true);
        if (!!data) setTempData(data);
      },
      close() {
        onDismiss();
      },
      visible,
      loading(bool) {
        setLoading(bool);
      },
    }));

    const onClose = () => {
      onCancel(tempData);
      setTempData();
      if (loading) setLoading(false);
      setVisible(false);
    };

    const onDismiss = () => {
      setTempData();
      if (loading) setLoading(false);
      setVisible(false);
      onPressCancelSuccess();
    };

    const onClickOk = () => {
      setVisible(false);
      onOk(tempData);
    };

    // hàm xử lý phím tắt
    function keydownEvent(event) {
      if (!visible) {
        return;
      }

      if (event.key === "Enter") {
        event.preventDefault();
        onClickOk();
      }
    }

    useEventListener("keydown", keydownEvent, window, visible, 500);

    return (
      <Modal
        open={visible}
        onCancel={clickOutsideDisabled ? () => {} : onDismiss}
        onOk={() => onClickOk}
        width={width}
        okText={okText}
        cancelText={cancelText}
        closable={false}
        footer={null}
        zIndex={zIndex}
        {...props}
      >
        {/* =========== Hiển thị mặc định: Logo + title + text content =========== */}
        <div style={{ textAlign: "center" }}>
          <Logo />

          <Divider style={{ marginTop: 15, marginBottom: 0 }} />

          <div className={cn(modal["title-content"], danger && modal["red-txt"])}>
            {typeof title === "string" ? <h1>{title}</h1> : title}

            {typeof content === "string" ? <p>{content}</p> : content}
          </div>
        </div>

        {/* =================== Component(s) con được truyền vào =================== */}
        {children}

        <Divider style={{ marginTop: 15 }} />

        {/* =================== Hàng nút Cancel + Ok =================== */}
        <Row gutter={10} justify="center" className={cn(danger && modal["red-btns"])}>
          {
            !hideEscape && (
              <Col>
                <Button type="primary" ghost onClick={onClose}>
                  {cancelText} (Esc)
                </Button>
              </Col>
            )
          }

          <Col>
            <Button
              type="primary"
              onClick={() => onOk(tempData)}
              loading={loading}
              className={modal["ok-btn"]}
              disabled={okDisabled}
            >
              {okText} (Enter)
            </Button>
          </Col>
        </Row>
      </Modal>
    );
  },
);

export default ConfirmModal;
