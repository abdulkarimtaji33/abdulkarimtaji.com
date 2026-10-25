<section class="marquee" aria-label="Technologies">
    @foreach($marquee as $r => $row)
    <div class="marquee-row {{ $r % 2 ? 'rev' : '' }}" @if($r > 0) aria-hidden="true" @endif>
        <div class="marquee-track">
            @for($k = 0; $k < 2; $k++)
            <ul @if($k === 1) aria-hidden="true" @endif>
                @foreach($row as $t)<li>{{ $t }}</li>@endforeach
            </ul>
            @endfor
        </div>
    </div>
    @endforeach
</section>
