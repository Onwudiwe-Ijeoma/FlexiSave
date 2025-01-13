<template>
  <div class="leaderboards-container p-4 md:p-8">
    <div class="max-w-6xl mx-auto">
      <!-- My Position Banner -->
      <div class="bg-gradient-to-r from-orange-500 to-orange-600 p-6 md:p-8 rounded-2xl shadow-lg mb-8 transform hover:scale-[1.02] transition-all duration-300">
        <div class="relative">
          <div class="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full -mr-16 -mt-16 blur-xl"></div>
          <h3 class="text-white/80 text-sm md:text-base font-medium mb-2">Current Ranking</h3>
          <div class="flex items-center justify-between">
            <div>
              <p class="text-3xl md:text-5xl font-bold text-white">{{ currentUserRank }}<span class="text-xl text-white/80">/{{ totalUsers }}</span></p>
              <p class="text-orange-100 text-sm mt-2">Top {{ Math.round((currentUserRank / totalUsers) * 100) }}% of all savers</p>
            </div>
            <div class="hidden md:block">
              <div class="bg-white/20 backdrop-blur-sm rounded-xl p-4">
                <div class="flex items-center gap-3">
                  <div class="w-12 h-12 rounded-xl bg-white/10 flex items-center justify-center">
                    <span class="text-2xl">🎯</span>
                  </div>
                  <div>
                    <p class="text-white font-medium">Next Milestone</p>
                    <p class="text-orange-100 text-sm">200 points to Top 10</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Top 3 Winners Cards -->
      <div class="relative mb-12">
        <div class="absolute inset-0 bg-gradient-to-b from-orange-100/20 to-transparent rounded-3xl -z-10"></div>
        <h3 class="text-2xl font-bold text-gray-800 mb-8 text-center">Top Performers</h3>
        <div class="grid grid-cols-1 sm:grid-cols-3 gap-6 md:gap-8 max-w-4xl mx-auto">
          <!-- Second Place -->
          <div class="transform md:translate-y-4">
            <div class="group bg-white p-6 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 border-2 border-gray-200">
              <div class="flex flex-col items-center">
                <div class="relative mb-4">
                  <div class="w-24 h-24 rounded-2xl overflow-hidden transform group-hover:scale-105 transition-transform duration-300">
                    <img src="@/assets/blackbear.jpg" alt="2nd Place" class="w-full h-full object-cover" />
                  </div>
                  <div class="absolute -bottom-3 -right-3 w-10 h-10 bg-gradient-to-br from-gray-200 to-gray-300 rounded-xl flex items-center justify-center shadow-lg">
                    <span class="text-xl">🥈</span>
                  </div>
                </div>
                <h3 class="font-bold text-xl mb-1">{{ secondPlace.name }}</h3>
                <p class="text-gray-600 mb-3">{{ secondPlace.totalPoints }} points</p>
                <div class="flex items-center gap-2 text-sm text-gray-500">
                  <svg class="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M10 2a6 6 0 00-6 6v3.586l-.707.707A1 1 0 004 14h12a1 1 0 00.707-1.707L16 11.586V8a6 6 0 00-6-6zM10 18a3 3 0 01-3-3h6a3 3 0 01-3 3z"/>
                  </svg>
                  Consistent Saver
                </div>
              </div>
            </div>
          </div>

          <!-- First Place -->
          <div class="transform -translate-y-4">
            <div class="group bg-gradient-to-b from-yellow-50 to-white p-6 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 border-2 border-yellow-300">
              <div class="flex flex-col items-center">
                <div class="relative mb-4">
                  <div class="w-28 h-28 rounded-2xl overflow-hidden transform group-hover:scale-105 transition-transform duration-300">
                    <img src="@/assets/brownbear.jpg" alt="1st Place" class="w-full h-full object-cover" />
                  </div>
                  <div class="absolute -bottom-3 -right-3 w-12 h-12 bg-gradient-to-br from-yellow-400 to-yellow-500 rounded-xl flex items-center justify-center shadow-lg animate-pulse">
                    <span class="text-2xl">👑</span>
                  </div>
                </div>
                <h3 class="font-bold text-2xl mb-1 bg-gradient-to-r from-yellow-600 to-yellow-800 bg-clip-text text-transparent">{{ firstPlace.name }}</h3>
                <p class="text-gray-600 mb-3">{{ firstPlace.totalPoints }} points</p>
                <div class="flex items-center gap-2 text-sm font-medium text-yellow-600">
                  <svg class="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                    <path fill-rule="evenodd" d="M5 2a1 1 0 011 1v1h1a1 1 0 010 2H6v1a1 1 0 01-2 0V6H3a1 1 0 010-2h1V3a1 1 0 011-1zm0 10a1 1 0 011 1v1h1a1 1 0 110 2H6v1a1 1 0 11-2 0v-1H3a1 1 0 110-2h1v-1a1 1 0 011-1zM12 2a1 1 0 01.967.744L14.146 7.2 17.5 9.134a1 1 0 010 1.732l-3.354 1.935-1.18 4.455a1 1 0 01-1.933 0L9.854 12.8 6.5 10.866a1 1 0 010-1.732l3.354-1.935 1.18-4.455A1 1 0 0112 2z" clip-rule="evenodd"/>
                  </svg>
                  Champion Saver
                </div>
              </div>
            </div>
          </div>

          <!-- Third Place -->
          <div class="transform md:translate-y-8">
            <div class="group bg-white p-6 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 border-2 border-orange-200">
              <div class="flex flex-col items-center">
                <div class="relative mb-4">
                  <div class="w-24 h-24 rounded-2xl overflow-hidden transform group-hover:scale-105 transition-transform duration-300">
                    <img src="@/assets/thirdplace.jpg" alt="3rd Place" class="w-full h-full object-cover" />
                  </div>
                  <div class="absolute -bottom-3 -right-3 w-10 h-10 bg-gradient-to-br from-orange-200 to-orange-300 rounded-xl flex items-center justify-center shadow-lg">
                    <span class="text-xl">🥉</span>
                  </div>
                </div>
                <h3 class="font-bold text-xl mb-1">{{ thirdPlace.name }}</h3>
                <p class="text-gray-600">{{ thirdPlace.totalPoints }} points</p>
                <div class="flex items-center gap-2 text-sm text-gray-500">
                  <svg class="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                    <path fill-rule="evenodd" d="M12.395 2.553a1 1 0 00-1.45-.385c-.345.23-.614.558-.822.88-.214.33-.403.713-.57 1.116-.334.804-.614 1.768-.84 2.734a31.365 31.365 0 00-.613 3.58 2.64 2.64 0 01-.945-1.067c-.328-.68-.398-1.534-.398-2.654A1 1 0 005.05 6.05 6.981 6.981 0 003 11a7 7 0 1011.95-4.95c-.592-.591-.98-.985-1.348-1.467-.363-.476-.724-1.063-1.207-2.03zM12.12 15.12A3 3 0 017 13s.879.5 2.5.5c0-1 .5-4 1.25-4.5.5 1 .786 1.293 1.371 1.879A2.99 2.99 0 0113 13a2.99 2.99 0 01-.879 2.121z" clip-rule="evenodd"/>
                  </svg>
                  Rising Star
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Rankings Table -->
      <div class="bg-white rounded-2xl shadow-lg overflow-hidden">
        <div class="bg-gradient-to-r from-orange-500 to-orange-600 p-6">
          <div class="flex justify-between items-center">
            <div>
              <h3 class="text-xl font-bold text-white">Monthly Rankings</h3>
              <p class="text-orange-100 text-sm">January 2024</p>
            </div>
            <div class="flex gap-2">
              <button class="bg-white/10 text-white px-4 py-2 rounded-lg hover:bg-white/20 transition-colors text-sm">
                Previous
              </button>
              <button class="bg-white text-orange-600 px-4 py-2 rounded-lg hover:bg-orange-50 transition-colors text-sm font-medium">
                This Month
              </button>
            </div>
          </div>
        </div>

        <div class="overflow-x-auto">
          <table class="w-full min-w-[600px]">
            <thead class="bg-orange-50">
              <tr>
                <th class="px-6 py-4 text-left text-sm font-semibold text-gray-600">Rank</th>
                <th class="px-6 py-4 text-left text-sm font-semibold text-gray-600">User</th>
                <th class="px-6 py-4 text-center text-sm font-semibold text-gray-600">Points</th>
                <th class="px-6 py-4 text-right text-sm font-semibold text-gray-600">Rewards</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="user in leaderboardData" :key="user.rank" 
                  class="group hover:bg-orange-50/50 transition-colors duration-200"
                  :class="{'bg-yellow-50/50': user.rank === 1, 'bg-gray-50/50': user.rank === 2, 'bg-orange-50/50': user.rank === 3}"
              >
                <td class="px-6 py-4">
                  <div class="flex items-center gap-2">
                    <span v-if="user.rank <= 3" class="w-8 h-8 rounded-lg flex items-center justify-center"
                          :class="{
                            'bg-yellow-100 text-yellow-700': user.rank === 1,
                            'bg-gray-100 text-gray-700': user.rank === 2,
                            'bg-orange-100 text-orange-700': user.rank === 3
                          }"
                    >
                      {{ user.rank }}
                    </span>
                    <span v-else class="w-8 h-8 rounded-lg bg-gray-50 flex items-center justify-center text-gray-600">
                      {{ user.rank }}
                    </span>
                  </div>
                </td>
                <td class="px-6 py-4">
                  <div class="flex items-center gap-3">
                    <span class="font-medium text-gray-900">{{ user.name }}</span>
                    <span v-if="user.badge" class="text-yellow-500">{{ user.badge }}</span>
                  </div>
                </td>
                <td class="px-6 py-4 text-center">
                  <span class="font-medium" :class="{
                    'text-yellow-600': user.rank === 1,
                    'text-gray-600': user.rank === 2,
                    'text-orange-600': user.rank === 3,
                    'text-gray-600': user.rank > 3
                  }">{{ user.totalPoints }}</span>
                </td>
                <td class="px-6 py-4 text-right">
                  <span v-if="user.rewards !== '-'" class="inline-flex items-center px-3 py-1 rounded-full text-sm"
                        :class="{
                          'bg-yellow-100 text-yellow-700': user.rank === 1,
                          'bg-gray-100 text-gray-700': user.rank === 2,
                          'bg-orange-100 text-orange-700': user.rank === 3,
                          'bg-orange-50 text-orange-600': user.rank > 3 && user.gtCoins !== '-'
                        }"
                  >
                    {{ user.rewards }}
                  </span>
                  <span v-else class="text-gray-400">-</span>
                </td>
              </tr>
            </tbody>
          </table>
        </div>

        <div class="p-4 border-t border-gray-100 flex justify-between items-center">
          <button class="text-gray-600 hover:text-gray-800 text-sm flex items-center gap-1">
            <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7"/>
            </svg>
            Previous
          </button>
          <div class="flex items-center gap-2">
            <button class="w-8 h-8 rounded-lg bg-orange-600 text-white flex items-center justify-center">1</button>
            <button class="w-8 h-8 rounded-lg hover:bg-orange-50 text-gray-600 flex items-center justify-center">2</button>
            <button class="w-8 h-8 rounded-lg hover:bg-orange-50 text-gray-600 flex items-center justify-center">3</button>
            <span class="text-gray-400">...</span>
            <button class="w-8 h-8 rounded-lg hover:bg-orange-50 text-gray-600 flex items-center justify-center">12</button>
          </div>
          <button class="text-gray-600 hover:text-gray-800 text-sm flex items-center gap-1">
            Next
            <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"/>
            </svg>
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, computed } from 'vue';
import { learderBoardService } from '@/services/api';
import { toast } from 'vue3-toastify';
import 'vue3-toastify/dist/index.css';

const leaderboardData = ref([]);
const isLoading = ref(true);
const error = ref(null);
const currentUserRank = ref(0);
const currentUserPoints = ref(0);
const totalUsers = ref(500);

const formatNumber = (number) => {
  return new Intl.NumberFormat('en-NG').format(number);
};

const calculateRewards = (rank) => {
  if (rank === 1) return '500 GTC';
  if (rank === 2) return '400 GTC';
  if (rank === 3) return '300 GTC';
  if (rank <= 5) return '200 GTC';
  if (rank <= 10) return '100 GTC';
  return '-';
};

const fetchLeaderboardData = async () => {
  try {
    isLoading.value = true;
    const response = await learderBoardService.getAll();
    
    console.log('Leaderboard API Response:', response);
    
    if (response.data?.topUsers) {
      // Map the topUsers array to our display format
      leaderboardData.value = response.data.topUsers.map((user) => ({
        rank: user.rank,
        name: `${user.firstName} ${user.lastName}`,
        totalPoints: formatNumber(user.totalPoints),
        badge: user.rank <= 3 ? '👑' : '',
        rewards: calculateRewards(user.rank),
        gtCoins: user.gtCoins,
        isCurrentUser: user.isCurrentUser
      }));

      // Update current user position
      if (response.data.currentUserPosition) {
        const currentUser = response.data.currentUserPosition;
        currentUserRank.value = currentUser.rank;
        currentUserPoints.value = currentUser.totalPoints;
      }
    } else {
      leaderboardData.value = [];
      console.log('No leaderboard data available');
    }
  } catch (error) {
    console.error('Failed to fetch leaderboard data:', error);
    toast.error('Failed to load leaderboard data', {
      position: 'top-right',
      autoClose: 3000
    });
    error.value = 'Failed to load leaderboard data. Please try again.';
  } finally {
    isLoading.value = false;
  }
};

// Fetch data when component mounts
onMounted(() => {
  fetchLeaderboardData();
});

const topThreeUsers = computed(() => {
  return leaderboardData.value
    .filter(user => user.rank <= 3)
    .sort((a, b) => a.rank - b.rank);
});

const firstPlace = computed(() => topThreeUsers.value.find(user => user.rank === 1) || {});
const secondPlace = computed(() => topThreeUsers.value.find(user => user.rank === 2) || {});
const thirdPlace = computed(() => topThreeUsers.value.find(user => user.rank === 3) || {});
</script>

<style scoped>
.leaderboards-container {
  @apply bg-gradient-to-br from-gray-50 to-orange-50;
}

/* Entrance Animations */
@keyframes slideInFromTop {
  0% {
    transform: translateY(-20px);
    opacity: 0;
  }
  100% {
    transform: translateY(0);
    opacity: 1;
  }
}

@keyframes slideInFromBottom {
  0% {
    transform: translateY(20px);
    opacity: 0;
  }
  100% {
    transform: translateY(0);
    opacity: 1;
  }
}

@keyframes fadeIn {
  0% {
    opacity: 0;
  }
  100% {
    opacity: 1;
  }
}

/* Apply animations to specific elements */
.bg-gradient-to-r.from-orange-500.to-orange-600 {
  animation: slideInFromTop 0.6s ease-out forwards;
}

.grid.grid-cols-1.sm\\:grid-cols-3 {
  animation: fadeIn 0.8s ease-out 0.3s forwards;
  opacity: 0;
}

.bg-white.rounded-2xl.shadow-lg.overflow-hidden {
  animation: slideInFromBottom 0.6s ease-out 0.6s forwards;
  opacity: 0;
}

/* Individual card animations */
.transform.md\\:translate-y-4 {
  animation: fadeIn 0.5s ease-out 0.9s forwards;
  opacity: 0;
}

.transform.-translate-y-4 {
  animation: fadeIn 0.5s ease-out 0.7s forwards;
  opacity: 0;
}

.transform.md\\:translate-y-8 {
  animation: fadeIn 0.5s ease-out 1.1s forwards;
  opacity: 0;
}

@keyframes pulse {
  0%, 100% {
    transform: scale(1);
  }
  50% {
    transform: scale(1.05);
  }
}

.animate-pulse {
  animation: pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite;
}
</style>