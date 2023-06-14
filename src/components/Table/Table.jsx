import { LeftOutlined, RightOutlined } from "@ant-design/icons";
import table from "./table.module.scss";
import { Table as AntdTable, Col, Row } from "antd";
import React from "react";
import i18n, { languageKeys } from "../../i18n";
import cn from "classnames";
import { HLog } from "../../helpers.js";

const PAGE_SIZE_OPTIONS = [20, 30, 40, 50];

export const Table = ({
  columns = [],
  dataSource = [],
  loading = false,
  className,
  size,
  bordered = false,
  totalResult = 0,
  currentPage = 1,
  header = {
    showHeader: false,
    title: undefined,
    actions: undefined,
    justify: undefined,
    suffixTitle: undefined,
  },
  rowKey,
  scroll = {},
  pagination = {
    showPagination: false,
    showSizeChanger: true,
    center: false,
    onChangePageSize: () => {},
    // total: 0,
    pageSize: 10,
  },
  onClickRow,
  onSelectRows,
  selectedRows = [],
  rowPropsConfig = () => {},
  rowClassName = () => {},
  onChangeSelected = () => {},
  rowSelection = {},
  isCheckAll = false,
  ...props
}) => {
  const itemRender = (_, type, originalElement) => {
    if (type === "prev") {
      return (
        <div className={table["navigateBtn"]} style={{ marginRight: 10 }}>
          <LeftOutlined />
          <span className="label">{i18n.t(languageKeys.tip_trang_sau)}</span>
        </div>
      );
    }

    if (type === "next") {
      return (
        <div className={table["navigateBtn"]} style={{ marginLeft: 10 }}>
          <span className="label">{i18n.t(languageKeys.tip_trang_ke_tiep)}</span> <RightOutlined />
        </div>
      );
    }

    return originalElement;
  };

  const onRow = (record) => ({
    onClick: () => {
      HLog("[INFO] Table click row", record);
      !!onClickRow && onClickRow(record);
    },
  });

  return (
    <AntdTable
      columns={columns}
      dataSource={dataSource}
      loading={loading}
      className={cn(
        table["styleTable"],
        pagination?.showPagination && pagination.center && table["stylePaginationCenter"],className
      )}
      size={size || "small"}
      bordered={bordered}
      rowKey={rowKey}
      title={
        header?.showHeader &&
        (() =>
          !!header.custom ? (
            header.custom
          ) : (
            <Row justify={header?.justify || "space-between"} align="middle">
              <Col>
                <Row align="middle" gutter={20}>
                  <Col>
                    <h2>{header?.title || "Title"}</h2>
                  </Col>

                  {!!header?.suffixTitle && <Col>{header.suffixTitle}</Col>}
                </Row>
              </Col>

              <Col>{header?.actions}</Col>
            </Row>
          ))
      }
      pagination={
        pagination.showPagination && {
          showSizeChanger: pagination?.showSizeChanger || true,
          itemRender,
          current: currentPage,
          total: totalResult,
          position: ["bottomRight"],
          locale: { items_per_page: "" },
          pageSizeOptions: PAGE_SIZE_OPTIONS,
          defaultPageSize: PAGE_SIZE_OPTIONS[0],
          ...pagination,
          onChange: pagination.onChangePageSize,
        }
      }
      scroll={scroll}
      rowSelection={
        !!onSelectRows
          ? {
              onChange: (_, rows) => {
                HLog("Select rows", rows);
                onSelectRows(rows);
              },
              checkStrictly: false,
              selectedRowKeys: selectedRows.map((row) => row.key || row[rowKey]),
              getCheckboxProps: rowPropsConfig,
              hideSelectAll: isCheckAll,
            }
          : props.rowSelection
      }
      onRow={onRow}
      rowClassName={rowClassName}
      {...props}
    />
  );
};
