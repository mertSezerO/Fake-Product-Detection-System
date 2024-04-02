import pyqrcode
import png
from pyqrcode import QRCode
import urllib3
import json
import os

http = urllib3.PoolManager()

response = http.request("GET", "http://localhost:3000/product")

data = response.data.decode("utf-8")
parsed_data = json.loads(data)

for product in parsed_data["products"]:
    qr = pyqrcode.create(product["productId"])
    file_path = os.path.join("./qr-codes", product["productId"] + ".png")
    qr.png(file_path, scale=6)
