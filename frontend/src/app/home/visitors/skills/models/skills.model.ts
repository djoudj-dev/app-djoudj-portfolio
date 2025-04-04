export interface Skill {
  name: string;
  icon: string;
  iconWidth?: number;
  iconHeight?: number;
}

export interface SkillCategory {
  title: string;
  description: string;
  skills: Skill[];
  icon: string;
}

export interface SkillsData {
  categories: SkillCategory[];
}
