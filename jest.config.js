import nextJest from 'next/jest.js'
 
const createJestConfig = nextJest({
  dir: './',
})
 
/** @type {import('jest').Config} */
const config = {
  testEnvironment: 'jest-environment-jsdom',
  setupFilesAfterEnv: ['<rootDir>/jest.setup.js'],
  transformIgnorePatterns: [
    'node_modules/(?!(@solana|uuid|superstruct|@noble|jayson|rpc-websockets|bn.js|lodash-es|@project-serum|borsh)/)'
  ]
}
 
export default createJestConfig(config)