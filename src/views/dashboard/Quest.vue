<script setup>
import { ref, computed, onMounted } from "vue";
import ModalComponent from "@/components/ModalComponent.vue";
import { questService } from "@/services/api";
import dayjs from "dayjs";
import { toast } from "vue3-toastify";
import "vue3-toastify/dist/index.css";
import PrimaryButton from "@/components/PrimaryButton.vue";

const showModal = ref(false);
const isMenuOpen = ref(0);
const allQuest = ref([]);
const error = ref(null);
const loading = ref(false);

// Add pagination state
const currentPage = ref(1);
const itemsPerPage = ref(5);

// Computed property for paginated quests
const paginatedQuests = computed(() => {
  const start = (currentPage.value - 1) * itemsPerPage.value;
  const end = start + itemsPerPage.value;
  return allQuest.value.slice(start, end);
});

// Computed property for total pages
const totalPages = computed(() => {
  return Math.ceil(allQuest.value.length / itemsPerPage.value);
});

// Pagination methods
const nextPage = () => {
  if (currentPage.value < totalPages.value) {
    currentPage.value++;
  }
};

const prevPage = () => {
  if (currentPage.value > 1) {
    currentPage.value--;
  }
};

const goToPage = (page) => {
  currentPage.value = page;
};

const formData = ref({
  name: "",
  targetAmount: "",
  description: "",
  totalMilestones: "",
  pointsPerMilestone: "",
  gtCoin: "",
  startDate: "",
  endDate: "",
});

const toggleModal = () => {
  showModal.value = !showModal.value;
  formData.value = {};
};
const openMenu = (id) => {
  isMenuOpen.value == id ? (isMenuOpen.value = 0) : (isMenuOpen.value = id);
  // console.log(isMenuOpen.value);
};
const tostifyMessage = (message) => {
  toast(message, {
    autoClose: 1000,
  });
};

const handleShowModalUpdate = (value) => {
  showModal.value = value;
};

const fetchAndFormatQuests = async () => {
  try {
    loading.value = true;
    error.value = null;
    const response = await questService.getAll();
    allQuest.value = response.data.map((quest) => ({
      ...quest,
      formattedStartDate: dayjs(quest.startDate).format("MMM D, YYYY h:mm A"),
      formattedEndDate: dayjs(quest.endDate).format("MMM D, YYYY h:mm A"),
    }));
  } catch (err) {
    error.value = "Failed to load quests. Please try again later.";
    console.error("Failed to fetch quests:", err);
  } finally {
    loading.value = false;
  }
};

onMounted(() => {
  fetchAndFormatQuests();
});

const submitForm = async () => {
  let response = await questService.create(formData.value);
  fetchAndFormatQuests();
  tostifyMessage("Quest Created Successfully");
  showModal.value = false;
};

const joinQuest = async (id) => {
  try {
    loading.value = true;
    error.value = null;
    const response = await questService.joinQuest(id);
    // Update just the joined quest instead of refetching all
    const updatedQuest = allQuest.value.find((q) => q.id === id);
    if (updatedQuest) {
      updatedQuest.isJoined = true;
    }
    tostifyMessage(response.data.message);
  } catch (err) {
    error.value = "Failed to join quest. Please try again.";
    console.error("Failed to join quest:", err);
  } finally {
    loading.value = false;
  }
};
const updateQuest = async () => {
  try {
    const response = await questService.updateQuest(formData.value);
    fetchAndFormatQuests();
    formData.value = {};
    showModal.value = false;
    tostifyMessage("Updated Successfully");
  } catch (error) {
    console.error("Error updating quest:", error);
  }
};

const getQuest = async (id) => {
  const questToUpdate = allQuest.value.find((quest) => quest.id === id);
  showModal.value = true;
  if (!questToUpdate) {
    console.error(`Quest with ID ${id} not found`);
    return;
  }
  formData.value = questToUpdate;
};
const formatAmount = (value) => {
  return new Intl.NumberFormat("en-NG").format(value || 0);
};

const leaveQuest = async (id) => {
  try {
    loading.value = true;
    error.value = null;
    const response = await questService.leaveQuest(id);
    // Update just the left quest instead of refetching all
    const updatedQuest = allQuest.value.find((q) => q.id === id);
    if (updatedQuest) {
      updatedQuest.isJoined = false;
    }
    tostifyMessage(response.data.message);
  } catch (err) {
    error.value = "Failed to leave quest. Please try again.";
    console.error("Failed to leave quest:", err);
  } finally {
    loading.value = false;
  }
};
const deleteQuest = async (id) => {
  try {
    loading.value = true;
    error.value = null;
    await questService.deleteQuest(id);
    // Remove the deleted quest from the local array instead of refetching
    allQuest.value = allQuest.value.filter((q) => q.id !== id);
    tostifyMessage("Deleted Successfully");
  } catch (err) {
    error.value = "Failed to delete quest. Please try again.";
    console.error("Failed to delete quest:", err);
  } finally {
    loading.value = false;
  }
};
</script>

<template>
  <main class="font-['Poppins']">
    <div class="flex justify-between items-center">
      <h3 class="text-xl font-semibold text-gray-800">All Quests</h3>
      <div>
        <button
          type="button"
          @click="toggleModal"
          class="focus:outline-none flex items-center space-x-2 text-white bg-[#e65100] border border-[#e65100] hover:bg-white hover:text-[#e65100] focus:ring-4 focus:ring-orange-300 font-medium rounded-md text-sm px-4 py-2.5 me-2 mb-2 transition-all duration-300 ease-in-out delay-75"
        >
          <i class="bx bx-plus"></i> <span>Create Quest</span>
        </button>
      </div>
    </div>

    <!-- Error Message -->
    <div
      v-if="error"
      class="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative mt-4"
      role="alert"
    >
      <span class="block sm:inline">{{ error }}</span>
    </div>

    <!-- Loading State -->
    <div v-if="loading" class="flex justify-center items-center py-4">
      <div
        class="animate-spin rounded-full h-8 w-8 border-b-2 border-red-700"
      ></div>
    </div>
    <!-- Quest table -->
    <section v-else class="my-10">
      <div
        class="overflow-hidden w-full overflow-x-auto rounded-md border border-neutral-300"
      >
        <table class="w-full text-left text-sm text-neutral-600">
          <thead
            class="border-b border-neutral-300 bg-neutral-50 text-sm text-neutral-900"
          >
            <tr class="bg-[#e65100] text-white">
              <th scope="col" class="p-4">S/N</th>
              <th scope="col" class="p-4">Quest</th>
              <th scope="col" class="p-4">Target Amount</th>
              <th scope="col" class="p-4">Status</th>
              <th scope="col" class="p-4">Action</th>
            </tr>
          </thead>
          <tbody class="divide-y divide-neutral-300">
            <tr
              v-for="(quest, key) in paginatedQuests"
              :key="quest.id"
              class="animate-table hover:bg-gray-50"
            >
              <td class="p-4">
                #{{ (currentPage - 1) * itemsPerPage + key + 1 }}
              </td>
              <td class="">
                <router-link
                  :to="'/dashboard/quest/' + quest.id"
                  class="flex w-max items-center gap-2 p-4 hover:bg-slate-100"
                >
                  <img
                    class="size-10 rounded-full object-cover"
                    src="https://penguinui.s3.amazonaws.com/component-assets/avatar-1.webp"
                    alt="user avatar"
                  />
                  <div class="flex flex-col">
                    <span class="text-neutral-900 capitalize font-bold">{{
                      quest.name
                    }}</span>
                    <span>
                      <span class="text-sm text-neutral-600 opacity-85">{{
                        quest.formattedStartDate
                      }}</span>
                      -
                      <br />
                      <span class="text-sm text-neutral-600 opacity-85">{{
                        quest.formattedEndDate
                      }}</span>
                    </span>
                  </div>
                </router-link>
              </td>
              <td class="p-4">₦ {{ formatAmount(quest.targetAmount) }}</td>
              <td class="p-4">
                <span
                  v-if="quest.isActive"
                  class="inline-flex overflow-hidden rounded-md border border-green-500 px-1 py-0.5 text-xs font-medium text-green-500 bg-green-500/10"
                  >Active</span
                >
                <span
                  v-else
                  class="inline-flex overflow-hidden rounded-md border border-red-500 px-1 py-0.5 text-xs font-medium text-red-500 bg-red-500/10"
                  >Pending</span
                >
              </td>
              <td class="p-4 space-x-2">
                <div class="absolute">
                  <button type="button" class="" @click="openMenu(quest.id)">
                    <i
                      class="bx bx-dots-vertical-rounded font-bold text-xl hover:text-gray-800"
                    ></i>
                  </button>
                  <!-- Dropdown Menu -->
                  <div
                    v-show="isMenuOpen == quest.id"
                    class="absolute top-7 md:-right-10 flex w-full min-w-[8rem] flex-col overflow-hidden rounded-md border border-neutral-300 bg-neutral-50 shadow z-50"
                    role="menu"
                  >
                    <button
                      v-if="quest.isActive && !quest.isJoined"
                      type="button"
                      @click="joinQuest(quest.id), openMenu(quest.id)"
                      class="bg-neutral-50 px-4 py-2 text-sm text-neutral-600 hover:bg-orange-200 hover:text-neutral-900 focus-visible:bg-neutral-900/10 focus-visible:text-neutral-900 focus-visible:outline-none flex items-center space-x-1"
                      role="menuitem"
                    >
                      <i class="bx bx-plus-circle"></i> <span>Join</span>
                    </button>
                    <button
                      v-if="quest.isActive && quest.isJoined"
                      type="button"
                      @click="leaveQuest(quest.id), openMenu(quest.id)"
                      class="bg-neutral-50 px-4 py-2 text-sm text-neutral-600 hover:bg-orange-200 hover:text-neutral-900 focus-visible:bg-neutral-900/10 focus-visible:text-neutral-900 focus-visible:outline-none flex items-center space-x-1"
                      role="menuitem"
                    >
                      <i class="bx bx-log-out-circle"></i><span>Leave</span>
                    </button>
                    <button
                      type="button"
                      @click="deleteQuest(quest.id), openMenu(quest.id)"
                      class="bg-neutral-50 px-4 py-2 text-sm text-neutral-600 hover:bg-orange-200 hover:text-neutral-900 focus-visible:bg-neutral-900/10 focus-visible:text-neutral-900 focus-visible:outline-none flex items-center space-x-1"
                      role="menuitem"
                    >
                      <i class="bx bx-trash"></i><span>Delete</span>
                    </button>
                    <button
                      type="button"
                      @click="getQuest(quest.id), openMenu(quest.id)"
                      class="bg-neutral-50 px-4 py-2 text-sm text-neutral-600 hover:bg-orange-200 hover:text-neutral-900 focus-visible:bg-neutral-900/10 focus-visible:text-neutral-900 focus-visible:outline-none flex items-center space-x-1"
                      role="menuitem"
                    >
                      <i class="bx bx-edit-alt"></i><span>Update</span>
                    </button>
                  </div>
                </div>
              </td>
            </tr>
          </tbody>
        </table>

        <!-- Pagination Controls -->
        <div
          class="flex items-center justify-between border-t border-gray-200 bg-white px-4 py-3 sm:px-6"
        >
          <div class="flex flex-1 justify-between sm:hidden">
            <button
              @click="prevPage"
              :disabled="currentPage === 1"
              class="relative inline-flex items-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50"
              :class="{ 'opacity-50 cursor-not-allowed': currentPage === 1 }"
            >
              Previous
            </button>
            <button
              @click="nextPage"
              :disabled="currentPage === totalPages"
              class="relative ml-3 inline-flex items-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50"
              :class="{
                'opacity-50 cursor-not-allowed': currentPage === totalPages,
              }"
            >
              Next
            </button>
          </div>
          <div
            class="hidden sm:flex sm:flex-1 sm:items-center sm:justify-between"
          >
            <div>
              <p class="text-sm text-gray-700">
                Showing
                <span class="font-medium">{{
                  (currentPage - 1) * itemsPerPage + 1
                }}</span>
                to
                <span class="font-medium">{{
                  Math.min(currentPage * itemsPerPage, allQuest.length)
                }}</span>
                of
                <span class="font-medium">{{ allQuest.length }}</span>
                results
              </p>
            </div>
            <div>
              <nav
                class="isolate inline-flex -space-x-px rounded-md shadow-sm"
                aria-label="Pagination"
              >
                <button
                  @click="prevPage"
                  :disabled="currentPage === 1"
                  class="relative inline-flex items-center rounded-l-md px-2 py-2 text-gray-400 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:z-20 focus:outline-offset-0"
                  :class="{
                    'opacity-50 cursor-not-allowed': currentPage === 1,
                  }"
                >
                  <span class="sr-only">Previous</span>
                  <i class="bx bx-chevron-left"></i>
                </button>
                <!-- Page numbers -->
                <template v-for="page in totalPages" :key="page">
                  <button
                    @click="goToPage(page)"
                    class="relative inline-flex items-center px-4 py-2 text-sm font-semibold focus:z-20"
                    :class="[
                      currentPage === page
                        ? 'bg-[#e65100] text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#e65100]'
                        : 'text-gray-900 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:outline-offset-0',
                    ]"
                  >
                    {{ page }}
                  </button>
                </template>
                <button
                  @click="nextPage"
                  :disabled="currentPage === totalPages"
                  class="relative inline-flex items-center rounded-r-md px-2 py-2 text-gray-400 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:z-20 focus:outline-offset-0"
                  :class="{
                    'opacity-50 cursor-not-allowed': currentPage === totalPages,
                  }"
                >
                  <span class="sr-only">Next</span>
                  <i class="bx bx-chevron-right"></i>
                </button>
              </nav>
            </div>
          </div>
        </div>
      </div>
    </section>

    <ModalComponent
      :showModal="showModal"
      @update:showModal="handleShowModalUpdate"
      :title="'create Quest'"
    >
      <div
        class="overflow-auto h-[500px] max-w-2xl mx-auto p-4"
        @submit.prevent="formData.id ? updateQuest() : submitForm()"
      >
        <form class="grid md:grid-cols-2 gap-3">
          <div class="">
            <label
              for="title"
              class="block text-xs font-semibold text-gray-800 mb-1"
              >Name <span class="text-red-600 text-sm">*</span></label
            >
            <input
              type="text"
              id="name"
              v-model="formData.name"
              class="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-red-500 focus:ring-0"
              required
              placeholder="name"
            />
          </div>
          <div class="">
            <label
              for="targetAmount"
              class="block text-xs font-semibold text-gray-800 mb-1"
              >Target Amout <span class="text-red-600 text-sm">*</span></label
            >
            <input
              type="number"
              id="targetAmount"
              v-model="formData.targetAmount"
              class="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-red-500 focus:ring-0"
              required
              placeholder="1000"
            />
          </div>

          <div class="md:col-span-2">
            <label
              for="Description"
              class="block text-xs font-semibold text-gray-800 mb-1"
              >Description <span class="text-red-600 text-sm">*</span></label
            >
            <textarea
              id="Description"
              v-model="formData.description"
              class="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-red-500 focus:ring-0"
              rows="4"
              required
            ></textarea>
          </div>
          <div class="md:col-span-2 grid grid-cols-3 gap-3">
            <div class="">
              <label
                for="totalMilestones"
                class="block text-xs font-semibold text-gray-800 mb-1"
                >Total Milstones
                <span class="text-red-600 text-sm">*</span></label
              >
              <input
                type="number"
                id="totalMilestones"
                v-model="formData.totalMilestones"
                class="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-red-500 focus:ring-0"
                required
                placeholder="1000"
              />
            </div>
            <div class="">
              <label
                for="pointsPerMilestone"
                class="block text-xs font-semibold text-gray-800 mb-1"
                >Points Per Milstone
                <span class="text-red-600 text-sm">*</span></label
              >
              <input
                type="number"
                id="pointsPerMilestone"
                v-model="formData.pointsPerMilestone"
                class="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-red-500 focus:ring-0"
                required
                placeholder="1000"
              />
            </div>

            <div class="">
              <label
                for="gtCoin"
                class="block text-xs font-semibold text-gray-800 mb-1"
                >gtcoin</label
              >
              <input
                type="number"
                id="gtCoin"
                v-model="formData.gtCoin"
                class="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-red-500 focus:ring-0"
                placeholder="1000"
              />
            </div>
          </div>

          <div class="">
            <label
              for="startDate"
              class="block text-xs font-semibold text-gray-800 mb-1"
              >Start Date <span class="text-red-600 text-sm">*</span></label
            >
            <input
              type="date"
              id="startDate"
              v-model="formData.startDate"
              class="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-red-500 focus:ring-0"
              required
              placeholder="1000"
            />
          </div>
          <div class="">
            <label
              for="endDate"
              class="block text-xs font-semibold text-gray-800 mb-1"
              >End Date <span class="text-red-600 text-sm">*</span></label
            >
            <input
              type="date"
              id="endDate"
              v-model="formData.endDate"
              class="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-red-500 focus:ring-0"
              required
              placeholder="1000"
            />
          </div>

          <div class="p-3 mt-2 text-center space-x-4 md:block md:col-span-2">
            <PrimaryButton type="submit" :disabled="loading">
              {{ loading ? "Saving..." : "Save" }}
            </PrimaryButton>
            <button
              type="button"
              @click="toggleModal"
              :disabled="loading"
              class="mb-2 md:mb-0 bg-white border border-[#DD4F05] px-4 py-2 text-sm shadow-sm font-medium tracking-wider text-[#DD4F05] rounded-lg hover:bg-[#DD4F05]/10 disabled:opacity-50 focus:outline-none focus:ring-2 focus:ring-[#DD4F05]/50"
            >
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

:root {
  --toastify-color-progress-light: orange;
}

.animate-table {
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
</style>
