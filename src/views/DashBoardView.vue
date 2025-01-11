<template>
    <div class="dashboard-container">
        <!-- Top Navigation -->
        <nav class="top-nav">
            <div class="nav-left">
                <img src="@/assets/GTCO.svg" alt="GTCO Logo" class="bank-logo">
                <span class="internet-banking">Internet Banking</span>
            </div>
            <div class="nav-right">
                <button class="nav-button">Online Purchase</button>
                <button class="nav-button">Transfer To Others</button>
                <button class="nav-button">Transfer To Other Banks(NIP)</button>
                <button class="nav-button">Bill Payment</button>
                <button class="nav-button">Quick Save</button>
                <button @click="handleLogout" class="logout-btn">Log Off</button>
            </div>
        </nav>

        <!-- Search Bar -->
        <div class="search-bar">
            <input type="text" placeholder="What would you like to do today?" class="search-input">
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
                        <button @click="toggleFlexiSave" class="sidebar-btn dropdown-btn" 
                                :class="{ 'active': isFlexiSaveOpen }">
                            Flexi Save
                            <span class="dropdown-arrow">▼</span>
                        </button>
                        <div class="dropdown-content" v-show="isFlexiSaveOpen">
                            <router-link to="/dashboard/overview" class="dropdown-item">Overview</router-link>
                            <router-link to="/dashboard/savings" class="dropdown-item">Savings</router-link>
                            <router-link to="/dashboard/quest" class="dropdown-item">Quest</router-link>
                            <router-link to="/dashboard/leaderboards" class="dropdown-item">Leaderboards</router-link>
                            <router-link to="/dashboard/rewards" class="dropdown-item">Rewards</router-link>
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
                <h2>Good Morning Daniel Ibuchi</h2>
                <p><span>Your lastlogin</span> 06-January-2025</p>
                <p><span>BVN</span>00976543333</p>
                <p><span>Token Serial Number</span>Token is not attatched to this account</p>
                <p><span>NIN</span>97987654333333</p>



                <router-view></router-view>
            </div>

            <!-- Right Sidebar for Ads -->
            <div class="ads-sidebar">
                <!-- Add your advertisement content here -->
                <div class="ad-box">
                    <img src="@/assets/topimage.svg" alt="Discount Sale" class="ad-image">
                </div>
                <div class="ad-box">
                    <img src="@/assets/bottomImage.svg" alt="Mobile Banking" class="ad-image">
                </div>
            </div>
        </div>
    </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { useRouter } from 'vue-router';

const router = useRouter();
const user = ref(null);
const isFlexiSaveOpen = ref(false);

const toggleFlexiSave = () => {
    isFlexiSaveOpen.value = !isFlexiSaveOpen.value;
};

onMounted(() => {
    const userData = localStorage.getItem('user');
    if (userData) {
        user.value = JSON.parse(userData);
    }
});

const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    router.push('/auth');
};
</script>

<style scoped>
.dashboard-container {
    min-height: 100vh;
    background-color: #f5f5f5;
}

.top-nav {
    background-color: white;
    padding: 0.5rem 1rem;
    display: flex;
    justify-content: space-between;
    align-items: center;
    box-shadow: 0 2px 4px rgba(0,0,0,0.1);
}

.nav-left {
    display: flex;
    align-items: center;
    gap: 1rem;
}

.bank-logo {
    height: 40px;
}

.internet-banking {
    font-weight: bold;
    color: #e65100;
}

.nav-right {
    display: flex;
    gap: 0.5rem;
}

.nav-button {
    padding: 0.5rem 1rem;
    background: none;
    border: none;
    cursor: pointer;
    color: #333;
}

.nav-button:hover {
    color: #e65100;
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
}

.sidebar {
    background-color: white;
    border-radius: 4px;
    box-shadow: 0 2px 4px rgba(0,0,0,0.1);
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
    box-shadow: 0 2px 4px rgba(0,0,0,0.1);
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
    box-shadow: 0 2px 4px rgba(0,0,0,0.1);
}

.ad-image {
    width: 100%;
    height: auto;
}

@media (max-width: 1200px) {
    .main-content {
        grid-template-columns: 250px 1fr;
    }
    .ads-sidebar {
        display: none;
    }
}

@media (max-width: 768px) {
    .top-nav {
        flex-direction: column;
        gap: 1rem;
    }
    
    .nav-right {
        flex-wrap: wrap;
        justify-content: center;
    }
    
    .main-content {
        grid-template-columns: 1fr;
    }
    
    .sidebar {
        display: none;
    }
}
</style>

