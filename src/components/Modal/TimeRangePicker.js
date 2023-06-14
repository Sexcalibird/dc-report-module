import { Button, Col, DatePicker, Divider, Modal, Row } from "antd";
import { forwardRef, useImperativeHandle, useState } from "react";
import { Logo } from "../../assets/svg";
import i18n, { languageKeys, languages } from "../../i18n";
import modal from "./modal.module.scss";
import cn from "classnames";
import moment from "moment";

const dateFormat = "DD/MM/YYYY";

const TimeRangePicker = forwardRef(
  (
    {
      width = 400, // Chiều rộng của modal
      content = "Hãy chọn khoảng thời gian cần lấy dữ liệu!", // Text Nội dung của modal
      okText = "Ok", // Text nút Ok
      cancelText = i18n.t(languageKeys.common_Thoat), // Text nút Cancel
      onOk = () => {}, // Hàm xử lý khi bấm nút Ok
      onCancel = () => {}, // Hàm xử lý khi bấm nút Cancel
      okDisabled = false, // Disabled nút Ok
      clickOutsideDisabled = false, // Disabled việc \click ngoài modal -> đóng modal
      danger = false,
    },
    ref
  ) => {
    const [visible, setVisible] = useState(false);
    const [loading, setLoading] = useState(false);
    const [tempData, setTempData] = useState();
    const [rangeTime, setRangeTime] = useState([
      moment().subtract(1, "months"),
      moment(),
    ]);

    const [fromDate, setFromDate] = useState(
      moment().subtract(1, "months").format("YYYYMMDD")
    );
    const [toDate, setToDate] = useState(moment().format("YYYYMMDD"));

    useImperativeHandle(ref, () => ({
      open(data) {
        setVisible(true);
        if (!!data) setTempData(data);
      },
      close() {
        onClose();
      },
      visible,
      loading(bool) {
        setLoading(bool);
      },
    }));

    const onClose = () => {
      onCancel();
      setTempData();
      setRangeTime([moment().subtract(1, "months"), moment()]);

      setFromDate(moment().subtract(1, "months").format("YYYYMMDD"));
      setToDate(moment().format("YYYYMMDD"));
      if (loading) setLoading(false);
      setVisible(false);
    };

    const onClickOk = () => {
      setVisible(false);
      onOk(tempData);
    };

    function disabledDate(current) {
      return (
        current > moment() ||
        current < moment(toDate, "YYYYMMDD").subtract(12, "months")
      );
    }

    // Component ấn chọn tab hiển thị
    const customFormat = (value) => {
      return i18n.language === languages.tieng_viet
        ? `Ngày ${value.format(dateFormat)}`
        : value.format("LL");
    };

    const onChangeSelectTime = (data) => {
      if (!data) return;
      setRangeTime(data);
      let from = moment(data[0]).format("YYYYMMDD");
      let to = moment(data[1]).format("YYYYMMDD");
      setFromDate(from);
      setToDate(to);
    };

    return (
      <Modal
        visible={visible}
        onCancel={clickOutsideDisabled ? () => {} : onClose}
        onOk={() => onClickOk}
        width={width}
        okText={okText}
        cancelText={cancelText}
        closable={false}
        footer={null}
      >
        {/* =========== Hiển thị mặc định: Logo + title + text content =========== */}
        <div style={{ textAlign: "center" }}>
          <Logo />

          <Divider style={{ marginTop: 15, marginBottom: 0 }} />

          <div
            className={cn(modal["title-content"], danger && modal["red-txt"])}
          >
            {/* {typeof title === "string" ? <h1>{title}</h1> : title} */}

            {typeof content === "string" ? <p>{content}</p> : content}
          </div>
        </div>

        {/* =================== Component(s) con được truyền vào =================== */}
        <Row gutter={10} justify="center">
          <DatePicker.RangePicker
            disabledDate={disabledDate}
            value={rangeTime}
            className={modal["datePicker"]}
            format={customFormat}
            onChange={(value) => onChangeSelectTime(value)}
            showNow={true}
          />
        </Row>
        <Divider style={{ marginTop: 15 }} />

        {/* =================== Hàng nút Cancel + Ok =================== */}
        <Row
          gutter={10}
          justify="center"
          className={cn(danger && modal["red-btns"])}
        >
          <Col>
            <Button type="primary" ghost onClick={onClose}>
              {cancelText}
            </Button>
          </Col>

          <Col>
            <Button
              type="primary"
              onClick={() => {
                onOk(rangeTime);
                onClose();
              }}
              loading={loading}
              className={modal["ok-btn"]}
              disabled={okDisabled}
            >
              {okText}
            </Button>
          </Col>
        </Row>
      </Modal>
    );
  }
);

export default TimeRangePicker;
