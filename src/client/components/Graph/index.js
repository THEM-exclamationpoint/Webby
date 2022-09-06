import React from 'react'
import * as d3 from 'd3'
import {useNavigate} from 'react-router-dom'
import {useRef, useEffect, useState} from 'react'
import {_getGraphData} from '../../store/graph/graphData'
import {setUser} from '../../store/auth/user'
import {useDispatch, useSelector} from 'react-redux'
import {Paper} from '@mui/material'
import './style.css'

//This is the graph file from the commit right before we began making light/dark modes for the graph

// Copyright 2022 Observable, Inc.
// Released under the ISC license.
// https://observablehq.com/@d3/radial-tree
function Tree(
  data,
  {
    theme = 'light', //dark or light theme, for styling
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
    strokeWidth = 2, // stroke width for links
    strokeOpacity = 0.4, // stroke opacity for links
    strokeLinejoin, // stroke line join for links
    strokeLinecap, // stroke line cap for links
    haloWidth = 10, // padding around the labels
    svg = d3.create('svg'),
    clickHandler,
  } = {}
) {
  const stylePalette = {
    dark: {
      backgroundColor: '#282C36',
      halo: '#282C36',
      currentUserLabelColor: '#a9a9eb',
      InterestsLabelColor: '#51d7e8',
      otherUsersLabelColor: '#a9a9eb',
      nodeFill: '#A799B7',
      stroke: '#A799B7', // stroke color for web
    },
    light: {
      backgroundColor: '#FCF7F8',
      halo: '#FCF7F8',
      currentUserLabelColor: '#2C2C54',
      InterestsLabelColor: '#028090',
      otherUsersLabelColor: '#2C2C54',
      nodeFill: '#A799B7',
      stroke: '#A799B7', // stroke color for web
    },
  }

  const palette = stylePalette[theme]

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
    .attr(
      'style',
      `background-color : ${
        palette && palette.backgroundColor
      }; max-width: 100%; height: auto; height: intrinsic;`
    )
    .attr('font-family', 'sans-serif')
    .attr('font-size', 20)
    .attr('fill', palette && palette.otherUsersLabelColor) ///default text color

  svg
    .append('g') //appends a g element to the svg. g element is used to group svg shapes together
    .attr('fill', 'none') //prevents paths from filling in solid
    .attr('stroke', palette && palette.stroke)
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
    .attr('fill', palette && palette.InterestsLabelColor) //by adding this line, links, whether or not clicked, stay the same color as the rest of the test

  node
    .append('circle') //adds a circle at each node
    .attr('fill', (d) =>
      d.children ? palette && palette.stroke : palette && palette.fill
    )
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
      .attr('stroke', palette && palette.halo)
      .attr('stroke-width', haloWidth)
      .text((d, i) => L[i])
  }

  //selecting the current user
  svg
    .selectAll('g')
    .selectAll('a')
    .filter((node) => node.data.name === L[0])
    .attr('fill', palette && palette.currentUserLabelColor)

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
    .attr('fill', palette && palette.otherUsersLabelColor)

  return svg.node()
}

function Graph() {
  const nav = useNavigate()
  const dispatch = useDispatch()
  const user = useSelector((state) => state.user)
  const graphData = useSelector((state) => state.graphData)
  let theme = localStorage.getItem('theme')

  useEffect(() => {
    dispatch(setUser())
  }, [])

  useEffect(() => {
    if (user.uid) dispatch(_getGraphData(user.uid))
  }, [user.uid])

  const web = useRef()

  useEffect(() => {
    Tree(graphData, {
      theme: theme,
      screenReader: true,
      label: (d) => d.name,
      title: (d) => {
        if (d.children && d.children.length === 0)
          //checks to see if a node is another user (having no children), and if so, make a hover message over link to profile
          return `View ${d.name}'s profile`
      },
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
    <Paper sx={{m: 1, p: 1}}>
      <div
        className="graph-wrapper"
        style={{display: 'flex', justifyContent: 'center'}}>
        <svg className="graph" ref={web}></svg>
      </div>{' '}
    </Paper>
  )
}

export default Graph
