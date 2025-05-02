<script lang="ts">
    // Header logic can be added here if needed
  </script>
  
  <header>
    <div class="logo">
      <img src="JC/logo.png" 
      alt="J&C Logo" 
      class="logo-img"  
      />
      <a href="/" >J&C Accountants</a>
    </div>
    <nav>
      <ul>
        <li><a href="#services">Services</a></li>
        <li><a href="#about">About Us</a></li>
        <li><a href="#testimonials">Testimonials</a></li>
        <li><a href="#contact">Contact</a></li>
      </ul>
    </nav>
  </header>
  
  <style>
    header {
      background-color: var(--primary-color);
      padding: 1.5rem 2rem;
      display: flex;
      justify-content: space-between;
      align-items: center;
      box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
    }
    .logo {
        font-family: 'Playfair Display', serif;
      display: flex;
      justify-content: space-around;
      align-items: center;
      gap: 2rem;
    }   
  
    .logo a {
      color: white;
      font-size: 2.2rem;
      font-weight: 600;
      letter-spacing: 1px;
    }
    .logo-img {
      width: 150px;
      height: 150px;
      margin-left: 10px;
    }
  
    nav ul {
      display: flex;
      gap: 1.5rem;
    }
  
    nav a {
      color: white;
      font-weight: 500;
      text-transform: uppercase;
      letter-spacing: 1px;
    }
  
    nav a:hover {
      border-bottom: 2px solid white;
      padding-bottom: 3px;
    }
  </style>
  