from flask import Flask, jsonify, request, json
from flask_mysqldb import MySQL
import datetime
from flask_cors import CORS
from flask_bcrypt import Bcrypt
from flask_jwt_extended import (JWTManager, jwt_required, jwt_optional, create_access_token, get_jwt_identity, get_jwt_claims)
import numpy as np
import pandas as pd
import tensorflow as tf
from keras.models import load_model
from keras.preprocessing.text import Tokenizer
from keras.preprocessing.sequence import pad_sequences
from sklearn.model_selection import train_test_split
from keras.utils.np_utils import to_categorical
from keras.models import model_from_json
from krwordrank.sentence import summarize_with_sentences
from konlpy.tag import Okt
okt = Okt()

app = Flask(__name__)
app.config['MYSQL_HOST'] = '1sentence.ml'
app.config['MYSQL_USER'] = '1sentence'
app.config['MYSQL_PASSWORD'] = '1sen'
app.config['MYSQL_DB'] = 'diarydb'
app.config['MYSQL_CURSORCLASS'] = 'DictCursor'
app.config['JWT_SECRET_KEY'] = 'secret'
app.config['JWT_EXPIRATION_DELTA'] = datetime.timedelta(seconds=86400)
app.config['JWT_ACCESS_TOKEN_EXPIRES'] = datetime.timedelta(seconds=86400)
app.config['JWT_REFRESH_TOKEN_EXPIRES'] = datetime.timedelta(seconds=2592000)

mysql = MySQL(app)
bcrypt = Bcrypt(app)
jwt = JWTManager(app)

CORS(app, resources=r'/api/*')

json_file = open("model_2.json", "r")
loaded_model_json = json_file.read()
json_file.close()

global model
model = model_from_json(loaded_model_json)
model.load_weights("model_2.h5")
print("Loaded model from disk")
global graph
graph = tf.get_default_graph()
model.compile(optimizer='adam',loss='categorical_crossentropy', metrics=['acc'])

tokenizer = okt

data = pd.read_csv('datahap_1.csv',encoding='cp949')
data.label.value_counts()
labels = to_categorical(data['label'], num_classes=5)
stopwords=['의', '가', '이', '은', '들', '는', '좀', '잘', '걍', '과', '도', '를', '으로', '자', '에', '와', '한', '하다',
           ',', '대숲', ',,', '하이', '대학', '안녕', '익명', '글쓴이', '쓰니', '오늘', '나', '너', '저', '누나', '오빠',
           '기분', '정말', '매우', '몹시', '너무', '엄청', '아주', '훨씬', '가장', '최고', '더', '덜', '많이', '조금']
X_train=[]

max_len=30
max_words = 8000

for sentence in data['text']:
    temp_X = []
    temp_X=okt.morphs(sentence, stem=True) # 토큰화
    temp_X=[word for word in temp_X if not word in stopwords] # 불용어 제거
    X_train.append(temp_X)

tokenizer = Tokenizer(num_words=max_words,lower=False)
tokenizer.fit_on_texts(X_train)
sequences = tokenizer.texts_to_sequences(X_train)
X = pad_sequences(sequences, maxlen=max_len)
X_train, X_test, y_train, y_test = train_test_split(X , labels, test_size=0.20)

accr = model.evaluate(X_test,y_test)
print('Test set\n  Loss: {:0.3f}\n  Accuracy: {:0.3f}%'.format(accr[0],accr[1]*100))


@app.route('/api/login', methods=['POST'])
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
        return result, 200
    else:

        result = jsonify({"error":"Invalid username and password"})
        return result, 401


@app.route('/api/password_reset', methods=['POST'])
@jwt_required
def password_reset():
    cur = mysql.connection.cursor()
    user_email = get_jwt_identity()['user_email']
    user_password = request.get_json()['user_password']
    new_password = bcrypt.generate_password_hash(request.get_json()['new_password']).decode('utf-8')
    created_data_time = datetime.datetime.utcnow()
    cur.execute("UPDATE user_info SET user_password = '" + str(new_password) + "' WHERE user_email = '" + str(user_email) + "'")
    mysql.connection.commit()
    result = jsonify({
        'user_password' : user_password,
        'new_password' : new_password,
        'created_data_time' : created_data_time
    })
    return result


@app.route('/api/register', methods=['POST'])
def register():
    cur = mysql.connection.cursor()
    user_email = request.get_json()['user_email']
    user_password = request.get_json()['user_password']
    user_confirm_password = request.get_json()['user_confirm_password']
    check = request.get_json()['check']
    created_data_time = datetime.datetime.utcnow()
    if user_password == user_confirm_password and check == True:
        user_password = bcrypt.generate_password_hash(user_password).decode('utf-8')
        cur.execute("INSERT INTO user_info (user_email, user_password, created_data_time) VALUES ('" + str(user_email) + "', '" + str(user_password) + "', '" + str(created_data_time) + "')")
        mysql.connection.commit()
        result = jsonify({"user_email" : user_email, "user_password" : user_password, "created_data_time" : created_data_time})
        return result, 200
    else:
        result = jsonify({"error":"error"})
        return result, 401


@app.route('/api/post_input', methods=['POST'])
@jwt_required
def post_input():
    cur = mysql.connection.cursor()
    user_email = get_jwt_identity()['user_email']
    paragraph = request.get_json()['paragraph']
    strength_of_feeling = request.get_json()['strength_of_feeling']
    created_data_time = datetime.datetime.utcnow()

    cur.execute("INSERT INTO user_post (user_email, paragraph, strength_of_feeling, created_data_time) VALUES ('" +
                str(user_email) + "', '" +
                str(paragraph) + "', '" +
                str(strength_of_feeling) + "', '" +
                str(created_data_time) + "')")

    mysql.connection.commit()

    result = {
        'user_email': user_email,
        'paragraph': paragraph,
        'strength_of_feeling': strength_of_feeling,
        'created_data_time': created_data_time
    }

    return jsonify({'result': result})


@app.route('/api/post_remove', methods=['POST'])
@jwt_required
def post_remove():
    cur = mysql.connection.cursor()
    user_email = get_jwt_identity()['user_email']
    post_id = request.get_json()['post_id']
    removed_data_time = datetime.datetime.utcnow()

    cur.execute("DELETE FROM user_post WHERE post_id = '" + str(post_id) + "' and user_email = '" + str(user_email) + "'")
    cur.execute("DELETE FROM user_summary WHERE summary_id = '" + str(post_id) + "' and user_email = '" + str(user_email) + "'")
    mysql.connection.commit()

    result = {
        'user_email': user_email,
        'removed_data_time': removed_data_time
    }

    return jsonify({'result': result})


@app.route('/api/post', methods=['POST'])
@jwt_required
def post():
    cur = mysql.connection.cursor()
    user_email = get_jwt_identity()['user_email']
    post_id = request.get_json()['post_id']
    cur.execute("SELECT post_id, paragraph, strength_of_feeling, created_data_time FROM user_post WHERE post_id ='"+ str(post_id) + "' and user_email ='"+ str(user_email) + "'")

    mysql.connection.commit()
    list = cur.fetchall()

    return jsonify({'list': list})


@app.route('/api/post_list', methods=['POST'])
@jwt_required
def post_list():
    cur = mysql.connection.cursor()
    user_email = get_jwt_identity()['user_email']
    yyyy = request.get_json()['yyyy']
    mm = request.get_json()['mm']
    cur.execute("SELECT post_id, paragraph, strength_of_feeling, created_data_time FROM user_post WHERE user_email ='"+ str(user_email) + "' and created_data_time between '" + str(yyyy) + "-" + str(mm) + "-01 00:00:00' and '" + str(yyyy) + "-" + str(mm) + "-31 23:59:59'")

    mysql.connection.commit()
    list = cur.fetchall()

    return jsonify({'list': list})


@app.route('/api/post_list_day', methods=['POST'])
@jwt_required
def post_list_day():
    cur = mysql.connection.cursor()
    user_email = get_jwt_identity()['user_email']
    yyyy = request.get_json()['yyyy']
    mm = request.get_json()['mm']
    dd = request.get_json()['dd']
    cur.execute("SELECT post_id, paragraph, strength_of_feeling, created_data_time FROM user_post WHERE user_email ='"+ str(user_email) + "' and created_data_time between '" + str(yyyy) + "-" + str(mm) + "-" + str(dd) +" 00:00:00' and '" + str(yyyy) + "-" + str(mm) + "-" + str(dd) +" 23:59:59'")

    mysql.connection.commit()
    list = cur.fetchall()

    return jsonify({'list': list})


@app.route('/api/summary', methods=['POST'])
@jwt_required
def summary():
    cur = mysql.connection.cursor()
    user_email = get_jwt_identity()['user_email']
    pre_data = request.get_json()['paragraph']
    emotion = request.get_json()['strength_of_feeling']
    created_data_time = datetime.datetime.utcnow()
    data = []
    data_list = []
    data.append(pre_data)
    for sentence in data:
        list_sentence1 = sentence.split('\n')
        for list_sentence2 in list_sentence1:
            list_sentence = list_sentence2.replace('. ', '.   ...').replace('? ', '?   ...').replace('! ','!   ...').split('  ...')
            for lines in list_sentence:
                line = lines.strip()
                data_list.append(line)
    data_list1 = list(data_list)
    for i in range(len(data_list)):
        x = data_list1.count('')
        for j in range(x):
            data_list1.remove('')
    texts = data_list1
    penalty = lambda x: 0 if (20 <= len(x) <= 120) else 1
    stopwords = {'오늘', '오늘은'}
    keywords, sents = summarize_with_sentences(
        texts,
        penalty=penalty,
        stopwords=stopwords,
        diversity=0.5,
        num_keywords=7,
        num_keysents=3,
        scaling=lambda x: 1,
        verbose=False,
        min_count=1)
    before_sentiment = []
    sentiment = []
    keyword = []
    for sent in sents:
        before_sentiment.append(sent)
    print(before_sentiment)

    def text_input(a):
        global graph
        with graph.as_default():
            txt = []
            txt.append(a)
            text = []
            for sentence in txt:
                temp_X = []
                temp_X = okt.morphs(sentence, stem=True)  # 토큰화
                temp_X = [word for word in temp_X if not word in stopwords]  # 불용어 제거
                text.append(temp_X)
            seq = tokenizer.texts_to_sequences(text)
            padded = pad_sequences(seq, maxlen=max_len)
            pred = model.predict(padded)
            labels = [0,1,2,3,4]
        return labels[np.argmax(pred)]

    for i in range(3):
        sentiment.append(text_input(a=before_sentiment[i]))
    print(sentiment)

    def find_nearest(array, value):
        n = [abs(i - value) for i in array]
        idx = n.index(min(n))
        return idx

    a = find_nearest(sentiment, emotion)
    summary_text = before_sentiment[a]

    cur.execute("INSERT INTO user_summary (user_email, summary_text, created_data_time) VALUES ('" +
                str(user_email) + "', '" +
                str(summary_text) + "', '" +
                str(created_data_time) + "')")

    mysql.connection.commit()

    result = {
        'user_email': user_email,
        'summary_text': summary_text,
        'created_data_time': created_data_time
    }

    return jsonify({'result': result})


@app.route('/api/summary_list', methods=['POST'])
@jwt_required
def summary_list():
    cur = mysql.connection.cursor()
    user_email = get_jwt_identity()['user_email']
    yyyy = request.get_json()['yyyy']
    mm = request.get_json()['mm']
    dd = request.get_json()['dd']
    cur.execute("SELECT summary_id, summary_text, created_data_time FROM user_summary WHERE user_email ='"+ str(user_email) + "' and created_data_time between '" + str(yyyy) + "-" + str(mm) + "-" + str(dd) +" 00:00:00' and '" + str(yyyy) + "-" + str(mm) + "-" + str(dd) +" 23:59:59'")

    mysql.connection.commit()
    list = cur.fetchall()

    return jsonify({'post': list})


if __name__ == '__main__':
    app.run(port="5000")
