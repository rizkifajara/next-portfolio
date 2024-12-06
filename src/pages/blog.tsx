import { GetServerSideProps } from 'next'
import Head from 'next/head'
import Link from 'next/link'
import Header from "@/components/Header"
import { sanityClient, urlFor } from '../sanity'
import { Social } from "../../typings"
import { fetchSocials } from "../../utils/fetchSocials"
import { ChevronDoubleUpIcon } from "@heroicons/react/24/outline"

interface Post {
  _id: string
  title: string
  slug: {
    current: string
  }
  mainImage: {
    asset: {
      _ref: string
    }
  }
  publishedAt: string
}

interface Props {
  posts: Post[]
  socials: Social[]
}

export default function Blog({ posts, socials }: Props) {
  return (
    <div
      className="bg-[rgb(36,36,36)] text-white snap-y snap-mandatory overflow-y-scroll z-0
    overflow-x-hidden scrollbar scrollbar-track-gray-400/20 scrollbar-thumb-[#F7AB0A]/80"
      style={{ height: "100vh" }}
    >
      <div style={{zoom: "67%", transformOrigin: "top left"}}>
        <Head>
          <title>Rizki's Blog</title>
          <meta name="description" content="Rizki's personal blog" />
          <meta name="viewport" content="width=device-width, initial-scale=1" />
          <link rel="icon" href="/favicon.ico" />
        </Head>

        <Header socials={socials} />

        <section id="blog" className="snap-start">
          <div className="min-h-screen flex relative flex-col text-center md:text-left max-w-7xl px-10 justify-evenly mx-auto items-center">
            <h3 className="absolute top-24 uppercase tracking-[20px] text-gray-500 text-2xl">
              Blog
            </h3>

            <div className="w-full absolute top-[20%] left-0 h-[600px] -skew-y-12 overflow-hidden">
              <svg className="absolute w-full h-full" viewBox="0 0 100 100" preserveAspectRatio="none">
                <defs>
                  <linearGradient id="grad1" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" style={{ stopColor: '#F7AB0A', stopOpacity: 0.1 }} />
                    <stop offset="100%" style={{ stopColor: '#F7AB0A', stopOpacity: 0.05 }} />
                  </linearGradient>
                </defs>
                <path d="M0,0 L100,0 L100,100 Q75,90 50,100 Q25,110 0,100 Z" fill="url(#grad1)" />
                <path className="wave" d="M0,100 Q25,90 50,100 Q75,110 100,100 L100,100 L0,100 Z" fill="#F7AB0A" fillOpacity="0.05" />
                <path className="wave" d="M0,100 Q25,80 50,100 Q75,120 100,100 L100,100 L0,100 Z" fill="#F7AB0A" fillOpacity="0.05" />
              </svg>
            </div>

            <div className="relative top-36 max-w-7xl mx-auto px-5 sm:px-6 lg:px-8">
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {posts.map((post) => (
                  <Link key={post._id} href={`/blog/${post.slug.current}`}>
                    <article className="flex flex-col rounded-lg overflow-hidden shadow-lg bg-[#292929] hover:bg-[#3d3d3d] transition-colors duration-200 cursor-pointer h-full">
                      {post.mainImage && (
                        <img
                          src={urlFor(post.mainImage).width(500).height(300).url()}
                          alt={post.title}
                          className="w-full h-48 object-cover"
                        />
                      )}
                      <div className="p-6 flex flex-col flex-grow">
                        <h4 className="text-xl font-semibold mb-2 line-clamp-2">{post.title}</h4>
                        <p className="text-gray-400 text-sm mt-auto">
                          {new Date(post.publishedAt).toLocaleDateString()}
                        </p>
                      </div>
                    </article>
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </section>

        <Link href="#blog">
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
  )
}

export const getServerSideProps: GetServerSideProps = async () => {
  const posts = await sanityClient.fetch(`
    *[_type == "blog"] | order(publishedAt desc) {
      _id,
      title,
      slug,
      mainImage,
      publishedAt
    }
  `)

  const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/getSocials`)
  const data = await res.json()
  const socials: Social[] = data.socials

  return {
    props: {
      posts,
      socials,
    },
  }
}