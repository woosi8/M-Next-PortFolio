import usePwaInstall from "../usePwaInstall";

const PwaInstallButton = () => {
  const { isSupported, promptInstall, isIos, isClient } = usePwaInstall();

  const handleClick = () => {
    if (isIos) {
      alert('Safari에서 공유 버튼을 누른 후\n"홈 화면에 추가"를 선택해주세요.');
    } else {
      promptInstall();
    }
  };

  // Don't render anything until client-side hydration is complete
  // if (!isClient) return null;

  // Show button if PWA install is supported OR if it's iOS
  // if (!isSupported && !isIos) return null;

  return (
    <div className="flex justify-center items-center mt-6">
      <button 
        onClick={handleClick}
        className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-6 rounded-lg shadow-md transition-all duration-200 ease-in-out transform hover:scale-105 active:scale-95"
      >
        📱 앱 설치하기
      </button>
    </div>
  );
};

export default PwaInstallButton;
