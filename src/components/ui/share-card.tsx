"use client";

import { cn } from "@/lib/utils";
import { Share2 } from "lucide-react";

/**
 * TDS 스타일 공유 카드 컴포넌트 (shadcn/ui Card 기반)
 * - 링크 목록 페이지 URL 원클릭 복사
 * - Toss Blue Primary 버튼
 * - 소프트 섀도우 + rounded-3xl
 */
interface ShareCardProps {
  onCopy: () => void;
  className?: string;
}

export function ShareCard({ onCopy, className }: ShareCardProps) {
  return (
    <section
      className={cn(
        "bg-white rounded-3xl border border-black/[0.06] p-5 shadow-xs",
        "flex flex-col sm:flex-row items-center justify-between gap-3",
        "text-center sm:text-left",
        className
      )}
      aria-label="페이지 공유"
    >
      <div className="flex items-center gap-3">
        <div className="w-10 h-10 rounded-2xl bg-blue-50 text-[#3182F6] flex items-center justify-center shrink-0">
          <Share2 className="w-5 h-5" aria-hidden="true" />
        </div>
        <div>
          <p className="text-xs font-bold text-[#191F28]">이 링크 페이지 공유하기</p>
          <p className="text-[11px] text-[#8B95A1]">
            동료 개발자 및 채용 담당자에게 전체 링크 목록을 공유해 보세요.
          </p>
        </div>
      </div>
      <button
        type="button"
        onClick={onCopy}
        className={cn(
          "w-full sm:w-auto",
          "bg-[#3182F6] hover:bg-[#2563EB] text-white",
          "font-semibold text-xs px-4 py-2.5",
          "rounded-2xl shadow-xs",
          "active:scale-[0.97] transition-all",
          "cursor-pointer whitespace-nowrap"
        )}
      >
        페이지 URL 복사
      </button>
    </section>
  );
}
