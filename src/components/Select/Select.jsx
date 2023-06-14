import React from 'react';
import { CloseOutlined, PlusCircleOutlined } from "@ant-design/icons";
import { Col, Divider, Row, Select as SelectAntd, Space, Spin, Tag, TreeSelect } from "antd";
import select from "./select.module.scss";
import cn from "classnames";
import { rid } from "../../helpers";
import i18n, { languageKeys } from "../../i18n";
import { useRef, useState, useMemo, useEffect, forwardRef, useImperativeHandle } from "react";

/* Nếu muốn hiển thị thanh tìm kiếm thì hàm onSearch() phải được truyền giá trị vào, tương tự với thanh thêm mới cùng hàm onAdd() */

let Select = (
  {
    dataSource = [], // mảng danh sách các lựa chọn (dữ liệu trong mảng chưa được JSON.stringify)
    titleKey, // prop của option (là 1 object) dùng để hiển thị trên giao diện màn hình
    valueKey, // prop của option (là 1 object) dùng để lưu thành value của Select.Option
    onSearch, // hàm xử lý search data
    onAdd, // hàm xử lý add data mới
    onClickAdd,
    loading = false, // spin quay vòng khi load data vừa search
    multiple = false, // trường hợp lựa chọn nhiều
    className,
    customTitle,
    showSearch = false,
    disabled = false,
    onSelect,
    selectedList = [],
    setSelectedList = () => {},
    showTable = false,
    columnsTable = [],
    isOnlyValue = false,
    placeholder = i18n.t(languageKeys.common_Chon),
    filterOption = false,
    iconAdd,
    readOnly = false,
    textAdd,
    disableArrow = false,
    onPressEnter = () => {},
    disabledOption = () => false,
    setDataSource = () => {}, // hàm set state mảng danh sách lựa chọn
    setLoading = () => {}, // set trạng thái loading của lựa chọn
    apiCalls = () => {}, // hàm gọi api danh sách
    requestBody = {}, // request body của api
    responseData = {},
    reloadApi,
    setReloadApi = () => {},
    tagCount, // số lương tag count của treeSelect
    popupClassName,
    ...props
  },
  ref
) => {
  const select_ref = useRef();

  const [page, setPage] = useState(!!requestBody.page ? requestBody.page + 1 : 2); // set state thay đổi page của request body khi scroll xuống

  useImperativeHandle(ref, () => ({
    focus(data) {
      select_ref.current.focus(data);
    },
  }));

  const handleScroll = async (event) => {
    // function chạy khi scroll xuống, gọi lại api
    const target = event.target;
    if (!loading && target.scrollTop + target.offsetHeight === target.scrollHeight && page < responseData.total_page) {
      setLoading(true);
      console.log("load...");
      setPage((prevState) => prevState + 1);
      let response = await apiCalls({ ...requestBody, page: page });
      if (response) {
        target.scrollTo(0, target.scrollHeight);
        setDataSource((prevState) => prevState.concat(response.result));
      }
      setLoading(false);
    } else if (reloadApi === true) {
      setPage(!!requestBody.page ? requestBody.page + 1 : 2);
      console.log(page);
      setReloadApi(false);
    }
  };

  /* =====Custom component Dropdown khi bấm vào Select hoặc TreeSelect===== */
  const dropdownRender = (menu) => {
    return (
      <>
        {showTable && (
          <Row className={select["table-head"]}>
            {columnsTable.map((item) => (
              <Col key={rid()} span={8}>
                {item.title}
              </Col>
            ))}
          </Row>
        )}

        {/* =====Danh sách các options===== */}
        {/* Note: Với mỗi loại Select hoặc TreeSelect, menu sẽ được hiển thị ra khác nhau */}
        <Spin spinning={loading}>{menu}</Spin>

        {/* =====Nếu có hàm onAdd() thì mới hiển thị nút thêm mới===== */}
        {!!onAdd && (
          <>
            <Divider style={{ margin: "4px 0 0 0" }} />

            {/* =====Nút thêm mới===== */}
            <div className={select["add"]} onClick={!!onClickAdd ? onClickAdd : onAdd}>
              {iconAdd ? iconAdd : <PlusCircleOutlined className={select["icon"]} />}
              {textAdd ? textAdd : i18n.t(languageKeys.common_Them_moi)}
              {/* <PlusCircleOutlined className={select["icon"]} />
              {i18n.t(languageKeys.common_Them_moi)} */}
            </div>
          </>
        )}
      </>
    );
  };

  const TableRow = ({ item = {} }) => (
    <Row>
      {columnsTable.map((col) => (
        <Col key={rid()} span={8}>
          {item[col.dataIndex]}
        </Col>
      ))}
    </Row>
  );

  const handleEnter = (e) => {
    if (e.keyCode === 13) {
      onPressEnter(e.target.value);
      select_ref.current.blur();
    }
  };

  return !multiple ? (
    <SelectAntd
      {...props}
      ref={select_ref}
      className={cn(select["container"], showTable && select["select-dropdown-table"], className)}
      defaultValue={props.defaultValue}
      // onPopupScroll={handleScroll}
      popupClassName={cn(popupClassName, select["dropdown"])}
      dropdownRender={dropdownRender}
      showSearch={showSearch}
      //mode={multiple ? "multiple" : ""}
      // allowClear={multiple}
      // maxTagCount={0}
      showArrow={!disabled && !disableArrow}
      loading={loading}
      onSearch={onSearch}
      onSelect={onSelect}
      disabled={disabled || readOnly}
      placeholder={placeholder}
      filterOption={filterOption}
    >
      {/* =====Render danh sách các options===== */}
      {dataSource.map((item) => (
        <SelectAntd.Option
          key={rid()}
          value={isOnlyValue ? item : !!valueKey ? item[valueKey] : typeof item === "object" ? JSON.stringify(item) : item}
          disabled={disabledOption(item)}
        >
          {showTable ? <TableRow item={item} /> : isOnlyValue ? item : !!customTitle ? customTitle(item) : !!titleKey ? item[titleKey] : item}
        </SelectAntd.Option>
      ))}
    </SelectAntd>
  ) : (
    <>
      <TreeSelect
        {...props}
        ref={select_ref}
        treeCheckable="true"
        className={select["container-mul"]}
        popupClassName={select["dropdown"]}
        allowClear
        showArrow={!disabled}
        dropdownRender={dropdownRender}
        maxTagCount={!!tagCount ? tagCount : 0}
        disabled={disabled}
        showSearch={showSearch}
        onSearch={onSearch}
        placeholder={placeholder}
        onInputKeyDown={handleEnter}
        // loading={loading}
      >
        {/* =====Render danh sách các options===== */}
        {!!dataSource &&
          dataSource.map((item) => (
            <TreeSelect.TreeNode
              key={!!valueKey ? item[valueKey] : typeof item === "object" ? JSON.stringify(item) : item}
              value={!!valueKey ? item[valueKey] : typeof item === "object" ? JSON.stringify(item) : item}
              title={!!customTitle ? customTitle(item) : !!titleKey ? item[titleKey] : item}
            />
          ))}
      </TreeSelect>

      {selectedList.length > 0 && (
        <Row style={{ marginTop: 10 }} gutter={[0, 8]}>
          {selectedList.map((item) => {
            return (
              <Col key={rid()}>
                <Tag className={select["tag"]}>
                  <Space>
                    {!!customTitle ? customTitle(JSON.parse(item)) : !!titleKey && !!item ? JSON.parse(item)[titleKey] : item}

                    {!disabled && (
                      <CloseOutlined
                        style={{ marginRight: -3, cursor: "pointer" }}
                        onClick={() => {
                          // data và item chắc chắn ở dạng JSON.stringify
                          const filterArr = selectedList.filter((data) => data !== item);
                          setSelectedList(filterArr);
                        }}
                      />
                    )}
                  </Space>
                </Tag>
              </Col>
            );
          })}
        </Row>
      )}
    </>
  );
};

Select = forwardRef(Select);

export default Select;
