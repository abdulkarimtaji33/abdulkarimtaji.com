{{-- Reusable game section — pass a `gameId` var ('platformer' | 'world' | 'tower').
     Used both for the homepage embed (single game) and for each slot on
     /playground (rendered up to three times with a different id + suffix). --}}
@php($suffix = $suffix ?? $gameId)
<div class="game-section-wrap" id="game-wrap-{{ $suffix }}" data-game-id="{{ $gameId }}">
    <div class="game-frame" id="game-frame-{{ $suffix }}"></div>
</div>
