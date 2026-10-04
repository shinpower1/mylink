import { cn } from "@/lib/utils";
import { Sparkles } from "lucide-react";
import { ProfileData } from "@/types/profile";

/**
 * 링크 목록 페이지 상단 프로필 요약 카드 컴포넌트
 * shadcn/ui Card 아키텍처 기반, TDS 비주얼 언어 적용
 *
 * - rounded-3xl + border border-black/[0.06] + soft shadow
 * - 온라인 상태 인디케이터
 * - 링크 총 개수 뱃지
 */
interface LinkPageHeaderProps {
  profile: Pick<ProfileData, "name" | "englishName" | "role" | "githubUsername" | "avatarUrl">;
  linkCount: number;
  className?: string;
}

export function LinkPageHeader({ profile, linkCount, className }: LinkPageHeaderProps) {
  return (
    <section
      className={cn(
        "bg-white rounded-3xl border border-black/[0.06]",
        "p-5 sm:p-6",
        "shadow-[0_2px_16px_rgba(0,0,0,0.03)]",
        "flex items-center justify-between gap-4",
        className
      )}
      aria-label="프로필 요약"
    >
      <div className="flex items-center gap-3.5">
        {/* 아바타 + 온라인 인디케이터 */}
        <div className="relative">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={profile.avatarUrl}
            alt={`${profile.name} 아바타`}
            className="w-14 h-14 rounded-2xl object-cover border border-black/[0.08]"
          />
          <span
            className="absolute -bottom-1 -right-1 w-3.5 h-3.5 rounded-full bg-emerald-500 border-2 border-white"
            aria-label="온라인"
          />
        </div>

        {/* 이름 + 직함 */}
        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-lg sm:text-xl font-bold text-[#191F28] tracking-tight">
              {profile.name}
            </h1>
            {profile.englishName && (
              <span className="text-xs text-[#8B95A1] font-medium hidden sm:inline">
                {profile.englishName}
              </span>
            )}
          </div>
          <p className="text-xs text-[#6B7684] mt-0.5 font-medium line-clamp-1">
            {profile.role} · @{profile.githubUsername}
          </p>
        </div>
      </div>

      {/* 링크 개수 뱃지 */}
      <div className="flex flex-col items-end shrink-0">
        <span className="inline-flex items-center gap-1 text-[11px] font-bold text-[#3182F6] bg-[#3182F6]/10 px-2.5 py-1 rounded-full">
          <Sparkles className="w-3 h-3" aria-hidden="true" />
          <span>{linkCount}개의 링크</span>
        </span>
      </div>
    </section>
  );
}
