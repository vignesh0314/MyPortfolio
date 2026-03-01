import {
  SiPython,
  SiJavascript,
  SiPhp,
  SiReact,
  SiNodedotjs,
  SiDjango,
  SiFlask,
  SiExpress,
  SiMysql,
  SiMongodb,
  SiGit,
  SiDotnet,
  SiSupabase,
  SiGithub,
  SiHtml5,
  SiNextdotjs,
  SiTailwindcss,
} from "react-icons/si";

import csharpLogo from "../assets/skills/csharp.svg";
import powerBiLogo from "../assets/skills/powerbi.svg";
import excelLogo from "../assets/skills/excel.png";

export const skills = [
  // 🔹 Languages
  { name: "C#", logo: csharpLogo, category: "Languages", level: 72 },
  { name: "Python", icon: SiPython, category: "Languages", level: 88 },
  { name: "JavaScript", icon: SiJavascript, category: "Languages", level: 85 },
  { name: "HTML", icon: SiHtml5, category: "Languages", level: 90 },
  { name: "PHP", icon: SiPhp, category: "Languages", level: 70 },


  // 🔹 Frameworks
  { name: ".NET", icon: SiDotnet, category: "Frameworks", level: 70 },
  { name: "Next.js", icon: SiNextdotjs, category: "Frameworks", level: 75 },
  { name: "React.js", icon: SiReact, category: "Frameworks", level: 82 },
  { name: "Tailwind CSS", icon: SiTailwindcss, category: "Frameworks", level: 80 },
  { name: "Flask", icon: SiFlask, category: "Frameworks", level: 80 },
  { name: "Node.js", icon: SiNodedotjs, category: "Frameworks", level: 75 },
  { name: "Express.js", icon: SiExpress, category: "Frameworks", level: 73 },
  { name: "Django", icon: SiDjango, category: "Frameworks", level: 70 },



  // 🔹 Databases
  { name: "MySQL", icon: SiMysql, category: "Databases", level: 82 },
  { name: "Supabase", icon: SiSupabase, category: "Databases", level: 72 },
  { name: "MongoDB", icon: SiMongodb, category: "Databases", level: 68 },

  // 🔹 Tools
  { name: "Git", icon: SiGit, category: "Tools", level: 78 },
  { name: "GitHub", icon: SiGithub, category: "Tools", level: 80 },
  { name: "Power BI", logo: powerBiLogo, category: "Tools", level: 75 },
  { name: "Excel", logo: excelLogo, category: "Tools", level: 80 },
];
