import { Link } from "react-router-dom";
import type { CMSPageSection } from "@/lib/cms/types";

type SectionPayload = {
  heading?: string;
  body?: string;
  bullets?: string[];
  ctaLabel?: string;
  ctaLink?: string;
};

const getPayload = (section: CMSPageSection): SectionPayload => {
  if (section.content_json && typeof section.content_json === "object" && !Array.isArray(section.content_json)) {
    return section.content_json as SectionPayload;
  }
  return {};
};

const CmsPageRenderer = ({
  title,
  sections,
}: {
  title: string;
  sections: CMSPageSection[];
}) => (
  <div className="min-h-screen pt-20 pb-16">
    <div className="container mx-auto px-4 lg:px-8 max-w-5xl">
      <h1 className="text-4xl md:text-6xl font-heading font-bold mb-12">{title}</h1>
      <div className="space-y-8">
        {sections.map((section) => {
          const payload = getPayload(section);
          return (
            <section key={section.id} className="bg-card border border-border rounded-2xl p-7 md:p-9">
              <h2 className="text-2xl font-heading font-semibold mb-3">
                {payload.heading || section.title}
              </h2>
              {payload.body ? <p className="text-muted-foreground leading-7 mb-4">{payload.body}</p> : null}
              {payload.bullets?.length ? (
                <ul className="list-disc pl-6 space-y-2 text-muted-foreground">
                  {payload.bullets.map((point) => (
                    <li key={point}>{point}</li>
                  ))}
                </ul>
              ) : null}
              {payload.ctaLabel && payload.ctaLink ? (
                <Link
                  to={payload.ctaLink}
                  className="mt-5 inline-block bg-gradient-primary text-accent-foreground px-5 py-2.5 rounded-lg text-sm font-semibold"
                >
                  {payload.ctaLabel}
                </Link>
              ) : null}
            </section>
          );
        })}
      </div>
    </div>
  </div>
);

export default CmsPageRenderer;
