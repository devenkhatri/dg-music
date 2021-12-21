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
             url
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
    const metaUrl = site.siteMetadata?.url || '';
    const metaImage = image || imageSharp?.fluid.src;

    return (
        <Helmet
            title={metaTitle}
            titleTemplate={defaultTitle ? `%s | ${defaultTitle}` : null}
        >
            {/* General tags */}
            <title>{metaTitle}</title>
            <meta name="description" content={metaDescription} />
            <meta name="image" content={metaImage} />

            {/* OpenGraph tags */}
            <meta property="og:url" content={metaUrl} />
            <meta property="og:type" content="article" />
            <meta property="og:title" content={metaTitle} />
            <meta property="og:description" content={metaDescription} />
            <meta property="og:image" content={metaImage} />

            {/* Twitter Card tags */}
            <meta name="twitter:card" content="summary" />
            <meta name="twitter:title" content={metaTitle} />
            <meta name="twitter:description" content={metaDescription} />
            <meta name="twitter:creator" content={metaAuthor} />
            <meta name="twitter:image" content={metaImage} />
        </Helmet>
    )
}

export default SEO