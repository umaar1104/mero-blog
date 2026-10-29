export default function About() {
  return (
    <div className="aboutPage">
      <div className="aboutHero">
        <span className="aboutBadge">ABOUT MY BLOG</span>
        <h1>Welcome to MERO BLOG</h1>
        <p>
          MERO BLOG is my personal space where I share my thoughts,
          ideas, experiences, and knowledge.
        </p>
      </div>

      <div className="aboutCards">
        <div className="aboutCard">
          <h2> About Me</h2>
          <p>
            Hi! I'm the creator of MERO BLOG, a student passionate
            about technology, programming, and continuous learning.
          </p>

          <p>
            I'm particularly interested in Computer Science,
            Artificial Intelligence, and web development.
          </p>
        </div>
        <div className="aboutCard">
          <h2> My Mission</h2>
          <p>
            My goal is to keep learning, explore new ideas,
            and share useful information with others.
          </p>
          <p>
            Through MERO BLOG, I want to document my progress
            and share the lessons I learn along the way.
          </p>
        </div>
      </div>
      <div className="aboutTopics">
        <h2>What You'll Find Here</h2>
        <div className="topicCards">
          <div className="topicCard">
            <h3>Technology</h3>
            <p>Programming, AI, and web development.</p>
          </div>
          <div className="topicCard">
            <h3> Education</h3>
            <p>Study tips, learning strategies, and resources.</p>
          </div>

          <div className="topicCard">
            <h3> Personal Growth</h3>
            <p>Productivity, discipline, and self-improvement.</p>
          </div>

          <div className="topicCard">
            <h3> My Journey</h3>
            <p>Projects, experiences, and lessons I've learned.</p>
          </div>
        </div>
      </div>

      <div className="aboutTech">
        <h2>Built With</h2>

        <p>
          MERO BLOG was created using modern web technologies
          as part of my journey to becoming a better developer.
        </p>

        <div className="techList">
          <span>Next.js</span>
          <span>TypeScript</span>
          <span>MongoDB</span>
          <span>CSS</span>
        </div>
      </div>

      <p className="aboutThanks">
        Thanks for visiting MERO BLOG!
      </p>
    </div>
  );
}