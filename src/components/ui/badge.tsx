import { cn } from "@/lib/utils";

/**
 * TDS 스타일 Badge 컴포넌트
 * shadcn/ui 디자인 원칙(접근성, 컴포넌트 아키텍처)에 기반한 재사용 가능한 뱃지
 */
interface BadgeProps {
  children: React.ReactNode;
  className?: string;
  colorClass?: string;
}

export function Badge({ children, className, colorClass }: BadgeProps) {
  return (
    <span
      className={cn(
        "inline-flex items-center gap-1 text-[10px] font-bold px-2 py-0.5 rounded-md uppercase tracking-wider shrink-0",
        colorClass || "bg-[#3182F6] text-white",
        className
      )}
    >
      {children}
    </span>
  );
}

/**
 * TDS 스타일 링크 카운트 Badge (파란색 pill)
 */
export function CountBadge({ count, className }: { count: number; className?: string }) {
  return (
    <span
      className={cn(
        "inline-flex items-center gap-1 text-[11px] font-bold text-[#3182F6] bg-[#3182F6]/10 px-2.5 py-1 rounded-full",
        className
      )}
    >
      {count}개의 링크
    </span>
  );
}
