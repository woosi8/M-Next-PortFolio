"use client";
import { useEffect, useState } from "react";

function urlBase64ToUint8Array(base64String: string) {
  const padding = "=".repeat((4 - (base64String.length % 4)) % 4);
  const base64 = (base64String + padding).replace(/-/g, "+").replace(/_/g, "/");

  const rawData = window.atob(base64);
  const outputArray = new Uint8Array(rawData.length);

  for (let i = 0; i < rawData.length; ++i) {
    outputArray[i] = rawData.charCodeAt(i);
  }
  return outputArray;
}

const usePwaNotification = () => {
  // 이미 앱이 설치되었는지 확인
  const [isInstalledPwa, setIsInstalledPwa] = useState(false);
  useEffect(() => {
    setIsInstalledPwa(window.matchMedia("(display-mode: standalone)").matches);
  }, []);

  const initRegisterAndSubscribe = async () => {
    // 알림 거부된 상태면 pass
    if (Notification.permission === "denied") {
      return;
    }

    // worker 및 push subscription 정보 가져오기
    let registration = await navigator.serviceWorker.register("/sw.js", {
      scope: "/",
      updateViaCache: "none",
    });
    let sub = await registration.pushManager.getSubscription();

    //  subscription 정보 전달
    const serializedSub: PushSubscription = JSON.parse(JSON.stringify(sub));
    console.log(serializedSub);

    // subscription 정보가 없으면 새로 생성
    if (!sub) {
      registration = await navigator.serviceWorker.ready;
      sub = await registration.pushManager.subscribe({
        userVisibleOnly: true,
        applicationServerKey: urlBase64ToUint8Array(
          process.env.NEXT_PUBLIC_VAPID_PUBLIC_KEY!
        ),
      });
    }
  };

  return {
    initRegisterAndSubscribe,
    isInstalledPwa,
  };
};

export default usePwaNotification;
