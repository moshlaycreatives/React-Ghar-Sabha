
const BASE_URL = "http://192.168.18.158:3000/api"

// const BASE_URL = "https://heterodox-stringy-pamella.ngrok-free.dev/api"



export const endpoints = {

    LoginUser: `${BASE_URL}/auth/admin-login`,
    GetAdminAllUser: `${BASE_URL}/admin/users`,
    AdminEventBanner: `${BASE_URL}/event-banners/admin`,
    AdminAddTemple: `${BASE_URL}/admin/temples`,
    GetTempleDonations: `${BASE_URL}/admin/donations/temple-payments`,
    AdminCreateNewEvent: `${BASE_URL}/events/admin`,
    AdminDonations: `${BASE_URL}/admin/donations`,
    GetAllCountry: `${BASE_URL}/public/countries`,
    GetAllStates: `${BASE_URL}/public/states`,
    GetAllCity: `${BASE_URL}/public/cities`,
    CreateChatGroup: `${BASE_URL}/chat-groups/admin`,
    LiveStreamlink: `${BASE_URL}/admin/live-stream`,

    /** POST multipart — single file (image/video). Supports `?path=profiles` etc. */
    UploadMediaSingle: `${BASE_URL}/media/upload-single`,
    /** POST multipart — multiple files (images/videos). Supports `?path=profiles` etc. */
    UploadMediaMultiple: `${BASE_URL}/media/upload`,
}