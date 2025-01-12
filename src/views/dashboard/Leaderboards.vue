<template>
  <div class="leaderboards-container p-3 sm:p-4 md:p-6 bg-gray-100 min-h-screen">
    <div class="max-w-6xl mx-auto">
      <!-- My Position Banner -->
      <div class="bg-white p-3 sm:p-4 rounded-lg shadow-md mb-4 sm:mb-6">
        <h3 class="text-base sm:text-lg font-medium mb-1 sm:mb-2">My position:</h3>
        <p class="text-xl sm:text-2xl font-bold">15/500</p>
      </div>

      <div class="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-4 sm:mb-6 gap-2">
        <!-- <div>
          <h2 class="text-lg sm:text-xl md:text-2xl font-bold">JANUARY OVERALL RANKINGS</h2>
        </div> -->
        <!-- <button class="text-gray-600 hover:text-gray-800 flex items-center gap-1">
          Filter <span class="text-lg">⌄</span>
        </button> -->
      </div>

      <!-- Top 3 Winners Cards -->
      <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3 sm:gap-4 md:gap-6 mb-6 sm:mb-8">
        <!-- Second Place -->
        <div class="transform md:translate-y-4 order-2 sm:order-1">
          <div class="leaderboard-card bg-white p-3 sm:p-4 rounded-lg shadow-md hover:shadow-lg transition-all duration-300 border-2 border-gray-200">
            <div class="flex flex-col items-center">
              <div class="avatar-container mb-2 sm:mb-3">
                <img src="@/assets/bearOne.jpg" alt="2nd Place" class="w-16 sm:w-20 h-16 sm:h-20 rounded-full border-4 border-gray-300" />
                <span class="badge">🥈</span>
              </div>
              <h3 class="font-bold text-base sm:text-lg">249BanOn</h3>
              <p class="text-gray-600 text-sm sm:text-base">1153 points</p>
            </div>
          </div>
        </div>

        <!-- First Place -->
        <div class="transform md:-translate-y-4 order-1 sm:order-2">
          <div class="leaderboard-card bg-white p-3 sm:p-4 rounded-lg shadow-md hover:shadow-lg transition-all duration-300 border-2 border-yellow-300">
            <div class="flex flex-col items-center">
              <div class="avatar-container mb-2 sm:mb-3">
                <img src="@/assets/bearTwo.jpg" alt="1st Place" class="w-20 sm:w-24 h-20 sm:h-24 rounded-full border-4 border-yellow-400" />
                <span class="badge">🥇</span>
              </div>
              <h3 class="font-bold text-lg sm:text-xl">OCapital</h3>
              <p class="text-gray-600 text-sm sm:text-base">1172 points</p>
            </div>
          </div>
        </div>

        <!-- Third Place -->
        <div class="transform md:translate-y-8 order-3 mb-2">
          <div class="leaderboard-card bg-white p-3 sm:p-4 rounded-lg shadow-md hover:shadow-lg transition-all duration-300 border-2 border-orange-200">
            <div class="flex flex-col items-center">
              <div class="avatar-container mb-2 sm:mb-3">
                <img src="@/assets/blackbear.jpg" alt="3rd Place" class="w-16 sm:w-20 h-16 sm:h-20 rounded-full border-4 border-orange-300" />
                <span class="badge">🥉</span>
              </div>
              <h3 class="font-bold text-base sm:text-lg">frenchmeerkat</h3>
              <p class="text-gray-600 text-sm sm:text-base">383 points</p>
            </div>
          </div>
        </div>
      </div>

      <!-- Rankings Table -->
      <div>
          <p class="text-lg sm:text-base md:text-base my-2 text-orange-600">JANUARY OVERALL RANKINGS</p>
        </div>
      <div class="bg-white rounded-lg shadow-md overflow-hidden mt-4">
        <div class="overflow-x-auto">
          <table class="w-full min-w-[320px] sm:min-w-[600px]">
            <thead class="bg-orange-600 text-white">
              <tr>
                <th class="px-2 sm:px-4 py-2 sm:py-3 text-left text-xs sm:text-sm font-medium w-12 sm:w-20">Rank</th>
                <th class="px-2 sm:px-4 py-2 sm:py-3 text-left text-xs sm:text-sm font-medium">Username</th>
                <th class="px-2 sm:px-4 py-2 sm:py-3 text-right text-xs sm:text-sm font-medium">Points</th>
                <th class="px-2 sm:px-4 py-2 sm:py-3 text-right text-xs sm:text-sm font-medium">Rewards</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="user in leaderboardData" :key="user.rank" 
                  :class="['border-t border-gray-200 hover:bg-gray-50 transition-colors duration-200',
                          {'bg-yellow-50': user.rank === 1},
                          {'bg-gray-50': user.rank === 2},
                          {'bg-orange-50': user.rank === 3}]">
                <td class="px-2 sm:px-4 py-2 sm:py-3 text-xs sm:text-sm font-medium">{{ user.rank }}</td>
                <td class="px-2 sm:px-4 py-2 sm:py-3">
                  <div class="flex items-center gap-2 sm:gap-3">
                    <span class="font-medium text-xs sm:text-sm">{{ user.username }}</span>
                    <span v-if="user.badge" class="text-yellow-500 text-sm sm:text-base">{{ user.badge }}</span>
                  </div>
                </td>
                <td class="px-2 sm:px-4 py-2 sm:py-3 text-right text-xs sm:text-sm">{{ user.points }}</td>
                <td class="px-2 sm:px-4 py-2 sm:py-3 text-right text-xs sm:text-sm text-orange-600">{{ user.rewards }}</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'

const leaderboardData = ref([
  { rank: 1, username: 'ChiefCode99', points: '14,500', badge: '👑', rewards: '500 GTC' },
  { rank: 2, username: 'AminaSky23', points: '13,820', badge: '👑', rewards: '400 GTC' },
  { rank: 3, username: 'OluwaSparkx', points: '13,150', badge: '👑', rewards: '300 GTC' },
  { rank: 4, username: 'ZainabFlow7', points: '12,470', rewards: '200 GTC' },
  { rank: 5, username: 'TundeTrekker', points: '11,790', rewards: '200 GTC' },
  { rank: 6, username: 'ChiomaPixel', points: '11,110', rewards: '100 GTC' },
  { rank: 7, username: 'EmekaCzh42', points: '10,430', rewards: '100 GTC' },
  { rank: 8, username: 'FunmiFrost11', points: '9,750', rewards: '100 GTC' },
  { rank: 9, username: 'KolaQuantum', points: '9,070', rewards: '100 GTC' },
  { rank: 10, username: 'NinaNova88', points: '8,390', rewards: '100 GTC' },
  { rank: 11, username: 'NeoNigerianX', points: '7,710', rewards: '-' },
  { rank: 12, username: 'LagosLynx22', points: '7,030', rewards: '-' },
  { rank: 13, username: 'AfroRise99', points: '6,350', rewards: '-' },
  { rank: 14, username: 'SadeSolar5', points: '5,670', rewards: '-' },
  { rank: 15, username: 'User', points: '4,990', rewards: '-' },
  { rank: 16, username: 'YemiYonder77', points: '4,310', rewards: '-' },
  { rank: 17, username: 'NaijaNinja7', points: '4,210', rewards: '-' },
  { rank: 18, username: 'GidiGlow33', points: '3,630', rewards: '-' },
  { rank: 19, username: 'ZumaZen44', points: '3,580', rewards: '-' },
  { rank: 20, username: 'PulsePioneer', points: '3,550', rewards: '-' },
  { rank: 21, username: 'EkoEagle11', points: '3,230', rewards: '-' }
])
</script>

<style scoped>
.avatar-container {
  position: relative;
  display: inline-block;
}

.badge {
  position: absolute;
  bottom: -5px;
  right: -5px;
  font-size: 1.25rem;
  @media (min-width: 640px) {
    font-size: 1.5rem;
  }
}

.leaderboard-card {
  transform-origin: center;
  animation: cardAppear 0.5s ease-out forwards;
  opacity: 0;
  height: 100%;
}

@keyframes cardAppear {
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

/* Apply animation delay to cards */
.leaderboard-card:nth-child(1) {
  animation-delay: 0.2s;
}

.leaderboard-card:nth-child(2) {
  animation-delay: 0s;
}

.leaderboard-card:nth-child(3) {
  animation-delay: 0.4s;
}

/* Hover effects */
@media (min-width: 768px) {
  .leaderboard-card:hover {
    transform: translateY(-5px);
  }
}

/* Table styles */
.table-container {
  overflow-x: auto;
  -webkit-overflow-scrolling: touch;
  scrollbar-width: thin;
  scrollbar-color: rgba(0, 0, 0, 0.2) transparent;
}

.table-container::-webkit-scrollbar {
  height: 6px;
}

.table-container::-webkit-scrollbar-track {
  background: transparent;
}

.table-container::-webkit-scrollbar-thumb {
  background-color: rgba(0, 0, 0, 0.2);
  border-radius: 3px;
}

/* Responsive card layout */
@media (max-width: 768px) {
  .transform.md\:translate-y-4,
  .transform.md\:-translate-y-4,
  .transform.md\:translate-y-8 {
    transform: none;
  }
  
  .leaderboard-card {
    margin-bottom: 0.75rem;
  }
}

/* Top 3 highlighting */
tr:nth-child(-n+3) {
  font-weight: 600;
}

tr:nth-child(1) td {
  color: #FFD700;
}

tr:nth-child(2) td {
  color: #C0C0C0;
}

tr:nth-child(3) td {
  color: #CD7F32;
}

@media (max-width: 640px) {
  .icon-circle {
    width: 28px;
    height: 28px;
  }
}
</style>