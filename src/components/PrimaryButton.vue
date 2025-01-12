<script setup>
defineProps({
  type: {
    type: String,
    default: 'button'
  },
  disabled: {
    type: Boolean,
    default: false
  },
  size: {
    type: String,
    default: 'md', // sm, md, lg
    validator: (value) => ['sm', 'md', 'lg'].includes(value)
  }
});
</script>

<template>
  <button
    :type="type"
    :disabled="disabled"
    class="inline-flex items-center justify-center font-medium rounded-lg transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-[#DD4F05]/50 disabled:opacity-50 disabled:cursor-not-allowed bg-[#DD4F05] hover:bg-[#DD4F05]/90 text-white"
    :class="{
      'text-xs px-2.5 py-1.5': size === 'sm',
      'text-sm px-4 py-2': size === 'md',
      'text-base px-6 py-3': size === 'lg'
    }"
  >
    <slot></slot>
  </button>
</template> 