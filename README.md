# 🔗 MyLink (`mylink`)

> **문제를 해결하는 코드, 가치를 만드는 개발자** — 신채규의 개인 프로필 & 링크인바이오(Link-in-bio) 서비스

[![Next.js](https://img.shields.io/badge/Next.js-16.3.4-black?style=flat-square&logo=next.js)](https://nextjs.org/)
[![React](https://img.shields.io/badge/React-19.2.8-blue?style=flat-square&logo=react)](https://react.dev/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.x-blue?style=flat-square&logo=typescript)](https://www.typescriptlang.org/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-v4-38bdf8?style=flat-square&logo=tailwindcss)](https://tailwindcss.com/)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg?style=flat-square)](LICENSE)

---

## 📌 소개 (About)

**MyLink**는 풀스택 개발자의 프로필, 한 줄 슬로건, 상세 소개글(About Me), 핵심 기술 스택, 주요 작업물 및 소셜 링크를 한곳에서 직관적이고 감각적으로 제공하는 웹 서비스입니다.

모바일 및 데스크톱 환경 모두에 최적화된 반응형 카드 레이아웃과 감각적인 디자인을 지원하며, 손쉽게 개인 정보와 링크를 커스터마이징할 수 있습니다.

---

## ✨ 주요 기능 (Key Features)

* **👤 프로필 & 소개글**:
  * GitHub 프로필 사진 연동 및 활동 상태(Status) 뱃지
  * 개발자 이름, 영문명, 포지션, 한 줄 슬로건 및 상세 소개글(About Me)
* **🛠️ 핵심 기술 스택**:
  * 주요 사용 기술(TypeScript, React, Next.js, Tailwind CSS, Node.js 등)을 태그 형태로 한눈에 시각화
* **🔗 주요 링크 모음 (Link Cards)**:
  * GitHub, Tech Blog, Portfolio, Email 등 주요 소셜 & 프로젝트 링크 카드 제공
  * 하이라이트 스타일 및 호버 인터랙션 효과 적용
* **🌓 모던 디자인 & 다크 모드**:
  * Tailwind CSS v4 기반의 세련된 모던 UI
  * 시스템 테마에 맞춘 라이트/다크 모드 자동 지원
* **⚡ 초고속 성능**:
  * Next.js 16 App Router & Turbopack 기반의 정적 페이지 생성(SSG)으로 초고속 로딩 속도 달성

---

## 🛠️ 기술 스택 (Tech Stack)

| 구분 | 기술 |
| :--- | :--- |
| **Framework** | Next.js 16 (App Router, Turbopack) |
| **Library** | React 19, TypeScript |
| **Styling** | Tailwind CSS v4 |
| **Icons** | Custom Inline SVG (경량화 최적화) |
| **Deployment** | Vercel / GitHub Pages 호환 |

---

## 🚀 빠른 시작 (Getting Started)

### 1. 패키지 설치
```bash
npm install
```

### 2. 개발 서버 실행
```bash
npm run dev
```
브라우저에서 [http://localhost:3001](http://localhost:3001)에 접속하여 확인할 수 있습니다.

### 3. 프로필 정보 수정
`src/app/page.tsx` 파일 상단의 `profileData` 객체 값을 본인의 정보와 링크에 맞게 수정하면 즉시 반영됩니다.

```typescript
const profileData = {
  name: "신채규",
  englishName: "Chae Gyu Shin",
  githubUsername: "shinpower1",
  role: "Full-Stack Developer",
  ...
};
```

---

## 📄 라이선스 (License)

이 프로젝트는 [MIT License](LICENSE)를 따릅니다.
