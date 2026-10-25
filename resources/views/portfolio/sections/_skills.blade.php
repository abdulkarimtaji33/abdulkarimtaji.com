<section id="skills" class="block">
    <div class="wrap">
        <div class="section-head">
            <p class="eyebrow reveal"><span class="dot"></span>Technical expertise</p>
            <h2 class="h2 reveal">A full-spectrum toolkit.</h2>
            <p class="body reveal">From backend architecture to the pixels people touch, one consistent standard across the stack.</p>
        </div>

        <div class="bento">
            @foreach($skillGroups as $g)
            <article class="card bento-{{ $g['size'] }} reveal spot">
                <div class="card-head">
                    <span class="icon"><i class="fas {{ $g['icon'] }}" aria-hidden="true"></i></span>
                    <h3>{{ $g['title'] }}</h3>
                </div>
                <p class="card-sum">{{ $g['summary'] }}</p>
                <ul class="chips">
                    @foreach(($skills[$g['id']] ?? []) as $s)
                    <li>
                        <button type="button" class="skill" data-fact="{{ $s['fact'] }}" aria-label="{{ $s['label'] }}: {{ $s['fact'] }}">{{ $s['label'] }}</button>
                    </li>
                    @endforeach
                </ul>
                <p class="fact" aria-live="polite"></p>
            </article>
            @endforeach
        </div>
    </div>
</section>
