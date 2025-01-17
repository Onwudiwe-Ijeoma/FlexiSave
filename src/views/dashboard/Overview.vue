<template>
  <div class="overview-container p-4 md:p-8">
    <div class="max-w-7xl mx-auto">
      <!-- Welcome Section -->
      <div class="welcome-card bg-gradient-to-r from-orange-500 to-orange-600 p-6 rounded-xl shadow-lg mb-8 animate-fade-in">
        <div class="relative">
          <div class="flex flex-col md:flex-row justify-center items-center md:items-center gap-4">
            <div class="animate-slide-up">
              <h2 class="text-2xl md:text-3xl font-bold text-white mb-2">Welcome back, John!</h2>
              <p class="text-orange-50 text-base">Track your financial progress</p>
            </div>
            <!-- <button class="glass-button px-4 py-2 rounded-lg text-white font-medium hover:bg-white/20 transition-all animate-slide-left">
              View Profile
            </button> -->
          </div>
        </div>
      </div>

      <!-- Quick Access Cards -->
      <div class="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
        <router-link to="/dashboard/savings" class="group h-full animate-fade-in-up" style="animation-delay: 100ms;">
          <div class="quick-access-card bg-white h-full p-6 rounded-xl shadow-md hover:shadow-lg transition-all duration-300 border border-gray-100">
            <div class="flex items-center gap-4 mb-3">
              <div class="w-12 h-12 bg-orange-50 rounded-lg flex items-center justify-center transition-transform duration-300">
                <span class="text-2xl">💰</span>
              </div>
              <h3 class="font-semibold text-gray-800">Savings</h3>
            </div>
            <p class="text-sm text-gray-600">Track & grow your wealth</p>
          </div>
        </router-link>

        <router-link to="/dashboard/rewards" class="group h-full animate-fade-in-up" style="animation-delay: 200ms;">
          <div class="quick-access-card bg-white h-full p-6 rounded-xl shadow-md hover:shadow-lg transition-all duration-300 border border-gray-100">
            <div class="flex items-center gap-4 mb-3">
              <div class="w-12 h-12 bg-purple-50 rounded-lg flex items-center justify-center transition-transform duration-300">
                <span class="text-2xl">🎁</span>
              </div>
              <h3 class="font-semibold text-gray-800">Rewards</h3>
            </div>
            <p class="text-sm text-gray-600">Claim your benefits</p>
          </div>
        </router-link>

        <router-link to="/dashboard/leaderboards" class="group h-full animate-fade-in-up" style="animation-delay: 300ms;">
          <div class="quick-access-card bg-white h-full p-6 rounded-xl shadow-md hover:shadow-lg transition-all duration-300 border border-gray-100">
            <div class="flex items-center gap-4 mb-3">
              <div class="w-12 h-12 bg-yellow-50 rounded-lg flex items-center justify-center transition-transform duration-300">
                <span class="text-2xl">🏆</span>
              </div>
              <h3 class="font-semibold text-gray-800">Rankings</h3>
            </div>
            <p class="text-sm text-gray-600">See where you stand</p>
          </div>
        </router-link>

        <router-link to="/dashboard/quests" class="group h-full animate-fade-in-up" style="animation-delay: 400ms;">
          <div class="quick-access-card bg-white h-full p-6 rounded-xl shadow-md hover:shadow-lg transition-all duration-300 border border-gray-100">
            <div class="flex items-center gap-4 mb-3">
              <div class="w-12 h-12 bg-indigo-50 rounded-lg flex items-center justify-center transition-transform duration-300">
                <span class="text-2xl">⚔️</span>
              </div>
              <h3 class="font-semibold text-gray-800">Quests</h3>
            </div>
            <p class="text-sm text-gray-600">Complete challenges</p>
          </div>
        </router-link>
      </div>

      <!-- Stats Grid -->
      <div class="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
        <!-- Savings Overview Card -->
        <div class="stats-card bg-white p-6 rounded-xl shadow-md animate-fade-in-up" style="animation-delay: 500ms;">
          <div class="flex justify-between items-start mb-6">
            <div>
              <h3 class="text-xl font-semibold text-gray-800 mb-1">Savings Overview</h3>
              <p class="text-sm text-gray-600">Your 6-month progress</p>
            </div>
            <button class="stats-button px-4 py-2 rounded-lg text-orange-600 hover:bg-orange-50 transition-colors">
              View Details
            </button>
          </div>
          <div class="h-80 chart-container">
            <canvas ref="savingsChart"></canvas>
          </div>
        </div>

        <!-- Goals Progress -->
        <div class="stats-card bg-white p-6 rounded-xl shadow-md animate-fade-in-up" style="animation-delay: 600ms;">
          <div class="flex justify-between items-start mb-6">
            <div>
              <h3 class="text-xl font-semibold text-gray-800 mb-1">Savings Goals</h3>
              <p class="text-sm text-gray-600">Track your targets</p>
            </div>
            <button class="stats-button px-4 py-2 rounded-lg text-orange-600 hover:bg-orange-50 transition-colors">
              Add Goal
            </button>
          </div>
          <div class="space-y-6">
            <div class="goal-item transition-transform duration-300">
              <div class="flex justify-between items-center mb-2">
                <div>
                  <span class="text-base font-medium text-gray-800">House Down Payment</span>
                  <p class="text-sm text-gray-500">₦2,000,000 / ₦3,000,000</p>
                </div>
                <span class="text-sm font-semibold text-orange-600">75%</span>
              </div>
              <div class="w-full bg-gray-100 rounded-full h-2">
                <div class="progress-bar h-2 rounded-full" style="width: 75%"></div>
              </div>
            </div>
            <div class="goal-item transition-transform duration-300">
              <div class="flex justify-between items-center mb-2">
                <div>
                  <span class="text-base font-medium text-gray-800">New Car</span>
                  <p class="text-sm text-gray-500">₦900,000 / ₦2,000,000</p>
                </div>
                <span class="text-sm font-semibold text-orange-600">45%</span>
              </div>
              <div class="w-full bg-gray-100 rounded-full h-2">
                <div class="progress-bar h-2 rounded-full" style="width: 45%"></div>
              </div>
            </div>
            <div class="goal-item transition-transform duration-300">
              <div class="flex justify-between items-center mb-2">
                <div>
                  <span class="text-base font-medium text-gray-800">Emergency Fund</span>
                  <p class="text-sm text-gray-500">₦450,000 / ₦500,000</p>
                </div>
                <span class="text-sm font-semibold text-orange-600">90%</span>
              </div>
              <div class="w-full bg-gray-100 rounded-full h-2">
                <div class="progress-bar h-2 rounded-full" style="width: 90%"></div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Recent Activity & Rewards -->
      <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
        <!-- Recent Activity -->
        <div class="activity-card bg-white rounded-xl shadow-md overflow-hidden animate-fade-in-up" style="animation-delay: 700ms;">
          <div class="bg-gradient-to-r from-orange-500 to-orange-600 p-4">
            <h3 class="text-lg font-semibold text-white">Recent Activity</h3>
          </div>
          <div class="p-6">
            <div class="space-y-4">
              <div class="activity-item flex items-center gap-4 p-4 hover:bg-gray-50 rounded-lg transition-all duration-300 cursor-pointer">
                <div class="w-10 h-10 bg-green-50 rounded-lg flex items-center justify-center">
                  <span class="text-xl">💰</span>
                </div>
                <div class="flex-1">
                  <p class="text-sm font-medium text-gray-800">Savings Deposit</p>
                  <p class="text-xs text-gray-500">Today, 10:30 AM</p>
                </div>
                <p class="text-sm font-medium text-green-600">+₦50,000</p>
              </div>
              <div class="activity-item flex items-center gap-4 p-4 hover:bg-gray-50 rounded-lg transition-all duration-300 cursor-pointer">
                <div class="w-10 h-10 bg-orange-50 rounded-lg flex items-center justify-center">
                  <span class="text-xl">🎯</span>
                </div>
                <div class="flex-1">
                  <p class="text-sm font-medium text-gray-800">Goal Achieved</p>
                  <p class="text-xs text-gray-500">Yesterday</p>
                </div>
                <p class="text-sm font-medium text-orange-600">+100 Points</p>
              </div>
              <div class="activity-item flex items-center gap-4 p-4 hover:bg-gray-50 rounded-lg transition-all duration-300 cursor-pointer">
                <div class="w-10 h-10 bg-purple-50 rounded-lg flex items-center justify-center">
                  <span class="text-xl">🎁</span>
                </div>
                <div class="flex-1">
                  <p class="text-sm font-medium text-gray-800">Reward Redeemed</p>
                  <p class="text-xs text-gray-500">2 days ago</p>
                </div>
                <p class="text-sm font-medium text-purple-600">-200 GT Coins</p>
              </div>
            </div>
          </div>
        </div>

        <!-- Available Rewards -->
        <div class="rewards-card bg-white rounded-xl shadow-md overflow-hidden animate-fade-in-up" style="animation-delay: 800ms;">
          <div class="bg-gradient-to-r from-orange-500 to-orange-600 p-4">
            <h3 class="text-lg font-semibold text-white">Available Rewards</h3>
          </div>
          <div class="p-6">
            <div class="space-y-4">
              <div class="reward-item group flex items-center gap-4 p-4 hover:bg-gray-50 rounded-lg transition-all duration-300 cursor-pointer">
                <div class="w-10 h-10 bg-yellow-50 rounded-lg flex items-center justify-center">
                  <span class="text-xl">🎟️</span>
                </div>
                <div class="flex-1">
                  <p class="text-sm font-medium text-gray-800">Movie Tickets</p>
                  <p class="text-xs text-gray-500">2 Premium Tickets</p>
                </div>
                <button class="reward-button px-3 py-1.5 text-sm font-medium text-orange-600 bg-orange-50 rounded-lg hover:bg-orange-100 transition-colors">
                  600 GT Coins
                </button>
              </div>
              <div class="reward-item group flex items-center gap-4 p-4 hover:bg-gray-50 rounded-lg transition-all duration-300 cursor-pointer">
                <div class="w-10 h-10 bg-blue-50 rounded-lg flex items-center justify-center">
                  <span class="text-xl">📱</span>
                </div>
                <div class="flex-1">
                  <p class="text-sm font-medium text-gray-800">Airtime Voucher</p>
                  <p class="text-xs text-gray-500">₦1000 Airtime</p>
                </div>
                <button class="reward-button px-3 py-1.5 text-sm font-medium text-orange-600 bg-orange-50 rounded-lg hover:bg-orange-100 transition-colors">
                  200 GT Coins
                </button>
              </div>
              <div class="reward-item group flex items-center gap-4 p-4 hover:bg-gray-50 rounded-lg transition-all duration-300 cursor-pointer">
                <div class="w-10 h-10 bg-green-50 rounded-lg flex items-center justify-center">
                  <span class="text-xl">🛍️</span>
                </div>
                <div class="flex-1">
                  <p class="text-sm font-medium text-gray-800">Shopping Voucher</p>
                  <p class="text-xs text-gray-500">₦5000 Store Credit</p>
                </div>
                <button class="reward-button px-3 py-1.5 text-sm font-medium text-orange-600 bg-orange-50 rounded-lg hover:bg-orange-100 transition-colors">
                  500 GT Coins
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import Chart from 'chart.js/auto';

const savingsChart = ref(null);

onMounted(() => {
  const ctx = savingsChart.value.getContext('2d');
  
  new Chart(ctx, {
    type: 'bar',
    data: {
      labels: ['Aug', 'Sep', 'Oct', 'Nov', 'Dec', 'Jan'],
      datasets: [{
        label: 'Monthly Savings (₦)',
        data: [45000, 52000, 49000, 60000, 55000, 70000],
        backgroundColor: 'rgba(249, 115, 22, 0.2)',
        borderColor: 'rgb(249, 115, 22)',
        borderWidth: 2,
        borderRadius: 0,
        hoverBackgroundColor: 'rgba(249, 115, 22, 0.4)',
        barThickness: 32
      }]
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      plugins: {
        legend: {
          display: false
        },
        tooltip: {
          backgroundColor: 'rgba(255, 255, 255, 0.9)',
          titleColor: '#1f2937',
          bodyColor: '#1f2937',
          padding: 12,
          borderColor: 'rgba(249, 115, 22, 0.1)',
          borderWidth: 1,
          displayColors: false,
          callbacks: {
            label: function(context) {
              return '₦' + context.raw.toLocaleString();
            }
          }
        }
      },
      scales: {
        y: {
          beginAtZero: true,
          grid: {
            display: true,
            color: 'rgba(0, 0, 0, 0.05)'
          },
          ticks: {
            padding: 10,
            callback: function(value) {
              return '₦' + value.toLocaleString();
            }
          }
        },
        x: {
          grid: {
            display: false
          },
          ticks: {
            padding: 10
          }
        }
      },
      animation: {
        duration: 2000,
        easing: 'easeOutQuart'
      }
    }
  });
});
</script>

<style scoped>
.overview-container {
  @apply bg-gray-50 min-h-screen;
}

.glass-button {
  @apply bg-white/10 backdrop-blur-sm border border-white/20;
}

.progress-bar {
  @apply bg-orange-500;
}

.chart-container {
  @apply relative;
}

.quick-access-card,
.stats-card,
.activity-card,
.rewards-card {
  @apply transition-all duration-300;
}

.quick-access-card:hover,
.stats-card:hover,
.activity-card:hover,
.rewards-card:hover {
  @apply shadow-lg;
}

.activity-item,
.reward-item {
  @apply relative;
}

.reward-button {
  @apply transition-colors duration-300;
}

@keyframes fade-in {
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
}

@keyframes slide-up {
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

@keyframes slide-left {
  from {
    opacity: 0;
    transform: translateX(20px);
  }
  to {
    opacity: 1;
    transform: translateX(0);
  }
}

@keyframes fade-in-up {
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.animate-fade-in {
  animation: fade-in 0.6s ease-out forwards;
}

.animate-slide-up {
  animation: slide-up 0.6s ease-out forwards;
}

.animate-slide-left {
  animation: slide-left 0.6s ease-out forwards;
}

.animate-fade-in-up {
  animation: fade-in-up 0.6s ease-out forwards;
  opacity: 0;
}
</style>
