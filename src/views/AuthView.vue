<template>
    
    <div class="auth-container">
        <div class="right-section">
        <div class="logo-container">
        <img src="@/assets/gtco.svg" alt="GTCO Logo" class="gtco-logo">
      </div>
      <div class="login-content">
        <div class="header">
          <h2>INTERNET BANKING</h2>
        </div>
        
        <div class="login-card">
          <p class="welcome-text">WELCOME BACK!</p>
          <p class="login-instruction">Kindly login with any of UserID, Account Number, Phone Number or Email</p>
          
          <form @submit.prevent="handleSubmit">
            <div v-if="loginError" class="error-message alert">
                {{ loginError }}
            </div>
            <div class="form-group">
              <input 
                type="email" 
                v-model="userId" 
                placeholder="Enter your email"
                ref="userIdInput"
                @focus="handleFocus('userId')"
                @input="validateEmail"
                :class="{ 'error': emailError }"
              >
              <small class="error-message" v-if="emailError">{{ emailError }}</small>
            </div>
            <div class="form-group password-group">
              <input 
                :type="showPassword ? 'text' : 'password'" 
                v-model="password" 
                placeholder="Password"
                ref="passwordInput"
                @focus="handleFocus('password')"
                :class="{ 'active': activeInput === 'password' }"
              >
              <span class="password-toggle" @click="togglePassword">
                👁️
              </span>
            </div>

            <!-- Number pad -->
            <div class="number-pad">
              <div class="number-row">
                <button type="button" class="num-btn" @click="appendNumber('9')">9</button>
                <button type="button" class="num-btn" @click="appendNumber('8')">8</button>
                <button type="button" class="num-btn" @click="appendNumber('6')">6</button>
                <button type="button" class="clr-btn" @click="clearInput">CLR</button>
              </div>
              <div class="number-row">
                <button type="button" class="num-btn" @click="appendNumber('7')">7</button>
                <button type="button" class="num-btn" @click="appendNumber('4')">4</button>
                <button type="button" class="num-btn" @click="appendNumber('1')">1</button>
                <button type="button" class="del-btn" @click="deleteLastChar">DEL</button>
              </div>
              <div class="number-row">
                <button type="button" class="num-btn" @click="appendNumber('3')">3</button>
                <button type="button" class="num-btn" @click="appendNumber('5')">5</button>
                <button type="button" class="num-btn" @click="appendNumber('2')">2</button>
                <button type="button" class="login-btn" @click="handleSubmit">LOGIN</button>
              </div>
            </div>

            <div class="form-footer">
              <label class="remember-me">
                <input type="checkbox" v-model="rememberMe">
                Remember my UserID
              </label>
              <a href="#" class="forgot-link">Forgot Login Credentials?</a>
            </div>
            
            <button type="submit" class="register-btn">CLICK TO REGISTER</button>
          </form>
        </div>

        <!-- Info Cards -->
        <div class="info-cards">
          <div class="info-card">
            <h3>Security Tips</h3>
            <p>Please note that GTBank will NEVER ask you to provide your PIN (Personal Identification Numbers)</p>
            <button>READ MORE</button>
          </div>
          <div class="info-card">
            <h3>Do you have a token?</h3>
            <p>Get a Token today and begin to carry out third party transfers and online payments.</p>
            <button>GET YOURS</button>
          </div>
          <div class="info-card">
            <h3>Account Transfers (Instant)</h3>
            <p>The fastest way to transfer money to other bank accounts</p>
            <button>TRY IT TODAY</button>
          </div>
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

const handleSubmit = async () => {
    try {
        loginError.value = '';
        const credentials = {
            email: userId.value,
            password: password.value
        };
        
        const response = await authService.login(credentials);
        
        if (response.status === 200) {
          console.log(response.data.accessToken);
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
.auth-container {
  /* display: flex; */
  min-height: 100vh;
}
.logo-container {
    display: flex;
    justify-content: flex-end;
    margin-bottom: 1rem;
    padding-right: 20px;
}

.gtco-logo {
  width: 100px;
  height: auto;
}
/* .left-section {
  flex: 1;
  background: linear-gradient(135deg, #ff6b35 0%, #ff8c42 100%);
  clip-path: polygon(0 0, 100% 0, 85% 100%, 0 100%);
} */

.right-section {
  padding: 2rem;
  /* background-color: #f5f5f5; */
}

.login-content {
  max-width: 1200px;
  margin: 0 auto;
}

.header {
  margin-bottom: 2rem;
   background-color: #f5f5f5;
}

.header h2 {
  color: #333;
  font-weight: 500;
}

.login-card {
  background: white;
  padding: 2rem;
  border-radius: 8px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
  margin-bottom: 2rem;
}

.welcome-text {
  color: #ff6b35;
  font-weight: bold;
  margin-bottom: 0.5rem;
}

.login-instruction {
  color: #666;
  margin-bottom: 1.5rem;
}

.form-group {
  margin-bottom: 1rem;
  position: relative;
}

input {
  width: 100%;
  padding: 0.75rem;
  border: 1px solid #ddd;
  border-radius: 4px;
  font-size: 1rem;
}

.password-group {
  position: relative;
}

.password-toggle {
  position: absolute;
  right: 1rem;
  top: 50%;
  transform: translateY(-50%);
  cursor: pointer;
}

.number-pad {
  margin: 1rem 0;
}

.number-row {
  display: flex;
  justify-content: center;
  gap: 0.5rem;
  margin-bottom: 0.5rem;
}

.num-btn, .clr-btn, .del-btn, .login-btn {
  width: 60px;
  height: 40px;
  border: 1px solid #ddd;
  border-radius: 4px;
  background: white;
  cursor: pointer;
}

.clr-btn {
  background: #ff6b35;
  color: white;
}

.del-btn {
  background: #666;
  color: white;
}

.login-btn {
  background: #4CAF50;
  color: white;
}

.form-footer {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin: 1rem 0;
}

.register-btn {
  width: 100%;
  padding: 0.75rem;
  background: #ff6b35;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  font-weight: bold;
}

.info-cards {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 1rem;
  margin-top: 2rem;
}

.info-card {
  background: white;
  padding: 1.5rem;
  border-radius: 8px;
  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.1);
}

.info-card h3 {
  color: #333;
  margin-bottom: 1rem;
}

.info-card p {
  color: #666;
  margin-bottom: 1rem;
}

.info-card button {
  background: #666;
  color: white;
  border: none;
  padding: 0.5rem 1rem;
  border-radius: 4px;
  cursor: pointer;
}
.error-message.alert {
    background-color: #ff4444;
    color: white;
    padding: 10px;
    border-radius: 4px;
    margin-bottom: 1rem;
}

@media (max-width: 1024px) {
  .auth-container {
    flex-direction: column;
  }
  
  .left-section {
    height: 200px;
  }
  
  .info-cards {
    grid-template-columns: 1fr;
  }
}

.num-btn:active, .clr-btn:active, .del-btn:active, .login-btn:active {
  transform: scale(0.95);
}

.active-input {
  border: 2px solid #ff6b35;
}

.error {
  border-color: #ff0000 !important;
}

.error-message {
  color: #ff0000;
  font-size: 0.8rem;
  margin-top: 0.25rem;
  display: block;
}

input[type="email"] {
  width: 100%;
  padding: 0.75rem;
  border: 1px solid #ddd;
  border-radius: 4px;
  font-size: 1rem;
}

</style> 