import { GetStaticPaths, GetStaticProps } from 'next'
import Head from 'next/head'
import Header from "@/components/Header"
import { sanityClient } from "../sanity"
import BlogContent from "@/components/BlogContent"
import { Social } from "../../typings"
import { fetchSocials } from "../../utils/fetchSocials"
import Link from 'next/link'
import { ChevronDoubleUpIcon } from "@heroicons/react/24/outline"

interface Props {
  post: {
    _id: string
    title: string
    mainImage: {
      asset: {
        _ref: string
      }
    }
    body: any[]
    publishedAt: string
  }
  socials: Social[]
}

export default function BlogPost({ post, socials }: Props) {
  if (!post) return null;

  return (
    <div
      className="bg-light-bg dark:bg-dark-bg text-light-text dark:text-white h-screen 
      snap-y snap-mandatory overflow-y-scroll z-0 overflow-x-hidden 
      scrollbar scrollbar-track-gray-400/20 scrollbar-thumb-[#F7AB0A]/80"
    >
      <div style={{zoom: "67%", transformOrigin: "top left"}}>
        <Head>
          <title>{post.title} - Rizki's Blog</title>
          <meta name="description" content={post.title} />
          <meta name="viewport" content="width=device-width, initial-scale=1" />
          <link rel="icon" href="/favicon.ico" />
        </Head>

        <Header socials={socials} />

        <article className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
          <h1 className="text-4xl font-bold mb-4">{post.title}</h1>
          <p className="text-gray-600 dark:text-gray-400 mb-8">
            {new Date(post.publishedAt).toLocaleDateString()}
          </p>
          <BlogContent content={post.body} />
        </article>

        <Link href="/#blog">
          <footer className="sticky bottom-5 w-full cursor-pointer">
            <div className="flex items-center justify-center">
              <ChevronDoubleUpIcon
                className="h-10 w-10 rounded-full filter grayscale hover:grayscale-0 cursor-pointer"
              />
            </div>
          </footer>
        </Link>
      </div>
    </div>
  )
}

export const getStaticPaths: GetStaticPaths = async () => {
  const query = `*[_type == "blog"] {
    slug {
      current
    }
  }`

  const posts = await sanityClient.fetch(query)
  const paths = posts.map((post: any) => ({
    params: {
      slug: post.slug.current
    }
  }))

  return {
    paths,
    fallback: 'blocking'
  }
}

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const query = `*[_type == "blog" && slug.current == $slug][0] {
    _id,
    title,
    mainImage,
    body,
    publishedAt
  }`

  const post = await sanityClient.fetch(query, {
    slug: params?.slug
  })

  const socials = await fetchSocials()

  if (!post) {
    return {
      notFound: true
    }
  }

  return {
    props: {
      post,
      socials
    },
    revalidate: 3600
  }
}
