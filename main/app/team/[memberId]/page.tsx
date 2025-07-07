import React from "react";
import Content from "./Content";

async function MemberProfile({
  params,
}: {
  params: Promise<{ memberId: string }>;
}) {
  const { memberId } = await params;
  return <Content memberId={memberId} />;
}

export default MemberProfile;
