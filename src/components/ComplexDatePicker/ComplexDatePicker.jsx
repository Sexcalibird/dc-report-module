import { Col, DatePicker, Divider, Radio, Row, Tooltip, Space, Button } from "antd";
import moment from "moment";
import React, { forwardRef, memo, useImperativeHandle, useState, useRef, useEffect } from "react";
import i18n, { languageKeys } from "../../i18n";
import Select from "../Select/Select";
import style from "./complexDatePicker.module.scss";
import {Calendar} from '../../assets/svg';
import { CaretDownFilled } from "@ant-design/icons";

const selections = {
  custom_range: "custom_range",
  date_range: "date_range",
};

export const customRanges = {
  today: { value: "today", title: i18n.t(languageKeys.common_Hom_nay) },
  tommorow: { value: "tommorow", title: i18n.t(languageKeys.common_Ngay_mai) },
  next_7_days: { value: "next_7_days", title: i18n.t(languageKeys.next_7_days) },
  next_30_days: { value: "next_30_days", title: i18n.t(languageKeys.next_30_days) },
  other: {value: 'other', title: i18n.t(languageKeys.other_option)}
};

export const customPassRange = {
  today: { value: "today", title: i18n.t(languageKeys.common_Hom_nay) },
  yesterday: { value: "yesterday", title: i18n.t(languageKeys.common_Hom_qua) },
  last_7_days: { value: "last_7_days", title: i18n.t(languageKeys.last_7_days) },
  last_30_days: { value: "last_30_days", title: i18n.t(languageKeys.last_30_days) },
  other: {value: 'other', title: i18n.t(languageKeys.other_option)}
};

export const _ComplexDatePicker = forwardRef((
  { 
    onChange = () => {},
    onApply = () => {},
    showAll = false, getFuture = false,
    onReset = () => {},
    isShowAddition = false,
    showBtn = false,
    showFilterBlock = false,
    showIconToggle = true,
  }, ref) => {
  const [currentSelection, setCurrentSelection] = useState(selections.custom_range);
  const [customRangeValue, setCustomRangeValue] = useState(getFuture ? customRanges.next_30_days.value : showAll ? null : customRanges.today.value);
  const [dateRangeValue, setDateRangeValue] = useState(getFuture ? [moment(), moment().add(29, "days")] : showAll ? [undefined, undefined] : [moment(), moment()]);
  const [pickerOpen, setpickerOpen] = useState(false);
  const [showFilter, setShowFilter] = useState(isShowAddition ? showFilterBlock : true);
  const pickerRef = useRef();


  const handlePickerClickOutside = () => {
    if(!dateRangeValue || !dateRangeValue[0] || !dateRangeValue[1]){
      setCustomRangeValue('today');
      setDateRangeValue([moment(), moment()]);
      setpickerOpen(false)
    }
  }

  useImperativeHandle(ref, () => ({
    customRangeValue,
    dateRangeValue,
    reset: handleReset,
    setCustomRangeValue: setCustomRangeValue,
  }));

  const handleReset = () => {
    onReset([moment(), moment()]);
    setCurrentSelection(selections.custom_range);
    setCustomRangeValue(getFuture ? customRanges.next_30_days.value : showAll ? null : customRanges.today.value);
    setDateRangeValue(getFuture ? [moment(), moment().add(29, "days")] : showAll ? [undefined, undefined] : [moment(), moment()]);
  };

  const handleCheckCustomRange = (e, option = showAll ? null : customRanges.today.value) => {
    const { value } = e.target;
    setCurrentSelection(value);
    setCustomRangeValue(option);
    const values = getValuesFromCustomRange(option);
    if(values){
      setDateRangeValue([values[0], values[1]]);
      onChange(values);
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClick);
    return () => {
      document.removeEventListener("mousedown", handleClick);
    };
  });

  const handleClick = (e) => {
    if(pickerOpen){
      const datePickerrr = document.querySelector('.ant-picker-dropdown.ant-picker-dropdown-range');
      if(!!datePickerrr && !datePickerrr.contains(e.target)) handlePickerClickOutside()
    }
      return;
  };

  const handleCheckDateRange = (e, dateRange = [moment(), moment()]) => {
    const { value } = e.target;
    setCurrentSelection(value);
    setDateRangeValue(dateRange);
    setpickerOpen(false);                                                                                                                                                                                                                                                                                                                                                                                                                    
    onChange(dateRange);
  };

  const handleChangeCustomRange = (value) => {
    handleCheckCustomRange({ target: { value: selections.custom_range } }, value);
  };

  const handleChangeDateRange = (values) => {
    handleCheckDateRange({ target: { value: selections.date_range } }, values);
  };

  const getValuesFromCustomRange = (option) => {
    let from = moment();
    let to = moment();
    switch (option) {
      case customPassRange.yesterday.value:
        from = from.subtract(1, "days");
        to = to.subtract(1, "days");
        return [from, to];
      case customPassRange.last_7_days.value:
        from = from.subtract(6, "days");
        return [from, to];
      case customPassRange.last_30_days.value:
        from = from.subtract(29, "days");
        return [from, to];
      case customRanges.tommorow.value:
        from = from.add(1, "days");
        to = to.add(1, "days");
        return [from, to];
      case customRanges.next_7_days.value:
        to = to.add(6, "days");
        return [from, to];
      case customRanges.next_30_days.value:
        to = to.add(29, "days");
        return [from, to];
      case customRanges.other.value:
        setDateRangeValue([undefined, undefined])
        setpickerOpen(true);
        break;
      case null:
        if (showAll) {
          from = null;
          to = null;
        } else to = to.add(29, "days");
        return [from, to];
      default:
        return [from, to];
    }
  };

  return (
    <Row gutter={[10, 10]}>
      <Col span={24}>
        <Row align="middle">
          <Col flex="auto">
            {
              isShowAddition ? (    
                <h4 className={style["sider-title"]} onClick={() => showIconToggle && setShowFilter(!showFilter)} style={{ cursor: "pointer", fontSize: 13 }}>
                  <span>
                    {showIconToggle && (
                      <CaretDownFilled
                        onClick={() => {
                          setShowFilter(!showFilter);
                        }}
                        style={{ transform: !showFilter && "rotate(-90deg)" }}
                      />
                    )}
                  </span>{" "}
                  <span style={{ fontWeight: 700 }}>{i18n.t(languageKeys.field_thoi_gian)}</span>
                </h4>
              ) : <></>
            }
            <div
              className={style["time-select-wrapper"]}
              style={{ width: "100%", display: showFilter ? "block" : "none" }}
            >
              <Select
                className={style["custom-select"]}
                style={{ width: "100%" }}
                dataSource={
                  showAll
                    ? [
                        {
                          value: null,
                          title: i18n.t(languageKeys.tat_ca),
                        },
                        ...Object.values(getFuture ? customRanges : customPassRange),
                      ]
                    : [...Object.values(getFuture ? customRanges : customPassRange)]
                }
                titleKey="title"
                valueKey="value"
                value={customRangeValue}
                onSelect={handleChangeCustomRange}
                popupClassName={style["popup-select"]}
              />
              <Divider className={style['time-divider']}/>
              <div className={style['datepicker-wrapper']}>
                <div className={style["icon-calendar"]}>
                  <Calendar/>
                </div>
                <DatePicker.RangePicker
                  style={{pointerEvents: 'none'}}
                  format="DD/MM/YYYY"
                  placeholder={[i18n.t(languageKeys.field_Tu), i18n.t(languageKeys.field_Den)]}
                  className={`${style["date-range-picker"]}`}
                  defaultValue={[moment(),moment()]}
                  value={dateRangeValue}
                  onChange={handleChangeDateRange}
                  allowClear={false}
                  dropdownClassName={style["popup-datepicker"]}
                  suffixIcon={null}
                  separator={'-'}
                  showTime={false}
                  open={pickerOpen}
                  ref={pickerRef}
                  inputReadOnly
                />
              </div>
            </div>  
            {isShowAddition && showBtn && showFilter &&(
              <Row justify="space-evenly" style={{ marginTop: 12 }}>
                <Col>
                  <Button type="primary" ghost style={{ width: 100, fontWeight: 700 }} onClick={() => handleReset()}>
                    {i18n.t(languageKeys.button_Cai_dat_lai)}
                  </Button>
                </Col>
                <Col>
                  <Button
                    type={"primary"}
                    style={{ width: 100, fontWeight: 700 }}
                    onClick={() => (onApply(dateRangeValue))}
                  >
                    {i18n.t(languageKeys.common_Ap_dung)}
                  </Button>
                </Col>
              </Row>
            )}
          </Col>
        </Row>
      </Col>
    </Row>
  );
});

export const ComplexDatePicker = memo(_ComplexDatePicker);
