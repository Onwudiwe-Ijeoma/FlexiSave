<script setup>
import { useRoute } from 'vue-router';
import { ref, computed, onMounted } from 'vue';
import { leaderBoardService } from '@/services/api';
import { questService } from '@/services/api';
import { toast } from 'vue3-toastify';
import 'vue3-toastify/dist/index.css';
import dayjs from "dayjs";
import ModalComponent from '@/components/ModalComponent.vue';
import PrimaryButton from '@/components/PrimaryButton.vue';

const route = useRoute();

const quest = ref([]);
const leaderBoard = ref([]);
const showModal = ref(false);
const loading = ref(false);
const showLeaveModal = ref(false);
const questToLeave = ref(null);

const formData = ref({
    amount: '',
});


const tostifyMessage = (message) => {
    toast(message, {
        autoClose: 1000,
    });
}

const handleShowModalUpdate = (value) => {
    showModal.value = value;
};

onMounted(async () => {
    getOneBoard();
    getOneQuest();
});

const toggleModal = () => {
    showModal.value = !showModal.value;
}

const submitForm = async () => {
    let response = await questService.contributeToQuest(route.params.id, formData.value);
    tostifyMessage(`${formData.value.amount} Contributed Successfully`);
    showModal.value = false
};


const getOneBoard = async () => {
    try {
        let response = await leaderBoardService.getOne(route.params.id);
        leaderBoard.value = response.data.topUsers.map((player, index) => ({
            ...player,
            rank: formatRank(index + 1),
        }));
        console.log(leaderBoard.value);
    } catch (error) {
        console.error("Error fetching leaderboard:", error);
    }
};

const formatRank = (rank) => {
    const suffixes = ["th", "st", "nd", "rd"];
    const v = rank % 100;
    return rank + (suffixes[(v - 20) % 10] || suffixes[v] || suffixes[0]);
};
const getOneQuest = async () => {
    let response = await questService.getOne(route.params.id);
    let questData = response.data;

    quest.value = {
        ...questData,
        formattedStartDate: dayjs(questData.startDate).format("MMM D, YYYY"),
        formattedEndDate: dayjs(questData.endDate).format("MMM D, YYYY"),
    };
    // console.log(quest.value);
}

const formatAmount = (value) => {
  return new Intl.NumberFormat('en-NG').format(value || 0);
};

const joinQuest = async (id) => {
    let response = await questService.joinQuest(id);
    getOneQuest();
    getOneBoard();
    tostifyMessage(response.data.message);
}

const handleShowLeaveModal = (value) => {
    showLeaveModal.value = value;
};

const confirmLeave = async () => {
    if (questToLeave.value) {
        let response = await questService.leaveQuest(questToLeave.value);
        getOneQuest();
        getOneBoard();
        tostifyMessage(response.data.message);
        showLeaveModal.value = false;
    }
}

const initiateLeave = (id) => {
    questToLeave.value = id;
    showLeaveModal.value = true;
}

</script>
<template>
    <main class="font-['Poppins']">
        <div class=" flex justify-between items-center">
            <h3 class="text-2xl font-semibold text-gray-800 capitalize flex items-center space-x-1">
                <span class="flex items-center space-x-3">
                    <router-link to="/dashboard/quest" class="hover:text-[#e65100] transition-colors duration-200">Quest</router-link>
                    <i class='bx bx-chevrons-right'></i>
                    <span>{{ quest.name }}</span>
                </span>
                <span v-if="quest.isActive"
                    class="inline-flex overflow-hidden rounded-md border border-green-500 px-1 py-0.5 text-xs font-medium text-green-500 bg-green-500/10 mr-2">Active</span>
                <span v-else
                    class="inline-flex overflow-hidden rounded-md border border-red-500 px-1 py-0.5 text-xs font-medium text-red-500 bg-red-500/10 mr-2">Pending</span>
            </h3>
            <div class="flex items-center">
                <button type="button" @click="toggleModal"
                    class="focus:outline-none flex items-center space-x-2 text-white bg-[#e65100]  border border-[#e65100] hover:bg-white hover:text-[#e65100]  focus:ring-4 focus:ring-orange-300 font-medium rounded-md text-sm px-4 py-2.5 me-2 mb-2 transition-all duration-300 ease-in-out delay-75 whitespace-nowrap">
                    <i class='bx bx-plus'></i> <span>Contribute</span>
                </button>
                <button type="button" @click="joinQuest(quest.id)" v-if="quest.isActive && !quest.isJoined"
                    class="focus:outline-none flex items-center space-x-2 text-white bg-[#e65100]  border border-[#e65100] hover:bg-white hover:text-[#e65100]  focus:ring-4 focus:ring-orange-300 font-medium rounded-md text-sm px-4 py-2.5 me-2 mb-2 transition-all duration-300 ease-in-out delay-75 whitespace-nowrap">
                    <i class='bx bx-plus'></i> <span>Join Quest</span>
                </button>
                <button type="button" @click="initiateLeave(quest.id)" v-if="quest.isActive && quest.isJoined"
                    class="focus:outline-none flex items-center space-x-2 text-white bg-[#e65100]  border border-[#e65100] hover:bg-white hover:text-[#e65100]  focus:ring-4 focus:ring-orange-300 font-medium rounded-md text-sm px-4 py-2.5 me-2 mb-2 transition-all duration-300 ease-in-out delay-75 whitespace-nowrap">
                    <i class='bx bx-log-out-circle'></i><span>Leave Quest</span>
                </button>
            </div>
        </div>
<!-- 
                info section -->
        <section class="flex flex-col flex-wrap pt-5 my-4">
            <div class="quest-card flex flex-row flex-wrap justify-start">
                <div class="flex justify-start text-center m-2 min-h-[120px] w-full">
                    <div
                        class="flex-shrink-0 rounded-full bg-gray-100 w-24 h-24 border-2 border-[#e65100] z-10 flex justify-center items-center shadow-lg">
                        <i class='bx bxs-quote-left text-6xl p-2 w-24 h-24 text-[#e65100] opacity-60'></i>
                    </div>
                    <div
                        class="flex flex-col text-left bg-[#e65100] text-white self-center pl-16 pr-6 py-4 -ml-12 w-full rounded-r-lg shadow-md">
                        <h3 class="text-xl font-semibold uppercase mb-2">{{ quest.name }}</h3>
                        <div class="description-container max-h-[150px] overflow-y-auto pr-4 custom-scrollbar">
                            <p class="text-sm leading-relaxed opacity-90">{{ quest.description }}</p>
                        </div>
                    </div>
                </div>
            </div>
        </section>
        <div class="  text-gray-800  bg-slate-100 p-4 w-full">
            <div class="grid grid-cols-9 gap-4">
                <div class="quest-card col-span-9 sm:col-span-6 md:col-span-3">
                    <div class="flex flex-row bg-white shadow-sm rounded p-4">
                        <div
                            class="flex items-center justify-center flex-shrink-0 h-12 w-12 rounded-xl bg-blue-100 text-blue-500">
                            <i class='bx bx-coin text-2xl'></i>
                        </div>
                        <div class="flex flex-col flex-grow ml-4">
                            <div class="text-sm text-gray-500">GtCoin</div>
                            <div class="font-bold text-lg">{{ quest.gtCoin }}</div>
                        </div>
                    </div>
                </div>
                <div class="quest-card col-span-9 sm:col-span-6 md:col-span-3">
                    <div class="flex flex-row bg-white shadow-sm rounded p-4">
                        <div
                            class="flex items-center justify-center flex-shrink-0 h-12 w-12 rounded-xl bg-green-100 text-green-500">
                            <i class='bx bx-scatter-chart text-2xl'></i>
                        </div>
                        <div class="flex flex-col flex-grow ml-4">
                            <div class="text-sm text-gray-500">Points Per Milestone</div>
                            <div class="font-bold text-lg">{{ quest.pointsPerMilestone }}</div>
                        </div>
                    </div>
                </div>
                <div class="quest-card col-span-9 sm:col-span-6 md:col-span-3">
                    <div class="flex flex-row bg-white shadow-sm rounded p-4">
                        <div
                            class="flex items-center justify-center flex-shrink-0 h-12 w-12 rounded-xl bg-orange-100 text-[#e65100]">
                            <i class='bx bx-target-lock text-2xl'></i>
                        </div>
                        <div class="flex flex-col flex-grow ml-4">
                            <div class="text-sm text-gray-500">Target Amount</div>
                            <div class="font-bold text-lg">{{ formatAmount(quest.targetAmount) }}</div>
                        </div>
                    </div>
                </div>
                <div class="quest-card col-span-9 sm:col-span-6 md:col-span-3">
                    <div class="flex flex-row bg-white shadow-sm rounded p-4">
                        <div
                            class="flex items-center justify-center flex-shrink-0 h-12 w-12 rounded-xl bg-blue-100 text-blue-500">
                            <i class='bx bx-run text-2xl'></i>
                        </div>
                        <div class="flex flex-col flex-grow ml-4">
                            <div class="text-sm text-gray-500">Total Milestones</div>
                            <div class="font-bold text-lg">{{ quest.totalMilestones }}</div>
                        </div>
                    </div>
                </div>
                <div class="quest-card col-span-9 sm:col-span-6 md:col-span-3">
                    <div class="flex flex-row bg-white shadow-sm rounded p-4">
                        <div
                            class="flex items-center justify-center flex-shrink-0 h-12 w-12 rounded-xl bg-green-100 text-green-500">
                            <i class='bx bx-calendar text-2xl'></i>
                        </div>
                        <div class="flex flex-col flex-grow ml-4">
                            <div class="text-sm text-gray-500">Start Date</div>
                            <div class="font-bold text-lg">{{ quest.formattedStartDate }}</div>
                        </div>
                    </div>
                </div>
                <div class="quest-card col-span-9 sm:col-span-6 md:col-span-3">
                    <div class="flex flex-row bg-white shadow-sm rounded p-4">
                        <div
                            class="flex items-center justify-center flex-shrink-0 h-12 w-12 rounded-xl bg-orange-100 text-[#e65100]">
                            <i class='bx bx-calendar text-2xl'></i>
                        </div>
                        <div class="flex flex-col flex-grow ml-4">
                            <div class="text-sm text-gray-500">End Date</div>
                            <div class="font-bold text-lg">{{ quest.formattedEndDate }}</div>
                        </div>
                    </div>
                </div>
            </div>
        </div>


        <section class="my-10">
            <h3 class="text-xl font-bold  my-4 text-[#e65100]">LeaderBoard</h3>
            <div class="overflow-hidden w-full overflow-x-auto rounded-md border border-neutral-300">
                <table class="w-full text-left text-sm text-neutral-600 ">
                    <thead class="border-b border-neutral-300 bg-neutral-50 text-sm text-neutral-900 ">
                        <tr class="bg-[#e65100] text-white">
                            <th scope="col" class="p-4">S/N</th>
                            <th scope="col" class="p-4">Name</th>
                            <th scope="col" class="p-4">Rank</th>
                            <th scope="col" class="p-4">Total Points</th>
                            <th scope="col" class="p-4">Amount</th>
                            <th scope="col" class="p-4">GtCoin</th>
                        </tr>
                    </thead>
                    <tbody class="divide-y divide-neutral-300 ">
                        <tr v-for="player, key in leaderBoard">
                            <td class="p-4 text-[#e65100] bg-[#e65100] bg-opacity-10"># {{ key + 1 }}</td>
                            <td class="p-4 capitalize">{{ player.firstName }}</td>
                            <td class="p-4 font-bold text-[#e65100] bg-[#e65100] bg-opacity-10">{{ player.rank }}</td>
                            <td class="p-4 font-bold">{{ player.totalPoints }}</td>
                            <td class="p-4 font-bold bg-[#e65100] bg-opacity-10">₦{{ formatAmount(player.questProgress.currentAmount) }}</td>
                            <td class="p-4 font-bold">{{ player.gtCoins }}
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </section>


        <ModalComponent :showModal="showModal" @update:showModal="handleShowModalUpdate" :title="'create Quest'">
            <div class=" overflow-auto h-[200px] max-w-2xl mx-auto p-4" @submit.prevent="submitForm">
                <form class=" gap-3">
                    <div class="">
                        <label for="title" class="block text-xs font-semibold text-gray-800 mb-1">Amount <span
                                class="text-red-600 text-sm">*</span></label>
                        <input type="text" id="name" v-model="formData.amount"
                            class="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none  focus:border-red-500 focus:ring-0"
                            required placeholder="Amount eg. 10000">
                    </div>
                    <div class="p-3 mt-2 text-center space-x-4 md:block md:col-span-2">
                        <PrimaryButton type="submit" :disabled="loading">
                            {{ loading ? 'Saving...' : 'Contribute' }}
                        </PrimaryButton>
                        <button type="button" @click="toggleModal" :disabled="loading"
                            class="mb-2 md:mb-0 bg-white border border-[#DD4F05] px-4 py-2 text-sm shadow-sm font-medium tracking-wider text-[#DD4F05] rounded-lg hover:bg-[#DD4F05]/10 disabled:opacity-50 focus:outline-none focus:ring-2 focus:ring-[#DD4F05]/50">
                            Close
                        </button>
                    </div>
                </form>
            </div>
        </ModalComponent>

        <!-- Leave Quest Confirmation Modal -->
        <ModalComponent :showModal="showLeaveModal" @update:showModal="handleShowLeaveModal" :title="'Leave Quest'">
            <div class="p-4 text-center">
                <i class='bx bx-error-circle text-5xl text-[#e65100] mb-4'></i>
                <h3 class="mb-5 text-lg font-normal text-gray-500">Are you sure you want to leave this quest?</h3>
                <div class="flex justify-center gap-4">
                    <button type="button" @click="confirmLeave"
                        class="text-white bg-[#e65100] hover:bg-[#e65100]/80 focus:ring-4 focus:outline-none focus:ring-[#e65100]/50 font-medium rounded-lg text-sm inline-flex items-center px-5 py-2.5 text-center">
                        Yes, leave quest
                    </button>
                    <button type="button" @click="showLeaveModal = false"
                        class="text-gray-500 bg-white hover:bg-gray-100 focus:ring-4 focus:outline-none focus:ring-gray-200 rounded-lg border border-gray-200 text-sm font-medium px-5 py-2.5 hover:text-gray-900 focus:z-10">
                        No, cancel
                    </button>
                </div>
            </div>
        </ModalComponent>
    </main>
</template>


<style>
:root {
    --toastify-color-progress-light: orange;
}


.quest-card {
    transform-origin: center;
    animation: cardAppear 0.5s ease-out forwards;
    opacity: 0;
    height: 100%;
}

@keyframes cardAppear {
    from {
        opacity: 0;
        transform: translateY(20px);
    }

    to {
        opacity: 1;
        transform: translateY(0);
    }
}

.description-container::-webkit-scrollbar {
    width: 6px;
}

.description-container::-webkit-scrollbar-track {
    background: rgba(255, 255, 255, 0.1);
    border-radius: 3px;
}

.description-container::-webkit-scrollbar-thumb {
    background: rgba(255, 255, 255, 0.3);
    border-radius: 3px;
}

.description-container::-webkit-scrollbar-thumb:hover {
    background: rgba(255, 255, 255, 0.5);
}
</style>