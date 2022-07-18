<script>
  import { session } from '$app/stores';
  import { goto } from '$app/navigation';
  import api from '../../services/api';
  import { handle } from '../../hooks';
  let address = {};

  let user = { ...$session.user };

  const handleSubmit = async () => {
    user = { ...user, address: { ...address } };

    try {
      await api.patch(`/auth/users/${user.id}/`, user, {
        headers: {
          Authorization: `Bearer ${$session.access}`,
        },
      });
    } catch (error) {
      console.log(error);
    }

    window.location.replace(
      `${import.meta.env.VITE_BASE_URL}/products/register/`
    );
  };
</script>

<h2 class="mb-4 mt-3">Antes de anunciar registre seu endereço</h2>

<div class="form w-100">
  <form on:submit|preventDefault={handleSubmit}>
    <input
      type="text"
      name="address.state"
      id="address.state"
      placeholder="Estado"
      class="mb-3"
      bind:value={address.state}
      required
    />
    <input
      type="text"
      name="address.zip_code"
      id="address.zip_code"
      placeholder="CEP"
      class="mb-3"
      bind:value={address.zip_code}
      required
    />
    <input
      type="text"
      name="address.city"
      id="address.city"
      placeholder="Cidade"
      class="mb-3"
      bind:value={address.city}
      required
    />
    <input
      type="text"
      name="address.district"
      id="address.district"
      placeholder="Bairro"
      class="mb-3"
      bind:value={address.district}
      required
    />
    <input
      type="text"
      name="address.street"
      id="address.street"
      placeholder="Rua"
      class="mb-3"
      bind:value={address.street}
      required
    />
    <input
      type="text"
      name="address.number"
      id="address.number"
      placeholder="Número"
      class="mb-3"
      bind:value={address.number}
      required
    />
    <div class="w-100 d-flex justify-content-end">
      <button type="submit" name="submit" id="submit" class="btn btn-submit"
        >Cadastrar endereço</button
      >
    </div>
  </form>
</div>

<style>
  :global(form input:not(input[type='checkbox'])) {
    display: block;
    width: 100%;
    height: calc(2.25rem + 2px);
    padding: 0.375rem 0.75rem;
    font-size: 1rem;
    line-height: 1.5;
    color: #495057;
    background-color: #fff;
    background-clip: padding-box;
    border: 1px solid #ced4da;
    border-radius: 0.25rem;
    transition: border-color 0.15s ease-in-out, box-shadow 0.15s ease-in-out;
  }

  :global(.btn-submit) {
    width: 300px;
    background: var(--btn-color);
    cursor: pointer;
    border-radius: 50px;
  }

  :global(.btn-submit:hover) {
    background: var(--btn-color-hover);
    border: var(--btn-color-hover);
  }
</style>
