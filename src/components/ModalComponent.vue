<script setup>
import { ref, computed, watch } from 'vue';

// Props
// const { showModal } = defineProps({
//   showModal: {
//     type: Boolean,
//     required: true,
//   },
// });

const props = defineProps({
  showModal: Boolean,
  title: String,  
});


const emit = defineEmits(['update:showModal']);

watch(() => props.showModal, (newValue) => {
    isOpen.value = newValue;
});


const isOpen = ref(false);

const isModalVisible = computed(() => isOpen.value);

const onToggle = () => {
    isOpen.value = !isOpen.value;
    emit('update:showModal', false);

};



</script>
<template>
    <div>
        <transition name="fade">
            <div v-if="isModalVisible">
                <div class=" h-screen w-screen fixed left-0 top-0">
                    <div @click="onToggle" class="absolute bg-black opacity-70 inset-0 z-0"></div>
                    <div class="w-full max-w-2xl p-3 relative mx-auto my-auto rounded-xl shadow-lg bg-white mt-10 h-[80%] overflow-auto">
                        <div class="flex justify-between p-2 text-gray-800">
                            <h2 class="text-xl capitalize font-bold">{{ props.title }}</h2>
                            <button @click="onToggle" class="font-semibold">X</button>
                        </div>
                        <div class=" overflow-auto h-[90%]">
                            <div class="p-3">
                                <slot></slot>
                            </div>

                        </div>
                    </div>
                </div>
            </div>
        </transition>
    </div>
</template>


<style lang="scss" scoped></style>