<footer class="footer">
    <div class="wrap footer-in">
        <div>
            <p class="footer-name">{{ $profile['name'] }}</p>
            <p class="footer-sub">{{ $profile['role'] }} · {{ $profile['address'] }}</p>
        </div>
        <div class="footer-links">
            <a href="{{ $profile['linkedin'] }}" target="_blank" rel="noopener" aria-label="LinkedIn"><i class="fab fa-linkedin-in" aria-hidden="true"></i></a>
            <a href="mailto:{{ $profile['email'] }}" aria-label="Email"><i class="fas fa-envelope" aria-hidden="true"></i></a>
            @foreach($profile['phones'] as $ph)
            <a href="tel:{{ $ph['number'] }}" aria-label="Call {{ $ph['label'] }} number {{ $ph['display'] }}" title="{{ $ph['display'] }}"><i class="fas fa-phone" aria-hidden="true"></i></a>
            @endforeach
            <a href="#home" class="to-top" aria-label="Back to top"><i class="fas fa-arrow-up" aria-hidden="true"></i></a>
        </div>
    </div>
    <p class="wrap footer-copy">&copy; {{ date('Y') }} {{ $profile['name'] }}. Crafted with <i class="fas fa-heart" aria-hidden="true"></i> in Dubai.</p>
</footer>
