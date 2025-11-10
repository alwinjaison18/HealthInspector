import requests
import json

def calculate_health_score(product_data):
    """Calculate health score based on product nutritional values."""
    score = 100
    details = {}

    nutriments = product_data.get("nutriments", {})

    # Sugar penalty
    sugar = nutriments.get("sugars_100g", 0)
    if sugar > 15:
        penalty = min(30, (sugar - 15) * 2)
        score -= penalty
        details["sugar"] = f"High sugar content (-{penalty} points)"

    # Fat penalty
    fat = nutriments.get("fat_100g", 0)
    if fat > 20:
        penalty = min(20, (fat - 20) * 1.5)
        score -= penalty
        details["fat"] = f"High fat content (-{penalty} points)"

    # Saturated fat penalty
    saturated_fat = nutriments.get("saturated-fat_100g", 0)
    if saturated_fat > 5:
        penalty = min(15, (saturated_fat - 5) * 2)
        score -= penalty
        details["saturated_fat"] = f"High saturated fat (-{penalty} points)"

    # Sodium penalty
    sodium = nutriments.get("sodium_100g", 0)
    if sodium > 0.5:
        penalty = min(20, (sodium - 0.5) * 30)
        score -= penalty
        details["sodium"] = f"High sodium content (-{penalty} points)"

    # Additives penalty
    additives = product_data.get("additives_tags", [])
    if len(additives) > 5:
        penalty = min(15, len(additives) * 2)
        score -= penalty
        details["additives"] = f"{len(additives)} additives detected (-{penalty} points)"

    score = max(0, score)
    return round(score, 2), details


def handler(event, context):
    """Netlify serverless function to search products."""
    
    # Handle CORS and Cache Control
    headers = {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Headers': 'Content-Type',
        'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
        'Cache-Control': 'no-cache, no-store, must-revalidate',
        'Pragma': 'no-cache',
        'Expires': '0'
    }
    
    # Handle preflight request
    if event['httpMethod'] == 'OPTIONS':
        return {
            'statusCode': 200,
            'headers': headers,
            'body': ''
        }
    
    try:
        # Get query parameter
        query_params = event.get('queryStringParameters', {})
        search_query = query_params.get('query', '')
        
        if not search_query or len(search_query) < 2:
            return {
                'statusCode': 400,
                'headers': headers,
                'body': '{"error": "Query parameter must be at least 2 characters"}'
            }
        
        # Search OpenFoodFacts
        search_url = f"https://world.openfoodfacts.org/cgi/search.pl?search_terms={search_query}&search_simple=1&action=process&json=1"
        response = requests.get(search_url)
        
        if response.status_code != 200:
            return {
                'statusCode': 500,
                'headers': headers,
                'body': '{"error": "Error searching OpenFoodFacts"}'
            }
        
        data = response.json()
        
        return {
            'statusCode': 200,
            'headers': {**headers, 'Content-Type': 'application/json'},
            'body': json.dumps(data)
        }
        
    except Exception as e:
        return {
            'statusCode': 500,
            'headers': headers,
            'body': json.dumps({"error": str(e)})
        }
