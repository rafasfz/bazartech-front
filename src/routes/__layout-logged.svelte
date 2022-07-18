<script>
  import logo from '/src/assets/bazartech.png';
  import { session } from '$app/stores';
  import { page } from '$app/stores';
</script>

<div class="flex-wrapper">
  <header>
    <ul id="header-content">
      <li class="title">
        {#if $session.user}
          <a href="/dashboard">
            <img src={logo} alt="Logo do BazarTech" />
          </a>
        {:else}
          <a href="/">
            <img src={logo} alt="Logo do BazarTech" />
          </a>
        {/if}
      </li>
      <div class="right-menu">
        {#if $session.user}
          <li class="mt-1 mb-1">
            <a id="anuncio" href="/dashboard">Anúncios</a>
          </li>
          <hr class="divider" width="1" size="30" />
          <li class="mt-1 mb-1">
            <a id="criar-anuncio" href="/products/register">Criar Anúncio</a>
          </li>
        {/if}
        <hr class="divider" width="1" size="30" />
        {#if !$session.user && $page.url.pathname === '/'}
          <li class="btn btn-bazar menu-button mt-1 mb-1">
            <a href="/sign-up">Criar conta</a>
          </li>
        {/if}

        {#if !$session.user && $page.url.pathname === '/sign-up'}
          <li class="btn btn-bazar menu-button mt-1 mb-1">
            <a href="/">Login</a>
          </li>
        {/if}
        {#if $session.user}
          <li class="btn btn-bazar menu-button mt-1 mb-1">
            <a href="/auth/logout">Logout</a>
          </li>
        {/if}
      </div>
    </ul>
  </header>

  {#if $session.user}
    <h1 id="title-name">Olá {$session.user.name}</h1>
  {/if}

  <div class="content">
    <slot />
  </div>

  <footer>
    © 2022 Todos os direitos reservados - Ana Carolina / Cácio Lucas / Rafael.
  </footer>
</div>

<style>
  :global(:root) {
    --primary-color: #0c1618;
    --second-color: #004643;
    --btn-color: #faf4d3;
    --btn-color-hover: #faeeaa;
  }

  :global(html, body) {
    height: 100%;
    width: 100%;
    margin: 0;
    padding: 0;
    font-family: 'Inter', sans-serif;
    box-sizing: border-box;
    position: relative;
    overflow-x: hidden;
  }
  :global(*) {
    margin: 0;
    text-decoration: none;
    font-family: 'Inter', sans-serif;
    padding: 0;
    box-sizing: border-box;
  }

  #title-name {
    background: var(--btn-color-hover);
    width: 100%;
    border: 1px solid var(--btn-color-hover);
    border-radius: 0 0 10px 10px;
    font-size: 1.2rem;
    padding: 0.5rem 4rem;
  }

  :global(.btn-bazar) {
    display: inline-block;
    font-weight: 400;
    text-align: center;
    white-space: nowrap;
    vertical-align: middle;
    -webkit-user-select: none;
    -moz-user-select: none;
    -ms-user-select: none;
    user-select: none;
    border: 1px solid var(--btn-color);
    padding: 0.375rem 0.75rem;
    font-size: 1rem;
    line-height: 1.5;
    border-radius: 50px;
    padding: 10px;
    transition: color 0.15s ease-in-out, background-color 0.15s ease-in-out,
      border-color 0.15s ease-in-out, box-shadow 0.15s ease-in-out;
    background: var(--btn-color);
  }
  .menu-button {
    width: 150px;
    background: var(--btn-color);
  }

  .menu-button:hover {
    background: var(--btn-color-hover);
  }

  .menu-button a {
    color: var(--primary-color);
  }

  header {
    background: var(--primary-color);
  }

  #header-content {
    display: flex;
    justify-content: space-between;
    align-items: center;
    width: 90%;
    margin: 0 auto;
    padding: 40px 0;
    list-style: none;
  }

  .right-menu {
    display: flex;
    justify-content: space-between;
    align-items: center;
  }

  .title img {
    width: 15rem;
  }

  .divider {
    margin: 0 0.8rem;
  }

  :global(footer) {
    width: 100%;
    margin: auto 0;
    position: absolute;
    bottom: auto;
    color: var(--second-color);
    text-align: center;
    padding: 20px;
    font-size: 14px;
  }

  :global(a) {
    text-decoration: none;
  }

  .content {
    width: 90%;
    margin: 0 auto;
  }

  #anuncio,
  #criar-anuncio {
    color: white;
    margin: 0 0 10px 10px;
  }

  #anuncio:hover,
  #criar-anuncio:hover {
    color: var(--btn-color-hover);
  }

  @media (min-width: 1500px) {
    :global(footer) {
      bottom: 0;
    }
  }

  @media (max-width: 620px) {
    .title img {
      width: 10rem;
    }

    .menu-button {
      width: max-content;
    }
  }

  @media (max-width: 370px) {
    .title img {
      width: 6rem;
    }
  }

  @media (max-width: 540px) {
    #header-content {
      flex-wrap: wrap;
    }
    .right-menu {
      flex-wrap: wrap;
    }
  }
</style>
