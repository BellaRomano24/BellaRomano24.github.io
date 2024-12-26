<template>
    <v-app-bar density="compact">
        <v-toolbar-title>Live Draw</v-toolbar-title>

        <v-spacer></v-spacer>

        <v-btn disabled><v-icon class="mr-2">mdi-floppy</v-icon> Save</v-btn>
        <v-btn @click="save"><v-icon class="mr-2">mdi-export</v-icon> Export</v-btn>
    </v-app-bar>
</template>

<script setup>
import { useWorkspaceStore } from '@/stores/workspace';

const ws = useWorkspaceStore();

function save() {
    console.log("saving?");
    var link = document.createElement("a");
    link.download = "MyDrawing.png";
    link.href = ws.canvas.toDataURL();
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    // delete link;
}
</script>