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
          sort: {fields: data___RecordingDate, order: DESC}
          filter: {table: {eq: "Recordings"}}
        ) {
          edges {
            node {
              id
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
        result.data.allRecordings.edges.forEach(({ node },index) => {
          // console.log("**",result.data.allRecordings.edges[index])
          const previousId = index === 0 ? null : result.data.allRecordings.edges[index - 1].node.id
          const nextId = index === result.data.allRecordings.edges.length - 1 ? null : result.data.allRecordings.edges[index + 1].node.id
          // console.log("****",previousId,nextId)
            createPage({
                path: `/recording/${generateSlug(node)}`,
                component: path.resolve(`./src/templates/recording.js`),
                context: {
                    recordId: node.recordId,
                    previousId,
                    nextId,
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