<script>
  import Images from "./Images.svelte";
  import { onMount } from "svelte";
  import { scrollDown } from "./utils/scroll_down";

  let photos = [];
  let apiData = [];
  let searchText = "";
  let searchResult = "";
  let errorText = "";
  let page = 1;
  let loading = false;
  let y;
  let viewPortHeight;
  let viewPortHeight2;

  $: if (searchText) {
    photos = [];
    apiData = [];
    errorText = "";
  }

  $: if (apiData) {
    photos.splice(photos.length, 0, ...apiData);
  }

  // $: if (y > viewPortHeight) {
  //   handleClick();
  // }

  onMount(async () => {
    await getImages();
  });

  async function getImages() {
    loading = true;
    const res = await fetch(
      `https://pixabay.com/api/?key=${
        process.env.API_KEY
      }&q=${encodeURIComponent(searchText)}&page=${page}&per_page=20`
    );
    if (res.ok) {
      const data = await res.json();
      searchResult = searchText;
      loading = false;
      apiData = data.hits;
      if (apiData.length === 0) {
        errorText = `We didn't find what you are looking for`;
      }
    } else {
      errorText = "Something went wrong... Please try again";
    }
    loading = false;
    return [];
  }

  async function handleClick() {
    page += 1;
    await getImages();
  }
</script>

<main bind:offsetHeight={viewPortHeight2}>
  <h1>Pixabay</h1>
  <form class="center" on:submit|preventDefault={getImages}>
    <label for="search" style="margin-right: 20px">Search</label>
    <input id="search" type="text" bind:value={searchText} />
  </form>
  <!-- <div style="position: sticky; top: 0;z-index: 1000">
    {y}
    {viewPortHeight}
    {viewPortHeight2}
  </div> -->
  <p class="error">{errorText.length ? errorText : ""}</p>
  {#if !loading && photos.length}
    <p>
      {searchResult.length
        ? `Showing ${photos.length} result for ${searchResult}`
        : ""}
    </p>
    <div use:scrollDown class="gallery">
      {#each photos as img, i (img.views)}
        <Images {img} {i} number={img.views} />
      {/each}
    </div>
  {/if}
  <div class="center">
    <button on:click={handleClick}>Load more</button>
  </div>
</main>

<svelte:window bind:scrollY={y} bind:innerHeight={viewPortHeight} />

<style>
  h1 {
    color: #ff3e00;
    text-transform: uppercase;
    font-size: 4em;
    font-weight: 100;
  }
  .center {
    display: flex;
    align-items: baseline;
    justify-content: center;
  }
  .error {
    color: #ff3e00;
  }

  @media (min-width: 640px) {
    main {
      max-width: none;
    }
  }
</style>
