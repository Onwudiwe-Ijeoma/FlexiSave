<template>
  <ModalComponent 
    :showModal="isOpen" 
    @update:showModal="$emit('close')"
    title="Create New Savings Plan"
  >
    <div class="w-full flex justify-center" @click.stop>
      <form @submit.prevent="handleSubmit" class="space-y-4 w-full max-w-xl">
        <div>
          <label class="block text-sm font-medium text-gray-700 mb-1">Plan Name</label>
          <input 
            v-model="formData.Name"
            type="text"
            required
            class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
            placeholder="e.g. Easter Budget"
          />
        </div>

        <div>
          <label class="block text-sm font-medium text-gray-700 mb-1">Initial Amount (₦)</label>
          <input 
            v-model.number="formData.Amount"
            type="number"
            required
            min="0"
            class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
            placeholder="0.00"
          />
        </div>

        <div>
          <label class="block text-sm font-medium text-gray-700 mb-1">Target Amount (₦)</label>
          <input 
            v-model.number="formData.TargetAmount"
            type="number"
            required
            min="0"
            class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
            placeholder="0.00"
          />
        </div>

        <div>
          <label class="block text-sm font-medium text-gray-700 mb-1">Description (Optional)</label>
          <textarea 
            v-model="formData.Description"
            rows="3"
            class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
            placeholder="Describe your savings plan..."
          ></textarea>
        </div>

        <div class="grid grid-cols-2 gap-4">
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-1">Frequency</label>
            <select 
              v-model="formData.Frequency"
              required
              class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
            >
              <option value="Daily">Daily</option>
              <option value="Weekly">Weekly</option>
              <option value="Monthly">Monthly</option>
              <option value="Quarterly">Quarterly</option>
            </select>
          </div>

          <div>
            <label class="block text-sm font-medium text-gray-700 mb-1">Color</label>
            <input 
              v-model="formData.Color"
              type="color"
              required
              class="w-full h-10 px-1 py-1 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
            />
          </div>
        </div>

        <div class="flex flex-col gap-3">
          <label class="relative inline-flex items-center cursor-pointer">
            <input 
              v-model="formData.ShouldLock"
              type="checkbox"
              class="sr-only peer"
            >
            <div class="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-orange-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-orange-600"></div>
            <span class="ml-3 text-sm font-medium text-gray-700">Lock Savings</span>
          </label>

          <label class="relative inline-flex items-center cursor-pointer">
            <input 
              v-model="formData.AutoSave"
              type="checkbox"
              class="sr-only peer"
            >
            <div class="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-orange-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-orange-600"></div>
            <span class="ml-3 text-sm font-medium text-gray-700">Auto-Save</span>
          </label>
        </div>
      

        <div class="flex justify-end gap-3 mt-6">
          <button 
            type="button"
            @click="handleClose"
            :disabled="loading"
            class="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 disabled:opacity-50"
          >
            Cancel
          </button>
          <button 
            type="submit"
            :disabled="loading"
            class="px-4 py-2 text-sm font-medium text-white bg-gradient-to-r from-orange-500 to-orange-600 rounded-lg hover:from-orange-600 hover:to-orange-700 disabled:opacity-50 flex items-center gap-2"
          >
            <span v-if="loading" class="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></span>
            {{ loading ? 'Creating...' : 'Create Plan' }}
          </button>
        </div>
      </form>
    </div>
  </ModalComponent>
</template>

<script setup>
import { ref } from 'vue';
import { toast } from 'vue3-toastify';
import { useRouter } from 'vue-router';
import 'vue3-toastify/dist/index.css';
import ModalComponent from './ModalComponent.vue';
import { personalSavingsService } from '@/services/api';

const router = useRouter();
const props = defineProps({
  isOpen: {
    type: Boolean,
    required: true
  }
});

const emit = defineEmits(['close', 'create']);
const loading = ref(false);

const formData = ref({
  AccountId: 1,
  Amount: 0,
  Name: '',
  Description: '',
  ShouldLock: false,
  Frequency: 'Monthly',
  Color: '#FF5733',
  TargetAmount: 0
});

const resetForm = () => {
  formData.value = {
    AccountId: 1,
    Amount: 0,
    Name: '',
    Description: '',
    ShouldLock: false,
    Frequency: 'Monthly',
    Color: '#FF5733',
    TargetAmount: 0
  };
};

const handleClose = () => {
  if (!loading.value) {
    resetForm();
    emit('close');
  }
};

const handleSubmit = async () => {
  try {
    loading.value = true;
    const response = await personalSavingsService.create(formData.value);
    // Emit the created plan data
    emit('create', response.data);
    resetForm();
    handleClose();
  } catch (error) {
    console.error('Failed to create savings plan:', error);
    toast.error(error.response?.data?.message || 'Failed to create savings plan', {
      autoClose: 3000
    });
  } finally {
    loading.value = false;
  }
};
</script> 