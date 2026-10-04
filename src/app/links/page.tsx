"use client";

import React, { useState, useMemo, useEffect } from "react";
import Link from "next/link";
import { ArrowLeft, RotateCcw } from "lucide-react";

import { useEditorStore } from "@/store/useEditorStore";
import { mockLinks } from "@/data/mockLinks";
import { cn } from "@/lib/utils";
import { LinkCard } from "@/types/profile";

// 재사용 가능한 shadcn/ui 기반 TDS 컴포넌트
import { LinkPageHeader } from "@/components/ui/link-page-header";
import { SearchInput } from "@/components/ui/search-input";
import { CategoryFilter } from "@/components/ui/category-filter";
import { LinkCardItem, LinkListEmpty } from "@/components/ui/link-card-item";
import { ShareCard } from "@/components/ui/share-card";

// ─── 카테고리 정의 ────────────────────────────────────────────────────────────
type CategoryType = "all" | "featured" | "writing" | "oss_talks" | "career_contact";

const CATEGORIES = [
  { id: "all", label: "전체", shortLabel: "전체" },
  { id: "featured", label: "대표 프로젝트", shortLabel: "프로젝트" },
  { id: "writing", label: "기술 블로그", shortLabel: "블로그" },
  { id: "oss_talks", label: "세미나 & 오픈소스", shortLabel: "발표/OSS" },
  { id: "career_contact", label: "커리어 & 네트워킹", shortLabel: "커리어" },
] as const;

// ─── 카테고리 필터링 유틸 ─────────────────────────────────────────────────────
function matchesCategory(link: LinkCard, category: CategoryType): boolean {
  if (category === "all") return true;
  if (category === "featured") {
    return (
      link.id.includes("featured") ||
      !!link.badge?.includes("FEATURED") ||
      !!link.badge?.includes("HIGHLIGHT")
    );
  }
  if (category === "writing") {
    return (
      link.id.includes("writing") ||
      link.icon === "blog" ||
      !!link.badge?.includes("BLOG") ||
      !!link.badge?.includes("STORIES")
    );
  }
  if (category === "oss_talks") {
    return (
      link.id.includes("talk") ||
      link.id.includes("oss") ||
      link.icon === "presentation" ||
      link.icon === "code" ||
      !!link.badge?.includes("SLIDES") ||
      !!link.badge?.includes("OSS")
    );
  }
  if (category === "career_contact") {
    return (
      link.id.includes("career") ||
      link.id.includes("contact") ||
      link.icon === "linkedin" ||
      link.icon === "coffee" ||
      link.icon === "email" ||
      !!link.badge?.includes("CAREER") ||
      !!link.badge?.includes("COFFEE") ||
      !!link.badge?.includes("TALK")
    );
  }
  return true;
}

// ─── 링크 목록 페이지 ─────────────────────────────────────────────────────────
export default function LinksPage() {
  const profile = useEditorStore((state) => state.profile);
  const resetToDefault = useEditorStore((state) => state.resetToDefault);

  const [mounted, setMounted] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<CategoryType>("all");
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setMounted(true);
  }, []);

  // ── 토스트 알림 ─────────────────────────────────────────────────────────────
  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 2400);
  };

  // ── 링크 URL 복사 ───────────────────────────────────────────────────────────
  const handleCopyLink = (url: string, id: string, title: string) => {
    navigator.clipboard.writeText(url);
    setCopiedId(id);
    showToast(`'${title}' 링크 주소가 복사되었습니다! 📋`);
    setTimeout(() => setCopiedId(null), 2000);
  };

  // ── 페이지 URL 복사 ─────────────────────────────────────────────────────────
  const handleCopyPageUrl = () => {
    if (typeof window !== "undefined") {
      navigator.clipboard.writeText(window.location.href);
      showToast("링크 목록 페이지 URL이 복사되었습니다! 🔗");
    }
  };

  // ── 더미 데이터 복원 ────────────────────────────────────────────────────────
  const handleResetToDefault = () => {
    if (window.confirm("링크 목록을 PRD v1.5.0 표준 더미 데이터셋(8종)으로 복원하시겠습니까?")) {
      resetToDefault();
      showToast("표준 8종 더미 링크 데이터로 복원되었습니다! ✨");
    }
  };

  // ── 활성 링크 목록 ──────────────────────────────────────────────────────────
  const allLinks = useMemo(() => {
    if (!profile.links || profile.links.length === 0) return mockLinks;
    return profile.links.filter((l) => l.isActive !== false);
  }, [profile.links]);

  // ── 카테고리 + 검색 필터링 ──────────────────────────────────────────────────
  const filteredLinks = useMemo(() => {
    return allLinks.filter((link) => {
      if (!matchesCategory(link, selectedCategory)) {
        return false;
      }
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase().trim();
        return (
          link.title.toLowerCase().includes(q) ||
          link.description?.toLowerCase().includes(q) ||
          !!link.badge?.toLowerCase().includes(q) ||
          link.url.toLowerCase().includes(q)
        );
      }
      return true;
    });
  }, [allLinks, selectedCategory, searchQuery]);

  // ── 로딩 (SSR hydration mismatch 방지) ──────────────────────────────────────
  if (!mounted) {
    return (
      <div className="min-h-screen bg-[#F9FAFB] flex items-center justify-center">
        <div className="flex items-center gap-3 p-4 bg-white rounded-2xl shadow-sm border border-black/[0.04]">
          <span className="w-2.5 h-2.5 rounded-full bg-[#3182F6] animate-ping" />
          <span className="text-sm font-semibold text-[#333D4B]">링크 목록을 불러오는 중...</span>
        </div>
      </div>
    );
  }

  return (
    <div
      className={cn(
        "min-h-screen bg-[#F9FAFB] text-[#191F28]",
        "flex flex-col items-center",
        "px-4 py-6 sm:py-10",
        "selection:bg-[#3182F6]/10 selection:text-[#3182F6]"
      )}
    >
      {/* ── 토스트 알림 ──────────────────────────────────────────────────────── */}
      {toastMessage && (
        <div
          role="status"
          aria-live="polite"
          className="fixed top-5 z-50 bg-[#191F28] text-white text-xs sm:text-sm font-medium px-4 py-2.5 rounded-full shadow-lg border border-white/10 animate-in fade-in slide-in-from-top-3 duration-200"
        >
          {toastMessage}
        </div>
      )}

      {/* ── 메인 컨테이너 ────────────────────────────────────────────────────── */}
      <main className="w-full max-w-xl mx-auto flex flex-col gap-5">

        {/* ① 내비게이션 바 (뒤로가기 + 초기화) */}
        <header className="flex items-center justify-between py-1">
          <Link
            href="/"
            className={cn(
              "inline-flex items-center gap-1.5",
              "text-xs font-semibold text-[#6B7684] hover:text-[#191F28]",
              "bg-white hover:bg-zinc-50 border border-black/[0.06] rounded-full",
              "px-3.5 py-1.5 shadow-xs",
              "active:scale-[0.97] transition-all"
            )}
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>프로필 메인</span>
          </Link>

          <button
            type="button"
            onClick={handleResetToDefault}
            className={cn(
              "inline-flex items-center gap-1.5",
              "text-xs font-medium text-[#6B7684] hover:text-[#3182F6]",
              "bg-white hover:bg-blue-50/50 border border-black/[0.06] rounded-full",
              "px-3 py-1.5 shadow-xs",
              "active:scale-[0.97] transition-all"
            )}
            title="8종 표준 더미 데이터로 리셋"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span>표준 데이터 복원</span>
          </button>
        </header>

        {/* ② 프로필 요약 헤더 카드 */}
        <LinkPageHeader
          profile={profile}
          linkCount={allLinks.length}
        />

        {/* ③ 검색 인풋 */}
        <SearchInput
          value={searchQuery}
          onChange={setSearchQuery}
          placeholder="링크 제목, 키워드, 기술 스택 검색..."
        />

        {/* ④ 카테고리 필터 칩 */}
        <CategoryFilter
          categories={CATEGORIES.map((c) => ({ ...c }))}
          selectedId={selectedCategory}
          onSelect={(id) => setSelectedCategory(id as CategoryType)}
        />

        {/* ⑤ 링크 개수 + 상태 표시바 */}
        <div className="flex items-center justify-between px-1 text-xs text-[#8B95A1] font-medium">
          <span>
            총 <strong className="text-[#333D4B]">{filteredLinks.length}</strong>개의 링크가 탐색되었습니다
          </span>
          <span className="text-[11px]">TDS Style · Haptic Interaction</span>
        </div>

        {/* ⑥ 링크 카드 목록 */}
        <section className="flex flex-col gap-3" aria-label="링크 목록">
          {filteredLinks.length === 0 ? (
            <LinkListEmpty
              query={searchQuery}
              onReset={() => {
                setSearchQuery("");
                setSelectedCategory("all");
              }}
            />
          ) : (
            filteredLinks.map((link) => (
              <LinkCardItem
                key={link.id}
                link={link}
                isCopied={copiedId === link.id}
                onCopy={handleCopyLink}
              />
            ))
          )}
        </section>

        {/* ⑦ 페이지 공유 카드 */}
        <ShareCard onCopy={handleCopyPageUrl} className="mt-4" />

        {/* ⑧ 푸터 */}
        <footer className="mt-8 text-center text-xs text-[#8B95A1] pb-8 flex flex-col items-center gap-1.5">
          <p>© {new Date().getFullYear()} {profile.name} · All rights reserved.</p>
          <p className="text-[11px] text-[#8B95A1]/80">
            Powered by Next.js 16 &amp; Toss Design System (TDS) Style
          </p>
        </footer>
      </main>
    </div>
  );
}
