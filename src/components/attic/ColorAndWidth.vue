<template>
    <div>
        <v-list-item>
            <v-color-picker hide-inputs width="220" @update:model-value="changeColor" ></v-color-picker>
        </v-list-item>
        <v-list-item title="Width">
            <v-slider min="1" max="20" @update:model-value="changeWidth" class="px-2" step="1"></v-slider>
        </v-list-item>
        <v-list-item title="Texture" v-if="ws.tool == 'pencil'">
            <v-select :items="['solid', 'dotted', 'dashed']" density="compact" :value="texture" @update:model-value="changeTexture"></v-select>
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
    if(ws.canvas.freeDrawingBrush.strokeDashArray) {
        changeTexture(texture.value);
    }
}

const texture = ref('solid');
function changeTexture(val) {
    texture.value = val;
    let width = ws.canvas.freeDrawingBrush.width;
    if(val == 'dotted') {
        ws.canvas.freeDrawingBrush.strokeDashArray = [width, width*2] ;
    } else if(val == 'solid') {
        ws.canvas.freeDrawingBrush.strokeDashArray = null;
    } else if(val == 'dashed') {
        ws.canvas.freeDrawingBrush.strokeDashArray = [width, width * 5];
    }
}

</script>
