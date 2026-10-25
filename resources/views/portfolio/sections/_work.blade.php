<section id="work" class="block work">
    <div class="wrap">
        <div class="section-head">
            <p class="eyebrow reveal"><span class="dot"></span>Selected work</p>
            <h2 class="h2 reveal">Projects that shipped, and stayed shipped.</h2>
            <p class="body reveal">A curated set of platforms delivered across fintech, travel, real estate and AI.</p>
        </div>
    </div>

    @if($featuredProjects->count())
    <div class="work-pin" id="workPin">
        <div class="work-track" id="workTrack">
            @foreach($featuredProjects as $i => $project)
            <article class="slide">
                <div class="slide-media">
                    <img src="{{ $project->image }}" alt="{{ $project->name }}" loading="lazy" width="960" height="540">
                </div>
                <div class="slide-body">
                    <span class="slide-n">{{ str_pad($i + 1, 2, '0', STR_PAD_LEFT) }}<i>/{{ str_pad($featuredProjects->count(), 2, '0', STR_PAD_LEFT) }}</i></span>
                    <span class="tag">{{ $project->category }}</span>
                    <h3>{{ $project->name }}</h3>
                    <p>{{ $project->description }}</p>
                    @if($project->url && $project->url !== '#')
                    <a href="{{ $project->url }}" class="link" target="_blank" rel="noopener">View project <i class="fas fa-arrow-up-right-from-square" aria-hidden="true"></i></a>
                    @else
                    <span class="muted"><i class="fas fa-mobile-screen" aria-hidden="true"></i> Mobile app, demo on request</span>
                    @endif
                </div>
            </article>
            @endforeach
        </div>
        <div class="work-progress" aria-hidden="true"><i id="workBar"></i></div>
    </div>
    @endif
</section>
