import { LinkCard } from '@/types/profile';

/**
 * 💡 토스 디자인 시스템(TDS) 스타일의 개발자 특화 링크 목록 더미 데이터
 *
 * 카테고리 구성:
 * 1. 대표 프로젝트 (Featured Projects)
 * 2. 기술 블로그 & 아티클 (Writing & Tech Blog)
 * 3. 오픈소스 & 라이브러리 기여 (Open Source & GitHub)
 * 4. 세미나 & 발표 자료 (Tech Talks & Slides)
 * 5. 커리어 & 이력서 (Career & LinkedIn)
 * 6. 네트워킹 & 커피챗 (Coffee Chat & Contact)
 */
export const mockLinks: LinkCard[] = [
  {
    id: 'link-featured-1',
    title: 'MyLink — Developer Link-in-Bio',
    description: 'Next.js 16, Tailwind CSS v4, shadcn/ui 기반의 고성능 개발자 전용 링크인바이오 서비스',
    url: 'https://github.com/shinpower1/mylink',
    icon: 'portfolio',
    badge: 'FEATURED 🚀',
    cardColor: 'bg-[#E8F3FF]', // TDS Soft Blue
    badgeColor: 'bg-[#3182F6] text-white',
    isActive: true,
    orderIndex: 0,
  },
  {
    id: 'link-featured-2',
    title: 'GitHub Profile & Open Source',
    description: 'github.com/shinpower1 · 개인 오픈소스 리포지토리 및 기술 프로젝트 모음',
    url: 'https://github.com/shinpower1',
    icon: 'github',
    badge: 'HIGHLIGHT ★',
    cardColor: 'bg-[#FFFFFF]',
    badgeColor: 'bg-[#191F28] text-white',
    isActive: true,
    orderIndex: 1,
  },
  {
    id: 'link-writing-1',
    title: 'React 19 & Next.js 16 렌더링 최적화 탐구',
    description: 'Server Actions, useActionState, 그리고 Turbopack 번들링 성능 벤치마크 분석 글',
    url: 'https://velog.io/@shinpower1/react-19-optimization',
    icon: 'blog',
    badge: 'TECH BLOG ✍️',
    cardColor: 'bg-[#FFFFFF]',
    badgeColor: 'bg-[#059669] text-white',
    isActive: true,
    orderIndex: 2,
  },
  {
    id: 'link-talk-1',
    title: '토스 테크 세미나: 마이크로 프론트엔드 전환기',
    description: '2026 프론트엔드 아키텍처 컨퍼런스 발표 자료 슬라이드 및 시연 데모 (PDF)',
    url: 'https://speakerdeck.com/shinpower1/micro-frontend-architecture',
    icon: 'presentation',
    badge: 'SLIDES 📊',
    cardColor: 'bg-[#F2F4F6]', // TDS Light Gray
    badgeColor: 'bg-[#4B5563] text-white',
    isActive: true,
    orderIndex: 3,
  },
  {
    id: 'link-oss-1',
    title: 'TDS-Kit (토스 스타일 컴포넌트 라이브러리)',
    description: 'Tailwind CSS v4 & Radix 기반의 경량화된 UI 프리미티브 오픈소스 프로젝트',
    url: 'https://github.com/shinpower1/tds-kit',
    icon: 'code',
    badge: 'OSS CONTRIBUTE ⚡',
    cardColor: 'bg-[#F5F3FF]', // Soft Purple
    badgeColor: 'bg-[#8B5CF6] text-white',
    isActive: true,
    orderIndex: 4,
  },
  {
    id: 'link-career-1',
    title: 'LinkedIn Career & Professional Resume',
    description: '소프트웨어 엔지니어링 경력, 문제 해결 사례 및 상세 이력서 확인하기',
    url: 'https://linkedin.com/in/shinpower1',
    icon: 'linkedin',
    badge: 'CAREER 💼',
    cardColor: 'bg-[#FFFFFF]',
    badgeColor: 'bg-[#0284C7] text-white',
    isActive: true,
    orderIndex: 5,
  },
  {
    id: 'link-contact-1',
    title: '커피챗 & 커리어 멘토링 신청',
    description: '주니어 개발자 코드 리뷰, 기술 커리어 고민, 사이드 프로젝트 협업 이야기 (30분 커피챗)',
    url: 'https://calendly.com/shinpower1/coffee-chat',
    icon: 'coffee',
    badge: 'COFFEE CHAT ☕',
    cardColor: 'bg-[#FEF3C7]', // Soft Amber
    badgeColor: 'bg-[#D97706] text-white',
    isActive: true,
    orderIndex: 6,
  },
  {
    id: 'link-contact-2',
    title: '비즈니스 협업 및 프로젝트 문의',
    description: '외주 프로젝트 개발, 기술 자문 및 채용 제안은 이메일로 언제든 편하게 연락주세요',
    url: 'mailto:contact@example.com',
    icon: 'email',
    badge: "LET'S TALK ✉️",
    cardColor: 'bg-[#FEE2E2]', // Soft Rose
    badgeColor: 'bg-[#E11D48] text-white',
    isActive: true,
    orderIndex: 7,
  },
];
