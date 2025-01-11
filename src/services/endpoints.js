export const API_ENDPOINTS = {
    AUTH: {
        LOGIN: 'login',
        REGISTER: '/auth/register',
    },
    USER: {
        PROFILE: '/user/profile',
    },
    TRANSACTIONS: {
        LIST: '/transactions',
        CREATE: '/transactions',
        DELETE: (id) => `/transactions/${id}`,
    },
}; 