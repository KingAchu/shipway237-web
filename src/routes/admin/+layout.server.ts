import { redirect } from '@sveltejs/kit';
import type { LayoutServerLoad } from './$types';

export const load: LayoutServerLoad = async ({ cookies, url }) => {
  // Skip auth check on the login page itself
  if (url.pathname === '/admin/login') return {};

  const token = cookies.get('admin_token');

  if (!token) {
    throw redirect(303, '/admin/login');
  }

  return { token };
};
