<template>
  <div v-if="isOpen" class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
    <div class="bg-white rounded-lg p-6 w-full max-w-md mx-4">
      <div class="flex justify-between items-center mb-6">
        <h2 class="text-xl font-semibold">Add Money to Savings</h2>
        <button @click="closeModal" class="text-gray-500 hover:text-gray-700">
          <span class="text-2xl">&times;</span>
        </button>
      </div>

      <form @submit.prevent="handleSave">
        <div class="mb-4">
          <label class="block text-gray-700 text-sm font-bold mb-2" for="savingsPlan">
            Select Savings Plan
          </label>
          <select
            id="savingsPlan"
            v-model="selectedPlanId"
            class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-orange-500"
            required
            :disabled="isLoading"
          >
            <option value="">{{ isLoading ? 'Loading plans...' : 'Select a plan' }}</option>
            <option v-for="plan in savingsPlans" 
                    :key="plan.id" 
                    :value="plan.id"
                    :style="{ color: plan.color || '#333' }"
            >
              {{ plan.name }} (Target: ₦{{ plan.targetAmount?.toLocaleString() }})
            </option>
          </select>
        </div>

        <div class="mb-4">
          <label class="block text-gray-700 text-sm font-bold mb-2" for="amount">
            Amount (NGN)
          </label>
          <input
            type="number"
            id="amount"
            v-model="amount"
            class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-orange-500"
            placeholder="Enter amount"
            required
            min="100"
            :disabled="isLoading"
          />
        </div>

        <div class="mb-4">
          <label class="block text-gray-700 text-sm font-bold mb-2" for="description">
            Description (Optional)
          </label>
          <input
            type="text"
            id="description"
            v-model="description"
            class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-orange-500"
            placeholder="Enter description"
            :disabled="isLoading"
          />
        </div>

        <div class="flex gap-3">
          <button
            type="submit"
            class="flex-1 bg-orange-600 text-white px-4 py-2 rounded-lg hover:bg-orange-700 transition-colors flex items-center justify-center"
            :disabled="isLoading"
          >
            <svg v-if="isLoading" class="animate-spin -ml-1 mr-2 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
              <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
              <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
            </svg>
            {{ isLoading ? 'Saving...' : 'Save Money' }}
          </button>
          <button
            type="button"
            @click="closeModal"
            class="flex-1 border border-gray-300 px-4 py-2 rounded-lg hover:bg-gray-50 transition-colors"
            :disabled="isLoading"
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, watch } from 'vue';
import { personalSavingsService } from '@/services/api';
import { toast } from 'vue3-toastify';
import 'vue3-toastify/dist/index.css';

const props = defineProps({
  isOpen: {
    type: Boolean,
    required: true
  }
});

const emit = defineEmits(['close', 'save']);

const amount = ref('');
const selectedPlanId = ref('');
const description = ref('');
const savingsPlans = ref([]);
const isLoading = ref(false);

const fetchSavingsPlans = async () => {
  try {
    isLoading.value = true;
    const response = await personalSavingsService.getAll();
    savingsPlans.value = response.data || [];
  } catch (error) {
    console.error('Failed to fetch savings plans:', error);
    toast.error('Failed to load savings plans', {
      position: 'top-right',
      autoClose: 3000
    });
  } finally {
    isLoading.value = false;
  }
};

const closeModal = () => {
  emit('close');
  // Reset form
  amount.value = '';
  selectedPlanId.value = '';
  description.value = '';
};

const handleSave = async () => {
  try {
    isLoading.value = true;
    const selectedPlan = savingsPlans.value.find(plan => plan.id === selectedPlanId.value);
    
    if (!selectedPlan) {
      toast.error('Please select a valid savings plan');
      return;
    }

    await personalSavingsService.fundPlan(selectedPlanId.value, {
      amount: Number(amount.value),
      description: description.value
    });

    toast.success('Successfully added money to savings plan', {
      position: 'top-right',
      autoClose: 3000
    });

    emit('save', {
      amount: Number(amount.value),
      planId: selectedPlanId.value,
      planName: selectedPlan.name,
      description: description.value
    });
    closeModal();
  } catch (error) {
    console.error('Failed to save money:', error);
    toast.error('Failed to add money to savings plan', {
      position: 'top-right',
      autoClose: 3000
    });
  } finally {
    isLoading.value = false;
  }
};

// Fetch savings plans when modal opens
onMounted(() => {
  if (props.isOpen) {
    fetchSavingsPlans();
  }
});

// Watch for modal open state to fetch plans
watch(() => props.isOpen, (newValue) => {
  if (newValue) {
    fetchSavingsPlans();
  }
});
</script> 