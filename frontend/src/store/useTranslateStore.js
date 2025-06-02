import { create } from "zustand";
import { axiosInstance } from "../lib/axios";
import toast from "react-hot-toast";

export const useTranslateStore = create((set, get) => ({
  showTranslate: false,
  targetLang: "en",
  translatedText: null,

  setTranslatedText: (translatedText) => {
    try {
      set({ translatedText });
    } catch (error) {
      toast.error(error.message);
    }
  },

  setTargetLang: (targetLang) => {
    try {
      set({ targetLang });
      toast.success("Language set to: " + targetLang);
    } catch (error) {
      toast.error(error.message);
    }
  },
  setShowTranslate: (showTranslate) => {
    try {
      set({ showTranslate: !showTranslate });
    } catch (error) {
      toast.error(error.message);
    }
  },
  fetchTranslation: async (text) => {
    const { showTranslate, targetLang } = get();
    if (!showTranslate || !targetLang || !text) return null;

    try {
      const res = await axiosInstance.post(`translation/${targetLang}`, {
        text,
      });
      return res.data?.translations?.[0]?.text || null;
    } catch (err) {
      console.error("Translation error:", err);
      return null;
    }
  },
}));
