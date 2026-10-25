@if($otherProjects->count())
<section id="projects" class="block block-tight">
    <div class="wrap">
        <div class="section-head">
            <p class="eyebrow reveal"><span class="dot"></span>More projects</p>
            <h2 class="h2 reveal">The wider portfolio.</h2>
        </div>

        @if($categories->count() > 1)
        <div class="filters reveal" role="group" aria-label="Filter projects">
            <button type="button" class="pill is-on" data-filter="all" aria-pressed="true">All <small>{{ $otherProjects->count() }}</small></button>
            @foreach($categories as $c)
            <button type="button" class="pill" data-filter="{{ $c }}" aria-pressed="false">{{ $c }}</button>
            @endforeach
        </div>
        @endif

        <div class="grid" id="projectGrid">
            @foreach($otherProjects as $project)
            <article class="pcard reveal" data-cat="{{ $project->category }}">
                <div class="pcard-media"><img src="{{ $project->image_url }}" alt="{{ $project->name }}" loading="lazy" width="480" height="300"></div>
                <div class="pcard-body">
                    <span class="tag">{{ $project->category }}</span>
                    <h3>{{ $project->name }}</h3>
                    <p>{{ $project->description }}</p>
                </div>
            </article>
            @endforeach
        </div>
    </div>
</section>
@endif
