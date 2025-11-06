-- CreateEnum
CREATE TYPE "Domain" AS ENUM ('ARRAY', 'STRING', 'BIT_MANIPULATION', 'LINKED_LIST', 'STACK_QUEUE', 'BINARY_SEARCH', 'BST', 'GRAPH', 'UNION_FIND', 'RECURSION', 'DYNAMIC_PROGRAMMING', 'OOPS', 'OS', 'DBMS', 'HR', 'SYS_DESIGN');

-- CreateTable
CREATE TABLE "User" (
    "id" TEXT NOT NULL,
    "name" TEXT,
    "email" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "DomainRating" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "domain" "Domain" NOT NULL,
    "rating" INTEGER NOT NULL DEFAULT 1200,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "DomainRating_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Question" (
    "id" TEXT NOT NULL,
    "domain" "Domain" NOT NULL,
    "title" TEXT NOT NULL,
    "statement" TEXT NOT NULL,
    "input_format" TEXT,
    "output_format" TEXT,
    "constraints" TEXT,
    "difficulty" INTEGER NOT NULL,
    "editorial" TEXT,
    "core_idea_hint" TEXT,
    "test_edge_cases" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Question_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Submission" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "questionId" TEXT NOT NULL,
    "code" TEXT,
    "answerText" TEXT,
    "verdict" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Submission_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "RatingHistory" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "domain" "Domain" NOT NULL,
    "old_rating" INTEGER NOT NULL,
    "new_rating" INTEGER NOT NULL,
    "delta" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "RatingHistory_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");

-- AddForeignKey
ALTER TABLE "DomainRating" ADD CONSTRAINT "DomainRating_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Submission" ADD CONSTRAINT "Submission_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Submission" ADD CONSTRAINT "Submission_questionId_fkey" FOREIGN KEY ("questionId") REFERENCES "Question"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "RatingHistory" ADD CONSTRAINT "RatingHistory_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
