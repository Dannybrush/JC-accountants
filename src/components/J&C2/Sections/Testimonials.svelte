<script lang="ts">
    import Carousel from '../Carousel.svelte';
  
    const testimonials = [
      {
        name: "Samantha Lee",
        role: "Small Business Owner",
        text: "J&C Accountants have been an essential part of my business growth. Their attention to detail and responsiveness is unmatched."
      },
      {
        name: "Daniel Clarke",
        role: "Freelance Developer",
        text: "The financial advice and VAT management I’ve received has been top-notch. They make accounting painless!"
      },
      {
        name: "Rebecca White",
        role: "Managing Director",
        text: "Reliable, professional, and always ahead of deadlines. I highly recommend J&C for any financial services."
      }
    ];
  </script>
  
  <section id="testimonials" class="testimonials">
    <h2>What Our Clients Say</h2>
    <Carousel items={testimonials}>
      <div slot="item" let:item>
        <blockquote>
          <p>"{item.quote}"</p>
          <footer>{item.name}, {item.title}</footer>
        </blockquote>
      </div>
    </Carousel>
  </section>
  
  <style>
    .testimonials {
      padding: 5rem 2rem;
      background: var(--bg-light);
      text-align: center;
    }
  
    h2 {
      color: var(--brand-color);
      font-size: 2rem;
      margin-bottom: 2rem;
    }
  </style>
  