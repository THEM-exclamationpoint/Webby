import React from 'react'
import * as d3 from 'd3'
import {useNavigate} from 'react-router-dom'
import {useRef, useEffect, useState} from 'react'
import {_getGraphData} from '../../store/graph/graphData'
import {setUser} from '../../store/auth/user'
import {useDispatch, useSelector} from 'react-redux'
import {Paper} from '@mui/material'
import './style.css'

// Copyright 2022 Observable, Inc.
// Released under the ISC license.
// https://observablehq.com/@d3/radial-tree
function Tree(
  data,
  {
    children, // if hierarchical data, given a d in data, returns its children
    tree = d3.tree, // layout algorithm (typically d3.tree or d3.cluster)
    separation = tree === d3.tree
      ? (a, b) => (a.parent == b.parent ? 1 : 2) / a.depth
      : (a, b) => (a.parent == b.parent ? 1 : 2),
    sort, // how to sort nodes prior to layout (e.g., (a, b) => d3.descending(a.height, b.height))
    label, // given a node d, returns the display name
    title, // given a node d, returns its hover text
    link, // given a node d, its link (if any)
    linkTarget = '_blank', // the target attribute for links (if any)
    width = 640, // outer width, in pixels
    height = 400, // outer height, in pixels
    margin = 60, // shorthand for margins
    marginTop = margin, // top margin, in pixels
    marginRight = margin, // right margin, in pixels
    marginBottom = margin, // bottom margin, in pixels
    marginLeft = margin, // left margin, in pixels
    radius = Math.min(
      width - marginLeft - marginRight,
      height - marginTop - marginBottom
    ) / 2, // outer radius
    r = 3, // radius of nodes
    padding = 1, // horizontal padding for first and last column
    fill = '#A799B7', // fill for nodes
    fillOpacity, // fill opacity for nodes
    stroke = '#A799B7', // stroke for links
    strokeWidth = 2, // stroke width for links
    strokeOpacity = 0.4, // stroke opacity for links
    strokeLinejoin, // stroke line join for links
    strokeLinecap, // stroke line cap for links
    halo = '#fcf7f8', // color of label halo
    haloWidth = 10, // padding around the labels
    svg = d3.create('svg'),
    clickHandler,
  } = {}
) {
  svg.html('') //clears the svg so that duplicates are not made on re-render

  const root = d3.hierarchy(data, children)

  // Sort the nodes.
  if (sort != null) root.sort(sort)
  // Compute labels and titles.
  const descendants = root.descendants()
  const L = label == null ? null : descendants.map((d) => label(d.data, d))

  // Compute the layout:

  tree() //d3.tree() creates a new tidy tree layout
    .size([2 * Math.PI, radius])
    .separation(separation)(root) //sets separation between nodes

  svg //'.attr' gets or sets an attribute
    .attr('viewBox', [-marginLeft - radius, -marginTop - radius, width, height])
    .attr('width', width)
    .attr('height', height)
    .attr('style', 'max-width: 100%; height: auto; height: intrinsic;')
    .attr('font-family', 'sans-serif')
    .attr('font-size', 20)
    .attr('fill', '#028090') //colors the text

  svg
    .append('g') //appends a g element to the svg. g element is used to group svg shapes together
    .attr('fill', 'none') //prevents paths from filling in solid
    .attr('stroke', stroke)
    .attr('stroke-opacity', strokeOpacity)
    .attr('stroke-linecap', strokeLinecap)
    .attr('stroke-linejoin', strokeLinejoin)
    .attr('stroke-width', strokeWidth)
    .selectAll('path')
    .data(root.links())
    .join('path') //adds a path between each node
    .attr(
      'd',
      d3
        .linkRadial()
        .angle((d) => d.x)
        .radius((d) => d.y)
    )

  const node = svg
    .append('g')
    .selectAll('a') //selects all 'a' elements (links)
    .data(root.descendants())
    .join('a')
    // .attr('xlink:href', link == null ? null : (d) => link(d.data, d))
    //The following line causes links to open in a new tab. We disabled this.
    //.attr('target', link == null ? null : linkTarget)
    .attr(
      'transform',
      (d) => `rotate(${(d.x * 180) / Math.PI - 90}) translate(${d.y},0)`
    )
    .attr('fill', '#028090') //by adding this line, links, whether or not clicked, stay the same color (#028090) as the rest of the test

  node
    .append('circle') //adds a circle at each node
    .attr('fill', (d) => (d.children ? stroke : fill))
    .attr('r', r)

  //interactivity
  {
    clickHandler
      ? node.on('click', (e, d) =>
          d.depth === 2 ? clickHandler(e, d.data) : {}
        )
      : node.attr('xlink:href', link == null ? null : (d) => link(d.data, d))
  }

  if (title != null) node.append('title').text((d) => title(d.data, d))

  if (L) {
    //an array of labels
    node
      .append('text')
      .attr('transform', (d) => `rotate(${d.x >= Math.PI ? 180 : 0})`)
      .attr('dy', '0.32em')
      .attr('x', (d) => (d.x < Math.PI === !d.children ? 6 : -6))
      .attr('text-anchor', (d) =>
        d.x < Math.PI === !d.children ? 'start' : 'end'
      )
      .attr('paint-order', 'stroke')
      .attr('stroke', halo)
      .attr('stroke-width', haloWidth)
      .text((d, i) => L[i])
  }

  //selecting the current user
  svg
    .selectAll('g')
    .selectAll('a')
    .filter((node) => node.data.name === L[0])
    .attr('fill', '#2C2C54')

  //selecting other users
  svg
    .selectAll('g')
    .selectAll('a')
    .filter((node) => node.depth === 1)

  //selecting interests
  svg
    .selectAll('g')
    .selectAll('a')
    .filter((node) => node.depth === 2)
    .attr('fill', '#2C2C54')

  return svg.node()
}

function Graph() {
  const nav = useNavigate()
  const dispatch = useDispatch()
  const user = useSelector((state) => state.user)
  const graphData = useSelector((state) => state.graphData)

  useEffect(() => {
    dispatch(setUser())
  }, [])

  useEffect(() => {
    if (user.uid) dispatch(_getGraphData(user.uid))
  }, [user.uid])

  const web = useRef()

  useEffect(() => {
    Tree(graphData, {
      screenReader: true,
      label: (d) => d.name,
      title: (d) => {
        if (d.children && d.children.length === 0)
          //checks to see if a node is another user (having no children), and if so, make a hover message over link to profile
          return `View ${d.name}'s profile`
      },
      // link: (d, n) => {
      //   if (n.depth === 2) return `/users/${d.uid}`
      // },
      clickHandler: (e, d) => {
        nav(`../users/${d.uid}`)
      },
      width: 1152,
      height: 1152,
      margin: 100,
      svg: d3.select(web.current),
    })
  }, [graphData])

  return (
    <div className="graph-wrapper">
      <Paper sx={{m: 1, p: 1}}>
        <svg className="graph" ref={web}></svg>
      </Paper>
    </div>
  )
}

export default Graph
