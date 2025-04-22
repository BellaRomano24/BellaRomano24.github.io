<template>
    <div>
        <v-list-item title="Clipart">
            <v-file-input label="Bild auswählen"  multiple small-chips density="compact" class="mt-4"
                v-model="uploads"
                prepend-icon="mdi-camera" 
                accept="image/*"
                ></v-file-input>
            <div class="text-right">
                <v-btn color="primary" variant="text" class="mt-n5" @click="makeShapes">Hochladen</v-btn>
            </div>
        </v-list-item>
        <v-list-item v-if="ws.shapes.length > 0" title="Cliparts">
            <div style="display: flex; gap: 10px; flex-wrap: wrap; margin-top: 10px;">
                <img v-for="(img, index) in ws.shapes" :key="index" :src="img"
                    class="cursor-pointer"
                    alt="Preview" 
                    style="width: 100px; height: 100px; object-fit: cover;"
                    @click="dropShape(img)" 
                />
            </div>
        </v-list-item>
    </div>
</template>

<script setup>
import { useWorkspaceStore } from '@/stores/workspace';
import { fabric } from 'fabric'
const uploads = ref([]);

const ws = useWorkspaceStore();

function makeShapes() {
    uploads.value.forEach(file => {
        const reader = new FileReader()
        reader.onload = (event) => {
            ws.shapes.push(event.target.result);
        }
        reader.readAsDataURL(file)
    });
    uploads.value = [];
}

function dropShape(fileUrl) {
    // const testImgObj = new Image(500, 400);
    // testImgObj.src = fileUrl;
    // var img = new fabric.Image(testImgObj, {
    //         left: 100,
    //         top: 100,
    //         scaleX: 0.5,
    //         scaleY: 0.5,
    // });
    //     ws.canvas.add(img);
    //     ws.canvas.setActiveObject(img);
    //     ws.canvas.renderAll();
    fabric.Image.fromURL(fileUrl, (img) => {
        img.set({
            left: 100,
            top: 100,
            scaleX: 0.5,
            scaleY: 0.5,
        });
        ws.canvas.add(img);
        ws.canvas.setActiveObject(img);
        ws.canvas.renderAll();
    });
}
</script>