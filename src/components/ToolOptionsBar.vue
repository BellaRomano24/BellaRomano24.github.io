<template>
    <v-navigation-drawer location="right" permanent>
        <v-list>
            
            <Shapes v-if="ws.tool == 'shapes'"></Shapes>
            <ColorAndWidth v-else></ColorAndWidth>

            <v-divider></v-divider>
            <Layers></Layers>
        </v-list>
    </v-navigation-drawer>
</template>


<script setup>
import ColorAndWidth from './attic/ColorAndWidth.vue';
import Shapes from './attic/Shapes.vue';

import { useWorkspaceStore } from '@/stores/workspace';
const ws = useWorkspaceStore();

</script>
