<script lang="ts">
  import { goto } from '$app/navigation';
  import { createClient } from '@supabase/supabase-js';
  import { SUPABASE_URL, SUPABASE_ANON_KEY } from '$lib/config';

  let email = $state('');
  let password = $state('');
  let loading = $state(false);
  let error = $state('');

  async function login() {
    loading = true;
    error = '';
    try {
      const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);
      const { data, error: authError } = await supabase.auth.signInWithPassword({ email, password });
      if (authError || !data.session) {
        error = authError?.message || 'Invalid email or password.';
        loading = false;
        return;
      }
      document.cookie = `admin_token=${data.session.access_token}; path=/; max-age=86400; SameSite=Strict`;
      goto('/admin');
    } catch (e) {
      console.error('Login error:', e);
      error = 'Something went wrong. Please try again.';
    }
    loading = false;
  }
</script>

<svelte:head><title>Admin Login — Shipway237</title></svelte:head>

<div class="login-page">
  <div class="login-card">
    <img src="/src/lib/assets/logo.png" alt="Shipway237" class="login-logo" />
    <h1 class="login-title">Admin access</h1>
    <p class="login-sub">Sign in to your Shipway237 dashboard</p>

    {#if error}
      <div class="login-error">{error}</div>
    {/if}

    <div class="form-group">
      <label for="email" class="form-label">Email</label>
      <input id="email" class="form-input" type="email" bind:value={email}
        placeholder="you@shipway237.com" />
    </div>

    <div class="form-group">
      <label for="password" class="form-label">Password</label>
      <input id="password" class="form-input" type="password" bind:value={password}
        onkeydown={(e) => e.key === 'Enter' && login()} />
    </div>

    <button class="btn-login" onclick={login} disabled={loading || !email || !password}>
      {loading ? 'Signing in...' : 'Sign in'}
    </button>
  </div>
</div>

<style>
  .login-page { min-height: 100vh; display: flex; align-items: center; justify-content: center; background: #f5f5f3; padding: 1rem; }
  .login-card { background: #fff; border-radius: var(--radius-lg); border: 0.5px solid var(--gray-light); padding: 2.5rem 2rem; width: 100%; max-width: 400px; display: flex; flex-direction: column; gap: 1.25rem; }
  .login-logo { height: 44px; width: auto; object-fit: contain; }
  .login-title { font-family: 'Barlow Condensed', sans-serif; font-size: 1.75rem; font-weight: 700; text-transform: uppercase; color: #1a1a1a; margin: 0; }
  .login-sub { font-size: 0.875rem; color: var(--gray); margin: -0.75rem 0 0; }
  .login-error { background: #fff0f0; border: 1px solid #ffcccc; color: var(--red); padding: 0.75rem 1rem; border-radius: var(--radius); font-size: 0.875rem; }
  .form-group { display: flex; flex-direction: column; gap: 0.4rem; }
  .form-label { font-size: 0.875rem; font-weight: 600; color: #1a1a1a; }
  .form-input { width: 100%; padding: 0.75rem 1rem; border: 1.5px solid var(--gray-light); border-radius: var(--radius); font-family: 'Barlow', sans-serif; font-size: 0.95rem; color: #1a1a1a; transition: border-color 0.15s; }
  .form-input:focus { outline: none; border-color: var(--red); }
  .btn-login { width: 100%; padding: 0.875rem; background: var(--red); color: #fff; border: none; border-radius: var(--radius); font-family: 'Barlow', sans-serif; font-size: 1rem; font-weight: 700; cursor: pointer; transition: background 0.15s; }
  .btn-login:hover:not(:disabled) { background: var(--red-dark); }
  .btn-login:disabled { background: var(--gray-light); color: var(--gray-mid); cursor: not-allowed; }
</style>