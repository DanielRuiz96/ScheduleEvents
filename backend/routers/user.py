from flask import Blueprint, request, jsonify
from flask_jwt_extended import create_access_token,jwt_required
from db.model.connection import DatabaseConnector
from db.entities.entities import User
from db.schemas.schema import UserSchema,ChangePasswordSchema
from services.userService import checkEmailExist,changePassword,checkUserExist
from sqlalchemy.orm import Session
from werkzeug.security import generate_password_hash,check_password_hash
import json
from flask import Response

router = Blueprint('user', __name__)

def get_db():
    db = Session(bind=DatabaseConnector.engine)
    return db

@router.route('/', methods=['GET'])
# @jwt_required()
def get_users():
    db = get_db()
    users = db.query(User).all()
   
    db.close()

    # Serializa la lista de usuarios utilizando el esquema UserSchema
    schema = UserSchema(many=True)
    user_data = schema.dump(users)
    response_json = json.dumps(user_data, ensure_ascii=False).encode('utf8')
    response = Response(response_json, content_type='application/json; charset=utf-8')
    return response

@router.route('/', methods=['POST'])
def register_user():
    data = request.get_json()


    user_schema = UserSchema()
    user_data = user_schema.load(data)

    db = get_db()

    email = checkEmailExist(db,user_data['email'])
    user = checkUserExist(db, user_data['username']) 

    if email:
        db.close()
        return jsonify({'message': 'The email is already in use'}),400
    
    if user:
        db.close()
        return jsonify({'message': 'The username is already in use'}), 400
    
    # Genera un hash seguro de la contraseña antes de almacenarla
    hashed_password = generate_password_hash(user_data['password'])

    # Crea una instancia del nuevo usuario con la contraseña hasheada
    new_user = User(username=user_data['username'], email=user_data['email'], password=hashed_password)


    db.add(new_user)
    db.commit()
    db.close()

    return jsonify({'message': 'Registered user successfully'}),200

@router.route('/', methods=['PUT'])
def update_user_password():

    # Obtiene los datos enviados en la solicitud
    data = request.get_json()

    user_schema = ChangePasswordSchema()
    user_data = user_schema.load(data)
    

    db = get_db()

    user = checkEmailExist(db,user_data['email'])
    
    if user:
        
        success, message = changePassword(user,user_data['password'], user_data['newpassword'])

        if success:
            db.commit()
            db.close()
            return jsonify({'message': message})
        else:
            db.close()
            return jsonify({'message':message}),400
    else:
        return jsonify({'message': 'The email not found'}),400

@router.route('/login', methods=['POST'])
def login():
    data = request.get_json()
    
    user_schema = UserSchema()
    user_data = user_schema.load(data)

    db = get_db()

    email = checkEmailExist(db,user_data['email'])
    user = checkUserExist(db, user_data['username'])
    
    if user and email and check_password_hash(user.password,user_data['password']):
        user_id = user.id
        access_token = create_access_token(identity=user_data['username'])
        response_data = {
            'access_token': access_token,
            'token_type': 'Bearer',
            'user_id': user_id
        }
        return jsonify(response_data),200
    else:
        return jsonify({'message':'invalid credentials'}),401

        



