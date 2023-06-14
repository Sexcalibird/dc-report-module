import { UnorderedListOutlined } from "@ant-design/icons";
import { Button, Checkbox, Dropdown, Row, Col, Tooltip } from "antd";
import React, { useMemo, useState, useEffect } from "react";
import { HLog } from "../../helpers";
import i18n, { languageKeys } from "../../i18n";
import style from "./configColumns.module.scss";

export const ConfigColumns = ({ getColumns = [], setColumns = () => {} }) => {
  // eslint-disable-next-line react-hooks/exhaustive-deps
  const initColumns = useMemo(() => getColumns, []);
  const [unCheckedColumns, setUnCheckedColumns] = useState([]); // danh sách column ẩn đi
  const [daKiemTraUnViewer, setDaKiemTraUnViewer] = useState(false); //biến kiểm tra đã check các trường unviewer hay chưa
  // Hàm trả lại array những column không check cho checkbox
  const UncheckedColumns = (columns = []) => {
    let newUnCheckedColumns = [];
    for(let i = 0; i < columns.length; i++){
      if(columns[i] && columns[i].unViewer) {
        newUnCheckedColumns.push(columns[i].key);
      }
    }
    return newUnCheckedColumns;
  }

  // Hàm set lại columns table khi config lại
  const CheckedColumns = () => {
    let newCheckedColumns = [];
    for(let i = 0; i < initColumns.length; i++){
      if(initColumns[i] && !initColumns[i].unViewer) {
        newCheckedColumns.push(initColumns[i]);
      }
    }
    return newCheckedColumns;
  }

  //hàm xử lí bỏ check các cột không cần check khi vào lần đầu
  useEffect(() => {
    if(unCheckedColumns.length > 0 || daKiemTraUnViewer) { //nếu trước đó đã check điều kiện bên dưới rồi thì bỏ qua lần sau, vì initColumns sẽ set nhiều lần
      return;
    }
    HLog("ConfigColumns useEffect newUnCheckedColumns: ", UncheckedColumns(getColumns))
    setUnCheckedColumns(UncheckedColumns(getColumns));
    setDaKiemTraUnViewer(true);
  }, [getColumns]);

  const handleChange = (e, col) => {
    let copyColumns = unCheckedColumns;
    const findChildren = initColumns.find(item => item.parentKey === col.key)
    if (e.target.checked) { // khi check
      copyColumns = copyColumns.filter((id) => {
        return id !== e.target.id && id !== findChildren?.key;
      });
    } else if (!e.target.checked && unCheckedColumns.length < initColumns.length - 1) { // bỏ check
      copyColumns.push(e.target.id);
      if (findChildren) {
        copyColumns.push(findChildren.key)
      }
    } else {
      return;
    }

    let filtered = initColumns;
    filtered = filtered.filter(
      (column) => !copyColumns.some((id) => id === column.key)
    );

    setUnCheckedColumns(copyColumns);
    setColumns(filtered);
  };

  const handleClickReset = () => {
    setColumns(CheckedColumns());
    setUnCheckedColumns(UncheckedColumns(initColumns));
  };

  return (
    <Dropdown
      trigger="click"
      menu={
        <>
          <div className={style["popup-wrapper"]}>
            <div className={style["label"]}>Tùy chỉnh cột</div>

            <Row className={style["popup-checkbox"]}>
              {initColumns.map((column) => {
                const id = column.key;
                if (!column.parentKey) {
                  return (
                    <Col className={style["item"]} key={id} span={12}>
                      <Checkbox
                        checked={!unCheckedColumns.some((_id) => _id === id)}
                        id={id}
                        onChange={(e) => handleChange(e, column)}
                        disabled={column.disabledCheckCol}
                      >
                        {column.title}
                      </Checkbox>
                    </Col>
                  );
                }
              })}
            </Row>
            <Row align="middle" justify="start" className={style["button-row"]}>
              <Button
                type="primary"
                ghost
                className={style["button"]}
                onClick={handleClickReset}
              >
                {i18n.t(languageKeys.common_cai_dat_lai)}
              </Button>
            </Row>
          </div>
        </>
      }
      overlayClassName={style["popup"]}
    >
      <Tooltip placement="topLeft" title={i18n.t(languageKeys.tip_chinh_sua_cot)}>
        <Button
          type="primary"
          icon={<UnorderedListOutlined style={{ color: "#fff" }} />}
        ></Button>
      </Tooltip>
    </Dropdown>
  );
};
