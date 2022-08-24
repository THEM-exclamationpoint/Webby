import React from 'react'
import * as d3 from 'd3'
import {useRef, useEffect} from 'react'
import Tree from 'react-d3-tree'

const testData = {
  name: 'Davi',
  children: [
    {
      name: 'Climbing',
      children: [
        {name: 'Wondo', children: []},
        {name: 'Kale', children: []},
        {name: 'Eric', children: []},
        {name: 'Colleen', children: []},
      ],
    },
    {
      name: 'Dancing',
      children: [
        {name: 'Kayla', children: []},
        {name: 'Andi', children: []},
        {name: 'Beacon', children: []},
        {name: 'BeLove', children: []},
        {name: 'Steph', children: []},
      ],
    },
    {
      name: 'Cooking',
      children: [
        {name: 'Kayla', children: []},
        {name: 'Wondo', children: []},
        {name: 'Joshi', children: []},
      ],
    },
    {
      name: 'Fire spinning',
      children: [
        {name: 'Beacon', children: []},
        {name: 'Kimchee', children: []},
        {name: 'BeLove', children: []},
        {name: 'Wondo', children: []},
        {name: 'Kayla', children: []},
        {name: 'Colleen', children: []},
        {name: 'Juan', children: []},
        {name: 'Joshi', children: []},
        {name: 'Iva', children: []},
        {name: 'Doc', children: []},
        {name: 'Mike', children: []},
        {name: 'Olive', children: []},
        {name: 'PJ', children: []},
      ],
    },
    {
      name: 'Art',
      children: [
        {name: 'Kayla', children: []},
        {name: 'Andi', children: []},
        {name: 'Kimchee', children: []},
        {name: 'Amanda', children: []},
        {name: 'Tina', children: []},
      ],
    },
  ],
}

function Graph() {
  return (
    <div id="treeWrapper" style={{width: '100em', height: '100em'}}>
      <Tree data={testData} />
    </div>
  )
}
export default Graph
