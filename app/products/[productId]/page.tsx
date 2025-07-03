import Content from "./Content";

async function ProductDetail({
  params,
}: {
  params: Promise<{ productId: string }>;
}) {
  const { productId } = await params;
  return <Content productId={productId} />;
}

export default ProductDetail;
