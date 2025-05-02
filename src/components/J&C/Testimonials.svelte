<script>

  const testimonials = [
    {
      name: "Sarah L.",
      company: "Lighthouse Retail Ltd",
      quote:
        "J&C Accountants have been a game-changer for our business. Their expertise and proactive advice helped us save thousands last year!"
    },
    {
      name: "James H.",
      company: "Freelance Consultant",
      quote:
        "Incredibly responsive and professional. Their personal touch makes all the difference. I wouldn’t go anywhere else for financial advice."
    },
    {
      name: "Clare M.",
      company: "Crescendo Events",
      quote:
        "Reliable, efficient, and always on top of things. J&C Accountants made the audit process painless and smooth."
    }
  ];
</script>


<style>
  .testimonials {
    background-color: #fafafa;
    padding: 5rem 2rem;
    border-top: 5px solid var(--primary-color);
    text-align: center;
  }

  .container {
    max-width: 900px;
    margin: 0 auto;
  }

  h2 {
    font-size: 2.5rem;
    color: var(--primary-color);
    margin-bottom: 2.5rem;
  }

  .testimonial-card {
    background: white;
    padding: 2.5rem;
    border-radius: var(--border-radius);
    box-shadow: 0 8px 24px rgba(0, 0, 0, 0.08);
    font-style: italic;
    max-width: 700px;
    margin: 0 auto;
  }

  .quote {
    font-size: 1.25rem;
    color: #333;
    margin-bottom: 1.5rem;
  }

  .author {
    font-size: 1.1rem;
    font-style: normal;
    font-weight: 500;
    color: #555;
  }

  .company {
    color: var(--primary-color);
    font-weight: 600;
  }

  :global(.carousel__indicators) {
    margin-top: 2rem;
  }

  :global(.carousel__indicator) {
    background-color: #ccc;
  }

  :global(.carousel__indicator--active) {
    background-color: var(--primary-color);
  }
</style>
