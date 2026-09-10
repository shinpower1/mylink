import React from "react";

// 프로필 데이터 정의 - 실제 GitHub(shinpower1) 정보와 완벽하게 연동되었습니다.
const profileData = {
  name: "신채규",
  englishName: "Chae Gyu Shin",
  githubUsername: "shinpower1",
  avatarUrl: "https://avatars.githubusercontent.com/u/327406319?v=4",
  role: "Full-Stack Developer",
  status: "커피챗 & 협업 기회 환영 ☕",
  headline: "문제를 해결하는 코드, 가치를 만드는 서비스를 만듭니다.",
  bio: `복잡한 문제를 직관적이고 견고한 솔루션으로 풀어내는 것을 즐깁니다.
사용자 경험(UX)과 서비스 안정성, 성능 최적화에 깊은 관심을 두고 있으며,
현대적인 웹 기술을 활용하여 지속 가능하고 확장성 있는 서비스를 구축합니다.`,
  techStack: [
    "TypeScript",
    "React",
    "Next.js",
    "Tailwind CSS",
    "Node.js",
    "PostgreSQL",
    "Git",
  ],
  links: [
    {
      title: "GitHub",
      description: "github.com/shinpower1 · 개인 프로젝트 및 코드 저장소",
      url: "https://github.com/shinpower1",
      icon: "github",
      highlight: true,
    },
    {
      title: "MyLink Project",
      description: "Next.js & Tailwind CSS로 만든 나만의 링크인바이오",
      url: "https://github.com/shinpower1/mylink",
      icon: "portfolio",
      highlight: false,
    },
    {
      title: "Tech Blog",
      description: "개발 지식과 문제 해결 과정을 기록하는 기술 블로그",
      url: "https://velog.io",
      icon: "blog",
      highlight: false,
    },
    {
      title: "Email Me",
      description: "프로젝트 협업 및 커피챗 문의 (언제든 환영합니다)",
      url: "mailto:contact@example.com",
      icon: "email",
      highlight: false,
    },
  ],
};

function Icon({ name }: { name: string }) {
  switch (name) {
    case "github":
      return (
        <svg
          className="w-5 h-5"
          fill="currentColor"
          viewBox="0 0 24 24"
          aria-hidden="true"
        >
          <path
            fillRule="evenodd"
            d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.53 1.032 1.53 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z"
            clipRule="evenodd"
          />
        </svg>
      );
    case "blog":
      return (
        <svg
          className="w-5 h-5"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"
          />
        </svg>
      );
    case "portfolio":
      return (
        <svg
          className="w-5 h-5"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M4 6a2 2 0 012-2h12a2 2 0 012 2v12a2 2 0 01-2 2H6a2 2 0 01-2-2V6z"
          />
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M10 9l5 3-5 3V9z"
          />
        </svg>
      );
    case "email":
      return (
        <svg
          className="w-5 h-5"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
          />
        </svg>
      );
    default:
      return (
        <svg
          className="w-5 h-5"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101"
          />
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M14.828 14.828a4 4 0 015.656 0l4 4a4 4 0 01-5.656 5.656l-1.102-1.101"
          />
        </svg>
      );
  }
}

export default function Home() {
  return (
    <div className="min-h-screen bg-zinc-50 text-zinc-900 dark:bg-[#0a0c10] dark:text-zinc-100 flex flex-col items-center justify-between px-4 py-12 md:py-16 selection:bg-zinc-900 selection:text-white dark:selection:bg-zinc-100 dark:selection:text-zinc-900 font-sans">
      <main className="w-full max-w-xl mx-auto flex flex-col items-center gap-8">
        {/* Profile Card Header */}
        <section className="flex flex-col items-center text-center w-full">
          {/* Avatar with Gradient & GitHub Photo */}
          <div className="relative group mb-4">
            <div className="w-24 h-24 sm:w-28 sm:h-28 rounded-3xl bg-gradient-to-tr from-zinc-800 via-zinc-700 to-zinc-600 p-[2px] shadow-xl shadow-zinc-900/10 dark:shadow-black/50 overflow-hidden">
              <img
                src={profileData.avatarUrl}
                alt={profileData.name}
                className="w-full h-full object-cover rounded-[22px]"
              />
            </div>
            <span
              className="absolute -bottom-1 -right-1 flex h-6 w-6 items-center justify-center rounded-full bg-emerald-500 ring-4 ring-white dark:ring-[#0a0c10] text-[10px] text-white font-bold"
              title="활동 중"
            >
              ✓
            </span>
          </div>

          {/* Status Badge */}
          <div className="inline-flex items-center gap-2 px-3 py-1 mb-3 rounded-full text-xs font-medium bg-emerald-50 text-emerald-700 dark:bg-emerald-950/40 dark:text-emerald-300 border border-emerald-200 dark:border-emerald-800/40">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
            {profileData.status}
          </div>

          {/* Name & Role */}
          <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-zinc-900 dark:text-white">
            {profileData.name}
            <span className="ml-2 text-sm font-normal text-zinc-500 dark:text-zinc-400">
              ({profileData.englishName})
            </span>
          </h1>

          {/* GitHub Handle Link & Role */}
          <div className="mt-1 flex items-center justify-center gap-2">
            <span className="text-sm font-semibold tracking-wide uppercase text-zinc-600 dark:text-zinc-400">
              {profileData.role}
            </span>
            <span className="text-zinc-300 dark:text-zinc-700">•</span>
            <a
              href={`https://github.com/${profileData.githubUsername}`}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1 text-xs font-mono text-zinc-500 hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-white transition-colors"
            >
              <svg className="w-3.5 h-3.5" fill="currentColor" viewBox="0 0 24 24">
                <path fillRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.53 1.032 1.53 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" clipRule="evenodd" />
              </svg>
              @{profileData.githubUsername}
            </a>
          </div>

          {/* Headline */}
          <div className="mt-4 px-4 py-2 rounded-xl bg-zinc-100 dark:bg-zinc-900/60 border border-zinc-200/80 dark:border-zinc-800">
            <p className="text-sm font-medium text-zinc-800 dark:text-zinc-200 italic">
              &ldquo;{profileData.headline}&rdquo;
            </p>
          </div>

          {/* Detailed Bio (소개글) */}
          <div className="mt-4 w-full bg-white dark:bg-[#15181e] p-5 rounded-2xl border border-zinc-200/80 dark:border-zinc-800/80 shadow-sm text-center sm:text-left">
            <div className="flex items-center gap-2 mb-2 text-xs font-semibold text-zinc-500 uppercase tracking-wider">
              <span className="w-2 h-2 rounded-full bg-blue-500 inline-block"></span>
              About Me
            </div>
            <p className="text-sm sm:text-base leading-relaxed text-zinc-600 dark:text-zinc-300 whitespace-pre-line">
              {profileData.bio}
            </p>
          </div>

          {/* Tech Stack Pills */}
          <div className="mt-5 flex flex-wrap justify-center gap-1.5 max-w-md">
            {profileData.techStack.map((tech) => (
              <span
                key={tech}
                className="px-2.5 py-1 text-xs font-medium rounded-lg bg-zinc-200/70 dark:bg-zinc-800 text-zinc-800 dark:text-zinc-300 border border-zinc-300/40 dark:border-zinc-700/50"
              >
                {tech}
              </span>
            ))}
          </div>
        </section>

        {/* Links Section */}
        <section className="w-full flex flex-col gap-3.5">
          <h2 className="sr-only">주요 링크 모음</h2>
          {profileData.links.map((link) => (
            <a
              key={link.title}
              href={link.url}
              target={link.url.startsWith("http") ? "_blank" : undefined}
              rel={link.url.startsWith("http") ? "noopener noreferrer" : undefined}
              className={`group relative flex items-center justify-between p-4 rounded-2xl transition-all duration-200 border ${
                link.highlight
                  ? "bg-zinc-900 text-white border-zinc-800 hover:bg-zinc-800 dark:bg-white dark:text-zinc-950 dark:border-zinc-200 dark:hover:bg-zinc-100 shadow-md hover:shadow-lg"
                  : "bg-white text-zinc-900 border-zinc-200/90 hover:border-zinc-400 hover:bg-zinc-50 dark:bg-[#15181e] dark:text-zinc-100 dark:border-zinc-800/90 dark:hover:border-zinc-700 dark:hover:bg-[#1a1e26] shadow-sm hover:shadow"
              }`}
            >
              <div className="flex items-center gap-3.5">
                <div
                  className={`p-2.5 rounded-xl ${
                    link.highlight
                      ? "bg-white/10 text-white dark:bg-black/10 dark:text-zinc-950"
                      : "bg-zinc-100 text-zinc-700 dark:bg-zinc-800/80 dark:text-zinc-300 group-hover:scale-105 transition-transform"
                  }`}
                >
                  <Icon name={link.icon} />
                </div>
                <div className="flex flex-col text-left">
                  <span className="font-semibold text-sm sm:text-base tracking-tight">
                    {link.title}
                  </span>
                  <span
                    className={`text-xs ${
                      link.highlight
                        ? "text-zinc-300 dark:text-zinc-600"
                        : "text-zinc-500 dark:text-zinc-400"
                    }`}
                  >
                    {link.description}
                  </span>
                </div>
              </div>

              <div
                className={`text-zinc-400 group-hover:translate-x-1 transition-transform ${
                  link.highlight
                    ? "text-zinc-300 dark:text-zinc-700"
                    : "dark:text-zinc-500"
                }`}
              >
                <svg
                  className="w-5 h-5"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
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
        </section>
      </main>

      {/* Footer */}
      <footer className="mt-12 text-center text-xs text-zinc-400 dark:text-zinc-600">
        <p>© {new Date().getFullYear()} {profileData.name} (@{profileData.githubUsername}). All rights reserved.</p>
        <p className="mt-1">
          Powered by Next.js &amp; Tailwind CSS
        </p>
      </footer>
    </div>
  );
}
