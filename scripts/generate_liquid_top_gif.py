
from PIL import Image, ImageDraw

def create_liquid_gif():
    width = 640
    height = 12
    frames = []
    
    # Colors
    bg_color = (16, 185, 129) # Emerald-500 #10B981
    scanner_color = (52, 211, 153) # Emerald-400 #34D399
    highlight_color = (255, 255, 255) # White

    # Create 30 frames for a smooth scan
    num_frames = 30
    step = width // num_frames
    
    for i in range(num_frames):
        # Create new image
        img = Image.new('RGB', (width, height), bg_color)
        draw = ImageDraw.Draw(img)
        
        # Calculate scanner position
        x_start = i * step
        x_end = x_start + 100 # Scanner width
        
        # Draw gradient-like scanner (simplified as a few bars)
        # Main scanner bar
        draw.rectangle([x_start, 0, x_end, height], fill=scanner_color)
        
        # Highlight center
        center_start = x_start + 40
        center_end = x_center_end = center_start + 20
        draw.rectangle([center_start, 0, center_end, height], fill=highlight_color)
        
        frames.append(img)

    # Save as GIF
    frames[0].save(
        'public/images/liquid-top.gif',
        save_all=True,
        append_images=frames[1:],
        duration=50, # 50ms per frame = fast scan
        loop=0
    )
    print("✅ Generated public/images/liquid-top.gif")

if __name__ == "__main__":
    create_liquid_gif()
