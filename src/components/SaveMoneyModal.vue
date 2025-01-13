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
          />
        </div>

        <div class="mb-4">
          <label class="block text-gray-700 text-sm font-bold mb-2" for="savingsType">
            Savings Type
          </label>
          <select
            id="savingsType"
            v-model="savingsType"
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
            Description (Optional)
          </label>
          <input
            type="text"
            id="description"
            v-model="description"
            class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-orange-500"
            placeholder="Enter description"
          />
        </div>

        <div class="flex gap-3">
          <button
            type="submit"
            class="flex-1 bg-orange-600 text-white px-4 py-2 rounded-lg hover:bg-orange-700 transition-colors"
          >
            Save Money
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
import { ref } from 'vue';

const props = defineProps({
  isOpen: {
    type: Boolean,
    required: true
  }
});

const emit = defineEmits(['close', 'save']);

const amount = ref('');
const savingsType = ref('');
const description = ref('');

const closeModal = () => {
  emit('close');
  // Reset form
  amount.value = '';
  savingsType.value = '';
  description.value = '';
};

const handleSave = () => {
  emit('save', {
    amount: Number(amount.value),
    savingsType: savingsType.value,
    description: description.value
  });
  closeModal();
};
</script> 