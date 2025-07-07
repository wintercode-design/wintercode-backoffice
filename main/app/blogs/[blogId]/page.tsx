import Content from "./Content";

async function BlogDetail({ params }: { params: Promise<{ blogId: string }> }) {
  const { blogId } = await params;
  return <Content blogId={blogId} />;
}

export default BlogDetail;
