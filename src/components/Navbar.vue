<template>
<div id="Navbar">
<nav class="navbar fixed-top navbar-expand-lg navbar-light w-100" style="background-color: rgba(0, 0,0, 0.8);">
            <div class="container">
                <a class="navbar-brand text-light" href="#"><digital-clock :blink="true" class="text-light"/></a>
                <span class="text-light mr-2"><i class="fas fa-cloud-sun text-info"></i> cleverWeather</span>
                <button class="navbar-toggler text-light" type="button" data-toggle="collapse" data-target="#navbarNav"
                    aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation"
                    style="background: none !important; border: none !important; outline: none !important; color: white !important">
                    <span> <i class="fas fa-bars" style="color:#fff; font-size: 24px;"></i></span>
                </button>
                <div class="collapse navbar-collapse" id="navbarNav">
                    <ul class="navbar-nav">
                        <li class="nav-item active">
                            <a class="nav-link text-light" href="">My cities <span class="sr-only">(current)</span></a>
                        </li>
                        <li class="nav-item">
                            <a class="nav-link text-light" href="">Add a new city</a>
                        </li>
                    </ul>
                </div>
            </div>
        </nav>
    </div>
</template>

<script>
import DigitalClock from "vue-digital-clock";
export default {
    name: 'Navbar',
    components: {
        DigitalClock
    }
}
</script>