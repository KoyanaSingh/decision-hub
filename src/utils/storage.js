const STORAGE_KEY = "decisionHub";

export const loadCategories = () => {
    try {
        const data = localStorage.getItem(STORAGE_KEY);

        if (!data) {
            return [
                {
                    id: "food",
                    name: "Food",
                    icon: "🍕",
                    items: ["Pizza", "Burger", "Pasta"],
                },
                {
                    id: "study",
                    name: "Study",
                    icon: "📚",
                    items: ["DSA", "React", "Node.js"],
                },
                {
                    id: "watch",
                    name: "Watch",
                    icon: "🎬",
                    items: ["Interstellar", "Dark", "Friends"],
                },
                {
                    id: "chores",
                    name: "Chores",
                    icon: "🏠",
                    items: ["Laundry", "Clean Room"],
                },
            ];
        }

        const parsed = JSON.parse(data);

        if (!Array.isArray(parsed) || parsed.length === 0) {
            return [
                {
                    id: "food",
                    name: "Food",
                    icon: "🍕",
                    items: ["Pizza", "Burger", "Pasta"],
                },
                {
                    id: "study",
                    name: "Study",
                    icon: "📚",
                    items: ["DSA", "React", "Node.js"],
                },
                {
                    id: "watch",
                    name: "Watch",
                    icon: "🎬",
                    items: ["Interstellar", "Dark", "Friends"],
                },
                {
                    id: "chores",
                    name: "Chores",
                    icon: "🏠",
                    items: ["Laundry", "Clean Room"],
                },
            ];
        }

        return parsed;
    } catch {
        return [];
    }
};

export const saveCategories = (categories) => {
    localStorage.setItem(
        STORAGE_KEY,
        JSON.stringify(categories)
    );
};

export const loadHistory = () => {
    const data =
        localStorage.getItem("decisionHistory");

    return data
        ? JSON.parse(data)
        : [];
};

export const saveHistory = (
    history
) => {
    localStorage.setItem(
        "decisionHistory",
        JSON.stringify(history)
    );
};