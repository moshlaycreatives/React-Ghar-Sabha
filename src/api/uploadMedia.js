import axios from "axios";
import { endpoints } from "../apiEndpoints";

/**
 * Single upload (image/video).
 * Supports S3 folder query param `path`:
 * `/api/media/upload-single?path=profiles`
 */
export async function uploadSingleMedia(file, options = {}) {
    const { fileFieldName = "file", path, onUploadProgress } = options;

    const token = localStorage.getItem("token");
    const formData = new FormData();
    formData.append(fileFieldName, file);

    const { data } = await axios.post(withPath(endpoints.UploadMediaSingle, path), formData, {
        headers: {
            ...(token ? { Authorization: `Bearer ${token}` } : {}),
        },
        onUploadProgress,
    });

    const url = extractMediaUrl(data);
    if (!url || typeof url !== "string") {
        throw new Error(
            "Upload response mein URL nahi mila — backend response shape `extractMediaUrl` ke saath match karo."
        );
    }

    return { url, raw: data };
}

/**
 * Multiple upload (images/videos).
 * Supports S3 folder query param `path`:
 * `/api/media/upload?path=events`
 */
export async function uploadMultipleMedia(files, options = {}) {
    const { filesFieldName = "files", path, onUploadProgress } = options;

    const token = localStorage.getItem("token");
    const formData = new FormData();
    (files ?? []).forEach((f) => {
        if (f) formData.append(filesFieldName, f);
    });

    const { data } = await axios.post(withPath(endpoints.UploadMediaMultiple, path), formData, {
        headers: {
            ...(token ? { Authorization: `Bearer ${token}` } : {}),
        },
        onUploadProgress,
    });

    return { urls: extractMediaUrls(data), raw: data };
}

/**
 * Backwards-compatible: purana code `uploadMedia(file)` call kare to single upload ho.
 */
export async function uploadMedia(file, options = {}) {
    return uploadSingleMedia(file, options);
}

function withPath(baseUrl, path) {
    if (!path) return baseUrl;
    const joiner = baseUrl.includes("?") ? "&" : "?";
    return `${baseUrl}${joiner}path=${encodeURIComponent(path)}`;
}

/**
 * Multiple upload API: `{ success, message, data: { files: [{ url, name, key, ... }, ...] } }`
 */
function extractMediaUrls(payload) {
    if (!payload || typeof payload !== "object") return [];
    const p = payload;

    if (Array.isArray(p.data?.files)) {
        return mapFileEntriesToUrls(p.data.files);
    }

    const direct =
        p.urls ??
        p.files ??
        p.media ??
        p.data?.urls ??
        p.result?.urls ??
        p.result?.files;

    if (Array.isArray(direct)) {
        return mapFileEntriesToUrls(direct);
    }

    const single = extractMediaUrl(payload);
    return single ? [single] : [];
}

function mapFileEntriesToUrls(entries) {
    return entries
        .map((x) => {
            if (typeof x === "string") return x;
            if (x && typeof x === "object") return x.url ?? x.fileUrl ?? x.mediaUrl ?? x.path ?? x.location;
            return null;
        })
        .filter(Boolean);
}

/**
 * Single upload API: `{ success, message, data: { file: { url, name, key, ... } } }`
 * + common fallbacks: `{ url }`, `{ data: { url } }`, etc.
 */
function extractMediaUrl(payload) {
    if (!payload || typeof payload !== "object") return null;
    const p = payload;

    const direct =
        p.url ??
        p.fileUrl ??
        p.mediaUrl ??
        p.path ??
        p.location;
    if (typeof direct === "string" && direct) return direct;

    const nested = p.data ?? p.result ?? p.file;
    if (nested && typeof nested === "object") {
        const fromFile = nested.file;
        if (fromFile && typeof fromFile === "object" && typeof fromFile.url === "string") {
            return fromFile.url;
        }
        const u =
            nested.url ??
            nested.fileUrl ??
            nested.mediaUrl ??
            nested.path;
        if (typeof u === "string" && u) return u;
    }

    return null;
}
