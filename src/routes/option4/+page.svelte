<script lang="ts">
    import type { PageData } from './$types';
    import { Header, Hero, About, Services, Testimonials, Footer, Contact, Navbar } from '$components/J&C2';
    import '$lib/styles/J&C2.css';

    let { data }: { data: PageData } = $props();
</script>

<Navbar />
<Hero />
<About />
<Services />
<Testimonials />
<Footer />
<Contact/> 