export interface AppSettings {
  girlName: string;
  boyName: string;
  startDate: string; // YYYY-MM-DD
  musicEnabled: boolean;
  musicVolume: number;
}

export interface ChapterInfo {
  id: number;
  title: string;
  subtitle: string;
  theme: string;
}

export interface MemoryPoint {
  id: number;
  title: string;
  description: string;
  iconName: string;
  color: string;
}
