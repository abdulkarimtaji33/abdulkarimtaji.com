<section id="work" class="block work">
    <div class="wrap">
        <div class="section-head">
            <p class="eyebrow reveal"><span class="dot"></span>Selected work</p>
            <h2 class="h2 reveal">Projects that shipped, and stayed shipped.</h2>
            <p class="body reveal">A curated set of platforms delivered across fintech, travel, real estate and Ai.</p>
        </div>
    </div>

    @if($featuredProjects->count())
    @php($total = str_pad($featuredProjects->count(), 2, '0', STR_PAD_LEFT))
    <div class="stack" id="stack">
        <aside class="stack-rail" aria-label="Featured projects">
            <p class="rail-count"><b id="railN">01</b><span>/{{ $total }}</span></p>
            <p class="rail-name" id="railName" aria-live="polite">{{ $featuredProjects[0]->name }}</p>
            <ul class="rail-dots">
                @foreach($featuredProjects as $i => $project)
                <li><button type="button" class="rail-dot {{ $i === 0 ? 'is-on' : '' }}" data-go="{{ $i }}" data-name="{{ $project->name }}" aria-label="Show {{ $project->name }}"></button></li>
                @endforeach
            </ul>
        </aside>

        <div class="stack-list" id="stackList">
            @foreach($featuredProjects as $i => $project)
            <div class="stack-item" style="--i: {{ $i }}">
                <article class="slide">
                    <div class="slide-media">
                        <img src="{{ $project->image_url }}" alt="{{ $project->name }}" loading="lazy" width="960" height="540">
                    </div>
                    <div class="slide-body">
                        <span class="slide-n">{{ str_pad($i + 1, 2, '0', STR_PAD_LEFT) }}<i>/{{ $total }}</i></span>
                        <span class="tag">{{ $project->category }}</span>
                        <h3>{{ $project->name }}</h3>
                        <p data-type>{{ $project->description }}</p>
                        @if($project->url && $project->url !== '#')
                        <a href="{{ $project->url }}" class="link" target="_blank" rel="noopener">View project <i class="fas fa-arrow-up-right-from-square" aria-hidden="true"></i></a>
                        @elseif($project->url === '#')
                        <span class="muted"><i class="fas fa-mobile-screen" aria-hidden="true"></i> Mobile app, demo on request</span>
                        @endif
                    </div>
                </article>
            </div>
            @endforeach
        </div>
    </div>
    @endif
</section>
