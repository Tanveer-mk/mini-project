import { create } from "zustand";
import toast from "react-hot-toast";

export const useTranslateStore = create((set, get) => ({
  showTranslate: false,
  targetLang: "en",
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
}));
