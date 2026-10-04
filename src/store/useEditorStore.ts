import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { ProfileData, LinkCard, TechStack, BioSection, ThemeConfig } from '@/types/profile';
import { mockLinks } from '@/data/mockLinks';

export const initialProfileData: ProfileData = {
  username: 'shinpower1',
  name: '신채규',
  englishName: 'Chae Gyu Shin',
  githubUsername: 'shinpower1',
  email: 'contact@example.com',
  avatarUrl: 'https://avatars.githubusercontent.com/u/327406319?v=4',
  role: 'Full-Stack Software Engineer',
  status: '오픈소스 & 협업 기회 환영 🚀',
  headline: '복잡한 비즈니스 문제를 견고한 아키텍처와 엔지니어링으로 해결합니다.',
  themeConfig: {
    theme: 'brutalism',
    accentColor: '#0066cc',
    mode: 'system',
  },
  bioSections: [
    {
      label: 'Frontend',
      color: 'bg-[#67E8F9]',
      desc: 'React 19 & Next.js 16 기반의 고성능 렌더링 최적화 및 직관적인 UX 설계',
    },
    {
      label: 'Backend',
      color: 'bg-[#86EFAC]',
      desc: '안정적인 API 아키텍처 설계와 견고한 데이터 모델링',
    },
    {
      label: 'Mindset',
      color: 'bg-[#FDBA74]',
      desc: '유지보수하기 쉬운 클린 코드와 지속 가능한 개발 문화를 지향합니다.',
    },
  ],
  techStack: [
    { name: 'TypeScript', color: 'bg-[#93C5FD]' },
    { name: 'React', color: 'bg-[#67E8F9]' },
    { name: 'Next.js', color: 'bg-[#E2E8F0]' },
    { name: 'Tailwind CSS', color: 'bg-[#5EEAD4]' },
    { name: 'Node.js', color: 'bg-[#86EFAC]' },
    { name: 'PostgreSQL', color: 'bg-[#DDD6FE]' },
    { name: 'Git', color: 'bg-[#FED7AA]' },
  ],
  links: mockLinks,
};

export interface EditorStore {
  profile: ProfileData;
  isDirty: boolean;
  previewDevice: 'mobile' | 'desktop';

  // Profile Actions
  setProfileField: <K extends keyof ProfileData>(key: K, value: ProfileData[K]) => void;
  updateProfile: (data: Partial<ProfileData>) => void;
  
  // Link Actions
  addLink: (link: Omit<LinkCard, 'id' | 'orderIndex'>) => void;
  updateLink: (id: string, updated: Partial<LinkCard>) => void;
  removeLink: (id: string) => void;
  reorderLinks: (fromIndex: number, toIndex: number) => void;
  toggleLinkActive: (id: string) => void;

  // Tech Stack Actions
  addTechStack: (tech: TechStack) => void;
  removeTechStack: (name: string) => void;

  // Bio Section Actions
  addBioSection: (section: BioSection) => void;
  removeBioSection: (index: number) => void;

  // Theme Actions
  updateTheme: (theme: Partial<ThemeConfig>) => void;

  // UI Actions
  setPreviewDevice: (device: 'mobile' | 'desktop') => void;
  resetDirty: () => void;
  initProfile: (data: ProfileData) => void;
  resetToDefault: () => void;
}

export const useEditorStore = create<EditorStore>()(
  persist(
    (set) => ({
      profile: initialProfileData,
      isDirty: false,
      previewDevice: 'mobile',

      setProfileField: (key, value) =>
        set((state) => ({
          profile: { ...state.profile, [key]: value },
          isDirty: true,
        })),

      updateProfile: (data) =>
        set((state) => ({
          profile: { ...state.profile, ...data },
          isDirty: true,
        })),

      addLink: (link) =>
        set((state) => {
          const newLink: LinkCard = {
            ...link,
            id: `link-${Date.now()}`,
            orderIndex: state.profile.links.length,
            isActive: link.isActive ?? true,
          };
          return {
            profile: {
              ...state.profile,
              links: [...state.profile.links, newLink],
            },
            isDirty: true,
          };
        }),

      updateLink: (id, updated) =>
        set((state) => ({
          profile: {
            ...state.profile,
            links: state.profile.links.map((link) =>
              link.id === id ? { ...link, ...updated } : link
            ),
          },
          isDirty: true,
        })),

      removeLink: (id) =>
        set((state) => ({
          profile: {
            ...state.profile,
            links: state.profile.links.filter((link) => link.id !== id),
          },
          isDirty: true,
        })),

      reorderLinks: (fromIndex, toIndex) =>
        set((state) => {
          const items = Array.from(state.profile.links);
          const [movedItem] = items.splice(fromIndex, 1);
          items.splice(toIndex, 0, movedItem);
          const updatedLinks = items.map((item, index) => ({
            ...item,
            orderIndex: index,
          }));
          return {
            profile: { ...state.profile, links: updatedLinks },
            isDirty: true,
          };
        }),

      toggleLinkActive: (id) =>
        set((state) => ({
          profile: {
            ...state.profile,
            links: state.profile.links.map((link) =>
              link.id === id ? { ...link, isActive: !link.isActive } : link
            ),
          },
          isDirty: true,
        })),

      addTechStack: (tech) =>
        set((state) => ({
          profile: {
            ...state.profile,
            techStack: [...state.profile.techStack, tech],
          },
          isDirty: true,
        })),

      removeTechStack: (name) =>
        set((state) => ({
          profile: {
            ...state.profile,
            techStack: state.profile.techStack.filter((t) => t.name !== name),
          },
          isDirty: true,
        })),

      addBioSection: (section) =>
        set((state) => ({
          profile: {
            ...state.profile,
            bioSections: [...state.profile.bioSections, section],
          },
          isDirty: true,
        })),

      removeBioSection: (index) =>
        set((state) => ({
          profile: {
            ...state.profile,
            bioSections: state.profile.bioSections.filter((_, i) => i !== index),
          },
          isDirty: true,
        })),

      updateTheme: (theme) =>
        set((state) => ({
          profile: {
            ...state.profile,
            themeConfig: { ...state.profile.themeConfig, ...theme },
          },
          isDirty: true,
        })),

      setPreviewDevice: (device) => set({ previewDevice: device }),
      resetDirty: () => set({ isDirty: false }),
      initProfile: (data) => set({ profile: data, isDirty: false }),
      resetToDefault: () =>
        set({
          profile: initialProfileData,
          isDirty: false,
        }),
    }),
    {
      name: 'mylink_profile_storage',
      partialize: (state) => ({
        profile: state.profile,
      }),
    }
  )
);
