<!-- J&C Accountants +page.svelte -->
<script lang="ts">
	//import { $state, $effect } from 'svelte';
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
			<img src="/placeholder-team.jpg" alt="J&C Accountants Team" />
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
					<i class="fas fa-laptop"></i>
				</div>
				<h3>Modern Solutions</h3>
				<p>
					We leverage the latest technology and methodologies to provide efficient and effective
					services.
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
							<img src="/placeholder-avatar-1.jpg" alt="Sarah Johnson" />
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
							<img src="/placeholder-avatar-2.jpg" alt="David Williams" />
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
							<img src="/placeholder-avatar-3.jpg" alt="Emma Thompson" />
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
						allowfullscreen=""
						loading="lazy"
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
		--text-color: #333;
		--light-bg: #f8f8f8;
		--white: #ffffff;
		--grey: #f0f0f0;
		--dark-grey: #555;
		--section-padding: 5rem 2rem;
		--transition: all 0.3s ease;
	}

	* {
		margin: 0;
		padding: 0;
		box-sizing: border-box;
	}

	:global(body) {
		font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
		line-height: 1.6;
		color: var(--text-color);
	}

	a {
		text-decoration: none;
		color: inherit;
	}

	h1,
	h2,
	h3,
	h4 {
		margin-bottom: 1.5rem;
		font-weight: 600;
		line-height: 1.2;
	}

	h1 {
		font-size: 2.5rem;
	}

	h2 {
		font-size: 2rem;
		position: relative;
		padding-bottom: 0.5rem;
	}

	h2:after {
		content: '';
		position: absolute;
		bottom: 0;
		left: 0;
		width: 60px;
		height: 3px;
		background-color: var(--primary-color);
	}

	p {
		margin-bottom: 1rem;
	}

	.container {
		max-width: 1200px;
		margin: 0 auto;
		padding: 0 1rem;
	}

	.btn {
		display: inline-block;
		padding: 0.8rem 2rem;
		background-color: var(--primary-color);
		color: var(--white);
		border: none;
		border-radius: 4px;
		font-weight: 600;
		cursor: pointer;
		transition: var(--transition);
	}

	.btn:hover {
		background-color: var(--primary-dark);
		transform: translateY(-3px);
	}

	.btn-secondary {
		background-color: transparent;
		border: 2px solid var(--primary-color);
		color: var(--primary-color);
	}

	.btn-secondary:hover {
		background-color: var(--primary-color);
		color: var(--white);
	}

	/* Header */
	header {
		position: fixed;
		top: 0;
		width: 100%;
		background-color: var(--white);
		box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
		z-index: 1000;
		padding: 1rem 0;
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
		font-size: 1.8rem;
		font-weight: 700;
		color: var(--primary-color);
	}

	.nav-menu {
		display: flex;
		gap: 2rem;
	}

	.nav-link {
		font-weight: 500;
		transition: var(--transition);
		position: relative;
	}

	.nav-link:hover {
		color: var(--primary-color);
	}

	.nav-link:after {
		content: '';
		position: absolute;
		bottom: -5px;
		left: 0;
		width: 0;
		height: 2px;
		background-color: var(--primary-color);
		transition: var(--transition);
	}

	.nav-link:hover:after {
		width: 100%;
	}

	.mobile-menu-btn {
		display: none;
		font-size: 1.5rem;
		background: none;
		border: none;
		cursor: pointer;
	}

	/* Hero Section */
	.hero {
		background-color: var(--light-bg);
		padding: 10rem 0 6rem;
		position: relative;
		overflow: hidden;
	}

	.hero:before {
		content: '';
		position: absolute;
		top: 0;
		right: 0;
		width: 50%;
		height: 100%;
		background-color: var(--primary-light);
		clip-path: polygon(30% 0, 100% 0, 100% 100%, 0% 100%);
	}

	.hero-content {
		max-width: 600px;
		position: relative;
		z-index: 1;
	}

	.hero-tagline {
		font-size: 1.2rem;
		color: var(--primary-color);
		margin-bottom: 1rem;
	}

	.hero-heading {
		font-size: 3.5rem;
		margin-bottom: 1.5rem;
		line-height: 1.2;
	}

	.hero-text {
		font-size: 1.1rem;
		margin-bottom: 2rem;
	}

	/* Services Section */
	.services {
		padding: var(--section-padding);
		background-color: var(--white);
	}

	.section-header {
		text-align: center;
		margin-bottom: 3rem;
	}

	.section-header h2:after {
		left: 50%;
		transform: translateX(-50%);
	}

	.services-grid {
		display: grid;
		grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
		gap: 2rem;
	}

	.service-card {
		background-color: var(--light-bg);
		padding: 2rem;
		border-radius: 8px;
		transition: var(--transition);
		text-align: center;
	}

	.service-card:hover {
		transform: translateY(-10px);
		box-shadow: 0 10px 20px rgba(0, 0, 0, 0.1);
	}

	.service-icon {
		font-size: 2.5rem;
		color: var(--primary-color);
		margin-bottom: 1.5rem;
	}

	.service-title {
		font-size: 1.3rem;
		margin-bottom: 1rem;
	}

	/* About Section */
	.about {
		padding: var(--section-padding);
		background-color: var(--light-bg);
	}

	.about-container {
		display: grid;
		grid-template-columns: 1fr 1fr;
		gap: 4rem;
		align-items: center;
	}

	.about-content h2:after {
		left: 0;
	}

	.about-image {
		overflow: hidden;
		border-radius: 8px;
		box-shadow: 0 10px 30px rgba(0, 0, 0, 0.1);
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
		grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
		gap: 2rem;
	}

	.feature-card {
		padding: 2rem;
		border-radius: 8px;
		border-left: 3px solid var(--primary-color);
		background-color: var(--light-bg);
		transition: var(--transition);
	}

	.feature-card:hover {
		transform: translateY(-5px);
		box-shadow: 0 10px 20px rgba(0, 0, 0, 0.05);
	}

	.feature-icon {
		font-size: 2rem;
		color: var(--primary-color);
		margin-bottom: 1rem;
	}

	/* Testimonials */
	.testimonials {
		padding: var(--section-padding);
		background-color: var(--light-bg);
	}

	.testimonials-slider {
		margin-top: 2rem;
		overflow: hidden;
		position: relative;
	}

	.testimonial-slides {
		display: flex;
		transition: transform 0.5s ease;
	}

	.testimonial-slide {
		min-width: 100%;
		padding: 2rem;
		background-color: var(--white);
		border-radius: 8px;
		box-shadow: 0 5px 15px rgba(0, 0, 0, 0.05);
	}

	.testimonial-content {
		position: relative;
		padding: 1.5rem;
		font-style: italic;
	}

	.testimonial-content:before {
		content: '\201C';
		font-size: 4rem;
		position: absolute;
		top: -20px;
		left: -10px;
		color: var(--primary-light);
		font-family: Georgia, serif;
	}

	.testimonial-author {
		display: flex;
		align-items: center;
		margin-top: 1.5rem;
	}

	.author-avatar {
		width: 50px;
		height: 50px;
		border-radius: 50%;
		margin-right: 1rem;
		overflow: hidden;
	}

	.author-avatar img {
		width: 100%;
		height: 100%;
		object-fit: cover;
	}

	.author-info h4 {
		margin-bottom: 0.2rem;
	}

	.author-info p {
		color: var(--dark-grey);
		font-size: 0.9rem;
		margin: 0;
	}

	.slider-controls {
		display: flex;
		justify-content: center;
		margin-top: 2rem;
		gap: 1rem;
	}

	.slider-btn {
		width: 40px;
		height: 40px;
		border-radius: 50%;
		background-color: var(--white);
		border: 1px solid var(--primary-color);
		color: var(--primary-color);
		cursor: pointer;
		transition: var(--transition);
		display: flex;
		align-items: center;
		justify-content: center;
	}

	.slider-btn:hover {
		background-color: var(--primary-color);
		color: var(--white);
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

	.contact-details {
		margin-top: 2rem;
	}

	.contact-item {
		display: flex;
		align-items: flex-start;
		margin-bottom: 1.5rem;
	}

	.contact-icon {
		color: var(--primary-color);
		font-size: 1.2rem;
		margin-right: 1rem;
		margin-top: 0.2rem;
	}

	.contact-form {
		background-color: var(--light-bg);
		padding: 2rem;
		border-radius: 8px;
	}

	.form-group {
		margin-bottom: 1.5rem;
	}

	.form-control {
		width: 100%;
		padding: 0.8rem 1rem;
		border: 1px solid;
	}
</style>
