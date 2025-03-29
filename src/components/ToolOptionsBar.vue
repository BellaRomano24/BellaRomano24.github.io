<template>
    <v-navigation-drawer location="right" permanent>
        <v-list>
            <v-list-item>
                <v-color-picker hide-inputs width="220" @update:model-value="changeColor" ></v-color-picker>
            </v-list-item>
            <v-list-item title="Width">
                <v-slider @update:model-value="changeWidth" min="1" max="20"></v-slider>
            </v-list-item>
            <v-divider></v-divider>

            <v-list-subheader>
                Layers
                <v-btn size="small" icon variant="text" class="position-absolute right-0 mr-3 mt-n2" @click="ws.addLayer">
                    <v-icon>mdi-plus</v-icon>
                    <v-tooltip activator="parent">Add new Layer</v-tooltip>
                </v-btn>
            </v-list-subheader>
            <v-list-item v-for="(layerName, index) in ws.layers">
                <v-row no-gutters>
                    <v-col>
                        <div class="canvas-preview" :class="{'active-layer' : ws.currentLayer == index}" @click="switchLayer(index)">
                            <v-icon>mdi-eye</v-icon>
                        </div>
                    </v-col>
                    <v-col>
                        <v-text-field v-if="showRename===index" autofocus density="compact" v-model="ws.layers[index]" @blur="toggleRename(false)" variant="underlined"></v-text-field>
                        <span v-else @click="toggleRename(index)">{{ layerName }}</span> 
                    </v-col>
                </v-row>
                <template #append>
                    <v-btn v-if="index > 0" @click="ws.removeLayer(index)" class="flex-" size="small" icon variant="plain"><v-icon color="error">mdi-trash-can-outline</v-icon></v-btn>
                </template>
                
            </v-list-item>
        </v-list>

    </v-navigation-drawer>
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

const showRename = ref(false);
function toggleRename(index) {
    showRename.value = index;
    if(index) switchLayer(index);
}

function switchLayer(index) {
    ws.currentLayer = index;
}
</script>


<style scoped>
.canvas-preview {
    background-color:grey;
    margin-right: 15px;
    width: 100px;
    text-align:center;
}
.active-layer {
    box-sizing: border-box;
    border: 2px solid white;
}
</style>