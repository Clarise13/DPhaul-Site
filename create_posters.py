from PIL import Image, ImageDraw, ImageFont
import os

# Create videos folder if it doesn't exist
videos_dir = "videos"
os.makedirs(videos_dir, exist_ok=True)

# Poster dimensions
width, height = 800, 450

# Brand color
brand_color = "#7f0e12"
brand_rgb = (127, 14, 18)
text_color = (255, 255, 255)
accent_color = (253, 216, 53)

# Poster data: (filename, title, subtitle)
posters_data = [
    ("video1-poster.jpg", "Pool Building", "Process"),
    ("video2-poster.jpg", "Offices Building", "Process"),
    ("video3-poster.jpg", "Offices Tour", "Virtual Tour"),
]

for filename, title, subtitle in posters_data:
    # Create image with brand color background
    img = Image.new("RGB", (width, height), brand_rgb)
    draw = ImageDraw.Draw(img)
    
    # Try to use a nice font, fall back to default if not available
    try:
        title_font = ImageFont.truetype("arial.ttf", 72)
        subtitle_font = ImageFont.truetype("arial.ttf", 48)
        play_font = ImageFont.truetype("arial.ttf", 80)
    except:
        title_font = ImageFont.load_default()
        subtitle_font = ImageFont.load_default()
        play_font = ImageFont.load_default()
    
    # Draw play button circle in center
    circle_size = 100
    x_center = width // 2
    y_center = height // 2
    draw.ellipse(
        [x_center - circle_size, y_center - circle_size, 
         x_center + circle_size, y_center + circle_size],
        fill=accent_color,
        outline=text_color
    )
    
    # Draw play triangle inside circle
    triangle_size = 40
    play_x = x_center - triangle_size // 2
    play_y = y_center - triangle_size // 2
    draw.polygon(
        [(play_x + triangle_size, play_y + triangle_size // 2),
         (play_x, play_y),
         (play_x, play_y + triangle_size)],
        fill=brand_rgb
    )
    
    # Draw title
    title_bbox = draw.textbbox((0, 0), title, font=title_font)
    title_width = title_bbox[2] - title_bbox[0]
    title_x = (width - title_width) // 2
    title_y = 50
    draw.text((title_x, title_y), title, font=title_font, fill=text_color)
    
    # Draw subtitle
    subtitle_bbox = draw.textbbox((0, 0), subtitle, font=subtitle_font)
    subtitle_width = subtitle_bbox[2] - subtitle_bbox[0]
    subtitle_x = (width - subtitle_width) // 2
    subtitle_y = title_y + 80
    draw.text((subtitle_x, subtitle_y), subtitle, font=subtitle_font, fill=accent_color)
    
    # Save poster
    filepath = os.path.join(videos_dir, filename)
    img.save(filepath, quality=95)
    print(f"✓ Created {filepath}")

print("\nAll video posters created successfully!")
