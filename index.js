'use strict';

const audioContext = new window.AudioContext();
const masterGainNode = audioContext.createGain();

masterGainNode.connect(audioContext.destination);
masterGainNode.gain.value = 50;

const notes = [
    { key: 65, frequency: 261.625565300598634, pressed: false },
    { key: 83, frequency: 293.664767917407560, pressed: false },
    { key: 68, frequency: 329.627556912869929, pressed: false },
    { key: 70, frequency: 349.228231433003884, pressed: false },
    { key: 71, frequency: 391.995435981749294, pressed: false },
    { key: 72, frequency: 440.000000000000000, pressed: false },
    { key: 74, frequency: 493.883301256124111, pressed: false }
];

function playNote(frequency) {

    const oscillator = audioContext.createOscillator()

    oscillator.frequency.value = frequency;
    oscillator.connect(masterGainNode);
    oscillator.start();

    return oscillator;

}

function keyPressed(e) {
    
    const key = document.querySelector(`.key[data-key="${e.keyCode}"]`);
    const note = notes.find(note => note.key === e.keyCode);

    if (!note || note.pressed) return;

    note.pressed = true;
    
    key.classList.add('pressed');
    note.oscillator = playNote(note.frequency);

}

function keyReleased(e) {

    const key = document.querySelector(`.key[data-key="${e.keyCode}"]`);
    const note = notes.find(note => note.key === e.keyCode);

    if (!note || !note.pressed) return;

    note.pressed = false;
    
    key.classList.remove('pressed');
    note.oscillator.stop();

    delete note.oscillator;

}

document.addEventListener('keydown', keyPressed);
document.addEventListener('keyup', keyReleased);