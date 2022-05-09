<script>
  export let img, i, number;
  let vNum = number % i;
  function checkVNumGallery(num) {
    if (num === 2) {
      return "gallery__item--v-2";
    } else if (num === 3) {
      return "gallery__item--h-2 gallery__item--v-3";
    }
    return "";
  }

  function checkVNumEmbed(num) {
    if (num === 2) {
      return "embed--1-2";
    } else if (num === 3) {
      return "embed--2-3";
    }
    return "";
  }
</script>

<div class={`gallery__item ${checkVNumGallery(vNum)}`}>
  <div class={`embed  ${checkVNumEmbed(vNum)}`}>
    <img src={img.largeImageURL} alt={img.tags} />
  </div>
</div>

<style>
</style>
