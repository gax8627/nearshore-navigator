import { notFound } from "next/navigation";
import { BlogPost } from "@/components/BlogPost";
import { getAllPosts, getPostBySlug } from "@/app/constants/blog-data";
import { Metadata } from "next";

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const post = getPostBySlug(slug);
  
  if (!post) {
    return {
      title: "Post Not Found",
    };
  }

  return {
    title: post.title,
    description: post.excerpt,
    openGraph: {
      title: post.title,
      description: post.excerpt,
      type: "article",
      images: [
        {
          url: post.imageUrl,
          width: 1200,
          height: 630,
          alt: post.title,
        },
      ],
    },
  };
}

export default async function BlogPostPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  let post = getPostBySlug(slug);

  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000'}/api/posts/${slug}`, {
      next: { revalidate: 60 },
    });
    
    if (res.ok) {
      const data = await res.json();
        if (data.post) {
          post = {
            ...data.post,
            tags: typeof data.post.tags === 'string' ? JSON.parse(data.post.tags) : data.post.tags
          };
        }
    }
  } catch (error) {
    console.warn(`Failed to fetch post ${slug} from API, using fallback.`);
  }

  if (!post) {
    notFound();
  }

  return <BlogPost post={post} />;
}

export async function generateStaticParams() {
  const posts = getAllPosts();
  return posts.map((post) => ({
    slug: post.slug,
  }));
}
