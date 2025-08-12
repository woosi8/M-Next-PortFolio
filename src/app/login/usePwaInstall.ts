// 예: usePWAInstallPrompt.ts (커스텀 훅)
import { useEffect, useState } from "react";

export default function usePwaInstall() {
  const [deferredPrompt, setDeferredPrompt] = useState<Event | null>(null);
  const [isSupported, setIsSupported] = useState(false);
  const [isIos, setIsIos] = useState(false);
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    // Check if running in browser
    if (typeof window === 'undefined') return;
    
    setIsClient(true);
    
    // Check if iOS
    const checkIsIos = /iphone|ipad|ipod/.test(
      window.navigator.userAgent.toLowerCase()
    );
    setIsIos(checkIsIos);

    const handler = (e: any) => {
      e.preventDefault();
      setDeferredPrompt(e);
      setIsSupported(true);
    };

    window.addEventListener("beforeinstallprompt", handler);

    return () => {
      window.removeEventListener("beforeinstallprompt", handler);
    };
  }, []);

  const promptInstall = async () => {
    if (deferredPrompt && "prompt" in deferredPrompt) {
      // @ts-ignore
      deferredPrompt.prompt();
    }
  };

  return { isSupported, promptInstall, isIos, isClient };
}
