<template>
  <div v-if="isOpen" class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
    <div class="bg-white rounded-lg p-6 w-full max-w-md mx-4">
      <div class="flex justify-between items-center mb-6">
        <h2 class="text-xl font-semibold">Withdraw Money</h2>
        <button @click="closeModal" class="text-gray-500 hover:text-gray-700">
          <span class="text-2xl">&times;</span>
        </button>
      </div>

      <form @submit.prevent="handleWithdraw">
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
            :max="maxAmount"
          />
          <p class="text-sm text-gray-500 mt-1">Available balance: {{ formatAmount(maxAmount) }} NGN</p>
        </div>

        <div class="mb-4">
          <label class="block text-gray-700 text-sm font-bold mb-2" for="withdrawFrom">
            Withdraw From
          </label>
          <select
            id="withdrawFrom"
            v-model="withdrawFrom"
            class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-orange-500"
            required
          >
            <option value="">Select savings type</option>
            <option value="personal">Personal Savings</option>
            <option value="target">Target Savings</option>
            <option value="safebox">Safe Box</option>
          </select>
        </div>

        <div class="mb-4">
          <label class="block text-gray-700 text-sm font-bold mb-2" for="description">
            Reason for withdrawal (Optional)
          </label>
          <input
            type="text"
            id="description"
            v-model="description"
            class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-orange-500"
            placeholder="Enter reason"
          />
        </div>

        <div class="flex gap-3">
          <button
            type="submit"
            class="flex-1 bg-orange-600 text-white px-4 py-2 rounded-lg hover:bg-orange-700 transition-colors"
            :disabled="!isValidAmount"
          >
            Withdraw
          </button>
          <button
            type="button"
            @click="closeModal"
            class="flex-1 border border-gray-300 px-4 py-2 rounded-lg hover:bg-gray-50 transition-colors"
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue';

const props = defineProps({
  isOpen: {
    type: Boolean,
    required: true
  },
  maxAmount: {
    type: Number,
    required: true
  }
});

const emit = defineEmits(['close', 'withdraw']);

const amount = ref('');
const withdrawFrom = ref('');
const description = ref('');

const isValidAmount = computed(() => {
  const numAmount = Number(amount.value);
  return numAmount > 0 && numAmount <= props.maxAmount;
});

const formatAmount = (value) => {
  return new Intl.NumberFormat('en-NG').format(value);
};

const closeModal = () => {
  emit('close');
  // Reset form
  amount.value = '';
  withdrawFrom.value = '';
  description.value = '';
};

const handleWithdraw = () => {
  if (!isValidAmount.value) return;
  
  emit('withdraw', {
    amount: Number(amount.value),
    withdrawFrom: withdrawFrom.value,
    description: description.value
  });
  closeModal();
};
</script> 