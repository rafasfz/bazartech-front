<script>
  import { session } from '$app/stores'
  import { claim_svg_element } from 'svelte/internal'
  const formatDate = (date) => {
    const today = new Date()
    const d = new Date(date)

    const created_at_days = today.getTime() - d.getTime()
    const difference = Math.ceil(created_at_days / (1000 * 3600 * 24))
    if (difference == 0) {
      return 'Criado hoje'
    } else {
      return `Criado à ${difference} dias atrás`
    }
  }

  export let products = []
</script>

<div class="products-list">
  <h2 class="mb-4 mt-2">Produtos</h2>
  <div
    class="d-flex align-items-center flex-wrap justify-content-between center-mobile"
  >
    {#each products as product}
      <div
        class="card"
        style="width: auto;margin-right: 25px;margin-bottom:15px;"
      >
        {#if product.images_display.length > 0}
          <img
            src={product.images_display[0].image}
            alt={product.name}
            width="300"
            height="287"
            style="object-fit: cover;"
          />
        {:else}
          Sem imagem
        {/if}
        <div class="card-body text-center w-100">
          <h5 class="card-title">
            <a href="/products/{product.id}">{product.name}</a>
          </h5>
          {#if product.owner_display.address}
            <p class="card-text">
              <small class="text-muted"
                >{product.owner_display.address.city}, {product.owner_display
                  .address.district}</small
              >
            </p>
          {/if}
          <div class="d-flex align-items-center justify-content-around">
            <a
              href="mailto:{product.owner_display.email}"
              class="btn btn-bazar email">Enviar Email</a
            >
            <a href="/products/{product.id}/" class="btn btn-primary"
              >Detalhes</a
            >
          </div>
        </div>
        <div class="card-footer text-muted text-center">
          {formatDate(product.created_at)}
        </div>
      </div>
    {/each}
  </div>
</div>

<style>
  .products-list {
    margin-top: 1.4rem;
  }
  .card-body {
    width: 50rem;
  }

  .email {
    color: var(--primary-color);
    border-radius: 0.375rem;
  }

  @media (max-width: 350px) {
    img {
      width: auto !important;
    }
  }

  @media (max-width: 741px) {
    div.center-mobile {
      justify-content: center !important;
    }
  }
</style>
