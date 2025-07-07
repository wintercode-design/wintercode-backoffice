import Content from "./Content";

async function ProjectDetail({
  params,
}: {
  params: Promise<{ projectId: string }>;
}) {
  const { projectId } = await params;
  return <Content projectId={projectId} />;
}

export default ProjectDetail;
