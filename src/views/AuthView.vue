<template>
  <div class="min-h-screen bg-gradient-to-br from-gray-50 to-orange-50 py-8 px-4 sm:px-6 lg:px-8">
    <div class="max-w-4xl mx-auto">
      <!-- Logo Container -->
      <div class="flex justify-end mb-6">
        <img src="@/assets/gtco.svg" alt="GTCO Logo" class="w-32 h-auto transform hover:scale-105 transition-transform duration-300" />
      </div>

      <div class="bg-gray-300 p-2 mb-4">
        <h2 class="text-2xl font-bold text-black">INTERNET BANKING</h2>
      </div>
      <!-- Main Content -->
      <div class="bg-white rounded-2xl shadow-2xl overflow-hidden">
        <!-- Header -->

        <!-- Login Form -->
        <div class="p-8">
          <form @submit.prevent="handleSubmit" class="space-y-6">
            <!-- Error Message -->
            <div v-if="loginError" class="bg-red-100 border-l-4 border-red-500 text-red-700 p-4 rounded-lg">
              <p class="font-medium">{{ loginError }}</p>
            </div>

            <!-- Email Input -->
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-1">Email Address</label>
              <div class="relative">
                <input 
                  type="email" 
                  v-model="userId" 
                  ref="userIdInput"
                  @focus="handleFocus('userId')"
                  @input="validateEmail"
                  class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500 transition-colors"
                  :class="{ 'border-red-500': emailError }"
                  placeholder="Enter your email address"
                />
                <div v-if="emailError" class="text-red-500 text-sm mt-1">{{ emailError }}</div>
              </div>
            </div>

            <!-- Password Input -->
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-1">Password</label>
              <div class="relative">
                <input 
                  :type="showPassword ? 'text' : 'password'" 
                  v-model="password" 
                  ref="passwordInput"
                  @focus="handleFocus('password')"
                  class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500 transition-colors"
                  placeholder="Enter your password"
                />
                <button 
                  type="button"
                  @click="togglePassword"
                  class="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700 transition-colors"
                >
                  <span v-if="showPassword">🔒</span>
                  <span v-else>👁️</span>
                </button>
              </div>
            </div>

            <!-- Number Pad -->
            <div class="grid grid-cols-4 gap-2 max-w-xs mx-auto mt-6">
              <button type="button" v-for="n in 9" :key="n" 
                @click="appendNumber(n.toString())"
                class="w-12 h-12 rounded-lg bg-gray-100 hover:bg-gray-200 text-gray-800 font-medium transition-colors"
              >
                {{ n }}
              </button>
              <button type="button" @click="clearInput" class="w-12 h-12 rounded-lg bg-orange-100 hover:bg-orange-200 text-orange-600 font-medium transition-colors">
                CLR
              </button>
              <button type="button" @click="appendNumber('0')" class="w-12 h-12 rounded-lg bg-gray-100 hover:bg-gray-200 text-gray-800 font-medium transition-colors">
                0
              </button>
              <button type="button" @click="deleteLastChar" class="w-12 h-12 rounded-lg bg-gray-700 hover:bg-gray-800 text-white font-medium transition-colors">
                ⌫
              </button>
              <button type="submit" class="w-12 h-12 rounded-lg bg-green-600 hover:bg-green-700 text-white font-medium transition-colors">
                →
              </button>
            </div>

            <!-- Remember Me & Forgot Password -->
            <div class="flex items-center justify-between mt-6">
              <label class="flex items-center">
                <input type="checkbox" v-model="rememberMe" class="w-4 h-4 text-orange-600 border-gray-300 rounded focus:ring-orange-500">
                <span class="ml-2 text-sm text-gray-600">Remember me</span>
              </label>
              <a href="#" class="text-sm text-orange-600 hover:text-orange-700 font-medium">Forgot Password?</a>
            </div>

            <!-- Register Button -->
            <button type="button" class="w-full py-3 px-4 bg-gradient-to-r from-orange-500 to-orange-600 text-white font-medium rounded-lg hover:from-orange-600 hover:to-orange-700 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:ring-offset-2 transform transition-all hover:scale-[1.02]">
              CREATE NEW ACCOUNT
            </button>
          </form>
        </div>
      </div>

      <!-- Info Cards -->
      <div class="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8">
        <div v-for="(card, index) in infoCards" :key="index" 
          class="bg-white rounded-xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 flex flex-col h-full"
        >
          <div class="flex-1">
            <div class="flex items-center gap-4 mb-4">
              <div class="w-12 h-12 rounded-full bg-orange-100 flex items-center justify-center">
                <span class="text-2xl">{{ card.icon }}</span>
              </div>
              <h3 class="text-lg font-semibold text-gray-800">{{ card.title }}</h3>
            </div>
            <p class="text-gray-600 mb-4">{{ card.description }}</p>
          </div>
          <button class="w-full py-2 px-4 bg-gray-800 text-white rounded-lg hover:bg-gray-900 transition-colors text-sm font-medium mt-auto">
            {{ card.buttonText }}
          </button>
        </div>
      </div>

      <!-- Footer -->
      <div class="mt-8 bg-orange-600 text-white text-center py-3 px-4 text-sm rounded-lg">
        © 2025 Guaranty Trust Bank Limited. RC 152321 (Licensed by the Central Bank of Nigeria). 
        <div class="flex justify-center gap-4 mt-1">
          <a href="https://www.gtbank.com" class="hover:underline">GTBANK.COM</a> |
          <a href="#" class="hover:underline">PRIVACY POLICY</a> |
          <a href="#" class="hover:underline">TERMS & CONDITIONS</a> |
          <a href="#" class="hover:underline">WHISTLE BLOWER</a>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import { authService } from '@/services/api';

const router = useRouter();
const userId = ref('');
const password = ref('');
const showPassword = ref(false);
const rememberMe = ref(false);
const emailError = ref('');
const loginError = ref('');
const activeInput = ref(null);

const userIdInput = ref(null);
const passwordInput = ref(null);

const infoCards = [
  {
    icon: '🔒',
    title: 'Security Tips',
    description: 'Please note that GTBank will NEVER ask you to provide your PIN (Personal Identification Numbers)',
    buttonText: 'READ MORE'
  },
  {
    icon: '🔑',
    title: 'Do you have a token?',
    description: 'Get a Token today and begin to carry out third party transfers and online payments.',
    buttonText: 'GET YOURS'
  },
  {
    icon: '💸',
    title: 'Account Transfers (Instant)',
    description: 'The fastest way to transfer money to other bank accounts',
    buttonText: 'TRY IT TODAY'
  }
];

const handleSubmit = async () => {
    try {
        loginError.value = '';
        const credentials = {
            email: userId.value,
            password: password.value
        };
        
        const response = await authService.login(credentials);
        
        if (response.status === 200) {
            localStorage.setItem('token', response.data.accessToken);
            
            
            if (response.data.user) {
                localStorage.setItem('user', JSON.stringify(response.data.user));
            }
            
            if (rememberMe.value) {
                localStorage.setItem('userId', userId.value);
            }

            router.push('/dashboard');
        }
    } catch (error) {
        console.error('Login failed:', error);
        loginError.value = error.response?.data?.message || 'Login failed. Please try again.';
    }
};

const togglePassword = () => {
    showPassword.value = !showPassword.value;
};

const validateEmail = () => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(userId.value)) {
        emailError.value = 'Please enter a valid email address';
    } else {
        emailError.value = '';
    }
};

const appendNumber = (num) => {
    if (activeInput.value === 'userId') {
        userId.value += num;
    } else if (activeInput.value === 'password') {
        password.value += num;
    }
};

const clearInput = () => {
    if (activeInput.value === 'userId') {
        userId.value = '';
    } else if (activeInput.value === 'password') {
        password.value = '';
    }
};

const deleteLastChar = () => {
    if (activeInput.value === 'userId') {
        userId.value = userId.value.slice(0, -1);
    } else if (activeInput.value === 'password') {
        password.value = password.value.slice(0, -1);
    }
};

const handleFocus = (inputType) => {
    activeInput.value = inputType;
};
</script>

<style scoped>
/* Remove all existing styles and keep only these animation-related ones */
.num-btn:active, .clr-btn:active, .del-btn:active, .login-btn:active {
  transform: scale(0.95);
}

@keyframes fadeIn {
  from {
    opacity: 0;
    transform: translateY(10px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.fade-in {
  animation: fadeIn 0.5s ease-out forwards;
}
</style> 