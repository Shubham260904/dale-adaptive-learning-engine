import { PrismaClient, Domain } from '@prisma/client';
const prisma = new PrismaClient();

async function main() {
  const questions = [
  { domain: Domain.ARRAY, title: 'Two Sum', statement: 'Find two numbers that add up to target.', difficulty: 1200 },
  { domain: Domain.ARRAY, title: 'Kadane’s Algorithm', statement: 'Find max subarray sum.', difficulty: 1400 },
  { domain: Domain.ARRAY, title: 'Merge Intervals', statement: 'Merge overlapping intervals.', difficulty: 1500 },

  { domain: Domain.BST, title: 'Validate BST', statement: 'Check if a binary tree is BST.', difficulty: 1300 },
  { domain: Domain.BST, title: 'Lowest Common Ancestor', statement: 'Find LCA in BST.', difficulty: 1350 },
  { domain: Domain.BST, title: 'Kth Smallest Element', statement: 'Find kth smallest element in BST.', difficulty: 1450 },

  { domain: Domain.GRAPH, title: 'Number of Islands', statement: 'Count connected components in a 2D grid.', difficulty: 1400 },
  { domain: Domain.GRAPH, title: 'Detect Cycle in Directed Graph', statement: 'Use DFS/Kahn’s algorithm.', difficulty: 1500 },
  { domain: Domain.GRAPH, title: 'Shortest Path (Dijkstra)', statement: 'Find shortest path from source.', difficulty: 1600 },
];

  await prisma.question.createMany({data: questions });
  console.log('✅ Seed data inserted successfully!');
}

main()
  .then(async () => await prisma.$disconnect())
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
