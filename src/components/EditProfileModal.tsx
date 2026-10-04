"use client";

import React, { useState } from "react";
import { useEditorStore } from "@/store/useEditorStore";

interface EditProfileModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function EditProfileModal({ isOpen, onClose }: EditProfileModalProps) {
  const { profile, updateProfile, addLink, removeLink } = useEditorStore();

  const [name, setName] = useState(profile.name);
  const [englishName, setEnglishName] = useState(profile.englishName || "");
  const [role, setRole] = useState(profile.role);
  const [status, setStatus] = useState(profile.status);
  const [headline, setHeadline] = useState(profile.headline);
  const [email, setEmail] = useState(profile.email || "");
  const [githubUsername, setGithubUsername] = useState(profile.githubUsername || "");

  // New Link form state
  const [newTitle, setNewTitle] = useState("");
  const [newUrl, setNewUrl] = useState("");
  const [newDesc, setNewDesc] = useState("");
  const [newBadge, setNewBadge] = useState("NEW ⚡");
  const [newIcon, setNewIcon] = useState("portfolio");
  const [newCardColor, setNewCardColor] = useState("bg-[#E8F3FF]");

  if (!isOpen) return null;

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    updateProfile({
      name,
      englishName,
      role,
      status,
      headline,
      email,
      githubUsername,
    });
    onClose();
  };

  const handleAddLink = () => {
    if (!newTitle.trim() || !newUrl.trim()) return;
    addLink({
      title: newTitle,
      url: newUrl,
      description: newDesc || newUrl,
      icon: newIcon,
      badge: newBadge,
      cardColor: newCardColor,
      badgeColor: "bg-[#3182F6] text-white",
      isActive: true,
    });
    setNewTitle("");
    setNewUrl("");
    setNewDesc("");
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs animate-in fade-in duration-200">
      <div className="relative w-full max-w-lg max-h-[90vh] flex flex-col bg-white border-3 border-black rounded-2xl shadow-[8px_8px_0px_#000] overflow-hidden text-black">
        {/* Header Bar */}
        <div className="bg-[#FFE600] border-b-3 border-black px-4 py-3 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="w-3.5 h-3.5 rounded-full bg-[#FF5F56] border-2 border-black inline-block" />
            <span className="w-3.5 h-3.5 rounded-full bg-[#FFBD2E] border-2 border-black inline-block" />
            <span className="w-3.5 h-3.5 rounded-full bg-[#27C93F] border-2 border-black inline-block" />
            <h2 className="font-mono font-black text-xs uppercase tracking-wider ml-1">
              DEMO_QUICK_EDITOR.EXE
            </h2>
          </div>
          <button
            onClick={onClose}
            className="w-7 h-7 bg-white hover:bg-black hover:text-white rounded-lg border-2 border-black flex items-center justify-center font-black text-sm shadow-[2px_2px_0px_#000] transition-colors cursor-pointer"
            aria-label="닫기"
          >
            ✕
          </button>
        </div>

        {/* Scrollable Content */}
        <div className="p-5 sm:p-6 overflow-y-auto space-y-6">
          <div className="bg-[#FEF08A] border-2 border-black p-3 rounded-xl shadow-[2px_2px_0px_#000] text-xs font-bold leading-relaxed">
            💡 <strong>시연 안내:</strong> 정보를 변경하고 [저장하기]를 누르면 브라우저 <strong>LocalStorage</strong>에 즉시 영구 저장됩니다. 새로고침(F5)해도 변경사항이 유지됩니다!
          </div>

          <form onSubmit={handleSave} className="space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className="block text-xs font-black uppercase mb-1">이름</label>
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full bg-[#F8FAFC] border-2 border-black rounded-lg px-3 py-2 text-sm font-bold shadow-[2px_2px_0px_#000] focus:outline-none focus:bg-white"
                  required
                />
              </div>
              <div>
                <label className="block text-xs font-black uppercase mb-1">영문명</label>
                <input
                  type="text"
                  value={englishName}
                  onChange={(e) => setEnglishName(e.target.value)}
                  className="w-full bg-[#F8FAFC] border-2 border-black rounded-lg px-3 py-2 text-sm font-bold shadow-[2px_2px_0px_#000] focus:outline-none focus:bg-white"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className="block text-xs font-black uppercase mb-1">직함 / 포지션</label>
                <input
                  type="text"
                  value={role}
                  onChange={(e) => setRole(e.target.value)}
                  className="w-full bg-[#F8FAFC] border-2 border-black rounded-lg px-3 py-2 text-sm font-bold shadow-[2px_2px_0px_#000] focus:outline-none focus:bg-white"
                  required
                />
              </div>
              <div>
                <label className="block text-xs font-black uppercase mb-1">상태 뱃지</label>
                <input
                  type="text"
                  value={status}
                  onChange={(e) => setStatus(e.target.value)}
                  className="w-full bg-[#F8FAFC] border-2 border-black rounded-lg px-3 py-2 text-sm font-bold shadow-[2px_2px_0px_#000] focus:outline-none focus:bg-white"
                  required
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-black uppercase mb-1">한 줄 슬로건 / 헤드라인</label>
              <textarea
                rows={2}
                value={headline}
                onChange={(e) => setHeadline(e.target.value)}
                className="w-full bg-[#F8FAFC] border-2 border-black rounded-lg px-3 py-2 text-sm font-bold shadow-[2px_2px_0px_#000] focus:outline-none focus:bg-white"
                required
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className="block text-xs font-black uppercase mb-1">이메일</label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full bg-[#F8FAFC] border-2 border-black rounded-lg px-3 py-2 text-sm font-bold shadow-[2px_2px_0px_#000] focus:outline-none focus:bg-white"
                />
              </div>
              <div>
                <label className="block text-xs font-black uppercase mb-1">GitHub 핸들</label>
                <input
                  type="text"
                  value={githubUsername}
                  onChange={(e) => setGithubUsername(e.target.value)}
                  className="w-full bg-[#F8FAFC] border-2 border-black rounded-lg px-3 py-2 text-sm font-bold shadow-[2px_2px_0px_#000] focus:outline-none focus:bg-white"
                />
              </div>
            </div>

            {/* Link Management Section */}
            <div className="pt-4 border-t-2 border-black">
              <h3 className="text-sm font-black uppercase mb-3 flex items-center justify-between">
                <span>🔗 링크 카드 추가 / 관리 ({profile.links.length})</span>
              </h3>

              {/* Add New Link Box */}
              <div className="p-3.5 bg-[#F1F5F9] border-2 border-black rounded-xl shadow-[3px_3px_0px_#000] mb-4 space-y-2.5">
                <div className="text-xs font-black text-zinc-700 uppercase">새 링크 등록</div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                  <input
                    type="text"
                    placeholder="링크 제목 (예: 신규 사이드 프로젝트)"
                    value={newTitle}
                    onChange={(e) => setNewTitle(e.target.value)}
                    className="bg-white border-2 border-black rounded-lg px-2.5 py-1.5 text-xs font-bold"
                  />
                  <input
                    type="url"
                    placeholder="URL (https://...)"
                    value={newUrl}
                    onChange={(e) => setNewUrl(e.target.value)}
                    className="bg-white border-2 border-black rounded-lg px-2.5 py-1.5 text-xs font-bold"
                  />
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                  <select
                    value={newIcon}
                    onChange={(e) => setNewIcon(e.target.value)}
                    className="bg-white border-2 border-black rounded-lg px-2.5 py-1.5 text-xs font-bold"
                  >
                    <option value="portfolio">🚀 대표 프로젝트 (Portfolio)</option>
                    <option value="github">🐙 GitHub 리포지토리</option>
                    <option value="blog">✍️ 기술 블로그 (Blog)</option>
                    <option value="presentation">📊 세미나 발표 (Slides)</option>
                    <option value="code">⚡ 오픈소스 (OSS/Code)</option>
                    <option value="linkedin">💼 커리어/이력서 (LinkedIn)</option>
                    <option value="coffee">☕ 커피챗 & 멘토링 (Coffee)</option>
                    <option value="email">✉️ 비즈니스 문의 (Email)</option>
                  </select>
                  <select
                    value={newCardColor}
                    onChange={(e) => setNewCardColor(e.target.value)}
                    className="bg-white border-2 border-black rounded-lg px-2.5 py-1.5 text-xs font-bold"
                  >
                    <option value="bg-[#E8F3FF]">토스 블루 테마 (TDS Soft Blue)</option>
                    <option value="bg-[#FFFFFF]">순백색 테마 (Pure White)</option>
                    <option value="bg-[#F2F4F6]">소프트 그레이 테마 (Light Gray)</option>
                    <option value="bg-[#F5F3FF]">소프트 퍼플 테마 (Soft Purple)</option>
                    <option value="bg-[#FEF3C7]">소프트 앰버 테마 (Soft Amber)</option>
                    <option value="bg-[#FEE2E2]">소프트 로즈 테마 (Soft Rose)</option>
                    <option value="bg-[#FFE600]">클래식 옐로우 테마</option>
                  </select>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
                  <input
                    type="text"
                    placeholder="설명 (간략한 설명 문구)"
                    value={newDesc}
                    onChange={(e) => setNewDesc(e.target.value)}
                    className="w-full bg-white border-2 border-black rounded-lg px-2.5 py-1.5 text-xs font-bold sm:col-span-2"
                  />
                  <input
                    type="text"
                    placeholder="뱃지 (예: NEW ⚡)"
                    value={newBadge}
                    onChange={(e) => setNewBadge(e.target.value)}
                    className="w-full bg-white border-2 border-black rounded-lg px-2.5 py-1.5 text-xs font-bold"
                  />
                </div>
                <button
                  type="button"
                  onClick={handleAddLink}
                  className="w-full bg-[#67E8F9] hover:bg-[#22D3EE] text-black font-black text-xs py-2 rounded-lg border-2 border-black shadow-[2px_2px_0px_#000] active:translate-x-0.5 active:translate-y-0.5 transition-all cursor-pointer"
                >
                  + 링크 목록에 추가
                </button>
              </div>

              {/* Existing Links List */}
              <div className="space-y-2 max-h-48 overflow-y-auto pr-1">
                {profile.links.map((link) => (
                  <div
                    key={link.id}
                    className="flex items-center justify-between p-2.5 rounded-lg border-2 border-black bg-white shadow-[2px_2px_0px_#000]"
                  >
                    <div className="flex flex-col text-left overflow-hidden mr-2">
                      <span className="text-xs font-black truncate">{link.title}</span>
                      <span className="text-[10px] text-zinc-500 font-mono truncate">{link.url}</span>
                    </div>
                    <button
                      type="button"
                      onClick={() => removeLink(link.id)}
                      className="px-2 py-1 bg-red-100 hover:bg-red-500 hover:text-white text-red-600 text-[11px] font-black rounded border border-black transition-colors cursor-pointer shrink-0"
                    >
                      삭제
                    </button>
                  </div>
                ))}
              </div>
            </div>

            {/* Action Buttons */}
            <div className="pt-4 flex gap-2">
              <button
                type="button"
                onClick={onClose}
                className="flex-1 bg-zinc-200 hover:bg-zinc-300 text-black font-black text-xs py-3 rounded-xl border-2 border-black shadow-[2px_2px_0px_#000] transition-all cursor-pointer"
              >
                닫기
              </button>
              <button
                type="submit"
                className="flex-2 bg-[#70EE9C] hover:bg-[#4ADE80] text-black font-black text-xs py-3 rounded-xl border-2 border-black shadow-[3px_3px_0px_#000] active:translate-x-0.5 active:translate-y-0.5 transition-all cursor-pointer"
              >
                💾 변경사항 저장 (LocalStorage)
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
