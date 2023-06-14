import { Divider, Modal } from "antd";
import { forwardRef, useImperativeHandle, useState } from "react";
import { Logo } from "../../assets/svg";

const WarningModal = forwardRef(
  (
    { children, width = 400, title = "Cảnh báo", content = "Hãy cẩn thận!", maskClosable = true },
    ref
  ) => {
    const [visible, setVisible] = useState(false);

    useImperativeHandle(ref, () => ({
      open() {
        setVisible(true);
      },
      close() {
        onClose();
      },
    }));

    const onClose = () => {
      setVisible(false);
    };

    return (
      <Modal
        visible={visible}
        onCancel={onClose}
        width={width}
        closable={false}
        footer={null}
        maskClosable = {maskClosable}
      >
        <div
          style={{
            textAlign: "center",
            paddingLeft: "30px",
            paddingRight: "30px",
          }}
        >
          <Logo />

          <Divider />

          {typeof title === "string" ? (
            <h1 style={{ color: "#FF5855" }}>{title}</h1>
          ) : (
            title
          )}

          {typeof content === "string" ? (
            <p style={{ color: "#2C3782" }}>{content}</p>
          ) : (
            content
          )}
        </div>

        {children}
      </Modal>
    );
  }
);

export default WarningModal;
