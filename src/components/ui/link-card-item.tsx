"use client";

import { cn } from "@/lib/utils";
import { Globe, Copy, Check, ExternalLink, Search } from "lucide-react";
import { LinkIcon } from "@/components/ui/link-icon";
import { Badge } from "@/components/ui/badge";
import { LinkCard } from "@/types/profile";

/**
 * TDS 스타일 링크 카드 컴포넌트 (shadcn/ui Card 아키텍처 기반)
 * PRD FR-0.2 링크 카드 목록 표준 구현
 *
 * 필수 props: id, title, url (PRD §8.1.1)
 * 선택 props: description, icon, badge, cardColor, badgeColor
 *
 * 디자인 토큰:
 * - rounded-3xl(20–24px), border border-black/[0.06]
 * - 소프트 섀도우: shadow-[0_2px_12px_rgba(0,0,0,0.03)]
 * - 햅틱 인터랙션: hover:-translate-y-0.5 active:scale-[0.98] transition-all duration-200
 */
interface LinkCardItemProps {
  link: LinkCard;
  isCopied?: boolean;
  onCopy?: (url: string, id: string, title: string) => void;
  className?: string;
}

export function LinkCardItem({ link, isCopied, onCopy, className }: LinkCardItemProps) {
  // URL 도메인 파싱 (표시용)
  let domain = link.url;
  try {
    if (link.url.startsWith("http")) {
      const parsed = new URL(link.url);
      domain = parsed.hostname + (parsed.pathname.length > 1 ? parsed.pathname : "");
    }
  } catch {
    domain = link.url;
  }

  const isExternal = link.url.startsWith("http");

  return (
    <article
      className={cn(
        "group relative rounded-3xl border border-black/[0.06]",
        link.cardColor || "bg-white",
        "p-4 sm:p-5",
        "shadow-[0_2px_12px_rgba(0,0,0,0.03)]",
        "hover:shadow-[0_8px_24px_rgba(0,0,0,0.06)]",
        "hover:-translate-y-0.5 active:scale-[0.98]",
        "transition-all duration-200",
        className
      )}
    >
      <div className="flex items-start justify-between gap-3">
        {/* Left — Icon + 텍스트 정보 (클릭 영역) */}
        <a
          href={link.url}
          target={isExternal ? "_blank" : undefined}
          rel={isExternal ? "noopener noreferrer" : undefined}
          className="flex-1 flex items-start gap-3.5 min-w-0"
          aria-label={`${link.title} 링크 열기`}
        >
          {/* 아이콘 박스 */}
          <div className="w-11 h-11 rounded-2xl bg-white border border-black/[0.06] flex items-center justify-center shadow-xs shrink-0 group-hover:scale-105 transition-transform duration-200">
            <LinkIcon name={link.icon} />
          </div>

          {/* 텍스트 정보 */}
          <div className="flex flex-col min-w-0 text-left">
            <div className="flex flex-wrap items-center gap-2">
              <h2 className="text-sm sm:text-base font-bold text-[#191F28] tracking-tight group-hover:text-[#3182F6] transition-colors truncate">
                {link.title}
              </h2>
              {link.badge && (
                <Badge colorClass={link.badgeColor}>{link.badge}</Badge>
              )}
            </div>

            {link.description && (
              <p className="text-xs text-[#4E5968] mt-1 leading-relaxed line-clamp-2">
                {link.description}
              </p>
            )}

            <span className="text-[11px] text-[#8B95A1] font-mono mt-1.5 flex items-center gap-1 truncate">
              <Globe className="w-3 h-3 shrink-0" />
              <span className="truncate">{domain}</span>
            </span>
          </div>
        </a>

        {/* Right — 액션 버튼 */}
        <div className="flex items-center gap-1.5 shrink-0 ml-1">
          {/* URL 복사 버튼 */}
          {onCopy && (
            <button
              type="button"
              onClick={(e) => {
                e.preventDefault();
                e.stopPropagation();
                onCopy(link.url, link.id, link.title);
              }}
              className={cn(
                "w-9 h-9 rounded-2xl border flex items-center justify-center transition-all",
                isCopied
                  ? "bg-emerald-50 text-emerald-600 border-emerald-200"
                  : "bg-white text-[#6B7684] hover:text-[#191F28] border-black/[0.06] hover:bg-zinc-50 shadow-xs"
              )}
              title="URL 복사"
              aria-label="링크 주소 복사"
            >
              {isCopied ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
            </button>
          )}

          {/* 외부 링크 열기 버튼 */}
          <a
            href={link.url}
            target={isExternal ? "_blank" : undefined}
            rel={isExternal ? "noopener noreferrer" : undefined}
            className="w-9 h-9 rounded-2xl bg-white hover:bg-[#3182F6] text-[#6B7684] hover:text-white border border-black/[0.06] flex items-center justify-center shadow-xs transition-colors"
            title="새 탭으로 열기"
            aria-label={`${link.title} 외부 링크 이동`}
          >
            <ExternalLink className="w-4 h-4" />
          </a>
        </div>
      </div>
    </article>
  );
}

/**
 * 검색 결과 Empty State 컴포넌트
 */
interface LinkListEmptyProps {
  query: string;
  onReset: () => void;
}

export function LinkListEmpty({ query, onReset }: LinkListEmptyProps) {
  return (
    <div className="bg-white rounded-3xl border border-dashed border-zinc-200 p-10 text-center flex flex-col items-center justify-center gap-3">
      <div className="w-12 h-12 rounded-full bg-zinc-100 flex items-center justify-center text-zinc-400">
        <Search className="w-5 h-5" />
      </div>
      <div className="flex flex-col gap-1">
        <p className="text-sm font-bold text-[#191F28]">검색 결과가 없습니다</p>
        {query && (
          <p className="text-xs text-[#8B95A1]">
            &lsquo;{query}&rsquo; 키워드와 일치하는 링크를 찾을 수 없습니다.
          </p>
        )}
      </div>
      <button
        type="button"
        onClick={onReset}
        className="mt-2 text-xs font-semibold text-[#3182F6] hover:underline"
      >
        검색 및 필터 초기화
      </button>
    </div>
  );
}
