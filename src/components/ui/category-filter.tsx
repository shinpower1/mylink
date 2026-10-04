"use client";

import { cn } from "@/lib/utils";

/**
 * TDS 스타일 카테고리 필터 탭 컴포넌트 (shadcn/ui Tabs 아키텍처 기반)
 * - 알약형(Pill) 카테고리 세그먼트 필터
 * - Toss Blue 선택 상태
 * - 햅틱 마이크로 인터랙션(active:scale-[0.96])
 * - 수평 스크롤 오버플로우 대응
 */
interface CategoryTab {
  id: string;
  label: string;
  shortLabel: string;
}

interface CategoryFilterProps {
  categories: CategoryTab[];
  selectedId: string;
  onSelect: (id: string) => void;
  className?: string;
}

export function CategoryFilter({
  categories,
  selectedId,
  onSelect,
  className,
}: CategoryFilterProps) {
  return (
    <nav
      aria-label="링크 카테고리 필터"
      className={cn("flex items-center gap-1.5 overflow-x-auto pb-1 scrollbar-none", className)}
    >
      {categories.map((cat) => {
        const isSelected = selectedId === cat.id;
        return (
          <button
            key={cat.id}
            type="button"
            onClick={() => onSelect(cat.id)}
            aria-pressed={isSelected}
            className={cn(
              "px-3.5 py-1.5 rounded-full text-xs font-semibold whitespace-nowrap",
              "transition-all duration-200 active:scale-[0.96]",
              isSelected
                ? "bg-[#3182F6] text-white shadow-xs"
                : "bg-white text-[#6B7684] hover:text-[#191F28] border border-black/[0.06] hover:bg-zinc-50"
            )}
          >
            <span className="sm:hidden">{cat.shortLabel}</span>
            <span className="hidden sm:inline">{cat.label}</span>
          </button>
        );
      })}
    </nav>
  );
}
