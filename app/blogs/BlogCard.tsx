import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Blog } from "@/types/types";
import { Calendar, Edit, Trash2, User } from "lucide-react";
import Link from "next/link";

const BlogCard = ({
  blog,
  onEdit,
  onDelete,
}: {
  blog: Blog;
  onEdit: (blog: Blog) => void;
  onDelete: (id: number) => void;
}) => {
  const formatDate = (dateString: string) =>
    new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });

  return (
    <Card className="glass-effect border-white/20 card-hover h-full flex flex-col">
      <CardHeader>
        <CardTitle className="text-white text-lg hover:text-cyan-400 transition-colors">
          <Link href={`/blogs/${blog.id}`}>{blog.title}</Link>
        </CardTitle>
        <div className="flex items-center text-xs text-gray-400 gap-4 pt-1">
          <span className="flex items-center gap-1">
            <User className="h-3 w-3" /> {blog.author}
          </span>
          <span className="flex items-center gap-1">
            <Calendar className="h-3 w-3" /> {formatDate(blog.publishedDate)}
          </span>
        </div>
      </CardHeader>
      <CardContent className="flex-grow flex flex-col justify-between">
        <div>
          <p className="text-gray-300 text-sm mb-4 line-clamp-3">
            {blog.content}
          </p>
          <div className="flex items-center gap-2 flex-wrap mb-4">
            <span className="px-2 py-1 bg-cyan-500/20 text-cyan-300 text-xs rounded-full">
              {blog.category}
            </span>
            <span
              className={`px-2 py-1 text-xs rounded-full ${
                blog.status === "PUBLISHED"
                  ? "bg-green-500/20 text-green-300"
                  : "bg-yellow-500/20 text-yellow-300"
              }`}
            >
              {blog.status}
            </span>
          </div>
        </div>
        <div className="flex justify-end gap-2">
          <Button size="sm" variant="ghost" onClick={() => onEdit(blog)}>
            <Edit className="h-4 w-4" />
          </Button>
          <Button size="sm" variant="ghost" onClick={() => onDelete(blog.id)}>
            <Trash2 className="h-4 w-4" />
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default BlogCard;
