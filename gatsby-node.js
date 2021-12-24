const path = require(`path`);
var slugify = require('slugify');

const generateSlug = (node) => {
    const slug = slugify((node.data.RecordingDate || '') + ' ' + node.data.SongTitle, {
        replacement: '_',  // replace spaces with replacement character, defaults to `-`
        remove: /[*+~.()'"!:@]/g, // remove characters that match regex, defaults to `undefined`
        lower: true,      // convert to lower case, defaults to `false`
    })
    return slug;
}

exports.createPages = ({ graphql, actions }) => {
    const { createPage } = actions
    return new Promise(async resolve => {

        const result = await graphql(`
    {
        allRecordings: allAirtable(
          filter: {table: {eq: "Recordings"}}
        ) {
          edges {
            node {
              recordId
              data {
                SongTitle
                RecordingDate(formatString: "YYYY-MM-DD")
              }
            }
          }
        }
      }
    `)
        // For each path, create page and choose a template.
        // values in context Object are available in that page's query
        result.data.allRecordings.edges.forEach(({ node }) => {
            createPage({
                path: `/recording/${generateSlug(node)}`,
                component: path.resolve(`./src/templates/recording.js`),
                context: {
                    recordId: node.recordId,
                },
            })
        });
        resolve()
    })
}

exports.onCreateNode = ({ node, getNode, actions }) => {
    const { createNodeField } = actions
    if (node.internal.type === `Airtable` && node.table == 'Recordings') {
        const slug = generateSlug(node)
        createNodeField({
            node,
            name: `slug`,
            value: slug,
        })
    }
}