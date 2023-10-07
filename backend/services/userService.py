from sqlalchemy.orm import Session
from db.entities.entities import User,Event
from werkzeug.security import check_password_hash, generate_password_hash

def checkEmailExist(db:Session, email):
    existing_email = db.query(User).filter_by(email=email).first()
    return existing_email

def checkUserExist(db:Session, username):
    existing_user = db.query(User).filter_by(username=username).first()
    return existing_user

def checkUserExistById(db:Session, id):
    existing_user_by_id = db.query(User).filter_by(id=id).first()
    return existing_user_by_id

def getUserEvents(db:Session, id):
    existing_events = db.query(Event).filter_by(user_id = id).all()
    return existing_events

def checkEventExistById(db:Session, event_id):
    existing_event = db.query(Event).filter_by(id=event_id).first()
    return existing_event

def deleteEvent(db, event_id):
    try:
        event = db.query(Event).filter_by(id=event_id).first()

        if event:
            # Elimina el evento de la base de datos
            db.delete(event)
            db.commit()
        else:
            raise Exception("Event not found")

    except Exception as e:
        db.rollback()
        raise e
    
# Define una función para verificar la contraseña actual
def verifyCurrentPassword(user, current_password):
    # Utiliza la función check_password_hash para verificar si la contraseña actual coincide
    return check_password_hash(user.password, current_password)

# Define una función para validar el formato de la nueva contraseña
def isValidPassword(new_password):
    # Implementa tus validaciones de formato de contraseña aquí, por ejemplo, longitud mínima, caracteres especiales, etc.
    # Devuelve True si la contraseña es válida y False en caso contrario.
    if len(new_password) >= 6:
        return True
    else:
        return False

# Define una función para cambiar la contraseña del usuario
def changePassword(user, current_password, new_password):
    # Verifica la contraseña actual
    if not verifyCurrentPassword(user, current_password):
        return False, 'Current password is incorrect'

    # Valida el formato de la nueva contraseña
    if not isValidPassword(new_password):
        return False, 'New password does not meet the requirements'

    # Genera el hash de la nueva contraseña y actualiza el usuario en la base de datos
    hashed_password = generate_password_hash(new_password)
    user.password = hashed_password

    return True, 'Password updated successfully'


