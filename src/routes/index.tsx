import { createFileRoute } from "@tanstack/react-router";
import { Nav } from "@/components/site/Nav";
import { Hero } from "@/components/site/Hero";
import { Why } from "@/components/site/Why";
import { Services } from "@/components/site/Services";
import { VideoEditing } from "@/components/site/VideoEditing";
import { Stats } from "@/components/site/Stats";
import { Process } from "@/components/site/Process";
import { Work } from "@/components/site/Work";
import { Contact } from "@/components/site/Contact";

const title = "0xStudio — Design, Engineering & Video Studio";
const description =
  "0xStudio designs and builds web & mobile apps, award-class websites and high-retention video & motion reels. One team, fixed scope, shipped in weeks.";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title },
      { name: "description", content: description },
      { property: "og:title", content: title },
      { property: "og:description", content: description },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Index,
});

function Index() {
  return (
    <main className="bg-background">
      <Nav />
      <Hero />
      <Why />
      <Services />
      <VideoEditing />
      <Stats />
      <Process />
      <Work />
      <Contact />
    </main>
  );
}
