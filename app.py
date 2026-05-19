from flask import Flask, render_template, request, jsonify, send_file
from pathlib import Path
import random
import string

app = Flask(__name__)

UPLOAD_FOLDER = Path("uploads")
UPLOAD_FOLDER.mkdir(exist_ok=True)

sessions = {}


def generate_code():
    return "".join(random.choices(string.ascii_uppercase + string.digits, k=5))


@app.route("/")
def home():
    return render_template("home.html")


@app.route("/reader")
def reader():
    code = generate_code()
    sessions[code] = {"file_path": None, "filename": None}
    return render_template("reader.html", code=code)


@app.route("/sender")
def sender():
    return render_template("sender.html")


@app.route("/upload/<code>", methods=["POST"])
def upload_file(code):
    if code not in sessions:
        return jsonify({"error": "Invalid code"}), 404

    uploaded_file = request.files.get("file")

    if not uploaded_file:
        return jsonify({"error": "No file uploaded"}), 400

    file_path = UPLOAD_FOLDER / f"{code}_{uploaded_file.filename}"
    uploaded_file.save(file_path)

    sessions[code]["file_path"] = file_path
    sessions[code]["filename"] = uploaded_file.filename

    return jsonify({"message": "File uploaded successfully"})


@app.route("/status/<code>")
def check_status(code):
    if code not in sessions:
        return jsonify({"error": "Invalid code"}), 404

    ready = sessions[code]["file_path"] is not None

    return jsonify({
        "ready": ready,
        "filename": sessions[code]["filename"]
    })


@app.route("/download/<code>")
def download_file(code):
    if code not in sessions or sessions[code]["file_path"] is None:
        return "File not found", 404

    return send_file(
        sessions[code]["file_path"],
        as_attachment=True,
        download_name=sessions[code]["filename"]
    )


if __name__ == "__main__":
    app.run(debug=True)