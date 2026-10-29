import { parseStandardSchema } from "better-auth/react";
import Image from "next/image";
import Link from "next/link";
export default function Home(){
  return(
     <main className="home">

      <section className="hero">

        <div className="badge">
          Welcome to MERO BLOG
        </div>

        <h1>
          Discover Ideas.
          <br />
          <span>Share Your Stories.</span>
        </h1>

        <p>
          A place where creativity meets technology.
          Explore interesting articles, learn something
          new and share your thoughts with the world.
        </p>

        <div className="heroButtons">
          <Link href="/blogs" className="mainButton">
            Explore Blogs →
          </Link>

          <Link href="/post" className="secondButton">
            Create a Post
          </Link>
        </div>

      </section>

      <section className="features">
        <div className="featureCard">
          <h2>Explore Articles</h2>
          <p>
            Discover interesting stories and useful
            information about different topics.
          </p>
        </div>

        <div className="featureCard">
          <h2>Share Your Ideas</h2>
          <p>
            Write your own articles and share
            your knowledge with others.
          </p>
        </div>

        <div className="featureCard">
          <h2>Keep Learning</h2>
          <p>
            Learn new things, improve your skills
            and explore the world of technology.
          </p>
        </div>
      </section>
    </main>
  )
}
