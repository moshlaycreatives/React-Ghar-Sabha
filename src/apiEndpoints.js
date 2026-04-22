
// const BASE_URL = "http://192.168.18.158:3000/api"


const BASE_URL = "https://gharsabha.app/core/api"



export const endpoints = {

    LoginUser: `${BASE_URL}/auth/admin-login`,
    GetAdminAllUser: `${BASE_URL}/admin/users`,
    AdminEventBanner: `${BASE_URL}/event-banners/admin`,
    AdminAddTemple: `${BASE_URL}/admin/temples`,
    /** PATCH body: `{ inactive: boolean }` */
    AdminTempleInactive: (id) => `${BASE_URL}/admin/temples/${id}/inactive`,
    GetTempleDonations: `${BASE_URL}/admin/donations/temple-payments`,
    AdminCreateNewEvent: `${BASE_URL}/events/admin`,
    AdminDonations: `${BASE_URL}/admin/donations`,
    /** PATCH body: `{ inactive: boolean }` */
    AdminDonationInactive: (id) => `${BASE_URL}/admin/donations/${id}/inactive`,
    GetAllCountry: `${BASE_URL}/public/countries`,
    GetAllStates: `${BASE_URL}/public/states`,
    GetAllCity: `${BASE_URL}/public/cities`,
    GetAllDistricts: `${BASE_URL}/public/districts`,
    GetAllTehsils: `${BASE_URL}/public/tehsils`,
    CreateChatGroup: `${BASE_URL}/chat-groups/admin`,
    LiveStreamlink: `${BASE_URL}/admin/live-stream`,
    AdminSendMessage: `${BASE_URL}/messages/admin`,
    AdminDashboardAnalytics: `${BASE_URL}/admin/stats/donation-analytics`,
    CountryStatsDashboard: `${BASE_URL}/admin/stats/country-stats`,
    TopSupportStatsDashboard: `${BASE_URL}/admin/stats/top-supporters`,
    AllDashboardStats: `${BASE_URL}/admin/stats/dashboard`,
    GetAllNotification: `${BASE_URL}/admin/notifications`,
    MarkAllNotificationsRead: `${BASE_URL}/admin/notifications/read-all`,



    /** POST multipart — single file (image/video). Supports `?path=profiles` etc. */
    UploadMediaSingle: `${BASE_URL}/media/upload-single`,
    /** POST multipart — multiple files (images/videos). Supports `?path=profiles` etc. */
    UploadMediaMultiple: `${BASE_URL}/media/upload`,
}