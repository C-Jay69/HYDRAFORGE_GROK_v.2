interface BlogCardProps {
  post: {
    id: number;
    title: string;
    excerpt: string;
    date: string;
    category: string;
    readTime: string;
  };
}

export default function BlogCard({ post }: BlogCardProps) {
  return (
    <article className="group rounded-2xl bg-[#2a2a2a] p-6 transition-all hover:scale-105">
      <div className="flex items-center justify-between">
        <span className="rounded-full bg-gray-800 px-3 py-1 text-sm font-medium">
          {post.category}
        </span>
        <span className="text-gray-500">{post.readTime} read</span>
      </div>
      <h3 className="mt-4 text-2xl font-bold group-hover:text-cyan-400">
        {post.title}
      </h3>
      <p className="mt-2 text-gray-400">{post.excerpt}</p>
      <div className="mt-6 flex items-center justify-between">
        <span className="text-gray-500">{post.date}</span>
        <button className="text-cyan-400 hover:text-cyan-300">
          Read More →
        </button>
      </div>
    </article>
  );
}