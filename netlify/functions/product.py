import requests

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
    """Netlify serverless function to get product by barcode."""
    
    # Handle CORS
    headers = {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Headers': 'Content-Type',
        'Access-Control-Allow-Methods': 'GET, POST, OPTIONS'
    }
    
    # Handle preflight request
    if event['httpMethod'] == 'OPTIONS':
        return {
            'statusCode': 200,
            'headers': headers,
            'body': ''
        }
    
    try:
        # Get barcode from path
        path = event.get('path', '')
        barcode = path.split('/')[-1] if path else None
        
        if not barcode:
            return {
                'statusCode': 400,
                'headers': headers,
                'body': '{"error": "Barcode is required"}'
            }
        
        # Fetch from OpenFoodFacts
        url = f"https://world.openfoodfacts.org/api/v0/product/{barcode}.json"
        response = requests.get(url)
        
        if response.status_code != 200:
            return {
                'statusCode': 500,
                'headers': headers,
                'body': '{"error": "Error fetching data from OpenFoodFacts"}'
            }
        
        data = response.json()
        
        if "product" not in data:
            return {
                'statusCode': 404,
                'headers': headers,
                'body': '{"error": "Product not found"}'
            }
        
        product_data = data["product"]
        
        # Calculate health score
        health_score, score_details = calculate_health_score(product_data)
        
        # Extract product details
        result = {
            "barcode": product_data.get("code", "N/A"),
            "name": product_data.get("product_name", "N/A"),
            "brands": product_data.get("brands", "N/A"),
            "categories": product_data.get("categories", "N/A"),
            "ingredients": product_data.get("ingredients_text", "N/A"),
            "image_url": product_data.get("image_url", ""),
            "nutritional_facts": {
                key: value for key, value in product_data.get("nutriments", {}).items()
            },
            "nutrient_levels": product_data.get("nutrient_levels", {}),
            "nutriments": product_data.get("nutriments", {}),
            "additives_tags": product_data.get("additives_tags", []),
            "keywords": product_data.get("generic_name", "N/A"),
            "health_score": health_score,
            "score_details": score_details
        }
        
        return {
            'statusCode': 200,
            'headers': {**headers, 'Content-Type': 'application/json'},
            'body': str(result).replace("'", '"')
        }
        
    except Exception as e:
        return {
            'statusCode': 500,
            'headers': headers,
            'body': f'{{"error": "{str(e)}"}}'
        }
