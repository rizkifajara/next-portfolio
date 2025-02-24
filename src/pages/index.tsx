import Head from "next/head";
import Header from "@/components/Header";
import Hero from "@/components/Hero";
import About from "@/components/About";
import WorkExperience from "@/components/WorkExperience";
import Skills from "@/components/Skills";
import Projects from "@/components/Projects";
import ContactMe from "@/components/ContactMe";
import Link from "next/link";
import { ChevronDoubleUpIcon } from "@heroicons/react/24/outline";
import { PageInfo, Experience, Skill, Project, Social } from "../../typings";
import { fetchPageInfo } from "../../utils/fetchPageInfo";
import { fetchSkills } from "../../utils/fetchSkills";
import { fetchExperience } from "../../utils/fetchExperience";
import { fetchProjects } from "../../utils/fetchProjects";
import { fetchSocials } from "../../utils/fetchSocials";
// import { GetServerSideProps, GetStaticProps } from 'next/types'
import "react-tooltip/dist/react-tooltip.css";

type Props = {
  pageInfo: PageInfo;
  experiences: Experience[];
  skills: Skill[];
  projects: Project[];
  socials: Social[];
};

export async function getStaticProps() {
  try {
    const [pageInfoRes, skillsRes, experiencesRes, projectsRes, socialsRes] = 
      await Promise.all([
        fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/getPageInfo`),
        fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/getSkills`),
        fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/getExperience`),
        fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/getProjects`),
        fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/getSocials`),
      ]);

    const [
      { pageInfo },
      { skills },
      { experiences },
      { projects },
      { socials },
    ] = await Promise.all([
      pageInfoRes.json(),
      skillsRes.json(),
      experiencesRes.json(),
      projectsRes.json(),
      socialsRes.json(),
    ]);

    return {
      props: {
        pageInfo,
        skills,
        experiences,
        projects,
        socials,
      },
      revalidate: 3600, // Revalidate every hour
    };
  } catch (error) {
    console.error('Error in getStaticProps:', error);
    return {
      props: {
        pageInfo: null,
        skills: [],
        experiences: [],
        projects: [],
        socials: [],
      },
      revalidate: 60, // Retry sooner if there was an error
    };
  }
}

export default function Home({
  pageInfo,
  experiences,
  skills,
  projects,
  socials,
}: Props) {
  return (
    <div
      className="bg-light-bg dark:bg-dark-bg text-light-text dark:text-white 
      snap-y snap-mandatory overflow-y-scroll z-0 overflow-x-hidden 
      scrollbar scrollbar-track-gray-400/20 scrollbar-thumb-[#F7AB0A]/80"
      style={{ height: "100vh" }}
    >
      <div style={{zoom: "67%", transformOrigin: "top left"}}>
      <Head>
        <title>Rizki Fajar - Software Engineer Portfolio</title>
        <meta name="description" content="Rizki Fajar's personal portfolio website showcasing software engineering projects, skills, and professional experience." />
        <meta name="keywords" content="Rizki Fajar, Software Engineer, Web Developer, Portfolio, Backend Engineer, AI Engineer, Full Stack Developer" />
        <meta name="author" content="Rizki Fajar" />
        <meta property="og:title" content="Rizki Fajar - Software Engineer Portfolio" />
        <meta property="og:description" content="Rizki Fajar's personal portfolio website showcasing software engineering projects, skills, and professional experience." />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://rizkifajar.dev" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Header socials={socials} />

      <section id="hero" className="snap-start">
        <Hero pageInfo={pageInfo} />
      </section>

      <section id="about" className="snap-center">
        <About pageInfo={pageInfo} />
      </section>

      <section id="experience" className="snap-center">
        <WorkExperience experiences={experiences} />
      </section>

      <section id="skills" className="snap-start">
        <Skills skills={skills} />
      </section>

      <section id="projects" className="snap-start">
        <Projects projects={projects} />
      </section>

      <section id="contactme" className="snap-center">
        <ContactMe pageInfo={pageInfo} />
      </section>

      <Link href="#hero">
        <footer className="sticky bottom-5 w-full cursor-pointer">
          <div className="flex items-center justify-center">
            <ChevronDoubleUpIcon
              className="h-10 w-10 rounded-full filter grayscale
            hover:grayscale-0 cursor-pointer"
            />
          </div>
        </footer>
      </Link>
      </div>
    </div>
  );
}
