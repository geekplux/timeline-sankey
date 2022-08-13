function getRandomInt(min: number, max: number): number {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min) + min); //The maximum is exclusive and the minimum is inclusive
}

function randomLink(linkMaxCount: number, nodes: number[]) {
  const count = getRandomInt(0, linkMaxCount);
  return new Array(count).fill(0).map(() => ({
    id: nodes[getRandomInt(0, nodes.length)]
  }));
}

export default function dataGenerator(
  count: number,
  yearRange: number[],
  tagMaxCount: number,
  categoryMaxCount: number,
  columnCount: number,
  colors: string[],
  influencedMaxCount: number,
  influencedByMaxCount: number,
  crossInfluencedMaxCount: number,
  crossInfluencedByMaxCount: number
) {
  const data = [];
  const nodeIdsGroupByColumn = new Array(columnCount).fill(0).map(() => []);

  for (let i = 0; i < count; i++) {
    const year1 = getRandomInt(yearRange[0], yearRange[1]);
    const year2 = getRandomInt(yearRange[0], yearRange[1]);
    const column = getRandomInt(0, columnCount);
    nodeIdsGroupByColumn[column].push(i);
    const tagCount = getRandomInt(0, tagMaxCount);
    const tags = new Array(tagCount).fill(0).map(() => ({
      title: `Tag ${getRandomInt(0, tagMaxCount)}`
    }));
    const categoryCount = getRandomInt(0, categoryMaxCount);
    const categories = new Array(categoryCount).fill(0).map(() => ({
      title: `Category ${getRandomInt(0, categoryMaxCount)}`
    }));

    data.push({
      id: i,
      name: `Node Name ${i}`,
      slug: `https://github.com/geekplux/timeline-sankey`,
      description: `Node description ${i}`,
      year_start: year1 < year2 ? year1 : year2,
      year_finish: year1 < year2 ? year2 : year1,
      column: {
        key: column,
        title: `Column Title ${column}`,
        color: colors[column]
      },
      tags,
      categories
    });
  }

  return data.map((d: any) => {
    const column = d.column.key;
    const sameColumnNodes = nodeIdsGroupByColumn[column];
    const otherColumnNodes = nodeIdsGroupByColumn
      .filter((_, index) => index !== column)
      .reduce((a, b) => a.concat(b), []);

    d.influenced = randomLink(influencedMaxCount, sameColumnNodes);
    d.influenced_by = randomLink(influencedByMaxCount, sameColumnNodes);
    d.cross_influenced = randomLink(crossInfluencedMaxCount, otherColumnNodes);
    d.cross_influenced_by = randomLink(
      crossInfluencedByMaxCount,
      otherColumnNodes
    );
    return d;
  });
}
