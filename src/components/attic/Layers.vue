<template>
    <v-list-subheader>
        Layers
        <v-btn size="small" icon variant="text" class="position-absolute right-0 mr-3 mt-n2" @click="ws.addLayer">
            <v-icon>mdi-plus</v-icon>
            <v-tooltip activator="parent">Add new Layer</v-tooltip>
        </v-btn>
    </v-list-subheader>
    <v-list-item v-for="(layer, index) in ws.layers">
        <v-row no-gutters>
            <v-col>
                <div class="canvas-preview" :class="{'active-layer' : ws.cLayIdx == index}" @click="switchLayer(index)">
                    <v-icon v-if="layer.visible">mdi-eye</v-icon>
                    <v-icon v-else>mdi-eye-off-outline</v-icon>
                </div>
            </v-col>
            <v-col>
                <v-text-field v-if="showRename===index" autofocus density="compact" v-model="layer.name" @blur="toggleRename(false)" variant="underlined"></v-text-field>
                <span v-else @click="toggleRename(index)">{{ layer.name }}</span> 
            </v-col>
        </v-row>
        <template #append>
            <v-menu activator="parent">
                <template v-slot:activator="{ attrs, on }">
                    <v-btn icon="mdi-dots-vertical" variant="plain"></v-btn>
                </template>
                <v-list>
                    <v-list-item title="Clipart" prepend-icon="mdi-shape" @click=""></v-list-item>
                    <v-list-item :title="layer.visible ? 'Verstecken' : 'Anzeigen'" prepend-icon="mdi-eye" @click="toggleLayer(index, layer.visible)"></v-list-item>
                    <v-list-item v-if="ws.layers.length > 1" title="Löschen" prepend-icon="mdi-delete"  @click="removeLayer(index)"></v-list-item>
                </v-list>
            </v-menu>
        </template>
    </v-list-item>
</template>


<script setup>
import { useWorkspaceStore } from '@/stores/workspace';
const ws = useWorkspaceStore();


const showRename = ref(false);
function toggleRename(index) {
    showRename.value = index;
    if(index) switchLayer(index);
}

function switchLayer(index) {
    ws.cLayIdx = index;
}

function removeLayer(index) {
    ws.layers[index].strokes.forEach(e => ws.canvas.remove(e));
    if(ws.cLayIdx === index) {
        ws.cLayIdx = 0;
    }
    ws.layers.splice(index, 1); //remove layer
}

function toggleLayer(index, toggle) {
    ws.layers[index].visible = !toggle;
    ws.layers[index].strokes.forEach(path => path.visible = !toggle );
    ws.canvas.renderAll();
}
</script>



<style scoped>
.canvas-preview {
    background-color:grey;
    margin-right: 15px;
    width: 80px;
    text-align:center;
}
.active-layer {
    box-sizing: border-box;
    border: 2px solid white;
}
</style>