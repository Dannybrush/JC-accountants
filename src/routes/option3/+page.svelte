<script lang="ts">
    import type { PageData } from './$types';
    import {Header, Hero, AboutUs, Services, Testimonials, Footer} from '$components/J&C';
    import '$styles/J&C.css';
    import Carousel from '$components/J&C2/Carousel.svelte'

    let { data }: { data: PageData } = $props();

    let headerLinks = [
      { href: '/services', text: 'Services' },
      { href: '/about', text: 'About Us' },
      { href: '/contact', text: 'Contact' }
    ];
  
    let socialLinks = [
      { href: 'https://facebook.com', text: 'Facebook' },
      { href: 'https://linkedin.com', text: 'LinkedIn' }
    ];

</script>

  
  <Header {headerLinks} />
  <Hero />
  <AboutUs />
  <Services />
  <Carousel/>
  <Footer {socialLinks} />

  