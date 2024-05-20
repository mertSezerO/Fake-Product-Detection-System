import pyqrcode
from pyqrcode import QRCode
import json
import os

from flask import Flask, request, make_response

app = Flask(__name__)


@app.route("/qr", methods=["POST"])
def create_qr():
    json_data = request.data.decode("utf-8")
    data = json.loads(json_data)

    try:
        qr = pyqrcode.create(data["productId"])
        file_path = os.path.join(
            "./qr-codes", data["productName"] + "-" + data["productId"] + ".png"
        )
        qr.png(file_path, scale=8)
        return make_response(
            "QR successfully generated for product with ID: {}".format(
                data["productId"]
            ),
            201,
        )
    except Exception:
        return make_response("Internal Server Error", 500)


app.run(port=3002)
