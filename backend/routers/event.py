
from flask import Blueprint, request, jsonify
from db.schemas.schema import EventSchema
from sqlalchemy.orm import Session
from db.model.connection import DatabaseConnector
from db.entities.entities import Event
from services.userService import checkUserExistById,getUserEvents,checkEventExistById,deleteEvent
import json
from flask import Response

router_event = Blueprint('event', __name__)

def get_db():
    db = Session(bind=DatabaseConnector.engine)
    return db


# Ruta para crear un evento para un usuario específico
@router_event.route('/', methods=['POST'])
def create_event():
    data = request.get_json()

    db = get_db()
    user = checkUserExistById(db, data['user_id'])
    
    if user:
        # Crear una instancia de Event con los datos relevantes
        new_event = Event(
            name=data['name'],
            date=data['date'],
            place=data['place'],
            modality=data['modality'],
            user_id=user.id
        )
        db.add(new_event)
        db.commit()
        return jsonify({'message': 'Event created successfully'}), 201
    else:
        return jsonify({'error': 'User not found'}), 404

# Ruta para obtener todos los eventos de un usuario específico
@router_event.route('/<int:user_id>/', methods=['GET'])
def get_user_events(user_id):
    
    db = get_db()
    user = checkUserExistById(db,user_id)
    
    if user:
        events = getUserEvents(db,user_id)
        schema = EventSchema(many=True)
        event_data = schema.dump(events)
        response_json = json.dumps(event_data, ensure_ascii=False).encode('utf8')
        response = Response(response_json, content_type='application/json; charset=utf-8')
        return response
    else:
        return jsonify({'error': 'User not found'}), 404


@router_event.route('/', methods=['PUT'])
def update_event():
    # Obtén los datos JSON de la solicitud
    data = request.get_json()

    db = get_db()
    user = checkUserExistById(db, data['user_id'])
    
    if user:
        event_id = data.get('id')  # Obtén el ID del evento a actualizar desde los datos JSON

        # Verifica si el evento existe en la base de datos
        event = checkEventExistById(db, event_id)

        if event:
            # Actualiza los datos del evento con los nuevos valores
            event.name = data['name']
            event.date = data['date']
            event.place = data['place']
            event.modality = data['modality']

            # Guarda los cambios en la base de datos
            db.commit()

            return jsonify({'message': 'Event updated successfully'}), 200
        else:
            return jsonify({'error': 'Event not found'}), 404
    else:
        return jsonify({'error': 'User not found'}), 404
    
@router_event.route('/', methods=['DELETE'])
def delete_event():
    # Obtén los datos JSON de la solicitud
    data = request.get_json()

    # Verifica que el evento exista en la base de datos
    db = get_db()
    event_id = data.get('id')
    event = checkEventExistById(db, event_id)

    if event:
        # Verifica que el usuario tenga permiso para eliminar el evento
        user = checkUserExistById(db, data['user_id'])
        if user:
            # Elimina el evento de la base de datos
            deleteEvent(db, event_id)
            return jsonify({'message': 'Event deleted successfully'}), 200
        else:
            return jsonify({'error': 'Unauthorized: You do not have permission to delete this event'}), 401
    else:
        return jsonify({'error': 'Event not found'}), 404


