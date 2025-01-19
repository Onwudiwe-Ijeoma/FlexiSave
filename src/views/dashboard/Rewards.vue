<template>
  <div class="rewards-container p-6">
    <!-- User Stats Section with Gradient Background -->
    <div
      class="bg-gradient-to-r from-orange-500 to-orange-600 rounded-xl p-8 shadow-lg mb-8 text-white transform hover:scale-[1.02] transition-all duration-300"
    >
      <div class="flex items-center justify-between">
        <div>
          <h2 class="text-3xl font-bold mb-3">My Rewards</h2>
          <p class="text-orange-100">Keep saving to earn more rewards!</p>
        </div>
        <div class="text-right relative">
          <div
            class="absolute -top-4 -right-4 w-24 h-24 bg-white/10 rounded-full blur-xl"
          ></div>
          <p class="text-4xl font-bold relative">{{
           user.totalGtCoins
          }}</p>
          <p class="text-orange-100 relative">GT Coins Available</p>
        </div>
      </div>
    </div>
    <!-- Badges Section with 3D Effect -->
    <div class="mb-12">
      <div class="flex justify-between items-center mb-6">
        <h3 class="text-2xl font-semibold">My Badges</h3>
        <span class="text-orange-600 text-sm">3/4 Unlocked</span>
      </div>
      <div class="grid grid-cols-2 md:grid-cols-4 gap-6">
        <div
          class="group bg-white p-6 rounded-xl shadow-md text-center transform hover:-translate-y-2 transition-all duration-300 relative overflow-hidden"
        >
          <div
            class="absolute inset-0 bg-gradient-to-br from-orange-100 to-transparent opacity-0 group-hover:opacity-100 transition-opacity"
          ></div>
          <div
            class="bg-gradient-to-br from-orange-500 to-orange-600 rounded-full p-4 w-20 h-20 mx-auto mb-4 flex items-center justify-center transform group-hover:rotate-12 transition-transform relative"
          >
            <span class="text-3xl">🌟</span>
          </div>
          <h4 class="font-semibold text-lg mb-2">Soft Life Geng</h4>
          <p class="text-sm text-gray-600">First to save</p>
          <div class="mt-3 text-xs text-orange-600">Achieved!</div>
        </div>

        <div
          class="group bg-white p-6 rounded-xl shadow-md text-center transform hover:-translate-y-2 transition-all duration-300 relative overflow-hidden"
        >
          <div
            class="absolute inset-0 bg-gradient-to-br from-orange-100 to-transparent opacity-0 group-hover:opacity-100 transition-opacity"
          ></div>
          <div
            class="bg-gradient-to-br from-orange-500 to-orange-600 rounded-full p-4 w-20 h-20 mx-auto mb-4 flex items-center justify-center transform group-hover:rotate-12 transition-transform"
          >
            <span class="text-3xl">💎</span>
          </div>
          <h4 class="font-semibold text-lg mb-2">Boss</h4>
          <p class="text-sm text-gray-600">30 days streak</p>
          <div class="mt-3 text-xs text-orange-600">Achieved!</div>
        </div>

        <div
          class="group bg-white p-6 rounded-xl shadow-md text-center transform hover:-translate-y-2 transition-all duration-300 relative overflow-hidden"
        >
          <div
            class="absolute inset-0 bg-gradient-to-br from-gray-100 to-transparent opacity-0 group-hover:opacity-100 transition-opacity"
          ></div>
          <div
            class="bg-gradient-to-br from-gray-200 to-gray-300 rounded-full p-4 w-20 h-20 mx-auto mb-4 flex items-center justify-center"
          >
            <span class="text-3xl opacity-50">🎯</span>
          </div>
          <h4 class="font-semibold text-lg mb-2">Sigma</h4>
          <p class="text-sm text-gray-600">Save ₦100,000</p>
          <div class="mt-3 text-xs text-gray-500">In Progress: 45%</div>
          <div class="w-full bg-gray-200 h-1 mt-2 rounded-full overflow-hidden">
            <div class="w-[45%] h-full bg-orange-600 rounded-full"></div>
          </div>
        </div>

        <div
          class="group bg-white/50 p-6 rounded-xl shadow-md text-center relative overflow-hidden cursor-not-allowed"
        >
          <div class="absolute inset-0 bg-gray-100/80 backdrop-blur-[1px] z-10"></div>
          <div class="absolute inset-0 flex items-center justify-center z-20">
            <div class="bg-gray-900/10 p-3 rounded-full">
              <svg xmlns="http://www.w3.org/2000/svg" class="h-8 w-8 text-gray-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
              </svg>
            </div>
          </div>
          <div
            class="bg-gradient-to-br from-gray-200 to-gray-300 rounded-full p-4 w-20 h-20 mx-auto mb-4 flex items-center justify-center relative"
          >
            <span class="text-3xl opacity-50">👑</span>
          </div>
          <h4 class="font-semibold text-lg mb-2 text-gray-500">Odogwu Saver</h4>
          <p class="text-sm text-gray-400">Top 10 Saver</p>
          <div class="mt-3 text-xs text-gray-400">Locked</div>
        </div>
      </div>
    </div>

      <!-- Rewards Table Section -->
      <div class="mb-12">
      <div class="flex justify-between items-center mb-6">
        <h3 class="text-2xl font-semibold">My Rewards</h3>
        <div class="flex items-center gap-2">
          <span class="text-sm text-gray-600">Total Rewards:</span>
          <span class="bg-orange-100 text-orange-600 px-3 py-1 rounded-full font-semibold">
            {{ rewards.length }}
          </span>
        </div>
      </div>

      <!-- Loading State -->
      <div v-if="loading" class="flex justify-center items-center py-8">
        <div class="animate-spin rounded-full h-8 w-8 border-b-2 border-orange-600"></div>
      </div>

      <!-- Error State -->
      <div v-else-if="error" class="bg-red-50 text-red-600 p-4 rounded-lg text-center">
        {{ error }}
      </div>

      <!-- Table view -->
      <template v-else>
        <div class="bg-white rounded-xl shadow-lg overflow-hidden">
          <!-- Desktop View -->
          <div class="hidden md:block">
            <table class="w-full">
              <thead>
                <tr class="bg-gradient-to-r from-orange-500 to-orange-600 text-white">
                  <th class="py-4 px-6 text-left">Milestone</th>
                  <th class="py-4 px-6 text-left">Points</th>

                  <th class="py-4 px-6 text-left">Status</th>
                  <th class="py-4 px-6 text-left">Date</th>
                  <th class="py-4 px-6 text-left">Action</th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="reward in paginatedRewards" 
                    :key="reward.id"
                    class="border-b border-gray-100 hover:bg-orange-50/50 transition-colors">
                  <td class="py-4 px-6">
                    <div class="flex items-center gap-3">
                      <div class="w-10 h-10 rounded-lg bg-orange-100 flex items-center justify-center text-xl shrink-0">
                        🎯
                      </div>
                      <div>
                        <p class="font-medium text-gray-900">Milestone {{ reward.milestoneNumber }}</p>
                        <p class="text-sm text-gray-500">{{ reward.description || 'No description available' }}</p>
                      </div>
                    </div>
                  </td>
                  <td class="py-4 px-6">
                    <span class="font-medium text-gray-900">{{ reward.points }}</span>
                  </td>
                 
                  <td class="py-4 px-6">
                    <span :class="[
                      'inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium',
                      reward.isClaimed ? 
                        'bg-green-100 text-green-800' : 
                        'bg-yellow-100 text-yellow-800'
                    ]">
                      {{ reward.isClaimed ? 'Claimed' : 'Available' }}
                    </span>
                  </td>
                  <td class="py-4 px-6">
                    <span class="text-gray-600">
                      {{ new Date(reward.createdAt).toLocaleDateString("en-NG", {
                        year: "numeric",
                        month: "long",
                        day: "numeric"
                      }) }}
                    </span>
                  </td>
                  <td class="py-4 px-6">
                    <button
                      v-if="!reward.isClaimed"
                      @click="claimReward(reward.id)"
                      :disabled="loadingRewards.has(reward.id)"
                      class="inline-flex items-center px-3 py-1.5 border border-transparent text-xs font-medium rounded-md shadow-sm text-white bg-orange-600 hover:bg-orange-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-orange-500 disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      <template v-if="loadingRewards.has(reward.id)">
                        <svg class="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                          <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
                          <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                        </svg>
                        Claiming...
                      </template>
                      <template v-else>
                        Claim Reward
                      </template>
                    </button>
                    <span v-else class="text-gray-400 text-sm">Claimed</span>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>

          <!-- Mobile View -->
          <div class="block md:hidden">
            <div class="divide-y divide-gray-100">
              <div v-for="reward in paginatedRewards" 
                  :key="reward.id"
                  class="p-4 hover:bg-orange-50/50 transition-colors">
                <div class="flex items-start gap-3">
                  <div class="w-10 h-10 rounded-lg bg-orange-100 flex items-center justify-center text-xl shrink-0">
                    🎯
                  </div>
                  <div class="flex-1 min-w-0">
                    <div class="flex items-start justify-between gap-2">
                      <div>
                        <h4 class="font-medium text-gray-900">Milestone {{ reward.milestoneNumber }}</h4>
                        <p class="text-sm text-gray-500 mt-0.5">{{ reward.description || 'No description available' }}</p>
                      </div>
                      <span :class="[
                        'shrink-0 inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium',
                        reward.isClaimed ? 
                          'bg-green-100 text-green-800' : 
                          'bg-yellow-100 text-yellow-800'
                      ]">
                        {{ reward.isClaimed ? 'Claimed' : 'Available' }}
                      </span>
                    </div>
                    <div class="mt-2 grid grid-cols-2 gap-2 text-sm">
                      <div class="flex justify-between">
                        <span class="text-gray-500">Points:</span>
                        <span class="font-medium">{{ reward.points }}</span>
                      </div>
                      <div class="flex justify-between">
                        <span class="text-gray-500">Date:</span>
                        <span class="font-medium">{{ new Date(reward.createdAt).toLocaleDateString() }}</span>
                      </div>
                    </div>
                    <div class="mt-3" v-if="!reward.isClaimed">
                      <button
                        @click="claimReward(reward.id)"
                        :disabled="loadingRewards.has(reward.id)"
                        class="w-full inline-flex items-center justify-center px-3 py-2 border border-transparent text-sm font-medium rounded-lg shadow-sm text-white bg-orange-600 hover:bg-orange-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-orange-500 disabled:opacity-50 disabled:cursor-not-allowed"
                      >
                        <template v-if="loadingRewards.has(reward.id)">
                          <svg class="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                            <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
                            <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                          </svg>
                          Claiming...
                        </template>
                        <template v-else>
                          Claim Reward
                        </template>
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </template>

      <!-- Pagination Controls for Rewards -->
      <div class="p-4 border-t border-gray-100 flex justify-between items-center">
        <button
          @click="previousRewardsPage"
          :disabled="currentRewardsPage === 1"
          class="text-gray-600 hover:text-gray-800 text-sm flex items-center gap-1 transition-all duration-300"
          :class="{ 'opacity-50 cursor-not-allowed': currentRewardsPage === 1 }"
        >
          <svg
            class="w-4 h-4"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M15 19l-7-7 7-7"
            />
          </svg>
          Previous
        </button>
        <div class="hidden sm:flex items-center gap-2">
          <button
            v-for="page in rewardsPageNumbers"
            :key="page"
            @click="goToRewardsPage(page)"
            class="w-8 h-8 rounded-lg flex items-center justify-center transition-all duration-300"
            :class="
              currentRewardsPage === page
                ? 'bg-orange-600 text-white'
                : 'hover:bg-orange-50 text-gray-600'
            "
          >
            {{ page }}
          </button>
        </div>
        <div class="flex sm:hidden items-center gap-2">
          <span class="text-sm text-gray-600">
            Page {{ currentRewardsPage }} of {{ totalRewardsPages }}
          </span>
        </div>
        <button
          @click="nextRewardsPage"
          :disabled="currentRewardsPage === totalRewardsPages"
          class="text-gray-600 hover:text-gray-800 text-sm flex items-center gap-1 transition-all duration-300"
          :class="{
            'opacity-50 cursor-not-allowed': currentRewardsPage === totalRewardsPages,
          }"
        >
          Next
          <svg
            class="w-4 h-4"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M9 5l7 7-7 7"
            />
          </svg>
        </button>
      </div>
    </div>



    <!-- Achievements Table Section -->
    <div class="mb-12">
      <div
        class="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 sm:gap-0 mb-6"
      >
        <h3 class="text-2xl font-semibold">My Achievements</h3>
        <div class="flex items-center gap-2">
          <span class="text-sm text-gray-600">Total Points:</span>
          <span
            class="bg-orange-100 text-orange-600 px-3 py-1 rounded-full font-semibold"
            >{{
             user.totalPoints

            }}
            GTC</span
          >
        </div>
      </div>

      <!-- Loading State -->
      <div v-if="loading" class="flex justify-center items-center py-8">
        <div
          class="animate-spin rounded-full h-8 w-8 border-b-2 border-orange-600"
        ></div>
      </div>

      <!-- Error State -->
      <div
        v-else-if="error"
        class="bg-red-50 text-red-600 p-4 rounded-lg text-center"
      >
        {{ error }}
      </div>

      <!-- Table view for medium and large screens -->
      <template v-else>
        <div class="bg-white rounded-xl shadow-lg overflow-hidden">
          <!-- Desktop View -->
          <div class="hidden md:block">
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
                <tr v-for="(achievement, index) in paginatedAchievements" 
                    :key="index"
                    class="border-b border-gray-100 hover:bg-orange-50/50 transition-colors group">
                  <td class="py-4 px-6">
                    <div class="flex items-center gap-3">
                      <div class="w-10 h-10 rounded-lg bg-orange-100 flex items-center justify-center text-xl shrink-0">
                        {{ achievement.icon }}
                      </div>
                      <div>
                        <p class="font-medium text-gray-900">{{ achievement.name }}</p>
                        <p class="text-sm text-gray-500">{{ achievement.description }}</p>
                      </div>
                    </div>
                  </td>
                  <td class="py-4 px-6">
                    <span class="text-gray-600">{{ achievement.updatedAt }}</span>
                  </td>
                  <td class="py-4 px-6">
                    <div class="flex items-center gap-2">
                      <svg class="w-5 h-5 text-orange-500" viewBox="0 0 20 20" fill="currentColor">
                        <path fill-rule="evenodd" d="M6.267 3.455a3.066 3.066 0 001.745-.723 3.066 3.066 0 013.976 0 3.066 3.066 0 001.745.723 3.066 3.066 0 012.812 2.812c.051.643.304 1.254.723 1.745a3.066 3.066 0 010 3.976 3.066 3.066 0 00-.723 1.745 3.066 3.066 0 01-2.812 2.812 3.066 3.066 0 00-1.745.723 3.066 3.066 0 01-3.976 0 3.066 3.066 0 00-1.745-.723 3.066 3.066 0 01-2.812-2.812 3.066 3.066 0 00-.723-1.745 3.066 3.066 0 010-3.976 3.066 3.066 0 00.723-1.745 3.066 3.066 0 012.812-2.812zm7.44 5.252a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd"/>
                      </svg>
                      <span class="font-semibold text-orange-600">+{{ achievement.points }}</span>
                    </div>
                  </td>
                  <td class="py-4 px-6">
                    <span :class="[
                      'inline-flex items-center justify-center w-full sm:w-auto px-3 py-1.5 text-xs font-medium rounded-md',
                      achievement.status === 'Completed' ? 
                        'bg-green-100 text-green-700 border border-green-200' : 
                        'bg-blue-100 text-blue-700 border border-blue-200'
                    ]">
                      <span class="w-1.5 h-1.5 rounded-full mr-1.5"
                            :class="achievement.status === 'Completed' ? 'bg-green-500' : 'bg-blue-500'">
                      </span>
                      {{ achievement.status }}
                    </span>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>

          <!-- Mobile View -->
          <div class="block md:hidden">
            <div class="divide-y divide-gray-100">
              <div v-for="(achievement, index) in paginatedAchievements" 
                  :key="index"
                  class="p-4 hover:bg-orange-50/50 transition-colors">
                <div class="flex items-start gap-3">
                  <div class="w-10 h-10 rounded-lg bg-orange-100 flex items-center justify-center text-xl shrink-0">
                    {{ achievement.icon }}
                  </div>
                  <div class="flex-1 min-w-0">
                    <div class="flex items-start justify-between gap-2">
                      <div>
                        <h4 class="font-medium text-gray-900">{{ achievement.name }}</h4>
                        <p class="text-sm text-gray-500 mt-0.5">{{ achievement.description }}</p>
                      </div>
                      <span :class="[
                        'inline-flex items-center justify-center w-full sm:w-auto px-3 py-1.5 text-xs font-medium rounded-md',
                        achievement.status === 'Completed' ? 
                          'bg-green-100 text-green-700 border border-green-200' : 
                          'bg-blue-100 text-blue-700 border border-blue-200'
                      ]">
                        <span class="w-1.5 h-1.5 rounded-full mr-1.5"
                              :class="achievement.status === 'Completed' ? 'bg-green-500' : 'bg-blue-500'">
                        </span>
                        {{ achievement.status }}
                      </span>
                    </div>
                    <div class="flex items-center justify-between mt-2 text-sm">
                      <div class="flex items-center gap-1 text-orange-600">
                        <svg class="w-4 h-4" viewBox="0 0 20 20" fill="currentColor">
                          <path fill-rule="evenodd" d="M6.267 3.455a3.066 3.066 0 001.745-.723 3.066 3.066 0 013.976 0 3.066 3.066 0 001.745.723 3.066 3.066 0 012.812 2.812c.051.643.304 1.254.723 1.745a3.066 3.066 0 010 3.976 3.066 3.066 0 00-.723 1.745 3.066 3.066 0 01-2.812 2.812 3.066 3.066 0 00-1.745.723 3.066 3.066 0 01-3.976 0 3.066 3.066 0 00-1.745-.723 3.066 3.066 0 01-2.812-2.812 3.066 3.066 0 00-.723-1.745 3.066 3.066 0 010-3.976 3.066 3.066 0 00.723-1.745 3.066 3.066 0 012.812-2.812zm7.44 5.252a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd"/>
                        </svg>
                        <span class="font-medium">+{{ achievement.points }}</span>
                      </div>
                      <span class="text-gray-500">{{ achievement.updatedAt }}</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </template>

      <!-- Pagination Controls -->
      <div class="p-4 border-t border-gray-100 flex justify-between items-center">
        <button
          @click="previousPage"
          :disabled="currentPage === 1"
          class="text-gray-600 hover:text-gray-800 text-sm flex items-center gap-1 transition-all duration-300"
          :class="{ 'opacity-50 cursor-not-allowed': currentPage === 1 }"
        >
          <svg
            class="w-4 h-4"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M15 19l-7-7 7-7"
            />
          </svg>
          Previous
        </button>
        <div class="flex items-center gap-2">
          <button
            v-for="page in pageNumbers"
            :key="page"
            @click="goToPage(page)"
            class="w-8 h-8 rounded-lg flex items-center justify-center transition-all duration-300"
            :class="
              currentPage === page
                ? 'bg-orange-600 text-white'
                : 'hover:bg-orange-50 text-gray-600'
            "
          >
            {{ page }}
          </button>
        </div>
        <button
          @click="nextPage"
          :disabled="currentPage === totalPages"
          class="text-gray-600 hover:text-gray-800 text-sm flex items-center gap-1 transition-all duration-300"
          :class="{
            'opacity-50 cursor-not-allowed': currentPage === totalPages,
          }"
        >
          Next
          <svg
            class="w-4 h-4"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M9 5l7 7-7 7"
            />
          </svg>
        </button>
      </div>

     
      <!-- <div class="md:hidden mt-4 flex justify-between items-center px-4">
        <button
          @click="previousPage"
          :disabled="currentPage === 1"
          class="text-gray-600 hover:text-gray-800 text-sm flex items-center gap-1 transition-all duration-300"
          :class="{ 'opacity-50 cursor-not-allowed': currentPage === 1 }"
        >
          <svg
            class="w-4 h-4"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M15 19l-7-7 7-7"
            />
          </svg>
          Previous
        </button>
        <button
          @click="nextPage"
          :disabled="currentPage === totalPages"
          class="text-gray-600 hover:text-gray-800 text-sm flex items-center gap-1 transition-all duration-300"
          :class="{
            'opacity-50 cursor-not-allowed': currentPage === totalPages,
          }"
        >
          Next
          <svg
            class="w-4 h-4"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M9 5l7 7-7 7"
            />
          </svg>
        </button>
      </div> -->
    </div>

    <!-- GT Marketplace Section with Modern Cards -->
    <div>
      <div class="flex justify-between items-center mb-6">
        <h3 class="text-2xl font-semibold">GT Marketplace</h3>
        <button
          @click="showAllRewards = !showAllRewards"
          class="text-orange-600 text-sm hover:text-orange-700 transition-colors flex items-center gap-2"
        >
          {{ showAllRewards ? "Show Less" : "View All" }}
          <svg
            xmlns="http://www.w3.org/2000/svg"
            class="h-4 w-4"
            viewBox="0 0 20 20"
            fill="currentColor"
            :class="{ 'rotate-90': showAllRewards }"
          >
            <path
              fill-rule="evenodd"
              d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
              clip-rule="evenodd"
            />
          </svg>
        </button>
      </div>

      <!-- Loading State -->
      <div v-if="loading" class="flex justify-center items-center py-8">
        <div
          class="animate-spin rounded-full h-8 w-8 border-b-2 border-orange-600"
        ></div>
      </div>

      <!-- Error State -->
      <div
        v-else-if="error"
        class="bg-red-50 text-red-600 p-4 rounded-lg text-center"
      >
        {{ error }}
      </div>

      <!-- Marketplace Cards -->
      <div v-else class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <div
          v-for="product in visibleProducts"
          :key="product.id"
          class="group bg-white rounded-xl shadow-lg overflow-hidden transform hover:-translate-y-1 transition-all duration-300 flex flex-col"
        >
          <div
            class="bg-gradient-to-r from-orange-500 to-orange-600 p-4 relative"
          >
            <div
              class="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full -mr-16 -mt-16"
            ></div>
            <div
              class="absolute top-4 right-4 bg-white/20 px-2 py-1 rounded text-xs text-white capitalize"
            >
              {{ product.category }}
            </div>
            <h4 class="font-semibold text-xl text-white mb-2">
              {{ product.name }}
            </h4>
            <p class="text-orange-100">{{ product.description }}</p>
          </div>
          <div class="p-6 flex-1 flex flex-col">
            <div class="space-y-3 flex-1">
              <div class="flex justify-between items-center">
                <span class="text-gray-600">Cost:</span>
                <div class="flex items-center gap-2">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    class="h-5 w-5 text-orange-600"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                  >
                    <path
                      d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.5 8.5a1.5 1.5 0 11-3 0 1.5 1.5 0 013 0zM13 8.5a1.5 1.5 0 11-3 0 1.5 1.5 0 013 0z"
                    />
                  </svg>
                  <span class="font-semibold text-orange-600">{{ product.gtcCost }} GT Coins</span>
                </div>
              </div>

              <div
                v-if="product.minimumPurchaseAmount"
                class="flex justify-between items-center text-sm"
              >
                <span class="text-gray-600">Minimum Purchase:</span>
                <span class="font-medium text-gray-700">₦{{ product.minimumPurchaseAmount }}</span>
              </div>

              <div
                v-if="product.discountAmount"
                class="flex justify-between items-center text-sm"
              >
                <span class="text-gray-600">Discount:</span>
                <span class="font-medium text-green-600">
                  {{ typeof product.discountAmount === "number" && product.discountAmount > 100
                      ? "₦" + product.discountAmount
                      : product.discountAmount + "%" }}
                </span>
              </div>

              <div v-if="product.specialBenefit" class="mt-3">
                <span class="text-xs font-medium text-orange-600 bg-orange-50 px-2 py-1 rounded-full">
                  {{ product.specialBenefit }}
                </span>
              </div>
            </div>

            <button
              @click="purchaseProduct(product.id)"
              :disabled="loadingProducts.has(product.id)"
              class="w-full mt-6 bg-gradient-to-r from-orange-500 to-orange-600 text-white py-3 rounded-lg group-hover:from-orange-600 group-hover:to-orange-700 transition-all duration-300 flex items-center justify-center gap-2"
            >
              <template v-if="loadingProducts.has(product.id)">
                <svg class="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
                  <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                <span class="ml-2">Redeeming...</span>
              </template>
              <template v-else>
              <span>Redeem Now</span>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                class="h-5 w-5 transform group-hover:translate-x-1 transition-transform"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path
                  fill-rule="evenodd"
                  d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z"
                  clip-rule="evenodd"
                />
              </svg>
              </template>
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from "vue";
import { marketplaceService, achievementsService,authService,rewardsService } from "@/services/api";
import { toast } from 'vue3-toastify';
import 'vue3-toastify/dist/index.css';

const showAllRewards = ref(false);
const marketplaceProducts = ref([]);
const achievements = ref([]);
const loading = ref(false);
const error = ref(null);
const user = ref({});
const loadingProducts = ref(new Set());

// Pagination state
const currentPage = ref(1);
const itemsPerPage = 5;

// Computed property for paginated achievements
const paginatedAchievements = computed(() => {
  const startIndex = (currentPage.value - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  return achievements.value.slice(startIndex, endIndex);
});

// Computed property for total pages
const totalPages = computed(() => {
  return Math.ceil(achievements.value.length / itemsPerPage);
});

// Navigation methods
const goToPage = (page) => {
  if (page >= 1 && page <= totalPages.value) {
    currentPage.value = page;
  }
};

const nextPage = () => {
  if (currentPage.value < totalPages.value) {
    currentPage.value++;
  }
};

const previousPage = () => {
  if (currentPage.value > 1) {
    currentPage.value--;
  }
};

// Generate page numbers for pagination
const pageNumbers = computed(() => {
  const pages = [];
  const maxVisiblePages = 5;
  let startPage = Math.max(
    1,
    currentPage.value - Math.floor(maxVisiblePages / 2)
  );
  let endPage = Math.min(totalPages.value, startPage + maxVisiblePages - 1);

  if (endPage - startPage + 1 < maxVisiblePages) {
    startPage = Math.max(1, endPage - maxVisiblePages + 1);
  }

  for (let i = startPage; i <= endPage; i++) {
    pages.push(i);
  }

  return pages;
});

// Update the computed property to use marketplaceProducts
const visibleProducts = computed(() => {
  return showAllRewards.value
    ? marketplaceProducts.value
    : marketplaceProducts.value.slice(0, 3);
});

// Add new refs for rewards
const rewards = ref([]);
const loadingRewards = ref(new Set());

// Add new method to fetch rewards
const fetchRewards = async () => {
  loading.value = true;
  error.value = null;
  try {
    const response = await rewardsService.getAll();
    rewards.value = response.data;
  } catch (err) {
    error.value = err.response?.data?.message || "Failed to fetch rewards";
  } finally {
    loading.value = false;
  }
};

// Add new method to claim rewards
const claimReward = async (rewardId) => {
  if (loadingRewards.value.has(rewardId)) return;
  
  try {
    loadingRewards.value.add(rewardId);
    const response = await rewardsService.claim(rewardId);
    
    // Update the reward's status in the list
    const rewardIndex = rewards.value.findIndex(r => r.id === rewardId);
    if (rewardIndex !== -1) {
      rewards.value[rewardIndex] = {
        ...rewards.value[rewardIndex],
        isClaimed: true,
        claimedAt: new Date().toISOString()
      };
    }
    
    toast.success(response.data.message || 'Reward claimed successfully!', {
      position: 'top-right',
      autoClose: 3000
    });
    
    // Refresh user data to update GT Coins
    await fetchUserData();
  } catch (error) {
    console.error('Failed to claim reward:', error);
    toast.error(error.response?.data?.message || 'Failed to claim reward', {
      position: 'top-right',
      autoClose: 3000
    });
  } finally {
    loadingRewards.value.delete(rewardId);
  }
};

const fetchUserData = async () => {
  try {
    const response = await authService.getCurrentUser();
    if (response.data && Array.isArray(response.data) && response.data.length > 0) {
      user.value = response.data[0]; // Get the first user object from the array
      localStorage.setItem('user', JSON.stringify(response.data[0]));
      // console.log('Fresh User Data:', response.data[0]);
    }
  } catch (error) {
    console.error('Failed to fetch user data:', error);
    if (error.response?.status === 401) {
      // Token expired or invalid
      localStorage.removeItem('token');
      localStorage.removeItem('user');
      router.push('/auth');
    }
  }
};

// Fetch achievements from API
const fetchAchievements = async () => {
  loading.value = true;
  error.value = null;
  try {
    const response = await achievementsService.getAll();
    achievements.value = response.data.map((achievement) => ({
      name: achievement.name,
      description: achievement.description,
      points: achievement.points,
      status: achievement.isActive === true ? "Completed" : "Progress",
      icon: "🎯",
      updatedAt: new Date(achievement.updatedAt).toLocaleDateString("en-NG", {
        year: "numeric",
        month: "long",
        day: "numeric",
      }),
    }));
  } catch (err) {
    console.error("Failed to fetch achievements:", err);
    error.value = err.response?.data?.message || "Failed to fetch achievements";
  } finally {
    loading.value = false;
  }
};

const fetchMarketplaceProducts = async () => {
  loading.value = true;
  error.value = null;
  try {
    const response = await marketplaceService.getAll();
    marketplaceProducts.value = response.data;
    // console.log("Marketplace products loaded:", marketplaceProducts.value);
  } catch (err) {
    error.value =
      err.response?.data?.message || "Failed to fetch marketplace products";
  } finally {
    loading.value = false;
  }
};

const purchaseProduct = async (productId) => {
  if (loadingProducts.value.has(productId)) return; // Prevent duplicate requests
  
  try {
    loadingProducts.value.add(productId); // Start loading for this product
    
    const purchaseData = {
      message: "Purchase successful",
      voucherCode: "",
      remainingGtc: 480,
      finalAmount: 785,
      discount: 15
    };

    const response = await marketplaceService.purchase(productId, purchaseData);
    
    // Update just the single product's state if needed
    const productIndex = marketplaceProducts.value.findIndex(p => p.id === productId);
    if (productIndex !== -1) {
      marketplaceProducts.value[productIndex] = {
        ...marketplaceProducts.value[productIndex],
        ...response.data
      };
    }
    
    toast.success(response.data.message || 'Product redeemed successfully!', {
      position: 'top-right',
      autoClose: 3000
    });
  } catch (error) {
    console.error('Failed to purchase product:', error);
    toast.error(error.response?.data?.message || 'Failed to redeem product', {
      position: 'top-right',
      autoClose: 3000
    });
  } finally {
    loadingProducts.value.delete(productId); // End loading for this product
  }
};

// Add new pagination state for rewards
const currentRewardsPage = ref(1);
const rewardsPerPage = 5;

// Computed property for paginated rewards
const paginatedRewards = computed(() => {
  const startIndex = (currentRewardsPage.value - 1) * rewardsPerPage;
  const endIndex = startIndex + rewardsPerPage;
  return rewards.value.slice(startIndex, endIndex);
});

// Computed property for total rewards pages
const totalRewardsPages = computed(() => {
  return Math.ceil(rewards.value.length / rewardsPerPage);
});

// Navigation methods for rewards
const goToRewardsPage = (page) => {
  if (page >= 1 && page <= totalRewardsPages.value) {
    currentRewardsPage.value = page;
  }
};

const nextRewardsPage = () => {
  if (currentRewardsPage.value < totalRewardsPages.value) {
    currentRewardsPage.value++;
  }
};

const previousRewardsPage = () => {
  if (currentRewardsPage.value > 1) {
    currentRewardsPage.value--;
  }
};

// Generate page numbers for rewards pagination
const rewardsPageNumbers = computed(() => {
  const pages = [];
  const maxVisiblePages = 5;
  let startPage = Math.max(
    1,
    currentRewardsPage.value - Math.floor(maxVisiblePages / 2)
  );
  let endPage = Math.min(totalRewardsPages.value, startPage + maxVisiblePages - 1);

  if (endPage - startPage + 1 < maxVisiblePages) {
    startPage = Math.max(1, endPage - maxVisiblePages + 1);
  }

  for (let i = startPage; i <= endPage; i++) {
    pages.push(i);
  }

  return pages;
});

// Update onMounted to include fetchRewards
onMounted(() => {
  fetchRewards();
  fetchAchievements();
  fetchMarketplaceProducts();
  fetchUserData();
});
</script>

<style scoped>
.rewards-container {
  @apply bg-gradient-to-br from-gray-50 to-orange-50 min-h-screen;
}

/* Custom scrollbar styles */
.scrollbar-thin::-webkit-scrollbar {
  height: 6px;
}

.scrollbar-thin::-webkit-scrollbar-track {
  background: transparent;
}

.scrollbar-thin::-webkit-scrollbar-thumb {
  background-color: rgb(254 215 170);
  border-radius: 3px;
}

.scrollbar-thin::-webkit-scrollbar-thumb:hover {
  background-color: rgb(251 146 60);
}

@media (max-width: 768px) {
  .scrollbar-thin::-webkit-scrollbar {
    height: 4px;
  }
}
</style>
