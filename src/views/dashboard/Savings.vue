<template>
  <div class="savings-container p-4 md:p-8 bg-gray-50">
    <!-- Main Balance Card -->
    <div class="balance-card bg-gradient-to-r from-[#e65100] to-[#e65100]/80 p-6 md:p-8 rounded-xl shadow-lg mb-8 animate-fade-in">
      <div class="relative">
        <div class="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full -mr-16 -mt-16 blur-xl"></div>
        <div class="flex justify-between items-start mb-2">
          <h3 class="text-white/80 text-sm md:text-base font-medium animate-slide-up">Total Balance</h3>
          <button @click="hideBalance = !hideBalance" class="text-white/80 hover:text-white flex items-center gap-2 text-sm transition-colors">
            <span>{{ hideBalance ? 'Show' : 'Hide' }} Balance</span>
            <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" :class="{ 'text-white/60': !hideBalance }" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path v-if="hideBalance" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
              <path v-if="hideBalance" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
              <path v-else stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21" />
            </svg>
          </button>
        </div>
        <div class="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div class="relative animate-slide-up" style="animation-delay: 200ms;">
            <p class="text-3xl md:text-5xl font-bold text-white">
              {{ hideBalance ? '••••••••' : formatAmount(totalBalance) }}
              <span class="text-sm text-white/80">NGN</span>
            </p>
            <p class="text-orange-100 text-sm mt-2">+2.5% from last month</p>
          </div>
          <div class="flex flex-col sm:flex-row gap-3 md:gap-4 w-full sm:w-auto animate-slide-left" style="animation-delay: 400ms;">
            <button 
              @click="showSaveModal = true"
              class="bg-white text-[#e65100] px-6 md:px-8 py-3 rounded-xl flex items-center justify-center gap-2 text-sm md:text-base font-medium hover:bg-[#e65100]/10 transition-all duration-300 shadow-md min-w-[140px]"
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
          +5.25% per annum 
        </div>
      </div>
      <div class="bg-white p-4 rounded-xl shadow-md hover:shadow-lg transition-all duration-300 animate-fade-in-up" style="animation-delay: 300ms;">
        <div class="text-gray-500 text-sm mb-1">Savings Goal</div>
        <div class="text-xl font-bold">75%</div>
        <div class="w-full bg-gray-200 h-1.5 rounded-full mt-2">
          <div class="bg-[#e65100] h-full rounded-full" style="width: 75%"></div>
        </div>
      </div>
      <div class="bg-white p-4 rounded-xl shadow-md hover:shadow-lg transition-all duration-300 animate-fade-in-up" style="animation-delay: 400ms;">
        <div class="text-gray-500 text-sm mb-1">Interest Earned</div>
        <div class="text-xl font-bold">₦12,450</div>
        <div class="text-[#e65100] text-xs flex items-center gap-1 mt-2">
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
          class="px-6 py-3 text-sm font-medium text-white bg-gradient-to-r from-[#e65100] to-[#e65100]/80 rounded-lg hover:from-[#e65100]/90 hover:to-[#e65100]/70 flex items-center gap-2 shadow-md hover:shadow-lg transition-all duration-300"
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
        <div class="w-16 h-16 rounded-full bg-[#e65100] flex items-center justify-center mb-4 mx-auto">
          <svg class="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
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
            <div class="flex items-start justify-between gap-4 mb-4">
              <div class="flex items-start gap-4">
                <div :style="{ backgroundColor: plan.color + '20' }" class="p-3 rounded-xl shadow-lg">
                  <span class="text-2xl">{{ plan.icon || '💰' }}</span>
                </div>
                <div class="flex-1 min-w-0">
                  <h4 class="font-semibold text-lg truncate">{{ plan.name }}</h4>
                  <p class="text-gray-500 text-sm line-clamp-2">{{ plan.description || 'No description' }}</p>
                </div>
              </div>
              <button 
                @click="handleDeletePlan(plan)"
                class="text-gray-400 hover:text-[#e65100] transition-colors p-2 rounded-lg hover:bg-[#e65100]/10"
                title="Delete Plan"
              >
                <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                </svg>
              </button>
            </div>

            <div class="flex flex-wrap gap-2 mb-4">
              <span class="text-xs font-medium px-2 py-1 rounded-full" 
                :class="plan.shouldLock ? 'bg-[#e65100]/10 text-[#e65100]' : 'bg-green-100 text-green-700'"
              >
                {{ plan.shouldLock ? 'Locked' : 'Unlocked' }}
              </span>
              <span class="text-xs font-medium px-2 py-1 rounded-full bg-gray-100 text-gray-700">
                {{ plan.frequency }}
              </span>
            </div>

            <div class="grid grid-cols-1 gap-3 mb-4">
              <div class="bg-gray-50 p-3 rounded-lg">
                <span class="text-gray-600 text-xs block mb-1">Current Amount</span>
                <div class="flex items-baseline space-x-1 overflow-hidden">
                  <span class="text-gray-900 text-xs">₦</span>
                  <span class="font-medium text-gray-900 text-base md:text-lg truncate">{{ formatAmount(plan.amount) }}</span>
                </div>
              </div>
              <div class="bg-gray-50 p-3 rounded-lg">
                <span class="text-gray-600 text-xs block mb-1">Target Amount</span>
                <div class="flex items-baseline space-x-1 overflow-hidden">
                  <span class="text-gray-900 text-xs">₦</span>
                  <span class="font-medium text-gray-900 text-base md:text-lg truncate">{{ formatAmount(plan.targetAmount) }}</span>
                </div>
              </div>
            </div>

            <div class="space-y-2">
              <div class="flex justify-between items-center text-sm text-gray-600">
                <span>Progress</span>
                <span class="font-medium">{{ Math.min(((plan.amount / plan.targetAmount) * 100), 100).toFixed(1) }}%</span>
              </div>
              <div class="w-full bg-gray-200 h-2 rounded-full overflow-hidden">
                <div 
                  class="h-full rounded-full transition-all duration-500"
                  :style="{ 
                    width: `${Math.min((plan.amount / plan.targetAmount) * 100, 100)}%`,
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
            class="text-[#e65100] hover:text-[#e65100]/90 font-medium inline-flex items-center gap-2"
          >
            View All Savings Plans
            <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7"/>
            </svg>
          </button>
          <button 
            v-else
            @click="showAllPlans = false"
            class="text-[#e65100] hover:text-[#e65100]/90 font-medium inline-flex items-center gap-2"
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
      <div class="bg-gradient-to-r from-[#e65100] to-[#e65100]/80 p-2 flex justify-between items-center">
        <div>
          <h3 class="text-lg font-semibold text-white">Transaction History</h3>
          <p class="text-gray-200 text-sm">Your recent transactions</p>
        </div>
        <button class="bg-white/10 text-white px-4 py-2 rounded-lg hover:bg-white/20 transition-colors text-sm">
          View All
        </button>
      </div>
      <div class="p-6">
        <!-- Loading State -->
        <div v-if="isLoadingTransactions" class="space-y-4">
          <div v-for="n in 3" :key="n" class="animate-pulse flex items-center justify-between p-4">
            <div class="flex items-center gap-4">
              <div class="w-12 h-12 bg-gray-200 rounded-xl"></div>
              <div>
                <div class="h-4 bg-gray-200 rounded w-48"></div>
                <div class="h-3 bg-gray-200 rounded w-24 mt-2"></div>
              </div>
            </div>
            <div class="text-right">
              <div class="h-4 bg-gray-200 rounded w-24"></div>
              <div class="h-3 bg-gray-200 rounded w-16 mt-2"></div>
            </div>
          </div>
        </div>

        <!-- Error State -->
        <div v-else-if="transactionError" class="text-center py-8">
          <p class="text-red-600 mb-2">{{ transactionError }}</p>
          <button 
            @click="fetchTransactions" 
            class="text-[#e65100] hover:text-[#e65100]/90 font-medium"
          >
            Try Again
          </button>
        </div>

        <!-- Empty State -->
        <div v-else-if="!transactions.length" class="text-center py-8">
          <div class="w-16 h-16 mx-auto bg-[#e65100] rounded-full flex items-center justify-center mb-4">
            <span class="text-2xl">📊</span>
          </div>
          <h4 class="text-lg font-semibold text-gray-900 mb-2">No Transactions Yet</h4>
          <p class="text-gray-600">Start saving to see your transactions here</p>
        </div>

        <!-- Transactions List -->
        <div v-else>
          <div v-for="transaction in paginatedTransactions" :key="transaction.id" 
            class="transaction-item group hover:bg-gray-50 p-4 rounded-xl transition-all duration-300 cursor-pointer"
          >
            <div class="flex items-center justify-between">
              <div class="flex items-center gap-4">
                <div class="w-12 h-12 rounded-xl bg-[#e65100] flex items-center justify-center text-2xl">
                  {{ getTransactionIcon(transaction.type) }}
                </div>
                <div>
                  <p class="font-medium text-gray-900">{{ transaction.description }}</p>
                  <p class="text-gray-500 text-sm">{{ formatDate(transaction.createdAt) }}</p>
                </div>
              </div>
              <div class="text-right">
                <p :class="[
                  'font-semibold group-hover:scale-105 transition-transform',
                  isCredit(transaction.type) ? 'text-green-600' : 'text-red-600'
                ]">
                  {{ isCredit(transaction.type) ? '+' : '-' }}₦{{ formatAmount(transaction.balance) }}
                </p>
                <p class="text-xs" :class="isCredit(transaction.type) ? 'text-green-500' : 'text-red-500'">
                  {{ transaction.type }}
                </p>
              </div>
            </div>
          </div>

          <!-- Pagination Controls -->
          <div class="flex items-center justify-between border-t border-gray-200 bg-white px-4 py-3 sm:px-6 mt-4">
            <div class="flex flex-1 justify-between sm:hidden">
              <button
                @click="prevPage"
                :disabled="currentPage === 1"
                class="relative inline-flex items-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50"
                :class="{ 'opacity-50 cursor-not-allowed': currentPage === 1 }"
              >
                Previous
              </button>
              <button
                @click="nextPage"
                :disabled="currentPage === totalPages"
                class="relative ml-3 inline-flex items-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50"
                :class="{ 'opacity-50 cursor-not-allowed': currentPage === totalPages }"
              >
                Next
              </button>
            </div>
            <div class="hidden sm:flex sm:flex-1 sm:items-center sm:justify-between">
              <div>
                <p class="text-sm text-gray-700">
                  Showing
                  <span class="font-medium">{{ ((currentPage - 1) * itemsPerPage) + 1 }}</span>
                  to
                  <span class="font-medium">{{ Math.min(currentPage * itemsPerPage, transactions.length) }}</span>
                  of
                  <span class="font-medium">{{ transactions.length }}</span>
                  results
                </p>
              </div>
              <div>
                <nav class="isolate inline-flex -space-x-px rounded-md shadow-sm" aria-label="Pagination">
                  <button
                    @click="prevPage"
                    :disabled="currentPage === 1"
                    class="relative inline-flex items-center rounded-l-md px-2 py-2 text-gray-400 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:z-20 focus:outline-offset-0"
                    :class="{ 'opacity-50 cursor-not-allowed': currentPage === 1 }"
                  >
                    <span class="sr-only">Previous</span>
                    <svg class="h-5 w-5" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                      <path fill-rule="evenodd" d="M12.79 5.23a.75.75 0 01-.02 1.06L8.832 10l3.938 3.71a.75.75 0 11-1.04 1.08l-4.5-4.25a.75.75 0 010-1.08l4.5-4.25a.75.75 0 011.06.02z" clip-rule="evenodd" />
                    </svg>
                  </button>
                  <template v-for="page in totalPages" :key="page">
                    <button
                      @click="goToPage(page)"
                      :class="[
                        page === currentPage
                          ? 'relative z-10 inline-flex items-center bg-[#e65100] px-4 py-2 text-sm font-semibold text-white focus:z-20 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#e65100]'
                          : 'relative inline-flex items-center px-4 py-2 text-sm font-semibold text-gray-900 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:z-20 focus:outline-offset-0',
                      ]"
                    >
                      {{ page }}
                    </button>
                  </template>
                  <button
                    @click="nextPage"
                    :disabled="currentPage === totalPages"
                    class="relative inline-flex items-center rounded-r-md px-2 py-2 text-gray-400 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:z-20 focus:outline-offset-0"
                    :class="{ 'opacity-50 cursor-not-allowed': currentPage === totalPages }"
                  >
                    <span class="sr-only">Next</span>
                    <svg class="h-5 w-5" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                      <path fill-rule="evenodd" d="M7.21 14.77a.75.75 0 01.02-1.06L11.168 10 7.23 6.29a.75.75 0 111.04-1.08l4.5 4.25a.75.75 0 010 1.08l-4.5 4.25a.75.75 0 01-1.06-.02z" clip-rule="evenodd" />
                    </svg>
                  </button>
                </nav>
              </div>
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

    <!-- Delete Confirmation Modal -->
    <DeleteConfirmationModal
      :is-open="showDeleteModal"
      :plan-name="planToDelete?.name || ''"
      @close="showDeleteModal = false"
      @confirm="confirmDelete"
    />
  </div>
</template>

<script setup>
import { ref, onMounted, computed, watch } from 'vue';
import { personalSavingsService, transactionService } from '@/services/api';
import { toast } from 'vue3-toastify';
import SaveMoneyModal from '@/components/SaveMoneyModal.vue';
import WithdrawMoneyModal from '@/components/WithdrawMoneyModal.vue';
import CreateSavingsPlanModal from '@/components/CreateSavingsPlanModal.vue';
import DeleteConfirmationModal from '@/components/DeleteConfirmationModal.vue';
import 'vue3-toastify/dist/index.css';

// Delete savings plan state
const showDeleteModal = ref(false);
const planToDelete = ref(null);

// Delete savings plan handlers
const handleDeletePlan = (plan) => {
  planToDelete.value = plan;
  showDeleteModal.value = true;
};

const confirmDelete = async () => {
  try {
    await personalSavingsService.delete(planToDelete.value.id);
    
    toast.success('Savings plan deleted successfully!', {
      position: 'top-right',
      autoClose: 3000
    });
    
    // Refresh the savings plans list
    await fetchSavingsPlans();
  } catch (error) {
    console.error('Failed to delete savings plan:', error);
    toast.error('Failed to delete savings plan. Please try again.', {
      position: 'top-right',
      autoClose: 3000
    });
  } finally {
    planToDelete.value = null;
    showDeleteModal.value = false;
  }
};

// State
const totalBalance = ref(597475.00);
const showSaveModal = ref(false);
const showWithdrawModal = ref(false);
const showCreatePlanModal = ref(false);
const showAllPlans = ref(false);
const hideBalance = ref(localStorage.getItem('hideBalance') === 'true');

// Watch hideBalance changes and save to localStorage
watch(hideBalance, (newValue) => {
  localStorage.setItem('hideBalance', newValue);
});

// Transactions state
const transactions = ref([]);
const isLoadingTransactions = ref(true);
const transactionError = ref(null);

// Pagination state
const currentPage = ref(1);
const itemsPerPage = ref(5);
const totalItems = ref(0);

// Computed property for paginated transactions
const paginatedTransactions = computed(() => {
  const startIndex = (currentPage.value - 1) * itemsPerPage.value;
  const endIndex = startIndex + itemsPerPage.value;
  return transactions.value.slice(startIndex, endIndex);
});

// Computed property for total pages
const totalPages = computed(() => {
  return Math.ceil(transactions.value.length / itemsPerPage.value);
});

// Pagination methods
const nextPage = () => {
  if (currentPage.value < totalPages.value) {
    currentPage.value++;
  }
};

const prevPage = () => {
  if (currentPage.value > 1) {
    currentPage.value--;
  }
};

const goToPage = (page) => {
  currentPage.value = page;
};

// Fetch transactions from API
const fetchTransactions = async () => {
  try {
    isLoadingTransactions.value = true;
    transactionError.value = null;
    const response = await transactionService.getAll();

    // console.log(response.data);
    transactions.value = response.data || [];
  } catch (err) {
    console.error('Failed to fetch transactions:', err);
    transactionError.value = 'Failed to load transactions. Please try again.';
    toast.error('Failed to load transactions', {
      position: 'top-right',
      autoClose: 3000
    });
  } finally {
    isLoadingTransactions.value = false;
  }
};

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

// Handler functions for modals
const handleSave = async (saveData) => {
  try {
    // Call your API to save money
    const response = await personalSavingsService.fundPlan(saveData.planId, saveData);
    toast.success('Successfully saved money!', {
      position: 'top-right',
      autoClose: 3000
    });
    // Refresh transactions and savings plans
    fetchTransactions();
    fetchSavingsPlans();
    showSaveModal.value = false;
  } catch (error) {
    console.error('Failed to save money:', error);
    toast.error('Failed to save money. Please try again.', {
      position: 'top-right',
      autoClose: 3000
    });
  }
};

const handleWithdraw = async (withdrawData) => {
  try {
    // Call your API to withdraw money
    const response = await personalSavingsService.withdraw(withdrawData);
    toast.success('Successfully withdrew money!', {
      position: 'top-right',
      autoClose: 3000
    });
    // Refresh transactions and savings plans
    fetchTransactions();
    fetchSavingsPlans();
    showWithdrawModal.value = false;
  } catch (error) {
    console.error('Failed to withdraw money:', error);
    toast.error('Failed to withdraw money. Please try again.', {
      position: 'top-right',
      autoClose: 3000
    });
  }
};

const handleCreatePlan = async (planData) => {
  try {
    // Call your API to create a savings plan
    await personalSavingsService.create(planData);
    
    // Refresh the savings plans list
    await fetchSavingsPlans();
    
    toast.success('Successfully created savings plan!', {
      position: 'top-right',
      autoClose: 3000
    });
    
    showCreatePlanModal.value = false;
  } catch (error) {
    console.error('Failed to create savings plan:', error);
    toast.error('Failed to create savings plan. Please try again.', {
      position: 'top-right',
      autoClose: 3000
    });
  }
};

// Helper functions for transactions
const getTransactionIcon = (type) => {
  const icons = {
    'Deposit': '💰',
    'Withdrawal': '🏦',
    'Transfer': '↗️',
    'Interest': '💫',
    'Bonus': '🎁'
  };
  return icons[type] || '💰';
};

const isCredit = (type) => {
  const creditTypes = ['Deposit', 'Interest', 'Bonus'];
  return creditTypes.includes(type);
};

const formatDate = (dateString) => {
  const date = new Date(dateString);
  const now = new Date();
  const yesterday = new Date(now);
  yesterday.setDate(yesterday.getDate() - 1);

  if (date.toDateString() === now.toDateString()) {
    return `Today, ${date.toLocaleTimeString('en-NG', { hour: '2-digit', minute: '2-digit' })}`;
  } else if (date.toDateString() === yesterday.toDateString()) {
    return `Yesterday, ${date.toLocaleTimeString('en-NG', { hour: '2-digit', minute: '2-digit' })}`;
  } else {
    return date.toLocaleDateString('en-NG', { 
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  }
};

// Fetch data when component mounts
onMounted(() => {
  fetchSavingsPlans();
  fetchTransactions();
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
