<script setup>
import { ref } from 'vue';
import Navbar from '../components/layout/Navbar.vue';
import Sidebar from '../components/layout/Sidebar.vue';

const isSidebarOpen = ref(true);
</script>

<template>
    <div class="layout-wrapper">
        <Navbar @toggleSidebar="isSidebarOpen = !isSidebarOpen" />
        <div class="body-wrapper">
            <Sidebar :isOpen="isSidebarOpen" />
            <main class="main-content">
                <slot/>
            </main>
        </div>
    </div>
</template>

<style>
:deep(.confirm-modal-backdrop) {
    z-index: 10000 !important; 
}
html,
body {
    margin: 0;
    padding: 0;
    width: 100%;
    height: 100%;
    overflow-x: hidden;
    background-color: #020617;
}

* {
    box-sizing: border-box;
}

.layout-wrapper {
    display: flex;
    flex-direction: column;
    height: 100vh;
    width: 100%;
    overflow: hidden;
}

.body-wrapper {
    display: flex;
    flex: 1;
    width: 100%;
    overflow: hidden;
}

.main-content {
    flex: 1;
    min-width: 0;
    padding: 25px;
    background-color: #020617;
    overflow-y: auto;
    overflow-x: hidden;
}

* {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
}

body {
    font-family: 'Inter', sans-serif;
    background-color: #020617;
    color: #fff;
    overflow: hidden;
}

.layout-wrapper {
    display: flex;
    flex-direction: column;
    height: 100vh;
    width: 100vw;
}

.body-wrapper {
    display: flex;
    flex: 1;
    overflow: hidden;
}

.main-content {
    flex: 1;
    padding: 30px;
    background-color: #020617;
    overflow-y: auto;
}
</style>