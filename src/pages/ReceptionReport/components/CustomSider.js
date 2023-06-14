import { memo, useEffect, useRef, useState } from "react";
import { useSelector } from "react-redux";
import { SearchOutlined } from "@ant-design/icons";
import { Button, Input, Layout, notification, Select, Space } from "antd";
import { ComplexDatePicker } from "../../../../components";
import i18n, { languageKeys, languages } from "../../../../i18n";
import sider from "./style.module.less";
import { common_post, HLog } from "../../../../helpers";
import { apis, keys } from "../../../../constants";
import { lsDoiTuong } from "../../../QuanLyTiepDon/fieldsTiepDon";

import { statusList, paidStatus } from "../../../QuanLyTiepDon/columnsTiepDon";
import { TreeSelect } from "../../../../components_v2";
import { useEventListener } from "../../../../hooks";

function CustomSider({
  onFilterTime = () => {},
  onFilter = () => {},
  setSearchString = () => {},
  resetField = () => {},
  onAutoSearch = () => {},
  defaultDate = [],
  doiTuong,
  setReception,
  setTenReception = () => {},
  setDoiTuong,
  searchString,
  filterOption,
  reception,
  department,
  setDepartment,
  setTenDepartment,

  status,
  setStatus,
  paid,
  setPaid,
  handleSelect,
  handleDeSelect,
}) {
  const datePickerRef = useRef();
  const { Option } = Select;
  const [dsUser, setDsUser] = useState([]);
  const [dsKhoa, setDsKhoa] = useState([]);
  const [date, setDate] = useState(i18n.t(languageKeys.common_Hom_nay));
  const userProfile = useSelector((state) => state.auth.user);
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    layDsNhanSu();
    layDsKhoa();
    // return () => {
    //   setDsUser()
    //   setDsKhoa()
    //  }
  }, []);
  //format ngày
  const customFormat = (value) => {
    return i18n.language === languages.tieng_viet ? `${value.format("DD/MM/YYYY")}` : value.format("LL");
  };

  //hàm filter đối tượng
  const handleChangeDoiTuong = (value) => {
    setDoiTuong(value);
  };

  // reset bộ lọc
  const onResetFilter = () => {
    datePickerRef.current?.reset();
    setDate(i18n.t(languageKeys.common_Hom_nay));
    handleChangeDoiTuong(lsDoiTuong[0].ma_dt);
    resetField();
  };

  // api lấy danh sách người tiếp đón
  const layDsNhanSu = async (search_string = "") => {
    setLoading(true);
    let req = {
      partner_code: userProfile.partner_code,
      BENH_VIEN_ID: userProfile.BENH_VIEN_ID,
      search_string,
      limit: keys.limit,
      //  page,
    };
    try {
      let res = await common_post(apis.dm_lay_ds_user, req, false);
      if (!!res && res.status === "OK") {
        let { result } = res;
        setDsUser(result);
      } else {
        notification.error({
          message: i18n.t(languageKeys.noti_lay_ds_nguoi_tiep_don_fail),
          placement: "bottomLeft",
        });
      }
    } catch (error) {
      HLog("LAYDS NGUOI TIEP DON FAIL", error);
    }
    setLoading(false);
  };

  const layDsKhoa = async (search_string = "") => {
    setLoading(true);
    let req = {
      partner_code: userProfile.partner_code,
      BENH_VIEN_ID: userProfile.BENH_VIEN_ID,
      search_string,
      LOAI_KHOA: "",
      LOAI_TRU: "",
      page: 1,
      limit: keys.limit,
    };
    try {
      let res = await common_post(apis.dm_khoa_lay_ds, req, false);
      if (!!res && res.status === "OK") {
        let { result } = res;
        setDsKhoa(result);
      }
    } catch (error) {
      HLog("LAYDS KHOA FAIL", error);
    }
    setLoading(false);
  };

  //
  const searchRef = useRef();
  const keydownEvent = (event) => {
    if (event.key === "F4") {
      event.stopPropagation();
      event.preventDefault();
      searchRef.current?.focus();
    }
  };
  useEventListener("keydown", keydownEvent, window.document, true);

  const searchBN = () => {
    onFilter(
      { sxKey: filterOption },
      {
        search_string: searchString,
        TU: null,
        DEN: null,
        filter_doi_tuong_benh_nhan: "",
        filter_nguoi_tiep_don: "",
        filter_thanh_toan: "",
        filter_trang_thai: [],
      }
    );
  };

  /*const layDsBenhNhan = async (search_string = "") => {
    setLoading(true);
    let req = {
      partner_code: userProfile.partner_code,
      BENH_VIEN_ID: userProfile.BENH_VIEN_ID,
      search_string,
      LOAI_KHOA: "",
      LOAI_TRU: "",
      page: 1,
      limit: keys.limit,
    };
    try {
      let res = await common_post(apis.tiep_don_ds_benh_nhan, req, false);
      if (!!res && res.status === "OK") {
        let { result } = res;
        setDsPatient(result);
      }
    } catch (error) {
      HLog("LAYDS DS BENH NHAN FAIL", error);
    }
    setLoading(false);
  };*/

  return (
    <Layout.Sider theme="light" width={240} className={sider["container"]}>
      <div className={sider["sider-wrapper"]}>
        <Input
          ref={searchRef}
          prefix={<SearchOutlined style={{ color: "#4263eb" }} />}
          value={searchString}
          placeholder={i18n.t(languageKeys.field_Tim_kiem_benh_nhan) + " (F4)"}
          onChange={(e) => {
            setSearchString(e.target.value);
            !e.target.value && onFilter({}, "");
          }}
          onPressEnter={searchBN}
          allowClear
        />
      </div>
      {/* chọn thời gian filter */}
      <div className={sider["sider-wrapper"]}>
        <h4 className={sider["sider-title"]}>{i18n.t(languageKeys.label_Thoi_gian)}</h4>
        <ComplexDatePicker ref={datePickerRef} onChange={onFilterTime} />
      </div>
      <div className={sider["sider-wrapper"]}>
        <h4 className={sider["sider-title"]}>{i18n.t(languageKeys.khoa)}</h4>
        <Select
          style={{ width: "100%" }}
          placeholder={i18n.t(languageKeys.tat_ca)}
          onChange={(val) => {
            setDepartment(val);
            setTenDepartment(dsKhoa[dsKhoa.map((item) => item.ID).indexOf(val)]);
          }}
          dropdownClassName={sider["select-custom"]}
          value={department}
          allowClear
        >
          {dsKhoa?.map((item) => (
            <Option key={item.ID}>
              <span>{item.TEN_KHOA_PHONG}</span>
            </Option>
          ))}
        </Select>
      </div>
      <div className={sider["sider-wrapper"]}>
        <h4 className={sider["sider-title"]}>{i18n.t(languageKeys.field_Nguoi_tiep_don)}</h4>
        <Select
          style={{ width: "100%" }}
          dropdownClassName={sider["select-custom"]}
          placeholder={i18n.t(languageKeys.tat_ca)}
          onChange={(val) => {
            setReception(val);
            setTenReception(dsUser[dsUser.map((item) => item.NHANSU_ID).indexOf(val)]);
          }}
          value={reception}
          allowClear
        >
          {dsUser?.map((item) => (
            <Option key={item.NHANSU_ID}>
              <span>{item.HO + " " + item.TEN}</span>
            </Option>
          ))}
        </Select>
      </div>
      <div className={sider["sider-wrapper"]}>
        <h4 className={sider["sider-title"]} style={{ marginBottom: "0px" }}>
          {i18n.t(languageKeys.field_Trang_thai_cuoc_hen)}
        </h4>
        {status?.length > 0 && (
          <span style={{ color: "#4263eb" }}>
            ( {i18n.t(languageKeys.txt_da_chon)}: {status.length} )
          </span>
        )}

        {/*<Select
            style={{width: "100%"}}
            dropdownClassName={sider["select-custom"]}
            placeholder={i18n.t(languageKeys.tat_ca)}
            onChange={(val) => setStatus([val])}
            options={statusList}
            value={status}
            allowClear
        />*/}
        <TreeSelect
          popupClassName={sider["treeSelect"]}
          dataSource={statusList}
          onSelect={handleSelect}
          onDeselect={handleDeSelect}
          onClear={() => setStatus([])}
          showArrow={false}
          placeholder={i18n.t(languageKeys.common_Chon)}
          listHeight={250}
          value={status}
          isParentUncheckable={false}
          checkedStrategy={TreeSelect.checkedStrategy.SHOW_PARENT}
        />
      </div>
      <div className={sider["sider-wrapper"]}>
        <h4 className={sider["sider-title"]}>{i18n.t(languageKeys.field_Trang_thai_thanh_toan)}</h4>
        <Select
          style={{ width: "100%" }}
          dropdownClassName={sider["select-custom"]}
          placeholder={i18n.t(languageKeys.tat_ca)}
          onChange={(val) => setPaid(val)}
          allowClear
          value={paid}
          options={paidStatus}
        />
        <Space className={sider["sider-btn--group"]} style={{ gap: 4 }}>
          <Button type="primary" ghost className={sider["sider-btn"]} onClick={onResetFilter}>
            {i18n.t(languageKeys.button_Cai_dat_lai)}
          </Button>
          <Button
            type="primary"
            className={sider["sider-btn"]}
            onClick={() => {
              onFilter({ sxKey: filterOption });
            }}
          >
            {i18n.t(languageKeys.common_Ap_dung)}
          </Button>
        </Space>
      </div>
    </Layout.Sider>
  );
}

export default memo(CustomSider);
