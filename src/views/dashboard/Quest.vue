<script setup>
import { ref, computed, onMounted } from 'vue';
import ModalComponent from '@/components/ModalComponent.vue';
import { questService } from '@/services/api';
import dayjs from "dayjs";
import { toast } from 'vue3-toastify';
import 'vue3-toastify/dist/index.css';


const showModal = ref(false);
const allQuest = ref([]);

const formData = ref({
    name: '',
    targetAmount: '',
    description: '',
    totalMilestones: '',
    pointsPerMilestone: '',
    gtCoin: '',
    startDate: '',
    endDate: '',
});

const openModal = () => {
    showModal.value = true;
    formData.value = {}
}
const tostifyMessage = (message) => {
    toast(message, {
        autoClose: 1000,
    });
}

const handleShowModalUpdate = (value) => {
    showModal.value = value;
};

const fetchAndFormatQuests = async () => {
    try {
        const response = await questService.getAll();
        allQuest.value = response.data.map((quest) => ({
            ...quest,
            formattedStartDate: dayjs(quest.startDate).format("MMMM D, YYYY h:mm A"),
            formattedEndDate: dayjs(quest.endDate).format("MMMM D, YYYY h:mm A"),
        }));
    } catch (error) {
        console.error("Failed to fetch quests:", error);
    }
};


onMounted(() => {
    fetchAndFormatQuests();

});

const submitForm = async () => {
    let response = await questService.create(formData.value);
    fetchAndFormatQuests();
    tostifyMessage('Quest Created Successfully');
    showModal.value = false
};

const joinQuest = async (id) => {
    let response = await questService.joinQuest(id);
    tostifyMessage(response.data.message);
}
const updateQuest = async () => {
    try {
        const response = await questService.updateQuest(formData.value);
        fetchAndFormatQuests();
        formData.value = {};
        showModal.value = false
        console.log("Quest updated successfully:", response);
        tostifyMessage('Updated Successfully'); 
    } catch (error) {
        console.error("Error updating quest:", error);
    }
}

const getQuest = async (id) => {
    const questToUpdate = allQuest.value.find((quest) => quest.id === id);
    showModal.value = true;
    if (!questToUpdate) {
        console.error(`Quest with ID ${id} not found`);
        return;
    }
    formData.value = questToUpdate
};

const leaveQuest = async (id) => {
    let response = await questService.leaveQuest(id);
    fetchAndFormatQuests();
    tostifyMessage(response.data.message);
}
const deleteQuest = async (id) => {
    let response = await questService.deleteQuest(id);
    fetchAndFormatQuests();
    tostifyMessage('Deleted Successfully');
}


</script>



<template>
    <main>
        <div class=" flex justify-between items-center">
            <h3 class="text-xl font-semibold text-gray-800">All Quest</h3>
            <div>
                <button type="button" @click="openModal"
                    class="focus:outline-none flex items-center space-x-2 text-white bg-orange-600 hover:bg-orange-700 focus:ring-4 focus:ring-orange-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 ">
                    <i class='bx bx-plus'></i> <span>Create Quest</span>
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
                                        <router-link :to="'/dashboard/quest/' + quest.id"
                                            class="text-neutral-900 capitalize font-bold">{{ quest.name }}</router-link>
                                        <span>
                                            <span class="text-sm text-neutral-600 opacity-85 ">{{
                                                quest.formattedStartDate
                                                }}</span> -
                                            <br>
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
                            <td class="p-4  space-x-2">
                                <button v-if="quest.isActive" type="button" @click="joinQuest(quest.id)"
                                    class="cursor-pointer flex items-center space-x-1 whitespace-nowrap rounded-md bg-transparent p-0.5 font-semibold text-black outline-black hover:text-red-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 active:opacity-100 active:outline-offset-0 ">
                                    <i class='bx bx-plus-circle'></i> <span>Join</span>
                                </button>
                                <button type="button" @click="deleteQuest(quest.id)"
                                    class="cursor-pointer flex items-center space-x-1 whitespace-nowrap rounded-md bg-transparent p-0.5 font-semibold text-black outline-black hover:text-red-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 active:opacity-100 active:outline-offset-0 ">
                                    <span>Delete</span>
                                </button>
                                <button type="button" @click="getQuest(quest.id)"
                                    class="cursor-pointer flex items-center space-x-1 whitespace-nowrap rounded-md bg-transparent p-0.5 font-semibold text-black outline-black hover:text-red-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 active:opacity-100 active:outline-offset-0 ">
                                    <span>Update</span>
                                </button>
                                <button v-if="quest.isActive" type="button" @click="leaveQuest(quest.id)"
                                    class="cursor-pointer flex items-center space-x-1 whitespace-nowrap rounded-md bg-transparent p-0.5 font-semibold text-black outline-black hover:text-red-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 active:opacity-100 active:outline-offset-0 ">
                                    <span>Leave</span>
                                </button>
                            </td>
                        </tr>


                    </tbody>
                </table>
            </div>

        </section>


        <ModalComponent :showModal="showModal" @update:showModal="handleShowModalUpdate" :title="'create Quest'">
            <div class="max-w-2xl mx-auto p-4" @submit.prevent="formData.id ? updateQuest() : submitForm()">
                <form class="grid md:grid-cols-2 gap-3">
                    <div class="">
                        <label for="title" class="block text-xs font-semibold text-gray-800 mb-1">Name <span
                                class="text-red-600 text-sm">*</span></label>
                        <input type="text" id="name" v-model="formData.name"
                            class="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none  focus:border-red-500 focus:ring-0"
                            required placeholder="name">
                    </div>
                    <div class="">
                        <label for="targetAmount" class="block text-xs font-semibold text-gray-800 mb-1">Target
                            Amout <span class="text-red-600 text-sm">*</span></label>
                        <input type="number" id="targetAmount" v-model="formData.targetAmount"
                            class="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none  focus:border-red-500 focus:ring-0"
                            required placeholder="1000">
                    </div>

                    <div class=" md:col-span-2">
                        <label for="Description" class="block text-xs font-semibold text-gray-800 mb-1">Description
                            <span class="text-red-600 text-sm">*</span></label>
                        <textarea id="Description" v-model="formData.description"
                            class="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none  focus:border-red-500 focus:ring-0"
                            rows="4" required></textarea>
                    </div>
                    <div class="">
                        <label for="totalMilestones" class="block text-xs font-semibold text-gray-800 mb-1">Total
                            Milstones <span class="text-red-600 text-sm">*</span></label>
                        <input type="number" id="totalMilestones" v-model="formData.totalMilestones"
                            class="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none  focus:border-red-500 focus:ring-0"
                            required placeholder="1000">
                    </div>
                    <div class="">
                        <label for="pointsPerMilestone" class="block text-xs font-semibold text-gray-800 mb-1">Points
                            Per Milstone <span class="text-red-600 text-sm">*</span></label>
                        <input type="number" id="pointsPerMilestone" v-model="formData.pointsPerMilestone"
                            class="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none  focus:border-red-500 focus:ring-0"
                            required placeholder="1000">
                    </div>

                    <div class="">
                        <label for="gtCoin" class="block text-xs font-semibold text-gray-800 mb-1">gtcoin</label>
                        <input type="number" id="gtCoin" v-model="formData.gtCoin"
                            class="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none  focus:border-red-500 focus:ring-0"
                            placeholder="1000">
                    </div>

                    <div class="">
                        <label for="startDate" class="block text-xs font-semibold text-gray-800 mb-1">Start Date <span
                                class="text-red-600 text-sm">*</span></label>
                        <input type="date" id="startDate" v-model="formData.startDate"
                            class="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none  focus:border-red-500 focus:ring-0"
                            required placeholder="1000">
                    </div>
                    <div class="">
                        <label for="endDate" class="block text-xs font-semibold text-gray-800 mb-1">End Date <span
                                class="text-red-600 text-sm">*</span></label>
                        <input type="date" id="endDate" v-model="formData.endDate"
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
