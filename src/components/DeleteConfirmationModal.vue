<!-- Delete Confirmation Modal -->
<template>
  <div v-if="isOpen" class="fixed inset-0 z-50 overflow-y-auto" @click.self="onClose">
    <!-- Backdrop -->
    <div class="fixed inset-0 bg-black bg-opacity-30 backdrop-blur-sm transition-opacity"></div>

    <!-- Modal -->
    <div class="flex min-h-full items-center justify-center p-4">
      <div class="relative transform overflow-hidden rounded-2xl bg-white p-6 text-left shadow-xl transition-all w-full max-w-md">
        <!-- Icon -->
        <div class="flex items-center justify-center mb-6">
          <div class="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center">
            <svg class="w-8 h-8 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
            </svg>
          </div>
        </div>

        <!-- Title -->
        <h3 class="text-xl font-semibold text-center text-gray-900 mb-2">
          Delete "{{ planName }}"
        </h3>

        <!-- Message -->
        <div class="mt-3">
          <p class="text-sm text-center text-gray-600">
            Are you sure you want to delete this savings plan? This action cannot be undone and all associated data will be permanently removed.
          </p>
        </div>

        <!-- Buttons -->
        <div class="mt-6 flex justify-center gap-3">
          <button
            type="button"
            class="inline-flex justify-center rounded-lg border border-gray-300 bg-white px-6 py-3 text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:ring-offset-2 transition-colors duration-200"
            @click="onClose"
          >
            Cancel
          </button>
          <button
            type="button"
            class="inline-flex justify-center rounded-lg border border-transparent bg-red-600 px-6 py-3 text-sm font-medium text-white hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2 transition-colors duration-200"
            @click="onConfirm"
          >
            Delete Plan
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
defineProps({
  isOpen: {
    type: Boolean,
    required: true
  },
  planName: {
    type: String,
    required: true,
    default: 'Savings Plan'
  }
});

const emit = defineEmits(['close', 'confirm']);

const onClose = () => {
  emit('close');
};

const onConfirm = () => {
  emit('confirm');
  onClose();
};
</script>

<style scoped>
.fixed {
  animation: modal-fade-in 0.3s ease-out;
}

.bg-black {
  animation: backdrop-fade-in 0.3s ease-out;
}

.bg-white {
  animation: modal-slide-in 0.3s ease-out;
}

@keyframes modal-fade-in {
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
}

@keyframes backdrop-fade-in {
  from {
    opacity: 0;
  }
  to {
    opacity: 0.3;
  }
}

@keyframes modal-slide-in {
  from {
    opacity: 0;
    transform: scale(0.95) translateY(-20px);
  }
  to {
    opacity: 1;
    transform: scale(1) translateY(0);
  }
}
</style> 