<template>
  <div class="min-h-screen bg-gradient-to-br from-orange-50 to-orange-100 flex items-center justify-center p-4">
    <div class="max-w-2xl w-full">
      <!-- Error Content -->
      <div class="text-center">
        <!-- Animated Error Number -->
        <div class="relative mb-8">
          <div class="text-[150px] md:text-[200px] font-bold text-orange-500 opacity-10 animate-pulse">
            404
          </div>
          <div class="absolute inset-0 flex items-center justify-center">
            <div class="text-4xl md:text-6xl font-bold text-orange-600 animate-bounce">
              Oops!
            </div>
          </div>
        </div>

        <!-- Error Message -->
        <h1 class="text-2xl md:text-3xl font-semibold text-gray-800 mb-4 animate-fade-in">
          Looks like you've found a digital dead end
        </h1>
        <p class="text-gray-600 mb-8 max-w-md mx-auto animate-fade-in-up">
          The page you're looking for is missing, but your savings aren’t.
          Let's get you back on track!
        </p>

        <!-- Interactive Elements -->
        <div class="space-y-4 animate-fade-in-up" style="animation-delay: 200ms;">
          <!-- Action Buttons -->
          <div class="flex flex-col sm:flex-row gap-4 justify-center">
            <router-link 
              to="/dashboard"
              class="inline-flex items-center justify-center px-6 py-3 bg-gradient-to-r from-orange-500 to-orange-600 text-white font-medium rounded-xl hover:from-orange-600 hover:to-orange-700 transition-all duration-300 group"
            >
              <span class="mr-2">← Back to Dashboard</span>
            </router-link>
            
            <button 
              @click="reportIssue"
              class="inline-flex items-center justify-center px-6 py-3 border-2 border-orange-500 text-orange-600 font-medium rounded-xl hover:bg-orange-50 transition-all duration-300"
            >
              Report Issue
            </button>
          </div>

          <!-- Quick Links -->
          <!-- <div class="mt-8 pt-8 border-t border-orange-200">
            <p class="text-gray-600 mb-4">Or try these popular pages:</p>
            <div class="flex flex-wrap justify-center gap-4">
              <router-link 
                v-for="link in quickLinks" 
                :key="link.path" 
                :to="link.path"
                class="px-4 py-2 bg-white rounded-lg shadow-sm hover:shadow-md transition-all duration-300 text-gray-700 hover:text-orange-600 flex items-center gap-2"
              >
                <span class="text-xl">{{ link.icon }}</span>
                {{ link.name }}
              </router-link>
            </div>
          </div> -->
        </div>
      </div>

      <!-- Decorative Elements -->
      <div class="absolute top-10 left-10 w-20 h-20 bg-orange-200 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob"></div>
      <div class="absolute top-10 right-10 w-20 h-20 bg-orange-300 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob animation-delay-2000"></div>
      <div class="absolute bottom-10 left-20 w-20 h-20 bg-orange-400 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob animation-delay-4000"></div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()

// const quickLinks = [
//   { name: 'Overview', path: '/dashboard/overview', icon: '📊' },
//   { name: 'Savings', path: '/dashboard/savings', icon: '💰' },
//   { name: 'Rewards', path: '/dashboard/rewards', icon: '🎁' },
//   { name: 'Wallets', path: '/dashboard/wallets', icon: '👛' }
// ]

const reportIssue = () => {
  // Implement your issue reporting logic here
  alert('Thank you for reporting this issue. Our team will look into it.')
}
</script>

<style scoped>
@keyframes blob {
  0% {
    transform: translate(0px, 0px) scale(1);
  }
  33% {
    transform: translate(30px, -50px) scale(1.1);
  }
  66% {
    transform: translate(-20px, 20px) scale(0.9);
  }
  100% {
    transform: translate(0px, 0px) scale(1);
  }
}

.animate-blob {
  animation: blob 7s infinite;
}

.animation-delay-2000 {
  animation-delay: 2s;
}

.animation-delay-4000 {
  animation-delay: 4s;
}

@keyframes fade-in {
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
}

.animate-fade-in {
  animation: fade-in 1s ease-out forwards;
}

@keyframes fade-in-up {
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.animate-fade-in-up {
  animation: fade-in-up 1s ease-out forwards;
}
</style> 