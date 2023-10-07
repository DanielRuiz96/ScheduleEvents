from db.model.connection import DatabaseConnector as db
from sqlalchemy import Column, Integer, String, ForeignKey, DateTime
from werkzeug.security import generate_password_hash
from sqlalchemy.orm import relationship
from datetime import datetime

class User(db.Base):
    __tablename__ = 'users'

    id = Column(Integer, primary_key=True, index=True)
    username = Column(String, nullable=False, unique=True)
    email = Column(String, nullable=False, unique=True)
    password = Column(String, nullable=False)

    events = relationship("Event", back_populates="user")

class Event(db.Base):
    __tablename__ = 'events'

    id = Column(Integer, primary_key=True, index=True)
    name = Column(String, nullable=False)
    date = Column(DateTime, nullable=True)
    place = Column(String, nullable=False)
    modality = Column(String, nullable=False)
    

    user_id = Column(Integer, ForeignKey("users.id"))
    user = relationship("User", back_populates="events")

# Crear las tablas en la base de datos
db.Base.metadata.create_all(db.engine)

from sqlalchemy.orm import Session

with Session(bind=db.engine) as session:
    # Eliminar todos los registros de la tabla 'events'
    session.query(Event).delete()
    # Eliminar todos los registros de la tabla 'users'
    session.query(User).delete()
    # Confirmar los cambios para que se apliquen a la base de datos
    session.commit()

# Crear una nueva sesión
with Session(bind=db.engine) as session:

    # Crear un nuevo usuario
    new_user = User(username='Daniel96', email='danirumo96@example.com', password='123456789')

    # Hashea la contraseña antes de almacenarla en la base de datos
    hashed_password = generate_password_hash(new_user.password)
    new_user.password = hashed_password

    # Agregar el nuevo usuario a la sesión y confirmar los cambios en la base de datos
    session.add(new_user)
    session.commit()

    # Crear un nuevo evento de ejemplo relacionado con el usuario
    event_date = datetime(2023, 10, 10, 15, 30)  # Fecha y hora en formato DIA, MES AÑO HORA
    new_event = Event(name='Evento 1',date=event_date, place='Bogota', modality='VIRTUAL', user=new_user)

    # Agregar el nuevo evento a la sesión y confirmar los cambios en la base de datos
    session.add(new_event)
    session.commit()
