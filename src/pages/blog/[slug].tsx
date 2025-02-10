import { GetStaticProps, GetStaticPaths } from 'next'
import Head from 'next/head'
import BlogContent from '@/components/BlogContent'
import { sanityClient, urlFor } from '../../sanity'
import Header from '@/components/Header'
import { fetchSocials } from '../../../utils/fetchSocials'
import { Social } from '../../../typings'

interface Props {
  post: Post
  socials: Social[]
}

interface Post {
  _id: string
  title: string
  slug: {
    current: string
  }
  mainImage: any
  body: any[]
  publishedAt: string
  description?: string
  keywords?: string[]
}

export default function BlogPost({ post, socials }: Props) {
  const canonicalUrl = `https://rizkifajar.dev/blog/${post.slug.current}`
  
  return (
    <div className="bg-[rgb(36,36,36)] text-white min-h-screen">
      <div style={{zoom: "67%", transformOrigin: "top left"}}>
        <Head>
          <title>{post.title} | Rizki's Blog</title>
          <meta name="description" content={post.description || `Read ${post.title} on Rizki's Blog`} />
          <meta name="keywords" content={post.keywords?.join(', ')} />
          <link rel="canonical" href={canonicalUrl} />
          
          {/* Open Graph tags */}
          <meta property="og:title" content={post.title} />
          <meta property="og:description" content={post.description || `Read ${post.title} on Rizki's Blog`} />
          <meta property="og:type" content="article" />
          <meta property="og:url" content={canonicalUrl} />
          {post.mainImage && (
            <meta property="og:image" content={urlFor(post.mainImage).url()} />
          )}
          
          {/* Twitter Card tags */}
          <meta name="twitter:card" content="summary_large_image" />
          <meta name="twitter:title" content={post.title} />
          <meta name="twitter:description" content={post.description || `Read ${post.title} on Rizki's Blog`} />
          {post.mainImage && (
            <meta name="twitter:image" content={urlFor(post.mainImage).url()} />
          )}
          
          {/* Article Schema Markup */}
          <script type="application/ld+json">
            {JSON.stringify({
              "@context": "https://schema.org",
              "@type": "BlogPosting",
              "headline": post.title,
              "image": post.mainImage ? [urlFor(post.mainImage).url()] : [],
              "datePublished": post.publishedAt,
              "dateModified": post.publishedAt,
              "author": {
                "@type": "Person",
                "name": "Rizki Fajar",
                "url": "https://rizkifajar.dev"
              },
              "publisher": {
                "@type": "Person",
                "name": "Rizki Fajar",
                "url": "https://rizkifajar.dev"
              },
              "url": canonicalUrl,
              "description": post.description || `Read ${post.title} on Rizki's Blog`
            })}
          </script>
        </Head>

        <Header socials={socials} />

        <article className="max-w-4xl mx-auto px-4 py-12">
          {post.mainImage && (
            <img
              src={urlFor(post.mainImage).url()}
              alt={post.title}
              className="w-full h-[400px] object-cover rounded-lg mb-8"
            />
          )}
          <h1 className="text-4xl font-bold mb-4">{post.title}</h1>
          <div className="text-gray-400 mb-8">
            {new Date(post.publishedAt).toLocaleDateString()}
          </div>
          <BlogContent content={post.body} />
        </article>
      </div>
    </div>
  )
}

export const getStaticPaths: GetStaticPaths = async () => {
  const posts = await sanityClient.fetch(`
    *[_type == "blog"] {
      slug {
        current
      }
    }
  `)

  const paths = posts.map((post: any) => ({
    params: { slug: post.slug.current }
  }))

  return {
    paths,
    fallback: 'blocking'
  }
}

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const post = await sanityClient.fetch(`
    *[_type == "blog" && slug.current == $slug][0] {
      _id,
      title,
      slug,
      mainImage,
      body,
      publishedAt,
      description,
      keywords
    }
  `, { slug: params?.slug })

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
    revalidate: 60 // Revalidate every 60 seconds
  }
}