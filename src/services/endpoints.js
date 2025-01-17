export const API_ENDPOINTS = {
    AUTH: {
        LOGIN: 'login',
        REGISTER: '/auth/register'
    },
    QUEST: {
        GET_ALL: '/api/quests',
        CREATE: '/api/quests'
    },
    SAVE: {
        CREATE: 'api/personalsavings',
        get: '/api/quests',
        UPDATE: (savingId) => `api/personalsavings/${savingId}`,
        GET_ONE: (savingId) => `api/personalsavings/${savingId}`
    },
    ACHIEVEMENTS: {
        GET_ALL: 'api/achievements',
        UPDATE: (achievementId) => `/api/achievements/${achievementId}`,
        CREATE: '/api/achievements',
        GET_ONE: (achievementId) => `/api/achievements/${achievementId}`
    },
    USER_ACHIEVEMENTS: {
        ACTIVE: 'api/UserAchievements/active'
    },
    TRANSACTIONS: {
        GET_ALL: 'api/transactions'
    },
    REWARDS: {
        GET_ALL: '/api/rewards',
        GET_ONE: (rewardId) => `/api/rewards/${rewardId}`,
        CLAIM: (rewardId) => `/api/rewards/${rewardId}/claim`
    },
    MARKETPLACE: {
        GET_ALL: '/api/products',
        PURCHASE: (productId) => `api/products/${productId}/purchase`
    }
}; 