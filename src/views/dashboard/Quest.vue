<script setup>
import { ref, computed, onMounted } from 'vue';
import ModalComponent from '@/components/ModalComponent.vue';
import { questService } from '@/services/api';
import dayjs from "dayjs";


const showModal = ref(false);
const allQuest = ref([]);

const formData = ref({
    Name: '',
    TargetAmout: '',
    Description: '',
    TotalMilstones: '',
    PointsPerMilstone: '',
    GtCoin: '',
    StartDate: '',
    EndDate: '',
});

const handleShowModalUpdate = (value) => {
    showModal.value = value;
};


onMounted(async () => {
    const response = await questService.getAll();
    allQuest.value = response.data.map((quest) => ({
        ...quest,
        formattedStartDate: dayjs(quest.startDate).format("MMMM D, YYYY h:mm A"), // e.g., "March 1, 2025 11:59 PM"
        formattedEndDate: dayjs(quest.endDate).format("MMMM D, YYYY h:mm A"),
    }));
});

const submitForm = async () => {
    let response = await questService.create(formData.value);
    response = await questService.getAll();
    allQuest.value = response.data.map((quest) => ({
        ...quest,
        formattedStartDate: dayjs(quest.startDate).format("MMMM D, YYYY h:mm A"), 
        formattedEndDate: dayjs(quest.endDate).format("MMMM D, YYYY h:mm A"),
    }));
    showModal.value = false
    console.log(response);
};


</script>



<template>
    <main>
        <div class=" flex justify-between items-center">
            <h3 class="text-xl font-semibold text-gray-800">All Quest</h3>
            <div>
                <button type="button" @click="showModal = true"
                    class="focus:outline-none text-white bg-red-700 hover:bg-red-800 focus:ring-4 focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-900">
                    Creat Quest
                </button>
            </div>
        </div>

        <div class="mt-10">

        </div>

        <section class="my-10">
            <div class="overflow-hidden w-full overflow-x-auto rounded-md border border-neutral-300">
                <table class="w-full text-left text-sm text-neutral-600 ">
                    <thead class="border-b border-neutral-300 bg-neutral-50 text-sm text-neutral-900 ">
                        <tr>
                            <th scope="col" class="p-4">S/N</th>
                            <th scope="col" class="p-4">Quest</th>
                            <th scope="col" class="p-4">Target Amount</th>
                            <th scope="col" class="p-4">Status</th>
                            <th scope="col" class="p-4">Action</th>
                        </tr>
                    </thead>
                    <tbody class="divide-y divide-neutral-300 ">
                        <tr v-for="quest in allQuest">
                            <td class="p-4">
                                #{{ quest.id }}
                            </td>
                            <td class="p-4">
                                <div class="flex w-max items-center gap-2">
                                    <img class="size-10 rounded-full object-cover"
                                        src="https://penguinui.s3.amazonaws.com/component-assets/avatar-1.webp"
                                        alt="user avatar" />
                                    <div class="flex flex-col">
                                        <span class="text-neutral-900 capitalize font-bold">{{ quest.name }}</span>
                                        <span>
                                            <span class="text-sm text-neutral-600 opacity-85 ">{{
                                                quest.formattedStartDate
                                                }}</span> -
                                            <span class="text-sm text-neutral-600 opacity-85 ">{{ quest.formattedEndDate
                                                }}</span>
                                        </span>
                                    </div>
                                </div>
                            </td>
                            <td class="p-4">{{ quest.targetAmount }}</td>
                            <td class="p-4">

                                <span v-if="quest.isActive"
                                    class="inline-flex overflow-hidden rounded-md border border-green-500 px-1 py-0.5 text-xs font-medium text-green-500 bg-green-500/10">Active</span>
                                <span v-else
                                    class="inline-flex overflow-hidden rounded-md border border-red-500 px-1 py-0.5 text-xs font-medium text-red-500 bg-red-500/10">Pending</span>
                            </td>
                            <td class="p-4"><button type="button"
                                    class="cursor-pointer whitespace-nowrap rounded-md bg-transparent p-0.5 font-semibold text-black outline-black hover:opacity-75 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 active:opacity-100 active:outline-offset-0 ">Join</button>
                            </td>
                        </tr>


                    </tbody>
                </table>
            </div>

        </section>


        <ModalComponent :showModal="showModal" @update:showModal="handleShowModalUpdate" :title="'create Quest'">
            <div class="max-w-2xl mx-auto p-4" @submit.prevent="submitForm">
                <form class="grid md:grid-cols-2 gap-3">
                    <div class="">
                        <label for="title" class="block text-xs font-semibold text-gray-800 mb-1">Name <span
                                class="text-red-600 text-sm">*</span></label>
                        <input type="text" id="name" v-model="formData.Name"
                            class="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none  focus:border-red-500 focus:ring-0"
                            required placeholder="name">
                    </div>
                    <div class="">
                        <label for="targetamout" class="block text-xs font-semibold text-gray-800 mb-1">Target
                            Amout <span class="text-red-600 text-sm">*</span></label>
                        <input type="number" id="targetamout" v-model="formData.TargetAmout"
                            class="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none  focus:border-red-500 focus:ring-0"
                            required placeholder="1000">
                    </div>

                    <div class=" md:col-span-2">
                        <label for="Description" class="block text-xs font-semibold text-gray-800 mb-1">Description
                            <span class="text-red-600 text-sm">*</span></label>
                        <textarea id="Description" v-model="formData.Description"
                            class="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none  focus:border-red-500 focus:ring-0"
                            rows="4" required></textarea>
                    </div>
                    <div class="">
                        <label for="TotalMilstones" class="block text-xs font-semibold text-gray-800 mb-1">Total
                            Milstones <span class="text-red-600 text-sm">*</span></label>
                        <input type="number" id="TotalMilstones" v-model="formData.TotalMilstones"
                            class="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none  focus:border-red-500 focus:ring-0"
                            required placeholder="1000">
                    </div>
                    <div class="">
                        <label for="PointsPerMilstone" class="block text-xs font-semibold text-gray-800 mb-1">Points
                            Per Milstone <span class="text-red-600 text-sm">*</span></label>
                        <input type="number" id="PointsPerMilstone" v-model="formData.PointsPerMilstone"
                            class="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none  focus:border-red-500 focus:ring-0"
                            required placeholder="1000">
                    </div>

                    <div class="">
                        <label for="GtCoin" class="block text-xs font-semibold text-gray-800 mb-1">Gtcoin</label>
                        <input type="text" id="GtCoin" v-model="formData.GtCoin"
                            class="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none  focus:border-red-500 focus:ring-0"
                            placeholder="1000">
                    </div>

                    <div class="">
                        <label for="StartDate" class="block text-xs font-semibold text-gray-800 mb-1">Start Date <span
                                class="text-red-600 text-sm">*</span></label>
                        <input type="date" id="StartDate" v-model="formData.StartDate"
                            class="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none  focus:border-red-500 focus:ring-0"
                            required placeholder="1000">
                    </div>
                    <div class="">
                        <label for="EndDate" class="block text-xs font-semibold text-gray-800 mb-1">End Date <span
                                class="text-red-600 text-sm">*</span></label>
                        <input type="date" id="EndDate" v-model="formData.EndDate"
                            class="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none  focus:border-red-500 focus:ring-0"
                            required placeholder="1000">
                    </div>


                    <div class="p-3 mt-2 text-center space-x-4 md:block md:col-span-2">
                        <button @save="handleSave" type="submit"
                            class="mb-2 md:mb-0 bg-white px-5 py-2 text-sm shadow-sm font-medium tracking-wider border text-gray-600 rounded-md hover:shadow-lg hover:bg-gray-100">
                            Save
                        </button>
                        <button @click="onToggle"
                            class="mb-2 md:mb-0 bg-red-500 border border-red-500 px-5 py-2 text-sm shadow-sm font-medium tracking-wider text-white rounded-md hover:shadow-lg hover:bg-red-600">
                            Close
                        </button>
                    </div>


                </form>
            </div>


        </ModalComponent>

    </main>
</template>


<style>
#app {
    font-family: Avenir, Helvetica, Arial, sans-serif;
}

.fade-enter,
.fade-leave-to {
    opacity: 0;
}

.fade-enter-active,
.fade-leave-active {
    transition: opacity 500ms ease-out;
}
</style>
