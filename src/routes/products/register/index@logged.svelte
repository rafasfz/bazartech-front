<script>
  import { session } from '$app/stores'
  import { goto } from '$app/navigation'
  import { create } from 'ipfs-http-client'
  import xImg from '/src/assets/x.svg'
  import Buffer from 'buffer'

  import api from '../../../services/api'

  if (!$session.user.address) {
    goto('/address/register/')
  }

  const ipfs = create({
    host: 'ipfs.infura.io',
    port: 5001,
    protocol: 'https',
    url: 'https://ipfs.infura.io:5001/api/v0',
  })

  let name = ''
  let description = ''
  let price = 0
  let status = 1
  let owner = $session.user.id
  let favorite = [$session.user.id]
  let tags = []
  let tag = ''
  let pictures = []
  let image = {
    image: '',
    description: '',
  }
  let images = []
  let imageFile

  const addTag = () => {
    if (!!tag) {
      tags.push(tag)
      tags = tags
      tag = ''
    }
  }

  const removeTag = (index) => {
    tags.splice(index, 1)
    tags = tags
  }

  const addImage = async () => {
    if (!imageFile) {
      console.log('nada')
      return
    }

    try {
      const file = await ipfs.add(imageFile)
      image.image = `https://ipfs.infura.io/ipfs/${file.path}`
      image.description = image.description
      imageFile = null
      images.push({ ...image })
      images = images
    } catch (err) {
      console.log(err)
      return
    }
  }

  const removeImage = (index) => {
    images.splice(index, 1)
    images = images
  }

  const imageSelect = (e) => {
    const reader = new window.FileReader()
    reader.readAsArrayBuffer(e.target.files[0])

    reader.onloadend = () => {
      imageFile = Buffer.Buffer(reader.result)
    }
  }

  const handleSubmit = async () => {
    try {
      await api.post('/store/products/', {
        name,
        description,
        price,
        tags,
        pictures: images,
        status: 1,
        owner,
      })
    } catch (err) {
      console.log(err)
    }

    goto('/dashboard')
  }
</script>

<h1>Anuncie seu produto aqui</h1>
<div class="form w-100">
  <form on:submit|preventDefault={handleSubmit}>
    <input
      type="text"
      name="name"
      id="name"
      placeholder="Nome"
      bind:value={name}
      class="mb-3"
      required
    />
    <textarea
      type="text"
      name="description"
      id="description"
      placeholder="Descrição"
      bind:value={description}
      class="mb-3 form-control"
      required
    />
    <input
      type="number"
      name="price"
      id="price"
      placeholder="Preço"
      bind:value={price}
      class="mb-3"
      required
    />
    <div>
      <input
        type="text"
        name="tag"
        id="tag"
        placeholder="Tag"
        bind:value={tag}
        class="mb-3"
      />
      <div class="w-100 d-flex justify-content-end">
        <button on:click|preventDefault={addTag} class="btn btn-primary mb-2"
          >Adicionar tag</button
        >
      </div>
    </div>
    <div class="mb-3">
      {#each tags as productTag, index}
        <span
          >{productTag}
          <span>
            <button
              on:click|preventDefault={() => removeTag(index)}
              class="btn btn-danger btn-remove"
              ><img src={xImg} alt="remove tag" class="img-remove" /></button
            >
          </span>,
        </span>
      {/each}
    </div>
    <div>
      <input
        type="file"
        accept="image/*"
        on:change={imageSelect}
        class="mb-2 form-control"
      />
      <input
        type="text"
        placeholder="Descrição da foto"
        bind:value={image.description}
      />
      <div class="w-100 d-flex justify-content-end">
        <button
          type="button"
          on:click|preventDefault={addImage}
          class="btn btn-primary my-2">Adicionar imagem</button
        >
      </div>
    </div>
    <div class="my-2">
      {#each images as productImage, index}
        <div class="mr-2">
          <img
            src={productImage.image}
            alt={productImage.description}
            width="280"
            height="280"
            style="object-fit: cover;"
          />
          <button
            on:click|preventDefault={() => removeImage(index)}
            class="btn btn-danger btn-remove"
            ><img src={xImg} alt="remove imagem" /></button
          >
        </div>
      {/each}
    </div>
    <div class="w-100 d-flex justify-content-end">
      <button type="submit" class="btn btn-submit">Cadastrar produto</button>
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

  .btn-remove {
    width: 32px;
    height: 32px;
    display: inline-flex;
    justify-content: center;
    align-items: center;
  }
</style>
