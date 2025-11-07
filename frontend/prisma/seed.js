const { PrismaClient, Domain } = require('@prisma/client');
const prisma = new PrismaClient();

async function main() {
  const questions = [
    { title: "Two Sum", statement: "Find indices that sum to target.", difficulty: 1200, domain: Domain.ARRAY },
    { title: "Reverse String", statement: "Reverse a string in-place.", difficulty: 1000, domain: Domain.STRING },
    { title: "Count Set Bits", statement: "Count 1s in binary form.", difficulty: 1300, domain: Domain.BIT_MANIPULATION },
    { title: "Detect Cycle", statement: "Cycle detection in linked list.", difficulty: 1400, domain: Domain.LINKED_LIST },
    { title: "Valid Parentheses", statement: "Check balanced parentheses.", difficulty: 1100, domain: Domain.STACK_QUEUE },
    { title: "Binary Search", statement: "Search element in sorted array.", difficulty: 1000, domain: Domain.BINARY_SEARCH },
    { title: "Lowest Common Ancestor", statement: "Find LCA in BST.", difficulty: 1500, domain: Domain.BST },
    { title: "Number of Islands", statement: "Count connected components.", difficulty: 1300, domain: Domain.GRAPH },
    { title: "Union Find Basic", statement: "Implement disjoint set union.", difficulty: 1400, domain: Domain.UNION_FIND },
    { title: "Generate Subsets", statement: "Generate all subsets recursively.", difficulty: 1250, domain: Domain.RECURSION },
    { title: "Knapsack Problem", statement: "Find max value with given weight.", difficulty: 1600, domain: Domain.DP },
  ];

  await prisma.question.createMany({ data: questions });
  console.log('✅ Seed data inserted successfully!');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
