import { Col, DatePicker, Radio, Row, Tooltip } from "antd";
import moment from "moment";
import React, { forwardRef, memo, useImperativeHandle, useState } from "react";
import i18n, { languageKeys } from "../../i18n";
import Select from "../Select/Select";
import style from "./complexDatePicker_old.module.less";

const selections = {
  custom_range: "custom_range",
  date_range: "date_range",
};

export const customRanges = {
  today: { value: "today", title: i18n.t(languageKeys.common_Hom_nay) },
  tommorow: { value: "tommorow", title: i18n.t(languageKeys.common_Ngay_mai) },
  next_7_days: { value: "next_7_days", title: i18n.t(languageKeys.next_7_days) },
  next_30_days: { value: "next_30_days", title: i18n.t(languageKeys.next_30_days) },
};

export const customPassRange = {
  today: { value: "today", title: i18n.t(languageKeys.common_Hom_nay) },
  yesterday: { value: "yesterday", title: i18n.t(languageKeys.common_Hom_qua) },
  last_7_days: { value: "last_7_days", title: i18n.t(languageKeys.last_7_days) },
  last_30_days: { value: "last_30_days", title: i18n.t(languageKeys.last_30_days) },
};

export const _ComplexDatePicker = forwardRef(({ onChange = () => {}, showAll = false, getFuture = false }, ref) => {
  const [currentSelection, setCurrentSelection] = useState(selections.custom_range);
  const [customRangeValue, setCustomRangeValue] = useState(getFuture ? customRanges.next_30_days.value : showAll ? null : customRanges.today.value);
  const [dateRangeValue, setDateRangeValue] = useState([undefined, undefined]);

  useImperativeHandle(ref, () => ({
    customRangeValue,
    dateRangeValue,
    reset: handleReset,
  }));

  const handleReset = () => {
    setCurrentSelection(selections.custom_range);
    setCustomRangeValue(getFuture ? customRanges.next_30_days.value : showAll ? null : customRanges.today.value);
    setDateRangeValue([undefined, undefined]);
  };

  const handleCheckCustomRange = (e, option = showAll ? null : customRanges.today.value) => {
    const { value } = e.target;
    setCurrentSelection(value);
    setCustomRangeValue(option);
    setDateRangeValue([undefined, undefined]);
    const values = getValuesFromCustomRange(option);
    onChange(values);
  };

  const handleCheckDateRange = (e, dateRange = [moment(), moment()]) => {
    const { value } = e.target;
    setCurrentSelection(value);
    setCustomRangeValue(showAll ? null : customRanges.today.value);
    setDateRangeValue(dateRange);
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
        break;
      case customPassRange.last_7_days.value:
        from = from.subtract(6, "days");
        break;
      case customPassRange.last_30_days.value:
        from = from.subtract(29, "days");
        break;
      case customRanges.tommorow.value:
        from = from.add(1, "days");
        to = to.add(1, "days");
        break;
      case customRanges.next_7_days.value:
        to = to.add(6, "days");
        break;
      case customRanges.next_30_days.value:
        to = to.add(29, "days");
        break;
      case null:
        if (showAll) {
          from = null;
          to = null;
        } else to = to.add(29, "days");
        break;
      default:
        break;
    }
    return [from, to];
  };

  return (
    <Row gutter={[10, 10]}>
      <Col span={24}>
        <Row align="middle">
          <Col>
            <Radio value={selections.custom_range} checked={currentSelection === selections.custom_range} onChange={handleCheckCustomRange}></Radio>
          </Col>

          <Col flex="auto">
            <Select
              className={`${currentSelection === selections.custom_range ? style["custom-select"] : style["custom-select--disabled"]}`}
              style={{ width: "100%" }}
              disableArrow
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
          </Col>
        </Row>
      </Col>

      <Col span={24}>
        <Row align="middle" wrap={false}>
          <Col>
            <Radio value={selections.date_range} checked={currentSelection === selections.date_range} onChange={handleCheckDateRange}></Radio>
          </Col>

          <Col flex="auto" className={style["date-range-picker-ctn"]}>
            <DatePicker.RangePicker
              format="DD/MM/YYYY"
              placeholder={[i18n.t(languageKeys.field_Tu), i18n.t(languageKeys.field_Den)]}
              className={`${currentSelection === selections.date_range ? style["date-range-picker"] : style["date-range-picker--disabled"]}`}
              value={dateRangeValue}
              onChange={handleChangeDateRange}
              allowClear={false}
              suffixIcon={null}
              dropdownClassName={style["popup-datepicker"]}
            />
          </Col>
        </Row>
      </Col>
    </Row>
  );
});

export const ComplexDatePicker = memo(_ComplexDatePicker);
