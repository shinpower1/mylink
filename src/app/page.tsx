"use client";

import React, { useState } from "react";

// 프로필 데이터 정의
const profileData = {
  name: "신채규",
  englishName: "Chae Gyu Shin",
  githubUsername: "shinpower1",
  email: "contact@example.com",
  avatarUrl: "https://avatars.githubusercontent.com/u/327406319?v=4",
  role: "Full-Stack Software Engineer",
  status: "오픈소스 & 협업 기회 환영 🚀",
  headline: "복잡한 비즈니스 문제를 견고한 아키텍처와 엔지니어링으로 해결합니다.",
  bioSections: [
    {
      label: "Frontend",
      color: "bg-[#67E8F9]",
      desc: "React 19 & Next.js 16 기반의 고성능 렌더링 최적화 및 직관적인 UX 설계",
    },
    {
      label: "Backend",
      color: "bg-[#86EFAC]",
      desc: "안정적인 API 아키텍처 설계와 견고한 데이터 모델링",
    },
    {
      label: "Mindset",
      color: "bg-[#FDBA74]",
      desc: "유지보수하기 쉬운 클린 코드와 지속 가능한 개발 문화를 지향합니다.",
    },
  ],
  techStack: [
    { name: "TypeScript", color: "bg-[#93C5FD]" },
    { name: "React", color: "bg-[#67E8F9]" },
    { name: "Next.js", color: "bg-[#E2E8F0]" },
    { name: "Tailwind CSS", color: "bg-[#5EEAD4]" },
    { name: "Node.js", color: "bg-[#86EFAC]" },
    { name: "PostgreSQL", color: "bg-[#DDD6FE]" },
    { name: "Git", color: "bg-[#FED7AA]" },
  ],
  links: [
    {
      title: "GitHub Profile",
      description: "github.com/shinpower1 · 개인 프로젝트 및 오픈소스 기여",
      url: "https://github.com/shinpower1",
      icon: "github",
      badge: "HIGHLIGHT ★",
      cardColor: "bg-[#FFE600]",
      badgeColor: "bg-black text-white",
    },
    {
      title: "MyLink Project",
      description: "Next.js 16 & Tailwind로 제작한 인터랙티브 링크인바이오",
      url: "https://github.com/shinpower1/mylink",
      icon: "portfolio",
      badge: "SOURCE ⚡",
      cardColor: "bg-[#A7F3D0]",
      badgeColor: "bg-white text-black",
    },
    {
      title: "Tech Blog",
      description: "개발 지식과 아키텍처 고민 과정을 기록하는 기술 블로그",
      url: "https://velog.io",
      icon: "blog",
      badge: "STORIES 📖",
      cardColor: "bg-[#BAE6FD]",
      badgeColor: "bg-white text-black",
    },
    {
      title: "Email Inquiry",
      description: "프로젝트 협업, 기술 자문 및 커피챗 문의 (언제든 환영합니다)",
      url: "mailto:contact@example.com",
      icon: "email",
      badge: "LET'S TALK ✉️",
      cardColor: "bg-[#FFD1DC]",
      badgeColor: "bg-black text-white",
    },
  ],
};

function Icon({ name }: { name: string }) {
  switch (name) {
    case "github":
      return (
        <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
          <path
            fillRule="evenodd"
            d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.53 1.032 1.53 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z"
            clipRule="evenodd"
          />
        </svg>
      );
    case "blog":
      return (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"
          />
        </svg>
      );
    case "portfolio":
      return (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M4 6a2 2 0 012-2h12a2 2 0 012 2v12a2 2 0 01-2 2H6a2 2 0 01-2-2V6z"
          />
          <path strokeLinecap="round" strokeLinejoin="round" d="M10 9l5 3-5 3V9z" />
        </svg>
      );
    case "email":
      return (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
          />
        </svg>
      );
    default:
      return (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101" />
          <path strokeLinecap="round" strokeLinejoin="round" d="M14.828 14.828a4 4 0 015.656 0l4 4a4 4 0 01-5.656 5.656l-1.102-1.101" />
        </svg>
      );
  }
}

export default function Home() {
  const [copied, setCopied] = useState(false);

  const handleCopyEmail = () => {
    navigator.clipboard.writeText(profileData.email);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="min-h-screen text-black flex flex-col items-center justify-between px-4 py-8 sm:py-12 selection:bg-[#FFE600] selection:text-black">
      {/* Top Retro Sticker Ticker */}
      <aside aria-label="상단 알림 배너" className="w-full max-w-xl mb-6 overflow-hidden rounded-xl border-2 border-black bg-[#FFE600] shadow-[3px_3px_0px_#000] px-3 py-1.5 flex items-center justify-between font-mono text-xs font-black tracking-wider">
        <div className="flex items-center gap-2">
          <span className="inline-block w-2.5 h-2.5 rounded-full bg-red-500 animate-ping" />
          <span>PORTFOLIO // 2026 EDITION</span>
        </div>
        <div className="hidden sm:flex items-center gap-2">
          <span className="bg-black text-white px-2 py-0.5 rounded text-[10px]">VERIFIED DEV</span>
          <span>✦ NEXT.JS 16 & REACT 19</span>
        </div>
      </aside>

      <main className="w-full max-w-xl mx-auto flex flex-col items-center gap-6">
        {/* Main Profile Card (Window Style) */}
        <section className="w-full bg-white rounded-2xl border-3 border-black shadow-[6px_6px_0px_#000] overflow-hidden">
          {/* Retro Window Title Bar */}
          <div className="bg-[#A78BFA] border-b-3 border-black px-4 py-2.5 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span className="w-3.5 h-3.5 rounded-full bg-[#FF5F56] border-2 border-black inline-block" />
              <span className="w-3.5 h-3.5 rounded-full bg-[#FFBD2E] border-2 border-black inline-block" />
              <span className="w-3.5 h-3.5 rounded-full bg-[#27C93F] border-2 border-black inline-block" />
              <span className="font-mono text-xs font-black tracking-wider uppercase ml-1 text-black">
                DEV_PROFILE.EXE
              </span>
            </div>
            <span className="text-[11px] font-mono font-bold bg-white text-black px-2.5 py-0.5 border-2 border-black rounded shadow-[2px_2px_0px_#000]">
              LIVE
            </span>
          </div>

          <div className="p-6 sm:p-8 flex flex-col items-center text-center">
            {/* Avatar with hard border and offset shadow */}
            <div className="relative mb-5">
              <div className="w-28 h-28 sm:w-32 sm:h-32 rounded-2xl border-3 border-black bg-[#FFE600] shadow-[5px_5px_0px_#000] overflow-hidden">
                <img
                  src={profileData.avatarUrl}
                  alt={profileData.name}
                  className="w-full h-full object-cover"
                />
              </div>
              <span
                className="absolute -bottom-2.5 -right-2.5 bg-[#70EE9C] text-black font-black text-xs px-2.5 py-1 rounded-lg border-2 border-black shadow-[2px_2px_0px_#000] rotate-[-3deg] select-none"
                title="온라인 상태"
              >
                ✓ ONLINE
              </span>
            </div>

            {/* Status Sticker Badge */}
            <div className="inline-flex items-center gap-1.5 px-3.5 py-1.5 mb-3 rounded-lg text-xs font-black bg-[#FEF08A] text-black border-2 border-black shadow-[2.5px_2.5px_0px_#000] rotate-[-1deg]">
              <span>{profileData.status}</span>
            </div>

            {/* Name & English Name */}
            <h1 className="text-3xl sm:text-4xl font-black tracking-tight text-black flex flex-wrap items-center justify-center gap-2">
              <span>{profileData.name}</span>
              <span className="text-base sm:text-lg font-bold text-zinc-700 bg-[#E2E8F0] px-2.5 py-0.5 rounded-md border-2 border-black shadow-[2px_2px_0px_#000]">
                {profileData.englishName}
              </span>
            </h1>

            {/* Role & GitHub Badge */}
            <div className="mt-3 flex flex-wrap items-center justify-center gap-2">
              <span className="bg-[#67E8F9] text-black font-extrabold text-xs sm:text-sm px-3 py-1 rounded-md border-2 border-black shadow-[2px_2px_0px_#000]">
                ⚡ {profileData.role}
              </span>
              <a
                href={`https://github.com/${profileData.githubUsername}`}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 bg-black text-white font-mono font-bold text-xs px-3 py-1 rounded-md border-2 border-black shadow-[2px_2px_0px_#000] hover:bg-[#FFE600] hover:text-black transition-colors"
              >
                <svg className="w-3.5 h-3.5 fill-current" viewBox="0 0 24 24">
                  <path fillRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.53 1.032 1.53 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" clipRule="evenodd" />
                </svg>
                @{profileData.githubUsername}
              </a>
            </div>

            {/* Slogan Speech Bubble */}
            <div className="mt-5 w-full bg-[#FFFBEB] border-2 border-black p-3.5 rounded-xl shadow-[3px_3px_0px_#000] text-sm font-black text-black">
              &ldquo;{profileData.headline}&rdquo;
            </div>
          </div>
        </section>

        {/* About Me Bento Card */}
        <section className="w-full bg-white rounded-2xl border-3 border-black shadow-[6px_6px_0px_#000] p-5 sm:p-6">
          <div className="flex items-center justify-between mb-3 border-b-2 border-black pb-2">
            <div className="inline-flex items-center gap-2 bg-[#FF5376] text-white font-black text-xs px-2.5 py-1 rounded-md border-2 border-black shadow-[2px_2px_0px_#000] uppercase rotate-[-1deg]">
              <span>★ ABOUT ME</span>
            </div>
            <span className="font-mono text-xs font-bold text-zinc-500">PHILOSOPHY</span>
          </div>

          <p className="text-sm font-bold text-zinc-800 mb-4 leading-relaxed">
            사용자 중심의 가치 창출과 확장 가능한 소프트웨어 아키텍처에 집중하는 엔지니어입니다.
          </p>

          <div className="flex flex-col gap-2.5">
            {profileData.bioSections.map((sec) => (
              <div
                key={sec.label}
                className="flex items-start gap-2.5 p-2.5 rounded-xl border-2 border-black bg-[#F8FAFC] shadow-[2px_2px_0px_#000]"
              >
                <span
                  className={`${sec.color} text-black font-black text-[11px] px-2 py-0.5 rounded border border-black uppercase tracking-wider shrink-0 mt-0.5`}
                >
                  {sec.label}
                </span>
                <span className="text-xs sm:text-sm font-semibold text-zinc-800 leading-snug">
                  {sec.desc}
                </span>
              </div>
            ))}
          </div>
        </section>

        {/* Tech Stack Section */}
        <section className="w-full bg-white rounded-2xl border-3 border-black shadow-[6px_6px_0px_#000] p-5 sm:p-6">
          <div className="flex items-center justify-between mb-4 border-b-2 border-black pb-2">
            <span className="bg-[#FED7AA] text-black font-black text-xs px-2.5 py-1 rounded-md border-2 border-black shadow-[2px_2px_0px_#000] uppercase">
              ⚡ TECH STACK
            </span>
            <span className="font-mono text-xs font-bold text-zinc-500">7 CORE SKILLS</span>
          </div>

          <div className="flex flex-wrap gap-2 justify-center sm:justify-start">
            {profileData.techStack.map((tech) => (
              <span
                key={tech.name}
                className={`${tech.color} text-black font-black text-xs sm:text-sm px-3.5 py-1.5 rounded-xl border-2 border-black shadow-[3px_3px_0px_#000] hover:translate-x-[-1px] hover:translate-y-[-1px] hover:shadow-[4px_4px_0px_#000] active:translate-x-[1px] active:translate-y-[1px] active:shadow-[1px_1px_0px_#000] transition-all cursor-default select-none`}
              >
                {tech.name}
              </span>
            ))}
          </div>
        </section>

        {/* Links Bento Section */}
        <section className="w-full flex flex-col gap-4">
          <div className="flex items-center justify-between px-1">
            <h2 className="font-black text-lg tracking-tight uppercase flex items-center gap-2">
              <span>EXPLORE LINKS</span>
              <span className="text-xs font-mono font-bold bg-[#FFE600] px-2 py-0.5 rounded border border-black shadow-[1.5px_1.5px_0px_#000]">
                {profileData.links.length}
              </span>
            </h2>
            <span className="font-mono text-xs font-bold text-zinc-600">CLICK TO VISIT ↗</span>
          </div>

          <div className="flex flex-col gap-3.5">
            {profileData.links.map((link) => (
              <a
                key={link.title}
                href={link.url}
                target={link.url.startsWith("http") ? "_blank" : undefined}
                rel={link.url.startsWith("http") ? "noopener noreferrer" : undefined}
                className={`group relative flex items-center justify-between p-4 sm:p-5 rounded-2xl border-3 border-black ${link.cardColor} shadow-[5px_5px_0px_#000] hover:-translate-y-1 hover:-translate-x-1 hover:shadow-[7px_7px_0px_#000] active:translate-x-1 active:translate-y-1 active:shadow-[2px_2px_0px_#000] transition-all duration-150`}
              >
                <div className="flex items-center gap-3.5 sm:gap-4">
                  {/* Icon Box */}
                  <div className="p-3 rounded-xl border-2 border-black bg-white text-black shadow-[2px_2px_0px_#000] group-hover:scale-105 transition-transform">
                    <Icon name={link.icon} />
                  </div>

                  {/* Text Details */}
                  <div className="flex flex-col text-left">
                    <div className="flex items-center gap-2">
                      <span className="font-black text-base sm:text-lg text-black tracking-tight">
                        {link.title}
                      </span>
                      <span
                        className={`text-[10px] font-black px-1.5 py-0.5 rounded border border-black uppercase tracking-wider ${link.badgeColor}`}
                      >
                        {link.badge}
                      </span>
                    </div>
                    <span className="text-xs sm:text-sm font-bold text-zinc-800 line-clamp-1 mt-0.5">
                      {link.description}
                    </span>
                  </div>
                </div>

                {/* Arrow Action Button */}
                <div className="w-9 h-9 rounded-xl border-2 border-black bg-white flex items-center justify-center text-black shadow-[2px_2px_0px_#000] group-hover:bg-black group-hover:text-white transition-colors shrink-0 ml-2">
                  <svg
                    className="w-5 h-5 group-hover:translate-x-0.5 transition-transform"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="3"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M9 5l7 7-7 7"
                    />
                  </svg>
                </div>
              </a>
            ))}
          </div>
        </section>

        {/* Quick Action: Copy Email */}
        <section className="w-full bg-[#FFFBEB] rounded-2xl border-3 border-black shadow-[5px_5px_0px_#000] p-4 flex flex-col sm:flex-row items-center justify-between gap-3">
          <div className="flex items-center gap-2.5">
            <span className="text-xl">📫</span>
            <div className="text-left">
              <p className="text-xs font-black text-zinc-500 uppercase">DIRECT EMAIL</p>
              <p className="font-mono text-sm font-black text-black">{profileData.email}</p>
            </div>
          </div>
          <button
            onClick={handleCopyEmail}
            className="w-full sm:w-auto bg-black text-white hover:bg-[#FFE600] hover:text-black font-black text-xs px-4 py-2.5 rounded-xl border-2 border-black shadow-[3px_3px_0px_#000] hover:-translate-y-0.5 hover:-translate-x-0.5 hover:shadow-[4px_4px_0px_#000] active:translate-x-0.5 active:translate-y-0.5 active:shadow-[1px_1px_0px_#000] transition-all cursor-pointer"
          >
            {copied ? "복사 완료! 🎉" : "이메일 복사하기 📋"}
          </button>
        </section>
      </main>

      {/* Retro Neobrutalist Footer */}
      <footer className="mt-12 w-full max-w-xl text-center flex flex-col items-center gap-2">
        <div className="inline-block bg-white border-2 border-black px-4 py-2 rounded-xl shadow-[3px_3px_0px_#000] font-mono text-xs font-black text-black">
          © {new Date().getFullYear()} {profileData.name} (@{profileData.githubUsername}) · ALL RIGHTS RESERVED
        </div>
        <p className="text-[11px] font-bold text-zinc-600">
          BUILT WITH <span className="underline decoration-black decoration-2">NEXT.JS 16</span> &amp; <span className="underline decoration-black decoration-2">TAILWIND CSS 4</span>
        </p>
      </footer>
    </div>
  );
}

