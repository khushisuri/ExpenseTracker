export const BASE_URL = import.meta.env.VITE_BASE_URL 

export const API_PATHS = {
    AUTH:{
        LOGIN:`${BASE_URL}/api/v1/auth/login`,
        REGISTER:`${BASE_URL}/api/v1/auth/register`,
        GET_USER_INFO:`${BASE_URL}/api/v1/auth/getUser`,
    },
    DASHBOARD:{
        GET_DATA:`${BASE_URL}/api/v1/dashboard/get`,
    },
    INCOME:{
      ADD_INCOME:`${BASE_URL}/api/v1/income/add`,
      DELETE_INCOME:(id)=>`${BASE_URL}/api/v1/income/${id}`,
      GET_ALL_INCOME:`${BASE_URL}/api/v1/income/get`,
      DOWNLOAD_INCOME:`${BASE_URL}/api/v1/income/downloadexcel`
    },
    EXPENSE:{
      ADD_EXPENSE:`${BASE_URL}/api/v1/expense/add`,
      DELETE_EXPENSE:(id)=>`${BASE_URL}/api/v1/expense/${id}`,
      GET_ALL_EXPENSE:`${BASE_URL}/api/v1/expense/get`,
      DOWNLOAD_EXPENSE:`${BASE_URL}/api/v1/expense/downloadexcel`
    },
    IMAGE:{
        UPLOAD_IMAGE:`/api/v1/auth/upload-image`
    }
}