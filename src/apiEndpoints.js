
const BASE_URL = "http://192.168.18.158:3000/api"



export const endpoints = {

    LoginUser: `${BASE_URL}/auth/admin-login`,
    GetAdminAllUser: `${BASE_URL}/admin/users`,
    AdminEventBanner: `${BASE_URL}/event-banners/admin`,
    AdminAddTemple: `${BASE_URL}/temples/admin`,
    GetTempleDonations: `${BASE_URL}/admin/donations/temple-payments`,

    /** POST multipart — single file (image/video). Supports `?path=profiles` etc. */
    UploadMediaSingle: `${BASE_URL}/media/upload-single`,
    /** POST multipart — multiple files (images/videos). Supports `?path=profiles` etc. */
    UploadMediaMultiple: `${BASE_URL}/media/upload`,
}