# archery-lights
A little script to controll archery lights in your browser.

## Usage
- To start the light press [RETURN], you can restart (even while the process is running) by pressing [RETURN] again.
- To abort the process and show a red light (in emergency cases) press [SPACE]
- To restart after an emergency breakup, just press [RETURN] again

## Installation
Open js/app.js and edit the first 3 lines

```sh
window.prepareDuration = 10; // Time while the light is red
window.shootDuration = 120; // Light is green and you can shoot
window.finalDuration = 30; // Light is yellow after 90 seconds of the shoot duration
```