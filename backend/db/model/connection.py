from sqlalchemy import create_engine
from sqlalchemy_utils import database_exists, create_database
from sqlalchemy.orm import declarative_base
from config import DATABASE_URL


class DatabaseConnector:
    # Make the engine
    #DATABASE_URL = "postgresql://postgres@localhost/db_a3sec"
    URL = DATABASE_URL
    
    engine = create_engine(URL)

    # Create database if it does not exist.
    if not database_exists(URL):
        create_database(URL)

    # Make the DeclarativeMeta
    Base = declarative_base()
