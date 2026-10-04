"use client";

import { cn } from "@/lib/utils";
import { Search, X } from "lucide-react";

/**
 * TDS 스타일 검색 인풋 컴포넌트 (shadcn/ui Input 아키텍처 기반)
 * - Toss Blue 포커스 링
 * - 부드러운 라운딩(rounded-2xl)
 * - 절제된 소프트 그림자
 * - 실시간 검색어 클리어 버튼
 */
interface SearchInputProps {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  className?: string;
}

export function SearchInput({
  value,
  onChange,
  placeholder = "검색...",
  className,
}: SearchInputProps) {
  return (
    <div className={cn("relative flex items-center", className)}>
      <Search className="absolute left-4 w-4 h-4 text-[#8B95A1] pointer-events-none" />
      <input
        type="text"
        placeholder={placeholder}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className={cn(
          "w-full bg-white text-[#191F28] placeholder-[#8B95A1] text-sm font-medium",
          "pl-10 pr-10 py-3 rounded-2xl",
          "border border-black/[0.06]",
          "shadow-[0_2px_8px_rgba(0,0,0,0.02)]",
          "focus:outline-none focus:ring-2 focus:ring-[#3182F6]/30 focus:border-[#3182F6]",
          "transition-all"
        )}
      />
      {value && (
        <button
          type="button"
          onClick={() => onChange("")}
          className="absolute right-3.5 p-1 rounded-full text-[#8B95A1] hover:text-[#191F28] hover:bg-zinc-100 transition-colors"
          aria-label="검색어 지우기"
        >
          <X className="w-4 h-4" />
        </button>
      )}
    </div>
  );
}
