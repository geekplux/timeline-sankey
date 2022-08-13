import {
  CROSS_LINK_KEYS,
  DIRECT_LINK_KEYS,
  LINK_DEFAULT_COLOR,
  NODE_TITLE_GAP,
  STROKE_DASH_ARRAY
} from 'src/lib/consts';
import { useBreakpoint } from 'src/lib/hooks';
import { onKeyAction } from 'src/lib/utils';
import { useTimeline } from 'src/stores/useTimeline';
import type { Node } from 'src/@types/data';
import { useRouter } from 'next/router';
import { useState } from 'react';
import { isCrossLink, isDirectLink, transformToGraph } from './compute';

export type SankeyProps = {
  data: any;
  width?: number;
  height?: number;
  minYear: number;
  maxYear: number;
  yearStep: number;
  containerProps?: any;
};

const isFilterOut = (node: Node) => (node._filterOut ? 0.2 : 1);

const STORE_SLICES = {
  updateLayout: (s: any) => s.update,
  filters: (s: any) => s.filters
};

/**
 * ### Sankey component
 */
export default function Sankey({
  data,
  width,
  height,
  minYear,
  maxYear,
  yearStep,
  containerProps
}: SankeyProps) {
  const router = useRouter();
  const isMobile = useBreakpoint('(max-width: 480px)');
  const [hoveredNodes, setHoveredNodes] = useState(new Set());
  const [highlightedNodes, setHighlightedNodes] = useState(new Set());
  const filters = useTimeline(STORE_SLICES.filters);

  if (!width || !height) {
    return null;
  }

  const { nodes, links } = transformToGraph({
    data,
    minYear,
    maxYear,
    width,
    height,
    filters,
    isMobile,
    yearStep
  });

  const onNodeHover = (node: Node) => () => {
    const highlightedNodes = new Set();
    highlightedNodes.add(node.id);
    const hoveredNodes = new Set();
    hoveredNodes.add(node.id);
    setHoveredNodes(hoveredNodes);

    [...Object.values(CROSS_LINK_KEYS), ...Object.values(DIRECT_LINK_KEYS)].map(
      (k) => {
        node[k].map((n: Node) => highlightedNodes.add(n.id));
      }
    );
    setHighlightedNodes(highlightedNodes);
  };

  const clearNodeHover = () => {
    setHoveredNodes(new Set());
    setHighlightedNodes(new Set());
  };

  const nodeColor = (node: Node) =>
    highlightedNodes.size
      ? highlightedNodes.has(node.id)
        ? isFilterOut(node)
        : 0.05
      : isFilterOut(node);

  const handleNodeClick = (node: Node) => (e: any) => {
    e.preventDefault();
    router.push(node.slug);
  };

  return (
    <div className="pt-8 sankey" {...containerProps}>
      <svg width={width} height={height} className="overflow-visible">
        <g className="direct-links">
          {links
            .filter((l) => isDirectLink(l))
            .map((l, i) => (
              <path
                key={i}
                d={l.d}
                fill={
                  hoveredNodes.size &&
                  (hoveredNodes.has(l.source) || hoveredNodes.has(l.target))
                    ? l.sourceNode._color
                    : LINK_DEFAULT_COLOR
                }
                opacity={
                  // hoveredNodes.size && hoveredNodes.has(l.source) ? 0.3 : 0.5
                  0.4
                }
              />
            ))}
        </g>
        <g className="nodes">
          {nodes.map((node, i) => (
            <g
              className="transition-opacity duration-300 node"
              key={i}
              onMouseOver={onNodeHover(node)}
              onMouseLeave={clearNodeHover}
              opacity={nodeColor(node)}
            >
              <rect
                x={node._x0}
                y={node._y0}
                width={node._width}
                height={node._height}
                fill={node._color}
              />
              <foreignObject
                x={node._x0}
                y={node._y0}
                width={node._width}
                height={node._height}
                className="overflow-visible cursor-pointer"
                onClick={handleNodeClick(node)}
                onKeyDown={onKeyAction(() =>
                  router.push(node.slug)
                )}
                tabIndex={0}
                aria-label={node.name}
              >
                <div className="relative h-full">
                  <p
                    className="absolute text-sm font-bold w-max"
                    style={{
                      bottom: `-${NODE_TITLE_GAP}px`,
                      transform: 'translate(-50%, 0)',
                      textShadow:
                        '-1px 0 white, 0 1px white, 1px 0 white, 0 -1px white'
                    }}
                  >
                    {node.name}
                  </p>
                </div>
              </foreignObject>
            </g>
          ))}
        </g>
        <g className="cross-links">
          {links
            .filter((l) => isCrossLink(l))
            .map((l, i) => (
              <g className="cross-link" key={i}>
                <path
                  d={l.d}
                  fill="none"
                  stroke="rgba(0, 0, 0, 0.4)"
                  strokeDasharray={STROKE_DASH_ARRAY}
                  // opacity={
                  //   hoveredNodes.size
                  //     ? hoveredNodes.has(l.source) || hoveredNodes.has(l.target)
                  //       ? 1
                  //       : 0.05
                  //     : 1
                  // }
                  opacity={
                    hoveredNodes.size && hoveredNodes.has(l.source) ? 1 : 0
                  }
                />
                <polygon
                  points={l.triangle}
                  // opacity={
                  //   hoveredNodes.size
                  //     ? hoveredNodes.has(l.source) || hoveredNodes.has(l.target)
                  //       ? 1
                  //       : 0.05
                  //     : 1
                  // }
                  opacity={
                    hoveredNodes.size && hoveredNodes.has(l.source) ? 1 : 0
                  }
                  // transform={`rotate(${l.rotate},
                  //   ${l.targetNode._xMidPoint}, ${l.targetNode._yMidPoint})`}
                ></polygon>
              </g>
            ))}
        </g>
      </svg>
    </div>
  );
}
