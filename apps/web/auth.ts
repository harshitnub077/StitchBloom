// SAFE STUBBED AUTH: Prevents the NextRequest constructor crash from affecting page renders.
// Components that import these stubs will not trigger the library's internal 500 crashes.

export const auth = async () => null;
export const signIn = async () => {};
export const signOut = async () => {};

export const handlers = {
  GET: async () => new Response("Auth API Isolated", { status: 200 }),
  POST: async () => new Response("Auth API Isolated", { status: 200 }),
};
