<script setup>
import { useRoute } from 'vue-router';
import { ref, computed, onMounted } from 'vue';
import { learderBoardService } from '@/services/api';
import { questService } from '@/services/api';
import { toast } from 'vue3-toastify';
import 'vue3-toastify/dist/index.css';

const route = useRoute();

const quest = ref([]);


const tostifyMessage = (message) => {
    toast(message, {
        autoClose: 1000,
    });
}

onMounted(async () => {
    getAllLeaderBoard();
    getOneQuest();
});
const getAllLeaderBoard = async () => {
    let response = await learderBoardService.getAll();
    console.log(response);
}
const getOneQuest = async () => {
    let response = await questService.getOne(route.params.id);
    quest.value = response.data;
    // console.log(quest.value);
}


const joinQuest = async (id) => {
    let response = await questService.joinQuest(id);
    tostifyMessage(response.data.message);
}

const leaveQuest = async (id) => {
    let response = await questService.leaveQuest(id);
    tostifyMessage(response.data.message);
}

</script>
<template>
    <main>
        <div class=" flex justify-between items-center">
            <h3 class="text-2xl font-semibold text-gray-800 capitalize flex items-center space-x-1">
                <span>{{ quest.name }}</span>
                <span v-if="quest.isActive"
                    class="inline-flex overflow-hidden rounded-md border border-green-500 px-1 py-0.5 text-xs font-medium text-green-500 bg-green-500/10">Active</span>
                <span v-else
                    class="inline-flex overflow-hidden rounded-md border border-red-500 px-1 py-0.5 text-xs font-medium text-red-500 bg-red-500/10">Pending</span>
            </h3>
            <div class="flex items-center space-x-2">
                <button type="button" @click="joinQuest(quest.id)"
                    class="focus:outline-none flex items-center space-x-2 text-white bg-red-700 hover:bg-red-800 focus:ring-4 focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-900">
                    <i class='bx bx-plus'></i> <span>Join Quest</span>
                </button>
                <button type="button" @click="leaveQuest(quest.id)"
                    class="focus:outline-none flex items-center space-x-2 text-white bg-red-700 hover:bg-red-800 focus:ring-4 focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-900">
                    <i class='bx bx-log-out-circle'></i><span>Leave Quest</span>
                </button>
            </div>
        </div>


        <section class="my-10">
            <div class="overflow-hidden w-full overflow-x-auto rounded-md border border-neutral-300">
                <table class="w-full text-left text-sm text-neutral-600 ">
                    <thead class="border-b border-neutral-300 bg-neutral-50 text-sm text-neutral-900 ">
                        <tr>
                            <th scope="col" class="p-4">S/N</th>
                            <th scope="col" class="p-4">Name</th>
                            <th scope="col" class="p-4">Rank</th>
                            <th scope="col" class="p-4">Amount</th>
                            <th scope="col" class="p-4">GtCoin</th>
                        </tr>
                    </thead>
                    <tbody class="divide-y divide-neutral-300 ">
                        <tr>
                            <td class="p-4">#1</td>
                            <td class="p-4">hello</td>
                            <td class="p-4">hello</td>
                            <td class="p-4">hello</td>
                            <td class="p-4">hello</td>
                        </tr>
                        <tr>
                            <td class="p-4">#2</td>
                            <td class="p-4">hello</td>
                            <td class="p-4">hello</td>
                            <td class="p-4">hello</td>
                            <td class="p-4">hello</td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </section>
    </main>
</template>


<style lang="scss" scoped></style>