<header class="nav" id="nav">
    <div class="nav-inner">
        <a href="#home" class="nav-brand" aria-label="{{ $profile['name'] }}, back to top">
            <img src="{{ asset($profile['portrait']) }}" alt="" width="36" height="36">
            <span>{{ $profile['name'] }}</span>
        </a>
        <nav class="nav-links" aria-label="Primary">
            <a href="#about">About</a>
            <a href="#skills">Skills</a>
            <a href="#work">Work</a>
            <a href="#experience">Experience</a>
            <a href="#contact" class="nav-cta">Contact</a>
        </nav>
        <button class="nav-toggle" id="navToggle" type="button" aria-label="Open menu" aria-expanded="false" aria-controls="menu">
            <span></span><span></span>
        </button>
    </div>
</header>

<div class="menu" id="menu" hidden>
    <nav aria-label="Mobile">
        <a href="#about"><small>01</small>About</a>
        <a href="#skills"><small>02</small>Skills</a>
        <a href="#work"><small>03</small>Work</a>
        <a href="#experience"><small>04</small>Experience</a>
        <a href="#contact"><small>05</small>Contact</a>
    </nav>
    <p class="menu-foot">{{ $profile['email'] }}<br>{{ $profile['location'] }}</p>
</div>
