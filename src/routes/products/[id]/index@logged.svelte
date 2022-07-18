<script>
  import { session } from '$app/stores';
  import api from '../../../services/api';
  export let product;

  const formatDate = (date) => {
    const d = new Date(date);
    const day = d.getDate() > 9 ? d.getDate() : `0${d.getDate()}`;
    const month =
      d.getMonth() + 1 > 9 ? d.getMonth() + 1 : `0${d.getMonth() + 1}`;
    const year = d.getFullYear();
    return `${day}/${month}/${year}`;
  };

  const deleteProduct = () => {
    api.delete(`/store/products/${product.id}/`, {
      headers: {
        Authorization: `Bearer ${$session.access}`,
      },
    });
    window.location.replace(`${import.meta.env.VITE_BASE_URL}/dashboard/`);
  };
</script>

<div
  class="info-products w-90 d-flex align-items-center justify-content-center mt-5"
>
  <div class="card mb-3">
    <div
      class=" card-flex d-flex justify-content-between align-items-center g-0"
    >
      <div>
        <div
          id="carouselExampleCaptions"
          class="carousel slide carousel-fade"
          data-bs-ride="false"
        >
          <div class="carousel-indicators">
            <button
              type="button"
              data-bs-target="#carouselExampleCaptions"
              data-bs-slide-to="0"
              class="active"
              aria-current="true"
              aria-label="Slide 1"
            />
            <button
              type="button"
              data-bs-target="#carouselExampleCaptions"
              data-bs-slide-to="1"
              aria-label="Slide 2"
            />
          </div>
          <div class="carousel-inner" style="width: max-content;">
            {#each product.images_display as picture, index}
              {#if index == 0}
                <div class="carousel-item active" style="width: max-content;">
                  <img
                    src={picture.image}
                    alt={picture.description}
                    height="400"
                    style="width:35rem;object-fit: cover;"
                  />
                  <div class="carousel-caption d-none d-md-block">
                    <p>{product.name}</p>
                  </div>
                </div>
              {:else}
                <div class="carousel-item" style="width: max-content;">
                  <img
                    src={picture.image}
                    alt={picture.description}
                    height="400"
                    style="width:35rem;object-fit: cover;"
                  />
                  <div class="carousel-caption d-none d-md-block">
                    <p>{product.name}</p>
                  </div>
                </div>
              {/if}
            {/each}
          </div>
          <button
            class="carousel-control-prev"
            type="button"
            data-bs-target="#carouselExampleCaptions"
            data-bs-slide="prev"
          >
            <span class="carousel-control-prev-icon" aria-hidden="true" />
            <span class="visually-hidden">Previous</span>
          </button>
          <button
            class="carousel-control-next"
            type="button"
            data-bs-target="#carouselExampleCaptions"
            data-bs-slide="next"
          >
            <span class="carousel-control-next-icon" aria-hidden="true" />
            <span class="visually-hidden">Next</span>
          </button>
        </div>
      </div>
      <div>
        <div class="card-body">
          <h5 class="card-title my-3">{product.description}</h5>
          <div class="card-text mt-5">
            <b>Informações do vendedor</b>
            <address>
              <b>Cidade:</b>
              {product.owner_display.address.city}, {product.owner_display
                .address.state} <br />
              <b>Bairro:</b>
              {product.owner_display.address.district}
            </address>
            <div>
              <b>E-mail para contato:</b>
              {product.owner_display.email}
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="card-footer text-muted">
      <span
        >Publicado em {formatDate(product.created_at)}
        {#if $session.user.id === product.owner_display.id}
          <p>Seu anuncio</p>
          <p>
            Já vendeu? Delete seu anuncio clicando
            <span style="color: red; cursor: pointer;" on:click={deleteProduct}
              >aqui</span
            >
          </p>
        {/if}
      </span>
    </div>
  </div>
</div>

<!-- {JSON.stringify(product)} -->
<style>
  .card-body {
    word-wrap: break-word;
    padding: 4rem;
  }

  @media (max-width: 880px) {
    .card-flex {
      flex-direction: column;
    }
  }

  @media (max-width: 540px) {
    .img {
      width: auto !important;
    }
  }
</style>
