<template>
  <div class="savings-container p-4 md:p-6">
    <!-- Main Balance Card -->
    <div class="balance-card bg-white p-4 md:p-6 rounded-lg shadow mb-4 md:mb-8">
      <h3 class="text-gray-600 mb-2 text-sm md:text-base">Total Balance</h3>
      <div class="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <p class="text-2xl md:text-4xl font-bold">597,475.00 <span class="text-sm">NGN</span></p>
        </div>
        <div class="flex gap-2 md:gap-4">
          <button class="bg-orange-600 text-white px-3 md:px-4 py-2 rounded-lg flex items-center gap-2 text-sm md:text-base flex-1 sm:flex-none justify-center">
            SAVE <span class="text-xl">+</span>
          </button>
          <button class="border border-gray-300 px-3 md:px-4 py-2 rounded-lg flex items-center gap-2 text-sm md:text-base flex-1 sm:flex-none justify-center">
            Withdraw <span class="text-xl">↓</span>
          </button>
        </div>
      </div>
    </div>

    <!-- Savings Plan Cards -->
    <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6 mb-4 md:mb-8">
      <!-- Personal Savings -->
      <div class="savings-type-card bg-white p-4 rounded-lg shadow">
        <div class="flex items-center gap-3 mb-2">
          <div class="icon-circle bg-purple-100 p-2 rounded-full">
            <span class="text-purple-600">🎯</span>
          </div>
          <h4 class="text-sm md:text-base">PERSONAL SAVINGS</h4>
        </div>
        <button class="text-orange-600 text-sm md:text-base">Get Started</button>
      </div>

      <!-- Target Savings -->
      <div class="savings-type-card bg-white p-4 rounded-lg shadow">
        <div class="flex items-center gap-3 mb-2">
          <div class="icon-circle bg-blue-100 p-2 rounded-full">
            <span class="text-blue-600">🎯</span>
          </div>
          <h4 class="text-sm md:text-base">TARGET SAVINGS</h4>
        </div>
        <button class="text-orange-600 text-sm md:text-base">Get Started</button>
      </div>

      <!-- Safe Box -->
      <div class="savings-type-card bg-white p-4 rounded-lg shadow">
        <div class="flex items-center gap-3 mb-2">
          <div class="icon-circle bg-orange-100 p-2 rounded-full">
            <span class="text-orange-600">🔒</span>
          </div>
          <h4 class="text-sm md:text-base">SAFE BOX</h4>
        </div>
        <button class="text-orange-600 text-sm md:text-base">Get Started</button>
      </div>
    </div>

    <!-- Transaction History -->
    <div class="bg-white rounded-lg shadow">
      <div class="bg-orange-600 text-white p-3 md:p-4 rounded-t-lg">
        <h3 class="text-sm md:text-base font-medium">Transaction History</h3>
      </div>
      <div class="p-3 md:p-4">
        <div class="transaction-item flex flex-col sm:flex-row sm:items-center justify-between py-3 border-b gap-2 sm:gap-4">
          <div class="flex items-center gap-4">
            <span class="icon text-xl">🏠</span>
            <div>
              <p class="font-medium text-sm md:text-base">House Rent savings</p>
            </div>
          </div>
          <div class="flex items-center justify-between sm:justify-end gap-4 text-sm md:text-base">
            <p class="text-gray-600">01 May, 2024</p>
            <p class="text-orange-600">2,000,000.00</p>
          </div>
        </div>
        <div class="transaction-item flex flex-col sm:flex-row sm:items-center justify-between py-3 border-b gap-2 sm:gap-4">
          <div class="flex items-center gap-4">
            <span class="icon text-xl">✈️</span>
            <div>
              <p class="font-medium text-sm md:text-base">Flight Ticket</p>
            </div>
          </div>
          <div class="flex items-center justify-between sm:justify-end gap-4 text-sm md:text-base">
            <p class="text-gray-600">27 September 2024</p>
            <p class="text-orange-600">2,500,000.00</p>
          </div>
        </div>
        <div class="transaction-item flex flex-col sm:flex-row sm:items-center justify-between py-3 gap-2 sm:gap-4">
          <div class="flex items-center gap-4">
            <span class="icon text-xl">💰</span>
            <div>
              <p class="font-medium text-sm md:text-base">Monthly Saving</p>
            </div>
          </div>
          <div class="flex items-center justify-between sm:justify-end gap-4 text-sm md:text-base">
            <p class="text-gray-600">25 December 2024</p>
            <p class="text-orange-600">1,000,000.00</p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
// Component logic here
</script>

<style scoped>
.savings-container {
  background-color: #f5f5f5;
  min-height: 100vh;
}

.balance-card {
  background: white;
}

.savings-type-card {
  transition: all 0.3s ease;
}

.savings-type-card:hover {
  transform: translateY(-2px);
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
}

.icon-circle {
  width: 40px;
  height: 40px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 50%;
}

.transaction-item:last-child {
  border-bottom: none;
}

@media (max-width: 640px) {
  .icon-circle {
    width: 32px;
    height: 32px;
  }
}
</style>