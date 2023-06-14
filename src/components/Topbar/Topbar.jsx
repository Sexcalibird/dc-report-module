import topbar from "./topbar.module.scss";
import Icon, {PrinterOutlined} from "@ant-design/icons";
import cn from "classnames";
import {Button, Input, Layout, Popover, Select, Tooltip, Typography} from "antd";
import i18n, { languageKeys } from "../../i18n";
import { PlusOutlined, SearchOutlined, ReloadOutlined } from "@ant-design/icons";
import {DeleteGray, Export, ExportExcel, FileDownload, Import} from "../../assets/svg/index.js";
import { ConfigColumns } from "../ConfigColumns/ConfigColumns.jsx";

const Topbar = ({
  title, // tiêu đề của topbar
  onSearch, // hàm tìm kiếm
  onAdd, // hàm thêm mới
  totalNum, // độ lớn tập dữ liệu
  searchString = "", // Text tìm kiếm
  setSearchString = () => {}, // Hàm set Text tìm kiếm
  onImport, // Hàm xử lý import
  onExport, // Hàm xử lý export
  addOnActions, // component add thêm vào phần sau của topbar
  className,
  showImportExport = true,
  onSetting, // hàm chỉnh sửa cài đặt
  textSetting,
  addBtnText,
  showTotalNum = true,
  activeResponsive = false,
  onDownloadTemplate,
  showColumns = false,
  getColumns = [],
  setColumns = () => {},
  onAddStyle = {},
  disabled = false,
  defaultColumns = [],
  disabledAddBtn = false,
  deleteMultiple = false,
  onDeleteMultiple = () => {},
  deleteDisable = true,
  onReload,
  disabledReloadBtn = false,
  deleteTip = i18n.t(languageKeys.tip_xoa_ban_ghi),
  upLoadTip = i18n.t(languageKeys.tip_tai_len),
  downloadTip = i18n.t(languageKeys.tip_tai_xuong),
  uploadTempTip = i18n.t(languageKeys.tip_tai_xuong_ban_mau),
  multipleDeleteTip = i18n.t(languageKeys.tip_xoa_nhieu),
  templateInfo,
  disabledExport = false,
  ...props
}) => {
  return (
    <Layout.Header {...props} className={cn(topbar["container"], disabled && topbar["visible"], className)}>
      {/* ====== Tiêu đề Topbar + Tổng số dữ liệu + Component(s) Add-on ====== */}
      {typeof title === "string" ? (
        <div className={topbar["title"]}>
          <h3>{title}</h3>
          {showTotalNum && <div className={topbar["total-num"]}>{totalNum}</div>}
          <Select/>
        </div>
      ) : (
        <div style={{ flex: 1 }}>{title}</div>
      )}

      {/* =================== Thanh tìm kiếm =================== */}
      <div className={topbar["actions"]} style={onAddStyle}>
        {!!onSearch && (
          <>
            <Input
              className={cn(topbar["search"], activeResponsive && topbar["search-responsive"])}
              placeholder={i18n.t(languageKeys.common_Tim_kiem)}
              prefix={<SearchOutlined className={topbar["icon"]} />}
              onChange={(e) => {
                const { value } = e.target;

                setSearchString(value);
              }}
              onPressEnter={() => onSearch()}
              value={searchString}
              allowClear
            />

            {activeResponsive && (
              <div className={topbar["searchbar-responsive"]}>
                <Popover
                  content={
                    <Input
                      prefix={<SearchOutlined className={topbar["blue-icon"]} />}
                      value={searchString}
                      onChange={(e) => setSearchString(e.target.value)}
                      onPressEnter={() => onSearch()}
                      placeholder={i18n.t(languageKeys.common_Tim_kiem)}
                    />
                  }
                  placement="bottomRight"
                >
                  <Button type="primary" ghost icon={<SearchOutlined className={topbar["blue-icon"]} />}></Button>
                </Popover>
              </div>
            )}
          </>
        )}

        {!!addOnActions && addOnActions}

        {/*/!* =================== Nút thêm mới =================== *!/*/}
        {/*{!!onSetting && (*/}
        {/*  <Button className={topbar["add-btn"]} type="primary" onClick={onSetting}>*/}
        {/*    {textSetting}*/}
        {/*  </Button>*/}
        {/*)}*/}

        {/*{!!onReload && (*/}
        {/*  <Button*/}
        {/*    className={topbar["add-btn"]}*/}
        {/*    icon={<ReloadOutlined style={{ color: "#FFF" }} />}*/}
        {/*    type="primary"*/}
        {/*    onClick={() => onReload()}*/}
        {/*    disabled={disabledReloadBtn}*/}
        {/*  >*/}
        {/*    {i18n.t(languageKeys.common_tai_lai)}*/}
        {/*  </Button>*/}
        {/*)}*/}

        {/*{deleteMultiple && (*/}
        {/*  <Tooltip placement="topLeft" title={multipleDeleteTip}>*/}
        {/*    <Button*/}
        {/*      icon={<DeleteGray style={{ width: 16, height: 16, marginTop: 5 }} />}*/}
        {/*      onClick={() => onDeleteMultiple()}*/}
        {/*      disabled={deleteDisable}*/}
        {/*    ></Button>*/}
        {/*  </Tooltip>*/}
        {/*)}*/}

        {/*{showImportExport && !!onExport && (*/}
        {/*  <Tooltip placement="topLeft" title={disabledExport ? i18n.t(languageKeys.noPermission) : downloadTip}>*/}
        {/*    <Button disabled={disabledExport} icon={<Import style={{ width: 15, height: 15, marginTop: 5 }} />} onClick={() => onExport()}></Button>*/}
        {/*  </Tooltip>*/}
        {/*)}*/}

        {/*{showImportExport && !!onImport && (*/}
        {/*  <Tooltip placement="topLeft" title={upLoadTip}>*/}
        {/*    <Button icon={<Export style={{ width: 16, height: 16, marginTop: 5 }} />} onClick={() => onImport()}></Button>*/}
        {/*  </Tooltip>*/}
        {/*)}*/}

        {/*{showImportExport && !!templateInfo && (*/}
        {/*  <a href={templateInfo?.filePath} target="_blank" rel="noopener noreferrer" download={templateInfo?.fileName}>*/}
        {/*    <Tooltip placement="topLeft" title={uploadTempTip}>*/}
        {/*      <Button icon={<Icon component={FileDownload} style={{ color: "#999", fontSize: 18 }} />} style={{ marginTop: 13 }}></Button>*/}
        {/*    </Tooltip>*/}
        {/*  </a>*/}
        {/*)}*/}

        {/*{!!onAdd && (*/}
        {/*  <Tooltip*/}
        {/*    placement="topLeft"*/}
        {/*    title={*/}
        {/*      disabledAddBtn*/}
        {/*        ? i18n.t(languageKeys.noPermission)*/}
        {/*        : !!addBtnText*/}
        {/*        ? addBtnText*/}
        {/*        : i18n.t(languageKeys.common_Them_moi)*/}
        {/*    }*/}
        {/*  >*/}
        {/*    <Button className={topbar["add-btn"]} icon={<PlusOutlined />} type="primary" onClick={() => onAdd()} disabled={disabledAddBtn}>*/}
        {/*      {!!addBtnText ? addBtnText : i18n.t(languageKeys.common_Them_moi)}*/}
        {/*    </Button>*/}
        {/*  </Tooltip>*/}
        {/*)}*/}

        <Button className={topbar["add-btn"]} icon={<PrinterOutlined />} type="primary" onClick={() => onImport()}>
          {i18n.t(languageKeys.in_bao_cao)}
        </Button>

        <Button className={topbar["add-btn"]} icon={<ExportExcel />} type="primary" onClick={() => onExport()}>
          {i18n.t(languageKeys.button_Xuat_excel)}
        </Button>

        {!!showColumns && (
          <Tooltip placement="topLeft" title={i18n.t(languageKeys.tip_chinh_sua_cot)}>
            <ConfigColumns getColumns={getColumns} setColumns={setColumns} />
          </Tooltip>
        )}
      </div>
    </Layout.Header>
  );
};

export default Topbar;
