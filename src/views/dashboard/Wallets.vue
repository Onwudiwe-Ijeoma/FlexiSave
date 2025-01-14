<template>
  <div class="wallets-container p-4 md:p-8 bg-gray-50">
    <!-- Main Wallet Cards -->
    <div class="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6 mb-8">
      <!-- Primary Wallet -->
      <div class="bg-gradient-to-r from-orange-500 to-orange-600 rounded-xl p-6 shadow-lg transform hover:scale-[1.02] transition-all duration-300">
        <div class="flex justify-between items-start mb-4">
          <div>
            <h3 class="text-white/80 text-sm font-medium">Main Wallet</h3>
            <p class="text-3xl font-bold text-white mt-1">₦{{ formatAmount(mainBalance) }}</p>
          </div>
          <div class="bg-white/20 p-2 rounded-lg">
            <span class="text-2xl">💰</span>
          </div>
        </div>
        <div class="flex gap-3 mt-6">
          <button @click="showFundWalletModal = true" 
            class="flex-1 bg-white text-orange-600 px-4 py-2 rounded-lg text-sm font-medium hover:bg-orange-50 transition-colors flex items-center justify-center gap-2">
            <span>Fund Wallet</span>
            <span>+</span>
          </button>
          <button @click="showTransferModal = true"
            class="flex-1 bg-white/10 text-white border border-white/20 px-4 py-2 rounded-lg text-sm font-medium hover:bg-white/20 transition-colors">
            Transfer
          </button>
        </div>
      </div>

      <!-- Savings Wallet -->
      <div class="bg-gradient-to-r from-blue-500 to-blue-600 rounded-xl p-6 shadow-lg transform hover:scale-[1.02] transition-all duration-300">
        <div class="flex justify-between items-start mb-4">
          <div>
            <h3 class="text-white/80 text-sm font-medium">Savings Wallet</h3>
            <p class="text-3xl font-bold text-white mt-1">₦{{ formatAmount(savingsBalance) }}</p>
          </div>
          <div class="bg-white/20 p-2 rounded-lg">
            <span class="text-2xl">🏦</span>
          </div>
        </div>
        <div class="mt-2">
          <p class="text-blue-100 text-sm">Interest Rate: 12% per annum</p>
          <div class="mt-4 bg-white/10 rounded-lg p-3">
            <div class="flex justify-between text-sm text-white mb-1">
              <span>Monthly Interest Earned</span>
              <span class="font-medium">₦{{ formatAmount(monthlyInterest) }}</span>
            </div>
          </div>
        </div>
      </div>

      <!-- Investment Wallet -->
      <div class="bg-gradient-to-r from-purple-500 to-purple-600 rounded-xl p-6 shadow-lg transform hover:scale-[1.02] transition-all duration-300">
        <div class="flex justify-between items-start mb-4">
          <div>
            <h3 class="text-white/80 text-sm font-medium">Investment Wallet</h3>
            <p class="text-3xl font-bold text-white mt-1">₦{{ formatAmount(investmentBalance) }}</p>
          </div>
          <div class="bg-white/20 p-2 rounded-lg">
            <span class="text-2xl">📈</span>
          </div>
        </div>
        <div class="mt-2">
          <p class="text-purple-100 text-sm">Portfolio Performance</p>
          <div class="flex items-center gap-2 mt-1">
            <span class="text-green-300 text-sm">+8.5%</span>
            <div class="flex-1 bg-white/10 h-2 rounded-full overflow-hidden">
              <div class="w-[85%] h-full bg-green-400 rounded-full"></div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Quick Actions -->
    <div class="bg-white rounded-xl shadow-lg p-6 mb-8">
      <h3 class="text-lg font-semibold mb-4">Quick Actions</h3>
      <div class="grid grid-cols-2 sm:grid-cols-4 gap-4">
        <button class="p-4 rounded-xl border-2 border-gray-100 hover:border-orange-500 hover:bg-orange-50 transition-all group">
          <div class="w-12 h-12 rounded-full bg-orange-100 flex items-center justify-center mb-3 mx-auto group-hover:bg-orange-200">
            <span class="text-2xl">📱</span>
          </div>
          <p class="text-sm font-medium text-center">Buy Airtime</p>
        </button>
        <button class="p-4 rounded-xl border-2 border-gray-100 hover:border-orange-500 hover:bg-orange-50 transition-all group">
          <div class="w-12 h-12 rounded-full bg-orange-100 flex items-center justify-center mb-3 mx-auto group-hover:bg-orange-200">
            <span class="text-2xl">📡</span>
          </div>
          <p class="text-sm font-medium text-center">Buy Data</p>
        </button>
        <button class="p-4 rounded-xl border-2 border-gray-100 hover:border-orange-500 hover:bg-orange-50 transition-all group">
          <div class="w-12 h-12 rounded-full bg-orange-100 flex items-center justify-center mb-3 mx-auto group-hover:bg-orange-200">
            <span class="text-2xl">🏦</span>
          </div>
          <p class="text-sm font-medium text-center">Bank Transfer</p>
        </button>
        <button class="p-4 rounded-xl border-2 border-gray-100 hover:border-orange-500 hover:bg-orange-50 transition-all group">
          <div class="w-12 h-12 rounded-full bg-orange-100 flex items-center justify-center mb-3 mx-auto group-hover:bg-orange-200">
            <span class="text-2xl">💳</span>
          </div>
          <p class="text-sm font-medium text-center">Cards</p>
        </button>
      </div>
    </div>

    <!-- Recent Transactions -->
    <div class="bg-white rounded-xl shadow-lg overflow-hidden">
      <div class="bg-gradient-to-r from-orange-500 to-orange-600 p-4">
        <h3 class="text-lg font-semibold text-white">Recent Transactions</h3>
      </div>
      <div class="p-6">
        <div class="space-y-4">
          <div v-for="transaction in recentTransactions" :key="transaction.id" 
            class="flex items-center justify-between p-4 hover:bg-orange-50 rounded-xl transition-all cursor-pointer group">
            <div class="flex items-center gap-4">
              <div class="w-12 h-12 rounded-xl bg-orange-100 flex items-center justify-center">
                <span class="text-2xl">{{ transaction.icon }}</span>
              </div>
              <div>
                <p class="font-medium text-gray-900">{{ transaction.description }}</p>
                <p class="text-sm text-gray-500">{{ transaction.date }}</p>
              </div>
            </div>
            <div class="text-right">
              <p :class="[
                'font-semibold group-hover:scale-105 transition-transform',
                transaction.type === 'credit' ? 'text-green-600' : 'text-red-600'
              ]">
                {{ transaction.type === 'credit' ? '+' : '-' }}₦{{ formatAmount(transaction.amount) }}
              </p>
              <p class="text-xs" :class="transaction.type === 'credit' ? 'text-green-500' : 'text-red-500'">
                {{ transaction.status }}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'

// Wallet Balances
const mainBalance = ref(250000.00)
const savingsBalance = ref(1500000.00)
const investmentBalance = ref(750000.00)
const monthlyInterest = ref(15000.00)

// Modal States
const showFundWalletModal = ref(false)
const showTransferModal = ref(false)

// Sample Transactions
const recentTransactions = ref([
  {
    id: 1,
    description: "Wallet Funding",
    amount: 50000,
    date: "Today, 2:30 PM",
    icon: "💰",
    type: "credit",
    status: "Successful"
  },
  {
    id: 2,
    description: "Transfer to Savings",
    amount: 25000,
    date: "Yesterday, 4:15 PM",
    icon: "🏦",
    type: "debit",
    status: "Completed"
  },
  {
    id: 3,
    description: "Airtime Purchase",
    amount: 1000,
    date: "Mar 15, 2024",
    icon: "📱",
    type: "debit",
    status: "Successful"
  },
  {
    id: 4,
    description: "Investment Deposit",
    amount: 100000,
    date: "Mar 12, 2024",
    icon: "📈",
    type: "debit",
    status: "Completed"
  }
])

// Utility Functions
const formatAmount = (value) => {
  return new Intl.NumberFormat('en-NG').format(value || 0)
}
</script>

<style scoped>
.wallets-container {
  min-height: 100vh;
}
</style> 