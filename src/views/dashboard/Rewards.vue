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
          class="group bg-white rounded-xl shadow-lg overflow-hidden transform hover:-translate-y-1 transition-all duration-300"
        >
          <div class="bg-gradient-to-r from-orange-500 to-orange-600 p-6 relative">
            <div class="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full -mr-16 -mt-16"></div>
            <div v-if="reward.isPremium" class="absolute top-4 right-4 bg-white/20 px-2 py-1 rounded text-xs text-white">Premium</div>
            <h4 class="font-semibold text-xl text-white mb-2">{{ reward.title }}</h4>
            <p class="text-orange-100">{{ reward.description }}</p>
          </div>
          <div class="p-6">
            <div class="flex justify-between items-center mb-4">
              <span class="text-gray-600">{{ reward.optionLabel }}:</span>
              <div class="flex items-center gap-2">
                <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 text-orange-600" viewBox="0 0 20 20" fill="currentColor">
                  <path d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.5 8.5a1.5 1.5 0 11-3 0 1.5 1.5 0 013 0zM13 8.5a1.5 1.5 0 11-3 0 1.5 1.5 0 013 0z" />
                </svg>
                <span class="font-semibold text-orange-600">{{ reward.coins }} GT Coins</span>
              </div>
            </div>
            <button class="w-full bg-gradient-to-r from-orange-500 to-orange-600 text-white py-3 rounded-lg group-hover:from-orange-600 group-hover:to-orange-700 transition-all duration-300 flex items-center justify-center gap-2">
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