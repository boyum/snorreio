import React from "react"
import { Link, graphql } from "gatsby"

import Layout from "../components/layout"
import Image from "../components/image"
import SEO from "../components/seo"
import PostLink from "../components/post-link"

const IndexPage = ({
  data: {
    allMarkdownRemark: { edges },
  },
}) => (
  <Layout>
    <SEO title="Home" />
    <div>
      {edges
    .filter(edge => !!edge.node.frontmatter.date_published) // You can filter your posts based on some criteria
    .map(edge => <PostLink key={edge.node.id} post={edge.node} />)}
    </div>
  </Layout>
)

export default IndexPage

export const pageQuery = graphql`
  query {
    allMarkdownRemark(sort: { order: DESC, fields: [frontmatter___date_published] }) {
      edges {
        node {
          id
          excerpt(pruneLength: 250)
          frontmatter {
            date_published(formatString: "MMMM DD, YYYY")
            path
            title
          }
        }
      }
    }
  }
`