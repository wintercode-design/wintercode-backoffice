import Content from "./Content";

async function EventDetail({
  params,
}: {
  params: Promise<{ eventId: string }>;
}) {
  const { eventId } = await params;
  return <Content eventId={eventId} />;
}

export default EventDetail;
