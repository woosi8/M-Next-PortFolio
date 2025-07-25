"use client";

import { useAuth } from "@/hooks/useAuth";
import { useDarkMode } from "@/hooks/useDarkMode";
import { useActiveSection } from "@/hooks/useActiveSection";
import { useRouter } from "next/navigation";

const Header = () => {
  const { logout } = useAuth();
  const router = useRouter();
  const { isDarkMode, toggleDarkMode } = useDarkMode();

  const menuItems = [
    { id: "experience", label: "Experience" },
    { id: "project", label: "Project" },
    { id: "stack", label: "Stack" },
    { id: "about", label: "About Me" },
    { id: "contact", label: "Contact" },
  ];

  const activeSection = useActiveSection(menuItems.map(item => item.id));

  const handleLogout = () => {
    logout();
    router.push("/login");
  };
  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 backdrop-blur-sm transition-colors duration-300 ${
        isDarkMode ? "bg-black/90" : "bg-white/90"
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 py-4">
        <nav className="flex items-center justify-between">
          <div
            className={`text-xl font-bold transition-colors duration-300 ${
              isDarkMode ? "text-white" : "text-black"
            }`}
          >
            CHOI HYUCK
          </div>

          <div className="hidden md:flex items-center space-x-8">
            {menuItems.map((item) => {
              const isActive = activeSection === item.id;
              return (
                <a
                  key={item.id}
                  href={`#${item.id}`}
                  className={`hover:text-blue-400 transition-colors cursor-pointer ${
                    isActive 
                      ? "text-blue-400" 
                      : (isDarkMode ? "text-white" : "text-black")
                  }`}
                  onClick={(e) => {
                    e.preventDefault();
                    document
                      .getElementById(item.id)
                      ?.scrollIntoView({ behavior: "smooth" });
                  }}
                >
                  {item.label}
                </a>
              );
            })}
          </div>

          <div className="flex items-center space-x-4">
            <button
              onClick={toggleDarkMode}
              className="w-8 h-8 cursor-pointer bg-gray-700 rounded-full flex items-center justify-center hover:bg-gray-600 transition-colors"
            >
              {isDarkMode ? "🌙" : "☀️"}
            </button>

            <button
              onClick={handleLogout}
              className="px-3 py-1 cursor-pointer bg-red-600 text-white text-sm rounded hover:bg-red-700 transition-colors"
            >
              로그아웃
            </button>
          </div>
        </nav>
      </div>
    </header>
  );
};

export default Header;
