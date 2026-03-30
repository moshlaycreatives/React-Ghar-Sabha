import { useCallback, useRef, useState } from "react";

/**
 * Shared file + preview URL handling for image upload zones.
 * Each form page keeps its own submit/API logic; this hook is UI-only.
 */
export function useImageFilePicker() {
    const fileInputRef = useRef(null);
    const [file, setFile] = useState(null);
    const [previewUrl, setPreviewUrl] = useState(null);

    const reset = useCallback(() => {
        setPreviewUrl((prev) => {
            if (prev && prev.startsWith("blob:")) URL.revokeObjectURL(prev);
            return null;
        });
        setFile(null);
    }, []);

    const handleZoneClick = useCallback(() => {
        fileInputRef.current?.click();
    }, []);

    const handleFileChange = useCallback((e) => {
        const selected = e.target.files?.[0];
        if (!selected) return;

        setPreviewUrl((prev) => {
            if (prev && prev.startsWith("blob:")) URL.revokeObjectURL(prev);
            return URL.createObjectURL(selected);
        });
        setFile(selected);
        e.target.value = "";
    }, []);

    return {
        fileInputRef,
        file,
        previewUrl,
        setPreviewUrl,
        handleZoneClick,
        handleFileChange,
        reset,
    };
}
