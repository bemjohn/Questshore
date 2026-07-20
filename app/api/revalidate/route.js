import { revalidatePath } from 'next/cache';
import { parseBody } from 'next-sanity/webhook';

export async function POST(req) {
  try {
    const secret = process.env.SANITY_REVALIDATE_SECRET;
    const { isValidSignature, body } = await parseBody(req, secret);

    if (!isValidSignature) {
      return new Response(
        JSON.stringify({ message: 'Invalid webhook signature' }),
        { status: 401, headers: { 'Content-Type': 'application/json' } }
      );
    }

    // Purge cached pages globally across all routes
    revalidatePath('/', 'layout');

    return new Response(
      JSON.stringify({ revalidated: true, now: Date.now(), body }),
      { status: 200, headers: { 'Content-Type': 'application/json' } }
    );
  } catch (err) {
    return new Response(
      JSON.stringify({ message: 'Error revalidating', error: err.message }),
      { status: 500, headers: { 'Content-Type': 'application/json' } }
    );
  }
}
