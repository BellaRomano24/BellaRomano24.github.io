<template>
    <v-btn 
        variant="flat" 
        class="my-2" 
        size="small" 
        :color="active ? 'primary' : 'default'"
        @click="useTool"
    ></v-btn>
</template>

<script setup>
import { useWorkspaceStore } from '@/stores/workspace';

const ws = useWorkspaceStore();
const props = defineProps(['value']);


const active = computed(() => props.value == ws.tool);

function useTool() {
    ws.tool = props.value;
}
</script>