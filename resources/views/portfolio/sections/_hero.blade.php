<section id="home" class="hero">
    <div class="hero-poster" aria-hidden="true"></div>
    <canvas class="hero-canvas" id="heroCanvas" aria-hidden="true"></canvas>
    <div class="hero-vignette" aria-hidden="true"></div>

    <div class="wrap hero-inner">
        <p class="eyebrow" data-hero="up"><span class="dot"></span>{{ $profile['role'] }} · {{ $profile['location'] }}</p>
        <h1 class="hero-title" aria-label="{{ implode(' ', $profile['headline']) }}">
            @foreach($profile['headline'] as $i => $line)
            <span class="line"><span class="line-in" data-hero="line">{{ $line }}</span></span>
            @endforeach
        </h1>
        <p class="hero-lead" data-hero="up">{{ $profile['lead'] }}</p>
        <div class="hero-actions" data-hero="up">
            <a href="#work" class="btn btn-primary magnetic"><span>View my work</span><i class="fas fa-arrow-right" aria-hidden="true"></i></a>
            <a href="#contact" class="btn btn-ghost magnetic"><span>Let's talk</span></a>
        </div>
        <div class="hero-chips" data-hero="up">
            <span class="chip"><i class="fas fa-clock" aria-hidden="true"></i> Dubai <b id="dubaiTime">--:--</b></span>
            <span class="chip chip-live"><i class="live" aria-hidden="true"></i> {{ $profile['availability'] }}</span>
        </div>
    </div>

    <a href="#about" class="scroll-cue" aria-label="Scroll to about"><span></span></a>
</section>
