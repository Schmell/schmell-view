import { PrismaClient } from '@prisma/client'
// import { withAccelerate } from '@prisma/extension-accelerate'

// const prisma = global.prisma || new PrismaClient().$extends(withAccelerate());
const prisma = global.prisma || new PrismaClient()

if (process.env.NODE_ENV === 'development') {
	global.prisma = prisma
}

export { prisma }
