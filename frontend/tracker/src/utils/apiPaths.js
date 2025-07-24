export const BASE_URL = "http://localhost:8000";

export const API_PATHS = {
    AUTH:{
        LOGIN:"http://localhost:8000/api/v1/auth/login",
        REGISTER:"http://localhost:8000/api/v1/auth/register",
        GET_USER_INFO:"http://localhost:8000/api/v1/auth/getUser",
    },
    DASHBOARD:{
        GET_DATA:"http://localhost:8000/api/v1/dashboard/get",
    },
    INCOME:{
      ADD_INCOME:"http://localhost:8000/api/v1/income/add",
      DELETE_INCOME:(id)=>`http://localhost:8000/api/v1/income/${id}`,
      GET_ALL_INCOME:"http://localhost:8000/api/v1/income/get",
      DOWNLOAD_INCOME:"http://localhost:8000/api/v1/income/downloadexcel"
    },
    EXPENSE:{
      ADD_EXPENSE:"http://localhost:8000/api/v1/expense/add",
      DELETE_EXPENSE:(id)=>`http://localhost:8000/api/v1/expense/${id}`,
      GET_ALL_EXPENSE:"http://localhost:8000/api/v1/expense/get",
      DOWNLOAD_EXPENSE:"http://localhost:8000/api/v1/expense/downloadexcel"
    },
    IMAGE:{
        UPLOAD_IMAGE:"/api/v1/auth/upload-image"
    }
}