import { defineStore } from "pinia";
import { ref } from "vue";
import api from "@/api/https";
import { useAuthStore } from "./auth"; // ✅ Import Auth Store

export const useProfileStore = defineStore("profile", () => {
  const user = ref(null);
  const isLoading = ref(false);
  const isProcessing = ref(false);
  const fetchProfile = async () => {
    isLoading.value = true;
    try {
      const res = await api.get("/api/profile");
      const profileData = res.data.data;
      user.value = profileData;

      const authStore = useAuthStore();
      authStore.updateUser(profileData);

      return profileData;
    } catch (error) {
      console.error("Failed to fetch profile:", error);
      throw error;
    } finally {
      isLoading.value = false;
    }
  };

  const uploadAvatar = async (file) => {
    isProcessing.value = true;
    try {
      const formData = new FormData();
      formData.append("avatar", file);
      await api.post("/api/profile/avatar", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      await fetchProfile(); // Syncs Navbar
    } finally {
      isProcessing.value = false;
    }
  };

  const removeAvatar = async () => {
    isProcessing.value = true;
    try {
      await api.delete("/api/profile/avatar");
      await fetchProfile(); 
    } finally {
      isProcessing.value = false;
    }
  };

  const uploadCover = async (file) => {
    isProcessing.value = true;
    try {
      const formData = new FormData();
      formData.append("cover", file);
      await api.post("/api/profile/cover", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      await fetchProfile();
    } finally {
      isProcessing.value = false;
    }
  };

  const removeCover = async () => {
    isProcessing.value = true;
    try {
      await api.delete("/api/profile/cover");
      await fetchProfile();
    } finally {
      isProcessing.value = false;
    }
  };

  const updatePersonalInfo = async (payload) => {
    isProcessing.value = true;
    try {
      const params = new URLSearchParams();
      Object.keys(payload).forEach(key => {
        if (payload[key] !== null && payload[key] !== undefined) {
          params.append(key, payload[key]);
        }
      });
      await api.put("/api/profile/info", params, {
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
      });
      await fetchProfile();
    } finally {
      isProcessing.value = false;
    }
  };

  const changePassword = async (payload) => {
    isProcessing.value = true;
    try {
      const params = new URLSearchParams();
      params.append("old_pass", payload.old_pass);
      params.append("new_pass", payload.new_pass);
      params.append("new_pass_confirmation", payload.new_pass_confirmation);

      const res = await api.put("/api/profile/change-pass", params, {
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
      });
      return res.data;
    } finally {
      isProcessing.value = false;
    }
  };

  return {
    user, isLoading, isProcessing, fetchProfile,
    uploadAvatar, uploadCover, removeAvatar, removeCover,
    updatePersonalInfo, changePassword,
  };
});