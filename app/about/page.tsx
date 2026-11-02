export default function About() {
  return (
    <div className="aboutPage">
      <div className="aboutHero">
        <span className="aboutBadge" style={{backgroundColor: "#334155", padding:"5px 10px", borderRadius:"15px",}}>ABOUT BLOG</span>
      </div>
      <div className="aboutCards">
        <div className="aboutCard">
          <h2>About Me</h2>
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