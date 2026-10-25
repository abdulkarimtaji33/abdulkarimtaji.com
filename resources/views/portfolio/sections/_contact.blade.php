<section id="contact" class="block contact">
    <div class="contact-glow" aria-hidden="true"></div>
    <div class="wrap">
        <p class="eyebrow reveal"><span class="dot"></span>Contact</p>
        <h2 class="contact-title reveal">Let's build something <em>great.</em></h2>
        <p class="body reveal">{{ $profile['contact_lead'] }}</p>

        <div class="contact-actions reveal">
            <button type="button" class="btn btn-primary magnetic" data-copy="{{ $profile['email'] }}" data-label="Email copied"><i class="fas fa-envelope" aria-hidden="true"></i><span>{{ $profile['email'] }}</span><i class="far fa-copy" aria-hidden="true"></i></button>
            @foreach($profile['phones'] as $ph)
            <button type="button" class="btn btn-ghost magnetic" data-copy="{{ $ph['number'] }}" data-label="Number copied"><i class="fas fa-phone" aria-hidden="true"></i><span>{{ $ph['display'] }}</span><small class="btn-tag">{{ $ph['label'] }}</small><i class="far fa-copy" aria-hidden="true"></i></button>
            @endforeach
            <a href="{{ $profile['linkedin'] }}" target="_blank" rel="noopener" class="btn btn-ghost magnetic"><i class="fab fa-linkedin" aria-hidden="true"></i><span>LinkedIn</span></a>
        </div>
        <p class="contact-note reveal"><a href="mailto:{{ $profile['email'] }}">Prefer your mail app? Open it directly.</a></p>
    </div>
</section>
