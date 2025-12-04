import React from "react";
import { Button } from "@/components/ui/button";
import { ExternalLink, Share2, TrendingUp, Code2 } from "lucide-react";

const InfoSection = () => {
  return (
    <section className="mt-6 max-w-screen-xl mx-auto mb-20 animate-fade-in">
      <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br border border-white/10 shadow-2xl">
        {/* Animated gradient background */}
        
        {/* Decorative elements */}
        <div className="absolute top-0 right-0 w-96 h-96 bg-blue-500/20 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2"></div>
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-purple-500/20 rounded-full blur-3xl translate-y-1/2 -translate-x-1/2"></div>

        <div className="relative z-10 p-8 md:p-12">
          <div className="text-center mb-12">
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-gradient-to-br from-blue-500 to-purple-600 mb-4 shadow-lg">
              <Share2 className="h-8 w-8 text-white" />
            </div>
            <h2 className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
              What are OG Images?
            </h2>
            <p className="text-slate-400 mt-3 max-w-2xl mx-auto">
              Elevate your social media presence with stunning visual previews
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-10">
            {/* Left Column */}
            <div className="space-y-8">
              <div className="group hover:translate-x-1 transition-transform duration-300">
                <div className="flex items-start gap-3 mb-3">
                  <div className="mt-1 p-2 rounded-lg bg-blue-500/20 group-hover:bg-blue-500/30 transition-colors">
                    <TrendingUp className="h-5 w-5 text-blue-400" />
                  </div>
                  <h3 className="text-xl font-semibold text-transparent bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text">
                    The Power of Open Graph
                  </h3>
                </div>
                <p className="text-slate-300 leading-relaxed ml-11">
                  Open Graph (OG) images are the visual previews that appear when
                  your content is shared on social media platforms. They
                  significantly increase engagement, click-through rates, and share
                  counts by providing a visual representation of your content.
                </p>
              </div>

              <div className="group hover:translate-x-1 transition-transform duration-300">
                <div className="flex items-start gap-3 mb-3">
                  <div className="mt-1 p-2 rounded-lg bg-purple-500/20 group-hover:bg-purple-500/30 transition-colors">
                    <Share2 className="h-5 w-5 text-purple-400" />
                  </div>
                  <h3 className="text-xl font-semibold text-transparent bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text">
                    Where OG Images Appear
                  </h3>
                </div>
                <ul className="space-y-3 ml-11">
                  {[
                    "Social media feeds (Twitter/X, Facebook, LinkedIn)",
                    "Messaging apps like Discord, Slack, and WhatsApp",
                    "Search engine results with rich snippets",
                    "Link preview cards in various applications"
                  ].map((item, index) => (
                    <li key={index} className="flex items-start gap-3 text-slate-300 group/item hover:text-white transition-colors">
                      <span className="mt-1.5 h-1.5 w-1.5 rounded-full bg-gradient-to-r from-purple-400 to-pink-400 group-hover/item:scale-150 transition-transform"></span>
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* Right Column */}
            <div className="space-y-8">
              <div className="group hover:translate-x-1 transition-transform duration-300">
                <div className="flex items-start gap-3 mb-3">
                  <div className="mt-1 p-2 rounded-lg bg-cyan-500/20 group-hover:bg-cyan-500/30 transition-colors">
                    <Code2 className="h-5 w-5 text-cyan-400" />
                  </div>
                  <h3 className="text-xl font-semibold text-transparent bg-gradient-to-r from-cyan-400 to-blue-400 bg-clip-text">
                    How to Use OG Images
                  </h3>
                </div>
                <p className="text-slate-300 leading-relaxed ml-11 mb-4">
                  Add the following meta tags to your HTML{" "}
                  <code className="px-2 py-1 rounded bg-slate-800/80 text-cyan-400 text-xs border border-cyan-500/30">
                    &lt;head&gt;
                  </code>{" "}
                  section:
                </p>

                <div className="ml-11 relative group/code">
                  <div className="absolute inset-0 bg-gradient-to-r from-blue-500/20 to-purple-500/20 rounded-lg blur opacity-0 group-hover/code:opacity-100 transition-opacity"></div>
                  <div className="relative bg-slate-950/80 backdrop-blur-sm p-5 rounded-lg overflow-x-auto border border-slate-700/50 shadow-lg">
                    <pre className="text-xs md:text-sm text-slate-300 font-mono">
                      {`<meta property="og:image" 
      content="https://yourdomain.com/og.png" />
<meta property="og:image:width" 
      content="1200" />
<meta property="og:image:height" 
      content="630" />
<meta property="og:title" 
      content="Your Page Title" />
<meta property="og:description" 
      content="Your description" />`}
                    </pre>
                  </div>
                </div>
              </div>

              <div className="group hover:translate-x-1 transition-transform duration-300">
                <div className="flex items-start gap-3 mb-3">
                  <div className="mt-1 p-2 rounded-lg bg-pink-500/20 group-hover:bg-pink-500/30 transition-colors">
                    <TrendingUp className="h-5 w-5 text-pink-400" />
                  </div>
                  <h3 className="text-xl font-semibold text-transparent bg-gradient-to-r from-pink-400 to-rose-400 bg-clip-text">
                    Why They Matter
                  </h3>
                </div>
                <p className="text-slate-300 leading-relaxed ml-11">
                  Content with compelling OG images receives up to{" "}
                  <span className="font-bold text-transparent bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text">
                    40% more engagement
                  </span>{" "}
                  than content without. They create a professional impression and
                  help your content stand out in crowded social feeds.
                </p>
              </div>
            </div>
          </div>

          <div className="text-center pt-6 border-t border-white/10">
            <a href="https://kaydee.net/blog/open-graph-image/" target="_blank" rel="noopener noreferrer">
              <Button className="group relative overflow-hidden bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-500 hover:to-purple-500 text-white font-semibold px-8 py-6 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105">
                <span className="absolute inset-0 bg-gradient-to-r from-white/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></span>
                <ExternalLink className="h-5 w-5 mr-2 inline group-hover:rotate-12 transition-transform" />
                Learn More About Open Graph
              </Button>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};

export default InfoSection;