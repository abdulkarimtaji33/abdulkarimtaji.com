<section id="about" class="block">
    <div class="wrap">
        <div class="about-grid">
            <figure class="portrait reveal">
                <div class="portrait-frame">
                    <img src="{{ asset($profile['portrait']) }}" alt="Portrait of {{ $profile['name'] }}" width="640" height="640" loading="lazy" data-parallax>
                </div>
                <figcaption class="portrait-badge"><b>{{ $stats[0]['value'] }}{{ $stats[0]['suffix'] }}</b> years building<br>full-stack &amp; Ai systems</figcaption>
            </figure>

            <div class="about-copy">
                <p class="eyebrow reveal"><span class="dot"></span>About</p>
                <h2 class="h2 reveal">{{ $profile['about_lead'] }}</h2>
                @foreach($profile['about'] as $p)
                <p class="body reveal">{!! preg_replace('/\*\*(.+?)\*\*/', '<strong>$1</strong>', e($p)) !!}</p>
                @endforeach
            </div>
        </div>

        <ul class="stats" aria-label="Career highlights">
            @foreach($stats as $s)
            <li class="stat reveal">
                <span class="stat-n" data-count="{{ $s['value'] }}" data-suffix="{{ $s['suffix'] }}">{{ $s['value'] }}{{ $s['suffix'] }}</span>
                <span class="stat-l">{{ $s['label'] }}</span>
            </li>
            @endforeach
        </ul>
    </div>
</section>
