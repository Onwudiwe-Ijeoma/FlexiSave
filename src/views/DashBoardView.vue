<template>
  <div class="dashboard-container">
    <!-- Top Navigation -->
    <nav class="top-nav">
      <div class="nav-left">
        <div class="nav-left-column">
          <div class="banking-header">
            <router-link to="/dashboard" class="home-icon">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                stroke-width="2"
                stroke-linecap="round"
                stroke-linejoin="round"
              >
                <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"></path>
                <polyline points="9 22 9 12 15 12 15 22"></polyline>
              </svg>
            </router-link>
            <span class="internet-banking">Internet Banking</span>
          </div>
          <!-- <button class="nav-button">Personal Banking</button> -->
        </div>
      </div>
      <div class="nav-right">
        <div class="nav-right-top">
          <img src="@/assets/GTCO.svg" alt="GTCO Logo" class="bank-logo" />
        </div>
        <div class="nav-right-bottom">
          <button class="nav-button">Online Purchase</button>
          <button class="nav-button">Transfer To Others</button>
          <button class="nav-button">Transfer To Other Banks(NIP)</button>
          <button class="nav-button">Bill Payment</button>
          <button class="nav-button">Flexi Save</button>
          <button @click="handleLogout" class="logout-btn">Log out</button>
        </div>
      </div>
    </nav>

    <!-- Search Bar -->
    <div class="search-bar">
      <input
        type="text"
        placeholder="What would you like to do today?"
        class="search-input"
      />
      <button class="go-btn">Go</button>
    </div>

    <!-- Main Content -->
    <div class="main-content">
      <!-- Left Sidebar -->
      <div class="sidebar">
        <div class="sidebar-section">
          <button class="sidebar-btn">My Accounts</button>
          <button class="sidebar-btn">Cards</button>
          <button class="sidebar-btn">Airtime & Data Bundle</button>
          <button class="sidebar-btn">Standing Payment</button>

          <!-- Flexi Save Dropdown -->
          <div class="dropdown">
            <button
              @click="toggleFlexiSave"
              class="sidebar-btn dropdown-btn"
              :class="{ active: isFlexiSaveOpen }"
            >
              Flexi Save
              <span class="dropdown-arrow">▼</span>
            </button>
            <div class="dropdown-content" v-show="isFlexiSaveOpen">
              <router-link to="/dashboard/overview" class="dropdown-item"
                >Overview</router-link
              >
              <router-link to="/dashboard/savings" class="dropdown-item"
                >Savings</router-link
              >
              <router-link to="/dashboard/quest" class="dropdown-item"
                >Quest</router-link
              >
              <router-link to="/dashboard/leaderboards" class="dropdown-item"
                >Leaderboards</router-link
              >
              <router-link to="/dashboard/rewards" class="dropdown-item"
                >Rewards</router-link
              >
            </div>
          </div>

          <button class="sidebar-btn">Quick Loans</button>
          <button class="sidebar-btn">Investment/Placement</button>
          <button class="sidebar-btn">Bancassurance Products</button>
          <button class="sidebar-btn">FX Transactions</button>
        </div>
      </div>

      <!-- Main Content Area -->
      <div class="content-area">
        <!-- Dashboard main content -->
        <div v-if="$route.path === '/dashboard'">
          <div class="main-text">
            <h1 class="font-medium text-2xl mb-2">
              Good Morning,Daniel Ibuchi
            </h1>
            <p>
              <span class="text-primary-orange-50 font-bold mr-2 mb-2">
                Your last login :</span
              >
              06-January-2025
            </p>
            <p>
              <span class="text-primary-orange-50 font-bold mr-2 mb-2"
                >BVN :</span
              >
              00976543333
            </p>
            <p>
              <span class="text-primary-orange-50 font-bold mr-2 mb-2"
                >Token Serial Number :</span
              >
              Token is not attatched to this account
            </p>
            <p>
              <span class="text-primary-orange-50 font-bold mr-2 mb-2"
                >NIN :</span
              >97987654333333
            </p>
          </div>

          <div class="dashboard-summary">
            <div class="info-box">
              <h3 class="info-header bg-primary-green-50 text-white p-2">Did you know?</h3>
              <div class="info-space">
                  <p class="info-text">
                    Instant payment is now available on both savings and current account.
                  </p>
                  <p class="info-text">
                    Savings account holders can transfer up to ₦50,000 daily using this feature. Start by clicking the 
                    <a href="#" class="account-link">Account Transfers</a> menu upon login.
                  </p>

              </div>
            </div>
          </div>

          <div class="recent-activities">
            <div class="account-status-header">
              <h3>Account Status</h3>
              <div class="balance-toggle">
                <span>Hide Balance</span>
                <label class="switch">
                  <input type="checkbox" v-model="hideBalance">
                  <span class="slider"></span>
                </label>
              </div>
            </div>
            
            <div class="account-table">
              <table>
                <thead>
                  <tr>
                    <th>Account Number</th>
                    <th>Account Name</th>
                    <th>Account Type</th>
                    <th>Currency</th>
                    <th>Account Status</th>
                    <th>Book Balance</th>
                    <th>Balance</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>3000133045</td>
                    <td>DAHUNSI DANIEL IBUCHI</td>
                    <td>CURRENT</td>
                    <td>NGN</td>
                    <td>Active</td>
                    <td>{{ hideBalance ? 'XXXXXXXX.XX' : '1,000,000.00' }}</td>
                    <td>{{ hideBalance ? 'XXXXXXXX.XX' : '1,000,000.00' }}</td>
                  </tr>
                  <tr>
                    <td>2000535679</td>
                    <td>DAHUNSI DANIEL IBUCHI</td>
                    <td>SAVINGS</td>
                    <td>NGN</td>
                    <td>Active</td>
                    <td>{{ hideBalance ? 'XXXXXXXX.XX' : '500,000.00' }}</td>
                    <td>{{ hideBalance ? 'XXXXXXXX.XX' : '500,000.00' }}</td>
                  </tr>
                  <tr>
                    <td>2000144268</td>
                    <td>DAHUNSI DANIEL IBUCHI</td>
                    <td>CURRENT</td>
                    <td>USD</td>
                    <td>Active</td>
                    <td>{{ hideBalance ? 'XXXXXXXX.XX' : '2,500.00' }}</td>
                    <td>{{ hideBalance ? 'XXXXXXXX.XX' : '2,500.00' }}</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>


          
        </div>

        <!-- Router view for other routes -->
        <router-view v-else></router-view>
      </div>

      <!-- Right Sidebar for Ads -->
      <div class="ads-sidebar">
        <!-- Add your advertisement content here -->
        <div class="ad-box">
          <img
            src="@/assets/topimage.svg"
            alt="Discount Sale"
            class="ad-image"
          />
        </div>
        <div class="ad-box">
          <img
            src="@/assets/bottomImage.svg"
            alt="Mobile Banking"
            class="ad-image"
          />
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue";
import { useRouter } from "vue-router";

const router = useRouter();
const user = ref(null);
const isFlexiSaveOpen = ref(false);
const hideBalance = ref(false);

const toggleFlexiSave = () => {
  isFlexiSaveOpen.value = !isFlexiSaveOpen.value;
};

onMounted(() => {
  const userData = localStorage.getItem("user");
  if (userData) {
    user.value = JSON.parse(userData);
  }
});

const handleLogout = () => {
  localStorage.removeItem("token");
  localStorage.removeItem("user");
  router.push("/auth");
};
</script>

<style scoped>
.dashboard-container {
  min-height: 100vh;
  max-width: 1440px;
  margin: 0 auto;
  background-color: #fff;
  box-shadow: 0 0 20px rgba(0, 0, 0, 0.1);
}

.top-nav {
  background-color: white;
  padding: 0.5rem 1rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

.nav-left {
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  height: 100%;
}

.nav-left-column {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}

.bank-logo {
  height: 40px;
}

.internet-banking {
  font-weight: bold;
  color: #e65100;
  margin-bottom: 0;
  font-size: 20px;
  padding: 0;
}

.nav-right {
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  gap: 0.5rem;
}

.nav-right-top {
  padding-right: 1rem;
}

.nav-right-bottom {
  display: flex;
  gap: 0.5rem;
}

.bank-logo {
  height: 60px;
  margin-bottom: 0.7rem;
}

.nav-button {
  padding: 0.5rem 1rem;
  background-color: #e65100;
  padding: 0.5rem 1rem;
  border-radius: 4px;
  border: none;
  cursor: pointer;
  color: white;
}

.nav-button:hover {
  background-color: white;
  color: #e65100;
  border: 1px solid #e65100;
}

.logout-btn {
  background-color: #e65100;
  color: white;
  border: none;
  padding: 0.5rem 1rem;
  border-radius: 4px;
  cursor: pointer;
}

.search-bar {
  padding: 1rem;
  display: flex;
  gap: 0.5rem;
  background-color: white;
  border-bottom: 1px solid #ddd;
}

.search-input {
  flex: 1;
  padding: 0.5rem;
  border: 1px solid #ddd;
  border-radius: 4px;
}

.go-btn {
  padding: 0.5rem 1rem;
  background-color: #e65100;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}

.main-content {
  display: grid;
  grid-template-columns: 250px 1fr 250px;
  gap: 1rem;
  padding: 1rem;
  max-width: 1440px;
  margin: 0 auto;
}

.sidebar {
  background-color: white;
  border-radius: 4px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

.sidebar-btn {
  width: 100%;
  padding: 0.75rem 1rem;
  text-align: left;
  background: none;
  border: none;
  border-bottom: 1px solid #ddd;
  cursor: pointer;
}

.sidebar-btn:hover {
  background-color: #f5f5f5;
}

.dropdown {
  position: relative;
}

.dropdown-btn {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.dropdown-content {
  background-color: white;
  border: 1px solid #ddd;
  border-radius: 4px;
  padding: 0.5rem 0;
}

.dropdown-item {
  display: block;
  padding: 0.5rem 1rem;
  text-decoration: none;
  color: #333;
}

.dropdown-item:hover {
  background-color: #f5f5f5;
}

.content-area {
  background-color: white;
  border-radius: 4px;
  padding: 1rem;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  width: 100%;
  overflow-x: hidden;
}

.ads-sidebar {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.ad-box {
  background-color: white;
  border-radius: 4px;
  overflow: hidden;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

.ad-image {
  width: 100%;
  height: auto;
}

@media (max-width: 1440px) {
  .dashboard-container {
    max-width: 100%;
  }
}

@media (max-width: 1200px) {
  .main-content {
    grid-template-columns: 250px 1fr;
    max-width: 100%;
  }
  
  .ads-sidebar {
    display: none;
  }
}

@media (max-width: 768px) {
  .dashboard-container {
    padding: 0;
  }
  
  .main-content {
    grid-template-columns: 1fr;
    padding: 0.5rem;
  }

  .top-nav {
    flex-direction: column;
    align-items: center;
    gap: 1rem;
  }

  .nav-left-column {
    align-items: center;
  }

  .nav-left,
  .nav-right {
    align-items: center;
  }

  .nav-right-bottom {
    flex-wrap: wrap;
    justify-content: center;
  }

  .sidebar {
    display: none;
  }

  .ads-sidebar {
    display: none;
  }
}

.dashboard-summary {
  margin-top: 1rem;
}

.info-box {
    margin-top: 1rem;
  background-color: #fff;
  border-radius: 8px;
  border: 1px solid #398900;
  margin-bottom: 2rem;
  width: 100%;
  max-width: 100%;
}

.info-header {
  color: #fff;
  margin-bottom: 0;
  font-weight: bold;
  padding: 1rem;
  border-radius: 8px 8px 0 0;
}

.info-space {
  padding: 1rem;
}

.info-text {
  color: #666;
  margin-bottom: 0.5rem;
  line-height: 1.5;
  font-size: 0.9rem;
}

.account-link {
  color: #e65100;
  text-decoration: underline;
}

.account-status-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1rem;
}

.balance-toggle {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  color: #e65100;
}

.switch {
  position: relative;
  display: inline-block;
  width: 60px;
  height: 34px;
}

.switch input {
  opacity: 0;
  width: 0;
  height: 0;
}

.slider {
  position: absolute;
  cursor: pointer;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: #ccc;
  transition: .4s;
  border-radius: 34px;
}

.slider:before {
  position: absolute;
  content: "";
  height: 26px;
  width: 26px;
  left: 4px;
  bottom: 4px;
  background-color: white;
  transition: .4s;
  border-radius: 50%;
}

input:checked + .slider {
  background-color: #e65100;
}

input:checked + .slider:before {
  transform: translateX(26px);
}
.home-icon{
      background-color: #e65100;
}

.account-table {
  overflow-x: auto;
  -webkit-overflow-scrolling: touch;
  margin: 0 -1rem;
  padding: 0 1rem;
}

table {
  width: 100%;
  min-width: 800px;
  border-collapse: collapse;
  margin-top: 1rem;
}

th, td {
  padding: 1rem;
  text-align: left;
  border-bottom: 1px solid #eee;
}

th {
  background-color: #f5f5f5;
  font-weight: 600;
  color: #333;
}

tr:hover {
  background-color: #f9f9f9;
}

@media (max-width: 768px) {
  .account-status-header {
    flex-direction: column;
    gap: 1rem;
    align-items: flex-start;
  }

  .balance-toggle {
    width: 100%;
    justify-content: space-between;
  }

  .info-space {
    padding: 0.75rem;
  }

  .info-text {
    font-size: 0.85rem;
  }

  th, td {
    padding: 0.75rem 0.5rem;
    font-size: 0.85rem;
  }
}

@media (max-width: 480px) {
  .info-header {
    font-size: 1rem;
    padding: 0.75rem;
  }

  .account-status-header h3 {
    font-size: 1.1rem;
  }

  .balance-toggle span {
    font-size: 0.9rem;
  }

  .switch {
    width: 50px;
    height: 28px;
  }

  .slider:before {
    height: 20px;
    width: 20px;
  }
}

.account-table::-webkit-scrollbar {
  height: 6px;
}

.account-table::-webkit-scrollbar-track {
  background: #f1f1f1;
  border-radius: 3px;
}

.account-table::-webkit-scrollbar-thumb {
  background: #e65100;
  border-radius: 3px;
}

.account-table::-webkit-scrollbar-thumb:hover {
  background: #d64d00;
}

.main-text {
  padding: 0.5rem;
}

.main-text h1 {
  font-size: clamp(1.25rem, 2vw, 1.5rem);
  margin-bottom: 1rem;
}

.main-text p {
  font-size: clamp(0.875rem, 1.5vw, 1rem);
  margin-bottom: 0.5rem;
}

@media (max-width: 768px) {
  .content-area {
    padding: 0.75rem;
    margin: 0.5rem;
  }

  .main-text {
    padding: 0.25rem;
  }

  .dashboard-summary {
    margin-top: 0.5rem;
  }

  .info-box {
    margin: 0.5rem 0;
  }
}

@media (max-width: 480px) {
  .content-area {
    padding: 0.5rem;
    margin: 0.25rem;
  }

  .main-text h1 {
    margin-bottom: 0.75rem;
  }

  .main-text p {
    margin-bottom: 0.375rem;
  }

  .info-box {
    margin: 0.375rem 0;
  }
}

</style>
