/**
 * Normalizes axios/API errors into a single user-visible string.
 * Handles string bodies, { message }, { message: [] }, { errors: [] }, nested field errors, and HTTP status fallbacks.
 */
export function getApiErrorMessage(error, fallback = "Something went wrong") {
    if (error == null) return fallback;

    const data = error.response?.data;

    if (typeof data === "string" && data.trim()) {
        return data.trim();
    }

    if (data && typeof data === "object") {
        const msg = data.message;
        if (typeof msg === "string" && msg.trim()) {
            return msg.trim();
        }
        if (Array.isArray(msg) && msg.length) {
            const joined = msg
                .map((x) => (typeof x === "string" ? x : String(x)))
                .filter(Boolean)
                .join(" · ");
            if (joined) return joined;
        }
        if (typeof data.error === "string" && data.error.trim()) {
            return data.error.trim();
        }
        if (Array.isArray(data.errors) && data.errors.length) {
            const parts = data.errors.map((e) => {
                if (typeof e === "string") return e;
                if (e && typeof e === "object") {
                    return e.message || e.msg || e.path || "";
                }
                return "";
            });
            const joined = parts.filter(Boolean).join(" · ");
            if (joined) return joined;
        }
        if (data.errors && typeof data.errors === "object" && !Array.isArray(data.errors)) {
            const parts = [];
            for (const v of Object.values(data.errors)) {
                if (Array.isArray(v)) {
                    for (const x of v) {
                        if (typeof x === "string") parts.push(x);
                        else if (x && typeof x === "object" && x.message) parts.push(x.message);
                    }
                } else if (typeof v === "string") {
                    parts.push(v);
                }
            }
            if (parts.length) return parts.join(" · ");
        }
    }

    const net = error.message;
    if (typeof net === "string" && net.trim()) {
        if (/network error/i.test(net)) {
            return "Network error. Check your connection and try again.";
        }
        if (!/^request failed with status code/i.test(net)) {
            return net.trim();
        }
    }

    const status = error.response?.status;
    if (status === 401) {
        return "Session expired or unauthorized. Please sign in again.";
    }
    if (status === 403) {
        return "You don’t have permission to do this.";
    }
    if (status === 404) {
        return "Not found.";
    }
    if (status === 408 || status === 504) {
        return "Request timed out. Please try again.";
    }
    if (status >= 500) {
        return `${fallback} (server error)`;
    }

    return fallback;
}
