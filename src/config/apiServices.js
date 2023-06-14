const apiServices = {
    enable_app_log: true, //ẩn, hiện log
  
    H247_BS_HIS: "https://cis-api.dev.deepcare.vn/", // api môi trường dev CIS
    H247_BS_LIS: "https://lis-api.dev.deepcare.vn/", // api môi trường dev LIS
    H247_EVENT_SOURCE: "https://api-broadcast.dev.deepcare.vn/", //api eventsource mt dev
  
    // GATEWAY
    GATEWAY_LIS: window.GATEWAY + "lis/",
    GATEWAY_CIS: window.GATEWAY + "cis/",
    GATEWAY_BROADCAST: window.GATEWAY + "broadcast/",
  
    // CLIENT
    URL_CIS: window.CIS_WEB_UI_URL,
    URL_LIS: window.LIS_WEB_UI_URL,
  
    //KEYCLOAK
    KEYCLOAK_CLIENT_ID: window.KEYCLOAK_CLIENT_ID,
    KEYCLOAK_URL: window.KEYCLOAK_URL,
    KEYCLOAK_REALM: window.KEYCLOAK_REALM
  
  };
  
  export default apiServices;
  