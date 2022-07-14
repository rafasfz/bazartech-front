<script>
  import { session } from '$app/stores'
  import { goto } from '$app/navigation'
  import api from '../../services/api'
  import { handle } from '../../hooks'
  let address = {}

  let user = { ...$session.user }

  const handleSubmit = async () => {
    user = { ...user, address: { ...address } }

    try {
      await api.patch(`/auth/users/${user.id}/`, user, {
        headers: {
          Authorization: `Bearer ${$session.access}`,
        },
      })
    } catch (error) {
      console.log(error)
    }

    window.location.replace(
      `${import.meta.env.VITE_BASE_URL}/products/register/`
    )
  }
</script>

<h1>Antes de anunciar registre seu endereço</h1>

<form on:submit|preventDefault={handleSubmit}>
  <input
    type="text"
    name="address.state"
    id="address.state"
    placeholder="Estado"
    bind:value={address.state}
    required
  />
  <input
    type="text"
    name="address.zip_code"
    id="address.zip_code"
    placeholder="CEP"
    bind:value={address.zip_code}
    required
  />
  <input
    type="text"
    name="address.city"
    id="address.city"
    placeholder="Cidade"
    bind:value={address.city}
    required
  />
  <input
    type="text"
    name="address.district"
    id="address.district"
    placeholder="Bairro"
    bind:value={address.district}
    required
  />
  <input
    type="text"
    name="address.street"
    id="address.street"
    placeholder="Rua"
    bind:value={address.street}
    required
  />
  <input
    type="text"
    name="address.number"
    id="address.number"
    placeholder="Número"
    bind:value={address.number}
    required
  />
  <button type="submit" name="submit" id="submit" class="btn btn-submit"
    >Cadastrar endereço</button
  >
</form>
