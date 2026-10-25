<section id="experience" class="block">
    <div class="wrap">
        <div class="section-head">
            <p class="eyebrow reveal"><span class="dot"></span>Professional journey</p>
            <h2 class="h2 reveal">Where I've built.</h2>
            <p class="body reveal">A track record across financial platforms, AI products and full-stack teams.</p>
        </div>

        <ol class="timeline" id="timeline">
            <span class="tl-line" aria-hidden="true"><i id="tlFill"></i></span>
            @foreach($companies as $c)
            <li class="tl-item {{ $c['current'] ? 'is-current' : '' }} reveal">
                <span class="tl-dot" aria-hidden="true"></span>
                <article class="card spot">
                    <div class="tl-top">
                        <span class="tl-period">{{ $c['period'] }}</span>
                        @if($c['current'])<span class="badge">Current</span>@endif
                    </div>
                    <h3>{{ $c['role'] }}</h3>
                    <p class="tl-company"><i class="fas fa-building" aria-hidden="true"></i> {{ $c['name'] }}@if($c['place']), {{ $c['place'] }}@endif</p>
                    <p>{{ $c['blurb'] }}</p>
                    <ul class="chips chips-sm">
                        @foreach($c['tags'] as $t)<li><span>{{ $t }}</span></li>@endforeach
                    </ul>
                </article>
            </li>
            @endforeach
        </ol>
    </div>
</section>
