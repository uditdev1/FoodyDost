import dotenv from "dotenv";
dotenv.config();

export const create_prompt = (userQuery, allFoods) => {
    const result = `
        You are an AI assistant helping users find the best matching food items based on their natural language request.

        You have the complete list of food items below. Each food has attributes like ID, name, tags, ingredients, diet, origin, mood, and occasion.

        👉 Task:
        - Match the user's query with the most relevant food items.
        - Only return a **space-separated string of food IDs**, sorted by how closely they match the user query.
        - Do NOT include any extra text.
        - Give priority to exact matches in mood, occasion, and diet, but consider ingredients and origin too.

        User query: ${userQuery}

        Food list:
        ${allFoods}

        Return:
    `;

    return result;
}

export const personalized_food_recommendation_prompt = (previousHistory, allFoods) => {
    return `
        You are an AI recommendation assistant. Your task is to analyze the user's food preferences based on their previous history, and recommend the most relevant food items from the list provided.

        Each food item has details like id, name, tags (mood, origin, occasion, diet), and ingredients.

        👉 Instructions:
        - Use the user's previous behavior to infer preferences.
        - Match those preferences with the most relevant food items.
        - Return ONLY a space-separated string of food IDs, sorted from most to least relevant.
        - DO NOT return anything other than space-separated IDs.

        User's previous history:
        ${previousHistory}

        Food list:
        ${allFoods}

        Return:
    `;
};

export const GEMINI_API_KEY = process.env.GEMINI_API_KEY;