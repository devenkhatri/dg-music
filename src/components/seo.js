import * as React from "react"
import { Helmet } from "react-helmet"
import { useStaticQuery, graphql } from "gatsby"

function SEO({ title, description, image }) {
  const { site, imageSharp } = useStaticQuery(
    graphql`
       query {
         site {
           siteMetadata {
             title
             description
             author
             siteUrl
           }
         }
         imageSharp(fluid: {originalName: {eq: "icon.png"}}) {
            fluid {
              src
            }
          }
       }
     `
  )

  const defaultTitle = site.siteMetadata?.title
  const metaTitle = title || site.siteMetadata?.title;
  const metaDescription = description || site.siteMetadata?.description;
  const metaAuthor = site.siteMetadata?.author || '';
  const metaUrl = site.siteMetadata?.siteUrl || '';
  let metaImage = image || imageSharp?.fluid.src;

  return (
    <Helmet
      title={metaTitle}
      titleTemplate={defaultTitle ? `%s | ${defaultTitle}` : null}
    >
      {/* General tags */}
      <title>{metaTitle}</title>
      <meta name="title" content={metaTitle} />
      <meta name="description" content={metaDescription} />
      <meta name="image" content={metaImage} />

      {/* OpenGraph tags */}
      <meta property="og:url" content={metaUrl} />
      <meta property="og:type" content="website" />
      <meta property="og:title" content={metaTitle} />
      <meta property="og:description" content={metaDescription} />
      <meta property="og:image" content={metaImage} />

      {/* Twitter Card tags */}
      <meta name="twitter:card" content="summary" />
      <meta name="twitter:title" content={metaTitle} />
      <meta name="twitter:description" content={metaDescription} />
      <meta name="twitter:creator" content={metaAuthor} />
      <meta name="twitter:image" content={metaImage} />
      <script type="text/javascript">
        {`
              (function() { // REQUIRED CONFIGURATION VARIABLE: EDIT THE SHORTNAME BELOW
              var d = document, s = d.createElement('script'); // IMPORTANT: Replace EXAMPLE with your forum shortname!
              s.src = 'https://devengoratela.disqus.com/recommendations.js'; s.setAttribute('data-timestamp', +new Date());
              (d.head || d.body).appendChild(s);
              })();
            `}
      </script>
    </Helmet>
  )
}

export default SEO