<script lang="ts">
    const links = ['About', 'Services', 'Testimonials'];
  </script>
  
  <nav class="navbar">
    <div class="logo">
      <img src="/../JC/logo.png" alt="J&C Accountants Logo" />
    </div>
    <ul>
      {#each links as link}
        <li><a href={"#" + link.toLowerCase()}>{link}</a></li>
      {/each}
    </ul>
  </nav>
  
  <style>
    .navbar {
      position: fixed;
      top: 0;
      width: 100%;
      background: var(--brand-color);
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding: 1rem 2rem;
      z-index: 999;
    }
  
    .logo img {
      height: 100px;
    }
  
    ul {
      display: flex;
      gap: 1.5rem;
      list-style: none;
    }
  
    a {
      color: white;
      text-decoration: none;
      font-weight: 500;
    }
  
    a:hover {
      text-decoration: underline;
    }
  </style>
  