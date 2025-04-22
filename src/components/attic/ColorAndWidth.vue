<template>
    <div>
        <v-list-item>
            <v-color-picker hide-inputs width="220" @update:model-value="changeColor" ></v-color-picker>
        </v-list-item>
        <v-list-item title="Width">
            <v-slider @update:model-value="changeWidth" min="1" max="20"></v-slider>
        </v-list-item>
    </div>
</template>


<script setup>
import { useWorkspaceStore } from '@/stores/workspace';
const ws = useWorkspaceStore();

function changeColor(col) {
    ws.canvas.freeDrawingBrush.color = col;
}

function changeWidth(val) {
    ws.canvas.freeDrawingBrush.width = val;
}

</script>
