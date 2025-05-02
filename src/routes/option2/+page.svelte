<!-- J&C Accountants +page.svelte -->
<script lang="ts">

	import { onMount } from 'svelte';

	// Mobile menu toggle
	let isMenuOpen = $state(false);

	function toggleMenu() {
		isMenuOpen = !isMenuOpen;
	}

	// Testimonial slider
	let currentSlide = $state(0);
	const totalSlides = 3;

	function nextSlide() {
		currentSlide = (currentSlide + 1) % totalSlides;
	}

	function prevSlide() {
		currentSlide = (currentSlide - 1 + totalSlides) % totalSlides;
	}

	$effect(() => {
		const slidesEl = document.querySelector('.testimonial-slides');
		if (slidesEl) {
			slidesEl.style.transform = `translateX(-${currentSlide * 100}%)`;
		}
	});

	// Smooth scrolling for navigation
	function scrollToSection(e: Event) {
		e.preventDefault();
		const target = e.target as HTMLAnchorElement;
		const targetId = target.getAttribute('href')?.substring(1);
		const targetSection = document.getElementById(targetId || '');

		if (targetSection) {
			window.scrollTo({
				top: targetSection.offsetTop - 80,
				behavior: 'smooth'
			});

			if (isMenuOpen) {
				isMenuOpen = false;
			}
		}
	}

	// Initialize
	onMount(() => {
		// Add event listeners to nav links
		const navLinks = document.querySelectorAll('.nav-link');
		navLinks.forEach((link) => {
			link.addEventListener('click', scrollToSection);
		});

		// Highlight active section on scroll
		const sections = document.querySelectorAll('section');

		window.addEventListener('scroll', () => {
			let current = '';

			sections.forEach((section) => {
				const sectionTop = section.offsetTop;
				const sectionHeight = section.clientHeight;

				if (window.scrollY >= sectionTop - 100) {
					current = section.getAttribute('id') || '';
				}
			});

			navLinks.forEach((link) => {
				link.classList.remove('active');
				if (link.getAttribute('href')?.substring(1) === current) {
					link.classList.add('active');
				}
			});
		});
	});
</script>

<svelte:head>
	<title>J&C Accountants | Professional Accounting Services in Reading, UK</title>
	<meta
		name="description"
		content="J&C Accountants provides comprehensive accounting and tax services to businesses and individuals in Reading and across the UK"
	/>
	<link
		rel="stylesheet"
		href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css"
	/>
</svelte:head>

<!-- Header -->
<header>
	<div class="header-container container">
		<div class="logo">
			<div class="logo-text">J&C Accountants</div>
		</div>
		<nav>
			<ul class="nav-menu" class:active={isMenuOpen}>
				<li><a href="#home" class="nav-link">Home</a></li>
				<li><a href="#services" class="nav-link">Services</a></li>
				<li><a href="#about" class="nav-link">About Us</a></li>
				<li><a href="#why-choose" class="nav-link">Why Choose Us</a></li>
				<li><a href="#testimonials" class="nav-link">Testimonials</a></li>
				<li><a href="#contact" class="nav-link">Contact</a></li>
			</ul>
			<button class="mobile-menu-btn" on:click={toggleMenu}>
				<i class="fas" class:fa-bars={!isMenuOpen} class:fa-times={isMenuOpen}></i>
			</button>
		</nav>
	</div>
</header>

<!-- Hero Section -->
<section id="home" class="hero">
	<div class="container">
		<div class="hero-content">
			<p class="hero-tagline">Professional Accounting Services</p>
			<h1 class="hero-heading">Expert Financial Solutions for Your Business</h1>
			<p class="hero-text">
				J&C Accountants provides comprehensive accounting and tax services to businesses and
				individuals in Reading and across the UK. We're committed to excellence and personalized
				service.
			</p>
			<div class="hero-btns">
				<a href="#contact" class="btn">Get in Touch</a>
				<a href="#services" class="btn btn-secondary">Our Services</a>
			</div>
		</div>
	</div>
</section>

<!-- Services Section -->
<section id="services" class="services">
	<div class="container">
		<div class="section-header">
			<h2>Our Services</h2>
			<p>We offer a wide range of accounting and financial services tailored to your needs</p>
		</div>
		<div class="services-grid">
			<div class="service-card">
				<div class="service-icon">
					<i class="fas fa-chart-line"></i>
				</div>
				<h3 class="service-title">Financial Planning</h3>
				<p>
					Comprehensive financial planning to help you achieve your business goals and secure your
					future.
				</p>
			</div>
			<div class="service-card">
				<div class="service-icon">
					<i class="fas fa-coins"></i>
				</div>
				<h3 class="service-title">Tax Advisory</h3>
				<p>
					Strategic tax planning and compliance services to minimize your tax liability while
					ensuring full compliance.
				</p>
			</div>
			<div class="service-card">
				<div class="service-icon">
					<i class="fas fa-calculator"></i>
				</div>
				<h3 class="service-title">Bookkeeping</h3>
				<p>
					Accurate and efficient bookkeeping services to keep your financial records organized and
					up-to-date.
				</p>
			</div>
			<div class="service-card">
				<div class="service-icon">
					<i class="fas fa-file-invoice"></i>
				</div>
				<h3 class="service-title">Payroll Services</h3>
				<p>
					Comprehensive payroll management to ensure your employees are paid accurately and on time.
				</p>
			</div>
			<div class="service-card">
				<div class="service-icon">
					<i class="fas fa-briefcase"></i>
				</div>
				<h3 class="service-title">Business Advisory</h3>
				<p>
					Expert advice and guidance to help your business grow and succeed in a competitive market.
				</p>
			</div>
			<div class="service-card">
				<div class="service-icon">
					<i class="fas fa-balance-scale"></i>
				</div>
				<h3 class="service-title">Audit & Assurance</h3>
				<p>
					Thorough audit and assurance services to verify the accuracy of your financial statements.
				</p>
			</div>
		</div>
	</div>
</section>

<!-- About Section -->
<section id="about" class="about">
	<div class="about-container container">
		<div class="about-content">
			<h2>About J&C Accountants</h2>
			<p>
				Founded in 2010, J&C Accountants has established itself as a trusted financial partner for
				businesses and individuals in Reading and beyond. Our team of qualified accountants and
				financial experts brings decades of combined experience to provide you with the highest
				quality services.
			</p>
			<p>
				We believe in building long-term relationships with our clients, understanding their unique
				needs, and delivering tailored solutions that add real value to their financial well-being.
			</p>
			<p>
				Our mission is to simplify the complex world of accounting and taxation, empowering our
				clients to make informed financial decisions with confidence.
			</p>
			<a href="#contact" class="btn">Contact Us</a>
		</div>
		<div class="about-image">
			<img src="/JC/thedingles.webp" alt="J&C Accountants Team" />
		</div>
	</div>
</section>

<!-- Why Choose Us Section -->
<section id="why-choose" class="why-choose">
	<div class="container">
		<div class="section-header">
			<h2>Why Choose J&C Accountants</h2>
			<p>Here's what sets us apart from other accounting firms</p>
		</div>
		<div class="features-grid">
			<div class="feature-card">
				<div class="feature-icon">
					<i class="fas fa-user-tie"></i>
				</div>
				<h3>Experienced Team</h3>
				<p>
					Our team of certified accountants brings decades of experience across various industries.
				</p>
			</div>
			<div class="feature-card">
				<div class="feature-icon">
					<i class="fas fa-handshake"></i>
				</div>
				<h3>Personalized Service</h3>
				<p>
					We take the time to understand your specific needs and tailor our services accordingly.
				</p>
			</div>
			
			<div class="feature-card">
				<div class="feature-icon">
					<i class="fas fa-shield-alt"></i>
				</div>
				<h3>Reliability & Trust</h3>
				<p>We maintain the highest standards of integrity, confidentiality, and professionalism.</p>
			</div>
		</div>
	</div>
</section>

<!-- Testimonials Section -->
<section id="testimonials" class="testimonials">
	<div class="container">
		<div class="section-header">
			<h2>Client Testimonials</h2>
			<p>Here's what our clients say about working with us</p>
		</div>
		<div class="testimonials-slider">
			<div class="testimonial-slides">
				<div class="testimonial-slide">
					<div class="testimonial-content">
						<p>
							J&C Accountants has transformed how we manage our finances. Their proactive approach
							and attention to detail have saved us both time and money. I couldn't recommend them
							more highly.
						</p>
					</div>
					<div class="testimonial-author">
						<div class="author-avatar">
							<img src="/JC/Sarah.webp" alt="Sarah Johnson" />
						</div>
						<div class="author-info">
							<h4>Sarah Johnson</h4>
							<p>CEO, Johnson Retail Ltd</p>
						</div>
					</div>
				</div>
				<div class="testimonial-slide">
					<div class="testimonial-content">
						<p>
							As a small business owner, I was struggling with tax compliance until I found J&C
							Accountants. They simplified everything and found tax savings I never knew existed.
							Their team is professional and always available when I need them.
						</p>
					</div>
					<div class="testimonial-author">
						<div class="author-avatar">
							<img src="/JC/fred.webp" alt="David Williams" />
						</div>
						<div class="author-info">
							<h4>David Williams</h4>
							<p>Owner, Williams Design Studio</p>
						</div>
					</div>
				</div>
				<div class="testimonial-slide">
					<div class="testimonial-content">
						<p>
							I've been working with J&C Accountants for over five years now, and they consistently
							exceed my expectations. Their financial advice has been instrumental in growing my
							business, and their personalized service makes me feel valued as a client.
						</p>
					</div>
					<div class="testimonial-author">
						<div class="author-avatar">
							<img src="/JC/emma.jpg" alt="Emma Thompson" />
						</div>
						<div class="author-info">
							<h4>Emma Thompson</h4>
							<p>Director, Thompson Consulting</p>
						</div>
					</div>
				</div>
			</div>
			<div class="slider-controls">
				<button class="slider-btn" on:click={prevSlide}>
					<i class="fas fa-chevron-left"></i>
				</button>
				<button class="slider-btn" on:click={nextSlide}>
					<i class="fas fa-chevron-right"></i>
				</button>
			</div>
		</div>
	</div>
</section>

<!-- Contact Section -->
<section id="contact" class="contact">
	<div class="container">
		<div class="section-header">
			<h2>Contact Us</h2>
			<p>Get in touch with our team of experts</p>
		</div>
		<div class="contact-container">
			<div class="contact-info">
				<h3>Let's Discuss Your Financial Needs</h3>
				<p>
					Whether you need help with tax planning, bookkeeping, or financial advisory, our team is
					ready to assist you. Contact us today to schedule a consultation.
				</p>
				<div class="contact-details">
					<div class="contact-item">
						<div class="contact-icon">
							<i class="fas fa-map-marker-alt"></i>
						</div>
						<div>
							<h4>Office Address</h4>
							<p>123 Kings Road, Reading, RG1 3AB, United Kingdom</p>
						</div>
					</div>
					<div class="contact-item">
						<div class="contact-icon">
							<i class="fas fa-phone"></i>
						</div>
						<div>
							<h4>Phone Number</h4>
							<p>+44 (0)118 123 4567</p>
						</div>
					</div>
					<div class="contact-item">
						<div class="contact-icon">
							<i class="fas fa-envelope"></i>
						</div>
						<div>
							<h4>Email Address</h4>
							<p>info@jc-accountants.co.uk</p>
						</div>
					</div>
					<div class="contact-item">
						<div class="contact-icon">
							<i class="fas fa-clock"></i>
						</div>
						<div>
							<h4>Business Hours</h4>
							<p>Monday - Friday: 9:00 AM - 5:30 PM</p>
							<p>Saturday & Sunday: Closed</p>
						</div>
					</div>
				</div>
				<div class="map">
					<iframe
						src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d19902.19598332906!2d-0.9944539418393993!3d51.45489697952879!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x48769b7ce0561ddd%3A0xd5c4850114583f60!2sReading%2C%20UK!5e0!3m2!1sen!2sus!4v1651254294807!5m2!1sen!2sus"
						width="100%"
						height="300"
						style="border:0;"
						allowfullscreen=""
						loading="lazy"
						referrerpolicy="no-referrer-when-downgrade"
					></iframe>
				</div>
			</div>
			<div class="contact-form">
				<h3>Send Us a Message</h3>
				<form>
					<div class="form-group">
						<input type="text" class="form-control" placeholder="Your Name" required />
					</div>
					<div class="form-group">
						<input type="email" class="form-control" placeholder="Your Email" required />
					</div>
					<div class="form-group">
						<input type="text" class="form-control" placeholder="Subject" />
					</div>
					<div class="form-group">
						<textarea class="form-control" placeholder="Your Message" required></textarea>
					</div>
					<button type="submit" class="btn">Send Message</button>
				</form>
			</div>
		</div>
	</div>
</section>

<!-- Footer -->
<footer class="footer">
	<div class="footer-container container">
		<div class="footer-about">
			<div class="footer-logo">J&C Accountants</div>
			<p>
				Professional accounting services for businesses and individuals in Reading and across the
				UK. We're dedicated to providing expert financial solutions tailored to your needs.
			</p>
			<div class="social-icons">
				<a href="#" class="social-icon"><i class="fab fa-facebook-f"></i></a>
				<a href="#" class="social-icon"><i class="fab fa-twitter"></i></a>
				<a href="#" class="social-icon"><i class="fab fa-linkedin-in"></i></a>
				<a href="#" class="social-icon"><i class="fab fa-instagram"></i></a>
			</div>
		</div>
		<div class="footer-links">
			<h3>Quick Links</h3>
			<ul>
				<li><a href="#home">Home</a></li>
				<li><a href="#services">Our Services</a></li>
				<li><a href="#about">About Us</a></li>
				<li><a href="#why-choose">Why Choose Us</a></li>
				<li><a href="#testimonials">Testimonials</a></li>
				<li><a href="#contact">Contact Us</a></li>
			</ul>
		</div>
		<div class="footer-links">
			<h3>Our Services</h3>
			<ul>
				<li><a href="#services">Financial Planning</a></li>
				<li><a href="#services">Tax Advisory</a></li>
				<li><a href="#services">Bookkeeping</a></li>
				<li><a href="#services">Payroll Services</a></li>
				<li><a href="#services">Business Advisory</a></li>
				<li><a href="#services">Audit & Assurance</a></li>
			</ul>
		</div>
	</div>
	<div class="copyright">
		<div class="container">
			<p>&copy; 2025 J&C Accountants. All Rights Reserved.</p>
		</div>
	</div>
</footer>

<style>
:root {
    --primary-color: rgb(92, 21, 26);
    --primary-light: rgba(92, 21, 26, 0.1);
    --primary-dark: rgb(72, 11, 16);
    --accent-color: #d4b062; /* New gold accent color */
    --text-color: #333333;
    --text-light: #666666;
    --light-bg: #f9f9f9;
    --white: #ffffff;
    --grey: #f0f0f0;
    --dark-grey: #555555;
    --section-padding: 6rem 2rem; /* Increased vertical padding */
    --transition: all 0.3s ease-in-out;
    --shadow: 0 5px 15px rgba(0, 0, 0, 0.08);
    --rounded: 8px; /* Standardized border radius */
  }
  
  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }
  
  :global(body) {
    font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
    line-height: 1.7; /* Improved line spacing */
    color: var(--text-color);
    overflow-x: hidden; /* Prevent horizontal scrolling */
  }
  
  a {
    text-decoration: none;
    color: inherit;
  }
  
  h1, h2, h3, h4 {
    margin-bottom: 1.5rem;
    font-weight: 600;
    line-height: 1.3; /* Improved line height for headings */
    color: #222; /* Darker heading color for better contrast */
  }
  
  h1 {
    font-size: 2.75rem; /* Slightly larger */
    letter-spacing: -0.5px; /* Tighter letter spacing for headings */
  }
  
  h2 {
    font-size: 2.25rem;
    position: relative;
    padding-bottom: 1rem; /* Increased padding */
  }
  
  h2:after {
    content: '';
    position: absolute;
    bottom: 0;
    left: 0;
    width: 70px; /* Slightly wider line */
    height: 3px;
    background-color: var(--primary-color);
  }
  
  h3 {
    font-size: 1.5rem;
  }
  
  p {
    margin-bottom: 1.2rem;
    color: var(--text-light);
  }
  
  .container {
    max-width: 1280px; /* Slightly wider container */
    margin: 0 auto;
    padding: 0 2rem; /* Increased horizontal padding */
  }
  
  .btn {
    display: inline-block;
    padding: 0.9rem 2.2rem; /* Slightly larger padding */
    background-color: var(--primary-color);
    color: var(--white);
    border: none;
    border-radius: var(--rounded);
    font-weight: 600;
    letter-spacing: 0.5px; /* Added letter spacing */
    cursor: pointer;
    transition: var(--transition);
    box-shadow: 0 4px 10px rgba(92, 21, 26, 0.2); /* Added subtle shadow */
  }
  
  .btn:hover {
    background-color: var(--primary-dark);
    transform: translateY(-3px);
    box-shadow: 0 6px 15px rgba(92, 21, 26, 0.3); /* Enhanced shadow on hover */
  }
  
  .btn-secondary {
    background-color: transparent;
    border: 2px solid var(--primary-color);
    color: var(--primary-color);
    box-shadow: none;
  }
  
  .btn-secondary:hover {
    background-color: var(--primary-color);
    color: var(--white);
    box-shadow: 0 6px 15px rgba(92, 21, 26, 0.3);
  }
  
  /* Header */
  header {
    position: fixed;
    top: 0;
    width: 100%;
    background-color: var(--white); /* Fixed missing background color */
    box-shadow: 0 2px 15px rgba(0, 0, 0, 0.07); /* Enhanced shadow */
    z-index: 1000;
    padding: 1.2rem 0; /* Increased padding */
    transition: all 0.3s ease;
  }
  
  .header-container {
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
  
  .logo {
    display: flex;
    align-items: center;
  }
  
  .logo-text {
    font-size: 2rem; /* Larger logo text */
    font-weight: 700;
    color: var(--primary-color);
    letter-spacing: -0.5px; /* Tighter letter spacing */
    transition: var(--transition);
  }
  
  .logo-text:hover {
    transform: scale(1.03); /* Subtle hover effect */
  }
  
  .nav-menu {
    display: flex;
    gap: 2.5rem; /* Increased gap */
    list-style: none;
  }
  
  .nav-link {
    font-weight: 500;
    transition: var(--transition);
    position: relative;
    padding: 0.5rem 0; /* Added padding for better click target */
    font-size: 1.05rem; /* Slightly larger font */
  }
  
  .nav-link:hover {
    color: var(--primary-color);
  }
  
  .nav-link:after {
    content: '';
    position: absolute;
    bottom: -2px;
    left: 0;
    width: 0;
    height: 2px;
    background-color: var(--primary-color);
    transition: var(--transition);
  }
  
  .nav-link:hover:after,
  .nav-link.active:after {
    width: 100%;
  }
  
  .nav-link.active {
    color: var(--primary-color);
    font-weight: 600; /* Bolder active link */
  }
  
  .mobile-menu-btn {
    display: none;
    font-size: 1.5rem;
    background: none;
    border: none;
    cursor: pointer;
    color: var(--primary-color);
  }
  
  /* Hero Section */
  .hero {
    background-color: var(--light-bg);
    padding: 12rem 0 8rem; /* Increased padding */
    position: relative;
    overflow: hidden;
  }
  
  .hero:before {
    content: '';
    position: absolute;
    top: 0;
    right: 0;
    width: 55%; /* Slightly wider background element */
    height: 100%;
    background-color: var(--primary-light);
    clip-path: polygon(25% 0, 100% 0, 100% 100%, 0% 100%); /* Modified clip path */
  }
  
  .hero-content {
    max-width: 650px; /* Slightly wider content */
    position: relative;
    z-index: 1;
  }
  
  .hero-tagline {
    font-size: 1.3rem; /* Larger tagline */
    color: var(--primary-color);
    margin-bottom: 1rem;
    font-weight: 600;
    position: relative;
    display: inline-block;
    padding-left: 1rem;
  }
  
  .hero-tagline:before {
    content: '';
    position: absolute;
    left: 0;
    top: 50%;
    width: 3px;
    height: 1.5rem;
    background-color: var(--accent-color);
    transform: translateY(-50%);
  }
  
  .hero-heading {
    font-size: 3.8rem; /* Larger heading */
    margin-bottom: 1.5rem;
    line-height: 1.2;
    letter-spacing: -1px; /* Tighter letter spacing */
  }
  
  .hero-text {
    font-size: 1.15rem;
    margin-bottom: 2.5rem; /* More space before buttons */
    color: var(--text-light);
    max-width: 90%; /* Constrain width slightly */
  }
  
  .hero-btns {
    display: flex;
    gap: 1.2rem; /* Increased gap */
  }
  
  /* Services Section */
  .services {
    padding: var(--section-padding);
    background-color: var(--white);
  }
  
  .section-header {
    text-align: center;
    margin-bottom: 4rem; /* Increased spacing */
    max-width: 800px;
    margin-left: auto;
    margin-right: auto;
  }
  
  .section-header p {
    font-size: 1.1rem; /* Larger description text */
    color: var(--text-light);
  }
  
  .section-header h2:after {
    left: 50%;
    transform: translateX(-50%);
    width: 80px; /* Wider center line */
  }
  
  .services-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(300px, 1fr)); /* Wider cards */
    gap: 2.5rem; /* Increased gap */
  }
  
  .service-card {
    background-color: var(--white);
    padding: 2.5rem 2rem; /* Increased padding */
    border-radius: var(--rounded);
    transition: var(--transition);
    text-align: center;
    border: 1px solid var(--grey); /* Added subtle border */
    box-shadow: 0 5px 25px rgba(0, 0, 0, 0.03); /* Very subtle shadow by default */
  }
  
  .service-card:hover {
    transform: translateY(-12px);
    box-shadow: var(--shadow);
    border-color: transparent; /* Hide border on hover */
  }
  
  .service-icon {
    font-size: 2.8rem; /* Larger icon */
    color: var(--primary-color);
    margin-bottom: 1.8rem; /* More space after icon */
    transition: var(--transition);
  }
  
  .service-card:hover .service-icon {
    transform: scale(1.1); /* Icon grows on hover */
  }
  
  .service-title {
    font-size: 1.4rem;
    margin-bottom: 1rem;
    font-weight: 600;
  }
  
  /* About Section */
  .about {
    padding: var(--section-padding);
    background-color: var(--light-bg);
    position: relative;
    overflow: hidden;
  }
  
  .about:before {
    content: '';
    position: absolute;
    left: 0;
    top: 0;
    width: 30%;
    height: 100%;
    background-color: rgba(92, 21, 26, 0.03); /* Very subtle background accent */
    clip-path: polygon(0 0, 100% 0, 70% 100%, 0 100%);
  }
  
  .about-container {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 5rem; /* Increased gap */
    align-items: center;
    position: relative;
    z-index: 1;
  }
  
  .about-content h2 {
    font-size: 2.5rem; /* Larger heading */
  }
  
  .about-content h2:after {
    left: 0;
    width: 70px; /* Wider line */
  }
  
  .about-content p {
    font-size: 1.05rem;
    margin-bottom: 1.5rem;
  }
  
  .about-content .btn {
    margin-top: 1rem; /* Added space before button */
  }
  
  .about-image {
    overflow: hidden;
    border-radius: var(--rounded);
    box-shadow: 0 15px 35px rgba(0, 0, 0, 0.15); /* Enhanced shadow */
    position: relative;
  }
  
  .about-image:before {
    content: '';
    position: absolute;
    top: -20px;
    right: -20px;
    width: 100px;
    height: 100px;
    border-radius: 50%;
    background-color: rgba(92, 21, 26, 0.1); /* Decorative element */
    z-index: -1;
  }
  
  .about-image img {
    width: 100%;
    height: auto;
    display: block;
    transition: var(--transition);
  }
  
  .about-image:hover img {
    transform: scale(1.05);
  }
  
  /* Why Choose Us */
  .why-choose {
    padding: var(--section-padding);
    background-color: var(--white);
  }
  
  .features-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(300px, 1fr)); /* Wider cards */
    gap: 2.5rem; /* Increased gap */
  }
  
  .feature-card {
    padding: 2.5rem; /* Increased padding */
    border-radius: var(--rounded);
    border-left: 4px solid var(--primary-color); /* Thicker border */
    background-color: var(--light-bg);
    transition: var(--transition);
    box-shadow: 0 5px 15px rgba(0, 0, 0, 0.03); /* Subtle shadow by default */
  }
  
  .feature-card:hover {
    transform: translateY(-8px);
    box-shadow: var(--shadow);
    border-left-color: var(--accent-color); /* Border changes color on hover */
  }
  
  .feature-icon {
    font-size: 2.2rem;
    color: var(--primary-color);
    margin-bottom: 1.5rem;
    transition: var(--transition);
  }
  
  .feature-card:hover .feature-icon {
    color: var(--accent-color); /* Icon changes color on hover */
    transform: scale(1.1); /* Icon grows on hover */
  }
  
  .feature-card h3 {
    font-size: 1.4rem;
    margin-bottom: 1rem;
  }
  
  /* Testimonials */
  .testimonials {
    padding: var(--section-padding);
    background-color: var(--light-bg);
    position: relative;
    overflow: hidden;
  }
  
  .testimonials:before {
    content: '';
    position: absolute;
    right: 0;
    bottom: 0;
    width: 25%;
    height: 40%;
    background-color: rgba(92, 21, 26, 0.05); /* Decorative background element */
    border-radius: 50% 0 0 0;
  }
  
  .testimonials-slider {
    margin-top: 3rem;
    overflow: hidden;
    position: relative;
  }
  
  .testimonial-slides {
    display: flex;
    transition: transform 0.6s ease-in-out;
  }
  
  .testimonial-slide {
    min-width: 100%;
    padding: 3rem; /* Increased padding */
    background-color: var(--white);
    border-radius: var(--rounded);
    box-shadow: var(--shadow);
  }
  
  .testimonial-content {
    position: relative;
    padding: 1.5rem 1rem 1.5rem 2.5rem; /* Adjusted padding */
    font-style: italic;
    line-height: 1.8;
    color: var(--text-light);
    font-size: 1.1rem; /* Larger testimonial text */
  }
  
  .testimonial-content:before {
    content: '\201C';
    font-size: 5rem; /* Larger quote mark */
    position: absolute;
    top: -30px;
    left: -10px;
    color: rgba(92, 21, 26, 0.15);
    font-family: Georgia, serif;
  }
  
  .testimonial-author {
    display: flex;
    align-items: center;
    margin-top: 1.8rem; /* More space above author */
  }
  
  .author-avatar {
    width: 60px; /* Larger avatar */
    height: 60px;
    border-radius: 50%;
    margin-right: 1.2rem;
    overflow: hidden;
    border: 3px solid var(--light-bg); /* Added border */
    box-shadow: 0 3px 10px rgba(0, 0, 0, 0.1); /* Subtle shadow */
  }
  
  .author-avatar img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
  
  .author-info h4 {
    margin-bottom: 0.2rem;
    font-weight: 700;
  }
  
  .author-info p {
    color: var(--text-light);
    font-size: 0.9rem;
    margin: 0;
  }
  
  .slider-controls {
    display: flex;
    justify-content: center;
    margin-top: 2.5rem; /* More space above controls */
    gap: 1.2rem; /* Increased gap */
  }
  
  .slider-btn {
    width: 48px; /* Larger buttons */
    height: 48px;
    border-radius: 50%;
    background-color: var(--white);
    border: 2px solid var(--primary-color);
    color: var(--primary-color);
    cursor: pointer;
    transition: var(--transition);
    display: flex;
    align-items: center;
    justify-content: center;
    box-shadow: 0 3px 8px rgba(92, 21, 26, 0.1); /* Subtle shadow */
  }
  
  .slider-btn:hover {
    background-color: var(--primary-color);
    color: var(--white);
    transform: translateY(-3px); /* Slight lift on hover */
    box-shadow: 0 5px 15px rgba(92, 21, 26, 0.2); /* Enhanced shadow */
  }
  
  /* Contact Section */
  .contact {
    padding: var(--section-padding);
    background-color: var(--white);
  }
  
  .contact-container {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 4rem;
  }
  
  .contact-info {
    padding-right: 2rem;
  }
  
  .contact-info h3 {
    font-size: 1.8rem; /* Larger heading */
    margin-bottom: 1.5rem;
    color: #222;
  }
  
  .contact-details {
    margin-top: 2.5rem; /* More space */
  }
  
  .contact-item {
    display: flex;
    margin-bottom: 2rem; /* More space between items */
    align-items: flex-start;
  }
  
  .contact-icon {
    font-size: 1.2rem;
    color: var(--primary-color);
    margin-right: 1.2rem;
    min-width: 3rem; /* Larger icon area */
    height: 3rem;
    display: flex;
    align-items: center;
    justify-content: center;
    background-color: var(--primary-light);
    border-radius: 50%;
    transition: var(--transition);
  }
  
  .contact-item:hover .contact-icon {
    background-color: var(--primary-color);
    color: var(--white);
    transform: scale(1.1); /* Grow icon on hover */
  }
  
  .contact-item h4 {
    margin-bottom: 0.5rem;
    font-weight: 600;
    color: #222;
  }
  
  .contact-item p {
    margin-bottom: 0.25rem;
    color: var(--text-light);
  }
  
  .map {
    margin-top: 2.5rem;
    border-radius: var(--rounded);
    overflow: hidden;
    box-shadow: var(--shadow);
    border: 5px solid var(--white); /* Added border around map */
  }
  
  /* Contact Form */
  .contact-form {
    background-color: var(--light-bg);
    padding: 3rem; /* Increased padding */
    border-radius: var(--rounded);
    box-shadow: var(--shadow);
    position: relative;
    overflow: hidden;
  }
  
  .contact-form:before {
    content: '';
    position: absolute;
    top: -50px;
    right: -50px;
    width: 100px;
    height: 100px;
    background-color: rgba(92, 21, 26, 0.05); /* Decorative element */
    border-radius: 50%;
    z-index: 0;
  }
  
  .contact-form h3 {
    margin-bottom: 2rem;
    color: #222;
    font-size: 1.8rem; /* Larger heading */
    position: relative;
    z-index: 1;
  }
  
  .form-group {
    margin-bottom: 1.8rem; /* More space between form groups */
    position: relative;
    z-index: 1;
  }
  
  .form-control {
    width: 100%;
    padding: 1.2rem; /* Larger input fields */
    border: 1px solid #e0e0e0;
    border-radius: var(--rounded);
    font-size: 1rem;
    transition: var(--transition);
    background-color: var(--white); /* Explicitly white background */
  }
  
  .form-control:focus {
    border-color: var(--primary-color);
    box-shadow: 0 0 0 3px rgba(92, 21, 26, 0.1);
    outline: none;
  }
  
  textarea.form-control {
    height: 170px; /* Taller textarea */
    resize: none;
  }
  
  .contact-form .btn {
    width: 100%;
    padding: 1.2rem; /* Larger button */
    font-size: 1.1rem;
    margin-top: 0.5rem;
    position: relative;
    z-index: 1;
  }
  
  /* Footer */
  .footer {
    padding-top: 5rem; /* More top padding */
    background-color: var(--primary-color);
    color: #ffffff;
    position: relative;
  }
  
  .footer:before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 10px;
    background: linear-gradient(90deg, 
      var(--primary-color) 0%, 
      var(--accent-color) 50%,
      var(--primary-color) 100%
    ); /* Decorative top border */
    opacity: 0.5;
  }
  
  .footer-container {
    display: grid;
    grid-template-columns: 2fr 1fr 1fr;
    gap: 4rem; /* Increased gap */
    padding-bottom: 3.5rem; /* More bottom padding */
  }
  
  .footer-about {
    padding-right: 2.5rem; /* More padding */
  }
  
  .footer-logo {
    font-size: 1.8rem;
    font-weight: 700;
    margin-bottom: 1.5rem; /* More space below logo */
    color: #ffffff;
  }
  
  .footer-about p {
    margin-bottom: 1.5rem;
    color: rgba(255, 255, 255, 0.85);
    line-height: 1.6;
    font-size: 1rem;
  }
  
  .social-icons {
    display: flex;
    gap: 1rem; /* Increased gap */
  }
  
  .social-icon {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 40px; /* Larger icons */
    height: 40px;
    background-color: rgba(255, 255, 255, 0.1);
    border-radius: var(--rounded);
    color: #ffffff;
    font-size: 1rem;
    transition: var(--transition);
  }
  
  .social-icon:hover {
    background-color: var(--accent-color); /* Gold accent on hover */
    color: var(--primary-dark);
    transform: translateY(-3px);
  }
  
  .footer-links h3 {
    font-size: 1.3rem;
    font-weight: 600;
    margin-bottom: 1.5rem;
    color: #ffffff;
    position: relative;
    padding-bottom: 0.8rem;
  }
  
  .footer-links h3:after {
    content: '';
    position: absolute;
    left: 0;
    bottom: 0;
    width: 50px; /* Wider line */
    height: 2px;
    background-color: rgba(255, 255, 255, 0.3);
  }
  
  .footer-links ul {
    list-style: none;
    padding: 0;
    margin: 0;
  }
  
  .footer-links li {
    margin-bottom: 0.8rem; /* More space between links */
  }
  
  .footer-links a {
    color: rgba(255, 255, 255, 0.85);
    text-decoration: none;
    transition: var(--transition);
    font-size: 1rem;
    position: relative;
    padding-left: 15px; /* More padding */
    display: inline-block; /* Better hover area */
  }
  
  .footer-links a:before {
    content: '›';
    position: absolute;
    left: 0;
    color: rgba(255, 255, 255, 0.5);
    transition: var(--transition);
  }
  
  .footer-links a:hover {
    color: #ffffff;
    padding-left: 20px;
  }
  
  .footer-links a:hover:before {
    color: var(--accent-color); /* Gold accent on hover */
  }
  
  .copyright {
    padding: 1.5rem 0; /* More padding */
    border-top: 1px solid rgba(255, 255, 255, 0.1);
    text-align: center;
    font-size: 0.95rem;
  }
  
  .copyright p {
    margin: 0;
    color: rgba(255, 255, 255, 0.75);
  }
  
  /* Responsive Design */
  @media (max-width: 1200px) {
    :root {
      --section-padding: 5rem 2rem;
    }
    
    h1 {
      font-size: 2.5rem;
    }
    
    h2 {
      font-size: 2rem;
    }
    
    .hero-heading {
      font-size: 3.2rem;
    }
  }
  
  @media (max-width: 992px) {
    .about-container,
    .contact-container {
      grid-template-columns: 1fr;
      gap: 3rem;
    }
    
    .about-image {
      grid-row: 1;
      max-width: 600px;
      margin: 0 auto;
    }
    
    .about-content {
      text-align: center;
    }
    
    .about-content h2:after {
      left: 50%;
      transform: translateX(-50%);
    }
    
    .contact-info {
      padding-right: 0;
    }
    
    .footer-container {
      grid-template-columns: repeat(2, 1fr);
      gap: 3rem;
    }
    
    .footer-about {
      grid-column: 1 / -1;
      padding-right: 0;
      margin-bottom: 1rem;
    }
    
    .hero:before {
      width: 100%;
      clip-path: polygon(0 0, 100% 0, 100% 100%, 0 100%);
      opacity: 0.05;
    }
  }
  
  @media (max-width: 768px) {
    :root {
      --section-padding: 4rem 1.5rem;
    }
    
    .header-container {
      padding: 0 1rem;
    }
    
    .nav-menu {
      position: fixed;
      top: 80px;
      left: -100%;
      width: 100%;
      height: calc(100vh - 80px);
      background-color: var(--white);
      flex-direction: column;
      align-items: center;
      justify-content: center;
      gap: 2rem;
      transition: var(--transition);
      box-shadow: 0 10px 20px rgba(0, 0, 0, 0.1);
      padding: 2rem 0;
    }
    
    .nav-menu.active {
      left: 0;
    }
    
    .mobile-menu-btn {
      display: block;
    }
    
    .hero {
      padding: 8rem 0 5rem;
      text-align: center;
    }
    
    .hero-content {
      margin: 0 auto;
    }
    
    .hero-tagline:before {
      display: none;
    }
    
    .hero-text {
      max-width: 100%;
    }
    
    .hero-btns {
      justify-content: center;
    }
    
    .services-grid,
    .features-grid {
      grid-template-columns: 1fr;
      max-width: 500px;
      margin: 0 auto;
    }
    
    .section-header {
      margin-bottom: 3rem;
    }
    
    .footer-container {
      grid-template-columns: 1fr;
      text-align: center;
    }
    
    .footer-links h3:after {
      left: 50%;
      transform: translateX(-50%);
    }
    
    .social-icons {
      justify-content: center;
    }
    
    .footer-links a {
      padding-left: 0;
    }
    
    .footer-links a:before {
      display: none;
    }
    
    .footer-links a:hover {
      padding-left: 0;
    }
  }
  
  @media (max-width: 576px) {
    .hero-heading {
      font-size: 2.5rem;
    }
    
    .hero-btns {
      flex-direction: column;
      gap: 1rem;
      width: 100%;
      max-width: 300px;
      margin: 0 auto;
    }
    
    .btn {
      width: 100%;
      text-align: center;
    }
    
    .contact-form {
      padding: 2rem;
    }
    
    .testimonial-slide {
      padding: 2rem;
    }
    
    h2 {
      font-size: 1.8rem;
    }
  }
 </style>