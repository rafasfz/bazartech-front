<script>
  import { session } from '$app/stores'
  import api from '../../../services/api'
  export let product

  const formatDate = (date) => {
    const d = new Date(date)
    const day = d.getDate() > 9 ? d.getDate() : `0${d.getDate()}`
    const month =
      d.getMonth() + 1 > 9 ? d.getMonth() + 1 : `0${d.getMonth() + 1}`
    const year = d.getFullYear()
    return `${day}/${month}/${year}`
  }

  const deleteProduct = () => {
    api.delete(`/store/products/${product.id}/`, {
      headers: {
        Authorization: `Bearer ${$session.access}`,
      },
    })
    window.location.replace(`${import.meta.env.VITE_BASE_URL}/dashboard/`)
  }
</script>

<div>
  {#if $session.user.id === product.owner_display.id}
    <h2>Seu anuncio</h2>
    <h3>
      Já vendeu? Delete seu anuncio clicando
      <span style="color: red; cursor: pointer;" on:click={deleteProduct}
        >aqui</span
      >
    </h3>
  {/if}
  <h1>{product.name}</h1>
  <span>Publicado em {formatDate(product.created_at)}</span>
  <div>
    {#each product.images_display as picture}
      <img
        src={picture.image}
        alt={picture.description}
        width="280"
        height="280"
        style="object-fit: cover;"
      />
    {/each}
  </div>
  <div>
    <p>{product.description}</p>
  </div>
  <div>
    Informações do vendedor
    <address>
      Cidade: {product.owner_display.address.city}, {product.owner_display
        .address.state} <br />
      Bairro: {product.owner_display.address.district}
    </address>
    <div>
      E-mail para contato: {product.owner_display.email}
    </div>
  </div>
</div>

<!-- {JSON.stringify(product)} -->
