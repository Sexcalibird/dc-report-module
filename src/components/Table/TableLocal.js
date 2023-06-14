import { Button, Col, Row, Table as TableAntd, Tooltip } from "antd";
import table from "./table.module.scss";
import cn from "classnames";
import { HLog } from "../../helpers";
import { LeftOutlined, RightOutlined } from "@ant-design/icons";
import i18n, { languageKeys } from "../../i18n";

const Table = ({
  columns = [], // Danh sách cột
  dataSource = [], // Danh sách bản ghi (đã add key)
  loading = false, // Loading khi cập nhật danh sách dữ liệu
  onClickRow, // Hàm xử lý khi bấm vào dòng bản ghi
  onSelectRows, // Hàm xử lý khi tích chọn (nhiều) dòng
  selectedRows = [], // Danh sách các dòng đã được tích chọn
  className,
  //   showPagination = false,
  pagination = false,
  currentPage = 0,
  totalResult = 0,
  limit = 0,
  onNext = () => {},
  onPrev = () => {},
  rowPropsConfig = () => {},
  sizeTable = "small",
  showGap = true,
  classRow = false,
  pointingRow = false,
  pointingIndex = -1,
  classnameRow = () => {},
  showPagination,
  classnameTable,
  ...props
}) => {
  const onRow = (record) => ({
    onClick: () => {
      HLog("Click table row", record);
      !!onClickRow && onClickRow(record);
    },
  });
  // HLog("CLASS NAME ROW",!!onClickRow ? (table["clickable"]): (!!classRow ? (record)=>classnameRow(record) : ""))
  return (
    <div className={className}>
      <TableAntd
        {...props}
        // size="small"
        className={cn(
          table["container"],
          dataSource.length === 1 && table["only-one"],
          showGap && table["show-gap"],
          classnameTable && classnameTable
        )}
        size={sizeTable}
        columns={columns}
        dataSource={dataSource}
        pagination={pagination}
        loading={loading}
        onRow={onRow}
        rowClassName={(record, index) =>
          !!onClickRow
            ? cn(table["clickable"], pointingRow && index === pointingIndex ? table["row-hover"] : "")
            : !!classRow
            ? (record) => classnameRow(record)
            : ""
        }
        rowSelection={
          !!onSelectRows
            ? {
                onChange: (_, rows) => {
                  HLog("Select rows", rows);
                  onSelectRows(rows);
                },
                checkStrictly: false,
                selectedRowKeys: selectedRows.map((row) => row.key),
                getCheckboxProps: rowPropsConfig,
              }
            : props.rowSelection
        }
      />

      {showPagination && (
        <Row align="middle" className={table["pagination"]} justify="end">
          <Col className={table["text"]}>
            {totalResult > limit
              ? `${1 + (currentPage - 1) * limit} ${
                  1 + (currentPage - 1) * limit !==
                  (currentPage * limit < totalResult
                    ? currentPage * limit
                    : totalResult)
                    ? `- ${
                        currentPage * limit < totalResult
                          ? currentPage * limit
                          : totalResult
                      }`
                    : ""
                } ${i18n.t(languageKeys.common_trong)} ${totalResult}`
              : `${totalResult} ${i18n.t(languageKeys.field_Ket_qua)}`}
          </Col>

          <Col style={{ marginRight: 5 }}>
            <Tooltip placement="topLeft" title={i18n.t(languageKeys.tip_trang_sau)}>
              <Button
                icon={<LeftOutlined />}
                onClick={onPrev}
                disabled={totalResult > 0 ? currentPage <= 1 : true}
                className={table["button"]}
              ></Button>
            </Tooltip>
          </Col>

          <Col>
          <Tooltip placement="topLeft" title={i18n.t(languageKeys.tip_trang_ke_tiep)}>
            <Button
              icon={<RightOutlined />}
              onClick={onNext}
              disabled={
                totalResult > 0 ? currentPage * limit >= totalResult : true
              }
              className={table["button"]}
            ></Button>
          </Tooltip>
          </Col>
        </Row>
      )}
    </div>
  );
};

export default Table;
