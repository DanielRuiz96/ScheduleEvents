from dotenv import load_dotenv
import os

load_dotenv()

CONTAINERDB = os.environ['CONTAINERDB']
SECRETKEY = os.environ['SECRETKEY']
HOSTPATH = os.environ['HOSTPATH']
HOST = os.environ['HOST']
FRONTENDPORT = os.environ['FRONTENDPORT']
BACKENDPORT = int(os.environ['BACKENDPORT'])
DATABASE_URL = os.environ.get('DATABASE_URL')