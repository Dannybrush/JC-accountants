<script lang="ts">
    const services = [
      {
        icon: "📊",
        title: "Tax Planning",
        description: "Strategic advice to optimise your tax position."
      },
      {
        icon: "💼",
        title: "Business Accounting",
        description: "Comprehensive bookkeeping and business accounts."
      },
      {
        icon: "📈",
        title: "Financial Forecasting",
        description: "Plan and grow with detailed financial models."
      },
      {
        icon: "🧾",
        title: "VAT & Payroll",
        description: "Manage your VAT returns and payroll with ease."
      }
    ];
  </script>
  
  <section id="services" class="services">
    <h2>Our Services</h2>
    <div class="grid">
      {#each services as s}
        <div class="card">
          <div class="icon">{s.icon}</div>
          <h3>{s.title}</h3>
          <p>{s.description}</p>
        </div>
      {/each}
    </div>
  </section>
  
  <style>
    .services {
      padding: 5rem 2rem;
      text-align: center;
    }
  
    h2 {
      color: var(--brand-color);
      font-size: 2rem;
      margin-bottom: 2rem;
    }
  
    .grid {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
      gap: 2rem;
    }
  
    .card {
      background: white;
      border-radius: var(--border-radius);
      box-shadow: 0 4px 12px rgba(0,0,0,0.05);
      padding: 2rem;
      transition: transform var(--transition);
    }
  
    .card:hover {
      transform: translateY(-5px);
    }
  
    .icon {
      font-size: 2.5rem;
      margin-bottom: 1rem;
      color: var(--brand-color);
    }
  
    h3 {
      margin: 0.5rem 0;
      font-size: 1.3rem;
    }
  
    p {
      font-size: 1rem;
      color: #555;
    }
  </style>
  