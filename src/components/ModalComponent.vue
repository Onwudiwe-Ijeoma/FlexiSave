<script setup>
import { ref, watch } from 'vue';

const props = defineProps({
  showModal: {
    type: Boolean,
    required: true,
    default: false
  },
  title: {
    type: String,
    required: true
  }
});

const emit = defineEmits(['update:showModal']);

const isOpen = ref(props.showModal);

// Watch for changes in props.showModal and update isOpen accordingly
watch(() => props.showModal, (newValue) => {
  isOpen.value = newValue;
});

const onToggle = () => {
  isOpen.value = false;
  emit('update:showModal', false);
};
</script>

<template>
  <div>
    <transition name="fade">
      <div v-if="showModal" class="h-screen w-screen fixed left-0 top-0">
        <div @click="onToggle" class="absolute bg-black opacity-70 inset-0 z-0"></div>
        <div class="w-full max-w-2xl p-3 relative mx-auto my-auto rounded-xl shadow-lg bg-white mt-10 h-[80%] overflow-auto z-50">
          <div class="flex justify-between p-2 text-gray-800">
            <h2 class="text-xl capitalize font-bold">{{ title }}</h2>
            <button @click="onToggle" class="font-semibold">X</button>
          </div>
          <div class="overflow-auto h-[90%]">
            <div class="p-3">
              <slot></slot>
            </div>
          </div>
        </div>
      </div>
    </transition>
  </div>
</template>

<style scoped>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>