import type { Route } from "./+types/home";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "XOLOG live app" },
    { name: "description", content: "XOLOG sal was founded to make a mark in Lebanese Freight Forwarding and Shipping industry." },
  ];
}

export async function loader({}: Route.LoaderArgs) {
  return new Response(null, { status: 302, headers: { Location: "/login" } });
}

export default function Home() {
  return null;
}
