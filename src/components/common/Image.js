import React from 'react'
import { graphql, StaticQuery } from 'gatsby'
import Img from 'gatsby-image'
import PropTypes from "prop-types"

const Image = ({ fileName, alt, style }) => (
    <StaticQuery
        query={graphql`
          query {
            images: allFile {
              edges {
                node {
                  relativePath
                  name
                  childImageSharp {
                    fluid(maxWidth: 600) {
                      ...GatsbyImageSharpFluid
                    }
                  }
                }
              }
            }
          }
        `}
        render={ (data) => {
            // Handles SVG extension
            const extension = fileName.match(/[^\\]*\.(\w+)$/)[1]
            if (extension === `svg`) {
                return <img src={require(`../../images/${fileName}`)} alt={alt} style={style}/>
            }

            // Finds your image among all
            const image = data.images.edges.find(n => n.node.relativePath.includes(fileName))

            if (!image) {
                return (
                    <img src="" alt=""/>
                )
            }

            return (
                <Img alt={alt} fluid={image.node.childImageSharp.fluid} style={style}></Img>
            )
        }}
    />
)

Image.propTypes = {
    fileName: PropTypes.string.isRequired,
    alt: PropTypes.string,
    style: PropTypes.object,
}

export default Image
