


<footer class="footer">
    <div class="container">
      <div class="branding">
        <img src="../JC/logo.png" alt="J&C Accountants logo" />
       
      </div>

      <div class="links">
        <a href="#about">About</a>
        <a href="#services">Services</a>
        <a href="#testimonials">Testimonials</a>
        <a href="#contact">Contact</a>
      </div>
      <p class="copyright">
        &copy; {new Date().getFullYear()} J&C Accountants. All rights reserved.
      </p>
    </div>
  </footer>
  
  <style>
    .footer {
      background-color: var(--brand-color);
      color: #fff;
      padding: 3rem 2rem 2rem;
      text-align: center;
    }
  
    .footer .container {
      max-width: 1000px;
      margin: 0 auto;
    }
  
    .branding {
      display: flex;
      align-items: center;
      justify-content: center;
      gap: 1rem;
      margin-bottom: 1.5rem;
    }
  
    .branding img {
      height: 150px;
    }
  
    .branding span {
      font-weight: bold;
      font-size: 1.3rem;
    }
  
    .links {
      margin-bottom: 1rem;
    }
  
    .links a {
      margin: 0 1rem;
      color: #fff;
      text-decoration: none;
      font-size: 0.95rem;
    }
  
    .links a:hover {
      text-decoration: underline;
    }
  
    .copyright {
      font-size: 0.85rem;
      color: #eee;
    }
  </style>
  