"use client";

import { useDarkMode } from "@/hooks/useDarkMode";
import { useScrollAnimation } from "@/hooks/useScrollAnimation";
import IntroduceContainer from "../IntroduceContainer";

const About = () => {
  const { isDarkMode } = useDarkMode();
  const { ref, isVisible } = useScrollAnimation();
  const { handleAddPet, isPending } = IntroduceContainer.useContainer();
  const awards = [
    {
      year: "2020 ~ 2021",
      title: "1년간의 개발 공부 독학",
      description: `개발 학습을 시작한 지 1년간은 온라인 강의와 독학을 통해 기초를 다졌습니다. 초기에는 퍼블리싱에 집중하여 HTML, CSS를 중점적으로 학습했으나, 점차 동적인 기능 구현에 대한 흥미가 생겨 프론트엔드 개발자를 목표로 준비해 왔습니다.
이후 CS 기초 지식, JavaScript, React 등을 체계적으로 학습하며 프론트엔드 개발 역량을 쌓아왔습니다.
`,
    },
    {
      year: "2017 ~ 2019",
      title: "2년간의 해외 생활",
      description: `K-move 스쿨 프로그램을 통해 베트남어 및 영어를 학습하였고, 베트남 현지 여행사에서 근무하며 약 2년간 해외 생활을 경험했습니다. 
      현지 근무중에는 현지인들과 영어로 의사소통 하였습니다.
      이 과정에서 글로벌 환경에서 통용될 수 있는 전문 기술의 필요성을 깨달았고, 어디서든 활용될 수 있는 개발자라는 직업에 관심을 갖게 되었습니다.
`,
    },
    {
      year: "2017",
      title: "경기대(서울캠퍼스) 관광경영 학과 학사 졸업",
    },
  ];

  return (
    <section id="about" className="py-16 px-6">
      <div className="max-w-6xl mx-auto">
        <div
          ref={ref}
          className={`rounded-lg p-8 transition-all duration-1000 ease-out ${
            isDarkMode ? "bg-gray-900" : "bg-gray-100"
          } ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
          }`}
        >
          <h2 className="text-2xl font-bold mb-6 text-blue-400">
            개발 이외 경력
          </h2>
          <p
            className={`mb-8 ${isDarkMode ? "text-gray-400" : "text-gray-600"}`}
          >
            해외 생활을 경험하면서 다양한 시각과 사고력을 넓힌 사람이
            되었습니다.
          </p>

          <div className="space-y-8">
            {awards.map((award, index) => (
              <div key={index} className="flex items-start gap-6">
                <div
                  className={`font-medium min-w-25 flex-shrink-0 ${
                    isDarkMode ? "text-gray-400" : "text-gray-600"
                  }`}
                >
                  {award.year}
                </div>

                <div className="flex-1">
                  <div className="flex items-start gap-4">
                    <div>
                      <h3
                        className={`font-medium mb-2 ${
                          isDarkMode ? "text-white" : "text-gray-900"
                        }`}
                      >
                        {award.title}
                      </h3>
                      <p
                        className={`text-sm whitespace-pre-line ${
                          isDarkMode ? "text-gray-400" : "text-gray-600"
                        }`}
                      >
                        {award.description}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-8 flex justify-center">
            <button
              onClick={() => 
                handleAddPet({
                  name: "Hyuck's Pet",
                  photoUrls: ["https://example.com/pet.jpg"],
                  status: "available",
                  category: {
                    id: 1,
                    name: "Dogs"
                  }
                })
              }
              disabled={isPending}
              className={`px-6 py-3 rounded-lg font-medium transition-all duration-200 ${
                isPending 
                  ? "bg-gray-500 cursor-not-allowed" 
                  : "bg-green-600 hover:bg-green-700 active:scale-95"
              } text-white shadow-md hover:shadow-lg`}
            >
              {isPending ? "추가 중..." : "🐕 Pet 추가 테스트"}
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
