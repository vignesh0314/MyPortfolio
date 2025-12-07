import React from 'react';
import { FaPython, FaCode, FaJava, FaJs, FaDatabase, FaReact, FaNodeJs, FaGitAlt } from 'react-icons/fa';
import { SiMongodb, SiDjango, SiExpress, SiMysql, } from 'react-icons/si';
import '../styles/skills.css';

const Skills = () => {
  return (
    <section className="skills" id="skills">
      <h2 className="section-title">Technical Skills</h2>
      <div className="skills-container">

        {/* Languages */}
        <div className="skills-category">
          <h3>Languages</h3>
          <ul>
            <li><FaPython /> Python</li>
            <li><FaCode /> C# </li>
            <li><FaJava /> Java</li>
            <li><FaJs /> JavaScript</li>
            <li><FaDatabase /> SQL</li>
          </ul>
        </div>

        {/* Frameworks & Tools */}
        <div className="skills-category">
          <h3>Frameworks & Tools</h3>
          <ul>
            <li><FaReact /> React.js</li>
            <li><FaNodeJs /> Node.js</li>
            <li><SiExpress /> Express.js</li>
            <li><SiDjango /> Django</li>
            <li><FaGitAlt /> Git</li>
          </ul>
        </div>

        {/* Databases */}
        <div className="skills-category">
          <h3>Databases</h3>
          <ul>
            <li><SiMongodb /> MongoDB</li>
            <li><SiMysql /> MySQL</li>
          </ul>
        </div>

      </div>
    </section>
  );
};

export default Skills;
