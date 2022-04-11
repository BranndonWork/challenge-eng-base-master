import pymysql

db = pymysql.connect(
    user="root",
    password="testpass",
    host="db",
    database="challenge",
)
