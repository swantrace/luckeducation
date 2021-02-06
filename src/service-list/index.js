import { html, component, useState, useEffect } from "haunted";

function ServiceList() {
  const [services, setServices] = useState([]);
  useEffect(async () => {
    const rawServices = await fetch(
      "https://www.luckeducation.com/wp-json/wp/v2/service"
    ).then((response) => response.json());

    const featuredImagePromises = rawServices
      .map((service) => ({
        id: service.id,
        featured_media: service.featured_media,
      }))
      .filter(({ featured_media }) => featured_media)
      .map(({ id, featured_media }) => {
        return new Promise((resolve, reject) => {
          fetch(
            `https://www.luckeducation.com/wp-json/wp/v2/media/${featured_media}`
          )
            .then((response) => response.json())
            .then((featured_media_info) => {
              resolve({ id, imageUrl: featured_media_info.source_url });
            });
        });
      });

    const featuredImages = await Promise.all(featuredImagePromises);

    const services = featuredImages.map(({ id, imageUrl }) => {
      const rawService = rawServices.find(({ id: rawId }) => id === rawId);
      return {
        id,
        imageUrl,
        title: rawService.title.rendered,
        link: rawService.link,
        slug: rawService.slug,
      };
    });

    setServices(services);
  }, []);
  return html`<div class="gallery-wrapper raw no-gutters">
      ${services.map(
        (service) =>
          html`<div
            class="gallery-item service-${service.slug} col-xs-12 col-sm-6 col-md-4"
          >
            <div class="hovereffect">
              <a href=${service.link}><img src=${service.imageUrl} /></a>
              <div class="overlay">
                <a href=${service.link}><h2>${service.title}</h2></a>
              </div>
            </div>
          </div>`
      )}
    </div>
    <style>
      .no-gutters > [class*="col-"] {
        padding-right: 0;
        padding-left: 0;
      }
      .hovereffect {
        width: 100%;
        height: 100%;
        float: left;
        overflow: hidden;
        position: relative;
        text-align: center;
        cursor: default;
        background: -webkit-linear-gradient(45deg, #ff89e9 0%, #05abe0 100%);
        background: linear-gradient(45deg, #ff89e9 0%, #05abe0 100%);
      }
      .hovereffect .overlay {
        width: 100%;
        height: 100%;
        position: absolute;
        overflow: hidden;
        top: 0;
        left: 0;
        padding: 3em;
        text-align: left;
      }
      .hovereffect img {
        display: block;
        position: relative;
        max-width: none;
        width: calc(100% + 60px);
        -webkit-transition: opacity 0.35s, -webkit-transform 0.45s;
        transition: opacity 0.35s, transform 0.45s;
        -webkit-transform: translate3d(-40px, 0, 0);
        transform: translate3d(-40px, 0, 0);
      }
      .hovereffect h2 {
        text-transform: uppercase;
        color: #fff;
        position: relative;
        font-size: 17px;
        background-color: transparent;
        text-align: left;
      }
      .hovereffect:hover .overlay:before {
        position: absolute;
        top: 20px;
        right: 20px;
        bottom: 20px;
        left: 20px;
        /* border: 2px solid #fff; */
        content: "";
        opacity: 0;
        filter: alpha(opacity=0);
        -webkit-transition: opacity 0.35s, -webkit-transform 0.45s;
        transition: opacity 0.35s, transform 0.45s;
        -webkit-transform: translate3d(-20px, 0, 0);
        transform: translate3d(-20px, 0, 0);
      }
      .hovereffect a,
      .hovereffect p {
        color: #fff;
        opacity: 0;
        filter: alpha(opacity=0);
        -webkit-transition: opacity 0.35s, -webkit-transform 0.45s;
        transition: opacity 0.35s, transform 0.45s;
        -webkit-transform: translate3d(-10px, 0, 0);
        transform: translate3d(-10px, 0, 0);
      }
      .hovereffect:hover img {
        opacity: 0.6;
        filter: alpha(opacity=60);
        -webkit-transform: translate3d(0, 0, 0);
        transform: translate3d(0, 0, 0);
      }
      .hovereffect:hover .overlay:before,
      .hovereffect:hover a,
      .hovereffect:hover p {
        opacity: 1;
        filter: alpha(opacity=100);
        -webkit-transform: translate3d(0, 0, 0);
        transform: translate3d(0, 0, 0);
      }
      .hovereffect .overlay > a {
        visibility: hidden;
      }
      .hovereffect:hover .overlay > a {
        visibility: visible;
        height: 100%;
        width: 100%;
        display: flex;
        align-items: center;
        justify-content: center;
      }
    </style>`;
}

customElements.define(
  "service-list",
  component(ServiceList, {
    observedAttributes: [],
    useShadowDOM: false,
  })
);
