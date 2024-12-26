<template>
    <v-navigation-drawer location="right" permanent>
        <v-list>
            <v-list-item>
                <v-color-picker hide-inputs width="220" @update:model-value="changeColor" ></v-color-picker>
            </v-list-item>
            <v-list-item title="Width">
                <v-slider v-model="ws.pencil.width" min="1" max="20"></v-slider>
            </v-list-item>
        </v-list>
    </v-navigation-drawer>
</template>


<script setup>
import { useWorkspaceStore } from '@/stores/workspace';
const ws = useWorkspaceStore();

function changeColor(col) {
    ws.pencil.color = col;
}
</script>