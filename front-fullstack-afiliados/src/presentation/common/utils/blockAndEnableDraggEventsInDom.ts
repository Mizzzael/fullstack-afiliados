const BlockAndEnableDraggEventsInDom = (enable: boolean, classNametarget: string = 'dragMagic') => {
    const disableDrop = (e: DragEvent) => {
        if (e.target && !(e.target as HTMLElement).classList.contains(classNametarget) && e.dataTransfer) {
            e.preventDefault();
            e.dataTransfer.effectAllowed = "none";
            e.dataTransfer.dropEffect = "none";
        }
    }
    if (enable) {
        window.addEventListener("dragenter", disableDrop, { passive: true });
        window.addEventListener("dragover", disableDrop, { passive: true });
        window.addEventListener("drop", disableDrop, { passive: true });
    } else {
        window.removeEventListener("dragenter", disableDrop, { capture: true });
        window.removeEventListener("dragover", disableDrop, { capture: true });
        window.removeEventListener("drop", disableDrop, { capture: true });
    }
}

export default BlockAndEnableDraggEventsInDom;
