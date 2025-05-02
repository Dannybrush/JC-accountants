<script>
  let slides = [
    { image: '/J&C/hero.webp', caption: 'Slide 1' },
    { image: '/placeholder-team-pic_small.jpg', caption: 'Slide 2' },
    { image: '/VetPracticePlaceholder.jpg', caption: 'Slide 3' },
  ];
  let currentIndex = 0;

  const nextSlide = () => {
    currentIndex = (currentIndex + 1) % slides.length;
  };

  const prevSlide = () => {
    currentIndex = (currentIndex - 1 + slides.length) % slides.length;
  };

  const goToSlide = (index) => {
    currentIndex = index;
  };
</script>

<style>
  .carousel {
    position: relative;
    width: 100%;
    max-width: 600px;
    margin: auto;
    overflow: hidden;
  }

  .carousel-container {
    display: flex;
    transition: transform 0.5s ease-in-out;
  }

  .carousel-slide {
    min-width: 100%;
    transition: opacity 0.5s ease-in-out;
  }

  .carousel img {
    width: 100%;
    display: block;
    border-radius: 10px;
  }

  .caption {
    position: absolute;
    bottom: 10px;
    left: 20px;
    font-size: 18px;
    color: white;
    background: rgba(0, 0, 0, 0.5);
    padding: 5px;
    border-radius: 5px;
  }

  .carousel-button {
    position: absolute;
    top: 50%;
    transform: translateY(-50%);
    background: rgba(0, 0, 0, 0.5);
    color: white;
    padding: 10px;
    border: none;
    cursor: pointer;
    font-size: 24px;
  }

  .prev {
    left: 10px;
  }

  .next {
    right: 10px;
  }

  .dot-container {
    text-align: center;
    position: absolute;
    bottom: 10px;
    width: 100%;
  }

  .dot {
    display: inline-block;
    width: 10px;
    height: 10px;
    margin: 0 5px;
    background-color: rgba(0, 0, 0, 0.5);
    border-radius: 50%;
    cursor: pointer;
  }

  .active {
    background-color: white;
  }
</style>

<div class="carousel">
  <div class="carousel-container" style="transform: translateX(-{currentIndex * 100}%)">
    {#each slides as slide, index}
      <div class="carousel-slide">
        <img src={slide.image} alt={slide.caption} />
        <div class="caption">{slide.caption}</div>
      </div>
    {/each}
  </div>

  <button class="carousel-button prev" on:click={prevSlide}>&lt;</button>
  <button class="carousel-button next" on:click={nextSlide}>&gt;</button>

  <div class="dot-container">
    {#each slides as _, index}
      <span
        class="dot {index === currentIndex ? 'active' : ''}"
        on:click={() => goToSlide(index)}
      ></span>
    {/each}
  </div>
</div>
