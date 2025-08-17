# Hyuck Portfoilo

Next.js 기반의 포트폴리오 입니다. (모바일)

## 프로젝트 개요

Claude AI 바이브 코딩으로 구성하였습니다.

## 기술 스택

- **Frontend**: Next.js 15 (App Router), React 19, TypeScript
- **Styling**: Tailwind CSS, PostCSS
- **기타**: emailjs (실제로 사용 가능 *달 200건 무료)

## Getting Started

### 개발 서버 실행

```bash
yarn dev
```

개발 서버가 [http://localhost:3000](http://localhost:3000)에서 실행됩니다.

### 프로덕션 빌드

```bash
yarn build
```


## 환경 변수

```bash
# Email JS 설정
NEXT_PUBLIC_EMAILJS_SERVICE_ID=""           # EmailJS 서비스 아이디
NEXT_PUBLIC_EMAILJS_TEMPLATE_ID=""          # EmailJS 템플릿 아이디
NEXT_PUBLIC_EMAILJS_PUBLIC_KEY=""           # EmailJS 퍼블릭 키

```
## 빌드 및 배포

### 배포 환경

본 프로젝트는 **Vercel**를 사용하여 GitHub 연동을 통한 자동 배포를 지원합니다.

### 빌드 최적화
- Next.js 자동 최적화 활용

### 개발 도구
- ESLint: 코드 품질 관리
- TypeScript: 타입 안전성
- Prettier: 코드 포맷팅

### Note
공용 훅으로 나오는 것들은 적극 사용해달라 요청
다른 페이지지만 안에 내용만 다른 디자인 페이지들은 공용 컴포넌트로 처리해달라 요청
플로팅 노트 같은 경우 로컬 스토리지로 사용하였는데 이러면 브라우저 종료 후에도 데이터가 남기때문에
보안상 세션 스토리지로 변경하여 브라우저 종료시 데이터가 사라지도록 요청

상세 페이지에 탭 별로 데이터가 있는데 기존 api는 탭에 데이터 전부를 호출 하는 방식이여서
초기 로딩시간이 많이 지연되는 문제 발견 > api 파라티머 값에 탭 아이디를 받아 호출하는 방식으로 
수정 하여 초기 로딩 시간을 반 이상으로 줄인 겨험

코드 리뷰 ? 체크해보기
아키텍쳐 ? 모놀리식 


