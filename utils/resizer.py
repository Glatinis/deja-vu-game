from PIL import Image
import os

if __name__ == "__main__":
  for file in os.listdir():
    if file.endswith(".png"):
      image = Image.open(file).convert("RGBA")
      scaled_img = image.resize((25, 25), Image.NEAREST)
      fn, ex = file.split(".")
      scaled_img.save(fn + "_resized." + ex)
