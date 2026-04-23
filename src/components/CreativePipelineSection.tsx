import { useEffect } from "react";

const CreativePipelineSection = () => {
  useEffect(() => {
    const script = document.createElement("script");
    script.id = "EmbedSocialHashtagScript";
    script.src = "https://embedsocial.com/cdn/ht.js";

    if (!document.getElementById("EmbedSocialHashtagScript")) {
      document.head.appendChild(script);
    }
  }, []);

  return (
    <section className="section-spacing">
      <div className="px-6 md:px-12 lg:px-20">
        <p className="label-style text-champagne mb-4">STUDIO FEED</p>
        <p className="text-soft text-lg md:text-xl mb-10">
          From concept to screen — what's moving through the studio right now.
        </p>
      </div>

      <div className="px-6 md:px-12 lg:px-20">
        <div className="embedsocial-hashtag" data-ref="cfbc2fcc7de86a91675a9e1906653c7eec3c0fa0">
          <a
            className="feed-powered-by-es feed-powered-by-es-feed-img es-widget-branding"
            href="https://embedsocial.com/instagram-widget/"
            target="_blank"
            title="Instagram widget"
            rel="noopener noreferrer"
          >
            <img src="https://embedsocial.com/cdn/icon/embedsocial-logo.webp" alt="EmbedSocial" />
            <div className="es-widget-branding-text">Instagram widget</div>
          </a>
        </div>
      </div>

      <div className="px-6 md:px-12 lg:px-20 mt-8">
        <a
          href="https://www.instagram.com/lolalabstudio/"
          target="_blank"
          rel="noopener noreferrer"
          className="label-style text-champagne transition-opacity hover:opacity-80"
        >
          Follow @lolalabstudio
        </a>
      </div>
    </section>
  );
};

export default CreativePipelineSection;