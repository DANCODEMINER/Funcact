# DASHBOARD DATA ROUTES FOR 10 SYCLES (BACKEND - server.py)
from flask import Flask, request, jsonify, session
import psycopg2
from datetime import datetime

app = Flask(__name__)

# Database connection setup (edit credentials accordingly)
conn = psycopg2.connect(
    dbname="yourdbname",
    user="yourdbuser",
    password="yourdbpass",
    host="yourdbhost",
    port="5432"
)
cursor = conn.cursor()

# Utility function
def get_email():
    data = request.get_json()
    return data.get("email")

# 1. BTC Counter
@app.route("/user/save-btc-counter", methods=["POST"])
def save_btc_counter():
    email = get_email()
    btc = request.json.get("btc")
    cursor.execute("UPDATE users SET btc_counter = %s WHERE email = %s", (btc, email))
    conn.commit()
    return jsonify({"message": "BTC counter saved."})

@app.route("/user/get-btc-counter", methods=["POST"])
def get_btc_counter():
    email = get_email()
    cursor.execute("SELECT btc_counter FROM users WHERE email = %s", (email,))
    btc = cursor.fetchone()[0]
    return jsonify({"btc": btc})

# 2. Hashrate
@app.route("/user/save-hashrate", methods=["POST"])
def save_hashrate():
    email = get_email()
    hashrate = request.json.get("hashrate")
    cursor.execute("UPDATE users SET total_hashrate = %s WHERE email = %s", (hashrate, email))
    conn.commit()
    return jsonify({"message": "Hashrate saved."})

@app.route("/user/get-hashrate", methods=["POST"])
def get_hashrate():
    email = get_email()
    cursor.execute("SELECT total_hashrate FROM users WHERE email = %s", (email,))
    rate = cursor.fetchone()[0]
    return jsonify({"hashrate": rate})

# 3. Total Mined BTC
@app.route("/user/save-total-mined", methods=["POST"])
def save_total_mined():
    email = get_email()
    btc = request.json.get("btc")
    cursor.execute("UPDATE users SET total_mined = %s WHERE email = %s", (btc, email))
    conn.commit()
    return jsonify({"message": "Total mined BTC saved."})

@app.route("/user/get-total-mined", methods=["POST"])
def get_total_mined():
    email = get_email()
    cursor.execute("SELECT total_mined FROM users WHERE email = %s", (email,))
    btc = cursor.fetchone()[0]
    return jsonify({"btc": btc})

# 4. Total Withdrawn
@app.route("/user/save-total-withdrawn", methods=["POST"])
def save_total_withdrawn():
    email = get_email()
    amount = request.json.get("btc")
    cursor.execute("UPDATE users SET total_withdrawn = %s WHERE email = %s", (amount, email))
    conn.commit()
    return jsonify({"message": "Total withdrawn saved."})

@app.route("/user/get-total-withdrawn", methods=["POST"])
def get_total_withdrawn():
    email = get_email()
    cursor.execute("SELECT total_withdrawn FROM users WHERE email = %s", (email,))
    total = cursor.fetchone()[0]
    return jsonify({"btc": total})

# 5. Active Sessions
@app.route("/user/save-active-sessions", methods=["POST"])
def save_active_sessions():
    email = get_email()
    count = request.json.get("count")
    cursor.execute("UPDATE users SET active_sessions = %s WHERE email = %s", (count, email))
    conn.commit()
    return jsonify({"message": "Active sessions saved."})

@app.route("/user/get-active-sessions", methods=["POST"])
def get_active_sessions():
    email = get_email()
    cursor.execute("SELECT active_sessions FROM users WHERE email = %s", (email,))
    count = cursor.fetchone()[0]
    return jsonify({"sessions": count})

# 6. Next Withdrawal Date
@app.route("/user/save-next-withdrawal", methods=["POST"])
def save_next_withdrawal():
    email = get_email()
    date = request.json.get("date")
    cursor.execute("UPDATE users SET next_withdrawal = %s WHERE email = %s", (date, email))
    conn.commit()
    return jsonify({"message": "Next withdrawal date saved."})

@app.route("/user/get-next-withdrawal", methods=["POST"])
def get_next_withdrawal():
    email = get_email()
    cursor.execute("SELECT next_withdrawal FROM users WHERE email = %s", (email,))
    date = cursor.fetchone()[0]
    return jsonify({"next_date": date})

# 7. Dashboard Messages
@app.route("/user/save-message", methods=["POST"])
def save_message():
    msg = request.json.get("message")
    cursor.execute("INSERT INTO messages (text, created_at) VALUES (%s, %s)", (msg, datetime.now()))
    conn.commit()
    return jsonify({"message": "Message saved."})

@app.route("/user/get-messages", methods=["GET"])
def get_messages():
    cursor.execute("SELECT text FROM messages ORDER BY created_at DESC LIMIT 10")
    messages = [row[0] for row in cursor.fetchall()]
    return jsonify({"messages": messages})

# 8. My Rank
@app.route("/user/save-rank", methods=["POST"])
def save_rank():
    email = get_email()
    rank = request.json.get("rank")
    cursor.execute("UPDATE users SET rank = %s WHERE email = %s", (rank, email))
    conn.commit()
    return jsonify({"message": "Rank saved."})

@app.route("/user/get-my-rank", methods=["POST"])
def get_my_rank():
    email = get_email()
    cursor.execute("SELECT rank FROM users WHERE email = %s", (email,))
    rank = cursor.fetchone()[0]
    return jsonify({"rank": rank})

# 9. My BTC (30d)
@app.route("/user/save-my-btc", methods=["POST"])
def save_my_btc():
    email = get_email()
    btc = request.json.get("btc")
    cursor.execute("UPDATE users SET btc_30d = %s WHERE email = %s", (btc, email))
    conn.commit()
    return jsonify({"message": "BTC (30d) saved."})

@app.route("/user/get-my-btc", methods=["POST"])
def get_my_btc():
    email = get_email()
    cursor.execute("SELECT btc_30d FROM users WHERE email = %s", (email,))
    btc = cursor.fetchone()[0]
    return jsonify({"btc": btc})

# 10. My Hashrate
@app.route("/user/save-my-hashrate", methods=["POST"])
def save_my_hashrate():
    email = get_email()
    hashrate = request.json.get("hashrate")
    cursor.execute("UPDATE users SET my_hashrate = %s WHERE email = %s", (hashrate, email))
    conn.commit()
    return jsonify({"message": "My hashrate saved."})

@app.route("/user/get-my-hashrate", methods=["POST"])
def get_my_hashrate():
    email = get_email()
    cursor.execute("SELECT my_hashrate FROM users WHERE email = %s", (email,))
    hr = cursor.fetchone()[0]
    return jsonify({"hashrate": hr})

@app.route("/user/watch-ad", methods=["POST"])
def watch_ad():
    data = request.get_json()
    email = data.get("email")

    if not email:
        return jsonify({"error": "Email is required"}), 400

    # Example logic: boost hashrate and log session
    hashrate_boost = 10  # Or any value based on your reward logic
    duration = 60  # seconds (you can increase this to minutes if needed)

    # Store a new mining session record
    cur = conn.cursor()
    cur.execute("""
        INSERT INTO hash_sessions (email, power, duration, date)
        VALUES (%s, %s, %s, NOW())
    """, (email, hashrate_boost, duration))
    
    # Optionally update user's current hashrate (or track it elsewhere)
    cur.execute("""
        UPDATE users SET hashrate = hashrate + %s WHERE email = %s
    """, (hashrate_boost, email))

    conn.commit()
    cur.close()

    return jsonify({"message": f"Ad watched. Hashrate +{hashrate_boost} Th/s for {duration} sec."})

# Make sure to run app
# app.run(debug=True)  # Uncomment to test locally

