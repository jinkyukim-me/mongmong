from flask import Flask, jsonify, request, json
from flask_mysqldb import MySQL
from datetime import datetime
from flask_cors import CORS
from flask_bcrypt import Bcrypt
from flask_jwt_extended import (JWTManager, jwt_required, jwt_optional, create_access_token, get_jwt_identity, get_jwt_claims)

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
<<<<<<< HEAD
###################################### ai
=======
# ###################################### ai
>>>>>>> 721255bb5d0dc043c5195f0e7b2e4dcccae67f0b
# from flask import Flask, request, jsonify
# from flask_cors import CORS
# from krwordrank.sentence import summarize_with_sentences
# import numpy as np
# import pandas as pd
# import tensorflow as tf
# from keras.models import load_model
# from keras.preprocessing.text import Tokenizer
# from keras.preprocessing.sequence import pad_sequences
# from sklearn.model_selection import train_test_split
# from keras.utils.np_utils import to_categorical
# from konlpy.tag import Okt
# okt = Okt()
<<<<<<< HEAD
#
=======

>>>>>>> 721255bb5d0dc043c5195f0e7b2e4dcccae67f0b
# from keras.models import model_from_json
# json_file = open("model_1.json", "r")
# loaded_model_json = json_file.read()
# json_file.close()
<<<<<<< HEAD
#
=======

>>>>>>> 721255bb5d0dc043c5195f0e7b2e4dcccae67f0b
# global model
# model = model_from_json(loaded_model_json)
# model.load_weights("model_1.h5")
# print("Loaded model from disk")
# global graph
# graph = tf.get_default_graph()
# model.compile(optimizer='adam',loss='categorical_crossentropy', metrics=['acc'])
<<<<<<< HEAD
#
# tokenizer = okt
#
=======

# tokenizer = okt

>>>>>>> 721255bb5d0dc043c5195f0e7b2e4dcccae67f0b
# data = pd.read_csv('datahap_1.csv',encoding='cp949')
# data.label.value_counts()
# labels = to_categorical(data['label'], num_classes=5)
# stopwords=['의', '가', '이', '은', '들', '는', '좀', '잘', '걍', '과', '도', '를', '으로', '자', '에', '와', '한', '하다',
#            ',', '대숲', ',,', '하이', '대학', '안녕', '익명', '글쓴이', '쓰니', '오늘', '나', '너', '저', '누나', '오빠',
#            '기분', '정말', '매우', '몹시', '너무', '엄청', '아주', '훨씬', '가장', '최고', '더', '덜', '맣이', '조금']
# X_train=[]
<<<<<<< HEAD
#
# max_len=30
# max_words = 8000
#
=======

# max_len=30
# max_words = 8000

>>>>>>> 721255bb5d0dc043c5195f0e7b2e4dcccae67f0b
# for sentence in data['text']:
#     temp_X = []
#     temp_X=okt.morphs(sentence, stem=True) # 토큰화
#     temp_X=[word for word in temp_X if not word in stopwords] # 불용어 제거
#     X_train.append(temp_X)
<<<<<<< HEAD
#
=======

>>>>>>> 721255bb5d0dc043c5195f0e7b2e4dcccae67f0b
# tokenizer = Tokenizer(num_words=max_words,lower=False)
# tokenizer.fit_on_texts(X_train)
# sequences = tokenizer.texts_to_sequences(X_train)
# X = pad_sequences(sequences, maxlen=max_len)
# X_train, X_test, y_train, y_test = train_test_split(X , labels, test_size=0.20)
<<<<<<< HEAD
#
# accr = model.evaluate(X_test,y_test)
# print('Test set\n  Loss: {:0.3f}\n  Accuracy: {:0.3f}%'.format(accr[0],accr[1]*100))
#
#
=======

# accr = model.evaluate(X_test,y_test)
# print('Test set\n  Loss: {:0.3f}\n  Accuracy: {:0.3f}%'.format(accr[0],accr[1]*100))


>>>>>>> 721255bb5d0dc043c5195f0e7b2e4dcccae67f0b
# @app.route('/summary', methods=['POST'])
# def summary():
#     text = request.get_json()  # json 데이터를 받아옴
#     json_data = text
#     data = json_data["text"]
#     emotion = json_data["emotion"]
#     data_list = []
#     for sentence in data:
#         list_sentence1 = sentence.split('\n')
#         for list_sentence2 in list_sentence1:
#             list_sentence = list_sentence2.replace('. ', '.   ...').replace('? ', '?   ...').replace('! ','!   ...').split('  ...')
#             for lines in list_sentence:
#                 line = lines.strip()
#                 data_list.append(line)
#     data_list1 = list(data_list)
#     for i in range(len(data_list)):
#         x = data_list1.count('')
#         for j in range(x):
#             data_list1.remove('')
#     texts = data_list1
#     penalty = lambda x: 0 if (20 <= len(x) <= 120) else 1
#     stopwords = {'오늘', '오늘은'}
#     keywords, sents = summarize_with_sentences(
#         texts,
#         penalty=penalty,
#         stopwords=stopwords,
#         diversity=0.5,
#         num_keywords=7,
#         num_keysents=3,
#         scaling=lambda x: 1,
#         verbose=False,
#         min_count=1)
#     before_sentiment = []
#     sentiment = []
#     keyword = []
#     for sent in sents:
#         before_sentiment.append(sent)
#     # keywords = list(keywords.keys())
#     # for l in keywords:
#     #     k = okt.nouns(l)
#     #     if len(k) > 0:
#     #         for n in k:
#     #             if len(n) > 1:
#     #                 keyword.append(n)
#     print(before_sentiment)
#     # print(keywords)
#     # print(keyword)
<<<<<<< HEAD
#
=======

>>>>>>> 721255bb5d0dc043c5195f0e7b2e4dcccae67f0b
#     def text_input(a):
#         global graph
#         with graph.as_default():
#             txt = []
#             txt.append(a)
#             text = []
#             for sentence in txt:
#                 temp_X = []
#                 temp_X = okt.morphs(sentence, stem=True)  # 토큰화
#                 temp_X = [word for word in temp_X if not word in stopwords]  # 불용어 제거
#                 text.append(temp_X)
#             seq = tokenizer.texts_to_sequences(text)
#             padded = pad_sequences(seq, maxlen=max_len)
#             pred = model.predict(padded)
#             labels = [0,1,2,3,4]
#         return labels[np.argmax(pred)]
<<<<<<< HEAD
#
#     for i in range(3):
#         sentiment.append(text_input(a=before_sentiment[i]))
#     print(sentiment)
#
=======

#     for i in range(3):
#         sentiment.append(text_input(a=before_sentiment[i]))
#     print(sentiment)

>>>>>>> 721255bb5d0dc043c5195f0e7b2e4dcccae67f0b
#     def find_nearest(array, value):
#         n = [abs(i - value) for i in array]
#         idx = n.index(min(n))
#         return idx
<<<<<<< HEAD
#
#     a = find_nearest(sentiment, emotion)
#     sentiment_sent = before_sentiment[a]
#
=======

#     a = find_nearest(sentiment, emotion)
#     sentiment_sent = before_sentiment[a]

>>>>>>> 721255bb5d0dc043c5195f0e7b2e4dcccae67f0b
#     return jsonify({"onesentence": sentiment_sent})  # 받아온 데이터를 다시 전송

#############################


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
@jwt_required
def password_reset():
    cur = mysql.connection.cursor()
    user_email = get_jwt_identity()['user_email']
    user_password = request.get_json()['user_password']
    new_password = bcrypt.generate_password_hash(request.get_json()['new_password']).decode('utf-8')
    created_data_time = datetime.utcnow()
    cur.execute("UPDATE user_info SET user_password = '" + str(new_password) + "' WHERE user_email = '" + str(user_email) + "'")
    mysql.connection.commit()
    result = {
      'user_password' : user_password,
        'new_password' : new_password
    }
    return result


@app.route('/register', methods=['POST'])
def register():
    cur = mysql.connection.cursor()
    user_email = request.get_json()['user_email']
    user_password = bcrypt.generate_password_hash(request.get_json()['user_password']).decode('utf-8')
    created_data_time = datetime.utcnow()
    cur.execute("INSERT INTO user_info (user_email, user_password, created_data_time) VALUES ('" + str(user_email) + "', '" + str(user_password) + "', '" + str(created_data_time) + "')")
    mysql.connection.commit()
    result = {'user_email' : user_email,'user_password' : user_password,'created_data_time' : created_data_time}

    return jsonify({'result' : result})


<<<<<<< HEAD
@app.route('/post_input', methods=['POST'])
@jwt_required
def post_input():
    cur = mysql.connection.cursor()
    user_email = get_jwt_identity()['user_email']
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
        'user_email': user_email,
        'paragraph': paragraph,
        'strength_of_feeling': strength_of_feeling,
        'created_data_time': created_data_time
    }

    return jsonify({'result': result})


@app.route('/post_edit', methods=['post'])
@jwt_required
def post_edit():
    cur = mysql.connection.cursor()
    user_email = get_jwt_identity()['user_email']
    paragraph = request.get_json()['paragraph']
    strength_of_feeling = request.get_json()['strength_of_feeling']
    modified_data_time = datetime.utcnow()

    cur.executecur.execute("UPDATE user_post SET paragraph = '" + str(paragraph) + "', strength_of_feeling = '" + str(strength_of_feeling) + "'  WHERE user_id = '" + str(user_email) + "'")

    mysql.connection.commit()

    result = {
        'user_id': user_email,
        'paragraph': paragraph,
        'strength_of_feeling': strength_of_feeling,
        'modified_data_time': modified_data_time
    }

    return jsonify({'result': result})


@app.route('/post_remove', methods=['POST'])
@jwt_required
def post_remove():
    cur = mysql.connection.cursor()
    user_email = get_jwt_identity()['user_email']
    paragraph = request.get_json()['paragraph']
    strength_of_feeling = request.get_json()['strength_of_feeling']

    cur.executecur.execute("DELETE FROM user_post WHERE paragraph = '" + str(paragraph) + "'")

    mysql.connection.commit()

    result = {
        'user_id': user_email,
        'paragraph': paragraph,
        'strength_of_feeling': strength_of_feeling,
        # 'removed_data_time': removed_data_time
    }

    return jsonify({'result': result})


@app.route('/summary_input', method=['POST'])
@jwt_required
def output():
    cur = mysql.connection.cursor()
    user_email = get_jwt_identity()['user_email']
    paragraph = request.get_json()['paragraph']
    strength_of_feeling = request.get_json()['strength_of_feeling']
    created_data_time = datetime.utcnow()

    cur.execute("INSERT INTO user_post (user_email, paragraph, strength_of_feeling, created_data_time) VALUES ('" +
    str(user_email) + "', '" +
    str(paragraph) + "', '" +
    str(strength_of_feeling) + "', '" +
    str(created_data_time) + "')")

    mysql.connection.commit()

=======
# @app.route('/post_input', methods=['POST'])
# def input():
#     cur = mysql.connection.cursor()
#     user_id = request.get_json()['user_id']
#     paragraph = request.get_json()['paragraph']
#     strength_of_feeling = request.get_json()['strength_of_feeling']
#     created_data_time = datetime.utcnow()

#     cur.execute("INSERT INTO user_post (user_id, paragraph, strength_of_feeling, created_data_time) VALUES ('" +
#                 str(user_id) + "', '" +
#                 str(paragraph) + "', '" +
#                 str(strength_of_feeling) + "', '" +
#                 str(created_data_time) + "')")

#     mysql.connection.commit()

#     result = {
#         'user_id': user_id,
#         'paragraph': paragraph,
#         'strength_of_feeling': strength_of_feeling,
#         'created_data_time': created_data_time
#     }

#     return jsonify({'result': result})


# @app.route('/post_edit', methods=['post'])
# def input():
#     cur = mysql.connection.cursor()
#     paragraph = request.get_json()['paragraph']
#     strength_of_feeling = request.get_json()['strength_of_feeling']
#     modified_data_time = datetime.utcnow()

#     cur.executecur.execute("UPDATE user_post SET paragraph = '" + str(paragraph) + "', strength_of_feeling = '" + str(strength_of_feeling) + "'  WHERE user_id = '" + str(user_id) + "'")

#     mysql.connection.commit()

#     result = {
#         'user_id': user_id,
#         'paragraph': paragraph,
#         'strength_of_feeling': strength_of_feeling,
#         'modified_data_time': modified_data_time
#     }

#     return jsonify({'result': result})


# @app.route('/post_remove', methods=['POST'])
# def input():
#     cur = mysql.connection.cursor()


#     cur.executecur.execute("DELETE FROM user_post WHERE paragraph = '" + str(paragraph) + "'")

#     mysql.connection.commit()

#     result = {
#         'user_id': user_id,
#         'paragraph': paragraph,
#         'strength_of_feeling': strength_of_feeling,
#         'removed_data_time': removed_data_time
#     }

#     return jsonify({'result': result})

# @app.route('/summary_input', method=['POST'])
# def output():
#     cur = mysql.connection.cursor()
#     user_email = request.get_json()['user_email']
#     paragraph = request.get_json()['paragraph']
#     strength_of_feeling = request.get_json()['strength_of_feeling']
#     created_data_time = datetime.utcnow()

#     cur.execute("INSERT INTO user_post (user_email, paragraph, strength_of_feeling, created_data_time) VALUES ('" + 
#     str(user_email) + "', '" +
#     str(paragraph) + "', '" +
#     str(strength_of_feeling) + "', '" + 
#     str(created_data_time) + "')")

#     mysql.connection.commit()
    
>>>>>>> 721255bb5d0dc043c5195f0e7b2e4dcccae67f0b

#     result = {
#         'user_email' : user_email,
#         'paragraph' : paragraph,
#         'strength_of_feeling' : strength_of_feeling,
#         'created_data_time' : created_data_time
#     }

#     return jsonify({'result' : result})


if __name__ == '__main__':
    app.run(debug=True)