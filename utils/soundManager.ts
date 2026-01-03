'use client';

class SoundManager {
    private static instance: SoundManager;
    private sounds: Map<string, HTMLAudioElement> = new Map();
    private isMuted: boolean = false;
    private volume: number = 0.5;

    private constructor() {
        if (typeof window !== 'undefined') {
            this.preloadSounds();
        }
    }

    public static getInstance(): SoundManager {
        if (!SoundManager.instance) {
            SoundManager.instance = new SoundManager();
        }
        return SoundManager.instance;
    }

    private preloadSounds() {
        const soundFiles = {
            typing: '/sounds/typing.mp3',
            success: '/sounds/success.mp3',
            failure: '/sounds/failure.mp3',
            click: '/sounds/click.mp3',
            hover: '/sounds/hover.mp3',
            complete: '/sounds/complete.mp3',
        };

        Object.entries(soundFiles).forEach(([key, path]) => {
            const audio = new Audio(path);
            audio.preload = 'auto';
            this.sounds.set(key, audio);
        });
    }

    public play(soundName: string, volume: number = this.volume) {
        if (this.isMuted) return;

        const sound = this.sounds.get(soundName);
        if (sound) {
            sound.currentTime = 0;
            sound.volume = Math.min(Math.max(volume, 0), 1);
            sound.play().catch(e => {
                // Ignore auto-play errors (common in browsers before interaction)
                console.warn('Sound play failed:', e);
            });
        } else {
            console.warn(`Sound "${soundName}" not found.`);
        }
    }

    public setVolume(volume: number) {
        this.volume = Math.min(Math.max(volume, 0), 1);
    }

    public toggleMute() {
        this.isMuted = !this.isMuted;
        return this.isMuted;
    }

    public getMuteState() {
        return this.isMuted;
    }
}

export const SOUNDS = {
    TYPING: 'typing',
    SUCCESS: 'success',
    FAILURE: 'failure',
    CLICK: 'click',
    HOVER: 'hover',
    COMPLETE: 'complete',
};

export default SoundManager;
