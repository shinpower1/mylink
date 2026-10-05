"use client";

import React, { useState, useMemo, useEffect } from "react";
import Link from "next/link";
import { useEditorStore } from "@/store/useEditorStore";
import { LinkCardItem, LinkListEmpty } from "@/components/ui/link-card-item";
import { ArrowLeft, Plus, Trash2, ExternalLink, Sparkles } from "lucide-react";
import { cn } from "@/lib/utils";

export default function MyPage() {
  const [mounted, setMounted] = useState(false);
  const profile = useEditorStore((state) => state.profile);
  const addLink = useEditorStore((state) => state.addLink);
  const removeLink = useEditorStore((state) => state.removeLink);

  const [title, setTitle] = useState("");
  const [url, setUrl] = useState("");
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setMounted(true);
  }, []);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 2400);
  };

  const handleCopyLink = (targetUrl: string, id: string, targetTitle: string) => {
    navigator.clipboard.writeText(targetUrl);
    setCopiedId(id);
    showToast(`'${targetTitle}' 링크 주소가 복사되었습니다! 📋`);
    setTimeout(() => setCopiedId(null), 2000);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!title.trim()) {
      alert("링크 제목을 입력해 주세요.");
      return;
    }

    if (!url.trim()) {
      alert("주소를 입력해 주세요.");
      return;
    }

    let formattedUrl = url.trim();
    if (!formattedUrl.startsWith("http://") && !formattedUrl.startsWith("https://")) {
      formattedUrl = `https://${formattedUrl}`;
    }

    addLink({
      title: title.trim(),
      url: formattedUrl,
      description: "",
      icon: "portfolio",
      badge: "NEW",
      cardColor: "bg-white",
      badgeColor: "bg-[#5B5FC7] text-white",
      isActive: true,
    });

    setTitle("");
    setUrl("");
    showToast("새 링크가 성공적으로 추가되었습니다! 🎉");
  };

  const activeLinks = useMemo(() => {
    return profile.links || [];
  }, [profile.links]);

  if (!mounted) {
    return (
      <div className="min-h-screen bg-[#F9FAFB] flex items-center justify-center">
        <div className="flex items-center gap-2.5 p-4 bg-white rounded-2xl shadow-sm border border-black/[0.04]">
          <span className="w-2.5 h-2.5 rounded-full bg-[#5B5FC7] animate-ping" />
          <span className="text-sm font-semibold text-[#333D4B]">내 링크 관리 불러오는 중...</span>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#F9FAFB] text-[#191F28] flex flex-col items-center px-4 py-6 sm:py-10 selection:bg-[#5B5FC7]/10 selection:text-[#5B5FC7]">
      {/* Toast Notification */}
      {toastMessage && (
        <div
          role="status"
          aria-live="polite"
          className="fixed top-5 z-50 bg-[#191F28] text-white text-xs sm:text-sm font-medium px-4 py-2.5 rounded-full shadow-lg border border-white/10 animate-in fade-in slide-in-from-top-3 duration-200"
        >
          {toastMessage}
        </div>
      )}

      <main className="w-full max-w-xl mx-auto flex flex-col gap-6">
        {/* Navigation Bar */}
        <header className="flex items-center justify-between py-1">
          <Link
            href="/"
            className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#6B7684] hover:text-[#191F28] bg-white hover:bg-zinc-50 border border-black/[0.06] rounded-full px-3.5 py-1.5 shadow-xs active:scale-[0.97] transition-all"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>메인 프로필로</span>
          </Link>

          <Link
            href="/links"
            className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#5B5FC7] hover:underline bg-white border border-black/[0.06] rounded-full px-3.5 py-1.5 shadow-xs active:scale-[0.97] transition-all"
          >
            <span>전체 링크 보기</span>
            <ExternalLink className="w-3 h-3" />
          </Link>
        </header>

        {/* 1. 상단: "내 링크 관리" 제목 */}
        <section className="bg-white rounded-3xl border border-black/[0.06] p-6 shadow-[0_2px_16px_rgba(0,0,0,0.03)] flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div>
            <h1 className="text-xl sm:text-2xl font-bold tracking-tight text-[#191F28]">
              내 링크 관리
            </h1>
            <p className="text-xs text-[#6B7684] mt-1 font-medium">
              나만의 프로필 링크를 직접 추가하고 관리해 보세요.
            </p>
          </div>
          <span className="self-start sm:self-auto inline-flex items-center text-xs font-bold px-3 py-1 rounded-full bg-[#5B5FC7]/10 text-[#5B5FC7]">
            총 {activeLinks.length}개 링크
          </span>
        </section>

        {/* 2. 중간: 링크 추가 폼 */}
        <section className="bg-white rounded-3xl border border-black/[0.06] p-6 shadow-[0_2px_16px_rgba(0,0,0,0.03)]">
          <h2 className="text-sm font-bold text-[#191F28] mb-4 flex items-center gap-1.5">
            <Plus className="w-4 h-4 text-[#5B5FC7]" />
            <span>새 링크 추가</span>
          </h2>

          <form onSubmit={handleSubmit} className="flex flex-col gap-4">
            {/* 1) 제목 입력 칸 */}
            <div className="flex flex-col gap-1.5">
              <label htmlFor="link-title" className="text-xs font-semibold text-[#4E5968]">
                링크 제목
              </label>
              <input
                id="link-title"
                type="text"
                placeholder="링크 제목 입력"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className="w-full bg-[#F9FAFB] focus:bg-white text-[#191F28] placeholder-[#8B95A1] text-sm font-medium px-4 py-3 rounded-2xl border border-black/[0.06] focus:outline-none focus:ring-2 focus:ring-[#5B5FC7]/30 focus:border-[#5B5FC7] transition-all"
              />
            </div>

            {/* 2) 주소 입력 칸 */}
            <div className="flex flex-col gap-1.5">
              <label htmlFor="link-url" className="text-xs font-semibold text-[#4E5968]">
                주소 (URL)
              </label>
              <input
                id="link-url"
                type="text"
                placeholder="https://..."
                value={url}
                onChange={(e) => setUrl(e.target.value)}
                className="w-full bg-[#F9FAFB] focus:bg-white text-[#191F28] placeholder-[#8B95A1] text-sm font-medium px-4 py-3 rounded-2xl border border-black/[0.06] focus:outline-none focus:ring-2 focus:ring-[#5B5FC7]/30 focus:border-[#5B5FC7] transition-all font-mono"
              />
            </div>

            {/* 3) 추가 버튼 (배경색: #5B5FC7, 토스/피그마 스타일 세련된 인터랙션 버튼) */}
            <div className="pt-2">
              <button
                type="submit"
                style={{
                  background: "linear-gradient(135deg, #6C70DC 0%, #5B5FC7 50%, #4A4EB8 100%)",
                  boxShadow: "0 8px 24px -4px rgba(91, 95, 199, 0.45), 0 2px 6px -1px rgba(91, 95, 199, 0.3)",
                }}
                className="group relative w-full h-[52px] rounded-2xl text-white font-bold text-sm tracking-wide flex items-center justify-center gap-2.5 overflow-hidden transition-all duration-200 hover:-translate-y-0.5 hover:shadow-[0_12px_28px_-4px_rgba(91,95,199,0.55)] active:translate-y-0 active:scale-[0.98] cursor-pointer border border-white/20"
              >
                {/* 배경 조명 효과 */}
                <span className="absolute -top-10 -left-10 w-24 h-24 bg-white/25 rounded-full blur-xl pointer-events-none group-hover:scale-150 transition-transform duration-500" />
                
                {/* 둥근 아이콘 뱃지 */}
                <span className="w-6 h-6 rounded-full bg-white/20 flex items-center justify-center shadow-inner group-hover:bg-white group-hover:text-[#5B5FC7] transition-colors duration-200">
                  <Plus className="w-4 h-4 transition-transform duration-300 group-hover:rotate-90 text-current" />
                </span>

                <span className="text-[15px] font-bold drop-shadow-sm">
                  링크 추가하기
                </span>

                <Sparkles className="w-4 h-4 text-amber-200 animate-pulse ml-0.5" />
              </button>
            </div>
          </form>
        </section>

        {/* 3. 하단: 링크 목록 */}
        <section className="flex flex-col gap-3">
          <div className="flex items-center justify-between px-1">
            <h2 className="text-sm font-bold text-[#191F28]">등록된 링크 목록</h2>
            <span className="text-xs text-[#8B95A1]">
              {activeLinks.length}개의 항목
            </span>
          </div>

          {activeLinks.length === 0 ? (
            <LinkListEmpty
              query=""
              onReset={() => {}}
            />
          ) : (
            <div className="flex flex-col gap-3">
              {activeLinks.map((link) => (
                <div key={link.id} className="relative group">
                  <LinkCardItem
                    link={link}
                    isCopied={copiedId === link.id}
                    onCopy={handleCopyLink}
                  />

                  {/* 삭제 버튼 */}
                  <button
                    type="button"
                    onClick={() => {
                      if (window.confirm(`'${link.title}' 링크를 삭제하시겠습니까?`)) {
                        removeLink(link.id);
                        showToast(`'${link.title}' 링크가 삭제되었습니다.`);
                      }
                    }}
                    className="absolute -top-2 -right-2 w-7 h-7 rounded-full bg-white hover:bg-rose-50 border border-black/[0.08] shadow-sm flex items-center justify-center text-[#8B95A1] hover:text-rose-600 opacity-80 group-hover:opacity-100 transition-all cursor-pointer z-10"
                    title="링크 삭제"
                    aria-label="링크 삭제"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                </div>
              ))}
            </div>
          )}
        </section>

        {/* Footer */}
        <footer className="mt-6 text-center text-xs text-[#8B95A1] pb-10 flex flex-col items-center gap-1.5">
          <p>© {new Date().getFullYear()} {profile.name} · All rights reserved.</p>
        </footer>
      </main>
    </div>
  );
}
