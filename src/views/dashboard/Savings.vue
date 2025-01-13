<template>
  <div class="savings-container p-4 md:p-8 bg-gray-50">
    <!-- Main Balance Card -->
    <div class="balance-card bg-gradient-to-r from-orange-500 to-orange-600 p-6 md:p-8 rounded-xl shadow-lg mb-8 animate-fade-in">
      <div class="relative">
        <div class="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full -mr-16 -mt-16 blur-xl"></div>
        <h3 class="text-white/80 mb-2 text-sm md:text-base font-medium animate-slide-up">Total Balance</h3>
        <div class="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div class="relative animate-slide-up" style="animation-delay: 200ms;">
            <p class="text-3xl md:text-5xl font-bold text-white">{{ formatAmount(totalBalance) }} 
              <span class="text-sm text-white/80">NGN</span>
            </p>
            <p class="text-orange-100 text-sm mt-2">+2.5% from last month</p>
          </div>
          <div class="flex flex-col sm:flex-row gap-3 md:gap-4 w-full sm:w-auto animate-slide-left" style="animation-delay: 400ms;">
            <button 
              @click="showSaveModal = true"
              class="bg-white text-orange-600 px-6 md:px-8 py-3 rounded-xl flex items-center justify-center gap-2 text-sm md:text-base font-medium hover:bg-orange-50 transition-all duration-300 shadow-md min-w-[140px]"
            >
              Add Funds <span class="text-xl">+</span>
            </button>
            <button 
              @click="showWithdrawModal = true"
              class="bg-white/10 backdrop-blur-sm text-white border border-white/20 px-6 md:px-8 py-3 rounded-xl flex items-center justify-center gap-2 text-sm md:text-base font-medium hover:bg-white/20 transition-all duration-300 min-w-[140px]"
            >
              Withdraw <span class="text-xl">↓</span>
            </button>
          </div>
        </div>
      </div>
    </div>

    <!-- Quick Stats -->
    <div class="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6 mb-8">
      <div class="bg-white p-4 rounded-xl shadow-md hover:shadow-lg transition-all duration-300 animate-fade-in-up" style="animation-delay: 200ms;">
        <div class="text-gray-500 text-sm mb-1">Monthly Savings</div>
        <div class="text-xl font-bold">₦45,000</div>
        <div class="text-green-500 text-xs flex items-center gap-1 mt-2">
          <svg class="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6"></path>
          </svg>
          +12.5%
        </div>
      </div>
      <div class="bg-white p-4 rounded-xl shadow-md hover:shadow-lg transition-all duration-300 animate-fade-in-up" style="animation-delay: 300ms;">
        <div class="text-gray-500 text-sm mb-1">Savings Goal</div>
        <div class="text-xl font-bold">75%</div>
        <div class="w-full bg-gray-200 h-1.5 rounded-full mt-2">
          <div class="bg-orange-600 h-full rounded-full" style="width: 75%"></div>
        </div>
      </div>
      <div class="bg-white p-4 rounded-xl shadow-md hover:shadow-lg transition-all duration-300 animate-fade-in-up" style="animation-delay: 400ms;">
        <div class="text-gray-500 text-sm mb-1">Interest Earned</div>
        <div class="text-xl font-bold">₦12,450</div>
        <div class="text-orange-600 text-xs flex items-center gap-1 mt-2">
          <svg class="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6"></path>
          </svg>
          This Month
        </div>
      </div>
      <div class="bg-white p-4 rounded-xl shadow-md hover:shadow-lg transition-all duration-300 animate-fade-in-up" style="animation-delay: 500ms;">
        <div class="text-gray-500 text-sm mb-1">Saving Streak</div>
        <div class="text-xl font-bold">15 Days</div>
        <div class="text-green-500 text-xs flex items-center gap-1 mt-2">
          <svg class="w-3 h-3" fill="currentColor" viewBox="0 0 20 20">
            <path fill-rule="evenodd" d="M6.267 3.455a3.066 3.066 0 001.745-.723 3.066 3.066 0 013.976 0 3.066 3.066 0 001.745.723 3.066 3.066 0 012.812 2.812c.051.643.304 1.254.723 1.745a3.066 3.066 0 010 3.976 3.066 3.066 0 00-.723 1.745 3.066 3.066 0 01-2.812 2.812 3.066 3.066 0 00-1.745.723 3.066 3.066 0 01-3.976 0 3.066 3.066 0 00-1.745-.723 3.066 3.066 0 01-2.812-2.812 3.066 3.066 0 00-.723-1.745 3.066 3.066 0 010-3.976 3.066 3.066 0 00.723-1.745 3.066 3.066 0 012.812-2.812zm7.44 5.252a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd"></path>
          </svg>
          Keep it up!
        </div>
      </div>
    </div>

    <!-- Savings Plan Cards -->
    <div class="mb-8">
      <div class="flex justify-between items-center mb-6">
        <div>
          <h3 class="text-xl font-semibold text-gray-800">Savings Plans</h3>
          <p class="text-sm text-gray-600 mt-1">Your active savings goals</p>
        </div>
        <button 
          @click="showCreatePlanModal = true"
          class="px-6 py-3 text-sm font-medium text-white bg-gradient-to-r from-orange-500 to-orange-600 rounded-lg hover:from-orange-600 hover:to-orange-700 flex items-center gap-2 shadow-md hover:shadow-lg transition-all duration-300"
        >
          <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4"/>
          </svg>
          Create New Plan
        </button>
      </div>

      <!-- Loading State -->
      <div v-if="isLoading" class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
        <div v-for="n in 3" :key="n" class="bg-white p-6 rounded-xl shadow-md animate-pulse">
          <div class="flex items-start gap-4 mb-4">
            <div class="w-12 h-12 bg-gray-200 rounded-xl"></div>
            <div class="flex-1">
              <div class="h-5 bg-gray-200 rounded w-3/4 mb-2"></div>
              <div class="h-4 bg-gray-200 rounded w-1/2"></div>
            </div>
          </div>
          <div class="space-y-3">
            <div class="h-8 bg-gray-200 rounded"></div>
            <div class="h-4 bg-gray-200 rounded w-full"></div>
          </div>
        </div>
      </div>

      <!-- Error State -->
      <div v-else-if="error" class="bg-red-50 p-4 rounded-lg">
        <p class="text-red-600">{{ error }}</p>
        <button @click="fetchSavingsPlans" class="text-red-700 underline mt-2">Try Again</button>
      </div>

      <!-- Empty State -->
      <div v-else-if="!savingsPlans.length" class="text-center py-12 bg-white rounded-xl border-2 border-dashed border-gray-300">
        <div class="w-16 h-16 rounded-full bg-orange-100 flex items-center justify-center mb-4 mx-auto">
          <svg class="w-8 h-8 text-orange-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6"/>
          </svg>
        </div>
        <h4 class="font-semibold text-lg text-gray-800 mb-2">No Savings Plans Yet</h4>
        <p class="text-gray-500 text-sm">Create your first savings plan to start tracking your goals</p>
      </div>

      <!-- Savings Plans Display -->
      <div v-else>
        <!-- Cards Grid -->
        <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
          <div v-for="plan in displayedPlans" :key="plan.id" 
            class="bg-white p-6 rounded-xl shadow-md hover:shadow-lg transition-all duration-300 border border-gray-100"
          >
            <div class="flex items-start gap-4 mb-4">
              <div :style="{ backgroundColor: plan.color + '20' }" class="p-3 rounded-xl shadow-lg">
                <span class="text-2xl">{{ plan.icon || '💰' }}</span>
              </div>
              <div class="flex-1 min-w-0">
                <h4 class="font-semibold text-lg truncate">{{ plan.name }}</h4>
                <p class="text-gray-500 text-sm line-clamp-2">{{ plan.description || 'No description' }}</p>
              </div>
            </div>

            <div class="flex flex-wrap gap-2 mb-4">
              <span class="text-xs font-medium px-2 py-1 rounded-full" 
                :class="plan.shouldLock ? 'bg-orange-100 text-orange-700' : 'bg-green-100 text-green-700'"
              >
                {{ plan.shouldLock ? 'Locked' : 'Unlocked' }}
              </span>
              <span class="text-xs font-medium px-2 py-1 rounded-full bg-gray-100 text-gray-700">
                {{ plan.frequency }}
              </span>
            </div>

            <div class="grid grid-cols-2 gap-4 mb-4">
              <div class="bg-gray-50 p-3 rounded-lg">
                <span class="text-gray-600 text-xs block mb-1">Current Amount</span>
                <span class="font-medium text-gray-900 text-sm md:text-base block">₦{{ formatAmount(plan.amount) }}</span>
              </div>
              <div class="bg-gray-50 p-3 rounded-lg">
                <span class="text-gray-600 text-xs block mb-1">Target Amount</span>
                <span class="font-medium text-gray-900 text-sm md:text-base block">₦{{ formatAmount(plan.targetAmount) }}</span>
              </div>
            </div>

            <div class="space-y-2">
              <div class="flex justify-between items-center text-sm text-gray-600">
                <span>Progress</span>
                <span class="font-medium">{{ ((plan.amount / plan.targetAmount) * 100).toFixed(1) }}%</span>
              </div>
              <div class="w-full bg-gray-200 h-2 rounded-full">
                <div 
                  class="h-full rounded-full transition-all duration-500"
                  :style="{ 
                    width: `${(plan.amount/ plan.targetAmount) * 100}%`,
                    backgroundColor: plan.color 
                  }"
                ></div>
              </div>
            </div>
          </div>
        </div>

        <!-- View All Link -->
        <div v-if="savingsPlans.length > 3" class="text-center mt-6">
          <button 
            v-if="!showAllPlans"
            @click="showAllPlans = true"
            class="text-orange-600 hover:text-orange-700 font-medium inline-flex items-center gap-2"
          >
            View All Savings Plans
            <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7"/>
            </svg>
          </button>
          <button 
            v-else
            @click="showAllPlans = false"
            class="text-orange-600 hover:text-orange-700 font-medium inline-flex items-center gap-2"
          >
            View Less
            <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 15l7-7 7 7"/>
            </svg>
          </button>
        </div>
      </div>
    </div>

    <!-- Transaction History -->
    <div class="bg-white rounded-xl shadow-lg overflow-hidden">
      <div class="bg-gradient-to-r from-orange-500 to-orange-600 p-2 flex justify-between items-center">
        <div>
          <h3 class="text-lg font-semibold text-white">Transaction History</h3>
          <p class="text-gray-200 text-sm">Your recent transactions</p>
        </div>
        <button class="bg-white/10 text-white px-4 py-2 rounded-lg hover:bg-white/20 transition-colors text-sm">
          View All
        </button>
      </div>
      <div class="p-6">
        <div v-for="transaction in transactions" :key="transaction.id" 
          class="transaction-item group hover:bg-gray-50 p-4 rounded-xl transition-all duration-300 cursor-pointer"
        >
          <div class="flex items-center justify-between">
            <div class="flex items-center gap-4">
              <div class="w-12 h-12 rounded-xl bg-orange-100 flex items-center justify-center text-2xl">
                {{ transaction.icon }}
              </div>
              <div>
                <p class="font-medium text-gray-900">{{ transaction.description }}</p>
                <p class="text-gray-500 text-sm">{{ transaction.date }}</p>
              </div>
            </div>
            <div class="text-right">
              <p :class="[
                'font-semibold group-hover:scale-105 transition-transform',
                transaction.type === 'credit' ? 'text-green-600' : 'text-red-600'
              ]">
                {{ transaction.type === 'credit' ? '+' : '-' }}₦{{ formatAmount(Math.abs(transaction.amount)) }}
              </p>
              <p class="text-xs" :class="transaction.type === 'credit' ? 'text-green-500' : 'text-red-500'">
                {{ transaction.type === 'credit' ? 'Credit' : 'Debit' }}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Modals -->
    <SaveMoneyModal 
      :is-open="showSaveModal"
      @close="showSaveModal = false"
      @save="handleSave"
    />
    
    <WithdrawMoneyModal 
      :is-open="showWithdrawModal"
      :max-amount="totalBalance"
      @close="showWithdrawModal = false"
      @withdraw="handleWithdraw"
    />

    <!-- Create Savings Plan Modal -->
    <CreateSavingsPlanModal 
      :is-open="showCreatePlanModal"
      @close="showCreatePlanModal = false"
      @create="handleCreatePlan"
    />
  </div>
</template>

<script setup>
import { ref, onMounted, computed } from 'vue';
import { personalSavingsService } from '@/services/api';
import { toast } from 'vue3-toastify';
import SaveMoneyModal from '@/components/SaveMoneyModal.vue';
import WithdrawMoneyModal from '@/components/WithdrawMoneyModal.vue';
import CreateSavingsPlanModal from '@/components/CreateSavingsPlanModal.vue';
import 'vue3-toastify/dist/index.css';

// State
const totalBalance = ref(597475.00);
const showSaveModal = ref(false);
const showWithdrawModal = ref(false);
const showCreatePlanModal = ref(false);
const showAllPlans = ref(false);

// Sample transactions data
const transactions = ref([
  {
    id: 1,
    description: "Savings Deposit",
    amount: 50000,
    date: "Today, 2:30 PM",
    icon: "💰",
    type: "credit"
  },
  {
    id: 2,
    description: "Withdrawal to Bank Account",
    amount: -25000,
    date: "Yesterday, 4:15 PM",
    icon: "🏦",
    type: "debit"
  },
  {
    id: 3,
    description: "Monthly Savings Plan",
    amount: 100000,
    date: "Mar 15, 2024",
    icon: "📅",
    type: "credit"
  },
  {
    id: 4,
    description: "Emergency Withdrawal",
    amount: -15000,
    date: "Mar 12, 2024",
    icon: "🚨",
    type: "debit"
  },
  {
    id: 5,
    description: "Bonus Savings",
    amount: 75000,
    date: "Mar 10, 2024",
    icon: "⭐",
    type: "credit"
  }
]);

// Savings plans state
const savingsPlans = ref([]);
const isLoading = ref(true);
const error = ref(null);

// Computed property for displayed plans
const displayedPlans = computed(() => {
  return showAllPlans.value ? savingsPlans.value : savingsPlans.value.slice(0, 3);
});

// Fetch savings plans from API
const fetchSavingsPlans = async () => {
  try {
    isLoading.value = true;
    error.value = null;
    const response = await personalSavingsService.getAll();
    savingsPlans.value = response.data || [];
  } catch (err) {
    console.error('Failed to fetch savings plans:', err);
    error.value = 'Failed to load savings plans. Please try again.';
    toast.error('Failed to load savings plans', {
      position: 'top-right',
      autoClose: 3000
    });
  } finally {
    isLoading.value = false;
  }
};

// Format amount utility
const formatAmount = (value) => {
  return new Intl.NumberFormat('en-NG').format(value || 0);
};

// Fetch plans when component mounts
onMounted(() => {
  fetchSavingsPlans();
});
</script>
<style scoped>
.savings-container {
  min-height: 100vh;
}
.ten {
  margin-bottom: 2rem;
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

/* Ensure buttons maintain consistent width */
button {
  white-space: nowrap;
}

/* Add subtle hover effects */
.quick-access-card:hover,
.stats-card:hover {
  transform: translateY(-2px);
}

/* Improve card transitions */
.transaction-item {
  border-bottom: 1px solid #f3f4f6;
}

.transaction-item:last-child {
  border-bottom: none;
}
</style>
