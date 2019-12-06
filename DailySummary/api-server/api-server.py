from flask import Flask, jsonify, request, json
from flask_mysqldb import MySQL
from datetime import datetime
from flask_cors import CORS
from flask_bcrypt import Bcrypt
from flask_jwt_extended import JWTManager
from flask_jwt_extended import create_access_token

app = Flask(__name__)

app.config['MYSQL_HOST'] = '1sentence.ml'
app.config['MYSQL_USER'] = '1sentence'
app.config['MYSQL_PASSWORD'] = '1sen'
app.config['MYSQL_DB'] = 'diarydb'
app.config['MYSQL_CURSORCLASS'] = 'DictCursor'
app.config['JWT_SECRET_KEY'] = 'secret'

mysql = MySQL(app)
bcrypt = Bcrypt(app)
jwt = JWTManager(app)

CORS(app)

@app.route('/login', methods=['POST'])
def login():
    cur = mysql.connection.cursor()
    user_email = request.get_json()['user_email']
    user_password = request.get_json()['user_password']
    result = ""
	
    cur.execute("SELECT * FROM user_info where user_email = '" + str(user_email) + "'")
    rv = cur.fetchone()
	
    if bcrypt.check_password_hash(rv['user_password'], user_password):
        access_token = create_access_token(identity = {'user_email': rv['user_email']})
        result = jsonify({"token":access_token})
    else:
        result = jsonify({"error":"Invalid username and password"})
    
    return result


@app.route('/password_reset', methods=['POST'])
def password_reset():
    cur = mysql.connection.cursor()
    user_email = request.get_json()['user_email']
    user_password = request.get_json()['user_password']
    new_password = bcrypt.generate_password_hash(request.get_json()['user_password']).decode('utf-8')
    created_data_time = datetime.utcnow()
    cur.execute("UPDATE user_info SET user_password = '" + str(new_password) + "' WHERE user_email = '" + str(user_email) + "'")
    mysql.connection.commit()
    result = {
      'user_password' : user_password,
    }
    return result


@app.route('/register', methods=['POST'])
def register():
    cur = mysql.connection.cursor()
    user_email = request.get_json()['user_email']
    user_password = bcrypt.generate_password_hash(request.get_json()['user_password']).decode('utf-8')
    created_data_time = datetime.utcnow()
	
    cur.execute("INSERT INTO user_info (user_email, user_password, created_data_time) VALUES ('" + 
		str(user_email) + "', '" + 
		str(user_password) + "', '" + 
		str(created_data_time) + "')")
    
    mysql.connection.commit()
	
    result = {
		'user_email' : user_email,
		'user_password' : user_password,
		'created_data_time' : created_data_time
	}

    return jsonify({'result' : result})


@app.route('/post_input', methods=['POST'])
def input():
    cur = mysql.connection.cursor()
    user_email = request.get_json()['user_email']
    paragraph = request.get_json()['paragraph']
    strength_of_feeling = request.get_json()['strength_of_feeling']
    created_data_time = datetime.utcnow()

    cur.execute("INSERT INTO user_post (user_email, paragraph, strength_of_feeling, created_data_time) VALUES ('" + 
    str(user_email) + "', '" +
    str(paragraph) + "', '" +
    str(strength_of_feeling) + "', '" + 
    str(created_data_time) + "')")

    mysql.connection.commit()
    

    result = {
        'user_email' : user_email,
        'paragraph' : paragraph,
        'strength_of_feeling' : strength_of_feeling,
        'created_data_time' : created_data_time
    }

    return jsonify({'result' : result})


# @app.route('/post_edit', methods=['post'])
# def input(): 
#     cur = mysql.connection.cursor()
#     user_email = request.get_json()['user_email']
#     paragraph = request.get_json()['paragraph']
#     strength_of_feeling = request.get_json()['strength_of_feeling']
#     modified_data_time = datetime.utcnow()

#     cur.execute("UPDATE user_post SET paragraph=user_email (user_email, paragraph, strength_of_feeling, modified_data_time) VALUES ('" + 
#     str(user_email) + "', '" +
#     str(paragraph) + "', '" +
#     str(strength_of_feeling) + "', '" + 
#     str(modified_data_time) + "')")

#     mysql.connection.commit()
    

#     result = {
#         'user_email' : user_email,
#         'paragraph' : paragraph,
#         'strength_of_feeling' : strength_of_feeling,
#         'modified_data_time' : modified_data_time
#     }

#     return jsonify({'result' : result})


@app.route('/post_remove', methods=['POST'])
def input():
    cur = mysql.connection.cursor()
    user_email = request.get_json()['user_email']
    paragraph = request.get_json()['paragraph']
    strength_of_feeling = request.get_json()['strength_of_feeling']
    created_data_time = datetime.utcnow()

    cur.execute("INSERT INTO user_post (user_email, paragraph, strength_of_feeling, created_data_time) VALUES ('" + 
    str(user_email) + "', '" +
    str(paragraph) + "', '" +
    str(strength_of_feeling) + "', '" + 
    str(created_data_time) + "')")

    mysql.connection.commit()
    

    result = {
        'user_email' : user_email,
        'paragraph' : paragraph,
        'strength_of_feeling' : strength_of_feeling,
        'created_data_time' : created_data_time
    }

    return jsonify({'result' : result})

@app.route('/summary_input', method=['POST'])
def output():
    cur = mysql.connection.cursor()
    user_email = request.get_json()['user_email']
    paragraph = request.get_json()['paragraph']
    strength_of_feeling = request.get_json()['strength_of_feeling']
    created_data_time = datetime.utcnow()

    cur.execute("INSERT INTO user_post (user_email, paragraph, strength_of_feeling, created_data_time) VALUES ('" + 
    str(user_email) + "', '" +
    str(paragraph) + "', '" +
    str(strength_of_feeling) + "', '" + 
    str(created_data_time) + "')")

    mysql.connection.commit()
    

    result = {
        'user_email' : user_email,
        'paragraph' : paragraph,
        'strength_of_feeling' : strength_of_feeling,
        'created_data_time' : created_data_time
    }

    return jsonify({'result' : result})

@app.route('/summary_output', method=['GET'])
def output():
    cur = mysql.connection.cursor()
    user_email = request.get_json()['user_email']
    paragraph = request.get_json()['paragraph']
    strength_of_feeling = request.get_json()['strength_of_feeling']
    created_data_time = datetime.utcnow()

    cur.execute("INSERT INTO user_post (user_email, paragraph, strength_of_feeling, created_data_time) VALUES ('" + 
    str(user_email) + "', '" +
    str(paragraph) + "', '" +
    str(strength_of_feeling) + "', '" + 
    str(created_data_time) + "')")

    mysql.connection.commit()
    

    result = {
        'user_email' : user_email,
        'paragraph' : paragraph,
        'strength_of_feeling' : strength_of_feeling,
        'created_data_time' : created_data_time
    }

@app.route('/summary_remove', method=['POST'])
def output():
    cur = mysql.connection.cursor()
    user_email = request.get_json()['user_email']
    summary_text = request.get_json()['summary_text']
    created_data_time = datetime.utcnow()

    cur.execute("INSERT INTO user_summary (user_email, summary_text, created_data_time) VALUES ('" + 
    str(user_email) + "', '" +
    str(paragraph) + "', '" +
    str(strength_of_feeling) + "', '" + 
    str(created_data_time) + "')")

    mysql.connection.commit()
    

    result = {
        'user_email' : user_email,
        'paragraph' : paragraph,
        'strength_of_feeling' : strength_of_feeling,
        'created_data_time' : created_data_time
    }

    return jsonify({'result' : result})


if __name__ == '__main__':
    app.run(debug=True)