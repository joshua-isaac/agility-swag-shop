import PreviewBar from "./PreviewBar";
import GlobalHeader from "./GlobalHeader";
import GlobalFooter from "./GlobalFooter";
import { useRouter } from "next/router";
import Head from "next/head";
import dynamic from "next/dynamic";
import tw from "twin.macro";

const MainElem = tw.main`p-8`;

import AnimationRevealPage from "helpers/AnimationRevealPage";
import Error from "next/error";

function Layout(props) {
  const { page, sitemapNode, dynamicPageItem, notFound } = props;

  // If the page is not yet generated, this will be displayed
  // initially until getStaticProps() finishes running
  const router = useRouter();
  if (router.isFallback) {
    return <div>Loading page...</div>;
  }

  if (notFound === true) {
    return <Error statusCode="404" />;
  }

  const AgilityPageTemplate = dynamic(() =>
    import("components/agility-pageTemplates/" + props.pageTemplateName)
  );

  if (dynamicPageItem?.seo?.metaDescription) {
    page.seo.metaDescription = dynamicPageItem.seo.metaDescription;
  }

  return (
    <>
      <Head>
        <title>{sitemapNode?.title} - Agility CMS Sample Blog</title>
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
        <meta name="description" content={page.seo.metaDescription} />
        <meta name="generator" content="Agility CMS" />
        <meta name="agility_timestamp" content={new Date().toLocaleString()} />
        // Snipcart CSS
        <link
          rel="stylesheet"
          href="https://cdn.snipcart.com/themes/v3.0.24/default/snipcart.css"
        />
        {dynamicPageItem?.seo?.ogImage && (
          <meta property="og:image" content={dynamicPageItem.seo.ogImage} />
        )}
        <link rel="stylesheet" href="/prose.css" />
      </Head>
      <PreviewBar {...props} />

      <MainElem>
        {/* <AnimationRevealPage disabled> */}
        <GlobalHeader {...props} />
        <AgilityPageTemplate {...props} />
        <GlobalFooter {...props} />
        // Snipcart JS
        <script
          async
          src="https://cdn.snipcart.com/themes/v3.0.24/default/snipcart.js"
        ></script>
        // Snipcart Hidden Div
        <div
          id="snipcart"
          data-api-key="ZjMwMzc5OTItNWYwNi00ODUzLWE4YjctYjcxYjFmZmM2ODE0NjM3Mzk3NzQ0NzkwMjg1MDky"
          hidden
        ></div>
        {/* </AnimationRevealPage> */}
      </MainElem>
    </>
  );
}

export default Layout;