import Content from "./Content";

async function QuoteDetail({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  return <Content quoteId={id} />;
}

export default QuoteDetail;
