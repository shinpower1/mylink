"use client";

import React, { useState, useMemo, useEffect } from "react";
import { useEditorStore } from "@/store/useEditorStore";
import EditProfileModal from "@/components/EditProfileModal";
import { cn } from "@/lib/utils";

// TDS + shadcn/ui 기반 컴포넌트
import { SearchInput } from "@/components/ui/search-input";
import { CategoryFilter } from "@/components/ui/category-filter";
import { LinkCardItem, LinkListEmpty } from "@/components/ui/link-card-item";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

import { LinkIcon } from "@/components/ui/link-icon";

import {
  RotateCcw,
  Sparkles,
  Mail,
  Edit3,
  Copy,
  Check,
  Code2,
  User,
} from "lucide-react";

type CategoryType = "all" | "featured" | "writing" | "oss_talks" | "career_contact";

const CATEGORIES = [
  { id: "all", label: "전체", shortLabel: "전체" },
  { id: "featured", label: "대표 프로젝트", shortLabel: "프로젝트" },
  { id: "writing", label: "기술 블로그", shortLabel: "블로그" },
  { id: "oss_talks", label: "세미나 & 오픈소스", shortLabel: "발표/OSS" },
  { id: "career_contact", label: "커리어 & 네트워킹", shortLabel: "커리어" },
] as const;

export default function Home() {
  const profile = useEditorStore((state) => state.profile);
  const resetToDefault = useEditorStore((state) => state.resetToDefault);

  const [mounted, setMounted] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<CategoryType>("all");
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const [toastMessage, setToastMessage] = useState<string | null>(null);
  const [emailCopied, setEmailCopied] = useState(false);

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setMounted(true);
  }, []);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 2500);
  };

  const handleCopyLink = (url: string, id: string, title: string) => {
    navigator.clipboard.writeText(url);
    setCopiedId(id);
    showToast(`'${title}' 링크가 복사되었습니다! 📋`);
    setTimeout(() => setCopiedId(null), 2000);
  };

  const handleCopyEmail = () => {
    if (!profile.email) return;
    navigator.clipboard.writeText(profile.email);
    setEmailCopied(true);
    showToast("이메일 주소가 복사되었습니다! 📬");
    setTimeout(() => setEmailCopied(false), 2000);
  };

  const handleReset = () => {
    if (window.confirm("프로필과 링크 데이터를 기본값으로 복원하시겠습니까?")) {
      resetToDefault();
      showToast("기본 데이터로 복원되었습니다. ✨");
    }
  };

  // 활성 링크 목록
  const activeLinks = useMemo(() => {
    return profile.links.filter((link) => link.isActive !== false);
  }, [profile.links]);

  // 검색 및 카테고리 필터링
  const filteredLinks = useMemo(() => {
    return activeLinks.filter((link) => {
      // 카테고리 필터
      if (selectedCategory === "featured") {
        const isFeatured =
          link.id.includes("featured") ||
          !!link.badge?.includes("FEATURED") ||
          !!link.badge?.includes("HIGHLIGHT");
        if (!isFeatured) return false;
      } else if (selectedCategory === "writing") {
        const isWriting =
          link.id.includes("writing") ||
          link.icon === "blog" ||
          !!link.badge?.includes("BLOG") ||
          !!link.badge?.includes("STORIES");
        if (!isWriting) return false;
      } else if (selectedCategory === "oss_talks") {
        const isOssTalks =
          link.id.includes("talk") ||
          link.id.includes("oss") ||
          link.icon === "presentation" ||
          link.icon === "code" ||
          !!link.badge?.includes("SLIDES") ||
          !!link.badge?.includes("OSS");
        if (!isOssTalks) return false;
      } else if (selectedCategory === "career_contact") {
        const isCareer =
          link.id.includes("career") ||
          link.id.includes("contact") ||
          link.icon === "linkedin" ||
          link.icon === "coffee" ||
          link.icon === "email" ||
          !!link.badge?.includes("CAREER") ||
          !!link.badge?.includes("COFFEE") ||
          !!link.badge?.includes("TALK");
        if (!isCareer) return false;
      }

      // 검색어 필터
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
  }, [activeLinks, selectedCategory, searchQuery]);

  if (!mounted) {
    return (
      <div className="min-h-screen bg-[#F9FAFB] flex items-center justify-center">
        <div className="flex items-center gap-2.5 p-4 bg-white rounded-2xl shadow-sm border border-black/[0.04]">
          <span className="w-2.5 h-2.5 rounded-full bg-[#3182F6] animate-ping" />
          <span className="text-sm font-semibold text-[#333D4B]">MYLINK 불러오는 중...</span>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#F9FAFB] text-[#191F28] flex flex-col items-center px-4 py-6 sm:py-10 selection:bg-[#3182F6]/10 selection:text-[#3182F6]">
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

      {/* Top Controls Header */}
      <header className="w-full max-w-xl mx-auto mb-4 flex items-center justify-between py-1">
        <div className="flex items-center gap-2">
          <span className="flex h-2 w-2 relative">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
            <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500" />
          </span>
          <span className="text-xs font-semibold text-[#8B95A1]">
            TDS Profile Live
          </span>
        </div>

        <div className="flex items-center gap-1.5">
          <Button
            variant="outline"
            size="sm"
            onClick={() => setIsEditModalOpen(true)}
            className="rounded-full h-8 px-3 text-xs bg-white hover:bg-blue-50 text-[#191F28] hover:text-[#3182F6] border-black/[0.06] shadow-xs active:scale-[0.97]"
          >
            <Edit3 className="w-3.5 h-3.5 mr-1" />
            <span>프로필 편집</span>
          </Button>

          <Button
            variant="ghost"
            size="icon-sm"
            onClick={handleReset}
            title="초기 데이터로 복원"
            className="rounded-full text-[#8B95A1] hover:text-[#191F28] active:scale-[0.97]"
          >
            <RotateCcw className="w-3.5 h-3.5" />
          </Button>
        </div>
      </header>

      {/* Main Container */}
      <main className="w-full max-w-xl mx-auto flex flex-col gap-5">
        {/* Profile Card Header (TDS Style) */}
        <section className="bg-white rounded-3xl border border-black/[0.06] p-6 sm:p-7 shadow-[0_2px_16px_rgba(0,0,0,0.03)] flex flex-col items-center text-center relative overflow-hidden">
          {/* Avatar with status indicator */}
          <div className="relative mb-4">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={profile.avatarUrl}
              alt={profile.name}
              className="w-24 h-24 sm:w-26 sm:h-26 rounded-3xl object-cover border border-black/[0.06] shadow-sm"
            />
            <span
              className="absolute -bottom-1 -right-1 w-4 h-4 rounded-full bg-emerald-500 border-2 border-white shadow-xs"
              title="활동 중"
            />
          </div>

          {/* Status Badge */}
          {profile.status && (
            <div className="inline-flex items-center gap-1 px-3 py-1 mb-2.5 rounded-full text-xs font-semibold bg-[#E8F3FF] text-[#3182F6]">
              <Sparkles className="w-3 h-3" />
              <span>{profile.status}</span>
            </div>
          )}

          {/* Name & English Name */}
          <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-[#191F28] flex items-center justify-center gap-2">
            <span>{profile.name}</span>
            {profile.englishName && (
              <span className="text-sm sm:text-base font-normal text-[#8B95A1]">
                ({profile.englishName})
              </span>
            )}
          </h1>

          {/* Role & Social Badges */}
          <p className="text-sm font-medium text-[#4E5968] mt-1">
            {profile.role}
          </p>

          <div className="mt-3 flex flex-wrap items-center justify-center gap-2">
            {profile.githubUsername && (
              <a
                href={`https://github.com/${profile.githubUsername}`}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 bg-[#F2F4F6] hover:bg-[#E5E8EB] text-[#333D4B] text-xs font-semibold px-3 py-1.5 rounded-full active:scale-[0.97] transition-all"
              >
                <LinkIcon name="github" className="w-3.5 h-3.5" />
                <span>@{profile.githubUsername}</span>
              </a>
            )}

            {profile.email && (
              <button
                type="button"
                onClick={handleCopyEmail}
                className="inline-flex items-center gap-1.5 bg-[#F2F4F6] hover:bg-[#E5E8EB] text-[#333D4B] text-xs font-semibold px-3 py-1.5 rounded-full active:scale-[0.97] transition-all"
                title="이메일 복사"
              >
                {emailCopied ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Mail className="w-3.5 h-3.5" />}
                <span>{emailCopied ? "복사됨!" : profile.email}</span>
              </button>
            )}
          </div>

          {/* Headline / Slogan */}
          {profile.headline && (
            <div className="mt-4 w-full bg-[#F9FAFB] rounded-2xl p-3.5 text-xs sm:text-sm font-medium text-[#333D4B] leading-relaxed border border-black/[0.04]">
              &ldquo;{profile.headline}&rdquo;
            </div>
          )}
        </section>

        {/* Bio / About Me Section */}
        {profile.bioSections && profile.bioSections.length > 0 && (
          <section className="bg-white rounded-3xl border border-black/[0.06] p-5 sm:p-6 shadow-[0_2px_12px_rgba(0,0,0,0.02)] flex flex-col gap-3">
            <div className="flex items-center justify-between pb-1">
              <h2 className="text-xs font-bold text-[#8B95A1] uppercase tracking-wider flex items-center gap-1.5">
                <User className="w-3.5 h-3.5 text-[#3182F6]" />
                <span>소개 &amp; 가치관</span>
              </h2>
            </div>

            <div className="flex flex-col gap-2">
              {profile.bioSections.map((sec) => (
                <div
                  key={sec.label}
                  className="flex items-start gap-2.5 p-3 rounded-2xl bg-[#F9FAFB] border border-black/[0.02]"
                >
                  <span
                    className={cn(
                      "text-[10px] font-bold px-2 py-0.5 rounded-md uppercase tracking-wider shrink-0 mt-0.5",
                      sec.color || "bg-[#3182F6] text-white"
                    )}
                  >
                    {sec.label}
                  </span>
                  <p className="text-xs sm:text-sm font-medium text-[#4E5968] leading-relaxed">
                    {sec.desc}
                  </p>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Tech Stack Section */}
        {profile.techStack && profile.techStack.length > 0 && (
          <section className="bg-white rounded-3xl border border-black/[0.06] p-5 sm:p-6 shadow-[0_2px_12px_rgba(0,0,0,0.02)] flex flex-col gap-3">
            <div className="flex items-center justify-between pb-1">
              <h2 className="text-xs font-bold text-[#8B95A1] uppercase tracking-wider flex items-center gap-1.5">
                <Code2 className="w-3.5 h-3.5 text-[#3182F6]" />
                <span>핵심 기술 스택</span>
              </h2>
              <span className="text-[11px] font-semibold text-[#8B95A1]">
                {profile.techStack.length}개 보유
              </span>
            </div>

            <div className="flex flex-wrap gap-1.5">
              {profile.techStack.map((tech) => (
                <span
                  key={tech.name}
                  className={cn(
                    "text-xs font-semibold px-3 py-1.5 rounded-full border border-black/[0.04]",
                    tech.color || "bg-zinc-100 text-zinc-800"
                  )}
                >
                  {tech.name}
                </span>
              ))}
            </div>
          </section>
        )}

        {/* Search Input */}
        <SearchInput
          value={searchQuery}
          onChange={setSearchQuery}
          placeholder="링크 제목, 키워드, 기술 검색..."
        />

        {/* Category Filter Chips */}
        <CategoryFilter
          categories={CATEGORIES.map((c) => ({ ...c }))}
          selectedId={selectedCategory}
          onSelect={(id) => setSelectedCategory(id as CategoryType)}
        />

        {/* Links Count Bar */}
        <div className="flex items-center justify-between px-1 text-xs text-[#8B95A1] font-medium">
          <span>
            총 <strong className="text-[#333D4B]">{filteredLinks.length}</strong>개의 링크
          </span>
          <span className="text-[11px]">TDS Style · Haptic Interaction</span>
        </div>

        {/* Links Cards List (shadcn/ui + TDS) */}
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

        {/* Footer */}
        <footer className="mt-8 text-center text-xs text-[#8B95A1] pb-10 flex flex-col items-center gap-1.5">
          <p>© {new Date().getFullYear()} {profile.name} · All rights reserved.</p>
          <p className="text-[11px] text-[#8B95A1]/80">
            Powered by Next.js 16 &amp; Toss Design System (TDS) Style
          </p>
        </footer>
      </main>

      {/* Edit Profile Modal */}
      <EditProfileModal
        isOpen={isEditModalOpen}
        onClose={() => setIsEditModalOpen(false)}
      />
    </div>
  );
}
