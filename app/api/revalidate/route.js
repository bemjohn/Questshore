import { revalidatePath } from 'next/cache';

export async function POST(req) {
  try {
    const secret =
      req.nextUrl.searchParams.get('secret') ||
      req.headers.get('x-sanity-secret');

    if (secret !== process.env.SANITY_REVALIDATE_SECRET) {
      return new Response(
        JSON.stringify({ message: 'Invalid secret' }),
        { status: 401, headers: { 'Content-Type': 'application/json' } }
      );
    }

    revalidatePath('/', 'layout');

    return new Response(
      JSON.stringify({ revalidated: true, now: Date.now() }),
      { status: 200, headers: { 'Content-Type': 'application/json' } }
    );
  } catch (err) {
    return new Response(
      JSON.stringify({ message: 'Error revalidating', error: err.message }),
      { status: 500, headers: { 'Content-Type': 'application/json' } }
    );
  }
}
