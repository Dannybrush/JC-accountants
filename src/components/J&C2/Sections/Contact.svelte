<script lang="ts">
  let name = '';
  let email = '';
  let message = '';

  function handleSubmit() {
    // For real usage, replace this with a fetch to a backend or service
    alert(`Thank you, ${name}. We'll be in touch soon!`);
    name = email = message = '';
  }
</script>

<section id="contact" class="contact">
  <h2>Contact Us</h2>
  <p>Have a question or want to get started? Fill out the form below.</p>

  <form on:submit|preventDefault={handleSubmit}>
    <input type="text" placeholder="Your Name" bind:value={name} required />
    <input type="email" placeholder="Your Email" bind:value={email} required />
    <textarea placeholder="Your Message" bind:value={message} required></textarea>
    <button type="submit">Send Message</button>
  </form>
</section>

<style>
  .contact {
    padding: 5rem 2rem;
    background: #fafafa;
    text-align: center;
  }

  .contact h2 {
    font-size: 2.5rem;
    color: var(--brand-color);
    margin-bottom: 1rem;
  }

  .contact p {
    font-size: 1.1rem;
    margin-bottom: 2.5rem;
    color: #444;
  }

  form {
    max-width: 600px;
    margin: 0 auto;
    display: grid;
    gap: 1.2rem;
  }

  input, textarea {
    padding: 1rem;
    border: 1px solid #ccc;
    border-radius: 6px;
    font-size: 1rem;
    width: 100%;
  }

  textarea {
    resize: vertical;
    min-height: 150px;
  }

  button {
    background-color: var(--brand-color);
    color: white;
    border: none;
    padding: 1rem 2rem;
    font-size: 1rem;
    border-radius: 6px;
    cursor: pointer;
    transition: background 0.3s ease;
  }

  button:hover {
    background-color: #4e0e12;
  }
</style>
