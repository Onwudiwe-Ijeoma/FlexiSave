<template>
  <div class="rewards-container p-6">
    <!-- User Stats Section with Gradient Background -->
    <div class="bg-gradient-to-r from-orange-500 to-orange-600 rounded-xl p-8 shadow-lg mb-8 text-white transform hover:scale-[1.02] transition-all duration-300">
      <div class="flex items-center justify-between">
        <div>
          <h2 class="text-3xl font-bold mb-3">My Rewards</h2>
          <p class="text-orange-100">Keep saving to earn more rewards!</p>
        </div>
        <div class="text-right relative">
          <div class="absolute -top-4 -right-4 w-24 h-24 bg-white/10 rounded-full blur-xl"></div>
          <p class="text-4xl font-bold relative">2,500</p>
          <p class="text-orange-100 relative">GT Coins Available</p>
        </div>
      </div>
    </div>

    <!-- Badges Section with 3D Effect -->
    <div class="mb-12">
      <div class="flex justify-between items-center mb-6">
        <h3 class="text-2xl font-semibold">My Badges</h3>
        <span class="text-orange-600 text-sm">2/4 Unlocked</span>
      </div>
      <div class="grid grid-cols-2 md:grid-cols-4 gap-6">
        <div class="group bg-white p-6 rounded-xl shadow-md text-center transform hover:-translate-y-2 transition-all duration-300 relative overflow-hidden">
          <div class="absolute inset-0 bg-gradient-to-br from-orange-100 to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>
          <div class="bg-gradient-to-br from-orange-500 to-orange-600 rounded-full p-4 w-20 h-20 mx-auto mb-4 flex items-center justify-center transform group-hover:rotate-12 transition-transform relative">
            <span class="text-3xl">🌟</span>
          </div>
          <h4 class="font-semibold text-lg mb-2">Early Bird</h4>
          <p class="text-sm text-gray-600">First to save</p>
          <div class="mt-3 text-xs text-orange-600">Achieved!</div>
        </div>

        <div class="group bg-white p-6 rounded-xl shadow-md text-center transform hover:-translate-y-2 transition-all duration-300 relative overflow-hidden">
          <div class="absolute inset-0 bg-gradient-to-br from-orange-100 to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>
          <div class="bg-gradient-to-br from-orange-500 to-orange-600 rounded-full p-4 w-20 h-20 mx-auto mb-4 flex items-center justify-center transform group-hover:rotate-12 transition-transform">
            <span class="text-3xl">💎</span>
          </div>
          <h4 class="font-semibold text-lg mb-2">Consistent Saver</h4>
          <p class="text-sm text-gray-600">30 days streak</p>
          <div class="mt-3 text-xs text-orange-600">Achieved!</div>
        </div>

        <div class="group bg-white p-6 rounded-xl shadow-md text-center transform hover:-translate-y-2 transition-all duration-300 relative overflow-hidden">
          <div class="absolute inset-0 bg-gradient-to-br from-gray-100 to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>
          <div class="bg-gradient-to-br from-gray-200 to-gray-300 rounded-full p-4 w-20 h-20 mx-auto mb-4 flex items-center justify-center">
            <span class="text-3xl opacity-50">🎯</span>
          </div>
          <h4 class="font-semibold text-lg mb-2">Goal Crusher</h4>
          <p class="text-sm text-gray-600">Save ₦100,000</p>
          <div class="mt-3 text-xs text-gray-500">In Progress: 45%</div>
          <div class="w-full bg-gray-200 h-1 mt-2 rounded-full overflow-hidden">
            <div class="w-[45%] h-full bg-orange-600 rounded-full"></div>
          </div>
        </div>

        <div class="group bg-white p-6 rounded-xl shadow-md text-center transform hover:-translate-y-2 transition-all duration-300 relative overflow-hidden">
          <div class="absolute inset-0 bg-gradient-to-br from-gray-100 to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>
          <div class="bg-gradient-to-br from-gray-200 to-gray-300 rounded-full p-4 w-20 h-20 mx-auto mb-4 flex items-center justify-center">
            <span class="text-3xl opacity-50">👑</span>
          </div>
          <h4 class="font-semibold text-lg mb-2">Savings King</h4>
          <p class="text-sm text-gray-600">Top 10 Saver</p>
          <div class="mt-3 text-xs text-gray-500">Locked</div>
        </div>
      </div>
    </div>

    <!-- Achievements Table Section -->
    <div class="mb-12">
      <div class="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 sm:gap-0 mb-6">
        <h3 class="text-2xl font-semibold">Achievement History</h3>
        <div class="flex items-center gap-2">
          <span class="text-sm text-gray-600">Total Points:</span>
          <span class="bg-orange-100 text-orange-600 px-3 py-1 rounded-full font-semibold">1,250 GTC</span>
        </div>
      </div>
      
      <!-- Table view for medium and large screens -->
      <div class="hidden md:block bg-white rounded-xl shadow-lg overflow-hidden">
        <div class="overflow-x-auto">
          <table class="w-full">
            <thead>
              <tr class="bg-gradient-to-r from-orange-500 to-orange-600 text-white">
                <th class="py-4 px-6 text-left">Achievement</th>
                <th class="py-4 px-6 text-left">Date Earned</th>
                <th class="py-4 px-6 text-left">GtCoin</th>
                <th class="py-4 px-6 text-left">Status</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="(achievement, index) in achievements" 
                  :key="index"
                  class="border-b border-gray-100 hover:bg-orange-50/50 transition-colors group">
                <td class="py-4 px-6">
                  <div class="flex items-center gap-3">
                    <div class="w-10 h-10 rounded-lg bg-orange-100 flex items-center justify-center text-xl">
                      {{ achievement.icon }}
                    </div>
                    <div>
                      <p class="font-medium text-gray-900">{{ achievement.name }}</p>
                      <p class="text-sm text-gray-500">{{ achievement.description }}</p>
                    </div>
                  </div>
                </td>
                <td class="py-4 px-6">
                  <span class="text-gray-600">{{ achievement.date }}</span>
                </td>
                <td class="py-4 px-6">
                  <div class="flex items-center gap-2">
                    <svg class="w-5 h-5 text-orange-500" viewBox="0 0 20 20" fill="currentColor">
                      <path fill-rule="evenodd" d="M6.267 3.455a3.066 3.066 0 001.745-.723 3.066 3.066 0 013.976 0 3.066 3.066 0 001.745.723 3.066 3.066 0 012.812 2.812c.051.643.304 1.254.723 1.745a3.066 3.066 0 010 3.976 3.066 3.066 0 00-.723 1.745 3.066 3.066 0 01-2.812 2.812 3.066 3.066 0 00-1.745.723 3.066 3.066 0 01-3.976 0 3.066 3.066 0 00-1.745-.723 3.066 3.066 0 01-2.812-2.812 3.066 3.066 0 00-.723-1.745 3.066 3.066 0 010-3.976 3.066 3.066 0 00.723-1.745 3.066 3.066 0 012.812-2.812zm7.44 5.252a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd"/>
                    </svg>
                    <span class="font-semibold text-orange-600">+{{ achievement.points }} GTC</span>
                  </div>
                </td>
                <td class="py-4 px-6">
                  <span :class="[
                    'px-3 py-1 rounded-full text-sm font-medium',
                    achievement.status === 'Completed' ? 'bg-green-100 text-green-700' : 
                    achievement.status === 'In Progress' ? 'bg-blue-100 text-blue-700' :
                    'bg-gray-100 text-gray-700'
                  ]">
                    {{ achievement.status }}
                  </span>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      <!-- Card view for small screens -->
      <div class="md:hidden space-y-4">
        <div v-for="(achievement, index) in achievements" 
            :key="index"
            class="bg-white rounded-xl shadow-lg p-4 hover:bg-orange-50/50 transition-colors"
        >
          <div class="flex items-start gap-3 mb-3">
            <div class="w-10 h-10 rounded-lg bg-orange-100 flex items-center justify-center text-xl shrink-0">
              {{ achievement.icon }}
            </div>
            <div class="flex-1 min-w-0">
              <p class="font-medium text-gray-900">{{ achievement.name }}</p>
              <p class="text-sm text-gray-500 mt-1">{{ achievement.description }}</p>
            </div>
          </div>
          
          <div class="flex flex-wrap gap-3 items-center justify-between mt-4">
            <div class="flex items-center gap-2">
              <svg class="w-5 h-5 text-orange-500" viewBox="0 0 20 20" fill="currentColor">
                <path fill-rule="evenodd" d="M6.267 3.455a3.066 3.066 0 001.745-.723 3.066 3.066 0 013.976 0 3.066 3.066 0 001.745.723 3.066 3.066 0 012.812 2.812c.051.643.304 1.254.723 1.745a3.066 3.066 0 010 3.976 3.066 3.066 0 00-.723 1.745 3.066 3.066 0 01-2.812 2.812 3.066 3.066 0 00-1.745.723 3.066 3.066 0 01-3.976 0 3.066 3.066 0 00-1.745-.723 3.066 3.066 0 01-2.812-2.812 3.066 3.066 0 00-.723-1.745 3.066 3.066 0 010-3.976 3.066 3.066 0 00.723-1.745 3.066 3.066 0 012.812-2.812zm7.44 5.252a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd"/>
              </svg>
              <span class="font-semibold text-orange-600">+{{ achievement.points }} GTC</span>
            </div>
            
            <div class="flex items-center gap-3">
              <span class="text-sm text-gray-600">{{ achievement.date }}</span>
              <span :class="[
                'px-3 py-1 rounded-full text-sm font-medium',
                achievement.status === 'Completed' ? 'bg-green-100 text-green-700' : 
                achievement.status === 'In Progress' ? 'bg-blue-100 text-blue-700' :
                'bg-gray-100 text-gray-700'
              ]">
                {{ achievement.status }}
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- GT Marketplace Section with Modern Cards -->
    <div>
      <div class="flex justify-between items-center mb-6">
        <h3 class="text-2xl font-semibold">GT Marketplace</h3>
        <button @click="showAllRewards = !showAllRewards" class="text-orange-600 text-sm hover:text-orange-700 transition-colors flex items-center gap-2">
          {{ showAllRewards ? 'Show Less' : 'View All' }}
          <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" viewBox="0 0 20 20" fill="currentColor" :class="{ 'rotate-90': showAllRewards }">
            <path fill-rule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clip-rule="evenodd" />
          </svg>
        </button>
      </div>
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <!-- Reward cards -->
        <div
          v-for="reward in visibleRewards"
          :key="reward.id"
          class="group bg-white rounded-xl shadow-lg overflow-hidden transform hover:-translate-y-1 transition-all duration-300 flex flex-col"
        >
          <div class="bg-gradient-to-r from-orange-500 to-orange-600 p-4 relative">
            <div class="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full -mr-16 -mt-16"></div>
            <div v-if="reward.isPremium" class="absolute top-4 right-4 bg-white/20 px-2 py-1 rounded text-xs text-white">Premium</div>
            <h4 class="font-semibold text-xl text-white mb-2">{{ reward.title }}</h4>
            <p class="text-orange-100">{{ reward.description }}</p>
          </div>
          <div class="p-6 flex-1 flex flex-col">
            <div class="flex justify-between items-center mb-4">
              <span class="text-gray-600">{{ reward.optionLabel }}:</span>
              <div class="flex items-center gap-2">
                <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 text-orange-600" viewBox="0 0 20 20" fill="currentColor">
                  <path d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.5 8.5a1.5 1.5 0 11-3 0 1.5 1.5 0 013 0zM13 8.5a1.5 1.5 0 11-3 0 1.5 1.5 0 013 0z" />
                </svg>
                <span class="font-semibold text-orange-600">{{ reward.coins }} GT Coins</span>
              </div>
            </div>
            <div class="flex-1"></div>
            <button class="w-full bg-gradient-to-r from-orange-500 to-orange-600 text-white py-3 rounded-lg group-hover:from-orange-600 group-hover:to-orange-700 transition-all duration-300 flex items-center justify-center gap-2 mt-4">
              <span>Redeem Now</span>
              <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 transform group-hover:translate-x-1 transition-transform" viewBox="0 0 20 20" fill="currentColor">
                <path fill-rule="evenodd" d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z" clip-rule="evenodd" />
              </svg>
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'

const showAllRewards = ref(false)

// Achievements data
const achievements = [
  {
    name: "First Savings Goal",
    description: "Created your first savings target",
    date: "Mar 15, 2024",
    points: 100,
    status: "Completed",
    icon: "🎯"
  },
  {
    name: "Savings Streak",
    description: "Maintained savings for 7 days straight",
    date: "Mar 12, 2024",
    points: 250,
    status: "Completed",
    icon: "🔥"
  },
  {
    name: "Budget Master",
    description: "Created 3 different savings plans",
    date: "Mar 10, 2024",
    points: 300,
    status: "Completed",
    icon: "👑"
  },
  {
    name: "Super Saver",
    description: "Saved ₦100,000 in one month",
    date: "In Progress",
    points: 500,
    status: "In Progress",
    icon: "💎"
  },
  {
    name: "Investment Guru",
    description: "Complete 5 savings goals",
    date: "Locked",
    points: 1000,
    status: "Locked",
    icon: "🌟"
  }
]

const allRewards = [
  {
    id: 1,
    title: 'Airtime Voucher',
    description: 'Get instant airtime credit',
    optionLabel: 'Available Options',
    coins: 200,
    isPremium: false
  },
  {
    id: 2,
    title: 'Shopping Voucher',
    description: 'Redeem at partner stores',
    optionLabel: 'Available Options',
    coins: 500,
    isPremium: false
  },
  {
    id: 3,
    title: 'Fashion Weekend',
    description: 'VIP Access to GT Fashion Weekend',
    optionLabel: 'VIP Access',
    coins: 1000,
    isPremium: true
  },
  {
    id: 4,
    title: 'Investment Masterclass',
    description: 'Learn from financial experts',
    optionLabel: 'Course Access',
    coins: 800,
    isPremium: true
  },
  {
    id: 5,
    title: 'Movie Tickets',
    description: 'Watch latest movies',
    optionLabel: '2 Tickets',
    coins: 600,
    isPremium: false
  },
  {
    id: 6,
    title: 'Dining Voucher',
    description: 'Eat at premium restaurants',
    optionLabel: 'Voucher Value',
    coins: 750,
    isPremium: true
  },
  {
    id: 7,
    title: 'Spa Day',
    description: 'Relax at luxury spas',
    optionLabel: 'Package Value',
    coins: 900,
    isPremium: true
  },
  {
    id: 8,
    title: 'Data Bundle',
    description: '10GB Data Bundle',
    optionLabel: 'Bundle Value',
    coins: 400,
    isPremium: false
  },
  {
    id: 9,
    title: 'Hotel Stay',
    description: 'One night at premium hotels',
    optionLabel: 'Room Value',
    coins: 1500,
    isPremium: true
  }
]

const visibleRewards = computed(() => {
  return showAllRewards.value ? allRewards : allRewards.slice(0, 3)
})
</script>

<style scoped>
.rewards-container {
  @apply bg-gradient-to-br from-gray-50 to-orange-50 min-h-screen;
}
</style>