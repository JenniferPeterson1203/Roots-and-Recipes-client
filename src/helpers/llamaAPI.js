import LlamaAI from 'llamaai';
const apiToken = 'INSERT_YOUR_API_TOKEN_HERE';
const llamaAPI = new LlamaAI(apiToken);

// Build the Request
const apiRequestJson = {
    "messages": [
        { "role": "user", "content": "What is the weather like in Boston?" },
    ],
    "functions": [
        {
            "name": "get_current_weather",
            "description": "Get the current weather in a given location",
            "parameters": {
                "type": "object",
                "properties": {
                    "location": {
                        "type": "string",
                        "description": "The city and state, e.g. San Francisco, CA",
                    },
                    "days": {
                        "type": "number",
                        "description": "for how many days ahead you wants the forecast",
                    },
                    "unit": { "type": "string", "enum": ["celsius", "fahrenheit"] },
                },
            },
            "required": ["location", "days"],
        }
    ],
    "stream": false,
    "function_call": "get_current_weather",
};

// Execute the Request
llamaAPI.run(apiRequestJson)
    .then(response => {
        // Process response
    })
    .catch(error => {
        // Handle errors
    });