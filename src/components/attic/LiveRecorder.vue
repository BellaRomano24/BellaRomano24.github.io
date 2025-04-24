<template>
    <v-btn color="primary" @click="toggleRecording" class="ml-4">
        <v-icon color="red" :class="{'blinking': isRecording}">mdi-circle</v-icon>
        <v-tooltip v-if="isRecording" activator="parent">Stop Recording</v-tooltip>
        <v-tooltip v-else activator="parent">Start Recording</v-tooltip>
    </v-btn>
    <small v-if="isRecording"> {{ elapsedTime }} </small>
</template>

<script setup>
import { useWorkspaceStore } from '@/stores/workspace';
import { onMounted } from 'vue';

const ws = useWorkspaceStore();
const isRecording = ref(false);
const seconds = ref(0);

var recorder = null;
var chunks = [];

onMounted(() => {
    startRenderLoop();

    const stream = ws.canvas.getElement().captureStream(60); // 60 fps
    recorder = new MediaRecorder(stream);

    recorder.ondataavailable = (e) => chunks.push(e.data);
    
    recorder.onstop = () => {
        const blob = new Blob(chunks, { type: 'video/mp4' });
        const a = document.createElement('a');
        a.href = URL.createObjectURL(blob);
        a.download = 'livedraw-' + (new Date).toISOString().substring(0,10) +'.webm';
        a.click();
    };
});

function startRenderLoop() {
    ws.canvas.renderAll(); // force Fabric to re-draw
    requestAnimationFrame(startRenderLoop); // run every frame (~60fps)
}

var timer = null;
function toggleRecording() {
    if(isRecording.value) { //stop
        ws.canvas.renderAll();
        recorder.requestData();
        recorder.stop();
        isRecording.value = false;
        clearInterval(timer);
    } else { //start
        chunks = [];
        isRecording.value = true;
        recorder.start();
        seconds.value = 0;
        timer = setInterval(() => seconds.value++, 1000);
    }
}

const elapsedTime = computed(() => {
    const mins = Math.floor(seconds.value / 60);
    const secs = seconds.value % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
});
</script>

<style scoped>
.blinking {
  animation: blinker 1s linear infinite;
}

@keyframes blinker {
  50% {
    opacity: 0;
  }
}
</style>