import { defineStore } from "pinia";
import { ref, computed } from "vue";
import api from "@/api/https";

export const useAuthStore = defineStore("auth", () => {
  // --- STATE ---
  const token = ref(localStorage.getItem("token") || null);
  const user = ref(null);
  const isLoading = ref(false);

  // --- GETTERS ---
  const isAuthenticated = computed(() => !!token.value);
  const isLoggedIn = computed(() => !!token.value);
  const userRole = computed(() => user.value?.roles?.[0]?.name || null);

  // --- ACTIONS ---

  /**
   * ✅ SYNC ACTION: Updates the user state instantly
   * This is called by ProfileStore to update the Navbar
   */
  const updateUser = (updatedData) => {
    if (user.value) {
      user.value = { ...user.value, ...updatedData };
    } else {
      user.value = updatedData;
    }
  };

  const login = async (credentials) => {
    isLoading.value = true;
    try {
      const formData = new FormData();
      formData.append("email_or_phone", credentials.email);
      formData.append("password", credentials.password);

      const res = await api.post("/api/login", formData);

      if (res.data?.result === false || res.data?.result === "false") {
        throw new Error(res.data?.message || "Login failed.");
      }

      const tokenValue = res.data?.data?.token;
      if (!tokenValue) throw new Error("No token received.");

      setAuth(tokenValue);
      await fetchProfile();

      const role = user.value?.roles?.[0]?.name || null;
      return { success: true, role };
    } catch (error) {
      clearAuth();
      throw error;
    } finally {
      isLoading.value = false;
    }
  };

  const fetchProfile = async () => {
    if (!token.value) return;
    try {
      const res = await api.get("/api/me");
      user.value = res.data.data;
    } catch (error) {
      clearAuth();
      throw error;
    }
  };

  const logout = async () => {
    try {
      await api.delete("/api/logout");
    } finally {
      clearAuth();
    }
  };

  const setAuth = (newToken) => {
    token.value = newToken;
    localStorage.setItem("token", newToken);
  };

  const clearAuth = () => {
    token.value = null;
    user.value = null;
    localStorage.removeItem("token");
  };

  return {
    token, user, userRole, isLoading, isAuthenticated, isLoggedIn,
    login, fetchProfile, logout, clearAuth, updateUser,
  };
});